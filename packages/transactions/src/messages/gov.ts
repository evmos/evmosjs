import {
  createMsgVote as protoCreateMsgVote,
  createTransaction,
} from '@tharsis/proto'

import {
  createEIP712,
  generateFee,
  generateMessage,
  generateTypes,
  createMsgVote,
  msgVoteTypes,
} from '@tharsis/eip712'

import { Chain, Fee, Sender } from './common'

export interface MessageMsgVote {
  proposalId: number
  option: number
}

export function createTxMsgVote(
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: MessageMsgVote,
) {
  // EIP712
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )
  const types = generateTypes(msgVoteTypes)

  const msg = createMsgVote(
    params.proposalId,
    params.option,
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
  const msgCosmos = protoCreateMsgVote(
    params.proposalId,
    params.option,
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
