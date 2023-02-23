import { PubKey } from '../../proto/cosmos/crypto/ed25519/keys'

export function createED25519PubKey(key: Uint8Array) {
  return {
    path: PubKey.typeName,
    message: new PubKey({
      key,
    }),
  }
}
