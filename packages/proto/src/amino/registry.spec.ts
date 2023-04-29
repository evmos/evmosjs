import { Message, AnyMessage } from '@bufbuild/protobuf'
import { AminoTypes } from './registry'
import {
  createMsgSend,
  createMsgClawback,
  createMsgRegisterRevenue,
} from '../messages'
import { convertProtoMessageToObject } from './objectConverter'

import { from, to, to2, hex, amount, denom } from '../proto/tests/utils'

function expectReversibleAminoConversion<T extends Message<T> = AnyMessage>(
  wrappedProtoMsg: Message<T>,
) {
  const protoMsg = convertProtoMessageToObject(wrappedProtoMsg)
  const aminoMsg = AminoTypes.toAmino(protoMsg)
  const generatedProtoMsg = AminoTypes.fromAmino(aminoMsg)

  expect(generatedProtoMsg).toStrictEqual(protoMsg)
}

describe('test generated amino types', () => {
  it('converts registered cosmos messages', () => {
    const wrappedProtoMsgSend = createMsgSend(from, to, amount, denom).message
    expectReversibleAminoConversion(wrappedProtoMsgSend)
  })

  it('converts registered evmos messages', () => {
    const wrappedProtoMsgClawback = createMsgClawback(from, to, to2).message
    expectReversibleAminoConversion(wrappedProtoMsgClawback)

    const revenueNonces = [8, 16]
    const wrappedProtoMsgRegisterRevenue = createMsgRegisterRevenue(
      hex,
      from,
      to,
      revenueNonces,
    ).message
    expectReversibleAminoConversion(wrappedProtoMsgRegisterRevenue)
  })
})
