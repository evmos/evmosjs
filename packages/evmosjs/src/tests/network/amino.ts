import { TxPayload } from '@evmos/transactions'
import { base64ToBytes } from './common'

export const aminoDigest = (tx: TxPayload) => {
  const signBytesB64 = tx.legacyAmino.signBytes
  return base64ToBytes(signBytesB64)
}
