import {
  createTxRaw,
  createAnyMessage,
  protoTxNamespace,
  MessageGenerated,
} from '@evmos/proto'

export function createTxRawEIP712(
  body: protoTxNamespace.txn.TxBody,
  authInfo: protoTxNamespace.txn.AuthInfo,
  extension: MessageGenerated,
) {
  body.extensionOptions.push(createAnyMessage(extension))

  return createTxRaw(body.toBinary(), authInfo.toBinary(), [new Uint8Array()])
}
