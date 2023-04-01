import { Coin } from '../../proto/cosmos/base/coin.js'
import {
  MsgDelegate,
  MsgBeginRedelegate,
  MsgUndelegate,
  MsgCancelUnbondingDelegation,
} from '../../proto/cosmos/staking/tx.js'

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

export function createMsgCancelUnbondingDelegation(
  delegatorAddress: string,
  validatorAddress: string,
  creationHeight: string,
  amount?: string,
  denom?: string,
) {
  let value: Coin | undefined

  if (amount && denom) {
    value = new Coin({
      denom,
      amount,
    })
  }

  const message = new MsgCancelUnbondingDelegation({
    delegatorAddress,
    validatorAddress,
    amount: value,
    creationHeight: BigInt(creationHeight),
  })

  return {
    message,
    path: MsgCancelUnbondingDelegation.typeName,
  }
}
