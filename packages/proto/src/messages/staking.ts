import * as staking from '../proto/cosmos/staking/v1beta1/tx'
import * as coin from '../proto/cosmos/base/v1beta1/coin'
import * as dist from '../proto/cosmos/distribution/v1beta1/tx'

export function createMsgDelegate(
  delegatorAddress: string,
  validatorAddress: string,
  amount: string,
  denom: string,
) {
  const value = new coin.cosmos.base.v1beta1.Coin({
    denom,
    amount,
  })

  const message = new staking.cosmos.staking.v1beta1.MsgDelegate({
    delegator_address: delegatorAddress,
    validator_address: validatorAddress,
    amount: value,
  })

  return {
    message,
    path: 'cosmos.staking.v1beta1.MsgDelegate',
  }
}

export function createMsgBeginRedelegate(
  delegatorAddress: string,
  validatorSrcAddress: string,
  validatorDstAddress: string,
  amount: string,
  denom: string,
) {
  const value = new coin.cosmos.base.v1beta1.Coin({
    denom,
    amount,
  })

  const message = new staking.cosmos.staking.v1beta1.MsgBeginRedelegate({
    delegator_address: delegatorAddress,
    validator_src_address: validatorSrcAddress,
    validator_dst_address: validatorDstAddress,
    amount: value,
  })

  return {
    message,
    path: 'cosmos.staking.v1beta1.MsgBeginRedelegate',
  }
}

export function createMsgUndelegate(
  delegatorAddress: string,
  validatorAddress: string,
  amount: string,
  denom: string,
) {
  const value = new coin.cosmos.base.v1beta1.Coin({
    denom,
    amount,
  })

  const message = new staking.cosmos.staking.v1beta1.MsgUndelegate({
    delegator_address: delegatorAddress,
    validator_address: validatorAddress,
    amount: value,
  })

  return {
    message,
    path: 'cosmos.staking.v1beta1.MsgUndelegate',
  }
}

export interface MsgWithdrawDelegatorRewardProtoInterface {
  path: string
  message: dist.cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward
}

export function createMsgWithdrawDelegatorReward(
  delegatorAddress: string,
  validatorAddress: string,
) {
  const message =
    new dist.cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward({
      delegator_address: delegatorAddress,
      validator_address: validatorAddress,
    })

  return {
    message,
    path: 'cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
  }
}
