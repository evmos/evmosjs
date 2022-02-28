export const claimsRecordEndpoint = '/evmos/claims/v1/claims_records/'

/* eslint-disable camelcase */
export interface Claim {
  action: string
  completed: boolean
  claimable_amount: string
}

/* eslint-disable camelcase */
export interface claimsRecordResponse {
  initial_claimable_amount: number
  claims: Claim[]
}
