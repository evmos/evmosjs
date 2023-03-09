import { createTxRaw } from '@evmos/proto'
import { TxContext } from '@evmos/transactions'
import { wallet, senderAddress } from './params'

export const signDirect = async (context: TxContext, tx: any) => {
  const { sender } = context
  const { signBytes } = tx.signDirect

  if (sender.accountAddress !== senderAddress) {
    throw new Error('Unexpected sender for transaction')
  }

  // eslint-disable-next-line no-underscore-dangle
  const signature = wallet
    ._signingKey()
    .signDigest(Buffer.from(signBytes, 'base64'))

  const signatureBytes = Buffer.concat([
    Buffer.from(signature.r.replace('0x', ''), 'hex'),
    Buffer.from(signature.s.replace('0x', ''), 'hex'),
  ])

  const { signDirect } = tx
  const bodyBytes = signDirect.body.toBinary()
  const authInfoBytes = signDirect.authInfo.toBinary()

  return createTxRaw(bodyBytes, authInfoBytes, [signatureBytes])
}
