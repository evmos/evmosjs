import { createMsgSend as protoCreateMsgSend } from '@evmos/proto'
import { newCreateTransactionPayload, TxContext } from '../base.js'

export interface MsgSendParams {
  destinationAddress: string
  amount: string
  denom: string
}

const createMsgSend = (context: TxContext, params: MsgSendParams) => {
  return protoCreateMsgSend(
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
  const msgSend = createMsgSend(context, params)
  return newCreateTransactionPayload(context, msgSend)
  // Works with multiple messages
  // return newCreateTransactionPayload(context, [msgSend, msgSend])
}
