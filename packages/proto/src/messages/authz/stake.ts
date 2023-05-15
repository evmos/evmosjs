import { Coin } from '../../proto/cosmos/base/coin.js'
import {
  AuthorizationType,
  StakeAuthorization,
  // eslint-disable-next-line
  StakeAuthorization_Validators,
} from '../../proto/cosmos/staking/authz.js'

export function createStakeAuthorization(
  allowAddresses: string | string[],
  denom: string,
  maxTokens: string | undefined,
  authorizationType: AuthorizationType,
) {
  const addresses = Array.isArray(allowAddresses)
    ? allowAddresses
    : [allowAddresses]
  const msg = new StakeAuthorization({
    validators: {
      value: new StakeAuthorization_Validators({
        address: addresses,
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
