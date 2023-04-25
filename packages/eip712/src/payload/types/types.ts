import { MessageParams, JSONObject, EIP712Type } from '../common'
import {
  newType,
  msgRootType,
  arrayAdjustedType,
  ethPrimitiveType,
  sanitizedType,
  baseTypes,
  typesAreEqual,
  typeForPrefix,
  msgPayloadField,
  MAX_DUPL_TYPEDEFS,
  ROOT_PREFIX,
} from './utils'

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

const unwrapArray = (params: ParseFieldParams) => {
  const { key, value } = params
  let inner = value
  let typeToAdd: EIP712Type | undefined

  const isArray = Array.isArray(value)

  if (isArray) {
    // eslint-disable-next-line prefer-destructuring
    inner = value[0]
    if (value.length === 0) {
      // use string[] because we cannot infer the type
      typeToAdd = newType('string[]', key)
    }
  }

  return {
    value: inner,
    isArray,
    typeToAdd,
  }
}

const parsePrimitive = (params: ParseFieldParams) => {
  const { key, value, isArray } = params
  let typeDef = ethPrimitiveType(value)

  if (!typeDef) {
    return undefined
  }

  typeDef = arrayAdjustedType(typeDef, isArray)

  return newType(typeDef, key)
}

const parseObject = (
  fieldParams: ParseFieldParams,
  payloadParams: ParseJSONParams,
) => {
  const { key, value, isArray } = fieldParams
  const { types, root, prefix } = payloadParams

  const subPrefix = `${prefix}.${key}`

  // recursively add the object's type definitions
  // eslint-disable-next-line no-use-before-define
  let typeDef = addPayloadTypes({
    types,
    payload: value,
    root,
    prefix: subPrefix,
  })
  typeDef = sanitizedType(typeDef)
  typeDef = arrayAdjustedType(typeDef, isArray)

  return newType(typeDef, key)
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

    // return existing typedef if identical
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

  // sort for deterministic results
  const keys = Object.keys(payload)
  keys.sort()

  const newTypes: EIP712Type[] = []

  for (const key of keys) {
    const arrayInfo = unwrapArray({ key, value: payload[key] })
    const { value, isArray } = arrayInfo
    let { typeToAdd } = arrayInfo
    if (typeToAdd) {
      newTypes.push(typeToAdd)
      continue
    }

    const fieldParams = { key, value, isArray }
    typeToAdd = parsePrimitive(fieldParams)
    if (typeToAdd) {
      newTypes.push(typeToAdd)
      continue
    }

    typeToAdd = parseObject(fieldParams, payloadParams)
    newTypes.push(typeToAdd)
  }

  const typedef = typeForPrefix(prefix, root)

  return addTypesToRoot(types, typedef, newTypes)
}

const addMsgTypes = (types: JSONObject, msg: JSONObject) => {
  if (!msg) {
    throw new TypeError(`expected JSON message, got ${msg}`)
  }

  const root = msgRootType(msg)

  return addPayloadTypes({
    types,
    payload: msg,
    root,
    prefix: ROOT_PREFIX,
  })
}

const eip712Types = (messageParams: MessageParams) => {
  const { numMessages, payload } = messageParams
  const types = baseTypes()

  for (let i = 0; i < numMessages; i++) {
    const key = msgPayloadField(i)
    const msg = payload[key]

    const typedef = addMsgTypes(types, msg)
    types.Tx.push(newType(typedef, key))
  }

  return types as JSONObject
}

export default eip712Types
