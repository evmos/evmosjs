import { createMsgCancelUnbondingDelegation as protoMsgCancelUnbondingDelegation } from '@evmos/proto'

import {
  generateTypes,
  MSG_CANCEL_UNBONDING_DELEGATION_TYPES,
  createMsgCancelUnbondingDelegation,
} from '@evmos/eip712'

import { createTransactionPayload, TxContext } from '../base.js'

export interface MsgCancelUnbondingDelegationParams {
  delegatorAddress: string
  validatorAddress: string
  amount: string
  denom: string
  creationHeight: string
}

const createEIP712MsgCancelUnbondingDelegation = (
  params: MsgCancelUnbondingDelegationParams,
) => {
  const types = generateTypes(MSG_CANCEL_UNBONDING_DELEGATION_TYPES)

  const message = createMsgCancelUnbondingDelegation(
    params.delegatorAddress,
    params.validatorAddress,
    params.amount,
    params.denom,
    params.creationHeight,
  )

  return {
    types,
    message,
  }
}

const createCosmosMsgCancelUnbondingDelegation = (
  params: MsgCancelUnbondingDelegationParams,
) => {
  return protoMsgCancelUnbondingDelegation(
    params.delegatorAddress,
    params.validatorAddress,
    params.amount,
    params.denom,
    params.creationHeight,
  )
}

/**
 * Creates a transaction for a MsgCancelUnbondingDelegation object.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK's
 * {@link https://docs.cosmos.network/main/modules/staking#msgcancelunbondingdelegation | MsgCancelUnbondingDelegation}
 *
 * @param context - Transaction Context
 * @param params - MsgCancelUnbondingDelegation Params
 * @returns Transaction with the MsgCancelUnbondingDelegation payload
 *
 */
export const createTxMsgCancelUnbondingDelegation = (
  context: TxContext,
  params: MsgCancelUnbondingDelegationParams,
) => {
  const typedData = createEIP712MsgCancelUnbondingDelegation(params)
  const cosmosMsg = createCosmosMsgCancelUnbondingDelegation(params)

  return createTransactionPayload(context, typedData, cosmosMsg)
}
