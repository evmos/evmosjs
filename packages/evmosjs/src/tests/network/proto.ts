import { keccak256 } from '@ethersproject/keccak256'
import { TxPayload } from '@evmos/transactions'
import { createSigDoc } from '@evmos/proto'
import { hexToBytes, base64ToBytes } from './common'
import { TxExtensionParams } from './types'

const signDocWithExtensions = (
  tx: TxPayload,
  extensionParams: TxExtensionParams,
) => {
  const { signDirect } = tx
  const { extensions, context } = extensionParams

  // TODO: expose a utility interface to append extensions
  const { body, authInfo } = signDirect
  body.extensionOptions.push(...extensions)

  const bodyBytes = body.toBinary()
  const authInfoBytes = authInfo.toBinary()
  const chainId = context.chain.cosmosChainId
  const { accountNumber } = context.sender

  return createSigDoc(bodyBytes, authInfoBytes, chainId, accountNumber)
}

const digestWithExtensions = (
  tx: TxPayload,
  extensionParams: TxExtensionParams,
) => {
  const signDoc = signDocWithExtensions(tx, extensionParams)
  const digest = keccak256(signDoc.toBinary())

  return hexToBytes(digest)
}

export const protoDigest = (tx: TxPayload, extensions?: TxExtensionParams) => {
  if (!extensions) {
    const { signBytes } = tx.signDirect
    return base64ToBytes(signBytes)
  }

  return digestWithExtensions(tx, extensions)
}
