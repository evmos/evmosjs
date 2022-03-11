import { Coin } from './coin'

// TODO: add pagination to the request
export function generateEndpointBalances(address: string) {
  return `/cosmos/bank/v1beta1/balances/${address}`
}

/* eslint-disable camelcase */
export interface BalancesResponse {
  balances: Coin[]
  pagination: {
    next_key: string
    total: number
  }
}
