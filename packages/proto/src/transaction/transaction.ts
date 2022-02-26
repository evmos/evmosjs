import { Keccak } from 'sha3'
import * as tx from '../proto/cosmos/tx/v1beta1/tx'
import * as signing from '../proto/cosmos/tx/signing/v1beta1/signing'
import * as coin from '../proto/cosmos/base/v1beta1/coin'
import * as eth from '../proto/ethermint/crypto/v1/ethsecp256k1/keys'
import * as secp from '../proto/cosmos/crypto/secp256k1/keys'

import { createAnyMessage, MessageGenerated } from '../messages/utils'

export const SIGN_DIRECT =
  signing.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT
export const LEGACY_AMINO =
  signing.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_LEGACY_AMINO_JSON

export function createBody(message: any, memo: string) {
  const msg = new tx.cosmos.tx.v1beta1.TxBody({
    messages: [createAnyMessage(message)],
    memo,
  })
  return msg
}

export function createFee(fee: string, denom: string, gasLimit: number) {
  return new tx.cosmos.tx.v1beta1.Fee({
    amount: [
      new coin.cosmos.base.v1beta1.Coin({
        denom,
        amount: fee,
      }),
    ],
    gas_limit: gasLimit,
  })
}

export function createSignerInfo(
  algo: string,
  publicKey: Uint8Array,
  sequence: number,
  mode: number,
) {
  let pubkey: MessageGenerated

  // NOTE: secp256k1 is going to be removed from evmos
  if (algo === 'secp256k1') {
    pubkey = {
      message: new secp.cosmos.crypto.secp256k1.PubKey({
        key: publicKey,
      }),
      path: 'cosmos.crypto.secp256k1.PubKey',
    }
  } else {
    // NOTE: assume ethsecp256k1 by default because after mainnet is the only one that is going to be supported
    pubkey = {
      message: new eth.ethermint.crypto.v1.ethsecp256k1.PubKey({
        key: publicKey,
      }),
      path: 'ethermint.crypto.v1.ethsecp256k1.PubKey',
    }
  }

  const signerInfo = new tx.cosmos.tx.v1beta1.SignerInfo({
    public_key: createAnyMessage(pubkey),
    mode_info: new tx.cosmos.tx.v1beta1.ModeInfo({
      single: new tx.cosmos.tx.v1beta1.ModeInfo.Single({
        mode,
      }),
    }),
    sequence,
  })

  return signerInfo
}

export function createAuthInfo(
  signerInfo: tx.cosmos.tx.v1beta1.SignerInfo,
  fee: tx.cosmos.tx.v1beta1.Fee,
) {
  return new tx.cosmos.tx.v1beta1.AuthInfo({
    signer_infos: [signerInfo],
    fee,
  })
}

export function createSigDoc(
  bodyBytes: Uint8Array,
  authInfoBytes: Uint8Array,
  chainId: string,
  accountNumber: number,
) {
  return new tx.cosmos.tx.v1beta1.SignDoc({
    body_bytes: bodyBytes,
    auth_info_bytes: authInfoBytes,
    chain_id: chainId,
    account_number: accountNumber,
  })
}

export function createTransaction(
  message: any,
  memo: string,
  fee: string,
  denom: string,
  gasLimit: number,
  algo: string,
  pubKey: string,
  sequence: number,
  accountNumber: number,
  chainId: string,
  mode: number,
) {
  const body = createBody(message, memo)
  const feeMessage = createFee(fee, denom, gasLimit)
  const pubKeyDecoded = Buffer.from(pubKey, 'base64')

  const signInfo = createSignerInfo(
    algo,
    new Uint8Array(pubKeyDecoded),
    sequence,
    mode,
  )

  const authInfo = createAuthInfo(signInfo, feeMessage)

  const signDoc = createSigDoc(
    body.serializeBinary(),
    authInfo.serializeBinary(),
    chainId,
    accountNumber,
  )

  const hash = new Keccak(256)
  hash.update(Buffer.from(signDoc.serializeBinary()))
  const toSign = hash.digest('binary')

  const res = {
    bodyBytes: Buffer.from(body.serializeBinary()).toString('base64'),
    authInfoBytes: Buffer.from(authInfo.serializeBinary()).toString('base64'),
    chainId,
    accountNumber,
    signBytes: toSign.toString('base64'),
  }
  return res
}
