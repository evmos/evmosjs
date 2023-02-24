import { parseChainId } from './utils'
import { MSG_VOTE_TYPES } from '../messages/gov'
import { MSG_SEND_TYPES } from '../messages/bank'
import { generateTypes, createEIP712 } from '../messages/base'
import { MSG_DELEGATE_TYPES } from '../messages/staking'

export const MSG_TYPES = {
  MSG_SEND: 'cosmos-sdk/MsgSend',
  MSG_VOTE: 'cosmos-sdk/MsgVote',
  MSG_DELEGATE: 'cosmos-sdk/MsgDelegate',
}

// Get the feePayer from the message, using the message structure.
// This is required to provide the feePayer in the EIP712 object, and
// because Amino JS representations are in JSON and have no better interface.
// Throws on error.
export function getFeePayerFromMsg(msg: any) {
  switch (msg.type) {
    case MSG_TYPES.MSG_SEND:
      return msg.value.from_address
    case MSG_TYPES.MSG_VOTE:
      return msg.value.voter
    case MSG_TYPES.MSG_DELEGATE:
      return msg.value.delegator_address
    default:
      throw new Error('Unsupported message type')
  }
}

// Return the SignDoc post-formatting. Throws on error.
function formatSignDoc(signDoc: any) {
  const signDocCpy: any = {}
  Object.assign(signDocCpy, signDoc)

  // Fill in the feePayer if the field is blank or unset
  if (
    !Object.keys(signDoc.fee).includes('feePayer') ||
    signDoc.fee.feePayer === ''
  ) {
    signDocCpy.fee.feePayer = getFeePayerFromMsg(signDoc.msgs[0])
  }

  return signDocCpy
}

// Generate EIP-712 types for the given message
export function eip712MessageType(msg: any) {
  switch (msg.type) {
    case MSG_TYPES.MSG_SEND:
      return generateTypes(MSG_SEND_TYPES)
    case MSG_TYPES.MSG_VOTE:
      return generateTypes(MSG_VOTE_TYPES)
    case MSG_TYPES.MSG_DELEGATE:
      return generateTypes(MSG_DELEGATE_TYPES)
    default:
      throw new Error('Unsupported message type in SignDoc')
  }
}

// Decodes the AminoSignDoc to EIP712 types. Throws on error.
export function decodeAminoSignDoc(bytes: Uint8Array) {
  const rawSignDoc = JSON.parse(Buffer.from(bytes).toString())

  // Enforce single-message signing for now
  if (rawSignDoc.msgs.length !== 1) {
    throw new Error(
      `Expected single message in Amino SignDoc but received ${rawSignDoc.msgs.length}.`,
    )
  }

  // Format SignDoc to match EIP-712 types
  const signDoc = formatSignDoc(rawSignDoc)
  const chainId = signDoc.chain_id

  const msg = signDoc.msgs[0]
  const type = eip712MessageType(msg)

  return createEIP712(type, parseChainId(chainId), signDoc)
}
