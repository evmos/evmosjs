import { distributionRegistryTypes } from './registry'

import {
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission,
  MsgSetWithdrawAddress,
  MsgFundCommunityPool,
} from '../../proto/cosmos/distribution/tx'

describe('test distribution registry types against expected', () => {
  it('exactly equals expected types', () => {
    expect(distributionRegistryTypes).toStrictEqual([
      MsgWithdrawDelegatorReward,
      MsgWithdrawValidatorCommission,
      MsgSetWithdrawAddress,
      MsgFundCommunityPool,
    ])
  })
})
