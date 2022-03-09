import * as tx from '../proto/cosmos/tx/v1beta1/tx'

export function bytesToTxRaw(bytes: Uint8Array) {
  return tx.cosmos.tx.v1beta1.TxRaw.deserialize(bytes)
}

export function bytesToTxBody(bytes: Uint8Array) {
  return tx.cosmos.tx.v1beta1.TxBody.deserialize(bytes)
}

export function createTxRaw(
  bodyBytes: Uint8Array,
  authInfoBytes: Uint8Array,
  signatures: Uint8Array[],
) {
  const message = new tx.cosmos.tx.v1beta1.TxRaw({
    body_bytes: bodyBytes,
    auth_info_bytes: authInfoBytes,
    signatures,
  })
  return {
    message,
    path: 'cosmos.tx.v1beta1.TxRaw',
  }
}
