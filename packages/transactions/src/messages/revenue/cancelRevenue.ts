import { createMsgCancelRevenue as protoMsgCancelRevenue } from '@evmos/proto'

import {
  generateTypes,
  createMsgCancelRevenue,
  MSG_CANCEL_REVENUE_TYPES,
} from '@evmos/eip712'
import { createTransactionPayload, TxContext } from '../base.js'

export interface MsgCancelRevenueParams {
  contractAddress: string
  deployerAddress: string
}

const createEIP712MsgCancelRevenue = (params: MsgCancelRevenueParams) => {
  const types = generateTypes(MSG_CANCEL_REVENUE_TYPES)

  const message = createMsgCancelRevenue(
    params.contractAddress,
    params.deployerAddress,
  )

  return {
    types,
    message,
  }
}

const createCosmosMsgCancelRevenue = (params: MsgCancelRevenueParams) => {
  return protoMsgCancelRevenue(params.contractAddress, params.deployerAddress)
}

/**
 * Creates a transaction for a `MsgCancelRevenue` object.
 *
 * @remarks
 * This method creates a transaction wrapping the Evmos
 * {@link https://docs.evmos.org/modules/revenue/04_transactions.html#msgcancelrevenue | MsgCancelRevenue}
 *
 * @param context - Transaction Context
 * @param params - MsgCancelRevenue Params
 * @returns Transaction with the MsgCancelRevenue payload
 *
 */
export const createTxMsgCancelRevenue = (
  context: TxContext,
  params: MsgCancelRevenueParams,
) => {
  const typedData = createEIP712MsgCancelRevenue(params)
  const cosmosMsg = createCosmosMsgCancelRevenue(params)

  return createTransactionPayload(context, typedData, cosmosMsg)
}
