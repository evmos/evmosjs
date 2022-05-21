import { Message } from 'google-protobuf'
import * as google from '../proto/google/protobuf/any'
import * as pubkey from '../proto/ethermint/crypto/v1/ethsecp256k1/keys'

export interface MessageGenerated {
  message: Message
  path: string
}

export function createAnyMessage(msg: MessageGenerated) {
  return new google.google.protobuf.Any({
    type_url: `/${msg.path}`,
    value: msg.message.serializeBinary(),
  })
}

export function createPubKey(key: Uint8Array) {
  return {
    path: '/ethermint.crypto.v1.ethsecp256k1.PubKey',
    message: new pubkey.ethermint.crypto.v1.ethsecp256k1.PubKey({
      key,
    }),
  }
}
