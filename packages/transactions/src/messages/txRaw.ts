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
  body.extension_options.push(createAnyMessage(extension))

  return createTxRaw(body.serializeBinary(), authInfo.serializeBinary(), [
    new Uint8Array(),
  ])
}
