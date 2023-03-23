import { Coin } from '../../proto/cosmos/base/coin.js'
import {
  AuthorizationType,
  StakeAuthorization,
  // eslint-disable-next-line
  StakeAuthorization_Validators,
} from '../../proto/cosmos/staking/authz.js'

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
    path: StakeAuthorization.typeName,
  }
}
