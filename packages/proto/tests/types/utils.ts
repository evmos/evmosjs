import { Message, AnyMessage } from '@bufbuild/protobuf'

export type TestMessage = [AnyMessage, string]

// Compares a generic message's encoding and decoding against its expected value
export const testMessageEncodeDecode = <T extends Message<T> = AnyMessage>(
  msg: T,
  expBase64: string,
) => {
  const bytes = msg.toBinary()
  expect(Buffer.from(bytes).toString('base64')).toBe(expBase64)

  const decoded = msg.fromBinary(bytes)
  expect(decoded.equals(msg)).toBe(true)
}

export const from = 'evmos1pmk2r32ssqwps42y3c9d4clqlca403yd9wymgr'
export const to = 'evmos12nml2w93uva0smjw3c36stczfay0k67ny94ecz'
export const val = 'evmosvaloper14rajuselkxsvqtqv20lamd08t8zxg8qdw3r3xm'
export const denom = 'aevmos'
// Unassociated hex address
export const hex = '0xe2D61e49ff8a9d724CC54d338D8076F878aC6b71'
