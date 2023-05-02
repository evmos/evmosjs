import { Keccak } from 'sha3'
import { Any } from '@bufbuild/protobuf'
import { StdFee, makeSignDoc, serializeSignDoc } from '@cosmjs/amino'
import { Coin } from '../proto/cosmos/base/coin.js'
import {
  TxBody,
  Fee,
  SignerInfo,
  ModeInfo,
  // eslint-disable-next-line camelcase
  ModeInfo_Single,
  AuthInfo,
  SignDoc,
} from '../proto/cosmos/transactions/tx.js'
import { PubKey } from '../proto/ethermint/crypto/keys.js'
import { PubKey as SECP256k1 } from '../proto/cosmos/crypto/secp256k1/keys.js'
import { SignMode } from '../proto/cosmos/transactions/signing.js'
import { AminoTypes } from '../amino/registry.js'
import { convertProtoMessageGeneratedToObject } from '../amino/objectConverter.js'

import { createAnyMessage, MessageGenerated } from '../messages/common.js'

export const SIGN_DIRECT = SignMode.DIRECT
export const LEGACY_AMINO = SignMode.LEGACY_AMINO_JSON

// Returns a base-64-encoded keccak256 hash of the
// given content bytes.
export function keccak256(content: Uint8Array) {
  const hash = new Keccak(256)
  hash.update(Buffer.from(content))
  const bytes = hash.digest('binary')
  return Buffer.from(bytes).toString('base64')
}

// Converts an array of Protobuf MessageGenerated
// objects to Amino representations using the registry.
export function convertProtoMessagesToAmino(protoMessages: MessageGenerated[]) {
  return protoMessages.map((protoMsg) => {
    const protoObject = convertProtoMessageGeneratedToObject(protoMsg)
    return AminoTypes.toAmino(protoObject)
  })
}

// TODO: messages should be typed as proto message. A types package is needed to export that type without problems
export function createBodyWithMultipleMessages(messages: any[], memo: string) {
  const content: Any[] = []

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
  algo: string,
  publicKey: Uint8Array,
  sequence: number,
  mode: number,
) {
  let pubkey: MessageGenerated

  // NOTE: secp256k1 is going to be removed from evmos
  if (algo === 'secp256k1') {
    pubkey = {
      message: new SECP256k1({
        key: publicKey,
      }),
      path: 'cosmos.crypto.secp256k1.PubKey',
    }
  } else {
    // NOTE: assume ethsecp256k1 by default because after mainnet is the only one that is going to be supported
    pubkey = {
      message: new PubKey({
        key: publicKey,
      }),
      path: 'ethermint.crypto.v1.ethsecp256k1.PubKey',
    }
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
    sequence: BigInt(sequence),
  })

  return signerInfo
}

export function createAuthInfo(signerInfo: SignerInfo, fee: Fee) {
  return new AuthInfo({
    signerInfos: [signerInfo],
    fee,
  })
}

export function createSignDoc(
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

export function createStdFee(amount: string, denom: string, gasLimit: number) {
  return {
    amount: [
      {
        amount,
        denom,
      },
    ],
    gas: gasLimit.toString(),
  }
}

export function createStdSignDoc(
  protoMessages: any[],
  fee: StdFee,
  chainId: string,
  memo: string,
  sequence: number,
  accountNumber: number,
) {
  const aminoMsgs = convertProtoMessagesToAmino(protoMessages)
  return makeSignDoc(aminoMsgs, fee, chainId, memo, accountNumber, sequence)
}

// Returns the hashed digest of the corresponding StdSignDoc.
// If the StdSignDoc cannot be generated (e.g. types are not
// supported), returns an empty string.
export function createStdSignDigest(
  messages: any,
  memo: string,
  fee: string,
  denom: string,
  gasLimit: number,
  sequence: number,
  accountNumber: number,
  chainId: string,
) {
  try {
    const stdFee = createStdFee(fee, denom, gasLimit)
    const stdSignDoc = createStdSignDoc(
      messages,
      stdFee,
      chainId,
      memo,
      sequence,
      accountNumber,
    )

    return keccak256(serializeSignDoc(stdSignDoc))
  } catch {
    return ''
  }
}

// TODO: messages should be typed as MessageGenerated
export function createTransactionWithMultipleMessages(
  messages: any,
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
  const body = createBodyWithMultipleMessages(messages, memo)
  const feeMessage = createFee(fee, denom, gasLimit)
  const pubKeyDecoded = Buffer.from(pubKey, 'base64')

  // AMINO
  const aminoSignerInfo = createSignerInfo(
    algo,
    new Uint8Array(pubKeyDecoded),
    sequence,
    LEGACY_AMINO,
  )

  const aminoAuthInfo = createAuthInfo(aminoSignerInfo, feeMessage)
  const aminoSignDigest = createStdSignDigest(
    messages,
    memo,
    fee,
    denom,
    gasLimit,
    sequence,
    accountNumber,
    chainId,
  )

  // SignDirect
  const directSignerInfo = createSignerInfo(
    algo,
    new Uint8Array(pubKeyDecoded),
    sequence,
    SIGN_DIRECT,
  )

  const directAuthInfo = createAuthInfo(directSignerInfo, feeMessage)

  const directSignDoc = createSignDoc(
    body.toBinary(),
    directAuthInfo.toBinary(),
    chainId,
    accountNumber,
  )

  const directSignDigest = keccak256(directSignDoc.toBinary())

  return {
    legacyAmino: {
      body,
      authInfo: aminoAuthInfo,
      signBytes: aminoSignDigest,
    },
    signDirect: {
      body,
      authInfo: directAuthInfo,
      signBytes: directSignDigest,
    },
  }
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
  return createTransactionWithMultipleMessages(
    [message],
    memo,
    fee,
    denom,
    gasLimit,
    algo,
    pubKey,
    sequence,
    accountNumber,
    chainId,
  )
}
