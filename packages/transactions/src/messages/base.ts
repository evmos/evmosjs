import { createEIP712, generateFee, generateMessage } from '@evmos/eip712'
import { createTransaction } from '@evmos/proto'
import { Chain, Fee, Sender } from './common'

/**
 * TxContext is the transaction context for a SignDoc, independent
 * from any messages.
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
  message: object
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

  const messages = generateMessage(
    sender.accountNumber.toString(),
    sender.sequence.toString(),
    chain.cosmosChainId,
    memo,
    feeObject,
    typedData.message,
  )

  return createEIP712(typedData.types, chain.chainId, messages)
}

const createCosmosPayload = (
  context: TxContext,
  cosmosMessage: any, // TODO: re-export Protobuf Message type from /proto
) => {
  const { fee, sender, chain, memo } = context

  return createTransaction(
    cosmosMessage,
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
 * @param context Transaction Context
 * @param typedData EIP-712 Typed Data
 * @param cosmosMessage Cosmos SDK Message to sign
 * @returns Signable Payload
 *
 */
export const createTransactionPayload = (
  context: TxContext,
  typedData: EIP712TypedData,
  cosmosMessage: any, // TODO: re-export Protobuf Message type from /proto
) => {
  const eip712Payload = createEIP712Payload(context, typedData)

  const cosmosPayload = createCosmosPayload(context, cosmosMessage)

  return {
    signDirect: cosmosPayload.signDirect,
    legacyAmino: cosmosPayload.legacyAmino,
    eipToSign: eip712Payload,
  }
}
