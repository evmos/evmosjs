import { Keccak } from 'sha3'
import {
  TxBody,
  Fee,
  SignerInfo,
  ModeInfo,
  // eslint-disable-next-line camelcase
  ModeInfo_Single,
  AuthInfo,
  SignDoc,
} from '@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/tx/v1beta1/tx_pb'
import { SignMode } from '@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/tx/signing/v1beta1/signing_pb'
import * as tx from '@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/tx/v1beta1/tx_pb'
import { Coin } from '@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/base/v1beta1/coin_pb'
import { PubKey } from '@buf/evmos_ethermint.bufbuild_es/ethermint/crypto/v1/ethsecp256k1/keys_pb'

import { createAnyMessage } from '../messages/utils'

export const SIGN_DIRECT = SignMode.DIRECT
export const LEGACY_AMINO = SignMode.LEGACY_AMINO_JSON

export namespace protoTxNamespace {
  /* global cosmos */
  /* eslint no-undef: "error" */
  export import txn = tx
}

// TODO: messages should be typed as proto message. A types package is needed to export that type without problems
export function createBodyWithMultipleMessages(messages: any[], memo: string) {
  const content: any[] = []

  messages.forEach((message) => {
    content.push(createAnyMessage(message))
  })

  return new TxBody({
    messages: content,
    memo,
  })
}

export function createBody(message: any, memo: string) {
  return createBodyWithMultipleMessages([message], memo)
}

export function createFee(fee: string, denom: string, gasLimit: number) {
  return new Fee({
    amount: [
      new Coin({
        denom,
        amount: fee,
      }),
    ],
    gasLimit: BigInt(gasLimit),
  })
}

export function createSignerInfo(
  publicKey: Uint8Array,
  sequence: bigint,
  mode: number,
) {
  const pubkey = {
    message: new PubKey({
      key: publicKey,
    }),
    path: 'ethermint.crypto.v1.ethsecp256k1.PubKey',
  }

  const signerInfo = new SignerInfo({
    publicKey: createAnyMessage(pubkey),
    modeInfo: new ModeInfo({
      sum: {
        value: new ModeInfo_Single({
          mode,
        }),
        case: 'single',
      },
    }),
    sequence,
  })

  return signerInfo
}

export function createAuthInfo(signerInfo: SignerInfo, fee: Fee) {
  return new AuthInfo({
    signerInfos: [signerInfo],
    fee,
  })
}

export function createSigDoc(
  bodyBytes: Uint8Array,
  authInfoBytes: Uint8Array,
  chainId: string,
  accountNumber: number,
) {
  return new SignDoc({
    bodyBytes,
    authInfoBytes,
    chainId,
    accountNumber: BigInt(accountNumber),
  })
}

// TODO: messages should be typed as proto message. A types package is needed to export that type without problems
export function createTransactionWithMultipleMessages(
  messages: any,
  memo: string,
  fee: string,
  denom: string,
  gasLimit: number,
  pubKey: string,
  sequence: bigint,
  accountNumber: number,
  chainId: string,
) {
  const body = createBodyWithMultipleMessages(messages, memo)
  const feeMessage = createFee(fee, denom, gasLimit)
  const pubKeyDecoded = Buffer.from(pubKey, 'base64')

  // AMINO
  const signInfoAmino = createSignerInfo(
    new Uint8Array(pubKeyDecoded),
    sequence,
    LEGACY_AMINO,
  )

  const authInfoAmino = createAuthInfo(signInfoAmino, feeMessage)

  const signDocAmino = createSigDoc(
    body.toBinary(),
    authInfoAmino.toBinary(),
    chainId,
    accountNumber,
  )

  const hashAmino = new Keccak(256)
  hashAmino.update(Buffer.from(signDocAmino.toBinary()))
  const toSignAmino = hashAmino.digest('binary')

  // SignDirect
  const signInfoDirect = createSignerInfo(
    new Uint8Array(pubKeyDecoded),
    sequence,
    SIGN_DIRECT,
  )

  const authInfoDirect = createAuthInfo(signInfoDirect, feeMessage)

  const signDocDirect = createSigDoc(
    body.toBinary(),
    authInfoDirect.toBinary(),
    chainId,
    accountNumber,
  )

  const hashDirect = new Keccak(256)
  hashDirect.update(Buffer.from(signDocDirect.toBinary()))
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

export function createTransaction(
  message: any,
  memo: string,
  fee: string,
  denom: string,
  gasLimit: number,
  pubKey: string,
  sequence: bigint,
  accountNumber: number,
  chainId: string,
) {
  return createTransactionWithMultipleMessages(
    [message],
    memo,
    fee,
    denom,
    gasLimit,
    pubKey,
    sequence,
    accountNumber,
    chainId,
  )
}
