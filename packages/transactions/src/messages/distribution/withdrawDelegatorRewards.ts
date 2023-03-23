import { createMsgWithdrawDelegatorReward as protoMsgWithdrawDelegatorReward } from '@evmos/proto'

import {
  generateTypes,
  MSG_WITHDRAW_DELEGATOR_REWARD_TYPES,
  createMsgWithdrawDelegatorReward,
} from '@evmos/eip712'
import { createTransactionPayload, TxContext } from '../base.js'

export interface MsgWithdrawDelegatorRewardParams {
  validatorAddress: string
}

const createEIP712MsgWithdrawDelegatorReward = (
  context: TxContext,
  params: MsgWithdrawDelegatorRewardParams,
) => {
  const types = generateTypes(MSG_WITHDRAW_DELEGATOR_REWARD_TYPES)

  const message = createMsgWithdrawDelegatorReward(
    context.sender.accountAddress,
    params.validatorAddress,
  )

  return {
    types,
    message,
  }
}

const createCosmosMsgWithdrawDelegatorReward = (
  context: TxContext,
  params: MsgWithdrawDelegatorRewardParams,
) => {
  return protoMsgWithdrawDelegatorReward(
    context.sender.accountAddress,
    params.validatorAddress,
  )
}

/**
 * Creates a transaction for a MsgWithdrawRewards object.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK's
 * {@link https://docs.cosmos.network/main/modules/distribution#msgwithdrawdelegatorreward | MsgWithdrawDelegatorReward}
 *
 * @param context - Transaction Context
 * @param params - MsgWithdrawDelegatorReward Params
 * @returns Transaction with the MsgWithdrawDelegatorReward payload
 *
 */
export const createTxMsgWithdrawDelegatorReward = (
  context: TxContext,
  params: MsgWithdrawDelegatorRewardParams,
) => {
  const typedData = createEIP712MsgWithdrawDelegatorReward(context, params)
  const cosmosMsg = createCosmosMsgWithdrawDelegatorReward(context, params)

  return createTransactionPayload(context, typedData, cosmosMsg)
}
