import { createIBCMsgTransfer as protoIBCMsgTransfer } from '@evmos/proto'

import {
  generateTypes,
  createIBCMsgTransfer,
  IBC_MSG_TRANSFER_TYPES,
} from '@evmos/eip712'
import { createTransactionPayload, TxContext } from '../base'

export interface IBCMsgTransferParams {
  // Connection
  sourcePort: string
  sourceChannel: string
  // Token
  amount: string
  denom: string
  // Addresses
  receiver: string
  // Timeout
  revisionNumber: number
  revisionHeight: number
  timeoutTimestamp: string
}

const createEIP712IBCMsgTransfer = (
  context: TxContext,
  params: IBCMsgTransferParams,
) => {
  const types = generateTypes(IBC_MSG_TRANSFER_TYPES)

  const message = createIBCMsgTransfer(
    params.receiver,
    context.sender.accountAddress,
    params.sourceChannel,
    params.sourcePort,
    params.revisionHeight,
    params.revisionNumber,
    params.timeoutTimestamp,
    params.amount,
    params.denom,
  )

  return {
    types,
    message,
  }
}

const createCosmosIBCMsgTransfer = (
  context: TxContext,
  params: IBCMsgTransferParams,
) => {
  return protoIBCMsgTransfer(
    params.sourcePort,
    params.sourceChannel,
    params.amount,
    params.denom,
    context.sender.accountAddress,
    params.receiver,
    params.revisionNumber,
    params.revisionHeight,
    params.timeoutTimestamp,
  )
}

/**
 * Creates a transaction for a `IBCMsgTransfer` object.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK
 * {@link https://github.com/cosmos/ibc-go/blob/main/docs/apps/transfer/messages.md | IBCMsgTransfer}
 *
 * @param context - Transaction Context
 * @param params - IBCMsgTransfer Params
 * @returns Transaction with the IBCMsgTransfer payload
 *
 */
export const createTxIBCMsgTransfer = (
  context: TxContext,
  params: IBCMsgTransferParams,
) => {
  const typedData = createEIP712IBCMsgTransfer(context, params)
  const cosmosMsg = createCosmosIBCMsgTransfer(context, params)

  return createTransactionPayload(context, typedData, cosmosMsg)
}
