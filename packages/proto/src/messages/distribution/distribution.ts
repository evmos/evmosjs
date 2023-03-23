import {
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission,
  MsgSetWithdrawAddress,
} from '../../proto/cosmos/distribution/tx.js'

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
    path: MsgWithdrawDelegatorReward.typeName,
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
    path: MsgWithdrawValidatorCommission.typeName,
  }
}

export interface MsgSetWithdrawAddressProtoInterface {
  path: string
  message: MsgSetWithdrawAddress
}

export function createMsgSetWithdrawAddress(
  delegatorAddress: string,
  withdrawAddress: string,
) {
  const message = new MsgSetWithdrawAddress({
    delegatorAddress,
    withdrawAddress,
  })

  return {
    message,
    path: MsgSetWithdrawAddress.typeName,
  }
}
