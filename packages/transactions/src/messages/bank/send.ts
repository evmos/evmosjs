import { createMsgSend as protoMsgSend } from '@evmos/proto'
import { generateTypes, createMsgSend, MSG_SEND_TYPES } from '@evmos/eip712'
import { createTransactionPayload, TxContext } from '../base.js'

export interface MsgSendParams {
  destinationAddress: string
  amount: string
  denom: string
}

const createEIP712MsgSend = (context: TxContext, params: MsgSendParams) => {
  const types = generateTypes(MSG_SEND_TYPES)

  const message = createMsgSend(
    params.amount,
    params.denom,
    context.sender.accountAddress,
    params.destinationAddress,
  )

  return {
    types,
    message,
  }
}

const createCosmosMsgSend = (context: TxContext, params: MsgSendParams) => {
  return protoMsgSend(
    context.sender.accountAddress,
    params.destinationAddress,
    params.amount,
    params.denom,
  )
}

/**
 * Creates a transaction for a MsgSend object.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK's
 * {@link https://docs.cosmos.network/main/modules/bank#msgsend | MsgSend}
 *
 * @param context - Transaction Context
 * @param params - MsgSend Params
 * @returns Transaction with the MsgSend payload
 *
 */
export const createTxMsgSend = (context: TxContext, params: MsgSendParams) => {
  const typedData = createEIP712MsgSend(context, params)
  const cosmosMsg = createCosmosMsgSend(context, params)

  return createTransactionPayload(context, typedData, cosmosMsg)
}
