import { Coin } from '@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/base/v1beta1/coin_pb'
import {
  StakeAuthorization,
  AuthorizationType,
  // eslint-disable-next-line camelcase
  StakeAuthorization_Validators,
} from '@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/staking/v1beta1/authz_pb'

export const stakeAuthTypes = AuthorizationType

export function createStakeAuthorization(
  allowAddress: string,
  denom: string,
  maxTokens: string | undefined,
  authorizationType: AuthorizationType,
) {
  const msg = new StakeAuthorization({
    validators: {
      value: new StakeAuthorization_Validators({
        address: [allowAddress],
      }),
      case: 'allowList',
    },
    maxTokens: maxTokens
      ? new Coin({
          denom,
          amount: maxTokens,
        })
      : undefined,
    authorizationType,
  })

  return {
    message: msg,
    path: 'cosmos.staking.v1beta1.StakeAuthorization',
  }
}
