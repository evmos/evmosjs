import secp256k1 from 'secp256k1'
import { fetchSenderInfo } from './query'
import { createTxContext } from './payload'
import { signDirect, signEIP712 } from './sign'
import { broadcastTx } from './broadcast'
import { wallet } from './params'
import { TxResponse, CreatePayloadFn, SignPayloadFn } from './types'

class NetworkTestClient {
  private nonce: number | undefined

  signDirectAndBroadcast = async (createTxPayload: CreatePayloadFn) => {
    return this.signAndBroadcast(createTxPayload, signDirect)
  }

  signEIP712AndBroadcast = async (createTxPayload: CreatePayloadFn) => {
    return this.signAndBroadcast(createTxPayload, signEIP712)
  }

  private signAndBroadcast = async (
    createTxPayload: CreatePayloadFn,
    signPayload: SignPayloadFn,
  ) => {
    const context = await this.createTxContext()
    const payload = createTxPayload(context)

    const signedTx = await signPayload(payload)
    const response = await broadcastTx(signedTx)

    console.log(response)

    if (this.nonce !== undefined) {
      this.nonce += 1
    }

    return response as TxResponse
  }

  private createTxContext = async () => {
    // eslint-disable-next-line camelcase
    const { account_number, sequence, pub_key } = await this.getSenderAccount()

    const pk = pub_key?.key ?? this.getSignerPubKey()

    if (this.nonce === undefined) {
      this.nonce = parseInt(sequence, 10)
    }

    return createTxContext(account_number, pk, this.nonce.toString())
  }

  private getSenderAccount = async () => {
    const senderInfo = await fetchSenderInfo()

    if (!senderInfo) {
      throw new Error('Expected sender info from node')
    }

    return senderInfo.account.base_account
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
