import { Coin } from './coin'

export enum ProposalStatus {
  Unspecified = 'PROPOSAL_STATUS_UNSPECIFIED',
  Deposit = 'PROPOSAL_STATUS_DEPOSIT_PERIOD',
  Voting = 'PROPOSAL_STATUS_VOTING_PERIOD',
  Passed = 'PROPOSAL_STATUS_PASSED',
  Rejected = 'PROPOSAL_STATUS_REJECTED',
  Failed = 'PROPOSAL_STATUS_FAILED',
}

// NOTE: this returns all the proposals
// TODO: add pagination to the request
export function generateEndpointProposals() {
  return `/cosmos/gov/v1beta1/proposals`
}

export interface BaseProposalContent<T = string> {
  '@type': T
  title: string
  description: string
}

export interface SoftwareUpgradeProposalPlan {
  name: string
  time: string
  upgraded_client_state: string // eslint-disable-line camelcase
  info: string
  height: string
}

export interface SoftwareUpgradeProposalContent
  extends BaseProposalContent<'/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal'> {
  plan: SoftwareUpgradeProposalPlan
}

export interface ParameterChangeProposalParam {
  subspace: string
  key: string
  value: string
}

export interface ParameterChangeProposalContent
  extends BaseProposalContent<'/cosmos.params.v1beta1.ParameterChangeProposal'> {
  changes: ParameterChangeProposalParam[]
}

export type ProposalContent =
  | BaseProposalContent
  | SoftwareUpgradeProposalContent
  | ParameterChangeProposalContent

/* eslint-disable camelcase */
export interface Proposal {
  proposal_id: string
  content: ProposalContent
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

export function generateEndpointProposalTally(proposalId: string) {
  return `/cosmos/gov/v1beta1/proposals/${proposalId}/tally`
}

export interface TallyResponse {
  tally: {
    yes: string
    abstain: string
    no: string
    no_with_veto: string
  }
}
