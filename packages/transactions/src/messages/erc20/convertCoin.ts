import { createMsgConvertCoin as protoMsgConvertCoin } from '@evmos/proto'

import {
  generateTypes,
  createMsgConvertCoin,
  MSG_CONVERT_COIN_TYPES,
} from '@evmos/eip712'
import { createTransactionPayload, TxContext } from '../base.js'

export interface MsgConvertCoinParams {
  denom: string
  amount: string
  receiverHex: string
  senderBech32: string
}

const createEIP712MsgConvertCoin = (params: MsgConvertCoinParams) => {
  const types = generateTypes(MSG_CONVERT_COIN_TYPES)

  const message = createMsgConvertCoin(
    params.denom,
    params.amount,
    params.receiverHex,
    params.senderBech32,
  )

  return {
    types,
    message,
  }
}

const createCosmosMsgConvertCoin = (params: MsgConvertCoinParams) => {
  return protoMsgConvertCoin(
    params.denom,
    params.amount,
    params.receiverHex,
    params.senderBech32,
  )
}

/**
 * Creates a transaction for a `MsgConvertCoin` object.
 *
 * @remarks
 * This method creates a transaction wrapping the Evmos
 * {@link https://docs.evmos.org/protocol/modules/erc20/transactions#msgconvertcoin | MsgConvertCoin}
 *
 * @param context - Transaction Context
 * @param params - MsgConvertCoin Params
 * @returns Transaction with the MsgConvertCoin payload
 *
 */
export const createTxMsgConvertCoin = (
  context: TxContext,
  params: MsgConvertCoinParams,
) => {
  const typedData = createEIP712MsgConvertCoin(params)
  const cosmosMsg = createCosmosMsgConvertCoin(params)

  return createTransactionPayload(context, typedData, cosmosMsg)
}
