import { vestingRegistryTypes } from './registry'

import {
  MsgClawback,
  MsgCreateClawbackVestingAccount,
} from '../../proto/evmos/vesting/tx'
import { Period } from '../../proto/cosmos/vesting/vesting'

describe('test vesting registry types against expected', () => {
  it('exactly equals expected types', () => {
    expect(vestingRegistryTypes).toStrictEqual([
      MsgClawback,
      MsgCreateClawbackVestingAccount,
      Period,
    ])
  })
})
