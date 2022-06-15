import {
  createMsgConvertERC20 as protoMsgConvertERC20,
  createTransaction,
} from '@astraprotocol/proto'

import {
  createEIP712,
  generateFee,
  generateMessage,
  generateTypes,
  createMsgConvertERC20,
  MSG_CONVERT_ERC20_TYPES,
} from '@astraprotocol/eip712'

import { Chain, Fee, Sender } from '../common'

/* eslint-disable camelcase */
export interface MessageMsgConvertERC20 {
  contract_address: string
  amount: string
  receiverEvmosFormatted: string
  senderHexFormatted: string
}

export function createTxMsgConvertERC20(
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: MessageMsgConvertERC20,
) {
  // EIP712
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )
  const types = generateTypes(MSG_CONVERT_ERC20_TYPES)

  const msg = createMsgConvertERC20(
    params.contract_address,
    params.amount,
    params.receiverEvmosFormatted,
    params.senderHexFormatted,
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
  const msgCosmos = protoMsgConvertERC20(
    params.contract_address,
    params.amount,
    params.receiverEvmosFormatted,
    params.senderHexFormatted,
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
