import { Any, Message } from '@bufbuild/protobuf/'

export interface MessageGenerated {
  message: Message
  path: string
}

export function createAnyMessage(msg: MessageGenerated) {
  return new Any({
    typeUrl: `/${msg.path}`,
    value: msg.message.toBinary(),
  })
}
