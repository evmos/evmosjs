import { createMsgRegisterERC20 as protoMsgRegisterERC20 } from '@evmos/proto'

import {
  generateTypes,
  createRegisterERC20,
  REGISTER_ERC20_TYPES,
} from '@evmos/eip712'
import { createTransactionPayload, TxContext } from '../base.js'

export interface MsgRegisterERC20Params {
  title: string
  description: string
  erc20addresses: string[]
}

const createEIP712MsgRegisterERC20 = (params: MsgRegisterERC20Params) => {
  const types = generateTypes(REGISTER_ERC20_TYPES)

  const message = createRegisterERC20(
    params.title,
    params.description,
    params.erc20addresses,
  )

  return {
    types,
    message,
  }
}

const createCosmosMsgRegisterERC20 = (params: MsgRegisterERC20Params) => {
  return protoMsgRegisterERC20(
    params.title,
    params.description,
    params.erc20addresses,
  )
}

/**
 * Creates a transaction for a `MsgRegisterERC20` object.
 *
 * @remarks
 * This method creates a transaction wrapping the Evmos
 * {@link https://docs.evmos.org/protocol/modules/erc20/transactions#MsgRegistererc20 | MsgRegisterERC20}
 *
 * @param context - Transaction Context
 * @param params - MsgRegisterERC20 Params
 * @returns Transaction with the MsgRegisterERC20 payload
 *
 */
export const createTxMsgRegisterERC20 = (
  context: TxContext,
  params: MsgRegisterERC20Params,
) => {
  const typedData = createEIP712MsgRegisterERC20(params)
  const cosmosMsg = createCosmosMsgRegisterERC20(params)

  return createTransactionPayload(context, typedData, cosmosMsg)
}
