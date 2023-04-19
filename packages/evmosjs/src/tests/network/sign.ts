import { createTxRaw } from '@evmos/proto'
import { TxPayload } from '@evmos/transactions'
import { eip712Digest } from './eip712'
import { protoDigest } from './proto'
import { wallet } from './params'
import { TxExtensionParams } from './types'
import { hexToBytes } from './common'

const signDigest32 = (digest: Buffer) => {
  // eslint-disable-next-line no-underscore-dangle
  const signature = wallet._signingKey().signDigest(digest)

  return Buffer.concat([hexToBytes(signature.r), hexToBytes(signature.s)])
}

const signedPayload = (tx: TxPayload, signature: Buffer) => {
  const bodyBytes = tx.signDirect.body.toBinary()
  const authInfoBytes = tx.signDirect.authInfo.toBinary()

  return createTxRaw(bodyBytes, authInfoBytes, [signature])
}

export const signDirect = (
  tx: TxPayload,
  extensionParams?: TxExtensionParams,
) => {
  const digest = protoDigest(tx, extensionParams)
  const signature = signDigest32(digest)

  return signedPayload(tx, signature)
}

export const signEIP712 = (
  tx: TxPayload,
  extensionParams?: TxExtensionParams,
) => {
  if (extensionParams) {
    throw new Error('extensions are not supported with eip-712')
  }
  const digest = eip712Digest(tx.eipToSign)
  const signature = signDigest32(digest)

  return signedPayload(tx, signature)
}
