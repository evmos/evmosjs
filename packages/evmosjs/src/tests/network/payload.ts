import { Chain, Sender, TxContext } from '@evmos/transactions'
import { senderAddress, chainId, cosmosChainId, fee } from './params'

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

  const memo = ''

  const context: TxContext = {
    chain,
    sender,
    fee,
    memo,
  }

  return context
}
