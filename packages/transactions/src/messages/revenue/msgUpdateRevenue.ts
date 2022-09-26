import {
  createMsgUpdateRevenue as protoMsgUpdateRevenue,
  createTransaction,
} from '@evmos/proto'

import {
  createEIP712,
  generateFee,
  generateMessage,
  generateTypes,
  createMsgUpdateRevenue,
  MSG_UPDATE_REVENUE_TYPES,
} from '@evmos/eip712'

import { Chain, Fee, Sender } from '../common'

export interface MessageMsgUpdateRevenue {
  contractAddress: string
  deployerAddress: string
  withdrawerAddress: string
  nonces: number[]
}

export function createTxMsgUpdateRevenue(
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: MessageMsgUpdateRevenue,
) {
  // EIP712
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )
  const types = generateTypes(MSG_UPDATE_REVENUE_TYPES)

  const msg = createMsgUpdateRevenue(
    params.contractAddress,
    params.deployerAddress,
    params.withdrawerAddress,
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
  const msgCosmos = protoMsgUpdateRevenue(
    params.contractAddress,
    params.deployerAddress,
    params.withdrawerAddress,
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
