import { stakingRegistryTypes } from './registry'

import {
  MsgDelegate,
  MsgBeginRedelegate,
  MsgUndelegate,
  MsgCancelUnbondingDelegation,
  MsgEditValidator,
  MsgCreateValidator,
} from '../../proto/cosmos/staking/tx'
import {
  Description,
  CommissionRates,
} from '../../proto/cosmos/staking/staking'

describe('test staking registry types against expected', () => {
  it('exactly equals expected types', () => {
    expect(stakingRegistryTypes).toStrictEqual([
      MsgDelegate,
      MsgBeginRedelegate,
      MsgUndelegate,
      MsgCancelUnbondingDelegation,
      MsgEditValidator,
      MsgCreateValidator,
      Description,
      CommissionRates,
    ])
  })
})
