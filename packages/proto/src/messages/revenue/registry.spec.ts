import { revenueRegistryTypes } from './registry'

import {
  MsgCancelRevenue,
  MsgRegisterRevenue,
  MsgUpdateRevenue,
} from '../../proto/evmos/revenue/tx'

describe('test revenue registry types against expected', () => {
  it('exactly equals expected types', () => {
    expect(revenueRegistryTypes).toStrictEqual([
      MsgCancelRevenue,
      MsgRegisterRevenue,
      MsgUpdateRevenue,
    ])
  })
})
