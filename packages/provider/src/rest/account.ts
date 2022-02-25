import { fetch } from './http'

export const accountEndpoint = '/cosmos/auth/v1beta1/accounts/'

/* eslint-disable camelcase */
export interface AccountResponse {
  account: {
    '@type': string
    base_account: {
      address: string
      pub_key?: {
        '@type': string
        key: string
      }
      account_number: string
      sequence: string
    }
    code_hash: string
  }
}

export async function getAccount(url: string, address: string) {
  const res = await fetch(`${url}${accountEndpoint}${address}`)
  return JSON.parse(res)
}
