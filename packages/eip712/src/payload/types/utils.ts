import { EIP712Type, JSONObject } from '../common'

// can separate into eth-utils and parse-utils
// can use a types folder since this has the most logic
// reverse newType order

export const MAX_DUPL_TYPEDEFS = 1000
export const ROOT_PREFIX = '_'
const TYPE_PREFIX = 'Type'

export const baseTypes = () => ({
  EIP712Domain: [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'string' },
    { name: 'salt', type: 'string' },
  ],
  Tx: [
    { name: 'account_number', type: 'string' },
    { name: 'chain_id', type: 'string' },
    { name: 'fee', type: 'Fee' },
    { name: 'memo', type: 'string' },
    { name: 'sequence', type: 'string' },
  ],
  Fee: [
    { name: 'amount', type: 'Coin[]' },
    { name: 'gas', type: 'string' },
  ],
  Coin: [
    { name: 'denom', type: 'string' },
    { name: 'amount', type: 'string' },
  ],
})

export const newType = (type: string, name: string): EIP712Type => ({
  type,
  name,
})

export const addTypeToTx = (types: JSONObject, newType: EIP712Type) => {
  types.Tx.push(newType)
}

// contract - types must be in the same sorted order
export const typesAreEqual = (types1: EIP712Type[], types2: EIP712Type[]) => {
  if (types1.length !== types2.length) {
    return false
  }

  for (let i = 0; i < types1.length; i++) {
    if (
      types1[i].type !== types2[i].type &&
      types1[i].name !== types2[i].name
    ) {
      return false
    }
  }

  return true
}

export const arrayAdjustedType = (
  typeDef: string,
  isArray: boolean | undefined,
) => {
  if (isArray) {
    return `${typeDef}[]`
  }
  return typeDef
}

export const ethPrimitiveType = (val: any) => {
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

export const sanitizedType = (typeDef: string) => {
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

export const typeForPrefix = (prefix: string, root: string) => {
  if (prefix === ROOT_PREFIX) {
    return root
  }
  return sanitizedType(prefix)
}

export const msgRootType = (msg: JSONObject) => {
  const { type } = msg
  if (typeof type !== 'string') {
    throw new TypeError(`field 'type' missing from msg: ${msg}`)
  }

  const tokens = type.split('/')
  // cosmos-sdk/MsgSend -> MsgSend
  const base = tokens[tokens.length - 1]

  return `${TYPE_PREFIX}${base}`
}
