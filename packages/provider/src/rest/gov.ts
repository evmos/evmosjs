import { Coin } from './coin'

export const proposalsEndpoint = '/cosmos/gov/v1beta1/proposals'

/* eslint-disable camelcase */
export interface Proposal {
  proposal_id: string
  content: {
    '@type': string
    title: string
    description: string
  }
  status: string
  final_tally_result: {
    yes: string
    abstain: string
    no: string
    no_with_veto: string
  }
  submit_time: string
  deposit_end_time: string
  total_deposit: Coin[]
  voting_start_time: string
  voting_end_time: string
}

/* eslint-disable camelcase */
export interface ProposalsResponse {
  proposals: Proposal[]
  pagination: {
    next_key: string
    total: number
  }
}
