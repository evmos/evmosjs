import {
  createMsgBeginRedelegate as protoMsgBeginRedelegate,
  createMsgDelegate as protoMsgDelegate,
  createMsgUndelegate as protoMsgUndelegate,
  createMsgWithdrawValidatorCommission as protoMsgWithdrawValidatorCommission,
  createTransaction,
  createTransactionWithMultipleMessages,
} from '@evmos/proto'

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
  MSG_WITHDRAW_VALIDATOR_COMMISSION_TYPES,
  createMsgWithdrawValidatorCommission,
} from '@evmos/eip712'

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

export interface MsgWithdrawValidatorCommissionParams {
  validatorAddress: string
}

export function createTxMsgWithdrawValidatorCommission(
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: MsgWithdrawValidatorCommissionParams,
) {
  // EIP712
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )
  const types = generateTypes(MSG_WITHDRAW_VALIDATOR_COMMISSION_TYPES)
  const msg = createMsgWithdrawValidatorCommission(params.validatorAddress)
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
  const protoMessage = protoMsgWithdrawValidatorCommission(
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

// Multiple MsgDelegate
export interface MsgMultipleDelegateParams {
  values: MsgDelegateParams[]
}

export function createTxMsgMultipleDelegate(
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: MsgMultipleDelegateParams,
) {
  // EIP712
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )
  const types = generateTypes(MSG_DELEGATE_TYPES)
  // EIP712
  const msgs: any[] = []
  // Cosmos
  const protoMsgs: any[] = []

  params.values.forEach((msgDelegate) => {
    msgs.push(
      createMsgDelegate(
        sender.accountAddress,
        msgDelegate.validatorAddress,
        msgDelegate.amount,
        msgDelegate.denom,
      ),
    )

    protoMsgs.push(
      protoMsgDelegate(
        sender.accountAddress,
        msgDelegate.validatorAddress,
        msgDelegate.amount,
        msgDelegate.denom,
      ),
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
