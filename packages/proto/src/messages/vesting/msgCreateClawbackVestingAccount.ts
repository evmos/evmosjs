import { Timestamp } from '@bufbuild/protobuf'
import { Coin as ProtoCoin } from '../../proto/cosmos/base/coin.js'
import { MsgCreateClawbackVestingAccount } from '../../proto/evmos/vesting/tx.js'
import { Period as ProtoPeriod } from '../../proto/cosmos/vesting/vesting.js'

type Coin = {
  denom: string
  amount: string
}

type Period = {
  length: number
  amount: Coin[]
}

const toProtoPeriod = ({ length, amount }: Period) =>
  new ProtoPeriod({
    length: BigInt(length),
    amount: amount.map(
      ({ denom, amount }) =>
        new ProtoCoin({
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
  const msg = new MsgCreateClawbackVestingAccount({
    fromAddress,
    toAddress,
    startTime: new Timestamp({
      seconds: BigInt(startTime),
    }),
    lockupPeriods: lockupPeriods.map(toProtoPeriod),
    vestingPeriods: vestingPeriods.map(toProtoPeriod),
    merge,
  })
  return {
    message: msg,
    path: MsgCreateClawbackVestingAccount.typeName,
  }
}
