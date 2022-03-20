import { Coin } from './coin'

export function generateEndpointDistributionRewardsByAddress(address: string) {
  return `/cosmos/distribution/v1beta1/delegators/${address}/rewards`
}

/* eslint-disable camelcase */
export interface Reward {
  validator_address: string
  reward: Coin[]
}
export interface DistributionRewardsResponse {
  rewards: Reward[]
  total: Coin[]
}

export function generateEndpointGetValidators() {
  return `/cosmos/staking/v1beta1/validators`
}

/* eslint-disable camelcase */
export interface Validator {
  commission: {
    commission_rates: {
      max_change_rate: string
      max_rate: string
      rate: string
    }
    update_time: string
  }
  consensus_pubkey: {
    '@type': string
    key: string
  }
  delegator_shares: string
  description: {
    details: string
    identity: string
    moniker: string
    security_contact: string
    website: string
  }
  jailed: boolean
  min_self_delegation: string
  operator_address: string
  status: string
  tokens: string
  unbonding_height: string
  unbonding_time: string
}

/* eslint-disable camelcase */
export interface GetValidatorsResponse {
  validators: Validator[]
  pagination: {
    next_key: string
    total: number
  }
}
