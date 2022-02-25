import { Message } from 'google-protobuf'
import * as google from '../proto/google/protobuf/any'

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
