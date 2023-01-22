import {
  createGenericAuthorization as protoCreateGenericAuthorization,
  createMsgRevoke,
  createMsgGrant,
  createTransaction,
} from '@evmos/proto'

import {
  createEIP712,
  generateFee,
  generateMessage,
  generateTypes,
  createMsgGenericAuthorization,
  createMsgRevokeGenericAuthorization,
  MSG_GENERIC_AUTHORIZATION_TYPES,
  MSG_REVOKE_GENERIC_AUTHORIZATION_TYPES,
} from '@evmos/eip712'
import { Chain, Fee, Sender } from '../common'

export interface MsgGenericAuthorizationParams {
  botAddress: string
  typeUrl: string
  expires: number
}

export const createTxMsgGenericGrant = (
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: MsgGenericAuthorizationParams,
) => {
  // EIP712
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )
  const types = generateTypes(MSG_GENERIC_AUTHORIZATION_TYPES)

  const msg = createMsgGenericAuthorization(
    sender.accountAddress,
    params.botAddress,
    params.typeUrl,
    params.expires,
  )

  const messages = generateMessage(
    sender.accountNumber.toString(),
    sender.sequence.toString(),
    chain.cosmosChainId,
    memo,
    feeObject,
    msg,
  )
  const eipToSign = createEIP712(types, chain.chainId, messages)

  // Cosmos
  const msgGenericGrant = protoCreateGenericAuthorization(params.typeUrl)

  const msgCosmos = createMsgGrant(
    sender.accountAddress,
    params.botAddress,
    msgGenericGrant,
    params.expires,
  )

  const tx = createTransaction(
    msgCosmos,
    memo,
    fee.amount,
    fee.denom,
    parseInt(fee.gas, 10),
    'ethsecp256',
    sender.pubkey,
    sender.sequence,
    sender.accountNumber,
    chain.cosmosChainId,
  )

  return {
    signDirect: tx.signDirect,
    legacyAmino: tx.legacyAmino,
    eipToSign,
  }
}

export interface MsgGenericRevokeParams {
  botAddress: string
  typeUrl: string
}

export const createTxMsgGenericRevoke = (
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: MsgGenericRevokeParams,
) => {
  // EIP712
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )
  const types = generateTypes(MSG_REVOKE_GENERIC_AUTHORIZATION_TYPES)

  const msg = createMsgRevokeGenericAuthorization(
    sender.accountAddress,
    params.botAddress,
    params.typeUrl,
  )

  const messages = generateMessage(
    sender.accountNumber.toString(),
    sender.sequence.toString(),
    chain.cosmosChainId,
    memo,
    feeObject,
    msg,
  )
  const eipToSign = createEIP712(types, chain.chainId, messages)

  // Cosmos
  const msgCosmos = createMsgRevoke(
    sender.accountAddress,
    params.botAddress,
    params.typeUrl,
  )

  const tx = createTransaction(
    msgCosmos,
    memo,
    fee.amount,
    fee.denom,
    parseInt(fee.gas, 10),
    'ethsecp256',
    sender.pubkey,
    sender.sequence,
    sender.accountNumber,
    chain.cosmosChainId,
  )

  return {
    signDirect: tx.signDirect,
    legacyAmino: tx.legacyAmino,
    eipToSign,
  }
}
