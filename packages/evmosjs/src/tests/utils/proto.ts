import { keccak256 } from '@ethersproject/keccak256'
import {
  Proto,
  createSignerInfo,
  createAuthInfo,
  createBody,
  createBodyWithMultipleMessages,
  createFee,
  createSignDoc,
  SIGN_DIRECT,
} from '@evmos/proto'
import { TestingClient } from './utils'

class ProtobufTestingClient extends TestingClient {
  get signerInfo(): Proto.Cosmos.Transactions.Tx.SignerInfo {
    const { context } = this
    const { sender } = context
    const { sequence, pubkey } = sender

    const pubkeyBytes = Buffer.from(pubkey, 'base64')
    const mode = SIGN_DIRECT

    return createSignerInfo('ethsecp256', pubkeyBytes, sequence, mode)
  }

  get protoFee(): Proto.Cosmos.Transactions.Tx.Fee {
    const { context } = this
    const { fee } = context
    const { amount, denom } = fee

    const gasAsInt = parseInt(fee.gas, 10)

    return createFee(amount, denom, gasAsInt)
  }

  get authInfo(): Proto.Cosmos.Transactions.Tx.AuthInfo {
    const { signerInfo, protoFee } = this

    return createAuthInfo(signerInfo, protoFee)
  }

  createTxBody = (payload: any | any[]) => {
    const { memo } = this

    if (Array.isArray(payload)) {
      return createBodyWithMultipleMessages(payload, memo)
    }
    return createBody(payload, memo)
  }

  createSignDoc = (body: Proto.Cosmos.Transactions.Tx.TxBody) => {
    const { context, authInfo } = this
    const bodyBytes = body.toBinary()
    const authInfoBytes = authInfo.toBinary()
    const chainId = context.chain.cosmosChainId
    const { accountNumber } = context.sender

    return createSignDoc(bodyBytes, authInfoBytes, chainId, accountNumber)
  }

  getSignBytes = (signDoc: Proto.Cosmos.Transactions.Tx.SignDoc) => {
    const hashedSignDocHex = keccak256(signDoc.toBinary())
    const hashedSignDocBytes = Buffer.from(
      hashedSignDocHex.replace('0x', ''),
      'hex',
    )
    const hashedSignDocBase64 = hashedSignDocBytes.toString('base64')

    return hashedSignDocBase64
  }
}

const client = new ProtobufTestingClient()

export default client
