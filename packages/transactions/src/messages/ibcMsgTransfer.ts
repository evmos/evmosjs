import {
  createIBCMsgTransfer as protoCreateIBCMsgTransfer,
  createTransaction,
} from '@evmos/proto'

import {
  createEIP712,
  generateFee,
  generateMessage,
  generateTypes,
  createIBCMsgTransfer,
  IBC_MSG_TRANSFER_TYPES,
} from '@evmos/eip712'

import { Chain, Fee, Sender } from './common'

export interface MessageIBCMsgTransfer {
  // Channel
  sourcePort: string
  sourceChannel: string
  // Token
  amount: string
  denom: string
  // Addresses
  receiver: string
  // Timeout
  revisionNumber: number
  revisionHeight: number
  timeoutTimestamp: string
}

export function createTxIBCMsgTransfer(
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: MessageIBCMsgTransfer,
) {
  // EIP712
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )
  const types = generateTypes(IBC_MSG_TRANSFER_TYPES)

  const msg = createIBCMsgTransfer(
    params.receiver,
    sender.accountAddress,
    params.sourceChannel,
    params.sourcePort,
    params.revisionHeight,
    params.revisionNumber,
    params.timeoutTimestamp,
    params.amount,
    params.denom,
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
  const msgCosmos = protoCreateIBCMsgTransfer(
    params.sourcePort,
    params.sourceChannel,
    params.amount,
    params.denom,
    sender.accountAddress,
    params.receiver,
    params.revisionNumber,
    params.revisionHeight,
    params.timeoutTimestamp,
  )
  const tx = createTransaction(
    msgCosmos,
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
