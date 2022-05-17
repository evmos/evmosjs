import {
  createMsgSend as protoMsgSend,
  createTransaction,
} from '@astraprotocol/proto'

import {
  createEIP712,
  generateFee,
  generateMessage,
  generateTypes,
  createMsgSend,
  MSG_SEND_TYPES,
} from '@astraprotocol/eip712'

import { Chain, Fee, Sender } from './common'

export interface MessageSendParams {
  destinationAddress: string
  amount: string
  denom: string
}

export function createMessageSend(
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: MessageSendParams,
) {
  // EIP712
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )
  const types = generateTypes(MSG_SEND_TYPES)
  const msg = createMsgSend(
    params.amount,
    params.denom,
    sender.accountAddress,
    params.destinationAddress,
  )
  const messages = generateMessage(
    sender.accountNumber.toString(),
    sender.sequence.toString(),
    chain.cosmosChainId,
    memo,
    feeObject,
    msg,
  )
  const eipToSign = createEIP712(types, chain.chainId, messages)

  // Cosmos
  const msgSend = protoMsgSend(
    sender.accountAddress,
    params.destinationAddress,
    params.amount,
    params.denom,
  )
  const tx = createTransaction(
    msgSend,
    memo,
    fee.amount,
    fee.denom,
    parseInt(fee.gas, 10),
    'ethsecp256',
    sender.pubkey,
    sender.sequence,
    sender.accountNumber,
    chain.cosmosChainId,
  )

  return {
    signDirect: tx.signDirect,
    legacyAmino: tx.legacyAmino,
    eipToSign,
  }
}
