import * as stacking from '../proto/cosmos/staking/v1beta1/tx'
import * as coin from '../proto/cosmos/base/v1beta1/coin'

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

  const message = new stacking.cosmos.staking.v1beta1.MsgDelegate({
    delegator_address: delegatorAddress,
    validator_address: validatorAddress,
    amount: value,
  })

  return {
    message,
    path: 'cosmos.staking.v1beta1.MsgDelegate',
  }
}
