import { createMsgSetWithdrawAddress as protoMsgSetWithdrawAddress } from '@evmos/proto'

import {
  generateTypes,
  MSG_SET_WITHDRAW_ADDRESS_TYPES,
  createMsgSetWithdrawAddress,
} from '@evmos/eip712'
import { createTransactionPayload, TxContext } from '../base.js'

export interface MsgSetWithdrawAddressParams {
  delegatorAddress: string
  withdrawAddress: string
}

const createEIP712MsgSetWithdrawAddress = (
  params: MsgSetWithdrawAddressParams,
) => {
  const types = generateTypes(MSG_SET_WITHDRAW_ADDRESS_TYPES)

  const message = createMsgSetWithdrawAddress(
    params.delegatorAddress,
    params.withdrawAddress,
  )

  return {
    types,
    message,
  }
}

const createCosmosMsgSetWithdrawAddress = (
  params: MsgSetWithdrawAddressParams,
) => {
  return protoMsgSetWithdrawAddress(
    params.delegatorAddress,
    params.withdrawAddress,
  )
}

/**
 * Creates a transaction for a MsgWithdrawRewards object.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK's
 * {@link https://docs.cosmos.network/main/modules/distribution#msgsetwithdrawaddress | MsgSetWithdrawAddress}
 *
 * @param context - Transaction Context
 * @param params - MsgSetWithdrawAddress Params
 * @returns Transaction with the MsgSetWithdrawAddress payload
 *
 */
export const createTxMsgSetWithdrawAddress = (
  context: TxContext,
  params: MsgSetWithdrawAddressParams,
) => {
  const typedData = createEIP712MsgSetWithdrawAddress(params)
  const cosmosMsg = createCosmosMsgSetWithdrawAddress(params)

  return createTransactionPayload(context, typedData, cosmosMsg)
}
