import { createMsgCreateClawbackVestingAccount as protoMsgCreateClawbackVestingAccount } from '@evmos/proto'

import {
  generateTypes,
  createMsgCreateClawbackVestingAccount,
  MSG_CREATE_CLAWBACK_VESTING_ACCOUNT_TYPES,
} from '@evmos/eip712'
import { createTransactionPayload, TxContext } from '../base.js'
import { Period } from '../common.js'

export interface MsgCreateClawbackVestingAccountParams {
  fromAddress: string
  toAddress: string
  startTime: number
  lockupPeriods: Period[]
  vestingPeriods: Period[]
  merge: boolean
}

const createEIP712MsgCreateClawbackVestingAccount = (
  params: MsgCreateClawbackVestingAccountParams,
) => {
  const types = generateTypes(MSG_CREATE_CLAWBACK_VESTING_ACCOUNT_TYPES)

  const message = createMsgCreateClawbackVestingAccount(
    params.fromAddress,
    params.toAddress,
    params.startTime,
    params.lockupPeriods,
    params.vestingPeriods,
    params.merge,
  )

  return {
    types,
    message,
  }
}

const createCosmosMsgCreateClawbackVestingAccount = (
  params: MsgCreateClawbackVestingAccountParams,
) => {
  return protoMsgCreateClawbackVestingAccount(
    params.fromAddress,
    params.toAddress,
    params.startTime,
    params.lockupPeriods,
    params.vestingPeriods,
    params.merge,
  )
}

/**
 * Creates a transaction for a MsgCreateClawbackVestingAccount object.
 *
 * @remarks
 * This method creates a transaction wrapping the Evmos
 * {@link https://docs.evmos.org/protocol/modules/vesting/transactions#createclawbackvestingaccount | MsgCreateClawbackVestingAccount}
 *
 * @param context - Transaction Context
 * @param params - MsgCreateClawbackVestingAccount Params
 * @returns Transaction with the MsgCreateClawbackVestingAccount payload
 *
 */
export const createTxMsgCreateClawbackVestingAccount = (
  context: TxContext,
  params: MsgCreateClawbackVestingAccountParams,
) => {
  const typedData = createEIP712MsgCreateClawbackVestingAccount(params)
  const cosmosMsg = createCosmosMsgCreateClawbackVestingAccount(params)

  return createTransactionPayload(context, typedData, cosmosMsg)
}
