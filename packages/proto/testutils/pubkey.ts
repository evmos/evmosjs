import { PubKey } from '../src/proto/ethermint/crypto/keys.js'
import { createAnyMessage } from '../src/messages/common.js'

const key = new Uint8Array([
  10, 33, 2, 136, 177, 245, 49, 184, 120, 113, 219, 192, 55, 41, 81, 135, 37,
  92, 174, 75, 160, 196, 188, 55, 202, 114, 97, 5, 178, 20, 10, 253, 14, 105,
  23,
])

export const pubkey = new PubKey({
  key,
})

const path = PubKey.typeName

export const pubkeyAsAny = createAnyMessage({
  path,
  message: pubkey,
})
