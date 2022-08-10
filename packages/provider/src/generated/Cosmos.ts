/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  CosmosTxV1Beta1GetBlockWithTxsResponse,
  CosmosTxV1Beta1GetTxResponse,
  CosmosTxV1Beta1GetTxsEventResponse,
  CosmosTxV1Beta1SimulateRequest,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Cosmos<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http
  }

  /**
   * @description Since: cosmos-sdk 0.43
   *
   * @tags Query
   * @name Accounts
   * @summary Accounts returns all the existing accounts
   * @request GET:/cosmos/auth/v1beta1/accounts
   */
  accounts = (
    query?: {
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        accounts?: { type_url?: string; value?: string }[]
        pagination?: { next_key?: string; total?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/auth/v1beta1/accounts`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name AuthAccount
   * @summary Account returns account details based on address.
   * @request GET:/cosmos/auth/v1beta1/accounts/{address}
   */
  authAccount = (address: string, params: RequestParams = {}) =>
    this.http.request<
      { account?: { type_url?: string; value?: string } },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/auth/v1beta1/accounts/${address}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name AuthParams
   * @summary Params queries all parameters.
   * @request GET:/cosmos/auth/v1beta1/params
   */
  authParams = (params: RequestParams = {}) =>
    this.http.request<
      {
        params?: {
          max_memo_characters?: string
          tx_sig_limit?: string
          tx_size_cost_per_byte?: string
          sig_verify_cost_ed25519?: string
          sig_verify_cost_secp256k1?: string
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/auth/v1beta1/params`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name Grants
   * @summary Returns list of `Authorization`, granted to the grantee by the granter.
   * @request GET:/cosmos/authz/v1beta1/grants
   */
  grants = (
    query?: {
      granter?: string
      grantee?: string
      msg_type_url?: string
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        grants?: {
          authorization?: { type_url?: string; value?: string }
          expiration?: string
        }[]
        pagination?: { next_key?: string; total?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/authz/v1beta1/grants`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * @description Since: cosmos-sdk 0.45.2
   *
   * @tags Query
   * @name GranteeGrants
   * @summary GranteeGrants returns a list of `GrantAuthorization` by grantee.
   * @request GET:/cosmos/authz/v1beta1/grants/grantee/{grantee}
   */
  granteeGrants = (
    grantee: string,
    query?: {
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        grants?: {
          granter?: string
          grantee?: string
          authorization?: { type_url?: string; value?: string }
          expiration?: string
        }[]
        pagination?: { next_key?: string; total?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/authz/v1beta1/grants/grantee/${grantee}`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * @description Since: cosmos-sdk 0.45.2
   *
   * @tags Query
   * @name GranterGrants
   * @summary GranterGrants returns list of `GrantAuthorization`, granted by granter.
   * @request GET:/cosmos/authz/v1beta1/grants/granter/{granter}
   */
  granterGrants = (
    granter: string,
    query?: {
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        grants?: {
          granter?: string
          grantee?: string
          authorization?: { type_url?: string; value?: string }
          expiration?: string
        }[]
        pagination?: { next_key?: string; total?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/authz/v1beta1/grants/granter/${granter}`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name AllBalances
   * @summary AllBalances queries the balance of all coins for a single account.
   * @request GET:/cosmos/bank/v1beta1/balances/{address}
   */
  allBalances = (
    address: string,
    query?: {
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        balances?: { denom?: string; amount?: string }[]
        pagination?: { next_key?: string; total?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/bank/v1beta1/balances/${address}`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name BankBalance
   * @summary Balance queries the balance of a single coin for a single account.
   * @request GET:/cosmos/bank/v1beta1/balances/{address}/by_denom
   */
  bankBalance = (
    address: string,
    query?: { denom?: string },
    params: RequestParams = {},
  ) =>
    this.http.request<
      { balance?: { denom?: string; amount?: string } },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/bank/v1beta1/balances/${address}/by_denom`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name DenomsMetadata
   * @summary DenomsMetadata queries the client metadata for all registered coin denominations.
   * @request GET:/cosmos/bank/v1beta1/denoms_metadata
   */
  denomsMetadata = (
    query?: {
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        metadatas?: {
          description?: string
          denom_units?: {
            denom?: string
            exponent?: number
            aliases?: string[]
          }[]
          base?: string
          display?: string
          name?: string
          symbol?: string
        }[]
        pagination?: { next_key?: string; total?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/bank/v1beta1/denoms_metadata`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name DenomMetadata
   * @summary DenomsMetadata queries the client metadata of a given coin denomination.
   * @request GET:/cosmos/bank/v1beta1/denoms_metadata/{denom}
   */
  denomMetadata = (denom: string, params: RequestParams = {}) =>
    this.http.request<
      {
        metadata?: {
          description?: string
          denom_units?: {
            denom?: string
            exponent?: number
            aliases?: string[]
          }[]
          base?: string
          display?: string
          name?: string
          symbol?: string
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/bank/v1beta1/denoms_metadata/${denom}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name BankParams
   * @summary Params queries the parameters of x/bank module.
   * @request GET:/cosmos/bank/v1beta1/params
   */
  bankParams = (params: RequestParams = {}) =>
    this.http.request<
      {
        params?: {
          send_enabled?: { denom?: string; enabled?: boolean }[]
          default_send_enabled?: boolean
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/bank/v1beta1/params`,
      method: 'GET',
      ...params,
    }) /**
 * No description
 * 
 * @tags Query
 * @name SpendableBalances
 * @summary SpendableBalances queries the spenable balance of all coins for a single
account.
 * @request GET:/cosmos/bank/v1beta1/spendable_balances/{address}
 */
  spendableBalances = (
    address: string,
    query?: {
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        balances?: { denom?: string; amount?: string }[]
        pagination?: { next_key?: string; total?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/bank/v1beta1/spendable_balances/${address}`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name TotalSupply
   * @summary TotalSupply queries the total supply of all coins.
   * @request GET:/cosmos/bank/v1beta1/supply
   */
  totalSupply = (
    query?: {
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        supply?: { denom?: string; amount?: string }[]
        pagination?: { next_key?: string; total?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/bank/v1beta1/supply`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name SupplyOf
   * @summary SupplyOf queries the supply of a single coin.
   * @request GET:/cosmos/bank/v1beta1/supply/{denom}
   */
  supplyOf = (denom: string, params: RequestParams = {}) =>
    this.http.request<
      { amount?: { denom?: string; amount?: string } },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/bank/v1beta1/supply/${denom}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name CommunityPool
   * @summary CommunityPool queries the community pool coins.
   * @request GET:/cosmos/distribution/v1beta1/community_pool
   */
  communityPool = (params: RequestParams = {}) =>
    this.http.request<
      { pool?: { denom?: string; amount?: string }[] },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/distribution/v1beta1/community_pool`,
      method: 'GET',
      ...params,
    }) /**
 * No description
 * 
 * @tags Query
 * @name DelegationTotalRewards
 * @summary DelegationTotalRewards queries the total rewards accrued by a each
validator.
 * @request GET:/cosmos/distribution/v1beta1/delegators/{delegator_address}/rewards
 */
  delegationTotalRewards = (
    delegatorAddress: string,
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        rewards?: {
          validator_address?: string
          reward?: { denom?: string; amount?: string }[]
        }[]
        total?: { denom?: string; amount?: string }[]
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/distribution/v1beta1/delegators/${delegatorAddress}/rewards`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name DelegationRewards
   * @summary DelegationRewards queries the total rewards accrued by a delegation.
   * @request GET:/cosmos/distribution/v1beta1/delegators/{delegator_address}/rewards/{validator_address}
   */
  delegationRewards = (
    delegatorAddress: string,
    validatorAddress: string,
    params: RequestParams = {},
  ) =>
    this.http.request<
      { rewards?: { denom?: string; amount?: string }[] },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/distribution/v1beta1/delegators/${delegatorAddress}/rewards/${validatorAddress}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name DistDelegatorValidators
   * @summary DelegatorValidators queries the validators of a delegator.
   * @request GET:/cosmos/distribution/v1beta1/delegators/{delegator_address}/validators
   */
  distDelegatorValidators = (
    delegatorAddress: string,
    params: RequestParams = {},
  ) =>
    this.http.request<
      { validators?: string[] },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/distribution/v1beta1/delegators/${delegatorAddress}/validators`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name DelegatorWithdrawAddress
   * @summary DelegatorWithdrawAddress queries withdraw address of a delegator.
   * @request GET:/cosmos/distribution/v1beta1/delegators/{delegator_address}/withdraw_address
   */
  delegatorWithdrawAddress = (
    delegatorAddress: string,
    params: RequestParams = {},
  ) =>
    this.http.request<
      { withdraw_address?: string },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/distribution/v1beta1/delegators/${delegatorAddress}/withdraw_address`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name DistributionParams
   * @summary Params queries params of the distribution module.
   * @request GET:/cosmos/distribution/v1beta1/params
   */
  distributionParams = (params: RequestParams = {}) =>
    this.http.request<
      {
        params?: {
          community_tax?: string
          base_proposer_reward?: string
          bonus_proposer_reward?: string
          withdraw_addr_enabled?: boolean
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/distribution/v1beta1/params`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name ValidatorCommission
   * @summary ValidatorCommission queries accumulated commission for a validator.
   * @request GET:/cosmos/distribution/v1beta1/validators/{validator_address}/commission
   */
  validatorCommission = (
    validatorAddress: string,
    params: RequestParams = {},
  ) =>
    this.http.request<
      { commission?: { commission?: { denom?: string; amount?: string }[] } },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/distribution/v1beta1/validators/${validatorAddress}/commission`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name ValidatorOutstandingRewards
   * @summary ValidatorOutstandingRewards queries rewards of a validator address.
   * @request GET:/cosmos/distribution/v1beta1/validators/{validator_address}/outstanding_rewards
   */
  validatorOutstandingRewards = (
    validatorAddress: string,
    params: RequestParams = {},
  ) =>
    this.http.request<
      { rewards?: { rewards?: { denom?: string; amount?: string }[] } },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/distribution/v1beta1/validators/${validatorAddress}/outstanding_rewards`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name ValidatorSlashes
   * @summary ValidatorSlashes queries slash events of a validator.
   * @request GET:/cosmos/distribution/v1beta1/validators/{validator_address}/slashes
   */
  validatorSlashes = (
    validatorAddress: string,
    query?: {
      starting_height?: string
      ending_height?: string
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        slashes?: { validator_period?: string; fraction?: string }[]
        pagination?: { next_key?: string; total?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/distribution/v1beta1/validators/${validatorAddress}/slashes`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name Allowance
   * @summary Allowance returns fee granted to the grantee by the granter.
   * @request GET:/cosmos/feegrant/v1beta1/allowance/{granter}/{grantee}
   */
  allowance = (granter: string, grantee: string, params: RequestParams = {}) =>
    this.http.request<
      {
        allowance?: {
          granter?: string
          grantee?: string
          allowance?: { type_url?: string; value?: string }
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/feegrant/v1beta1/allowance/${granter}/${grantee}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name Allowances
   * @summary Allowances returns all the grants for address.
   * @request GET:/cosmos/feegrant/v1beta1/allowances/{grantee}
   */
  allowances = (
    grantee: string,
    query?: {
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        allowances?: {
          granter?: string
          grantee?: string
          allowance?: { type_url?: string; value?: string }
        }[]
        pagination?: { next_key?: string; total?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/feegrant/v1beta1/allowances/${grantee}`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name AllEvidence
   * @summary AllEvidence queries all evidence.
   * @request GET:/cosmos/evidence/v1beta1/evidence
   */
  allEvidence = (
    query?: {
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        evidence?: { type_url?: string; value?: string }[]
        pagination?: { next_key?: string; total?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/evidence/v1beta1/evidence`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name Evidence
   * @summary Evidence queries evidence based on evidence hash.
   * @request GET:/cosmos/evidence/v1beta1/evidence/{evidence_hash}
   */
  evidence = (evidenceHash: string, params: RequestParams = {}) =>
    this.http.request<
      { evidence?: { type_url?: string; value?: string } },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/evidence/v1beta1/evidence/${evidenceHash}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name GovParams
   * @summary Params queries all parameters of the gov module.
   * @request GET:/cosmos/gov/v1beta1/params/{params_type}
   */
  govParams = (paramsType: string, params: RequestParams = {}) =>
    this.http.request<
      {
        voting_params?: { voting_period?: string }
        deposit_params?: {
          min_deposit?: { denom?: string; amount?: string }[]
          max_deposit_period?: string
        }
        tally_params?: {
          quorum?: string
          threshold?: string
          veto_threshold?: string
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/gov/v1beta1/params/${paramsType}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name Proposals
   * @summary Proposals queries all proposals based on given status.
   * @request GET:/cosmos/gov/v1beta1/proposals
   */
  proposals = (
    query?: {
      proposal_status?:
        | 'PROPOSAL_STATUS_UNSPECIFIED'
        | 'PROPOSAL_STATUS_DEPOSIT_PERIOD'
        | 'PROPOSAL_STATUS_VOTING_PERIOD'
        | 'PROPOSAL_STATUS_PASSED'
        | 'PROPOSAL_STATUS_REJECTED'
        | 'PROPOSAL_STATUS_FAILED'
      voter?: string
      depositor?: string
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        proposals?: {
          proposal_id?: string
          content?: { type_url?: string; value?: string }
          status?:
            | 'PROPOSAL_STATUS_UNSPECIFIED'
            | 'PROPOSAL_STATUS_DEPOSIT_PERIOD'
            | 'PROPOSAL_STATUS_VOTING_PERIOD'
            | 'PROPOSAL_STATUS_PASSED'
            | 'PROPOSAL_STATUS_REJECTED'
            | 'PROPOSAL_STATUS_FAILED'
          final_tally_result?: {
            yes?: string
            abstain?: string
            no?: string
            no_with_veto?: string
          }
          submit_time?: string
          deposit_end_time?: string
          total_deposit?: { denom?: string; amount?: string }[]
          voting_start_time?: string
          voting_end_time?: string
        }[]
        pagination?: { next_key?: string; total?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/gov/v1beta1/proposals`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name Proposal
   * @summary Proposal queries proposal details based on ProposalID.
   * @request GET:/cosmos/gov/v1beta1/proposals/{proposal_id}
   */
  proposal = (proposalId: string, params: RequestParams = {}) =>
    this.http.request<
      {
        proposal?: {
          proposal_id?: string
          content?: { type_url?: string; value?: string }
          status?:
            | 'PROPOSAL_STATUS_UNSPECIFIED'
            | 'PROPOSAL_STATUS_DEPOSIT_PERIOD'
            | 'PROPOSAL_STATUS_VOTING_PERIOD'
            | 'PROPOSAL_STATUS_PASSED'
            | 'PROPOSAL_STATUS_REJECTED'
            | 'PROPOSAL_STATUS_FAILED'
          final_tally_result?: {
            yes?: string
            abstain?: string
            no?: string
            no_with_veto?: string
          }
          submit_time?: string
          deposit_end_time?: string
          total_deposit?: { denom?: string; amount?: string }[]
          voting_start_time?: string
          voting_end_time?: string
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/gov/v1beta1/proposals/${proposalId}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name Deposits
   * @summary Deposits queries all deposits of a single proposal.
   * @request GET:/cosmos/gov/v1beta1/proposals/{proposal_id}/deposits
   */
  deposits = (
    proposalId: string,
    query?: {
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        deposits?: {
          proposal_id?: string
          depositor?: string
          amount?: { denom?: string; amount?: string }[]
        }[]
        pagination?: { next_key?: string; total?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/gov/v1beta1/proposals/${proposalId}/deposits`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name Deposit
   * @summary Deposit queries single deposit information based proposalID, depositAddr.
   * @request GET:/cosmos/gov/v1beta1/proposals/{proposal_id}/deposits/{depositor}
   */
  deposit = (
    proposalId: string,
    depositor: string,
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        deposit?: {
          proposal_id?: string
          depositor?: string
          amount?: { denom?: string; amount?: string }[]
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/gov/v1beta1/proposals/${proposalId}/deposits/${depositor}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name TallyResult
   * @summary TallyResult queries the tally of a proposal vote.
   * @request GET:/cosmos/gov/v1beta1/proposals/{proposal_id}/tally
   */
  tallyResult = (proposalId: string, params: RequestParams = {}) =>
    this.http.request<
      {
        tally?: {
          yes?: string
          abstain?: string
          no?: string
          no_with_veto?: string
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/gov/v1beta1/proposals/${proposalId}/tally`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name Votes
   * @summary Votes queries votes of a given proposal.
   * @request GET:/cosmos/gov/v1beta1/proposals/{proposal_id}/votes
   */
  votes = (
    proposalId: string,
    query?: {
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        votes?: {
          proposal_id?: string
          voter?: string
          option?:
            | 'VOTE_OPTION_UNSPECIFIED'
            | 'VOTE_OPTION_YES'
            | 'VOTE_OPTION_ABSTAIN'
            | 'VOTE_OPTION_NO'
            | 'VOTE_OPTION_NO_WITH_VETO'
          options?: {
            option?:
              | 'VOTE_OPTION_UNSPECIFIED'
              | 'VOTE_OPTION_YES'
              | 'VOTE_OPTION_ABSTAIN'
              | 'VOTE_OPTION_NO'
              | 'VOTE_OPTION_NO_WITH_VETO'
            weight?: string
          }[]
        }[]
        pagination?: { next_key?: string; total?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/gov/v1beta1/proposals/${proposalId}/votes`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name Vote
   * @summary Vote queries voted information based on proposalID, voterAddr.
   * @request GET:/cosmos/gov/v1beta1/proposals/{proposal_id}/votes/{voter}
   */
  vote = (proposalId: string, voter: string, params: RequestParams = {}) =>
    this.http.request<
      {
        vote?: {
          proposal_id?: string
          voter?: string
          option?:
            | 'VOTE_OPTION_UNSPECIFIED'
            | 'VOTE_OPTION_YES'
            | 'VOTE_OPTION_ABSTAIN'
            | 'VOTE_OPTION_NO'
            | 'VOTE_OPTION_NO_WITH_VETO'
          options?: {
            option?:
              | 'VOTE_OPTION_UNSPECIFIED'
              | 'VOTE_OPTION_YES'
              | 'VOTE_OPTION_ABSTAIN'
              | 'VOTE_OPTION_NO'
              | 'VOTE_OPTION_NO_WITH_VETO'
            weight?: string
          }[]
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/gov/v1beta1/proposals/${proposalId}/votes/${voter}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name SlashingParams
   * @summary Params queries the parameters of slashing module
   * @request GET:/cosmos/slashing/v1beta1/params
   */
  slashingParams = (params: RequestParams = {}) =>
    this.http.request<
      {
        params?: {
          signed_blocks_window?: string
          min_signed_per_window?: string
          downtime_jail_duration?: string
          slash_fraction_double_sign?: string
          slash_fraction_downtime?: string
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/slashing/v1beta1/params`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name SigningInfos
   * @summary SigningInfos queries signing info of all validators
   * @request GET:/cosmos/slashing/v1beta1/signing_infos
   */
  signingInfos = (
    query?: {
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        info?: {
          address?: string
          start_height?: string
          index_offset?: string
          jailed_until?: string
          tombstoned?: boolean
          missed_blocks_counter?: string
        }[]
        pagination?: { next_key?: string; total?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/slashing/v1beta1/signing_infos`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name SigningInfo
   * @summary SigningInfo queries the signing info of given cons address
   * @request GET:/cosmos/slashing/v1beta1/signing_infos/{cons_address}
   */
  signingInfo = (consAddress: string, params: RequestParams = {}) =>
    this.http.request<
      {
        val_signing_info?: {
          address?: string
          start_height?: string
          index_offset?: string
          jailed_until?: string
          tombstoned?: boolean
          missed_blocks_counter?: string
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/slashing/v1beta1/signing_infos/${consAddress}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name DelegatorDelegations
   * @summary DelegatorDelegations queries all delegations of a given delegator address.
   * @request GET:/cosmos/staking/v1beta1/delegations/{delegator_addr}
   */
  delegatorDelegations = (
    delegatorAddr: string,
    query?: {
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        delegation_responses?: {
          delegation?: {
            delegator_address?: string
            validator_address?: string
            shares?: string
          }
          balance?: { denom?: string; amount?: string }
        }[]
        pagination?: { next_key?: string; total?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/staking/v1beta1/delegations/${delegatorAddr}`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name Redelegations
   * @summary Redelegations queries redelegations of given address.
   * @request GET:/cosmos/staking/v1beta1/delegators/{delegator_addr}/redelegations
   */
  redelegations = (
    delegatorAddr: string,
    query?: {
      src_validator_addr?: string
      dst_validator_addr?: string
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        redelegation_responses?: {
          redelegation?: {
            delegator_address?: string
            validator_src_address?: string
            validator_dst_address?: string
            entries?: {
              creation_height?: string
              completion_time?: string
              initial_balance?: string
              shares_dst?: string
            }[]
          }
          entries?: {
            redelegation_entry?: {
              creation_height?: string
              completion_time?: string
              initial_balance?: string
              shares_dst?: string
            }
            balance?: string
          }[]
        }[]
        pagination?: { next_key?: string; total?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/staking/v1beta1/delegators/${delegatorAddr}/redelegations`,
      method: 'GET',
      query: query,
      ...params,
    }) /**
 * No description
 * 
 * @tags Query
 * @name DelegatorUnbondingDelegations
 * @summary DelegatorUnbondingDelegations queries all unbonding delegations of a given
delegator address.
 * @request GET:/cosmos/staking/v1beta1/delegators/{delegator_addr}/unbonding_delegations
 */
  delegatorUnbondingDelegations = (
    delegatorAddr: string,
    query?: {
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        unbonding_responses?: {
          delegator_address?: string
          validator_address?: string
          entries?: {
            creation_height?: string
            completion_time?: string
            initial_balance?: string
            balance?: string
          }[]
        }[]
        pagination?: { next_key?: string; total?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/staking/v1beta1/delegators/${delegatorAddr}/unbonding_delegations`,
      method: 'GET',
      query: query,
      ...params,
    }) /**
 * No description
 * 
 * @tags Query
 * @name DelegatorValidators
 * @summary DelegatorValidators queries all validators info for given delegator
address.
 * @request GET:/cosmos/staking/v1beta1/delegators/{delegator_addr}/validators
 */
  delegatorValidators = (
    delegatorAddr: string,
    query?: {
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        validators?: {
          operator_address?: string
          consensus_pubkey?: { type_url?: string; value?: string }
          jailed?: boolean
          status?:
            | 'BOND_STATUS_UNSPECIFIED'
            | 'BOND_STATUS_UNBONDED'
            | 'BOND_STATUS_UNBONDING'
            | 'BOND_STATUS_BONDED'
          tokens?: string
          delegator_shares?: string
          description?: {
            moniker?: string
            identity?: string
            website?: string
            security_contact?: string
            details?: string
          }
          unbonding_height?: string
          unbonding_time?: string
          commission?: {
            commission_rates?: {
              rate?: string
              max_rate?: string
              max_change_rate?: string
            }
            update_time?: string
          }
          min_self_delegation?: string
        }[]
        pagination?: { next_key?: string; total?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/staking/v1beta1/delegators/${delegatorAddr}/validators`,
      method: 'GET',
      query: query,
      ...params,
    }) /**
 * No description
 * 
 * @tags Query
 * @name DelegatorValidator
 * @summary DelegatorValidator queries validator info for given delegator validator
pair.
 * @request GET:/cosmos/staking/v1beta1/delegators/{delegator_addr}/validators/{validator_addr}
 */
  delegatorValidator = (
    delegatorAddr: string,
    validatorAddr: string,
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        validator?: {
          operator_address?: string
          consensus_pubkey?: { type_url?: string; value?: string }
          jailed?: boolean
          status?:
            | 'BOND_STATUS_UNSPECIFIED'
            | 'BOND_STATUS_UNBONDED'
            | 'BOND_STATUS_UNBONDING'
            | 'BOND_STATUS_BONDED'
          tokens?: string
          delegator_shares?: string
          description?: {
            moniker?: string
            identity?: string
            website?: string
            security_contact?: string
            details?: string
          }
          unbonding_height?: string
          unbonding_time?: string
          commission?: {
            commission_rates?: {
              rate?: string
              max_rate?: string
              max_change_rate?: string
            }
            update_time?: string
          }
          min_self_delegation?: string
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/staking/v1beta1/delegators/${delegatorAddr}/validators/${validatorAddr}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name HistoricalInfo
   * @summary HistoricalInfo queries the historical info for given height.
   * @request GET:/cosmos/staking/v1beta1/historical_info/{height}
   */
  historicalInfo = (height: string, params: RequestParams = {}) =>
    this.http.request<
      {
        hist?: {
          header?: {
            version?: { block?: string; app?: string }
            chain_id?: string
            height?: string
            time?: string
            last_block_id?: {
              hash?: string
              part_set_header?: { total?: number; hash?: string }
            }
            last_commit_hash?: string
            data_hash?: string
            validators_hash?: string
            next_validators_hash?: string
            consensus_hash?: string
            app_hash?: string
            last_results_hash?: string
            evidence_hash?: string
            proposer_address?: string
          }
          valset?: {
            operator_address?: string
            consensus_pubkey?: { type_url?: string; value?: string }
            jailed?: boolean
            status?:
              | 'BOND_STATUS_UNSPECIFIED'
              | 'BOND_STATUS_UNBONDED'
              | 'BOND_STATUS_UNBONDING'
              | 'BOND_STATUS_BONDED'
            tokens?: string
            delegator_shares?: string
            description?: {
              moniker?: string
              identity?: string
              website?: string
              security_contact?: string
              details?: string
            }
            unbonding_height?: string
            unbonding_time?: string
            commission?: {
              commission_rates?: {
                rate?: string
                max_rate?: string
                max_change_rate?: string
              }
              update_time?: string
            }
            min_self_delegation?: string
          }[]
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/staking/v1beta1/historical_info/${height}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name StakingParams
   * @summary Parameters queries the staking parameters.
   * @request GET:/cosmos/staking/v1beta1/params
   */
  stakingParams = (params: RequestParams = {}) =>
    this.http.request<
      {
        params?: {
          unbonding_time?: string
          max_validators?: number
          max_entries?: number
          historical_entries?: number
          bond_denom?: string
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/staking/v1beta1/params`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name Pool
   * @summary Pool queries the pool info.
   * @request GET:/cosmos/staking/v1beta1/pool
   */
  pool = (params: RequestParams = {}) =>
    this.http.request<
      { pool?: { not_bonded_tokens?: string; bonded_tokens?: string } },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/staking/v1beta1/pool`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name Validators
   * @summary Validators queries all validators that match the given status.
   * @request GET:/cosmos/staking/v1beta1/validators
   */
  validators = (
    query?: {
      status?: string
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        validators?: {
          operator_address?: string
          consensus_pubkey?: { type_url?: string; value?: string }
          jailed?: boolean
          status?:
            | 'BOND_STATUS_UNSPECIFIED'
            | 'BOND_STATUS_UNBONDED'
            | 'BOND_STATUS_UNBONDING'
            | 'BOND_STATUS_BONDED'
          tokens?: string
          delegator_shares?: string
          description?: {
            moniker?: string
            identity?: string
            website?: string
            security_contact?: string
            details?: string
          }
          unbonding_height?: string
          unbonding_time?: string
          commission?: {
            commission_rates?: {
              rate?: string
              max_rate?: string
              max_change_rate?: string
            }
            update_time?: string
          }
          min_self_delegation?: string
        }[]
        pagination?: { next_key?: string; total?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/staking/v1beta1/validators`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name Validator
   * @summary Validator queries validator info for given validator address.
   * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}
   */
  validator = (validatorAddr: string, params: RequestParams = {}) =>
    this.http.request<
      {
        validator?: {
          operator_address?: string
          consensus_pubkey?: { type_url?: string; value?: string }
          jailed?: boolean
          status?:
            | 'BOND_STATUS_UNSPECIFIED'
            | 'BOND_STATUS_UNBONDED'
            | 'BOND_STATUS_UNBONDING'
            | 'BOND_STATUS_BONDED'
          tokens?: string
          delegator_shares?: string
          description?: {
            moniker?: string
            identity?: string
            website?: string
            security_contact?: string
            details?: string
          }
          unbonding_height?: string
          unbonding_time?: string
          commission?: {
            commission_rates?: {
              rate?: string
              max_rate?: string
              max_change_rate?: string
            }
            update_time?: string
          }
          min_self_delegation?: string
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/staking/v1beta1/validators/${validatorAddr}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name ValidatorDelegations
   * @summary ValidatorDelegations queries delegate info for given validator.
   * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}/delegations
   */
  validatorDelegations = (
    validatorAddr: string,
    query?: {
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        delegation_responses?: {
          delegation?: {
            delegator_address?: string
            validator_address?: string
            shares?: string
          }
          balance?: { denom?: string; amount?: string }
        }[]
        pagination?: { next_key?: string; total?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/staking/v1beta1/validators/${validatorAddr}/delegations`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name Delegation
   * @summary Delegation queries delegate info for given validator delegator pair.
   * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}/delegations/{delegator_addr}
   */
  delegation = (
    validatorAddr: string,
    delegatorAddr: string,
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        delegation_response?: {
          delegation?: {
            delegator_address?: string
            validator_address?: string
            shares?: string
          }
          balance?: { denom?: string; amount?: string }
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/staking/v1beta1/validators/${validatorAddr}/delegations/${delegatorAddr}`,
      method: 'GET',
      ...params,
    }) /**
 * No description
 * 
 * @tags Query
 * @name UnbondingDelegation
 * @summary UnbondingDelegation queries unbonding info for given validator delegator
pair.
 * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}/delegations/{delegator_addr}/unbonding_delegation
 */
  unbondingDelegation = (
    validatorAddr: string,
    delegatorAddr: string,
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        unbond?: {
          delegator_address?: string
          validator_address?: string
          entries?: {
            creation_height?: string
            completion_time?: string
            initial_balance?: string
            balance?: string
          }[]
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/staking/v1beta1/validators/${validatorAddr}/delegations/${delegatorAddr}/unbonding_delegation`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name ValidatorUnbondingDelegations
   * @summary ValidatorUnbondingDelegations queries unbonding delegations of a validator.
   * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}/unbonding_delegations
   */
  validatorUnbondingDelegations = (
    validatorAddr: string,
    query?: {
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        unbonding_responses?: {
          delegator_address?: string
          validator_address?: string
          entries?: {
            creation_height?: string
            completion_time?: string
            initial_balance?: string
            balance?: string
          }[]
        }[]
        pagination?: { next_key?: string; total?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/staking/v1beta1/validators/${validatorAddr}/unbonding_delegations`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Service
   * @name Simulate
   * @summary Simulate simulates executing a transaction for estimating gas usage.
   * @request POST:/cosmos/tx/v1beta1/simulate
   */
  simulate = (
    body: CosmosTxV1Beta1SimulateRequest,
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        gas_info?: { gas_wanted?: string; gas_used?: string }
        result?: {
          data?: string
          log?: string
          events?: {
            type?: string
            attributes?: { key?: string; value?: string; index?: boolean }[]
          }[]
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/tx/v1beta1/simulate`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags Service
   * @name GetTxsEvent
   * @summary GetTxsEvent fetches txs by event.
   * @request GET:/cosmos/tx/v1beta1/txs
   */
  getTxsEvent = (
    query?: {
      events?: string[]
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
      order_by?: 'ORDER_BY_UNSPECIFIED' | 'ORDER_BY_ASC' | 'ORDER_BY_DESC'
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      CosmosTxV1Beta1GetTxsEventResponse,
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/tx/v1beta1/txs`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Service
   * @name BroadcastTx
   * @summary BroadcastTx broadcast transaction.
   * @request POST:/cosmos/tx/v1beta1/txs
   */
  broadcastTx = (
    body: {
      tx_bytes?: string
      mode?:
        | 'BROADCAST_MODE_UNSPECIFIED'
        | 'BROADCAST_MODE_BLOCK'
        | 'BROADCAST_MODE_SYNC'
        | 'BROADCAST_MODE_ASYNC'
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        tx_response?: {
          height?: string
          txhash?: string
          codespace?: string
          code?: number
          data?: string
          raw_log?: string
          logs?: {
            msg_index?: number
            log?: string
            events?: {
              type?: string
              attributes?: { key?: string; value?: string }[]
            }[]
          }[]
          info?: string
          gas_wanted?: string
          gas_used?: string
          tx?: { type_url?: string; value?: string }
          timestamp?: string
          events?: {
            type?: string
            attributes?: { key?: string; value?: string; index?: boolean }[]
          }[]
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/tx/v1beta1/txs`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      ...params,
    })
  /**
   * @description Since: cosmos-sdk 0.45.2
   *
   * @tags Service
   * @name GetBlockWithTxs
   * @summary GetBlockWithTxs fetches a block with decoded txs.
   * @request GET:/cosmos/tx/v1beta1/txs/block/{height}
   */
  getBlockWithTxs = (
    height: string,
    query?: {
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      CosmosTxV1Beta1GetBlockWithTxsResponse,
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/tx/v1beta1/txs/block/${height}`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Service
   * @name GetTx
   * @summary GetTx fetches a tx by hash.
   * @request GET:/cosmos/tx/v1beta1/txs/{hash}
   */
  getTx = (hash: string, params: RequestParams = {}) =>
    this.http.request<
      CosmosTxV1Beta1GetTxResponse,
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/tx/v1beta1/txs/${hash}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Service
   * @name GetLatestBlock
   * @summary GetLatestBlock returns the latest block.
   * @request GET:/cosmos/base/tendermint/v1beta1/blocks/latest
   */
  getLatestBlock = (params: RequestParams = {}) =>
    this.http.request<
      {
        block_id?: {
          hash?: string
          part_set_header?: { total?: number; hash?: string }
        }
        block?: {
          header?: {
            version?: { block?: string; app?: string }
            chain_id?: string
            height?: string
            time?: string
            last_block_id?: {
              hash?: string
              part_set_header?: { total?: number; hash?: string }
            }
            last_commit_hash?: string
            data_hash?: string
            validators_hash?: string
            next_validators_hash?: string
            consensus_hash?: string
            app_hash?: string
            last_results_hash?: string
            evidence_hash?: string
            proposer_address?: string
          }
          data?: { txs?: string[] }
          evidence?: {
            evidence?: {
              duplicate_vote_evidence?: {
                vote_a?: {
                  type?:
                    | 'SIGNED_MSG_TYPE_UNKNOWN'
                    | 'SIGNED_MSG_TYPE_PREVOTE'
                    | 'SIGNED_MSG_TYPE_PRECOMMIT'
                    | 'SIGNED_MSG_TYPE_PROPOSAL'
                  height?: string
                  round?: number
                  block_id?: {
                    hash?: string
                    part_set_header?: { total?: number; hash?: string }
                  }
                  timestamp?: string
                  validator_address?: string
                  validator_index?: number
                  signature?: string
                }
                vote_b?: {
                  type?:
                    | 'SIGNED_MSG_TYPE_UNKNOWN'
                    | 'SIGNED_MSG_TYPE_PREVOTE'
                    | 'SIGNED_MSG_TYPE_PRECOMMIT'
                    | 'SIGNED_MSG_TYPE_PROPOSAL'
                  height?: string
                  round?: number
                  block_id?: {
                    hash?: string
                    part_set_header?: { total?: number; hash?: string }
                  }
                  timestamp?: string
                  validator_address?: string
                  validator_index?: number
                  signature?: string
                }
                total_voting_power?: string
                validator_power?: string
                timestamp?: string
              }
              light_client_attack_evidence?: {
                conflicting_block?: {
                  signed_header?: {
                    header?: {
                      version?: { block?: string; app?: string }
                      chain_id?: string
                      height?: string
                      time?: string
                      last_block_id?: {
                        hash?: string
                        part_set_header?: { total?: number; hash?: string }
                      }
                      last_commit_hash?: string
                      data_hash?: string
                      validators_hash?: string
                      next_validators_hash?: string
                      consensus_hash?: string
                      app_hash?: string
                      last_results_hash?: string
                      evidence_hash?: string
                      proposer_address?: string
                    }
                    commit?: {
                      height?: string
                      round?: number
                      block_id?: {
                        hash?: string
                        part_set_header?: { total?: number; hash?: string }
                      }
                      signatures?: {
                        block_id_flag?:
                          | 'BLOCK_ID_FLAG_UNKNOWN'
                          | 'BLOCK_ID_FLAG_ABSENT'
                          | 'BLOCK_ID_FLAG_COMMIT'
                          | 'BLOCK_ID_FLAG_NIL'
                        validator_address?: string
                        timestamp?: string
                        signature?: string
                      }[]
                    }
                  }
                  validator_set?: {
                    validators?: {
                      address?: string
                      pub_key?: { ed25519?: string; secp256k1?: string }
                      voting_power?: string
                      proposer_priority?: string
                    }[]
                    proposer?: {
                      address?: string
                      pub_key?: { ed25519?: string; secp256k1?: string }
                      voting_power?: string
                      proposer_priority?: string
                    }
                    total_voting_power?: string
                  }
                }
                common_height?: string
                byzantine_validators?: {
                  address?: string
                  pub_key?: { ed25519?: string; secp256k1?: string }
                  voting_power?: string
                  proposer_priority?: string
                }[]
                total_voting_power?: string
                timestamp?: string
              }
            }[]
          }
          last_commit?: {
            height?: string
            round?: number
            block_id?: {
              hash?: string
              part_set_header?: { total?: number; hash?: string }
            }
            signatures?: {
              block_id_flag?:
                | 'BLOCK_ID_FLAG_UNKNOWN'
                | 'BLOCK_ID_FLAG_ABSENT'
                | 'BLOCK_ID_FLAG_COMMIT'
                | 'BLOCK_ID_FLAG_NIL'
              validator_address?: string
              timestamp?: string
              signature?: string
            }[]
          }
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/base/tendermint/v1beta1/blocks/latest`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Service
   * @name GetBlockByHeight
   * @summary GetBlockByHeight queries block for given height.
   * @request GET:/cosmos/base/tendermint/v1beta1/blocks/{height}
   */
  getBlockByHeight = (height: string, params: RequestParams = {}) =>
    this.http.request<
      {
        block_id?: {
          hash?: string
          part_set_header?: { total?: number; hash?: string }
        }
        block?: {
          header?: {
            version?: { block?: string; app?: string }
            chain_id?: string
            height?: string
            time?: string
            last_block_id?: {
              hash?: string
              part_set_header?: { total?: number; hash?: string }
            }
            last_commit_hash?: string
            data_hash?: string
            validators_hash?: string
            next_validators_hash?: string
            consensus_hash?: string
            app_hash?: string
            last_results_hash?: string
            evidence_hash?: string
            proposer_address?: string
          }
          data?: { txs?: string[] }
          evidence?: {
            evidence?: {
              duplicate_vote_evidence?: {
                vote_a?: {
                  type?:
                    | 'SIGNED_MSG_TYPE_UNKNOWN'
                    | 'SIGNED_MSG_TYPE_PREVOTE'
                    | 'SIGNED_MSG_TYPE_PRECOMMIT'
                    | 'SIGNED_MSG_TYPE_PROPOSAL'
                  height?: string
                  round?: number
                  block_id?: {
                    hash?: string
                    part_set_header?: { total?: number; hash?: string }
                  }
                  timestamp?: string
                  validator_address?: string
                  validator_index?: number
                  signature?: string
                }
                vote_b?: {
                  type?:
                    | 'SIGNED_MSG_TYPE_UNKNOWN'
                    | 'SIGNED_MSG_TYPE_PREVOTE'
                    | 'SIGNED_MSG_TYPE_PRECOMMIT'
                    | 'SIGNED_MSG_TYPE_PROPOSAL'
                  height?: string
                  round?: number
                  block_id?: {
                    hash?: string
                    part_set_header?: { total?: number; hash?: string }
                  }
                  timestamp?: string
                  validator_address?: string
                  validator_index?: number
                  signature?: string
                }
                total_voting_power?: string
                validator_power?: string
                timestamp?: string
              }
              light_client_attack_evidence?: {
                conflicting_block?: {
                  signed_header?: {
                    header?: {
                      version?: { block?: string; app?: string }
                      chain_id?: string
                      height?: string
                      time?: string
                      last_block_id?: {
                        hash?: string
                        part_set_header?: { total?: number; hash?: string }
                      }
                      last_commit_hash?: string
                      data_hash?: string
                      validators_hash?: string
                      next_validators_hash?: string
                      consensus_hash?: string
                      app_hash?: string
                      last_results_hash?: string
                      evidence_hash?: string
                      proposer_address?: string
                    }
                    commit?: {
                      height?: string
                      round?: number
                      block_id?: {
                        hash?: string
                        part_set_header?: { total?: number; hash?: string }
                      }
                      signatures?: {
                        block_id_flag?:
                          | 'BLOCK_ID_FLAG_UNKNOWN'
                          | 'BLOCK_ID_FLAG_ABSENT'
                          | 'BLOCK_ID_FLAG_COMMIT'
                          | 'BLOCK_ID_FLAG_NIL'
                        validator_address?: string
                        timestamp?: string
                        signature?: string
                      }[]
                    }
                  }
                  validator_set?: {
                    validators?: {
                      address?: string
                      pub_key?: { ed25519?: string; secp256k1?: string }
                      voting_power?: string
                      proposer_priority?: string
                    }[]
                    proposer?: {
                      address?: string
                      pub_key?: { ed25519?: string; secp256k1?: string }
                      voting_power?: string
                      proposer_priority?: string
                    }
                    total_voting_power?: string
                  }
                }
                common_height?: string
                byzantine_validators?: {
                  address?: string
                  pub_key?: { ed25519?: string; secp256k1?: string }
                  voting_power?: string
                  proposer_priority?: string
                }[]
                total_voting_power?: string
                timestamp?: string
              }
            }[]
          }
          last_commit?: {
            height?: string
            round?: number
            block_id?: {
              hash?: string
              part_set_header?: { total?: number; hash?: string }
            }
            signatures?: {
              block_id_flag?:
                | 'BLOCK_ID_FLAG_UNKNOWN'
                | 'BLOCK_ID_FLAG_ABSENT'
                | 'BLOCK_ID_FLAG_COMMIT'
                | 'BLOCK_ID_FLAG_NIL'
              validator_address?: string
              timestamp?: string
              signature?: string
            }[]
          }
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/base/tendermint/v1beta1/blocks/${height}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Service
   * @name GetNodeInfo
   * @summary GetNodeInfo queries the current node info.
   * @request GET:/cosmos/base/tendermint/v1beta1/node_info
   */
  getNodeInfo = (params: RequestParams = {}) =>
    this.http.request<
      {
        default_node_info?: {
          protocol_version?: { p2p?: string; block?: string; app?: string }
          default_node_id?: string
          listen_addr?: string
          network?: string
          version?: string
          channels?: string
          moniker?: string
          other?: { tx_index?: string; rpc_address?: string }
        }
        application_version?: {
          name?: string
          app_name?: string
          version?: string
          git_commit?: string
          build_tags?: string
          go_version?: string
          build_deps?: { path?: string; version?: string; sum?: string }[]
          cosmos_sdk_version?: string
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/base/tendermint/v1beta1/node_info`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Service
   * @name GetSyncing
   * @summary GetSyncing queries node syncing.
   * @request GET:/cosmos/base/tendermint/v1beta1/syncing
   */
  getSyncing = (params: RequestParams = {}) =>
    this.http.request<
      { syncing?: boolean },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/base/tendermint/v1beta1/syncing`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Service
   * @name GetLatestValidatorSet
   * @summary GetLatestValidatorSet queries latest validator-set.
   * @request GET:/cosmos/base/tendermint/v1beta1/validatorsets/latest
   */
  getLatestValidatorSet = (
    query?: {
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        block_height?: string
        validators?: {
          address?: string
          pub_key?: { type_url?: string; value?: string }
          voting_power?: string
          proposer_priority?: string
        }[]
        pagination?: { next_key?: string; total?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/base/tendermint/v1beta1/validatorsets/latest`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Service
   * @name GetValidatorSetByHeight
   * @summary GetValidatorSetByHeight queries validator-set at a given height.
   * @request GET:/cosmos/base/tendermint/v1beta1/validatorsets/{height}
   */
  getValidatorSetByHeight = (
    height: string,
    query?: {
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        block_height?: string
        validators?: {
          address?: string
          pub_key?: { type_url?: string; value?: string }
          voting_power?: string
          proposer_priority?: string
        }[]
        pagination?: { next_key?: string; total?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/cosmos/base/tendermint/v1beta1/validatorsets/${height}`,
      method: 'GET',
      query: query,
      ...params,
    })
}
