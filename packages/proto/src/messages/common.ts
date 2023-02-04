import { Any, Message, AnyMessage } from '@bufbuild/protobuf/'

export interface MessageGenerated<T extends Message<T> = AnyMessage> {
  message: Message<T>
  path: string
}

export function createAnyMessage(msg: MessageGenerated) {
  return new Any({
    typeUrl: `/${msg.path}`,
    value: msg.message.toBinary(),
  })
}
