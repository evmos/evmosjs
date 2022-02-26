import * as tx from '../proto/cosmos/tx/v1beta1/tx'

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
