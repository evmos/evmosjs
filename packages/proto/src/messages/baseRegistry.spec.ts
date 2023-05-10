import { Timestamp } from '@bufbuild/protobuf'
import { baseRegistryTypes } from './baseRegistry'
import { Coin } from '../proto/cosmos/base/coin'

describe('test base registry types against expected', () => {
  it('exactly equals expected types', () => {
    expect(baseRegistryTypes).toStrictEqual([Timestamp, Coin])
  })
})
