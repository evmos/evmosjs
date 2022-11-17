import {
  createMsgDeposit as protoCreateMsgDeposit,
  createTransaction,
} from '@astradefi/proto'
import {
  createEIP712,
  generateFee,
  generateMessage,
  generateTypes,
  createMsgDeposit,
  MSG_DEPOSIT_TYPES,
} from '@astradefi/eip712'
import { Chain, Fee, Sender } from '../common'

export interface MessageMsgDepositParams {
  proposalId: number
  deposit: {
    denom: string
    amount: string
  }
}

export function createTxMsgDeposit(
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: MessageMsgDepositParams,
) {
  // EIP712
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress,
  )
  const types = generateTypes(MSG_DEPOSIT_TYPES)
  const msg = createMsgDeposit(
    params.proposalId,
    sender.accountAddress,
    params.deposit,
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
  const msgCosmos = protoCreateMsgDeposit(
    params.proposalId,
    sender.accountAddress,
    params.deposit,
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
