import {
  createEIP712,
  generateFee,
  generateMessageWithMultipleTransactions,
} from '@evmos/eip712'
import { createTransactionWithMultipleMessages } from '@evmos/proto'
import { Chain, Fee, Sender, TxPayload } from './common.js'

/**
 * TxContext is the transaction context for a SignDoc that is independent
 * from the transaction payload.
 */
export interface TxContext {
  chain: Chain
  sender: Sender
  fee: Fee
  memo: string
}

/**
 * EIP712TypedData represents a signable EIP-712 typed data object,
 * including both the types and message object.
 *
 * @remarks
 * See the EIP-712 specification for more:
 * {@link https://eips.ethereum.org/EIPS/eip-712}
 */
export interface EIP712TypedData {
  types: object
  message: object | object[]
}

/**
 * wrapTypeToArray wraps a generic type or array of said type and returns the object wrapped
 * in an array. This enables our interfaces to indiscriminantly take either pure objects or
 * arrays to easily support wrapping muliple messages.
 */
const wrapTypeToArray = <T>(obj: T | T[]) => {
  return Array.isArray(obj) ? obj : [obj]
}

const createEIP712Payload = (
  context: TxContext,
  typedData: EIP712TypedData,
) => {
  const { fee, sender, chain, memo } = context

  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )

  const payloadMessages = wrapTypeToArray(typedData.message)

  const messages = generateMessageWithMultipleTransactions(
    sender.accountNumber.toString(),
    sender.sequence.toString(),
    chain.cosmosChainId,
    memo,
    feeObject,
    payloadMessages,
  )

  return createEIP712(typedData.types, chain.chainId, messages)
}

const createCosmosPayload = (
  context: TxContext,
  cosmosPayload: any | any[], // TODO: re-export Protobuf Message type from /proto
) => {
  const { fee, sender, chain, memo } = context

  const messages = wrapTypeToArray(cosmosPayload)

  return createTransactionWithMultipleMessages(
    messages,
    memo,
    fee.amount,
    fee.denom,
    parseInt(fee.gas, 10),
    'ethsecp256',
    sender.pubkey,
    sender.sequence,
    sender.accountNumber,
    chain.cosmosChainId,
  )
}

/**
 * Creates a signable transaction with SignDirect,
 * LegacyAmino, and EIP-712 components.
 *
 * @param context - Transaction Context
 * @param typedData - EIP-712 Typed Data
 * @param cosmosMessage - Cosmos SDK Message to sign
 * @returns Signable Payload
 *
 */
export const createTransactionPayload = (
  context: TxContext,
  typedData: EIP712TypedData,
  cosmosMessage: any, // TODO: re-export Protobuf Message type from /proto
): TxPayload => {
  const eip712Payload = createEIP712Payload(context, typedData)

  const cosmosPayload = createCosmosPayload(context, cosmosMessage)

  return {
    signDirect: cosmosPayload.signDirect,
    legacyAmino: cosmosPayload.legacyAmino,
    eipToSign: eip712Payload,
  }
}
