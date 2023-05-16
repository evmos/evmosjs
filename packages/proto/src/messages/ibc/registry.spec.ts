import { ibcRegistryTypes } from './registry'

import { MsgTransfer } from '../../proto/cosmos-ibc/ibc/applications/tx'
import { Height } from '../../proto/cosmos-ibc/ibc/core/client'

describe('test ibc registry types against expected', () => {
  it('exactly equals expected types', () => {
    expect(ibcRegistryTypes).toStrictEqual([MsgTransfer, Height])
  })
})
