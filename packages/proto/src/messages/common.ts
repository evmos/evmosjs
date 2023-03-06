import { Any, Message, AnyMessage } from '@bufbuild/protobuf'

export interface MessageGenerated<T extends Message<T> = AnyMessage> {
  message: Message<T>
  path: string
}

export function createAnyMessage(msg: MessageGenerated) {
  let value: Uint8Array
  if (msg.message.toBinary) {
    value = msg.message.toBinary()
  } else {
    value = Buffer.from(JSON.stringify(msg.message), 'base64')
  }

  return new Any({
    typeUrl: `/${msg.path}`,
    value,
  })
}
