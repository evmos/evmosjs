import { keccak256 } from '@ethersproject/keccak256'
import { TxPayload } from '@evmos/transactions'
import { createSigDoc } from '@evmos/proto'
import { hexToBytes, base64ToBytes } from './common'
import { TxExtensionParams } from './types'

const protoDigestWithExtensions = (
  tx: TxPayload,
  extensionParams: TxExtensionParams,
) => {
  const { signDirect } = tx
  const { extensions, context } = extensionParams

  // TODO: expose a utility interface to append extensions
  const { body } = signDirect
  body.extensionOptions.push(...extensions)

  const signDoc = createSigDoc(
    body.toBinary(),
    signDirect.authInfo.toBinary(),
    context.chain.cosmosChainId,
    context.sender.accountNumber,
  )

  const digest = keccak256(signDoc.toBinary())
  return hexToBytes(digest)
}

export const protoDigest = (tx: TxPayload, extensions?: TxExtensionParams) => {
  if (!extensions) {
    const { signBytes } = tx.signDirect
    return base64ToBytes(signBytes)
  }

  return protoDigestWithExtensions(tx, extensions)
}
