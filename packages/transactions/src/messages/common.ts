export interface Fee {
  amount: string
  denom: string
  gas: string
}

export interface Sender {
  accountAddress: string
  sequence: number
  accountNumber: number
  pubkey: string
}

export interface Chain {
  chainId: number
  cosmosChainId: string
}
