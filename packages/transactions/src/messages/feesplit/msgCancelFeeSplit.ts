import {
  createMsgCancelFeeSplit as protoMsgCancelFeeSplit,
  createTransaction,
} from '@evmos/proto'

import {
  createEIP712,
  generateFee,
  generateMessage,
  generateTypes,
  createMsgCancelFeeSplit,
  MSG_CANCEL_FEE_SPLIT_TYPES,
} from '@evmos/eip712'

import { Chain, Fee, Sender } from '../common'

export interface MessageMsgCancelFeeSplit {
  contractAddress: string
  deployerAddress: string
}

export function createTxMsgCancelFeeSplit(
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: MessageMsgCancelFeeSplit,
) {
  // EIP712
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )
  const types = generateTypes(MSG_CANCEL_FEE_SPLIT_TYPES)

  const msg = createMsgCancelFeeSplit(
    params.contractAddress,
    params.deployerAddress,
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
  const msgCosmos = protoMsgCancelFeeSplit(
    params.contractAddress,
    params.deployerAddress,
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
