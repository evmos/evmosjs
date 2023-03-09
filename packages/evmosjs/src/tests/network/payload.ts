import {
  Chain,
  Sender,
  Fee,
  TxContext,
  MsgSendParams,
  createTxMsgSend,
  TxPayload,
} from '@evmos/transactions'
import {
  senderAddress,
  destinationAddress,
  chainId,
  cosmosChainId,
} from './params'

export const createTx = (
  accountNumber: string,
  pubKey: string,
  sequence: string,
): [TxContext, TxPayload] => {
  const chain: Chain = {
    chainId,
    cosmosChainId,
  }

  const sender: Sender = {
    accountAddress: senderAddress,
    sequence: parseInt(sequence, 10),
    accountNumber: parseInt(accountNumber, 10),
    pubkey: pubKey,
  }

  const fee: Fee = {
    amount: '500000000000000',
    denom: 'aevmos',
    gas: '200000',
  }

  const memo = ''

  const context: TxContext = {
    chain,
    sender,
    fee,
    memo,
  }

  const params: MsgSendParams = {
    destinationAddress,
    amount: '1000',
    denom: 'aevmos',
  }

  const tx: TxPayload = createTxMsgSend(context, params)

  return [context, tx]
}
