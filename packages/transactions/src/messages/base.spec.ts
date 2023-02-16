import { createMsgSend as protoMsgSend, createTransaction } from '@evmos/proto'
import {
  createEIP712,
  generateFee,
  generateMessage,
  generateTypes,
  createMsgSend,
  MSG_SEND_TYPES,
} from '@evmos/eip712'

import { createTransactionPayload } from './base'
import TestUtils from '../tests/utils'

const { context } = TestUtils
const senderAddress = TestUtils.addr1

const msgParams = {
  destinationAddress: TestUtils.addr2,
  amount: TestUtils.amount1,
  denom: TestUtils.denom,
}

const cosmosMessage = protoMsgSend(
  context.sender.accountAddress,
  msgParams.destinationAddress,
  msgParams.amount,
  msgParams.denom,
)

describe('test creating and wrapping a transaction', () => {
  it('handles EIP-712 fields correctly', () => {
    const types = generateTypes(MSG_SEND_TYPES)

    const msgSend = createMsgSend(
      msgParams.amount,
      msgParams.denom,
      senderAddress,
      msgParams.destinationAddress,
    )

    const fee = generateFee(
      context.fee.amount,
      context.fee.denom,
      context.fee.gas,
      senderAddress,
    )

    const messages = generateMessage(
      context.sender.accountNumber.toString(),
      context.sender.sequence.toString(),
      context.chain.cosmosChainId,
      context.memo,
      fee,
      msgSend,
    )

    const eip712Payload = createEIP712(types, context.chain.chainId, messages)

    const typedData = {
      types,
      message: msgSend,
    }

    const basePayload = createTransactionPayload(
      context,
      typedData,
      cosmosMessage,
    )

    expect(basePayload.eipToSign).toStrictEqual(eip712Payload)
  })

  it('handles Protobuf fields correctly', () => {
    const typedData = {
      types: {},
      message: {},
    }

    const tx = createTransaction(
      cosmosMessage,
      context.memo,
      context.fee.amount,
      context.fee.denom,
      parseInt(context.fee.gas, 10),
      'ethsecp256',
      context.sender.pubkey,
      context.sender.sequence,
      context.sender.accountNumber,
      context.chain.cosmosChainId,
    )

    const basePayload = createTransactionPayload(
      context,
      typedData,
      cosmosMessage,
    )

    expect(basePayload.signDirect).toStrictEqual(tx.signDirect)
    expect(basePayload.legacyAmino).toStrictEqual(tx.legacyAmino)
  })
})

describe('test null or invalid parameters', () => {
  // Note that invalid TypedData can't even be compiled by Typescript,
  // so we only test for invalid Protobuf.
  it('throws on null Protobuf fields', () => {
    const typedData = {
      types: {},
      message: {},
    }
    const nullMessage = null

    const closure = () =>
      createTransactionPayload(context, typedData, nullMessage)

    expect(closure).toThrow(TypeError)
  })
})
