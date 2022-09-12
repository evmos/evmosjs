import {
  createMsgConvertCoin as protoMsgConvertCoin,
  createTransaction,
} from '@evmos/proto'

import {
  createEIP712,
  generateFee,
  generateMessage,
  generateTypes,
  createMsgConvertCoin,
  MSG_CONVERT_COIN_TYPES,
} from '@evmos/eip712'

import { Chain, Fee, Sender } from '../common'

export interface MessageMsgConvertCoin {
  denom: string
  amount: string
  receiverHexFormatted: string
  senderEvmosFormatted: string
}

export function createTxMsgConvertCoin(
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: MessageMsgConvertCoin,
) {
  // EIP712
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )
  const types = generateTypes(MSG_CONVERT_COIN_TYPES)

  const msg = createMsgConvertCoin(
    params.denom,
    params.amount,
    params.receiverHexFormatted,
    params.senderEvmosFormatted,
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
  const msgCosmos = protoMsgConvertCoin(
    params.denom,
    params.amount,
    params.receiverHexFormatted,
    params.senderEvmosFormatted,
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
