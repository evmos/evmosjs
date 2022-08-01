import * as coin from '../../proto/cosmos/base/v1beta1/coin'
import * as authzStake from '../../proto/cosmos/staking/v1beta1/authz'

export const stakeAuthTypes =
  authzStake.cosmos.staking.v1beta1.AuthorizationType

export function createStakeAuthorization(
  allowAddress: string,
  denom: string,
  maxTokens: string | undefined,
  authorizationType: authzStake.cosmos.staking.v1beta1.AuthorizationType,
) {
  const msg = new authzStake.cosmos.staking.v1beta1.StakeAuthorization({
    allow_list:
      new authzStake.cosmos.staking.v1beta1.StakeAuthorization.Validators({
        address: [allowAddress],
      }),
    max_tokens: maxTokens
      ? new coin.cosmos.base.v1beta1.Coin({
          denom,
          amount: maxTokens,
        })
      : undefined,
    authorization_type: authorizationType,
  })

  return {
    message: msg,
    path: 'cosmos.staking.v1beta1.StakeAuthorization',
  }
}
