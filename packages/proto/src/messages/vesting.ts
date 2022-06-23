/* eslint-disable camelcase */
import * as vesting from '../proto/evmos/vesting/v1/tx'
import * as coin from '../proto/cosmos/base/v1beta1/coin'
import * as cosmos_vesting from '../proto/cosmos/vesting/v1beta1/vesting'
import * as googleTs from '../proto/google/protobuf/timestamp'

export function createMsgVesting(
  fromAddress: string,
  toAddress: string,
  startTime: string,
  vestingPeriods: {
    length: string
    amount: { denom: string; amount: string }[]
  }[],
  // lockupPeriods?: {
  //   length: string
  //   amount: { denom: string; amount: string }[]
  // }[],
  merge: boolean = false,
) {
  const vesting_periods = vestingPeriods.map(
    (v) =>
      new cosmos_vesting.cosmos.vesting.v1beta1.Period({
        length: parseInt(v.length, 10),
        amount: [
          new coin.cosmos.base.v1beta1.Coin({
            denom: v.amount[0].denom,
            amount: v.amount[0].amount.toString(),
          }),
        ],
      }),
  )

  const time = new Date(startTime).getTime()
  const tp = new googleTs.google.protobuf.Timestamp({
    nanos: (time % 1000) * 1e6,
    seconds: Math.round(time / 1000),
  })

  const message = new vesting.evmos.vesting.v1.MsgCreateClawbackVestingAccount({
    from_address: fromAddress,
    to_address: toAddress,
    start_time: tp,
    vesting_periods,
    merge,
  })
  return {
    message,
    path: 'evmos.vesting.v1.MsgCreateClawbackVestingAccount',
  }
}
