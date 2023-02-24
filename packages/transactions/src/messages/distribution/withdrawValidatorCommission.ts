import { createMsgWithdrawValidatorCommission as protoMsgWithdrawValidatorCommission } from '@evmos/proto'

import {
  generateTypes,
  MSG_WITHDRAW_VALIDATOR_COMMISSION_TYPES,
  createMsgWithdrawValidatorCommission,
} from '@evmos/eip712'
import { createTransactionPayload, TxContext } from '../base.js'

export interface MsgWithdrawValidatorCommissionParams {
  validatorAddress: string
}

const createEIP712MsgWithdrawValidatorCommission = (
  params: MsgWithdrawValidatorCommissionParams,
) => {
  const types = generateTypes(MSG_WITHDRAW_VALIDATOR_COMMISSION_TYPES)

  const message = createMsgWithdrawValidatorCommission(params.validatorAddress)

  return {
    types,
    message,
  }
}

const createCosmosMsgWithdrawValidatorCommission = (
  params: MsgWithdrawValidatorCommissionParams,
) => {
  return protoMsgWithdrawValidatorCommission(params.validatorAddress)
}

/**
 * Creates a transaction for a MsgWithdrawValidatorCommission object.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK's
 * {@link https://docs.cosmos.network/main/modules/distribution#withdrawvalidatorcommission | MsgWithdrawValidatorCommission}
 *
 * @param context - Transaction Context
 * @param params - MsgWithdrawValidatorCommission Params
 * @returns Transaction with the MsgWithdrawValidatorCommission payload
 *
 */
export const createTxMsgWithdrawValidatorCommission = (
  context: TxContext,
  params: MsgWithdrawValidatorCommissionParams,
) => {
  const typedData = createEIP712MsgWithdrawValidatorCommission(params)
  const cosmosMsg = createCosmosMsgWithdrawValidatorCommission(params)

  return createTransactionPayload(context, typedData, cosmosMsg)
}
