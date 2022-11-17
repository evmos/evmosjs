import { Message } from 'google-protobuf'
import * as google from '../proto/google/protobuf/any'
import * as pubkey from '../proto/cosmos/crypto/ed25519/keys'

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

export function createed25519pubkey(key: Uint8Array) {
  return {
    path: 'cosmos.crypto.ed25519.PubKey',
    message: new pubkey.cosmos.crypto.ed25519.PubKey({
      key,
    }),
  }
}
