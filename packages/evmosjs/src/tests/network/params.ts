import { Wallet } from '@ethersproject/wallet'

const seed =
  'inmate snack that position deliver hybrid gasp open that wrestle siege goddess'
export const wallet = Wallet.fromMnemonic(seed)
export const senderAddress = 'evmos16famsnv0hqks7z9h60cn052y4t46jhsk20792m'
export const destinationAddress = 'evmos1c8y9awp83aurchlzzql3ujkqgxcfg9s2uu7a0c'
// export const nodeUrl = 'https://rest.bd.evmos.dev:1317'
export const nodeUrl = 'http://localhost:1317'
export const chainId = 9000
export const cosmosChainId = 'evmos_9000-1'
export const denom = 'aevmos'