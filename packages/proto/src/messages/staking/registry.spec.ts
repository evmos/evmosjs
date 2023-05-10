import { stakingRegistryTypes } from './registry'

import {
  MsgDelegate,
  MsgBeginRedelegate,
  MsgUndelegate,
  MsgCancelUnbondingDelegation,
  MsgEditValidator,
  MsgCreateValidator,
} from '../../proto/cosmos/staking/tx.js'
import {
  Description,
  CommissionRates,
} from '../../proto/cosmos/staking/staking.js'

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
