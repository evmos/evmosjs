import * as coin from '../../proto/cosmos/base/v1beta1/coin'
import * as authz from '../../proto/cosmos/authz/v1beta1/tx'
import * as authzUtils from '../../proto/cosmos/authz/v1beta1/authz'
import { createAnyMessage, MessageGenerated } from '../utils'
import * as google from '../../proto/google/protobuf/timestamp'
import * as authzStake from '../../proto/cosmos/staking/v1beta1/authz'

export function createMsgGrant(
  granter: string,
  grantee: string,
  grantMessage: MessageGenerated,
  seconds: number,
) {
  const msg = new authz.cosmos.authz.v1beta1.MsgGrant({
    granter,
    grantee,
    grant: new authzUtils.cosmos.authz.v1beta1.Grant({
      authorization: createAnyMessage(grantMessage),
      expiration: new google.google.protobuf.Timestamp({
        seconds,
        nanos: 0,
      }),
    }),
  })
  return {
    message: msg,
    path: 'cosmos.authz.v1beta1.MsgGrant',
  }
}

export const stakeAuthTypes =
  authzStake.cosmos.staking.v1beta1.AuthorizationType

export function createStakeAuthorization(
  allowAddress: string,
  denom: string,
  maxTokens: string,
  authorizationType: authzStake.cosmos.staking.v1beta1.AuthorizationType,
) {
  const msg = new authzStake.cosmos.staking.v1beta1.StakeAuthorization({
    allow_list:
      new authzStake.cosmos.staking.v1beta1.StakeAuthorization.Validators({
        address: [allowAddress],
      }),
    max_tokens: new coin.cosmos.base.v1beta1.Coin({
      denom,
      amount: maxTokens,
    }),
    authorization_type: authorizationType,
  })
  return {
    message: msg,
    path: 'cosmos.staking.v1beta1.StakeAuthorization',
  }
}
