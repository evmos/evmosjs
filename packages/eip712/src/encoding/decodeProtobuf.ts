import { Registry } from '@cosmjs/proto-signing'
import { AuthInfo, SignDoc, TxBody } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
import { MsgVote } from 'cosmjs-types/cosmos/gov/v1beta1/tx'
import { MsgDelegate } from 'cosmjs-types/cosmos/staking/v1beta1/tx'
import { parseChainId } from './utils'
import { MSG_TYPES, eip712MessageType, getFeePayerFromMsg } from './decodeAmino'
import { createEIP712, generateFee, generateMessage } from '../messages/base'

const Long = require('long')
const { isLong } = require('long')

export const PROTO_MSG_TYPES = {
  MSG_SEND: '/cosmos.bank.v1beta1.MsgSend',
  MSG_VOTE: '/cosmos.gov.v1beta1.MsgVote',
  MSG_DELEGATE: '/cosmos.staking.v1beta1.MsgDelegate',
}

function protobufTypeUrlToAminoType(typeUrl: string) {
  switch (typeUrl) {
    case PROTO_MSG_TYPES.MSG_SEND:
      return MSG_TYPES.MSG_SEND
    case PROTO_MSG_TYPES.MSG_VOTE:
      return MSG_TYPES.MSG_VOTE
    case PROTO_MSG_TYPES.MSG_DELEGATE:
      return MSG_TYPES.MSG_DELEGATE
    default:
      throw new Error('Invalid Protobuf message type url received')
  }
}

// Convert a Protobuf Message to its corresponding Amino representation since
// EIP-712 types require messages to be in Amino form.
function convertProtobufMsgToAminoMsg(obj: any) {
  // Return primitive types
  if (typeof obj !== 'object') {
    return obj
  }

  // Format all elements within the array
  if (Array.isArray(obj)) {
    const formattedArray: any[] = []
    obj.forEach((el) => {
      formattedArray.push(convertProtobufMsgToAminoMsg(el))
    })
    return formattedArray
  }

  // Convert Long objects to string, since Longs are not recognized
  // by EIP-712 types.
  if (isLong(obj)) {
    return new Long(obj).toString()
  }

  // Recursively convert camel case instances to snake case to match expected fields
  const camelToSnakeCase = (str: string) =>
    str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)

  const formattedObj: any = {}
  Object.keys(obj).forEach((key) => {
    formattedObj[camelToSnakeCase(key)] = convertProtobufMsgToAminoMsg(obj[key])
  })

  return formattedObj
}

// Generate Protobuf registry
function eip712ProtobufRegistry(): Registry {
  const registry = new Registry()
  // Registry includes MSG_SEND by default
  registry.register(PROTO_MSG_TYPES.MSG_VOTE, MsgVote)
  registry.register(PROTO_MSG_TYPES.MSG_DELEGATE, MsgDelegate)

  return registry
}

// Decodes the ProtobufSignDoc to EIP712. Throws on error.
export function decodeProtobufSignDoc(bytes: Uint8Array) {
  // Decode Protobuf tx
  const registry = eip712ProtobufRegistry()

  const signDoc = SignDoc.decode(bytes)
  const txBody = TxBody.decode(signDoc.bodyBytes)
  const authInfo = AuthInfo.decode(signDoc.authInfoBytes)

  // Enforce single message for now
  if (txBody.messages.length !== 1) {
    throw new Error(
      `Expected single message in Protobuf SignDoc but received ${txBody.messages.length}.`,
    )
  }
  const msgBytes = txBody.messages[0]

  // Enforce single signer for now
  if (authInfo.signerInfos.length !== 1) {
    throw new Error(
      `Expected single signer in Protobuf SignDoc but received ${authInfo.signerInfos.length}.`,
    )
  }
  const signer = authInfo.signerInfos[0]

  // Enforce presence of fee
  if (!authInfo.fee) {
    throw new Error(
      'Expected fee object to be included in payload, got undefined',
    )
  }

  // Enforce single fee
  if (authInfo.fee.amount.length !== 1) {
    throw new Error(
      `Expected single fee in Protobuf SignDoc but received ${authInfo.fee?.amount.length}`,
    )
  }
  const amount = authInfo.fee.amount[0]

  // Parse SignDoc fields
  const accountNumber = signDoc.accountNumber.toString()
  const sequence = signer.sequence.toString()
  const { chainId } = signDoc
  const { memo } = txBody

  // Decode message using registry
  const protoMsg = registry.decode(msgBytes)

  // Convert Protobuf message to expected Amino type
  const aminoMsg = {
    type: protobufTypeUrlToAminoType(msgBytes.typeUrl),
    value: convertProtobufMsgToAminoMsg(protoMsg),
  }

  // Use the feePayer from the message if unset in body
  let feePayer = authInfo.fee?.payer
  if (!feePayer || feePayer === '') {
    feePayer = getFeePayerFromMsg(aminoMsg)
  }

  const gasLimit = authInfo.fee.gasLimit.toString()

  const fee = generateFee(amount.amount, amount.denom, gasLimit, feePayer)

  const type = eip712MessageType(aminoMsg)

  const eip712Tx = generateMessage(
    accountNumber,
    sequence,
    chainId,
    memo,
    fee,
    aminoMsg,
  )

  return createEIP712(type, parseChainId(chainId), eip712Tx)
}
