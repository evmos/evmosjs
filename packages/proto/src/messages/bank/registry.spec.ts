import { bankRegistryTypes } from './registry'

import { MsgSend, MsgMultiSend } from '../../proto/cosmos/bank/tx'
import { Metadata } from '../../proto/cosmos/bank/bank.js'

describe('test bank registry types against expected', () => {
  it('exactly equals expected types', () => {
    expect(bankRegistryTypes).toStrictEqual([MsgSend, MsgMultiSend, Metadata])
  })
})
