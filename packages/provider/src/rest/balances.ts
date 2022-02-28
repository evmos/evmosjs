import { Coin } from './coin'

export const balancesEndpoint = '/cosmos/bank/v1beta1/balances/'

/* eslint-disable camelcase */
export interface BalancesResponse {
  balances: Coin[]
  pagination: {
    next_key: string
    total: number
  }
}
