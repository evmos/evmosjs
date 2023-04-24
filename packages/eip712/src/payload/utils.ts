import { EIP712Type, JSON } from './common'

// replace JSON with new type to avoid conflict

// can separate into eth-utils and parse-utils
// can use a types folder since this has the most logic

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

// contract - types must be in the same sorted order
export const typesAreEqual = (types1: EIP712Type[], types2: EIP712Type[]) => {
  if (types1.length !== types2.length) {
    return false
  }

  for (let i = 0; i < types1.length; i++) {
    const type1 = types1[i]
    const type2 = types2[i]
    if (type1.type !== type2.type && type1.name !== type2.name) {
      return false
    }
  }

  return true
}

export const arrayAdjusted = (
  typeDef: string,
  isArray: boolean | undefined,
) => {
  return isArray ? `${typeDef}[]` : typeDef
}

export const ethPrimitive = (val: any) => {
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

export const sanitizeType = (typeDef: string) => {
  let sanitized = ''
  const parts = typeDef.split('.')

  console.log(parts)

  parts.forEach((part) => {
    if (part === '_') {
      sanitized += 'Type'
      return
    }
    const subparts = part.split('_')
    subparts.forEach((subpart) => {
      sanitized += subpart[0].toUpperCase() + subpart.substr(1)
    })
  })

  return sanitized
}

export const payloadTypedef = (prefix: string, root: string) => {
  if (prefix === '_') {
    return root
  }
  return sanitizeType(prefix)
}

export const rootType = (msg: JSON) => {
  const { type } = msg
  if (typeof type !== 'string') {
    throw new TypeError(`field 'type' missing from msg: ${msg}`)
  }

  const tokens = type.split('/')
  // cosmos-sdk/MsgSend -> MsgSend
  const base = tokens[tokens.length - 1]

  return `Type${base}`
}
