import { Coin } from './coin'

// TODO: add pagination to the request
export function generateEndpointVestingBalance(address: string) {
  return `/evmos/vesting/v1/balances/${address}`
}

/* eslint-disable camelcase */
export interface BalancesResponse {
  locked: Coin[]
  unvested: Coin[]
  vested: Coin[]
}
