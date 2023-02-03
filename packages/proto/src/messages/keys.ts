import { PubKey } from '../types/cosmos/crypto/keys/ed25519'

export function createED25519PubKey(key: Uint8Array) {
  return {
    path: PubKey.typeName,
    message: new PubKey({
      key,
    }),
  }
}
