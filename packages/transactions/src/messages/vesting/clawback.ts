import { createMsgClawback as protoMsgClawback } from '@evmos/proto'
import {
  generateTypes,
  createMsgClawback,
  MSG_CLAWBACK_TYPES,
} from '@evmos/eip712'
import { createTransactionPayload, TxContext } from '../base.js'

export interface MsgClawbackParams {
  funderAddress: string
  accountAddress: string
  destAddress?: string
}

const createEIP712MsgClawback = (params: MsgClawbackParams) => {
  const types = generateTypes(MSG_CLAWBACK_TYPES)

  const message = createMsgClawback(
    params.funderAddress,
    params.accountAddress,
    params.destAddress,
  )

  return {
    types,
    message,
  }
}

const createCosmosMsgClawback = (params: MsgClawbackParams) => {
  return protoMsgClawback(
    params.funderAddress,
    params.accountAddress,
    params.destAddress,
  )
}

/**
 * Creates a transaction for a MsgClawback object.
 *
 * @remarks
 * This method creates a transaction wrapping the Evmos
 * {@link https://docs.evmos.org/protocol/modules/vesting/transactions#clawback | MsgClawback}
 *
 * @param context - Transaction Context
 * @param params - MsgClawback Params
 * @returns Transaction with the MsgClawback payload
 *
 */
export const createTxMsgClawback = (
  context: TxContext,
  params: MsgClawbackParams,
) => {
  const typedData = createEIP712MsgClawback(params)
  const cosmosMsg = createCosmosMsgClawback(params)

  return createTransactionPayload(context, typedData, cosmosMsg)
}
