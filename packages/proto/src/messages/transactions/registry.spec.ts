import { transactionsRegistryTypes } from './registry'

import { TxRaw, TxBody, AuthInfo } from '../../proto/cosmos/transactions/tx'

describe('test transactions registry types against expected', () => {
  it('exactly equals expected types', () => {
    expect(transactionsRegistryTypes).toStrictEqual([TxRaw, TxBody, AuthInfo])
  })
})
