import { TxRaw, TxBody, AuthInfo } from '../../types/cosmos/transactions/tx'

export function bytesToTxRaw(bytes: Uint8Array) {
  return TxRaw.fromBinary(bytes)
}

export function bytesToTxBody(bytes: Uint8Array) {
  return TxBody.fromBinary(bytes)
}

export function bytesToAuthInfo(bytes: Uint8Array) {
  return AuthInfo.fromBinary(bytes)
}

export function createTxRaw(
  bodyBytes: Uint8Array,
  authInfoBytes: Uint8Array,
  signatures: Uint8Array[],
) {
  const message = new TxRaw({
    bodyBytes,
    authInfoBytes,
    signatures,
  })
  return {
    message,
    path: 'cosmos.tx.v1beta1.TxRaw',
  }
}
