import {
  createMsgGrant,
  createStakeAuthorization,
  stakeAuthTypes,
} from '@evmos/proto'
import { createTransactionPayload, TxContext } from '../base'

export interface MsgStakeAuthorizationParams {
  granteeAddress: string
  validatorAddress: string
  denom: string
  maxTokens: string | undefined
  durationInSeconds: number
}

const createEIP712MsgStakeAuthorization = () => {
  // TODO: EIP-712 Stake Authorization is blocked until StakeAuthorization
  // is added to @evmos/eip712
  return {
    types: {},
    message: {},
  }
}

const createCosmosMsgStakeAuthorization = (
  context: TxContext,
  params: MsgStakeAuthorizationParams,
) => {
  const auth = createStakeAuthorization(
    params.validatorAddress,
    params.denom,
    params.maxTokens,
    stakeAuthTypes.AUTHORIZATION_TYPE_DELEGATE,
  )

  return createMsgGrant(
    context.sender.accountAddress,
    params.granteeAddress,
    auth,
    params.durationInSeconds,
  )
}

/**
 * Creates a transaction for a staking MsgGrant.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK's
 * {@link https://docs.cosmos.network/v0.47/modules/authz#msggrant | MsgGrant}
 *
 * @param context Transaction Context
 * @param params MsgGrant Staking Auth Params
 * @returns Transaction with the MsgGrant payload
 *
 */
export function createTxMsgStakeAuthorization(
  context: TxContext,
  params: MsgStakeAuthorizationParams,
) {
  const typedData = createEIP712MsgStakeAuthorization()
  const cosmosMsg = createCosmosMsgStakeAuthorization(context, params)

  return createTransactionPayload(context, typedData, cosmosMsg)
}
