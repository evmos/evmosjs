import {
  createMsgSubmitProposal as protoCreateMsgSubmitProposal,
  createTransaction,
} from '@tharsis/proto'

import {
  createEIP712,
  generateFee,
  generateMessage,
  generateTypes,
  createMsgSubmitProposal,
  MSG_VOTE_TYPES,
} from '@tharsis/eip712'

import { Chain, Fee, Sender } from '../common'

export interface MessageMsgSubmitProposal {
  content: any
  initialDepositDenom: string
  initialDepositAmount: string
  proposer: string
}

export function createTxMsgSubmitProposal(
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: MessageMsgSubmitProposal,
) {
  // EIP712
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )
  const types = generateTypes(MSG_VOTE_TYPES)

  const msg = createMsgSubmitProposal(
    params.content,
    params.initialDepositDenom,
    params.initialDepositAmount,
    sender.accountAddress,
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
  const msgCosmos = protoCreateMsgSubmitProposal(
    params.content,
    params.initialDepositDenom,
    params.initialDepositAmount,
    sender.accountAddress,
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
