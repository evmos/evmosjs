import { _TypedDataEncoder as TypedDataEncoder } from '@ethersproject/hash'
import { keccak256 } from '@ethersproject/keccak256'
import { EIP712ToSign } from '@evmos/transactions'
import { hexToBytes } from './common'

type EIP712Types = Record<string, { name: string; type: string }[]>
type EIP712Domain = Record<string, number | string>
type EIP712Message = Record<string, unknown>

const hashDomain = (payload: {
  types: EIP712Types
  domain: EIP712Domain
}): string =>
  TypedDataEncoder.hashStruct(
    'EIP712Domain',
    { EIP712Domain: payload.types.EIP712Domain },
    payload.domain,
  )

const hashMessage = (payload: {
  types: EIP712Types
  primaryType: string
  message: EIP712Message
}): string =>
  TypedDataEncoder.from(
    (() => {
      const types = { ...payload.types }
      delete types.EIP712Domain

      // EthersJS assumes the first type is the primary type
      const primary = types[payload.primaryType]
      if (!primary) {
        throw new Error(`No matched primary type: ${payload.primaryType}`)
      }
      delete types[payload.primaryType]

      return {
        [payload.primaryType]: primary,
        ...types,
      }
    })(),
  ).hash(payload.message)

export const eip712Digest = (payload: EIP712ToSign) => {
  const typedPayload = payload as {
    types: EIP712Types
    primaryType: string
    domain: EIP712Domain
    message: EIP712Message
  }

  const raw = Buffer.concat([
    Buffer.from('19', 'hex'),
    Buffer.from('01', 'hex'),
    hexToBytes(hashDomain(typedPayload)),
    hexToBytes(hashMessage(typedPayload)),
  ])

  const hashAsHex = keccak256(raw)

  return hexToBytes(hashAsHex)
}
