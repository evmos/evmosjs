import {
  FlattenPayloadResponse,
  JSONObject,
  payloadMsgField,
} from '../common.js'
import { EIP712Type, newType } from '../eip712Types.js'
import addMsgTypes from './parseMessage.js'

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

const addMsgTypedef = (types: JSONObject, newType: EIP712Type) => {
  types.Tx.push(newType)
}

const eip712Types = (flattenedPayload: FlattenPayloadResponse) => {
  const { numMessages, payload } = flattenedPayload
  const types = baseTypes()

  for (let i = 0; i < numMessages; i++) {
    const key = payloadMsgField(i)
    const msg = payload[key]

    const typedef = addMsgTypes(types, msg)
    const txType = newType(key, typedef)
    addMsgTypedef(types, txType)
  }

  return types as JSONObject
}

export default eip712Types
