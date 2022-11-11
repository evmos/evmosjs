import * as vesting from '../../proto/evmos/vesting/v1/tx'
import * as cosmosVesting from '../../proto/cosmos/vesting/v1beta1/vesting'
import * as base from '../../proto/cosmos/base/v1beta1/coin'
import { google } from '../../proto/google/protobuf/timestamp'

type Coin = {
  denom: string
  amount: string
}

type Period = {
  length: number
  amount: Coin[]
}

const toProtoPeriod = ({ length, amount }: Period) =>
  new cosmosVesting.cosmos.vesting.v1beta1.Period({
    length,
    amount: amount.map(
      ({ denom, amount }) =>
        new base.cosmos.base.v1beta1.Coin({
          denom,
          amount,
        }),
    ),
  })

export function createMsgCreateClawbackVestingAccount(
  fromAddress: string,
  toAddress: string,
  startTime: number,
  lockupPeriods: Period[],
  vestingPeriods: Period[],
  merge: boolean,
) {
  const msg = new vesting.evmos.vesting.v1.MsgCreateClawbackVestingAccount({
    from_address: fromAddress,
    to_address: toAddress,
    start_time: new google.protobuf.Timestamp({
      seconds: startTime,
    }),
    lockup_periods: lockupPeriods.map(toProtoPeriod),
    vesting_periods: vestingPeriods.map(toProtoPeriod),
    merge,
  })
  return {
    message: msg,
    path: 'evmos.vesting.v1.MsgCreateClawbackVestingAccount',
  }
}
