/* eslint-disable camelcase */
import * as vestingEvmos from '../proto/evmos/vesting/v1/tx'
import * as coin from '../proto/cosmos/base/v1beta1/coin'
import * as cosmos_vesting from '../proto/cosmos/vesting/v1beta1/vesting'
import * as googleTs from '../proto/google/protobuf/timestamp'

interface Coin {
  denom: string
  amount: string
}

interface Period {
  length: string
  amount: Coin[]
}

export function createMsgVesting(
  fromAddress: string,
  toAddress: string,
  startTime: string,
  lockupPeriods: Period[],
  vestingPeriods: Period[],
) {
  const initCoin = (data: any) =>
    data.map(
      (v: Period) =>
        new cosmos_vesting.cosmos.vesting.v1beta1.Period({
          length: parseInt(v.length, 10),
          amount: [
            new coin.cosmos.base.v1beta1.Coin({
              denom: v.amount[0].denom.toString(),
              amount: v.amount[0].amount.toString(),
            }),
          ],
        }),
    )

  const lockup_periods = initCoin(lockupPeriods)
  const vesting_periods = initCoin(vestingPeriods)

  const time = new Date(startTime).getTime()
  const tp = new googleTs.google.protobuf.Timestamp({
    seconds: Math.floor(time / 1000),
    nanos: (time % 1000) * 1000000,
  })

  const message =
    new vestingEvmos.evmos.vesting.v1.MsgCreateClawbackVestingAccount({
      from_address: fromAddress,
      to_address: toAddress,
      start_time: tp,
      lockup_periods,
      vesting_periods,
    })
  return {
    message,
    path: 'evmos.vesting.v1.MsgCreateClawbackVestingAccount',
  }
}
