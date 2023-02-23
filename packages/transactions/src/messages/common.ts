import { Proto } from '@evmos/proto'

export interface EIPToSign {
  types: object
  primaryType: string
  domain: {
    name: string
    version: string
    chainId: number
    verifyingContract: string
    salt: string
  }
  message: object
}
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
export interface TxGenerated {
  signDirect: {
    body: Proto.Cosmos.Transactions.Tx.TxBody
    authInfo: Proto.Cosmos.Transactions.Tx.AuthInfo
    signBytes: string
  }
  legacyAmino: {
    body: Proto.Cosmos.Transactions.Tx.TxBody
    authInfo: Proto.Cosmos.Transactions.Tx.AuthInfo
    signBytes: string
  }
  eipToSign: EIPToSign
}

export type Coin = {
  denom: string
  amount: string
}

export type Period = {
  length: number
  amount: Coin[]
}
