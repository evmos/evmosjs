import { Timestamp } from '@bufbuild/protobuf'
import { MsgGrant, MsgRevoke } from '../../proto/cosmos/authz/tx.js'
import { Grant } from '../../proto/cosmos/authz/authz.js'
import { createAnyMessage, MessageGenerated } from '../common.js'

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
    path: MsgGrant.typeName,
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
    path: MsgRevoke.typeName,
  }
}
