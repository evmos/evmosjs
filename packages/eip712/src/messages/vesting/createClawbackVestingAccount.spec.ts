import {
  MSG_CREATE_CLAWBACK_VESTING_ACCOUNT_TYPES,
  createMsgCreateClawbackVestingAccount,
} from './createClawbackVestingAccount'
import TestUtils from '../../tests/utils'

describe('test MsgCreateClawbackVestingAccount types and messages', () => {
  it('creates types as expected', () => {
    const expTypes = {
      MsgValue: [
        { name: 'from_address', type: 'string' },
        { name: 'to_address', type: 'string' },
        { name: 'start_time', type: 'string' },
        { name: 'lockup_periods', type: 'TypeLockupPeriods[]' },
        { name: 'vesting_periods', type: 'TypeVestingPeriods[]' },
        { name: 'merge', type: 'bool' },
      ],
      TypeLockupPeriods: [
        { name: 'length', type: 'int64' },
        { name: 'amount', type: 'TypeLockupPeriodsAmount[]' },
      ],
      TypeVestingPeriods: [
        { name: 'length', type: 'int64' },
        { name: 'amount', type: 'TypeVestingPeriodsAmount[]' },
      ],
      TypeLockupPeriodsAmount: [
        { name: 'denom', type: 'string' },
        { name: 'amount', type: 'string' },
      ],
      TypeVestingPeriodsAmount: [
        { name: 'denom', type: 'string' },
        { name: 'amount', type: 'string' },
      ],
    }

    expect(MSG_CREATE_CLAWBACK_VESTING_ACCOUNT_TYPES).toStrictEqual(expTypes)
  })

  it('creates messages as expected', () => {
    const { denom } = TestUtils
    const amount = TestUtils.amount1

    const funderAddress = TestUtils.addr1
    const accountAddress = TestUtils.addr2
    const startTime = 20000
    // 20000 is just over 5.5 hours
    const startTimestamp = '1970-01-01T05:33:20Z'

    const lockupPeriods = [
      {
        length: 8400,
        amount: [
          {
            amount,
            denom,
          },
        ],
      },
    ]

    const vestingPeriods = [
      {
        length: 12600,
        amount: [
          {
            amount,
            denom,
          },
        ],
      },
    ]
    const merge = true

    const msg = createMsgCreateClawbackVestingAccount(
      funderAddress,
      accountAddress,
      startTime,
      lockupPeriods,
      vestingPeriods,
      merge,
    )

    const expMsg = {
      type: 'evmos/MsgCreateClawbackVestingAccount',
      value: {
        from_address: funderAddress,
        to_address: accountAddress,
        start_time: startTimestamp,
        lockup_periods: lockupPeriods,
        vesting_periods: vestingPeriods,
        merge,
      },
    }

    expect(msg).toStrictEqual(expMsg)
  })
})
