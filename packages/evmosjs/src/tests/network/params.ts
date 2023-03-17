import { Wallet } from '@ethersproject/wallet'
import { Fee } from '@evmos/transactions'

const seed =
  'inmate snack that position deliver hybrid gasp open that wrestle siege goddess'
export const wallet = Wallet.fromMnemonic(seed)
export const senderHex = wallet.address
export const senderAddress = 'evmos16famsnv0hqks7z9h60cn052y4t46jhsk20792m'
export const destinationAddress = 'evmos1c8y9awp83aurchlzzql3ujkqgxcfg9s2uu7a0c'

export const nodeUrl = 'http://localhost:1317'
export const jsonRPCUrl = 'http://localhost:8545'
export const chainId = 9000
export const cosmosChainId = 'evmos_9000-1'
export const denom = 'aevmos'

export const ibcDenom =
  'ibc/14F9BC3E44B8A9C1BE1FB08980FAB87034C9905EF17CF2F5008FC085218811CC'

export const fee: Fee = {
  amount: '10000000000000000',
  denom,
  gas: '10000000',
}
