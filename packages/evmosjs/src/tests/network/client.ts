import secp256k1 from 'secp256k1'
import { fetchSenderInfo } from './query'
import { createTx } from './payload'
import { signDirect } from './sign'
import { broadcastTx } from './broadcast'
import { wallet } from './params'

export interface TxResponse {
  // eslint-disable-next-line camelcase
  tx_response: {
    code: number
  }
}

class TestClient {
  signDirectAndBroadcast = async () => {
    const [context, tx] = await this.createPayload()
    const signedTx = await signDirect(context, tx)
    const response = await broadcastTx(signedTx)
    return response as TxResponse
  }

  private createPayload = async () => {
    const senderInfo = (await fetchSenderInfo()) as any

    const baseAccount = senderInfo.account.base_account
    let pubkey = baseAccount.pub_key?.key

    if (!pubkey) {
      // Derive compressed public key from wallet
      const pubKeyUncompressed = Buffer.from(
        wallet.publicKey.replace('0x', ''),
        'hex',
      )
      pubkey = Buffer.from(
        secp256k1.publicKeyConvert(pubKeyUncompressed, true),
      ).toString('base64')
    }

    return createTx(baseAccount.account_number, pubkey, baseAccount.sequence)
  }
}

const client = new TestClient()

export default client
