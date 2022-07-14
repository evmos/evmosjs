import {
  createTransaction,
  createMsgRevoke,
  RevokeMessages,
} from '@tharsis/proto'

import { Chain, Fee, Sender } from '../common'

/* eslint-disable camelcase */
export interface MsgStakeRevokeAuthorizationParams {
  bot_address: string
}

export function createTxMsgStakeRevokeAuthorization(
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: MsgStakeRevokeAuthorizationParams,
) {
  // EIP712
  // This is blocked until EvmosV7 is released with the eip712 any messages fixes!

  // Cosmos
  const msgCosmos = createMsgRevoke(
    sender.accountAddress,
    params.bot_address,
    RevokeMessages.REVOKE_MSG_DELEGATE,
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
