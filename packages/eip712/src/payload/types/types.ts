import { MessageParams, JSONObject, EIP712Type } from '../common'
import {
  newType,
  rootType,
  arrayAdjusted,
  ethPrimitive,
  sanitizeType,
  baseTypes,
  typesAreEqual,
  payloadTypedef,
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

const MAX_DUPL_TYPEDEFS = 1000

const unwrapArray = (params: ParseFieldParams) => {
  const { key, value } = params
  let inner = value
  let eipType: EIP712Type | undefined

  const isArray = Array.isArray(value)

  if (isArray) {
    // eslint-disable-next-line prefer-destructuring
    inner = value[0]
    if (value.length === 0) {
      // arbitrarily use string[] because we cannot infer the type
      eipType = newType('string[]', key)
    }
  }

  return {
    value: inner,
    isArray,
    eipType,
  }
}

const parsePrimitive = (params: ParseFieldParams) => {
  const { key, value, isArray } = params
  let typeDef = ethPrimitive(value)

  if (!typeDef) {
    return undefined
  }

  typeDef = arrayAdjusted(typeDef, isArray)

  return newType(typeDef, key)
}

const parseJSON = (
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
  typeDef = sanitizeType(typeDef)
  typeDef = arrayAdjusted(typeDef, isArray)

  return newType(typeDef, key)
}

const addTypesToRoot = (
  types: JSONObject,
  key: string,
  newTypes: EIP712Type[],
) => {
  let typedef: string = ''

  let i = 0
  for (; i < MAX_DUPL_TYPEDEFS; i++) {
    typedef = `${key}${i}`

    const exists = typedef in types
    if (exists && typesAreEqual(newTypes, types[typedef])) {
      return typedef
    }

    if (!exists) {
      break
    }
  }

  if (i === MAX_DUPL_TYPEDEFS) {
    throw new Error('reached maximum number of duplicates for type')
  }

  // eslint-disable-next-line no-param-reassign
  types[typedef] = newTypes

  return typedef
}

const addPayloadTypes = (params: ParseJSONParams) => {
  const { types, payload, root, prefix } = params

  const newTypes: EIP712Type[] = []

  const keys = Object.keys(payload)
  keys.sort()

  for (const key of keys) {
    const unwrapped = unwrapArray({ key, value: payload[key] })
    const { value, isArray } = unwrapped
    let { eipType } = unwrapped
    if (eipType) {
      newTypes.push(eipType)
      continue
    }

    eipType = parsePrimitive({ key, value, isArray })
    if (eipType) {
      newTypes.push(eipType)
      continue
    }

    eipType = parseJSON({ key, value, isArray }, params)
    newTypes.push(eipType)
  }

  const typedef = payloadTypedef(prefix, root)

  return addTypesToRoot(types, typedef, newTypes)
}

const addMsgTypes = (types: JSONObject, msg: JSONObject) => {
  if (!msg) {
    throw new TypeError(`expected JSON message, got ${msg}`)
  }

  const root = rootType(msg)

  return addPayloadTypes({
    types,
    payload: msg,
    root,
    prefix: '_',
  })
}

const eip712Types = (messageParams: MessageParams) => {
  const { numMessages, payload } = messageParams
  const types = baseTypes()

  for (let i = 0; i < numMessages; i++) {
    const key = `msg${i}`
    const msg = payload[key]

    const typedef = addMsgTypes(types, msg)
    types.Tx.push(newType(typedef, key))
  }

  return types as JSONObject
}

export default eip712Types
