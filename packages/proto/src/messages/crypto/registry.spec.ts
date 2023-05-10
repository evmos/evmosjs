import { cryptoRegistryTypes } from './registry'

import { PubKey as ED25519PubKey } from '../../proto/cosmos/crypto/ed25519/keys'

describe('test crypto registry types against expected', () => {
  it('exactly equals expected types', () => {
    expect(cryptoRegistryTypes).toStrictEqual([ED25519PubKey])
  })
})
