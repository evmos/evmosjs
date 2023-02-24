import { createMsgDelegate as protoMsgDelegate } from '@evmos/proto'

import {
  generateTypes,
  MSG_DELEGATE_TYPES,
  createMsgDelegate,
} from '@evmos/eip712'
import { MsgDelegateParams } from './delegate.js'
import { createTransactionPayload, TxContext } from '../base.js'

export interface MultipleMsgDelegateParams {
  values: MsgDelegateParams[]
}

const createEIP712MultipleMsgDelegate = (
  context: TxContext,
  params: MultipleMsgDelegateParams,
) => {
  const types = generateTypes(MSG_DELEGATE_TYPES)

  const messages = params.values.map((delegateParams) =>
    createMsgDelegate(
      context.sender.accountAddress,
      delegateParams.validatorAddress,
      delegateParams.amount,
      delegateParams.denom,
    ),
  )

  return {
    types,
    message: messages,
  }
}

const createCosmosMultipleMsgDelegate = (
  context: TxContext,
  params: MultipleMsgDelegateParams,
) => {
  return params.values.map((delegateParams) =>
    protoMsgDelegate(
      context.sender.accountAddress,
      delegateParams.validatorAddress,
      delegateParams.amount,
      delegateParams.denom,
    ),
  )
}

/**
 * Creates a transaction for multiple MsgDelegate objects.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK's
 * {@link https://docs.cosmos.network/main/modules/staking#msgdelegate | MsgDelegate}
 *
 * @param context - Transaction Context
 * @param params - MultipleMsgDelegate Params
 * @returns Transaction with multiple MsgDelegate objects in the payload
 *
 */
export const createTxMultipleMsgDelegate = (
  context: TxContext,
  params: MultipleMsgDelegateParams,
) => {
  const typedData = createEIP712MultipleMsgDelegate(context, params)
  const cosmosMsgs = createCosmosMultipleMsgDelegate(context, params)

  return createTransactionPayload(context, typedData, cosmosMsgs)
}
