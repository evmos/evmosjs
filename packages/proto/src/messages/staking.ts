import {
  MsgDelegate,
  MsgBeginRedelegate,
  MsgUndelegate,
} from '@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/staking/v1beta1/tx_pb'
import {
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission,
} from '@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/distribution/v1beta1/tx_pb'
import { Coin } from '@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/base/v1beta1/coin_pb'

export function createMsgDelegate(
  delegatorAddress: string,
  validatorAddress: string,
  amount: string,
  denom: string,
) {
  const value = new Coin({
    denom,
    amount,
  })

  const message = new MsgDelegate({
    delegatorAddress,
    validatorAddress,
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
  const value = new Coin({
    denom,
    amount,
  })

  const message = new MsgBeginRedelegate({
    delegatorAddress,
    validatorSrcAddress,
    validatorDstAddress,
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
  const value = new Coin({
    denom,
    amount,
  })

  const message = new MsgUndelegate({
    delegatorAddress,
    validatorAddress,
    amount: value,
  })

  return {
    message,
    path: 'cosmos.staking.v1beta1.MsgUndelegate',
  }
}

export interface MsgWithdrawDelegatorRewardProtoInterface {
  path: string
  message: MsgWithdrawDelegatorReward
}

export function createMsgWithdrawDelegatorReward(
  delegatorAddress: string,
  validatorAddress: string,
) {
  const message = new MsgWithdrawDelegatorReward({
    delegatorAddress,
    validatorAddress,
  })

  return {
    message,
    path: 'cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
  }
}

export interface MsgWithdrawValidatorCommissionProtoInterface {
  path: string
  message: MsgWithdrawValidatorCommission
}

export function createMsgWithdrawValidatorCommission(validatorAddress: string) {
  const message = new MsgWithdrawValidatorCommission({
    validatorAddress,
  })

  return {
    message,
    path: 'cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission',
  }
}
