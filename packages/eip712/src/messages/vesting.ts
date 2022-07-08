interface Coin {
  denom: string
  amount: string
}

interface Period {
  length: string
  amount: Coin[]
}

export const MSG_VESTING_TYPES = {
  MsgValue: [
    { name: 'from_address', type: 'string' },
    { name: 'to_address', type: 'string' },
    { name: 'start_time', type: 'string' },
    { name: 'lockup_periods', type: 'TypeLockupPeriods[]' },
    { name: 'vesting_periods', type: 'TypeVestingPeriods[]' },
  ],
  TypeLockupPeriods: [
    { name: 'length', type: 'int64' },
    { name: 'amount', type: 'TypeLockupPeriodsAmount[]' },
  ],
  TypeVestingPeriods: [
    { name: 'length', type: 'int64' },
    { name: 'amount', type: 'TypeVestingPeriodsAmount[]' },
  ],
  TypeVestingPeriodsAmount: [
    { name: 'denom', type: 'string' },
    { name: 'amount', type: 'string' },
  ],
  TypeLockupPeriodsAmount: [
    { name: 'denom', type: 'string' },
    { name: 'amount', type: 'string' },
  ],
}

export function createMsgVesting(
  fromAddress: string,
  toAddress: string,
  startTime: string,
  lockupPeriods: Period[],
  vestingPeriods: Period[],
) {
  return {
    type: 'astra/MsgCreateClawbackVestingAccount',
    value: {
      from_address: fromAddress,
      to_address: toAddress,
      start_time: startTime,
      lockup_periods: lockupPeriods,
      vesting_periods: vestingPeriods,
    },
  }
}
