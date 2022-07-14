import {
  createMsgGrant,
  createStakeAuthorization,
  stakeAuthTypes,
  createTransaction,
} from '@tharsis/proto'

import { Chain, Fee, Sender } from '../common'

/* eslint-disable camelcase */
export interface MsgStakeAuthorizationParams {
  bot_address: string
  validator_address: string
  denom: string
  maxTokens: string
  duration_in_seconds: number
}

export function createTxMsgStakeAuthorization(
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: MsgStakeAuthorizationParams,
) {
  // EIP712
  // This is blocked until EvmosV7 is released with the eip712 any messages fixes!

  // Cosmos
  const msgStakeGrant = createStakeAuthorization(
    params.validator_address,
    params.denom,
    params.maxTokens,
    stakeAuthTypes.AUTHORIZATION_TYPE_DELEGATE,
  )
  const msgCosmos = createMsgGrant(
    sender.accountAddress,
    params.bot_address,
    msgStakeGrant,
    params.duration_in_seconds,
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
  }
}
