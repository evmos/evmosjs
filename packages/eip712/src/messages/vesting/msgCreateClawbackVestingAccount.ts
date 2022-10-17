export const MSG_CREATE_CLAWBACK_VESTING_ACCOUNT = {
  MsgValue: [
    { name: 'from_address', type: 'string' },
    { name: 'to_address', type: 'string' },
    { name: 'start_time', type: 'uint64' },
    { name: 'lockup_periods', type: 'TypePeriod[]' },
    { name: 'vesting_periods', type: 'TypePeriod[]' },
    { name: 'merge', type: 'bool' },
  ],
  TypePeriod: [
    { name: 'length', type: 'uint64' },
    { name: 'amount', type: 'Coin[]' },
  ],
}

type Coin = {
  denom: string
  amount: string
}
type Period = {
  length: number
  amount: Coin[]
}

/* eslint-disable camelcase */
export function createMsgCreateClawbackVestingAccount(
  from_address: string,
  to_address: string,
  start_time: number,
  lockup_periods: Period[],
  vesting_periods: Period[],
  merge: boolean,
) {
  return {
    type: 'evmos/MsgCreateClawbackVestingAccount',
    value: {
      from_address,
      to_address,
      start_time,
      lockup_periods,
      vesting_periods,
      merge,
    },
  }
}
