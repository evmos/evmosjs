import {
  createMsgBeginRedelegate as protoMsgBeginRedelegate,
  createMsgDelegate as protoMsgDelegate,
  createMsgUndelegate as protoMsgUndelegate,
  createMsgWithdrawDelegatorReward as protoeMsgWithdrawDelegatorReward,
  MsgWithdrawDelegatorRewardProtoInterface,
  createTransaction,
  createTransactionWithMultipleMessages,
} from '@astraprotocol/proto'

import {
  createEIP712,
  generateFee,
  generateMessage,
  generateMessageWithMultipleTransactions,
  generateTypes,
  MSG_DELEGATE_TYPES,
  createMsgDelegate,
  MSG_UNDELEGATE_TYPES,
  createMsgUndelegate,
  MSG_BEGIN_REDELEGATE_TYPES,
  createMsgBeginRedelegate,
  MSG_WITHDRAW_DELEGATOR_REWARD_TYPES,
  createMsgWithdrawDelegatorReward,
  MsgWithdrawDelegatorRewardInterface,
} from '@astraprotocol/eip712'

import { Chain, Fee, Sender } from './common'

export interface MsgDelegateParams {
  validatorAddress: string
  amount: string
  denom: string
}

export function createTxMsgDelegate(
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: MsgDelegateParams,
) {
  // EIP712
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )
  const types = generateTypes(MSG_DELEGATE_TYPES)
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

export interface MsgBeginRedelegateParams {
  validatorSrcAddress: string
  validatorDstAddress: string
  amount: string
  denom: string
}

export function createTxMsgBeginRedelegate(
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: MsgBeginRedelegateParams,
) {
  // EIP712
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )
  const types = generateTypes(MSG_BEGIN_REDELEGATE_TYPES)
  const msg = createMsgBeginRedelegate(
    sender.accountAddress,
    params.validatorSrcAddress,
    params.validatorDstAddress,
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
  const protoMessage = protoMsgBeginRedelegate(
    sender.accountAddress,
    params.validatorSrcAddress,
    params.validatorDstAddress,
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

export interface MsgUndelegateParams {
  validatorAddress: string
  amount: string
  denom: string
}

export function createTxMsgUndelegate(
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: MsgUndelegateParams,
) {
  // EIP712
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )
  const types = generateTypes(MSG_UNDELEGATE_TYPES)
  const msg = createMsgUndelegate(
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
  const protoMessage = protoMsgUndelegate(
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

export interface MsgWithdrawDelegatorRewardParams {
  validatorAddress: string
}

export function createTxMsgWithdrawDelegatorReward(
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: MsgWithdrawDelegatorRewardParams,
) {
  // EIP712
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )
  const types = generateTypes(MSG_WITHDRAW_DELEGATOR_REWARD_TYPES)
  const msg = createMsgWithdrawDelegatorReward(
    sender.accountAddress,
    params.validatorAddress,
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
  const protoMessage = protoeMsgWithdrawDelegatorReward(
    sender.accountAddress,
    params.validatorAddress,
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

// Multiple WithdrawRewards
export interface MsgMultipleWithdrawDelegatorRewardParams {
  validatorAddresses: string[]
}

export function createTxMsgMultipleWithdrawDelegatorReward(
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: MsgMultipleWithdrawDelegatorRewardParams,
) {
  // EIP712
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )
  const types = generateTypes(MSG_WITHDRAW_DELEGATOR_REWARD_TYPES)
  // EIP712
  const msgs: MsgWithdrawDelegatorRewardInterface[] = []
  // Cosmos
  const protoMsgs: MsgWithdrawDelegatorRewardProtoInterface[] = []
  params.validatorAddresses.forEach((validator) => {
    msgs.push(
      createMsgWithdrawDelegatorReward(sender.accountAddress, validator),
    )

    protoMsgs.push(
      protoeMsgWithdrawDelegatorReward(sender.accountAddress, validator),
    )
  })

  const messages = generateMessageWithMultipleTransactions(
    sender.accountNumber.toString(),
    sender.sequence.toString(),
    chain.cosmosChainId,
    memo,
    feeObject,
    msgs,
  )
  const eipToSign = createEIP712(types, chain.chainId, messages)

  // Cosmos
  const tx = createTransactionWithMultipleMessages(
    protoMsgs,
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
