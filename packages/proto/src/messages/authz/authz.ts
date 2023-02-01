import { Timestamp } from '@bufbuild/protobuf'
import { MsgGrant, MsgRevoke } from '../../types/cosmos/authz/tx'
import { Grant } from '../../types/cosmos/authz/authz'
import { createAnyMessage, MessageGenerated } from '../utils'

export function createMsgGrant(
  granter: string,
  grantee: string,
  grantMessage: MessageGenerated,
  seconds: number,
) {
  const msg = new MsgGrant({
    granter,
    grantee,
    grant: new Grant({
      authorization: createAnyMessage(grantMessage),
      expiration: new Timestamp({
        seconds: BigInt(seconds),
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
  const msg = new MsgRevoke({
    granter,
    grantee,
    msgTypeUrl: type,
  })
  return {
    message: msg,
    path: 'cosmos.authz.v1beta1.MsgRevoke',
  }
}
