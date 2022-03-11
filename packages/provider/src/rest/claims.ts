export function generateEndpointClaimsRecord(address: string) {
  return `/evmos/claims/v1/claims_records/${address}`
}

/* eslint-disable camelcase */
export interface Claim {
  action: string
  completed: boolean
  claimable_amount: string
}

/* eslint-disable camelcase */
export interface ClaimsRecordResponse {
  initial_claimable_amount: number
  claims: Claim[]
}
