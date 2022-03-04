import {
  createMsgDelegate as protoMsgDelegate,
  createTransaction,
} from '@tharsis/proto'

import {
  createEIP712,
  generateFee,
  generateMessage,
  generateTypes,
  createMsgDelegate,
  msgDelegateTypes,
} from '@tharsis/eip712'

import { Chain, Fee, Sender } from './common'

export interface msgDelegateParams {
  validatorAddress: string
  amount: string
  denom: string
}

export function createTxMsgDelegate(
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: msgDelegateParams,
) {
  // EIP712
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )
  const types = generateTypes(msgDelegateTypes)
  const msg = createMsgDelegate(
    sender.accountAddress,
    params.validatorAddress,
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
  const protoMessage = protoMsgDelegate(
    sender.accountAddress,
    params.validatorAddress,
    params.amount,
    params.denom,
  )
  const tx = createTransaction(
    protoMessage,
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
