import { Coin } from '../../proto/cosmos/base/coin'
import {
  MsgDelegate,
  MsgBeginRedelegate,
  MsgUndelegate,
} from '../../proto/cosmos/staking/tx'

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
    path: MsgDelegate.typeName,
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
    path: MsgBeginRedelegate.typeName,
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
    path: MsgUndelegate.typeName,
  }
}
