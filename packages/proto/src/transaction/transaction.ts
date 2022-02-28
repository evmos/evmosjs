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

export namespace protoTxNamespace {
  /* global cosmos */
  /* eslint no-undef: "error" */
  export import txn = tx.cosmos.tx.v1beta1
}

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
) {
  const body = createBody(message, memo)
  const feeMessage = createFee(fee, denom, gasLimit)
  const pubKeyDecoded = Buffer.from(pubKey, 'base64')

  // AMINO
  const signInfoAmino = createSignerInfo(
    algo,
    new Uint8Array(pubKeyDecoded),
    sequence,
    LEGACY_AMINO,
  )

  const authInfoAmino = createAuthInfo(signInfoAmino, feeMessage)

  const signDocAmino = createSigDoc(
    body.serializeBinary(),
    authInfoAmino.serializeBinary(),
    chainId,
    accountNumber,
  )

  const hashAmino = new Keccak(256)
  hashAmino.update(Buffer.from(signDocAmino.serializeBinary()))
  const toSignAmino = hashAmino.digest('binary')

  // SignDirect
  const signInfoDirect = createSignerInfo(
    algo,
    new Uint8Array(pubKeyDecoded),
    sequence,
    SIGN_DIRECT,
  )

  const authInfoDirect = createAuthInfo(signInfoDirect, feeMessage)

  const signDocDirect = createSigDoc(
    body.serializeBinary(),
    authInfoDirect.serializeBinary(),
    chainId,
    accountNumber,
  )

  const hashDirect = new Keccak(256)
  hashDirect.update(Buffer.from(signDocDirect.serializeBinary()))
  const toSignDirect = hashDirect.digest('binary')

  return {
    legacyAmino: {
      body,
      authInfo: authInfoAmino,
      signBytes: toSignAmino.toString('base64'),
    },
    signDirect: {
      body,
      authInfo: authInfoDirect,
      signBytes: toSignDirect.toString('base64'),
    },
  }
}
