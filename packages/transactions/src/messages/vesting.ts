import {
  createMsgVesting as protoMsgVesting,
  createTransaction,
} from '@astradefi/proto'

import {
  createEIP712,
  generateFee,
  generateMessage,
  generateTypes,
  createMsgVesting,
  MSG_VESTING_TYPES,
} from '@astradefi/eip712'

import { Chain, Fee, Sender } from './common'

export interface VestingSendParams {
  destinationAddress: string
  startTime: string
  vestingPeriod: {
    length: string
    amount: { denom: string; amount: string }[]
  }[]
}

export function createMessageVesting(
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: VestingSendParams,
) {
  /**
   * EIP712
   */
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )
  const types = generateTypes(MSG_VESTING_TYPES)

  const msg = createMsgVesting(
    sender.accountAddress,
    params.destinationAddress,
    params.startTime,
    params.vestingPeriod,
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

  /**
   * Cosmos
   */
  const msgVesting = protoMsgVesting(
    sender.accountAddress,
    params.destinationAddress,
    params.startTime,
    params.vestingPeriod,
  )

  const tx = createTransaction(
    msgVesting,
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
