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

export class Ethermint<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http
  }

  /**
   * No description
   *
   * @tags Query
   * @name Account
   * @summary Account queries an Ethereum account.
   * @request GET:/ethermint/evm/v1/account/{address}
   */
  account = (address: string, params: RequestParams = {}) =>
    this.http.request<
      { balance?: string; code_hash?: string; nonce?: string },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ethermint/evm/v1/account/${address}`,
      method: 'GET',
      ...params,
    }) /**
 * No description
 * 
 * @tags Query
 * @name Balance
 * @summary Balance queries the balance of a the EVM denomination for a single
EthAccount.
 * @request GET:/ethermint/evm/v1/balances/{address}
 */
  balance = (address: string, params: RequestParams = {}) =>
    this.http.request<
      { balance?: string },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ethermint/evm/v1/balances/${address}`,
      method: 'GET',
      ...params,
    }) /**
 * No description
 * 
 * @tags Query
 * @name BaseFee
 * @summary BaseFee queries the base fee of the parent block of the current block,
it's similar to feemarket module's method, but also checks london hardfork status.
 * @request GET:/ethermint/evm/v1/base_fee
 */
  baseFee = (params: RequestParams = {}) =>
    this.http.request<
      { base_fee?: string },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ethermint/evm/v1/base_fee`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name Code
   * @summary Code queries the balance of all coins for a single account.
   * @request GET:/ethermint/evm/v1/codes/{address}
   */
  code = (address: string, params: RequestParams = {}) =>
    this.http.request<
      { code?: string },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ethermint/evm/v1/codes/${address}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name CosmosAccount
   * @summary CosmosAccount queries an Ethereum account's Cosmos Address.
   * @request GET:/ethermint/evm/v1/cosmos_account/{address}
   */
  cosmosAccount = (address: string, params: RequestParams = {}) =>
    this.http.request<
      { cosmos_address?: string; sequence?: string; account_number?: string },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ethermint/evm/v1/cosmos_account/${address}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name EstimateGas
   * @summary EstimateGas implements the `eth_estimateGas` rpc api
   * @request GET:/ethermint/evm/v1/estimate_gas
   */
  estimateGas = (
    query?: { args?: string; gas_cap?: string },
    params: RequestParams = {},
  ) =>
    this.http.request<
      { gas?: string },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ethermint/evm/v1/estimate_gas`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name EthCall
   * @summary EthCall implements the `eth_call` rpc api
   * @request GET:/ethermint/evm/v1/eth_call
   */
  ethCall = (
    query?: { args?: string; gas_cap?: string },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        hash?: string
        logs?: {
          address?: string
          topics?: string[]
          data?: string
          block_number?: string
          tx_hash?: string
          tx_index?: string
          block_hash?: string
          index?: string
          removed?: boolean
        }[]
        ret?: string
        vm_error?: string
        gas_used?: string
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ethermint/evm/v1/eth_call`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name EvmParams
   * @summary Params queries the parameters of x/evm module.
   * @request GET:/ethermint/evm/v1/params
   */
  evmParams = (params: RequestParams = {}) =>
    this.http.request<
      {
        params?: {
          evm_denom?: string
          enable_create?: boolean
          enable_call?: boolean
          extra_eips?: string[]
          chain_config?: {
            homestead_block?: string
            dao_fork_block?: string
            dao_fork_support?: boolean
            eip150_block?: string
            eip150_hash?: string
            eip155_block?: string
            eip158_block?: string
            byzantium_block?: string
            constantinople_block?: string
            petersburg_block?: string
            istanbul_block?: string
            muir_glacier_block?: string
            berlin_block?: string
            london_block?: string
            arrow_glacier_block?: string
            merge_fork_block?: string
          }
          allow_unprotected_txs?: boolean
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ethermint/evm/v1/params`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name Storage
   * @summary Storage queries the balance of all coins for a single account.
   * @request GET:/ethermint/evm/v1/storage/{address}/{key}
   */
  storage = (address: string, key: string, params: RequestParams = {}) =>
    this.http.request<
      { value?: string },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ethermint/evm/v1/storage/${address}/${key}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name TraceBlock
   * @summary TraceBlock implements the `debug_traceBlockByNumber` and `debug_traceBlockByHash` rpc api
   * @request GET:/ethermint/evm/v1/trace_block
   */
  traceBlock = (
    query?: {
      'trace_config.tracer'?: string
      'trace_config.timeout'?: string
      'trace_config.reexec'?: string
      'trace_config.disable_stack'?: boolean
      'trace_config.disable_storage'?: boolean
      'trace_config.debug'?: boolean
      'trace_config.limit'?: number
      'trace_config.overrides.homestead_block'?: string
      'trace_config.overrides.dao_fork_block'?: string
      'trace_config.overrides.dao_fork_support'?: boolean
      'trace_config.overrides.eip150_block'?: string
      'trace_config.overrides.eip150_hash'?: string
      'trace_config.overrides.eip155_block'?: string
      'trace_config.overrides.eip158_block'?: string
      'trace_config.overrides.byzantium_block'?: string
      'trace_config.overrides.constantinople_block'?: string
      'trace_config.overrides.petersburg_block'?: string
      'trace_config.overrides.istanbul_block'?: string
      'trace_config.overrides.muir_glacier_block'?: string
      'trace_config.overrides.berlin_block'?: string
      'trace_config.overrides.london_block'?: string
      'trace_config.overrides.arrow_glacier_block'?: string
      'trace_config.overrides.merge_fork_block'?: string
      'trace_config.enable_memory'?: boolean
      'trace_config.enable_return_data'?: boolean
      block_number?: string
      block_hash?: string
      block_time?: string
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      { data?: string },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ethermint/evm/v1/trace_block`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name TraceTx
   * @summary TraceTx implements the `debug_traceTransaction` rpc api
   * @request GET:/ethermint/evm/v1/trace_tx
   */
  traceTx = (
    query?: {
      'msg.data.type_url'?: string
      'msg.data.value'?: string
      'msg.size'?: number
      'msg.hash'?: string
      'msg.from'?: string
      'trace_config.tracer'?: string
      'trace_config.timeout'?: string
      'trace_config.reexec'?: string
      'trace_config.disable_stack'?: boolean
      'trace_config.disable_storage'?: boolean
      'trace_config.debug'?: boolean
      'trace_config.limit'?: number
      'trace_config.overrides.homestead_block'?: string
      'trace_config.overrides.dao_fork_block'?: string
      'trace_config.overrides.dao_fork_support'?: boolean
      'trace_config.overrides.eip150_block'?: string
      'trace_config.overrides.eip150_hash'?: string
      'trace_config.overrides.eip155_block'?: string
      'trace_config.overrides.eip158_block'?: string
      'trace_config.overrides.byzantium_block'?: string
      'trace_config.overrides.constantinople_block'?: string
      'trace_config.overrides.petersburg_block'?: string
      'trace_config.overrides.istanbul_block'?: string
      'trace_config.overrides.muir_glacier_block'?: string
      'trace_config.overrides.berlin_block'?: string
      'trace_config.overrides.london_block'?: string
      'trace_config.overrides.arrow_glacier_block'?: string
      'trace_config.overrides.merge_fork_block'?: string
      'trace_config.enable_memory'?: boolean
      'trace_config.enable_return_data'?: boolean
      block_number?: string
      block_hash?: string
      block_time?: string
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      { data?: string },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ethermint/evm/v1/trace_tx`,
      method: 'GET',
      query: query,
      ...params,
    }) /**
 * No description
 * 
 * @tags Query
 * @name ValidatorAccount
 * @summary ValidatorAccount queries an Ethereum account's from a validator consensus
Address.
 * @request GET:/ethermint/evm/v1/validator_account/{cons_address}
 */
  validatorAccount = (consAddress: string, params: RequestParams = {}) =>
    this.http.request<
      { account_address?: string; sequence?: string; account_number?: string },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ethermint/evm/v1/validator_account/${consAddress}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name FeeMarketBaseFee
   * @summary BaseFee queries the base fee of the parent block of the current block.
   * @request GET:/ethermint/feemarket/v1/base_fee
   */
  feeMarketBaseFee = (params: RequestParams = {}) =>
    this.http.request<
      { base_fee?: string },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ethermint/feemarket/v1/base_fee`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name BlockGas
   * @summary BlockGas queries the gas used at a given block height
   * @request GET:/ethermint/feemarket/v1/block_gas
   */
  blockGas = (params: RequestParams = {}) =>
    this.http.request<
      { gas?: string },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ethermint/feemarket/v1/block_gas`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name FeeMarketParams
   * @summary Params queries the parameters of x/feemarket module.
   * @request GET:/ethermint/feemarket/v1/params
   */
  feeMarketParams = (params: RequestParams = {}) =>
    this.http.request<
      {
        params?: {
          no_base_fee?: boolean
          base_fee_change_denominator?: number
          elasticity_multiplier?: number
          enable_height?: string
          base_fee?: string
          min_gas_price?: string
          min_gas_multiplier?: string
        }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ethermint/feemarket/v1/params`,
      method: 'GET',
      ...params,
    })
}
