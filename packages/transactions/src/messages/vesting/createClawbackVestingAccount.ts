import {
  createMsgCreateClawbackVestingAccount as protoMsgCreateClawbackVestingAccount,
  createTransaction,
} from '@evmos/proto'

import {
  createEIP712,
  generateFee,
  generateMessage,
  generateTypes,
  createMsgCreateClawbackVestingAccount,
  MSG_CREATE_CLAWBACK_VESTING_ACCOUNT,
} from '@evmos/eip712'

import { Chain, Fee, Period, Sender } from '../common'

export interface MessageMsgCreateClawbackVestingAccount {
  fromAddress: string
  toAddress: string
  startTime: number
  lockupPeriods: Period[]
  vestingPeriods: Period[]
  merge: boolean
}

export function createTxCreateClawbackVestingAccount(
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: MessageMsgCreateClawbackVestingAccount,
) {
  // EIP712
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )
  const types = generateTypes(MSG_CREATE_CLAWBACK_VESTING_ACCOUNT)

  const msg = createMsgCreateClawbackVestingAccount(
    params.fromAddress,
    params.toAddress,
    params.startTime,
    params.lockupPeriods,
    params.vestingPeriods,
    params.merge,
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
  const msgCosmos = protoMsgCreateClawbackVestingAccount(
    params.fromAddress,
    params.toAddress,
    params.startTime,
    params.lockupPeriods,
    params.vestingPeriods,
    params.merge,
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
