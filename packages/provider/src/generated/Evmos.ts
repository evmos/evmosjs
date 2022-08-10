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

import { HttpClient, RequestParams } from './http-client'

export class Evmos<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http
  }

  /**
   * No description
   *
   * @tags Query
   * @name ClaimsRecords
   * @summary ClaimsRecords returns all claims records
   * @request GET:/evmos/claims/v1/claims_records
   */
  claimsRecords = (
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
        claims?: {
          address?: string
          initial_claimable_amount?: string
          actions_completed?: boolean[]
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
      path: `/evmos/claims/v1/claims_records`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name ClaimsRecord
   * @summary ClaimsRecord returns the claims record for a given address
   * @request GET:/evmos/claims/v1/claims_records/{address}
   */
  claimsRecord = (address: string, params: RequestParams = {}) =>
    this.http.request<
      {
        initial_claimable_amount?: string
        claims?: {
          action?:
            | 'ACTION_UNSPECIFIED'
            | 'ACTION_VOTE'
            | 'ACTION_DELEGATE'
            | 'ACTION_EVM'
            | 'ACTION_IBC_TRANSFER'
          completed?: boolean
          claimable_amount?: string
        }[]
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/evmos/claims/v1/claims_records/${address}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name ClaimsParams
   * @summary Params returns the claims module parameters
   * @request GET:/evmos/claims/v1/params
   */
  claimsParams = (params: RequestParams = {}) =>
    this.http.request<
      {
        params?: {
          enable_claims?: boolean
          airdrop_start_time?: string
          duration_until_decay?: string
          duration_of_decay?: string
          claims_denom?: string
          authorized_channels?: string[]
          evm_channels?: string[]
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/evmos/claims/v1/params`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name TotalUnclaimed
   * @summary TotalUnclaimed queries the total unclaimed tokens from the airdrop
   * @request GET:/evmos/claims/v1/total_unclaimed
   */
  totalUnclaimed = (params: RequestParams = {}) =>
    this.http.request<
      { coins?: { denom?: string; amount?: string }[] },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/evmos/claims/v1/total_unclaimed`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name CurrentEpoch
   * @summary CurrentEpoch provide current epoch of specified identifier
   * @request GET:/evmos/epochs/v1/current_epoch
   */
  currentEpoch = (
    query?: { identifier?: string },
    params: RequestParams = {},
  ) =>
    this.http.request<
      { current_epoch?: string },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/evmos/epochs/v1/current_epoch`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name EpochInfos
   * @summary EpochInfos provide running epochInfos
   * @request GET:/evmos/epochs/v1/epochs
   */
  epochInfos = (
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
        epochs?: {
          identifier?: string
          start_time?: string
          duration?: string
          current_epoch?: string
          current_epoch_start_time?: string
          epoch_counting_started?: boolean
          current_epoch_start_height?: string
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
      path: `/evmos/epochs/v1/epochs`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name Erc20Params
   * @summary Params retrieves the erc20 module params
   * @request GET:/evmos/erc20/v1/params
   */
  erc20Params = (params: RequestParams = {}) =>
    this.http.request<
      { params?: { enable_erc20?: boolean; enable_evm_hook?: boolean } },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/evmos/erc20/v1/params`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name TokenPairs
   * @summary TokenPairs retrieves registered token pairs
   * @request GET:/evmos/erc20/v1/token_pairs
   */
  tokenPairs = (
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
        token_pairs?: {
          erc20_address?: string
          denom?: string
          enabled?: boolean
          contract_owner?:
            | 'OWNER_UNSPECIFIED'
            | 'OWNER_MODULE'
            | 'OWNER_EXTERNAL'
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
      path: `/evmos/erc20/v1/token_pairs`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name TokenPair
   * @summary TokenPair retrieves a registered token pair
   * @request GET:/evmos/erc20/v1/token_pairs/{token}
   */
  tokenPair = (token: string, params: RequestParams = {}) =>
    this.http.request<
      {
        token_pair?: {
          erc20_address?: string
          denom?: string
          enabled?: boolean
          contract_owner?:
            | 'OWNER_UNSPECIFIED'
            | 'OWNER_MODULE'
            | 'OWNER_EXTERNAL'
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/evmos/erc20/v1/token_pairs/${token}`,
      method: 'GET',
      ...params,
    }) /**
 * No description
 * 
 * @tags Query
 * @name AllocationMeters
 * @summary AllocationMeters retrieves active allocation meters for a given
denomination
 * @request GET:/evmos/incentives/v1/allocation_meters
 */
  allocationMeters = (
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
        allocation_meters?: { denom?: string; amount?: string }[]
        pagination?: { next_key?: string; total?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/evmos/incentives/v1/allocation_meters`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name AllocationMeter
   * @summary AllocationMeter Retrieves a active gas meter
   * @request GET:/evmos/incentives/v1/allocation_meters/{denom}
   */
  allocationMeter = (denom: string, params: RequestParams = {}) =>
    this.http.request<
      { allocation_meter?: { denom?: string; amount?: string } },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/evmos/incentives/v1/allocation_meters/${denom}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name GasMeters
   * @summary GasMeters retrieves active gas meters for a given contract
   * @request GET:/evmos/incentives/v1/gas_meters/{contract}
   */
  gasMeters = (
    contract: string,
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
        gas_meters?: {
          contract?: string
          participant?: string
          cumulative_gas?: string
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
      path: `/evmos/incentives/v1/gas_meters/${contract}`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name GasMeter
   * @summary GasMeter Retrieves a active gas meter
   * @request GET:/evmos/incentives/v1/gas_meters/{contract}/{participant}
   */
  gasMeter = (
    contract: string,
    participant: string,
    params: RequestParams = {},
  ) =>
    this.http.request<
      { gas_meter?: string },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/evmos/incentives/v1/gas_meters/${contract}/${participant}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name Incentives
   * @summary Incentives retrieves registered incentives
   * @request GET:/evmos/incentives/v1/incentives
   */
  incentives = (
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
        incentives?: {
          contract?: string
          allocations?: { denom?: string; amount?: string }[]
          epochs?: number
          start_time?: string
          total_gas?: string
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
      path: `/evmos/incentives/v1/incentives`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name Incentive
   * @summary Incentive retrieves a registered incentive
   * @request GET:/evmos/incentives/v1/incentives/{contract}
   */
  incentive = (contract: string, params: RequestParams = {}) =>
    this.http.request<
      {
        incentive?: {
          contract?: string
          allocations?: { denom?: string; amount?: string }[]
          epochs?: number
          start_time?: string
          total_gas?: string
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/evmos/incentives/v1/incentives/${contract}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name IncentivesParams
   * @summary Params retrieves the incentives module params
   * @request GET:/evmos/incentives/v1/params
   */
  incentivesParams = (params: RequestParams = {}) =>
    this.http.request<
      {
        params?: {
          enable_incentives?: boolean
          allocation_limit?: string
          incentives_epoch_identifier?: string
          reward_scaler?: string
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/evmos/incentives/v1/params`,
      method: 'GET',
      ...params,
    }) /**
 * No description
 * 
 * @tags Query
 * @name CirculatingSupply
 * @summary CirculatingSupply retrieves the total number of tokens that are in
circulation (i.e. excluding unvested tokens).
 * @request GET:/evmos/inflation/v1/circulating_supply
 */
  circulatingSupply = (params: RequestParams = {}) =>
    this.http.request<
      { circulating_supply?: { denom?: string; amount?: string } },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/evmos/inflation/v1/circulating_supply`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name EpochMintProvision
   * @summary EpochMintProvision retrieves current minting epoch provision value.
   * @request GET:/evmos/inflation/v1/epoch_mint_provision
   */
  epochMintProvision = (params: RequestParams = {}) =>
    this.http.request<
      { epoch_mint_provision?: { denom?: string; amount?: string } },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/evmos/inflation/v1/epoch_mint_provision`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name InflationRate
   * @summary InflationRate retrieves the inflation rate of the current period.
   * @request GET:/evmos/inflation/v1/inflation_rate
   */
  inflationRate = (params: RequestParams = {}) =>
    this.http.request<
      { inflation_rate?: string },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/evmos/inflation/v1/inflation_rate`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name InflationParams
   * @summary Params retrieves the total set of minting parameters.
   * @request GET:/evmos/inflation/v1/params
   */
  inflationParams = (params: RequestParams = {}) =>
    this.http.request<
      {
        params?: {
          mint_denom?: string
          exponential_calculation?: {
            a?: string
            r?: string
            c?: string
            bonding_target?: string
            max_variance?: string
          }
          inflation_distribution?: {
            staking_rewards?: string
            usage_incentives?: string
            community_pool?: string
          }
          enable_inflation?: boolean
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/evmos/inflation/v1/params`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name Period
   * @summary Period retrieves current period.
   * @request GET:/evmos/inflation/v1/period
   */
  period = (params: RequestParams = {}) =>
    this.http.request<
      { period?: string },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/evmos/inflation/v1/period`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name SkippedEpochs
   * @summary SkippedEpochs retrieves the total number of skipped epochs.
   * @request GET:/evmos/inflation/v1/skipped_epochs
   */
  skippedEpochs = (params: RequestParams = {}) =>
    this.http.request<
      { skipped_epochs?: string },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/evmos/inflation/v1/skipped_epochs`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name Balances
   * @summary Retrieves the unvested, vested and locked tokens for a vesting account
   * @request GET:/evmos/vesting/v1/balances/{address}
   */
  balances = (address: string, params: RequestParams = {}) =>
    this.http.request<
      {
        locked?: { denom?: string; amount?: string }[]
        unvested?: { denom?: string; amount?: string }[]
        vested?: { denom?: string; amount?: string }[]
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/evmos/vesting/v1/balances/${address}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name RecoveryParams
   * @summary Params retrieves the total set of recovery parameters.
   * @request GET:/evmos/recovery/v1/params
   */
  recoveryParams = (params: RequestParams = {}) =>
    this.http.request<
      {
        params?: { enable_recovery?: boolean; packet_timeout_duration?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/evmos/recovery/v1/params`,
      method: 'GET',
      ...params,
    })
}
