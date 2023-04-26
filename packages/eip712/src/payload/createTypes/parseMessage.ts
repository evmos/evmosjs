import { JSONObject } from '../common.js'
import {
  EIP712Type,
  newType,
  typeArrayAdjusted,
  typesAreEqual,
} from '../eip712Types.js'

const TYPE_PREFIX = 'Type'
const ROOT_PREFIX = '_'
export const MAX_DUPL_TYPEDEFS = 1000

interface ParseJSONParams {
  types: JSONObject
  payload: JSONObject
  root: string
  prefix: string
}

interface ParseFieldParams {
  key: string
  value: any
  isArray?: boolean
}

// Gets the root type definition for a message:
// e.g. "MsgSend" for "cosmos-sdk/MsgSend" payload messages.
const msgRootTypedef = (msg: JSONObject) => {
  const { type } = msg
  if (typeof type !== 'string') {
    throw new TypeError(`field 'type' missing from msg: ${msg}`)
  }

  const tokens = type.split('/')
  const base = tokens[tokens.length - 1]

  return `${TYPE_PREFIX}${base}`
}

// Gets the type as a sanitized string, since Geth does not accept
// complex types.
// _.foo.bar -> TypeFooBar
const typeSanitized = (typeDef: string) => {
  let sanitized = ''
  const parts = typeDef.split('.')

  parts.forEach((part) => {
    if (part === ROOT_PREFIX) {
      sanitized += TYPE_PREFIX
      return
    }
    const subparts = part.split(ROOT_PREFIX)
    subparts.forEach((subpart) => {
      sanitized += subpart[0].toUpperCase() + subpart.substr(1)
    })
  })

  return sanitized
}

// Parses a payload object field as an array by unwrapping it
// or returning its associated type. If the input is not
// an array, returns indicating this is the case.
const parseFieldAsArray = (params: ParseFieldParams) => {
  const { key, value } = params
  let inner = value
  let typeForField: EIP712Type | undefined

  const isArray = Array.isArray(value)

  if (isArray) {
    // eslint-disable-next-line prefer-destructuring
    inner = value[0]
    if (value.length === 0) {
      // use string[] because we cannot infer the type
      typeForField = newType(key, 'string[]')
    }
  }

  return {
    value: inner,
    isArray,
    typeForField,
  }
}

// Gets the EIP-712 type for a primitive value.
// Returns undefined for objects or arrays.
const typeAsEthPrimitive = (val: any) => {
  switch (typeof val) {
    case 'string':
      return 'string'
    case 'number':
      return 'int64'
    case 'boolean':
      return 'bool'
    default:
      return undefined
  }
}

// Parses a payload object field as a primitive type and returns
// the corresponding EIP-712 type if successful, and undefined otherwise.
const parseFieldAsPrimitive = (params: ParseFieldParams) => {
  const { key, value, isArray } = params
  let typeDef = typeAsEthPrimitive(value)

  if (!typeDef) {
    return undefined
  }

  typeDef = typeArrayAdjusted(typeDef, isArray)

  return newType(key, typeDef)
}

// Parses a payload object field as a JSON object by recursively
// adding the types for the object's subfields, then returning
// the resulting type definition.
const parseFieldAsJSON = (
  fieldParams: ParseFieldParams,
  payloadParams: ParseJSONParams,
) => {
  const { key, value, isArray } = fieldParams
  const { types, root, prefix } = payloadParams

  const subPrefix = `${prefix}.${key}`

  // eslint-disable-next-line no-use-before-define
  let typeDef = addPayloadTypes({
    types,
    payload: value,
    root,
    prefix: subPrefix,
  })
  typeDef = typeSanitized(typeDef)
  typeDef = typeArrayAdjusted(typeDef, isArray)

  return newType(key, typeDef)
}

// Returns the type definition for the given prefix
// depending on whether it's a root prefix.
const rootAdjustedTypedef = (prefix: string, root: string) => {
  if (prefix === ROOT_PREFIX) {
    return root
  }
  return typeSanitized(prefix)
}

const addTypesToRoot = (
  root: JSONObject,
  key: string,
  newTypes: EIP712Type[],
) => {
  let typedef: string = ''

  let i = 0
  for (; i < MAX_DUPL_TYPEDEFS; i++) {
    typedef = `${key}${i}`

    // Return the existing typedef if an identical
    // match is found.
    const hasType = typedef in root
    if (hasType && typesAreEqual(root[typedef], newTypes)) {
      return typedef
    }

    if (!hasType) {
      break
    }
  }

  if (i === MAX_DUPL_TYPEDEFS) {
    throw new Error('reached maximum number of duplicates for type')
  }

  // eslint-disable-next-line no-param-reassign
  root[typedef] = newTypes

  return typedef
}

const addPayloadTypes = (payloadParams: ParseJSONParams) => {
  const { types, payload, root, prefix } = payloadParams

  // Sort the payload keys for deterministic results.
  const keys = Object.keys(payload)
  keys.sort()

  const newTypes: EIP712Type[] = []

  for (const key of keys) {
    // First, unwrap the array if present, and store the results of the operation.
    // Then, attempt to handle the field if it's a primitive value.
    // Finally, handle the field as a nested JSON object. Since multi-dimension arrays
    // are not supported, this is the only remaining possibility.
    let value = payload[key]
    let typeForField: EIP712Type | undefined
    let isArray: boolean

      // eslint-disable-next-line prefer-const
    ;({ isArray, value, typeForField } = parseFieldAsArray({ key, value }))
    if (typeForField) {
      newTypes.push(typeForField)
      continue
    }

    if (Array.isArray(value)) {
      throw new Error('multi-dimensional arrays are not supported')
    }

    const fieldParams = { key, value, isArray }
    typeForField = parseFieldAsPrimitive(fieldParams)
    if (typeForField) {
      newTypes.push(typeForField)
      continue
    }

    typeForField = parseFieldAsJSON(fieldParams, payloadParams)
    newTypes.push(typeForField)
  }

  const typedef = rootAdjustedTypedef(prefix, root)

  return addTypesToRoot(types, typedef, newTypes)
}

const addMsgTypes = (types: JSONObject, msg: JSONObject) => {
  if (!msg) {
    throw new TypeError(`expected JSON message, got ${msg}`)
  }

  const root = msgRootTypedef(msg)

  return addPayloadTypes({
    types,
    payload: msg,
    root,
    prefix: ROOT_PREFIX,
  })
}

export default addMsgTypes
