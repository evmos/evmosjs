import { createTxRaw } from '@evmos/proto'
import { TxPayload } from '@evmos/transactions'
import { eip712Digest } from './eip712'
import { protoDigest } from './proto'
import { aminoDigest } from './amino'
import { wallet } from './params'
import { TxExtensionParams } from './types'
import { hexToBytes } from './common'

enum SignMode {
  SignDirect,
  LegacyAmino,
}

const signDigest32 = (digest: Buffer) => {
  // eslint-disable-next-line no-underscore-dangle
  const signature = wallet._signingKey().signDigest(digest)

  return Buffer.concat([hexToBytes(signature.r), hexToBytes(signature.s)])
}

const payloadFieldsForSignMode = (tx: TxPayload, signMode: SignMode) => {
  switch (signMode) {
    case SignMode.LegacyAmino:
      return tx.legacyAmino
    default:
      return tx.signDirect
  }
}

const signedPayload = (
  tx: TxPayload,
  signature: Buffer,
  signMode: SignMode,
) => {
  const { body, authInfo } = payloadFieldsForSignMode(tx, signMode)
  const bodyBytes = body.toBinary()
  const authInfoBytes = authInfo.toBinary()

  return createTxRaw(bodyBytes, authInfoBytes, [signature])
}

export const signDirect = (
  tx: TxPayload,
  extensionParams?: TxExtensionParams,
) => {
  const digest = protoDigest(tx, extensionParams)
  const signature = signDigest32(digest)

  return signedPayload(tx, signature, SignMode.SignDirect)
}

export const signAmino = (
  tx: TxPayload,
  extensionParams?: TxExtensionParams,
) => {
  if (extensionParams) {
    throw new Error('extensions are not supported with amino')
  }

  const digest = aminoDigest(tx)
  const signature = signDigest32(digest)

  return signedPayload(tx, signature, SignMode.LegacyAmino)
}

export const signEIP712 = (
  tx: TxPayload,
  extensionParams?: TxExtensionParams,
) => {
  if (extensionParams) {
    throw new Error('extensions are not supported with eip-712')
  }
  if (!tx.eipToSign) {
    throw new Error('eip712 typed data is undefined')
  }

  const digest = eip712Digest(tx.eipToSign)
  const signature = signDigest32(digest)

  return signedPayload(tx, signature, SignMode.SignDirect)
}
