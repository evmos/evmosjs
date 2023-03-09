import secp256k1 from 'secp256k1'
import { TxContext, TxPayload } from '@evmos/transactions'
import { fetchSenderInfo } from './query'
import { createTxContext } from './payload'
import { signDirect } from './sign'
import { broadcastTx } from './broadcast'
import { wallet } from './params'

export interface TxResponse {
  // eslint-disable-next-line camelcase
  tx_response: {
    code: number
  }
}

export type CreatePayloadFn = (context: TxContext) => TxPayload

class NetworkTestClient {
  private readonly createTxPayload: CreatePayloadFn

  constructor(createTxPayload: CreatePayloadFn) {
    this.createTxPayload = createTxPayload
  }

  signDirectAndBroadcast = async () => {
    const context = await this.createTxContext()
    const tx = this.createTxPayload(context)

    const signedTx = await signDirect(context, tx)
    const response = (await broadcastTx(signedTx)) as TxResponse

    return response
  }

  private createTxContext = async () => {
    const senderInfo = await fetchSenderInfo()

    if (!senderInfo) {
      throw new Error('Expected sender info from node')
    }

    // eslint-disable-next-line camelcase
    const { account_number, sequence, pub_key } =
      senderInfo.account.base_account
    const pk = pub_key?.key ?? this.getSignerPubKey()

    return createTxContext(account_number, pk, sequence)
  }

  private getSignerPubKey = () => {
    const pkUncompressed = Buffer.from(
      wallet.publicKey.replace('0x', ''),
      'hex',
    )
    const pk = Buffer.from(secp256k1.publicKeyConvert(pkUncompressed, true))
    return pk.toString('base64')
  }
}

export default NetworkTestClient
