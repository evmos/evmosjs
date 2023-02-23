import {
  createMsgSend as protoMsgSend,
  createMsgDelegate as protoMsgDelegate,
  createTransaction,
  createTransactionWithMultipleMessages,
} from '@evmos/proto'
import {
  createEIP712,
  generateFee,
  generateMessage,
  generateMessageWithMultipleTransactions,
  generateTypes,
  createMsgSend,
  MSG_SEND_TYPES,
} from '@evmos/eip712'

import { createTransactionPayload } from './base'
import TestUtils from '../tests/utils'

const { context, denom } = TestUtils
const senderAddress = TestUtils.addr1
const validatorAddress = TestUtils.addrVal1
const amount = TestUtils.amount1

const msgSendParams = {
  destinationAddress: TestUtils.addr2,
  amount,
  denom,
}

const cosmosMsgSend = protoMsgSend(
  senderAddress,
  msgSendParams.destinationAddress,
  msgSendParams.amount,
  msgSendParams.denom,
)

const multipleCosmosMsgSends = [cosmosMsgSend, cosmosMsgSend]

describe('test creating and wrapping a transaction', () => {
  it('handles EIP-712 fields correctly', () => {
    const types = generateTypes(MSG_SEND_TYPES)

    const msgSend = createMsgSend(
      msgSendParams.amount,
      msgSendParams.denom,
      senderAddress,
      msgSendParams.destinationAddress,
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
      cosmosMsgSend,
    )

    expect(basePayload.eipToSign).toStrictEqual(eip712Payload)
  })

  it('handles Protobuf fields correctly', () => {
    const typedData = {
      types: {},
      message: {},
    }

    const tx = createTransaction(
      cosmosMsgSend,
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
      cosmosMsgSend,
    )

    expect(basePayload.signDirect).toStrictEqual(tx.signDirect)
    expect(basePayload.legacyAmino).toStrictEqual(tx.legacyAmino)
  })
})

describe('test creating and wrapping transactions with multiple messages of the same type', () => {
  it('handles EIP-712 fields correctly', () => {
    const types = generateTypes(MSG_SEND_TYPES)

    const msgSend = createMsgSend(
      msgSendParams.amount,
      msgSendParams.denom,
      senderAddress,
      msgSendParams.destinationAddress,
    )
    const multipleMsgSends = [msgSend, msgSend]

    const fee = generateFee(
      context.fee.amount,
      context.fee.denom,
      context.fee.gas,
      senderAddress,
    )

    const messages = generateMessageWithMultipleTransactions(
      context.sender.accountNumber.toString(),
      context.sender.sequence.toString(),
      context.chain.cosmosChainId,
      context.memo,
      fee,
      multipleMsgSends,
    )

    const eip712Payload = createEIP712(types, context.chain.chainId, messages)

    const typedData = {
      types,
      message: multipleMsgSends,
    }

    const basePayload = createTransactionPayload(
      context,
      typedData,
      multipleCosmosMsgSends,
    )

    expect(basePayload.eipToSign).toStrictEqual(eip712Payload)
  })

  it('handles Protobuf fields correctly', () => {
    const typedData = {
      types: {},
      message: {},
    }

    const tx = createTransactionWithMultipleMessages(
      multipleCosmosMsgSends,
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
      multipleCosmosMsgSends,
    )

    expect(basePayload.signDirect).toStrictEqual(tx.signDirect)
    expect(basePayload.legacyAmino).toStrictEqual(tx.legacyAmino)
  })
})

describe('test creating and wrapping transactions with multiple messages of different types', () => {
  // Note that different types with EIP-712 are not currently supported,
  // so we only test Protobuf.
  it('handles Protobuf fields correctly', () => {
    const typedData = {
      types: {},
      message: {},
    }

    const msgDelegate = protoMsgDelegate(
      senderAddress,
      validatorAddress,
      amount,
      denom,
    )

    const msgs = [cosmosMsgSend, msgDelegate]

    const tx = createTransactionWithMultipleMessages(
      msgs,
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

    const basePayload = createTransactionPayload(context, typedData, msgs)

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
