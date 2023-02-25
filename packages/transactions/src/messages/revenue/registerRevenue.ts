import { createMsgRegisterRevenue as protoMsgRegisterRevenue } from '@evmos/proto'

import {
  generateTypes,
  createMsgRegisterRevenue,
  MSG_REGISTER_REVENUE_TYPES,
} from '@evmos/eip712'
import { createTransactionPayload, TxContext } from '../base.js'

export interface MsgRegisterRevenueParams {
  contractAddress: string
  deployerAddress: string
  withdrawerAddress: string
  nonces: number[]
}

const createEIP712MsgRegisterRevenue = (params: MsgRegisterRevenueParams) => {
  const types = generateTypes(MSG_REGISTER_REVENUE_TYPES)

  const message = createMsgRegisterRevenue(
    params.contractAddress,
    params.deployerAddress,
    params.withdrawerAddress,
    params.nonces,
  )

  return {
    types,
    message,
  }
}

const createCosmosMsgRegisterRevenue = (params: MsgRegisterRevenueParams) => {
  return protoMsgRegisterRevenue(
    params.contractAddress,
    params.deployerAddress,
    params.withdrawerAddress,
    params.nonces,
  )
}

/**
 * Creates a transaction for a `MsgRegisterRevenue` object.
 *
 * @remarks
 * This method creates a transaction wrapping the Evmos
 * {@link https://docs.evmos.org/modules/revenue/04_transactions.html#msgregisterrevenue | MsgRegisterRevenue}
 *
 * @param context - Transaction Context
 * @param params - MsgRegisterRevenue Params
 * @returns Transaction with the MsgRegisterRevenue payload
 *
 */
export const createTxMsgRegisterRevenue = (
  context: TxContext,
  params: MsgRegisterRevenueParams,
) => {
  const typedData = createEIP712MsgRegisterRevenue(params)
  const cosmosMsg = createCosmosMsgRegisterRevenue(params)

  return createTransactionPayload(context, typedData, cosmosMsg)
}
