import {
  createMsgEditValidator as protoMsgEditValidator,
  createMsgSetWithdrawAddress as protoMsgSetWithdrawAddress,
  createTransaction,
} from '@evmos/proto'

import {
  createEIP712,
  generateFee,
  generateMessage,
  generateTypes,
  MSG_EDIT_VALIDATOR_TYPES,
  createMsgEditValidator,
  MSG_SET_WITHDRAW_ADDRESS_TYPES,
  createMsgSetWithdrawAddress,
} from '@evmos/eip712'

import { Chain, Fee, Sender } from './common'

export interface MsgEditValidatorParams {
  moniker: string | undefined
  identity: string | undefined
  website: string | undefined
  securityContact: string | undefined
  details: string | undefined
  validatorAddress: string | undefined
  commissionRate: string | undefined
  minSelfDelegation: string | undefined
}

export function createTxMsgEditValidator(
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: MsgEditValidatorParams,
) {
  // EIP712
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )
  const types = generateTypes(MSG_EDIT_VALIDATOR_TYPES)
  const msg = createMsgEditValidator(
    params.moniker,
    params.identity,
    params.website,
    params.securityContact,
    params.details,
    params.validatorAddress,
    params.commissionRate,
    params.minSelfDelegation,
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
  const protoMessage = protoMsgEditValidator(
    params.moniker,
    params.identity,
    params.website,
    params.securityContact,
    params.details,
    params.validatorAddress,
    params.commissionRate,
    params.minSelfDelegation,
  )
  const tx = createTransaction(
    protoMessage,
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

export interface MsgSetWithdrawAddressParams {
  delegatorAddress: string
  withdrawAddress: string
}

export function createTxMsgSetWithdrawAddress(
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: MsgSetWithdrawAddressParams,
) {
  // EIP712
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )
  const types = generateTypes(MSG_SET_WITHDRAW_ADDRESS_TYPES)
  const msg = createMsgSetWithdrawAddress(
    params.delegatorAddress,
    params.withdrawAddress,
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
  const protoMessage = protoMsgSetWithdrawAddress(
    params.delegatorAddress,
    params.withdrawAddress,
  )
  const tx = createTransaction(
    protoMessage,
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
