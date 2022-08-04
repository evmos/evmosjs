import * as coin from '../../proto/cosmos/base/v1beta1/coin'
import * as authzStake from '../../proto/cosmos/staking/v1beta1/authz'

export const stakeAuthTypes =
  authzStake.cosmos.staking.v1beta1.AuthorizationType

export function createStakeAuthorization(
  allowAddresses: string[] | undefined,
  maxTokens: { denom: string; amount: string } | undefined,
  authorizationType: authzStake.cosmos.staking.v1beta1.AuthorizationType,
) {
  const msg = new authzStake.cosmos.staking.v1beta1.StakeAuthorization({
    allow_list: allowAddresses
      ? new authzStake.cosmos.staking.v1beta1.StakeAuthorization.Validators({
          address: allowAddresses,
        })
      : undefined,
    max_tokens: maxTokens
      ? new coin.cosmos.base.v1beta1.Coin({
          denom: maxTokens.denom,
          amount: maxTokens.amount,
        })
      : undefined,
    authorization_type: authorizationType,
  })

  return {
    message: msg,
    path: 'cosmos.staking.v1beta1.StakeAuthorization',
  }
}
