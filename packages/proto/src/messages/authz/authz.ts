import * as authz from '../../proto/cosmos/authz/v1beta1/tx'
import * as authzUtils from '../../proto/cosmos/authz/v1beta1/authz'
import { createAnyMessage, MessageGenerated } from '../utils'
import * as google from '../../proto/google/protobuf/timestamp'

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

export enum RevokeMessages {
  REVOKE_MSG_DELEGATE = '/cosmos.staking.v1beta1.MsgDelegate',
  REVOKE_MSG_WITHDRAW_DELEGATOR_REWARDS = '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
}

export function createMsgRevoke(
  granter: string,
  grantee: string,
  type: string | RevokeMessages,
) {
  const msg = new authz.cosmos.authz.v1beta1.MsgRevoke({
    granter,
    grantee,
    msg_type_url: type,
  })
  return {
    message: msg,
    path: 'cosmos.authz.v1beta1.MsgRevoke',
  }
}
