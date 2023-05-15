import secp256k1 from 'secp256k1'
import { TxContext } from '@evmos/transactions'
import { fetchSenderInfo } from './query'
import { createTxContext } from './payload'
import { signDirect, signAmino, signEIP712 } from './sign'
import { broadcastTx } from './broadcast'
import { wallet } from './params'
import { TxResponse, CreatePayloadFn, SignPayloadFn } from './types'

class NetworkTestClient {
  private nonce: number | undefined

  signDirectAndBroadcast = async (
    createTxPayload: CreatePayloadFn,
    extensions?: any[],
  ) => {
    return this.signAndBroadcast(createTxPayload, signDirect, extensions)
  }

  signAminoAndBroadcast = async (
    createTxPayload: CreatePayloadFn,
    extensions?: any[],
  ) => {
    return this.signAndBroadcast(createTxPayload, signAmino, extensions)
  }

  signEIP712AndBroadcast = async (
    createTxPayload: CreatePayloadFn,
    extensions?: any[],
  ) => {
    return this.signAndBroadcast(createTxPayload, signEIP712, extensions)
  }

  private signAndBroadcast = async (
    createTxPayload: CreatePayloadFn,
    signPayload: SignPayloadFn,
    extensions?: any[],
  ) => {
    const context = await this.createTxContext()
    const payload = createTxPayload(context)

    const extParams = this.createExtensionParams(context, extensions)
    const signedTx = await signPayload(payload, extParams)
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

  private createExtensionParams = (context: TxContext, extensions?: any[]) => {
    if (!extensions) {
      return undefined
    }

    return {
      context,
      extensions,
    }
  }
}

export default NetworkTestClient
