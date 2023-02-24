import { createMsgDeposit as protoMsgDeposit } from '@evmos/proto'
import {
  generateTypes,
  createMsgDeposit,
  MSG_DEPOSIT_TYPES,
} from '@evmos/eip712'
import { createTransactionPayload, TxContext } from '../base.js'

export interface MsgDepositParams {
  proposalId: number
  deposit: {
    denom: string
    amount: string
  }
}

const createEIP712MsgDeposit = (
  context: TxContext,
  params: MsgDepositParams,
) => {
  const types = generateTypes(MSG_DEPOSIT_TYPES)

  const message = createMsgDeposit(
    params.proposalId,
    context.sender.accountAddress,
    params.deposit,
  )

  return {
    types,
    message,
  }
}

const createCosmosMsgDeposit = (
  context: TxContext,
  params: MsgDepositParams,
) => {
  return protoMsgDeposit(
    params.proposalId,
    context.sender.accountAddress,
    params.deposit,
  )
}

/**
 * Creates a transaction for a MsgDeposit object.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK's
 * {@link https://docs.cosmos.network/main/modules/gov#deposit-2 | MsgDeposit}
 *
 * @param context - Transaction Context
 * @param params - MsgDeposit Params
 * @returns Transaction with the MsgDeposit payload
 *
 */
export const createTxMsgDeposit = (
  context: TxContext,
  params: MsgDepositParams,
) => {
  const typedData = createEIP712MsgDeposit(context, params)
  const cosmosMsg = createCosmosMsgDeposit(context, params)

  return createTransactionPayload(context, typedData, cosmosMsg)
}
