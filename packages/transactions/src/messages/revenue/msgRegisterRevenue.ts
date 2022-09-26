import {
  createMsgRegisterRevenue as protoMsgRegisterRevenue,
  createTransaction,
} from '@evmos/proto'

import {
  createEIP712,
  generateFee,
  generateMessage,
  generateTypes,
  createMsgRegisterRevenue,
  MSG_REGISTER_REVENUE_TYPES,
} from '@evmos/eip712'

import { Chain, Fee, Sender } from '../common'

export interface MessageMsgRegisterRevenue {
  contractAddress: string
  deployerAddress: string
  withdrawerAddress: string
  nonces: number[]
}

export function createTxMsgRegisterRevenue(
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: MessageMsgRegisterRevenue,
) {
  // EIP712
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )
  const types = generateTypes(MSG_REGISTER_REVENUE_TYPES)

  const msg = createMsgRegisterRevenue(
    params.contractAddress,
    params.deployerAddress,
    params.withdrawerAddress,
    params.nonces,
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
  const msgCosmos = protoMsgRegisterRevenue(
    params.contractAddress,
    params.deployerAddress,
    params.withdrawerAddress,
    params.nonces,
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
