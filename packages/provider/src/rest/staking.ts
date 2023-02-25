import { Coin } from './coin.js'

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

export function generateEndpointGetDelegations(delegatorAddress: string) {
  return `/cosmos/staking/v1beta1/delegations/${delegatorAddress}`
}

/* eslint-disable camelcase */
export interface DelegationResponse {
  balance: Coin
  delegation: {
    delegator_address: string
    shares: string
    validator_address: string
  }
}

/* eslint-disable camelcase */
export interface GetDelegationsResponse {
  delegation_responses: DelegationResponse[]
  pagination: {
    next_key: string
    total: number
  }
}

export function generateEndpointGetUndelegations(delegatorAddress: string) {
  return `/cosmos/staking/v1beta1/delegators/${delegatorAddress}/unbonding_delegations`
}

/* eslint-disable camelcase */
export interface UndelegationResponse {
  delegator_address: string
  validator_address: string
  entries: [
    {
      creation_height: string
      completion_time: string
      initial_balance: string
      balance: string
    },
  ]
}

/* eslint-disable camelcase */
export interface GetUndelegationsResponse {
  unbonding_responses: UndelegationResponse[]
  pagination: {
    next_key: string
    total: string
  }
}
