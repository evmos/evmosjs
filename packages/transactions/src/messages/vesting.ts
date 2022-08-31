import {
  createMsgVesting as protoMsgVesting,
  createMsgClawback as protoMsgClawback,
  createTransaction,
  createTransactionWithMultipleMessages,
} from '@astradefi/proto'

import {
  createEIP712,
  generateFee,
  generateMessage,
  generateTypes,
  createMsgVesting,
  createMsgClawback,
  MSG_VESTING_TYPES,
  MSG_CLAWBACK_TYPES,
  generateMessageWithMultipleTransactions,
} from '@astradefi/eip712'

import { Chain, Fee, Sender } from './common'

interface Coin {
  denom: string
  amount: string
}

interface Period {
  length: string
  amount: Coin[]
}

export interface VestingSendParams {
  destinationAddress: string
  startTime: string
  lockupPeriod: Period[]
  vestingPeriod: Period[]
}

export interface VestingClawbackParams {
  accountAddress: string
  destAddress: string
}

export function createMessageVesting(
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: VestingSendParams,
) {
  /**
   * EIP712
   */
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )
  const types = generateTypes(MSG_VESTING_TYPES)

  const msg = createMsgVesting(
    sender.accountAddress,
    params.destinationAddress,
    params.startTime,
    params.lockupPeriod,
    params.vestingPeriod,
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

  /**
   * Cosmos
   */
  const msgVesting = protoMsgVesting(
    sender.accountAddress,
    params.destinationAddress,
    params.startTime,
    params.lockupPeriod,
    params.vestingPeriod,
  )

  const tx = createTransaction(
    msgVesting,
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

export function createMessageClawback(
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: VestingClawbackParams,
) {
  /**
   * EIP712
   */
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )
  const types = generateTypes(MSG_CLAWBACK_TYPES)

  const msg = createMsgClawback(
    sender.accountAddress,
    params.accountAddress,
    params.destAddress,
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

  /**
   * Cosmos
   */
  const msgClawback = protoMsgClawback(
    sender.accountAddress,
    params.accountAddress,
    params.destAddress,
  )

  const tx = createTransaction(
    msgClawback,
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

export function createMultipleMessageVestings(
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: VestingSendParams[],
) {
  /**
   * EIP712
   */
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )
  const types = generateTypes(MSG_VESTING_TYPES)

  const msgs = params.map((param) =>
    createMsgVesting(
      sender.accountAddress,
      param.destinationAddress,
      param.startTime,
      param.lockupPeriod,
      param.vestingPeriod,
    ),
  )

  const messages = generateMessageWithMultipleTransactions(
    sender.accountNumber.toString(),
    sender.sequence.toString(),
    chain.cosmosChainId,
    memo,
    feeObject,
    msgs,
  )
  const eipToSign = createEIP712(types, chain.chainId, messages)

  /**
   * Cosmos
   */
  const msgVestings = params.map((param) =>
    protoMsgVesting(
      sender.accountAddress,
      param.destinationAddress,
      param.startTime,
      param.lockupPeriod,
      param.vestingPeriod,
    ),
  )

  const tx = createTransactionWithMultipleMessages(
    msgVestings,
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

export function createMultipleMessageClawbacks(
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: VestingClawbackParams[],
) {
  /**
   * EIP712
   */
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )
  const types = generateTypes(MSG_CLAWBACK_TYPES)

  const msgs = params.map((param) =>
    createMsgClawback(
      sender.accountAddress,
      param.accountAddress,
      param.destAddress,
    ),
  )

  const messages = generateMessageWithMultipleTransactions(
    sender.accountNumber.toString(),
    sender.sequence.toString(),
    chain.cosmosChainId,
    memo,
    feeObject,
    msgs,
  )
  const eipToSign = createEIP712(types, chain.chainId, messages)

  /**
   * Cosmos
   */
  const msgClawbacks = params.map((param) =>
    protoMsgClawback(
      sender.accountAddress,
      param.accountAddress,
      param.destAddress,
    ),
  )

  const tx = createTransactionWithMultipleMessages(
    msgClawbacks,
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
