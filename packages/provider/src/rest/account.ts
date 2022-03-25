export function generateEndpointAccount(address: string) {
  return `/cosmos/auth/v1beta1/accounts/${address}`
}

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
