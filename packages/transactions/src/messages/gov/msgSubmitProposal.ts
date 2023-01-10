import {
  createMsgSubmitProposal as protoCreateMsgSubmitProposal,
  createTransaction,
} from '@evmos/proto'

import {
  createEIP712,
  generateFee,
  generateMessage,
  generateTypes,
  createMsgSubmitProposal,
  MSG_SUBMIT_TYPES,
} from '@evmos/eip712'

import { Chain, Fee, Sender } from '../common'

export interface MessageMsgSubmitProposal {
  content: any
  initialDepositDenom: string
  initialDepositAmount: string
  proposer: string
  extraEip: any
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
  const submitTypes = MSG_SUBMIT_TYPES
  submitTypes.MsgValue[0].type = 'ProposalType'
  const types = generateTypes(submitTypes)
  Object.assign(types, params.extraEip)

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
