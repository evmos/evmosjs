import { Chain, Sender, Fee, TxContext } from '@evmos/transactions'
import { senderAddress, chainId, cosmosChainId } from './params'

export const createTxContext = (
  accountNumber: string,
  pubKey: string,
  sequence: string,
): TxContext => {
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

  return context
}
