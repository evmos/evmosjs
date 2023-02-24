import { createMsgUpdateRevenue as protoMsgUpdateRevenue } from '@evmos/proto'

import {
  generateTypes,
  createMsgUpdateRevenue,
  MSG_UPDATE_REVENUE_TYPES,
} from '@evmos/eip712'

import { createTransactionPayload, TxContext } from '../base.js'

export interface MsgUpdateRevenueParams {
  contractAddress: string
  deployerAddress: string
  withdrawerAddress: string
}

const createEIP712MsgUpdateRevenue = (params: MsgUpdateRevenueParams) => {
  const types = generateTypes(MSG_UPDATE_REVENUE_TYPES)

  const message = createMsgUpdateRevenue(
    params.contractAddress,
    params.deployerAddress,
    params.withdrawerAddress,
  )

  return {
    types,
    message,
  }
}

const createCosmosMsgUpdateRevenue = (params: MsgUpdateRevenueParams) => {
  return protoMsgUpdateRevenue(
    params.contractAddress,
    params.deployerAddress,
    params.withdrawerAddress,
  )
}

/**
 * Creates a transaction for a `MsgUpdateRevenue` object.
 *
 * @remarks
 * This method creates a transaction wrapping the Evmos
 * {@link https://docs.evmos.org/modules/revenue/04_transactions.html#msgupdaterevenue | MsgUpdateRevenue}
 *
 * @param context - Transaction Context
 * @param params - MsgUpdateRevenue Params
 * @returns Transaction with the MsgUpdateRevenue payload
 *
 */
export const createTxMsgUpdateRevenue = (
  context: TxContext,
  params: MsgUpdateRevenueParams,
) => {
  const typedData = createEIP712MsgUpdateRevenue(params)
  const cosmosMsg = createCosmosMsgUpdateRevenue(params)

  return createTransactionPayload(context, typedData, cosmosMsg)
}
