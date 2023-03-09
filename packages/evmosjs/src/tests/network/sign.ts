import { createTxRaw, Proto } from '@evmos/proto'
import { wallet } from './params'

interface TxPayload {
  signDirect: {
    body: Proto.Cosmos.Transactions.Tx.TxBody
    authInfo: Proto.Cosmos.Transactions.Tx.AuthInfo
    signBytes: string
  }
}

// Signs a hashed digest in base64 format and returns a 64-byte
// signature (excluding the parity byte).
const signDigest32 = (digestBase64: string) => {
  // eslint-disable-next-line no-underscore-dangle
  const signature = wallet
    ._signingKey()
    .signDigest(Buffer.from(digestBase64, 'base64'))

  return Buffer.concat([
    Buffer.from(signature.r.replace('0x', ''), 'hex'),
    Buffer.from(signature.s.replace('0x', ''), 'hex'),
  ])
}

export const signDirect = async (tx: TxPayload) => {
  const signatureBytes = signDigest32(tx.signDirect.signBytes)

  const bodyBytes = tx.signDirect.body.toBinary()
  const authInfoBytes = tx.signDirect.authInfo.toBinary()

  return createTxRaw(bodyBytes, authInfoBytes, [signatureBytes])
}
