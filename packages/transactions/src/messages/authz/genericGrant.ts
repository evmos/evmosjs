import {
  createGenericAuthorization as protoCreateGenericAuthorization,
  createMsgGrant,
} from '@evmos/proto'

import {
  generateTypes,
  createMsgGenericAuthorization,
  MSG_GENERIC_AUTHORIZATION_TYPES,
} from '@evmos/eip712'
import { createTransactionPayload, TxContext } from '../base.js'

export interface MsgGenericAuthorizationParams {
  granteeAddress: string
  typeUrl: string
  expires: number
}

const createEIP712MsgGenericGrant = (
  context: TxContext,
  params: MsgGenericAuthorizationParams,
) => {
  const types = generateTypes(MSG_GENERIC_AUTHORIZATION_TYPES)

  const message = createMsgGenericAuthorization(
    context.sender.accountAddress,
    params.granteeAddress,
    params.typeUrl,
    params.expires,
  )

  return {
    types,
    message,
  }
}

const createCosmosMsgGenericGrant = (
  context: TxContext,
  params: MsgGenericAuthorizationParams,
) => {
  const msgGenericGrant = protoCreateGenericAuthorization(params.typeUrl)

  return createMsgGrant(
    context.sender.accountAddress,
    params.granteeAddress,
    msgGenericGrant,
    params.expires,
  )
}

/**
 * Creates a transaction for a generic MsgGrant.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK's
 * {@link https://docs.cosmos.network/main/modules/authz#msggrant | MsgGrant}
 *
 * @param context - Transaction Context
 * @param params - MsgGrant Generic Auth Params
 * @returns Transaction with the MsgGrant payload
 *
 */
export const createTxMsgGenericGrant = (
  context: TxContext,
  params: MsgGenericAuthorizationParams,
) => {
  const typedData = createEIP712MsgGenericGrant(context, params)
  const cosmosMsg = createCosmosMsgGenericGrant(context, params)

  return createTransactionPayload(context, typedData, cosmosMsg)
}
