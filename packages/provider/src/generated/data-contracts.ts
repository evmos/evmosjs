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

/**
* message SomeRequest {
         Foo some_parameter = 1;
         PageRequest pagination = 2;
 }
*/
export interface CosmosBaseQueryV1Beta1PageRequest {
  /**
   * key is a value returned in PageResponse.next_key to begin
   * querying the next page most efficiently. Only one of offset or key
   * should be set.
   * @format byte
   */
  key?: string

  /**
   * offset is a numeric offset that can be used when key is unavailable.
   * It is less efficient than using key. Only one of offset or key should
   * be set.
   * @format uint64
   */
  offset?: string

  /**
   * limit is the total number of results to be returned in the result page.
   * If left empty it will default to a value to be set by each app.
   * @format uint64
   */
  limit?: string

  /**
   * count_total is set to true  to indicate that the result set should include
   * a count of the total number of items available for pagination in UIs.
   * count_total is only respected when offset is used. It is ignored when key
   * is set.
   */
  count_total?: boolean

  /**
   * reverse is set to true if results are to be returned in the descending order.
   *
   * Since: cosmos-sdk 0.43
   */
  reverse?: boolean
}

/**
* PageResponse is to be embedded in gRPC response messages where the
corresponding request message has used PageRequest.

 message SomeResponse {
         repeated Bar results = 1;
         PageResponse page = 2;
 }
*/
export interface CosmosBaseQueryV1Beta1PageResponse {
  /**
   * next_key is the key to be passed to PageRequest.key to
   * query the next page most efficiently
   * @format byte
   */
  next_key?: string

  /**
   * total is total number of results available if PageRequest.count_total
   * was set, its value is undefined otherwise
   * @format uint64
   */
  total?: string
}

/**
* Coin defines a token with a denomination and an amount.

NOTE: The amount field is an Int which implements the custom method
signatures required by gogoproto.
*/
export interface CosmosBaseV1Beta1Coin {
  denom?: string
  amount?: string
}

/**
* Action defines the list of available actions to claim the airdrop tokens.

 - ACTION_UNSPECIFIED: UNSPECIFIED defines an invalid action.
 - ACTION_VOTE: VOTE defines a proposal vote.
 - ACTION_DELEGATE: DELEGATE defines an staking delegation.
 - ACTION_EVM: EVM defines an EVM transaction.
 - ACTION_IBC_TRANSFER: IBC Transfer defines a fungible token transfer transaction via IBC.
*/
export enum EvmosClaimsV1Action {
  ACTION_UNSPECIFIED = 'ACTION_UNSPECIFIED',
  ACTION_VOTE = 'ACTION_VOTE',
  ACTION_DELEGATE = 'ACTION_DELEGATE',
  ACTION_EVM = 'ACTION_EVM',
  ACTION_IBC_TRANSFER = 'ACTION_IBC_TRANSFER',
}

/**
* Claim defines the action, completed flag and the remaining claimable amount
for a given user. This is only used during client queries.
*/
export interface EvmosClaimsV1Claim {
  /**
   * action enum
   * Action defines the list of available actions to claim the airdrop tokens.
   *  - ACTION_UNSPECIFIED: UNSPECIFIED defines an invalid action.
   *  - ACTION_VOTE: VOTE defines a proposal vote.
   *  - ACTION_DELEGATE: DELEGATE defines an staking delegation.
   *  - ACTION_EVM: EVM defines an EVM transaction.
   *  - ACTION_IBC_TRANSFER: IBC Transfer defines a fungible token transfer transaction via IBC.
   */
  action?:
    | 'ACTION_UNSPECIFIED'
    | 'ACTION_VOTE'
    | 'ACTION_DELEGATE'
    | 'ACTION_EVM'
    | 'ACTION_IBC_TRANSFER'

  /** true if the action has been completed */
  completed?: boolean

  /** claimable token amount for the action. Zero if completed */
  claimable_amount?: string
}

/**
* ClaimsRecordAddress is the claims metadata per address that is used at
Genesis.
*/
export interface EvmosClaimsV1ClaimsRecordAddress {
  /** bech32 or hex address of claim user */
  address?: string

  /** total initial claimable amount for the user */
  initial_claimable_amount?: string

  /** slice of the available actions completed */
  actions_completed?: boolean[]
}

/**
 * Params defines the claims module's parameters.
 */
export interface EvmosClaimsV1Params {
  /** enable claiming process */
  enable_claims?: boolean

  /**
   * timestamp of the airdrop start
   * @format date-time
   */
  airdrop_start_time?: string

  /** duration until decay of claimable tokens begin */
  duration_until_decay?: string

  /** duration of the token claim decay period */
  duration_of_decay?: string

  /** denom of claimable coin */
  claims_denom?: string

  /**
   * list of authorized channel identifiers that can perform address
   * attestations via IBC.
   */
  authorized_channels?: string[]

  /** list of channel identifiers from EVM compatible chains */
  evm_channels?: string[]
}

/**
* QueryClaimsRecordResponse is the response type for the Query/ClaimsRecord RPC
method.
*/
export interface EvmosClaimsV1QueryClaimsRecordResponse {
  /** total initial claimable amount for the user */
  initial_claimable_amount?: string

  /** the claims of the user */
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
}

/**
* QueryClaimsRecordsResponse is the response type for the Query/ClaimsRecords
RPC method.
*/
export interface EvmosClaimsV1QueryClaimsRecordsResponse {
  /** claims defines all claims records */
  claims?: {
    address?: string
    initial_claimable_amount?: string
    actions_completed?: boolean[]
  }[]

  /** pagination defines the pagination in the response. */
  pagination?: { next_key?: string; total?: string }
}

/**
 * QueryParamsResponse is the response type for the Query/Params RPC method.
 */
export interface EvmosClaimsV1QueryParamsResponse {
  /** params defines the parameters of the module. */
  params?: {
    enable_claims?: boolean
    airdrop_start_time?: string
    duration_until_decay?: string
    duration_of_decay?: string
    claims_denom?: string
    authorized_channels?: string[]
    evm_channels?: string[]
  }
}

/**
* QueryTotalUnclaimedResponse is the response type for the Query/TotalUnclaimed
RPC method.
*/
export interface EvmosClaimsV1QueryTotalUnclaimedResponse {
  /** coins defines the unclaimed coins */
  coins?: { denom?: string; amount?: string }[]
}

/**
* `Any` contains an arbitrary serialized protocol buffer message along with a
URL that describes the type of the serialized message.

Protobuf library provides support to pack/unpack Any values in the form
of utility functions or additional generated methods of the Any type.

Example 1: Pack and unpack a message in C++.
    Foo foo = ...;
    Any any;
    any.PackFrom(foo);
    ...
    if (any.UnpackTo(&foo)) {
      ...
    }

Example 2: Pack and unpack a message in Java.
    Foo foo = ...;
    Any any = Any.pack(foo);
    ...
    if (any.is(Foo.class)) {
      foo = any.unpack(Foo.class);
    }

 Example 3: Pack and unpack a message in Python.

    foo = Foo(...)
    any = Any()
    any.Pack(foo)
    ...
    if any.Is(Foo.DESCRIPTOR):
      any.Unpack(foo)
      ...

 Example 4: Pack and unpack a message in Go

     foo := &pb.Foo{...}
     any, err := ptypes.MarshalAny(foo)
     ...
     foo := &pb.Foo{}
     if err := ptypes.UnmarshalAny(any, foo); err != nil {
       ...
     }

The pack methods provided by protobuf library will by default use
'type.googleapis.com/full.type.name' as the type URL and the unpack
methods only use the fully qualified type name after the last '/'
in the type URL, for example "foo.bar.com/x/y.z" will yield type
name "y.z".


JSON
====
The JSON representation of an `Any` value uses the regular
representation of the deserialized, embedded message, with an
additional field `@type` which contains the type URL. Example:
    package google.profile;
    message Person {
      string first_name = 1;
      string last_name = 2;
    }

    {
      "@type": "type.googleapis.com/google.profile.Person",
      "firstName": <string>,
      "lastName": <string>
    }

If the embedded message type is well-known and has a custom JSON
representation, that representation will be embedded adding a field
`value` which holds the custom JSON in addition to the `@type`
field. Example (for message [google.protobuf.Duration][]):
    {
      "@type": "type.googleapis.com/google.protobuf.Duration",
      "value": "1.212s"
    }
*/
export interface GoogleProtobufAny {
  /**
   * A URL/resource name that uniquely identifies the type of the serialized
   * protocol buffer message. This string must contain at least
   * one "/" character. The last segment of the URL's path must represent
   * the fully qualified name of the type (as in
   * `path/google.protobuf.Duration`). The name should be in a canonical form
   * (e.g., leading "." is not accepted).
   *
   * In practice, teams usually precompile into the binary all types that they
   * expect it to use in the context of Any. However, for URLs which use the
   * scheme `http`, `https`, or no scheme, one can optionally set up a type
   * server that maps type URLs to message definitions as follows:
   * * If no scheme is provided, `https` is assumed.
   * * An HTTP GET on the URL must yield a [google.protobuf.Type][]  value in binary format, or produce an error.
   * * Applications are allowed to cache lookup results based on the  URL, or have them precompiled into a binary to avoid any
   *   lookup. Therefore, binary compatibility needs to be preserved
   *   on changes to types. (Use versioned type names to manage
   *   breaking changes.)
   * Note: this functionality is not currently available in the official
   * protobuf release, and it is not used for type URLs beginning with
   * type.googleapis.com.
   * Schemes other than `http`, `https` (or the empty scheme) might be
   * used with implementation specific semantics.
   */
  type_url?: string

  /**
   * Must be a valid serialized protocol buffer of the above specified type.
   * @format byte
   */
  value?: string
}

export interface GrpcGatewayRuntimeError {
  error?: string

  /** @format int32 */
  code?: number
  message?: string
  details?: { type_url?: string; value?: string }[]
}

export interface EvmosEpochsV1EpochInfo {
  identifier?: string

  /** @format date-time */
  start_time?: string
  duration?: string

  /** @format int64 */
  current_epoch?: string

  /** @format date-time */
  current_epoch_start_time?: string
  epoch_counting_started?: boolean

  /** @format int64 */
  current_epoch_start_height?: string
}

export interface EvmosEpochsV1QueryCurrentEpochResponse {
  /** @format int64 */
  current_epoch?: string
}

export interface EvmosEpochsV1QueryEpochsInfoResponse {
  epochs?: {
    identifier?: string
    start_time?: string
    duration?: string
    current_epoch?: string
    current_epoch_start_time?: string
    epoch_counting_started?: boolean
    current_epoch_start_height?: string
  }[]

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: { next_key?: string; total?: string }
}

/**
* Owner enumerates the ownership of a ERC20 contract.

 - OWNER_UNSPECIFIED: OWNER_UNSPECIFIED defines an invalid/undefined owner.
 - OWNER_MODULE: OWNER_MODULE erc20 is owned by the erc20 module account.
 - OWNER_EXTERNAL: EXTERNAL erc20 is owned by an external account.
*/
export enum EvmosErc20V1Owner {
  OWNER_UNSPECIFIED = 'OWNER_UNSPECIFIED',
  OWNER_MODULE = 'OWNER_MODULE',
  OWNER_EXTERNAL = 'OWNER_EXTERNAL',
}

export interface EvmosErc20V1Params {
  /** parameter to enable the conversion of Cosmos coins <--> ERC20 tokens. */
  enable_erc20?: boolean

  /**
   * parameter to enable the EVM hook that converts an ERC20 token to a Cosmos
   * Coin by transferring the Tokens through a MsgEthereumTx to the
   * ModuleAddress Ethereum address.
   */
  enable_evm_hook?: boolean
}

/**
* QueryParamsResponse is the response type for the Query/Params RPC
method.
*/
export interface EvmosErc20V1QueryParamsResponse {
  /** Params defines the erc20 module params */
  params?: { enable_erc20?: boolean; enable_evm_hook?: boolean }
}

/**
* QueryTokenPairResponse is the response type for the Query/TokenPair RPC
method.
*/
export interface EvmosErc20V1QueryTokenPairResponse {
  /** TokenPair defines an instance that records a pairing consisting of a native Cosmos Coin and an ERC20 token address. */
  token_pair?: {
    erc20_address?: string
    denom?: string
    enabled?: boolean
    contract_owner?: 'OWNER_UNSPECIFIED' | 'OWNER_MODULE' | 'OWNER_EXTERNAL'
  }
}

/**
* QueryTokenPairsResponse is the response type for the Query/TokenPairs RPC
method.
*/
export interface EvmosErc20V1QueryTokenPairsResponse {
  token_pairs?: {
    erc20_address?: string
    denom?: string
    enabled?: boolean
    contract_owner?: 'OWNER_UNSPECIFIED' | 'OWNER_MODULE' | 'OWNER_EXTERNAL'
  }[]

  /** pagination defines the pagination in the response. */
  pagination?: { next_key?: string; total?: string }
}

/**
 * TokenPair defines an instance that records a pairing consisting of a native Cosmos Coin and an ERC20 token address.
 */
export interface EvmosErc20V1TokenPair {
  /** address of ERC20 contract token */
  erc20_address?: string

  /** cosmos base denomination to be mapped to */
  denom?: string

  /** shows token mapping enable status */
  enabled?: boolean

  /**
   * ERC20 owner address ENUM (0 invalid, 1 ModuleAccount, 2 external address)
   * Owner enumerates the ownership of a ERC20 contract.
   *
   *  - OWNER_UNSPECIFIED: OWNER_UNSPECIFIED defines an invalid/undefined owner.
   *  - OWNER_MODULE: OWNER_MODULE erc20 is owned by the erc20 module account.
   *  - OWNER_EXTERNAL: EXTERNAL erc20 is owned by an external account.
   */
  contract_owner?: 'OWNER_UNSPECIFIED' | 'OWNER_MODULE' | 'OWNER_EXTERNAL'
}

/**
* DecCoin defines a token with a denomination and a decimal amount.

NOTE: The amount field is an Dec which implements the custom method
signatures required by gogoproto.
*/
export interface CosmosBaseV1Beta1DecCoin {
  denom?: string
  amount?: string
}

export interface EvmosIncentivesV1GasMeter {
  /** hex address of the incentivized contract */
  contract?: string

  /** participant address that interacts with the incentive */
  participant?: string

  /**
   * cumulative gas spent during the epoch
   * @format uint64
   */
  cumulative_gas?: string
}

export interface EvmosIncentivesV1Incentive {
  /** contract address */
  contract?: string

  /** denoms and percentage of rewards to be allocated */
  allocations?: { denom?: string; amount?: string }[]

  /**
   * number of remaining epochs
   * @format int64
   */
  epochs?: number

  /**
   * distribution start time
   * @format date-time
   */
  start_time?: string

  /**
   * cumulative gas spent by all gasmeters of the incentive during the epoch
   * @format uint64
   */
  total_gas?: string
}

export interface EvmosIncentivesV1Params {
  /** parameter to enable incentives */
  enable_incentives?: boolean

  /** maximum percentage an incentive can allocate per denomination */
  allocation_limit?: string

  /** identifier for the epochs module hooks */
  incentives_epoch_identifier?: string

  /** scaling factor for capping rewards */
  reward_scaler?: string
}

/**
* QueryAllocationMeterResponse is the response type for the
Query/AllocationMeter RPC method.
*/
export interface EvmosIncentivesV1QueryAllocationMeterResponse {
  /**
   * DecCoin defines a token with a denomination and a decimal amount.
   *
   * NOTE: The amount field is an Dec which implements the custom method
   * signatures required by gogoproto.
   */
  allocation_meter?: { denom?: string; amount?: string }
}

/**
* QueryAllocationMetersResponse is the response type for the
Query/AllocationMeters RPC method.
*/
export interface EvmosIncentivesV1QueryAllocationMetersResponse {
  allocation_meters?: { denom?: string; amount?: string }[]

  /** pagination defines the pagination in the response. */
  pagination?: { next_key?: string; total?: string }
}

/**
* QueryGasMeterResponse is the response type for the Query/Incentive RPC
method.
*/
export interface EvmosIncentivesV1QueryGasMeterResponse {
  /** @format uint64 */
  gas_meter?: string
}

/**
* QueryGasMetersResponse is the response type for the Query/Incentives RPC
method.
*/
export interface EvmosIncentivesV1QueryGasMetersResponse {
  gas_meters?: {
    contract?: string
    participant?: string
    cumulative_gas?: string
  }[]

  /** pagination defines the pagination in the response. */
  pagination?: { next_key?: string; total?: string }
}

/**
* QueryIncentiveResponse is the response type for the Query/Incentive RPC
method.
*/
export interface EvmosIncentivesV1QueryIncentiveResponse {
  /**
   * Incentive defines an instance that organizes distribution conditions for a
   * given smart contract
   */
  incentive?: {
    contract?: string
    allocations?: { denom?: string; amount?: string }[]
    epochs?: number
    start_time?: string
    total_gas?: string
  }
}

/**
* QueryIncentivesResponse is the response type for the Query/Incentives RPC
method.
*/
export interface EvmosIncentivesV1QueryIncentivesResponse {
  incentives?: {
    contract?: string
    allocations?: { denom?: string; amount?: string }[]
    epochs?: number
    start_time?: string
    total_gas?: string
  }[]

  /** pagination defines the pagination in the response. */
  pagination?: { next_key?: string; total?: string }
}

/**
* QueryParamsResponse is the response type for the Query/Params RPC
method.
*/
export interface EvmosIncentivesV1QueryParamsResponse {
  /** Params defines the incentives module params */
  params?: {
    enable_incentives?: boolean
    allocation_limit?: string
    incentives_epoch_identifier?: string
    reward_scaler?: string
  }
}

export interface EvmosInflationV1ExponentialCalculation {
  /** initial value */
  a?: string

  /** reduction factor */
  r?: string

  /** long term inflation */
  c?: string

  /** bonding target */
  bonding_target?: string

  /** max variance */
  max_variance?: string
}

export interface EvmosInflationV1InflationDistribution {
  /**
   * staking_rewards defines the proportion of the minted minted_denom that is
   * to be allocated as staking rewards
   */
  staking_rewards?: string

  /**
   * usage_incentives defines the proportion of the minted minted_denom that is
   * to be allocated to the incentives module address
   */
  usage_incentives?: string

  /**
   * community_pool defines the proportion of the minted minted_denom that is to
   * be allocated to the community pool
   */
  community_pool?: string
}

/**
 * Params holds parameters for the inflation module.
 */
export interface EvmosInflationV1Params {
  /** type of coin to mint */
  mint_denom?: string

  /** variables to calculate exponential inflation */
  exponential_calculation?: {
    a?: string
    r?: string
    c?: string
    bonding_target?: string
    max_variance?: string
  }

  /** inflation distribution of the minted denom */
  inflation_distribution?: {
    staking_rewards?: string
    usage_incentives?: string
    community_pool?: string
  }

  /** parameter to enable inflation and halt increasing the skipped_epochs */
  enable_inflation?: boolean
}

/**
* QueryCirculatingSupplyResponse is the response type for the
Query/CirculatingSupply RPC method.
*/
export interface EvmosInflationV1QueryCirculatingSupplyResponse {
  /**
   * total amount of coins in circulation
   * DecCoin defines a token with a denomination and a decimal amount.
   *
   * NOTE: The amount field is an Dec which implements the custom method
   * signatures required by gogoproto.
   */
  circulating_supply?: { denom?: string; amount?: string }
}

/**
* QueryEpochMintProvisionResponse is the response type for the
Query/EpochMintProvision RPC method.
*/
export interface EvmosInflationV1QueryEpochMintProvisionResponse {
  /** epoch_mint_provision is the current minting per epoch provision value. */
  epoch_mint_provision?: { denom?: string; amount?: string }
}

/**
* QueryInflationRateResponse is the response type for the Query/InflationRate
RPC method.
*/
export interface EvmosInflationV1QueryInflationRateResponse {
  /** rate by which the total supply increases within one period */
  inflation_rate?: string
}

/**
 * QueryParamsResponse is the response type for the Query/Params RPC method.
 */
export interface EvmosInflationV1QueryParamsResponse {
  /** params defines the parameters of the module. */
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
}

/**
 * QueryPeriodResponse is the response type for the Query/Period RPC method.
 */
export interface EvmosInflationV1QueryPeriodResponse {
  /**
   * period is the current minting per epoch provision value.
   * @format uint64
   */
  period?: string
}

/**
* QuerySkippedEpochsResponse is the response type for the Query/SkippedEpochs
RPC method.
*/
export interface EvmosInflationV1QuerySkippedEpochsResponse {
  /**
   * number of epochs that the inflation module has been disabled.
   * @format uint64
   */
  skipped_epochs?: string
}

/**
* QueryBalancesResponse is the response type for the Query/Balances RPC
method.
*/
export interface EvmosVestingV1QueryBalancesResponse {
  /** current amount of locked tokens */
  locked?: { denom?: string; amount?: string }[]

  /** current amount of unvested tokens */
  unvested?: { denom?: string; amount?: string }[]

  /** current amount of vested tokens */
  vested?: { denom?: string; amount?: string }[]
}

export interface EvmosRecoveryV1Params {
  /** enable recovery IBC middleware */
  enable_recovery?: boolean

  /** duration added to timeout timestamp for balances recovered via IBC packets */
  packet_timeout_duration?: string
}

/**
 * QueryParamsResponse is the response type for the Query/Params RPC method.
 */
export interface EvmosRecoveryV1QueryParamsResponse {
  /**
   * Params holds parameters for the recovery module
   * params defines the parameters of the module.
   */
  params?: { enable_recovery?: boolean; packet_timeout_duration?: string }
}

/**
* ChainConfig defines the Ethereum ChainConfig parameters using *sdk.Int values
instead of *big.Int.
*/
export interface EthermintEvmV1ChainConfig {
  /** Homestead switch block (nil no fork, 0 = already homestead) */
  homestead_block?: string

  /** TheDAO hard-fork switch block (nil no fork) */
  dao_fork_block?: string

  /** Whether the nodes supports or opposes the DAO hard-fork */
  dao_fork_support?: boolean

  /**
   * EIP150 implements the Gas price changes
   * (https://github.com/ethereum/EIPs/issues/150) EIP150 HF block (nil no fork)
   */
  eip150_block?: string

  /** EIP150 HF hash (needed for header only clients as only gas pricing changed) */
  eip150_hash?: string

  /** EIP155Block HF block */
  eip155_block?: string

  /** EIP158 HF block */
  eip158_block?: string

  /** Byzantium switch block (nil no fork, 0 = already on byzantium) */
  byzantium_block?: string

  /** Constantinople switch block (nil no fork, 0 = already activated) */
  constantinople_block?: string

  /** Petersburg switch block (nil same as Constantinople) */
  petersburg_block?: string

  /** Istanbul switch block (nil no fork, 0 = already on istanbul) */
  istanbul_block?: string

  /** Eip-2384 (bomb delay) switch block (nil no fork, 0 = already activated) */
  muir_glacier_block?: string

  /** Berlin switch block (nil = no fork, 0 = already on berlin) */
  berlin_block?: string

  /** London switch block (nil = no fork, 0 = already on london) */
  london_block?: string

  /** Eip-4345 (bomb delay) switch block (nil = no fork, 0 = already activated) */
  arrow_glacier_block?: string

  /** EIP-3675 (TheMerge) switch block (nil = no fork, 0 = already in merge proceedings) */
  merge_fork_block?: string
}

export interface EthermintEvmV1EstimateGasResponse {
  /**
   * the estimated gas
   * @format uint64
   */
  gas?: string
}

/**
* Log represents an protobuf compatible Ethereum Log that defines a contract
log event. These events are generated by the LOG opcode and stored/indexed by
the node.
*/
export interface EthermintEvmV1Log {
  /** address of the contract that generated the event */
  address?: string

  /** list of topics provided by the contract. */
  topics?: string[]

  /**
   * supplied by the contract, usually ABI-encoded
   * @format byte
   */
  data?: string

  /**
   * block in which the transaction was included
   * @format uint64
   */
  block_number?: string

  /** hash of the transaction */
  tx_hash?: string

  /**
   * index of the transaction in the block
   * @format uint64
   */
  tx_index?: string

  /** hash of the block in which the transaction was included */
  block_hash?: string

  /**
   * index of the log in the block
   * @format uint64
   */
  index?: string

  /**
   * The Removed field is true if this log was reverted due to a chain
   * reorganisation. You must pay attention to this field if you receive logs
   * through a filter query.
   */
  removed?: boolean
}

/**
 * MsgEthereumTx encapsulates an Ethereum transaction as an SDK message.
 */
export interface EthermintEvmV1MsgEthereumTx {
  /**
   * inner transaction data
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   * Example 1: Pack and unpack a message in C++.
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   * Example 2: Pack and unpack a message in Java.
   *     Any any = Any.pack(foo);
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *  Example 3: Pack and unpack a message in Python.
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *  Example 4: Pack and unpack a message in Go
   *      foo := &pb.Foo{...}
   *      any, err := ptypes.MarshalAny(foo)
   *      ...
   *      foo := &pb.Foo{}
   *      if err := ptypes.UnmarshalAny(any, foo); err != nil {
   *        ...
   *      }
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   * JSON
   * ====
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   */
  data?: { type_url?: string; value?: string }

  /**
   * encoded storage size of the transaction
   * @format double
   */
  size?: number

  /** transaction hash in hex format */
  hash?: string

  /**
   * ethereum signer address in hex format. This address value is checked
   * against the address derived from the signature (V, R, S) using the
   * secp256k1 elliptic curve
   */
  from?: string
}

/**
 * MsgEthereumTxResponse defines the Msg/EthereumTx response type.
 */
export interface EthermintEvmV1MsgEthereumTxResponse {
  /**
   * ethereum transaction hash in hex format. This hash differs from the
   * Tendermint sha256 hash of the transaction bytes. See
   * https://github.com/tendermint/tendermint/issues/6539 for reference
   */
  hash?: string

  /**
   * logs contains the transaction hash and the proto-compatible ethereum
   * logs.
   */
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

  /**
   * returned data from evm function (result or data supplied with revert
   * opcode)
   * @format byte
   */
  ret?: string

  /** vm error is the error returned by vm execution */
  vm_error?: string

  /**
   * gas consumed by the transaction
   * @format uint64
   */
  gas_used?: string
}

export interface EthermintEvmV1Params {
  /**
   * evm denom represents the token denomination used to run the EVM state
   * transitions.
   */
  evm_denom?: string

  /** enable create toggles state transitions that use the vm.Create function */
  enable_create?: boolean

  /** enable call toggles state transitions that use the vm.Call function */
  enable_call?: boolean

  /** extra eips defines the additional EIPs for the vm.Config */
  extra_eips?: string[]

  /**
   * chain config defines the EVM chain configuration parameters
   * ChainConfig defines the Ethereum ChainConfig parameters using *sdk.Int values
   * instead of *big.Int.
   */
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

  /**
   * Allow unprotected transactions defines if replay-protected (i.e non EIP155
   * signed) transactions can be executed on the state machine.
   */
  allow_unprotected_txs?: boolean
}

/**
 * QueryAccountResponse is the response type for the Query/Account RPC method.
 */
export interface EthermintEvmV1QueryAccountResponse {
  /** balance is the balance of the EVM denomination. */
  balance?: string

  /** code hash is the hex-formatted code bytes from the EOA. */
  code_hash?: string

  /**
   * nonce is the account's sequence number.
   * @format uint64
   */
  nonce?: string
}

/**
 * QueryBalanceResponse is the response type for the Query/Balance RPC method.
 */
export interface EthermintEvmV1QueryBalanceResponse {
  /** balance is the balance of the EVM denomination. */
  balance?: string
}

/**
 * BaseFeeResponse returns the EIP1559 base fee.
 */
export interface EthermintEvmV1QueryBaseFeeResponse {
  base_fee?: string
}

/**
* QueryCodeResponse is the response type for the Query/Code RPC
method.
*/
export interface EthermintEvmV1QueryCodeResponse {
  /**
   * code represents the code bytes from an ethereum address.
   * @format byte
   */
  code?: string
}

/**
* QueryCosmosAccountResponse is the response type for the Query/CosmosAccount
RPC method.
*/
export interface EthermintEvmV1QueryCosmosAccountResponse {
  /** cosmos_address is the cosmos address of the account. */
  cosmos_address?: string

  /**
   * sequence is the account's sequence number.
   * @format uint64
   */
  sequence?: string

  /**
   * account_number is the account numbert
   * @format uint64
   */
  account_number?: string
}

/**
 * QueryParamsResponse defines the response type for querying x/evm parameters.
 */
export interface EthermintEvmV1QueryParamsResponse {
  /**
   * Params defines the EVM module parameters
   * params define the evm module parameters.
   */
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
}

/**
* QueryStorageResponse is the response type for the Query/Storage RPC
method.
*/
export interface EthermintEvmV1QueryStorageResponse {
  /** key defines the storage state value hash associated with the given key. */
  value?: string
}

export interface EthermintEvmV1QueryTraceBlockResponse {
  /** @format byte */
  data?: string
}

export interface EthermintEvmV1QueryTraceTxResponse {
  /**
   * response serialized in bytes
   * @format byte
   */
  data?: string
}

/**
* QueryValidatorAccountResponse is the response type for the
Query/ValidatorAccount RPC method.
*/
export interface EthermintEvmV1QueryValidatorAccountResponse {
  /** account_address is the cosmos address of the account in bech32 format. */
  account_address?: string

  /**
   * sequence is the account's sequence number.
   * @format uint64
   */
  sequence?: string

  /**
   * account_number is the account number
   * @format uint64
   */
  account_number?: string
}

/**
 * TraceConfig holds extra parameters to trace functions.
 */
export interface EthermintEvmV1TraceConfig {
  /** custom javascript tracer */
  tracer?: string

  /**
   * overrides the default timeout of 5 seconds for JavaScript-based tracing
   * calls
   */
  timeout?: string

  /**
   * number of blocks the tracer is willing to go back
   * @format uint64
   */
  reexec?: string

  /** disable stack capture */
  disable_stack?: boolean

  /** disable storage capture */
  disable_storage?: boolean

  /** print output during capture end */
  debug?: boolean

  /**
   * maximum length of output, but zero means unlimited
   * @format int32
   */
  limit?: number

  /**
   * Chain overrides, can be used to execute a trace using future fork rules
   * ChainConfig defines the Ethereum ChainConfig parameters using *sdk.Int values
   * instead of *big.Int.
   */
  overrides?: {
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

  /** enable memory capture */
  enable_memory?: boolean

  /** enable return data capture */
  enable_return_data?: boolean
}

export interface EthermintFeemarketV1Params {
  /** no base fee forces the EIP-1559 base fee to 0 (needed for 0 price calls) */
  no_base_fee?: boolean

  /**
   * base fee change denominator bounds the amount the base fee can change
   * between blocks.
   * @format int64
   */
  base_fee_change_denominator?: number

  /**
   * elasticity multiplier bounds the maximum gas limit an EIP-1559 block may
   * have.
   * @format int64
   */
  elasticity_multiplier?: number

  /**
   * height at which the base fee calculation is enabled.
   * @format int64
   */
  enable_height?: string

  /** base fee for EIP-1559 blocks. */
  base_fee?: string

  /** min_gas_price defines the minimum gas price value for cosmos and eth transactions */
  min_gas_price?: string

  /**
   * min gas denominator bounds the minimum gasUsed to be charged
   * to senders based on GasLimit
   */
  min_gas_multiplier?: string
}

/**
 * BaseFeeResponse returns the EIP1559 base fee.
 */
export interface EthermintFeemarketV1QueryBaseFeeResponse {
  base_fee?: string
}

/**
 * QueryBlockGasResponse returns block gas used for a given height.
 */
export interface EthermintFeemarketV1QueryBlockGasResponse {
  /** @format int64 */
  gas?: string
}

/**
 * QueryParamsResponse defines the response type for querying x/evm parameters.
 */
export interface EthermintFeemarketV1QueryParamsResponse {
  /**
   * Params defines the EVM module parameters
   * params define the evm module parameters.
   */
  params?: {
    no_base_fee?: boolean
    base_fee_change_denominator?: number
    elasticity_multiplier?: number
    enable_height?: string
    base_fee?: string
    min_gas_price?: string
    min_gas_multiplier?: string
  }
}

/**
* DenomTrace contains the base denomination for ICS20 fungible tokens and the
source tracing information path.
*/
export interface IbcApplicationsTransferV1DenomTrace {
  /**
   * path defines the chain of port/channel identifiers used for tracing the
   * source of the fungible token.
   */
  path?: string

  /** base denomination of the relayed fungible token. */
  base_denom?: string
}

/**
* Params defines the set of IBC transfer parameters.
NOTE: To prevent a single token from being transferred, set the
TransfersEnabled parameter to true and then set the bank module's SendEnabled
parameter for the denomination to false.
*/
export interface IbcApplicationsTransferV1Params {
  /**
   * send_enabled enables or disables all cross-chain token transfers from this
   * chain.
   */
  send_enabled?: boolean

  /**
   * receive_enabled enables or disables all cross-chain token transfers to this
   * chain.
   */
  receive_enabled?: boolean
}

/**
* QueryDenomHashResponse is the response type for the Query/DenomHash RPC
method.
*/
export interface IbcApplicationsTransferV1QueryDenomHashResponse {
  /** hash (in hex format) of the denomination trace information. */
  hash?: string
}

/**
* QueryDenomTraceResponse is the response type for the Query/DenomTrace RPC
method.
*/
export interface IbcApplicationsTransferV1QueryDenomTraceResponse {
  /** denom_trace returns the requested denomination trace information. */
  denom_trace?: { path?: string; base_denom?: string }
}

/**
* QueryConnectionsResponse is the response type for the Query/DenomTraces RPC
method.
*/
export interface IbcApplicationsTransferV1QueryDenomTracesResponse {
  /** denom_traces returns all denominations trace information. */
  denom_traces?: { path?: string; base_denom?: string }[]

  /** pagination defines the pagination in the response. */
  pagination?: { next_key?: string; total?: string }
}

/**
 * QueryParamsResponse is the response type for the Query/Params RPC method.
 */
export interface IbcApplicationsTransferV1QueryParamsResponse {
  /** params defines the parameters of the module. */
  params?: { send_enabled?: boolean; receive_enabled?: boolean }
}

/**
* ConsensusStateWithHeight defines a consensus state with an additional height
field.
*/
export interface IbcCoreClientV1ConsensusStateWithHeight {
  /**
   * consensus state height
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  height?: { revision_number?: string; revision_height?: string }

  /**
   * consensus state
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   * Example 1: Pack and unpack a message in C++.
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   * Example 2: Pack and unpack a message in Java.
   *     Any any = Any.pack(foo);
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *  Example 3: Pack and unpack a message in Python.
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *  Example 4: Pack and unpack a message in Go
   *      foo := &pb.Foo{...}
   *      any, err := ptypes.MarshalAny(foo)
   *      ...
   *      foo := &pb.Foo{}
   *      if err := ptypes.UnmarshalAny(any, foo); err != nil {
   *        ...
   *      }
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   * JSON
   * ====
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   */
  consensus_state?: { type_url?: string; value?: string }
}

/**
* Normally the RevisionHeight is incremented at each height while keeping
RevisionNumber the same. However some consensus algorithms may choose to
reset the height in certain conditions e.g. hard forks, state-machine
breaking changes In these cases, the RevisionNumber is incremented so that
height continues to be monitonically increasing even as the RevisionHeight
gets reset
*/
export interface IbcCoreClientV1Height {
  /**
   * the revision that the client is currently on
   * @format uint64
   */
  revision_number?: string

  /**
   * the height within the given revision
   * @format uint64
   */
  revision_height?: string
}

/**
* IdentifiedClientState defines a client state with an additional client
identifier field.
*/
export interface IbcCoreClientV1IdentifiedClientState {
  /** client identifier */
  client_id?: string

  /**
   * client state
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   * Example 1: Pack and unpack a message in C++.
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   * Example 2: Pack and unpack a message in Java.
   *     Any any = Any.pack(foo);
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *  Example 3: Pack and unpack a message in Python.
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *  Example 4: Pack and unpack a message in Go
   *      foo := &pb.Foo{...}
   *      any, err := ptypes.MarshalAny(foo)
   *      ...
   *      foo := &pb.Foo{}
   *      if err := ptypes.UnmarshalAny(any, foo); err != nil {
   *        ...
   *      }
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   * JSON
   * ====
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   */
  client_state?: { type_url?: string; value?: string }
}

/**
 * Params defines the set of IBC light client parameters.
 */
export interface IbcCoreClientV1Params {
  /** allowed_clients defines the list of allowed client state types. */
  allowed_clients?: string[]
}

/**
* QueryClientParamsResponse is the response type for the Query/ClientParams RPC
method.
*/
export interface IbcCoreClientV1QueryClientParamsResponse {
  /** params defines the parameters of the module. */
  params?: { allowed_clients?: string[] }
}

/**
* QueryClientStateResponse is the response type for the Query/ClientState RPC
method. Besides the client state, it includes a proof and the height from
which the proof was retrieved.
*/
export interface IbcCoreClientV1QueryClientStateResponse {
  /**
   * client state associated with the request identifier
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   * Example 1: Pack and unpack a message in C++.
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   * Example 2: Pack and unpack a message in Java.
   *     Any any = Any.pack(foo);
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *  Example 3: Pack and unpack a message in Python.
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *  Example 4: Pack and unpack a message in Go
   *      foo := &pb.Foo{...}
   *      any, err := ptypes.MarshalAny(foo)
   *      ...
   *      foo := &pb.Foo{}
   *      if err := ptypes.UnmarshalAny(any, foo); err != nil {
   *        ...
   *      }
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   * JSON
   * ====
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   */
  client_state?: { type_url?: string; value?: string }

  /**
   * merkle proof of existence
   * @format byte
   */
  proof?: string

  /**
   * height at which the proof was retrieved
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  proof_height?: { revision_number?: string; revision_height?: string }
}

/**
* QueryClientStatesResponse is the response type for the Query/ClientStates RPC
method.
*/
export interface IbcCoreClientV1QueryClientStatesResponse {
  /** list of stored ClientStates of the chain. */
  client_states?: {
    client_id?: string
    client_state?: { type_url?: string; value?: string }
  }[]

  /**
   * pagination response
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: { next_key?: string; total?: string }
}

/**
* QueryClientStatusResponse is the response type for the Query/ClientStatus RPC
method. It returns the current status of the IBC client.
*/
export interface IbcCoreClientV1QueryClientStatusResponse {
  status?: string
}

export interface IbcCoreClientV1QueryConsensusStateResponse {
  /**
   * consensus state associated with the client identifier at the given height
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   * Example 1: Pack and unpack a message in C++.
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   * Example 2: Pack and unpack a message in Java.
   *     Any any = Any.pack(foo);
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *  Example 3: Pack and unpack a message in Python.
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *  Example 4: Pack and unpack a message in Go
   *      foo := &pb.Foo{...}
   *      any, err := ptypes.MarshalAny(foo)
   *      ...
   *      foo := &pb.Foo{}
   *      if err := ptypes.UnmarshalAny(any, foo); err != nil {
   *        ...
   *      }
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   * JSON
   * ====
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   */
  consensus_state?: { type_url?: string; value?: string }

  /**
   * merkle proof of existence
   * @format byte
   */
  proof?: string

  /**
   * height at which the proof was retrieved
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  proof_height?: { revision_number?: string; revision_height?: string }
}

export interface IbcCoreClientV1QueryConsensusStatesResponse {
  /** consensus states associated with the identifier */
  consensus_states?: {
    height?: { revision_number?: string; revision_height?: string }
    consensus_state?: { type_url?: string; value?: string }
  }[]

  /**
   * pagination response
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: { next_key?: string; total?: string }
}

/**
* QueryUpgradedClientStateResponse is the response type for the
Query/UpgradedClientState RPC method.
*/
export interface IbcCoreClientV1QueryUpgradedClientStateResponse {
  /**
   * client state associated with the request identifier
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   * Example 1: Pack and unpack a message in C++.
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   * Example 2: Pack and unpack a message in Java.
   *     Any any = Any.pack(foo);
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *  Example 3: Pack and unpack a message in Python.
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *  Example 4: Pack and unpack a message in Go
   *      foo := &pb.Foo{...}
   *      any, err := ptypes.MarshalAny(foo)
   *      ...
   *      foo := &pb.Foo{}
   *      if err := ptypes.UnmarshalAny(any, foo); err != nil {
   *        ...
   *      }
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   * JSON
   * ====
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   */
  upgraded_client_state?: { type_url?: string; value?: string }
}

/**
* QueryUpgradedConsensusStateResponse is the response type for the
Query/UpgradedConsensusState RPC method.
*/
export interface IbcCoreClientV1QueryUpgradedConsensusStateResponse {
  /**
   * Consensus state associated with the request identifier
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   * Example 1: Pack and unpack a message in C++.
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   * Example 2: Pack and unpack a message in Java.
   *     Any any = Any.pack(foo);
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *  Example 3: Pack and unpack a message in Python.
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *  Example 4: Pack and unpack a message in Go
   *      foo := &pb.Foo{...}
   *      any, err := ptypes.MarshalAny(foo)
   *      ...
   *      foo := &pb.Foo{}
   *      if err := ptypes.UnmarshalAny(any, foo); err != nil {
   *        ...
   *      }
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   * JSON
   * ====
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   */
  upgraded_consensus_state?: { type_url?: string; value?: string }
}

export interface IbcCoreCommitmentV1MerklePrefix {
  /** @format byte */
  key_prefix?: string
}

/**
* ConnectionEnd defines a stateful object on a chain connected to another
separate one.
NOTE: there must only be 2 defined ConnectionEnds to establish
a connection between two chains.
*/
export interface IbcCoreConnectionV1ConnectionEnd {
  /** client associated with this connection. */
  client_id?: string

  /**
   * IBC version which can be utilised to determine encodings or protocols for
   * channels or packets utilising this connection.
   */
  versions?: { identifier?: string; features?: string[] }[]

  /** current state of the connection end. */
  state?:
    | 'STATE_UNINITIALIZED_UNSPECIFIED'
    | 'STATE_INIT'
    | 'STATE_TRYOPEN'
    | 'STATE_OPEN'

  /** counterparty chain associated with this connection. */
  counterparty?: {
    client_id?: string
    connection_id?: string
    prefix?: { key_prefix?: string }
  }

  /**
   * delay period that must pass before a consensus state can be used for
   * packet-verification NOTE: delay period logic is only implemented by some
   * clients.
   * @format uint64
   */
  delay_period?: string
}

/**
 * Counterparty defines the counterparty chain associated with a connection end.
 */
export interface IbcCoreConnectionV1Counterparty {
  /**
   * identifies the client on the counterparty chain associated with a given
   * connection.
   */
  client_id?: string

  /**
   * identifies the connection end on the counterparty chain associated with a
   * given connection.
   */
  connection_id?: string

  /**
   * MerklePrefix is merkle path prefixed to the key.
   * The constructed key from the Path and the key will be append(Path.KeyPath,
   * append(Path.KeyPrefix, key...))
   * commitment merkle prefix of the counterparty chain.
   */
  prefix?: { key_prefix?: string }
}

/**
* IdentifiedConnection defines a connection with additional connection
identifier field.
*/
export interface IbcCoreConnectionV1IdentifiedConnection {
  /** connection identifier. */
  id?: string

  /** client associated with this connection. */
  client_id?: string

  /**
   * IBC version which can be utilised to determine encodings or protocols for
   * channels or packets utilising this connection
   */
  versions?: { identifier?: string; features?: string[] }[]

  /** current state of the connection end. */
  state?:
    | 'STATE_UNINITIALIZED_UNSPECIFIED'
    | 'STATE_INIT'
    | 'STATE_TRYOPEN'
    | 'STATE_OPEN'

  /** counterparty chain associated with this connection. */
  counterparty?: {
    client_id?: string
    connection_id?: string
    prefix?: { key_prefix?: string }
  }

  /**
   * delay period associated with this connection.
   * @format uint64
   */
  delay_period?: string
}

export interface IbcCoreConnectionV1QueryClientConnectionsResponse {
  /** slice of all the connection paths associated with a client. */
  connection_paths?: string[]

  /**
   * merkle proof of existence
   * @format byte
   */
  proof?: string

  /**
   * height at which the proof was generated
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  proof_height?: { revision_number?: string; revision_height?: string }
}

export interface IbcCoreConnectionV1QueryConnectionClientStateResponse {
  /**
   * client state associated with the channel
   * IdentifiedClientState defines a client state with an additional client
   * identifier field.
   */
  identified_client_state?: {
    client_id?: string
    client_state?: { type_url?: string; value?: string }
  }

  /**
   * merkle proof of existence
   * @format byte
   */
  proof?: string

  /**
   * height at which the proof was retrieved
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  proof_height?: { revision_number?: string; revision_height?: string }
}

export interface IbcCoreConnectionV1QueryConnectionConsensusStateResponse {
  /**
   * consensus state associated with the channel
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   * Example 1: Pack and unpack a message in C++.
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   * Example 2: Pack and unpack a message in Java.
   *     Any any = Any.pack(foo);
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *  Example 3: Pack and unpack a message in Python.
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *  Example 4: Pack and unpack a message in Go
   *      foo := &pb.Foo{...}
   *      any, err := ptypes.MarshalAny(foo)
   *      ...
   *      foo := &pb.Foo{}
   *      if err := ptypes.UnmarshalAny(any, foo); err != nil {
   *        ...
   *      }
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   * JSON
   * ====
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   */
  consensus_state?: { type_url?: string; value?: string }

  /** client ID associated with the consensus state */
  client_id?: string

  /**
   * merkle proof of existence
   * @format byte
   */
  proof?: string

  /**
   * height at which the proof was retrieved
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  proof_height?: { revision_number?: string; revision_height?: string }
}

/**
* QueryConnectionResponse is the response type for the Query/Connection RPC
method. Besides the connection end, it includes a proof and the height from
which the proof was retrieved.
*/
export interface IbcCoreConnectionV1QueryConnectionResponse {
  /**
   * connection associated with the request identifier
   * ConnectionEnd defines a stateful object on a chain connected to another
   * separate one.
   * NOTE: there must only be 2 defined ConnectionEnds to establish
   * a connection between two chains.
   */
  connection?: {
    client_id?: string
    versions?: { identifier?: string; features?: string[] }[]
    state?:
      | 'STATE_UNINITIALIZED_UNSPECIFIED'
      | 'STATE_INIT'
      | 'STATE_TRYOPEN'
      | 'STATE_OPEN'
    counterparty?: {
      client_id?: string
      connection_id?: string
      prefix?: { key_prefix?: string }
    }
    delay_period?: string
  }

  /**
   * merkle proof of existence
   * @format byte
   */
  proof?: string

  /**
   * height at which the proof was retrieved
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  proof_height?: { revision_number?: string; revision_height?: string }
}

/**
* QueryConnectionsResponse is the response type for the Query/Connections RPC
method.
*/
export interface IbcCoreConnectionV1QueryConnectionsResponse {
  /** list of stored connections of the chain. */
  connections?: {
    id?: string
    client_id?: string
    versions?: { identifier?: string; features?: string[] }[]
    state?:
      | 'STATE_UNINITIALIZED_UNSPECIFIED'
      | 'STATE_INIT'
      | 'STATE_TRYOPEN'
      | 'STATE_OPEN'
    counterparty?: {
      client_id?: string
      connection_id?: string
      prefix?: { key_prefix?: string }
    }
    delay_period?: string
  }[]

  /**
   * pagination response
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: { next_key?: string; total?: string }

  /**
   * query block height
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  height?: { revision_number?: string; revision_height?: string }
}

/**
* State defines if a connection is in one of the following states:
INIT, TRYOPEN, OPEN or UNINITIALIZED.

 - STATE_UNINITIALIZED_UNSPECIFIED: Default State
 - STATE_INIT: A connection end has just started the opening handshake.
 - STATE_TRYOPEN: A connection end has acknowledged the handshake step on the counterparty
chain.
 - STATE_OPEN: A connection end has completed the handshake.
*/
export enum IbcCoreConnectionV1State {
  STATE_UNINITIALIZED_UNSPECIFIED = 'STATE_UNINITIALIZED_UNSPECIFIED',
  STATE_INIT = 'STATE_INIT',
  STATE_TRYOPEN = 'STATE_TRYOPEN',
  STATE_OPEN = 'STATE_OPEN',
}

/**
* Version defines the versioning scheme used to negotiate the IBC verison in
the connection handshake.
*/
export interface IbcCoreConnectionV1Version {
  /** unique version identifier */
  identifier?: string

  /** list of features compatible with the specified identifier */
  features?: string[]
}

/**
* Channel defines pipeline for exactly-once packet delivery between specific
modules on separate blockchains, which has at least one end capable of
sending packets and one end capable of receiving packets.
*/
export interface IbcCoreChannelV1Channel {
  /**
   * current state of the channel end
   * State defines if a channel is in one of the following states:
   * CLOSED, INIT, TRYOPEN, OPEN or UNINITIALIZED.
   *
   *  - STATE_UNINITIALIZED_UNSPECIFIED: Default State
   *  - STATE_INIT: A channel has just started the opening handshake.
   *  - STATE_TRYOPEN: A channel has acknowledged the handshake step on the counterparty chain.
   *  - STATE_OPEN: A channel has completed the handshake. Open channels are
   * ready to send and receive packets.
   *  - STATE_CLOSED: A channel has been closed and can no longer be used to send or receive
   * packets.
   */
  state?:
    | 'STATE_UNINITIALIZED_UNSPECIFIED'
    | 'STATE_INIT'
    | 'STATE_TRYOPEN'
    | 'STATE_OPEN'
    | 'STATE_CLOSED'

  /**
   * whether the channel is ordered or unordered
   * - ORDER_NONE_UNSPECIFIED: zero-value for channel ordering
   *  - ORDER_UNORDERED: packets can be delivered in any order, which may differ from the order in
   * which they were sent.
   *  - ORDER_ORDERED: packets are delivered exactly in the order which they were sent
   */
  ordering?: 'ORDER_NONE_UNSPECIFIED' | 'ORDER_UNORDERED' | 'ORDER_ORDERED'

  /** counterparty channel end */
  counterparty?: { port_id?: string; channel_id?: string }

  /**
   * list of connection identifiers, in order, along which packets sent on
   * this channel will travel
   */
  connection_hops?: string[]

  /** opaque channel version, which is agreed upon during the handshake */
  version?: string
}

export interface IbcCoreChannelV1Counterparty {
  /** port on the counterparty chain which owns the other end of the channel. */
  port_id?: string

  /** channel end on the counterparty chain */
  channel_id?: string
}

/**
* IdentifiedChannel defines a channel with additional port and channel
identifier fields.
*/
export interface IbcCoreChannelV1IdentifiedChannel {
  /**
   * current state of the channel end
   * State defines if a channel is in one of the following states:
   * CLOSED, INIT, TRYOPEN, OPEN or UNINITIALIZED.
   *
   *  - STATE_UNINITIALIZED_UNSPECIFIED: Default State
   *  - STATE_INIT: A channel has just started the opening handshake.
   *  - STATE_TRYOPEN: A channel has acknowledged the handshake step on the counterparty chain.
   *  - STATE_OPEN: A channel has completed the handshake. Open channels are
   * ready to send and receive packets.
   *  - STATE_CLOSED: A channel has been closed and can no longer be used to send or receive
   * packets.
   */
  state?:
    | 'STATE_UNINITIALIZED_UNSPECIFIED'
    | 'STATE_INIT'
    | 'STATE_TRYOPEN'
    | 'STATE_OPEN'
    | 'STATE_CLOSED'

  /**
   * whether the channel is ordered or unordered
   * - ORDER_NONE_UNSPECIFIED: zero-value for channel ordering
   *  - ORDER_UNORDERED: packets can be delivered in any order, which may differ from the order in
   * which they were sent.
   *  - ORDER_ORDERED: packets are delivered exactly in the order which they were sent
   */
  ordering?: 'ORDER_NONE_UNSPECIFIED' | 'ORDER_UNORDERED' | 'ORDER_ORDERED'

  /** counterparty channel end */
  counterparty?: { port_id?: string; channel_id?: string }

  /**
   * list of connection identifiers, in order, along which packets sent on
   * this channel will travel
   */
  connection_hops?: string[]

  /** opaque channel version, which is agreed upon during the handshake */
  version?: string

  /** port identifier */
  port_id?: string

  /** channel identifier */
  channel_id?: string
}

/**
* - ORDER_NONE_UNSPECIFIED: zero-value for channel ordering
 - ORDER_UNORDERED: packets can be delivered in any order, which may differ from the order in
which they were sent.
 - ORDER_ORDERED: packets are delivered exactly in the order which they were sent
*/
export enum IbcCoreChannelV1Order {
  ORDER_NONE_UNSPECIFIED = 'ORDER_NONE_UNSPECIFIED',
  ORDER_UNORDERED = 'ORDER_UNORDERED',
  ORDER_ORDERED = 'ORDER_ORDERED',
}

/**
* PacketState defines the generic type necessary to retrieve and store
packet commitments, acknowledgements, and receipts.
Caller is responsible for knowing the context necessary to interpret this
state as a commitment, acknowledgement, or a receipt.
*/
export interface IbcCoreChannelV1PacketState {
  /** channel port identifier. */
  port_id?: string

  /** channel unique identifier. */
  channel_id?: string

  /**
   * packet sequence.
   * @format uint64
   */
  sequence?: string

  /**
   * embedded data that represents packet state.
   * @format byte
   */
  data?: string
}

export interface IbcCoreChannelV1QueryChannelClientStateResponse {
  /**
   * client state associated with the channel
   * IdentifiedClientState defines a client state with an additional client
   * identifier field.
   */
  identified_client_state?: {
    client_id?: string
    client_state?: { type_url?: string; value?: string }
  }

  /**
   * merkle proof of existence
   * @format byte
   */
  proof?: string

  /**
   * height at which the proof was retrieved
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  proof_height?: { revision_number?: string; revision_height?: string }
}

export interface IbcCoreChannelV1QueryChannelConsensusStateResponse {
  /**
   * consensus state associated with the channel
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   * Example 1: Pack and unpack a message in C++.
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   * Example 2: Pack and unpack a message in Java.
   *     Any any = Any.pack(foo);
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *  Example 3: Pack and unpack a message in Python.
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *  Example 4: Pack and unpack a message in Go
   *      foo := &pb.Foo{...}
   *      any, err := ptypes.MarshalAny(foo)
   *      ...
   *      foo := &pb.Foo{}
   *      if err := ptypes.UnmarshalAny(any, foo); err != nil {
   *        ...
   *      }
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   * JSON
   * ====
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   */
  consensus_state?: { type_url?: string; value?: string }

  /** client ID associated with the consensus state */
  client_id?: string

  /**
   * merkle proof of existence
   * @format byte
   */
  proof?: string

  /**
   * height at which the proof was retrieved
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  proof_height?: { revision_number?: string; revision_height?: string }
}

/**
* QueryChannelResponse is the response type for the Query/Channel RPC method.
Besides the Channel end, it includes a proof and the height from which the
proof was retrieved.
*/
export interface IbcCoreChannelV1QueryChannelResponse {
  /**
   * channel associated with the request identifiers
   * Channel defines pipeline for exactly-once packet delivery between specific
   * modules on separate blockchains, which has at least one end capable of
   * sending packets and one end capable of receiving packets.
   */
  channel?: {
    state?:
      | 'STATE_UNINITIALIZED_UNSPECIFIED'
      | 'STATE_INIT'
      | 'STATE_TRYOPEN'
      | 'STATE_OPEN'
      | 'STATE_CLOSED'
    ordering?: 'ORDER_NONE_UNSPECIFIED' | 'ORDER_UNORDERED' | 'ORDER_ORDERED'
    counterparty?: { port_id?: string; channel_id?: string }
    connection_hops?: string[]
    version?: string
  }

  /**
   * merkle proof of existence
   * @format byte
   */
  proof?: string

  /**
   * height at which the proof was retrieved
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  proof_height?: { revision_number?: string; revision_height?: string }
}

/**
 * QueryChannelsResponse is the response type for the Query/Channels RPC method.
 */
export interface IbcCoreChannelV1QueryChannelsResponse {
  /** list of stored channels of the chain. */
  channels?: {
    state?:
      | 'STATE_UNINITIALIZED_UNSPECIFIED'
      | 'STATE_INIT'
      | 'STATE_TRYOPEN'
      | 'STATE_OPEN'
      | 'STATE_CLOSED'
    ordering?: 'ORDER_NONE_UNSPECIFIED' | 'ORDER_UNORDERED' | 'ORDER_ORDERED'
    counterparty?: { port_id?: string; channel_id?: string }
    connection_hops?: string[]
    version?: string
    port_id?: string
    channel_id?: string
  }[]

  /**
   * pagination response
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: { next_key?: string; total?: string }

  /**
   * query block height
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  height?: { revision_number?: string; revision_height?: string }
}

export interface IbcCoreChannelV1QueryConnectionChannelsResponse {
  /** list of channels associated with a connection. */
  channels?: {
    state?:
      | 'STATE_UNINITIALIZED_UNSPECIFIED'
      | 'STATE_INIT'
      | 'STATE_TRYOPEN'
      | 'STATE_OPEN'
      | 'STATE_CLOSED'
    ordering?: 'ORDER_NONE_UNSPECIFIED' | 'ORDER_UNORDERED' | 'ORDER_ORDERED'
    counterparty?: { port_id?: string; channel_id?: string }
    connection_hops?: string[]
    version?: string
    port_id?: string
    channel_id?: string
  }[]

  /**
   * pagination response
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: { next_key?: string; total?: string }

  /**
   * query block height
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  height?: { revision_number?: string; revision_height?: string }
}

export interface IbcCoreChannelV1QueryNextSequenceReceiveResponse {
  /**
   * next sequence receive number
   * @format uint64
   */
  next_sequence_receive?: string

  /**
   * merkle proof of existence
   * @format byte
   */
  proof?: string

  /**
   * height at which the proof was retrieved
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  proof_height?: { revision_number?: string; revision_height?: string }
}

export interface IbcCoreChannelV1QueryPacketAcknowledgementResponse {
  /**
   * packet associated with the request fields
   * @format byte
   */
  acknowledgement?: string

  /**
   * merkle proof of existence
   * @format byte
   */
  proof?: string

  /**
   * height at which the proof was retrieved
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  proof_height?: { revision_number?: string; revision_height?: string }
}

export interface IbcCoreChannelV1QueryPacketAcknowledgementsResponse {
  acknowledgements?: {
    port_id?: string
    channel_id?: string
    sequence?: string
    data?: string
  }[]

  /**
   * pagination response
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: { next_key?: string; total?: string }

  /**
   * query block height
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  height?: { revision_number?: string; revision_height?: string }
}

export interface IbcCoreChannelV1QueryPacketCommitmentResponse {
  /**
   * packet associated with the request fields
   * @format byte
   */
  commitment?: string

  /**
   * merkle proof of existence
   * @format byte
   */
  proof?: string

  /**
   * height at which the proof was retrieved
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  proof_height?: { revision_number?: string; revision_height?: string }
}

export interface IbcCoreChannelV1QueryPacketCommitmentsResponse {
  commitments?: {
    port_id?: string
    channel_id?: string
    sequence?: string
    data?: string
  }[]

  /**
   * pagination response
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: { next_key?: string; total?: string }

  /**
   * query block height
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  height?: { revision_number?: string; revision_height?: string }
}

export interface IbcCoreChannelV1QueryPacketReceiptResponse {
  /** success flag for if receipt exists */
  received?: boolean

  /**
   * merkle proof of existence
   * @format byte
   */
  proof?: string

  /**
   * height at which the proof was retrieved
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  proof_height?: { revision_number?: string; revision_height?: string }
}

export interface IbcCoreChannelV1QueryUnreceivedAcksResponse {
  /** list of unreceived acknowledgement sequences */
  sequences?: string[]

  /**
   * query block height
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  height?: { revision_number?: string; revision_height?: string }
}

export interface IbcCoreChannelV1QueryUnreceivedPacketsResponse {
  /** list of unreceived packet sequences */
  sequences?: string[]

  /**
   * query block height
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  height?: { revision_number?: string; revision_height?: string }
}

/**
* State defines if a channel is in one of the following states:
CLOSED, INIT, TRYOPEN, OPEN or UNINITIALIZED.

 - STATE_UNINITIALIZED_UNSPECIFIED: Default State
 - STATE_INIT: A channel has just started the opening handshake.
 - STATE_TRYOPEN: A channel has acknowledged the handshake step on the counterparty chain.
 - STATE_OPEN: A channel has completed the handshake. Open channels are
ready to send and receive packets.
 - STATE_CLOSED: A channel has been closed and can no longer be used to send or receive
packets.
*/
export enum IbcCoreChannelV1State {
  STATE_UNINITIALIZED_UNSPECIFIED = 'STATE_UNINITIALIZED_UNSPECIFIED',
  STATE_INIT = 'STATE_INIT',
  STATE_TRYOPEN = 'STATE_TRYOPEN',
  STATE_OPEN = 'STATE_OPEN',
  STATE_CLOSED = 'STATE_CLOSED',
}

/**
 * Params defines the parameters for the auth module.
 */
export interface CosmosAuthV1Beta1Params {
  /** @format uint64 */
  max_memo_characters?: string

  /** @format uint64 */
  tx_sig_limit?: string

  /** @format uint64 */
  tx_size_cost_per_byte?: string

  /** @format uint64 */
  sig_verify_cost_ed25519?: string

  /** @format uint64 */
  sig_verify_cost_secp256k1?: string
}

/**
 * QueryAccountResponse is the response type for the Query/Account RPC method.
 */
export interface CosmosAuthV1Beta1QueryAccountResponse {
  /** account defines the account of the corresponding address. */
  account?: { type_url?: string; value?: string }
}

/**
* QueryAccountsResponse is the response type for the Query/Accounts RPC method.

Since: cosmos-sdk 0.43
*/
export interface CosmosAuthV1Beta1QueryAccountsResponse {
  /** accounts are the existing accounts */
  accounts?: { type_url?: string; value?: string }[]

  /** pagination defines the pagination in the response. */
  pagination?: { next_key?: string; total?: string }
}

/**
 * QueryParamsResponse is the response type for the Query/Params RPC method.
 */
export interface CosmosAuthV1Beta1QueryParamsResponse {
  /** params defines the parameters of the module. */
  params?: {
    max_memo_characters?: string
    tx_sig_limit?: string
    tx_size_cost_per_byte?: string
    sig_verify_cost_ed25519?: string
    sig_verify_cost_secp256k1?: string
  }
}

/**
* Grant gives permissions to execute
the provide method with expiration time.
*/
export interface CosmosAuthzV1Beta1Grant {
  /**
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   * Example 1: Pack and unpack a message in C++.
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   * Example 2: Pack and unpack a message in Java.
   *     Any any = Any.pack(foo);
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *  Example 3: Pack and unpack a message in Python.
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *  Example 4: Pack and unpack a message in Go
   *      foo := &pb.Foo{...}
   *      any, err := ptypes.MarshalAny(foo)
   *      ...
   *      foo := &pb.Foo{}
   *      if err := ptypes.UnmarshalAny(any, foo); err != nil {
   *        ...
   *      }
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   * JSON
   * ====
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   */
  authorization?: { type_url?: string; value?: string }

  /** @format date-time */
  expiration?: string
}

/**
 * Since: cosmos-sdk 0.45.2
 */
export interface CosmosAuthzV1Beta1GrantAuthorization {
  granter?: string
  grantee?: string

  /**
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   * Example 1: Pack and unpack a message in C++.
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   * Example 2: Pack and unpack a message in Java.
   *     Any any = Any.pack(foo);
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *  Example 3: Pack and unpack a message in Python.
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *  Example 4: Pack and unpack a message in Go
   *      foo := &pb.Foo{...}
   *      any, err := ptypes.MarshalAny(foo)
   *      ...
   *      foo := &pb.Foo{}
   *      if err := ptypes.UnmarshalAny(any, foo); err != nil {
   *        ...
   *      }
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   * JSON
   * ====
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   */
  authorization?: { type_url?: string; value?: string }

  /** @format date-time */
  expiration?: string
}

/**
 * QueryGranteeGrantsResponse is the response type for the Query/GranteeGrants RPC method.
 */
export interface CosmosAuthzV1Beta1QueryGranteeGrantsResponse {
  /** grants is a list of grants granted to the grantee. */
  grants?: {
    granter?: string
    grantee?: string
    authorization?: { type_url?: string; value?: string }
    expiration?: string
  }[]

  /** pagination defines an pagination for the response. */
  pagination?: { next_key?: string; total?: string }
}

/**
 * QueryGranterGrantsResponse is the response type for the Query/GranterGrants RPC method.
 */
export interface CosmosAuthzV1Beta1QueryGranterGrantsResponse {
  /** grants is a list of grants granted by the granter. */
  grants?: {
    granter?: string
    grantee?: string
    authorization?: { type_url?: string; value?: string }
    expiration?: string
  }[]

  /** pagination defines an pagination for the response. */
  pagination?: { next_key?: string; total?: string }
}

/**
 * QueryGrantsResponse is the response type for the Query/Authorizations RPC method.
 */
export interface CosmosAuthzV1Beta1QueryGrantsResponse {
  /** authorizations is a list of grants granted for grantee by granter. */
  grants?: {
    authorization?: { type_url?: string; value?: string }
    expiration?: string
  }[]

  /** pagination defines an pagination for the response. */
  pagination?: { next_key?: string; total?: string }
}

/**
* DenomUnit represents a struct that describes a given
denomination unit of the basic token.
*/
export interface CosmosBankV1Beta1DenomUnit {
  /** denom represents the string name of the given denom unit (e.g uatom). */
  denom?: string

  /**
   * exponent represents power of 10 exponent that one must
   * raise the base_denom to in order to equal the given DenomUnit's denom
   * 1 denom = 1^exponent base_denom
   * (e.g. with a base_denom of uatom, one can create a DenomUnit of 'atom' with
   * exponent = 6, thus: 1 atom = 10^6 uatom).
   * @format int64
   */
  exponent?: number

  /** aliases is a list of string aliases for the given denom */
  aliases?: string[]
}

/**
* Metadata represents a struct that describes
a basic token.
*/
export interface CosmosBankV1Beta1Metadata {
  description?: string

  /** denom_units represents the list of DenomUnit's for a given coin */
  denom_units?: { denom?: string; exponent?: number; aliases?: string[] }[]

  /** base represents the base denom (should be the DenomUnit with exponent = 0). */
  base?: string

  /**
   * display indicates the suggested denom that should be
   * displayed in clients.
   */
  display?: string

  /**
   * name defines the name of the token (eg: Cosmos Atom)
   * Since: cosmos-sdk 0.43
   */
  name?: string

  /**
   * symbol is the token symbol usually shown on exchanges (eg: ATOM). This can
   * be the same as the display.
   *
   * Since: cosmos-sdk 0.43
   */
  symbol?: string
}

/**
 * Params defines the parameters for the bank module.
 */
export interface CosmosBankV1Beta1Params {
  send_enabled?: { denom?: string; enabled?: boolean }[]
  default_send_enabled?: boolean
}

/**
* QueryAllBalancesResponse is the response type for the Query/AllBalances RPC
method.
*/
export interface CosmosBankV1Beta1QueryAllBalancesResponse {
  /** balances is the balances of all the coins. */
  balances?: { denom?: string; amount?: string }[]

  /** pagination defines the pagination in the response. */
  pagination?: { next_key?: string; total?: string }
}

/**
 * QueryBalanceResponse is the response type for the Query/Balance RPC method.
 */
export interface CosmosBankV1Beta1QueryBalanceResponse {
  /** balance is the balance of the coin. */
  balance?: { denom?: string; amount?: string }
}

/**
* QueryDenomMetadataResponse is the response type for the Query/DenomMetadata RPC
method.
*/
export interface CosmosBankV1Beta1QueryDenomMetadataResponse {
  /** metadata describes and provides all the client information for the requested token. */
  metadata?: {
    description?: string
    denom_units?: { denom?: string; exponent?: number; aliases?: string[] }[]
    base?: string
    display?: string
    name?: string
    symbol?: string
  }
}

/**
* QueryDenomsMetadataResponse is the response type for the Query/DenomsMetadata RPC
method.
*/
export interface CosmosBankV1Beta1QueryDenomsMetadataResponse {
  /** metadata provides the client information for all the registered tokens. */
  metadatas?: {
    description?: string
    denom_units?: { denom?: string; exponent?: number; aliases?: string[] }[]
    base?: string
    display?: string
    name?: string
    symbol?: string
  }[]

  /** pagination defines the pagination in the response. */
  pagination?: { next_key?: string; total?: string }
}

/**
 * QueryParamsResponse defines the response type for querying x/bank parameters.
 */
export interface CosmosBankV1Beta1QueryParamsResponse {
  /** Params defines the parameters for the bank module. */
  params?: {
    send_enabled?: { denom?: string; enabled?: boolean }[]
    default_send_enabled?: boolean
  }
}

/**
* QuerySpendableBalancesResponse defines the gRPC response structure for querying
an account's spendable balances.
*/
export interface CosmosBankV1Beta1QuerySpendableBalancesResponse {
  /** balances is the spendable balances of all the coins. */
  balances?: { denom?: string; amount?: string }[]

  /** pagination defines the pagination in the response. */
  pagination?: { next_key?: string; total?: string }
}

/**
 * QuerySupplyOfResponse is the response type for the Query/SupplyOf RPC method.
 */
export interface CosmosBankV1Beta1QuerySupplyOfResponse {
  /** amount is the supply of the coin. */
  amount?: { denom?: string; amount?: string }
}

export interface CosmosBankV1Beta1QueryTotalSupplyResponse {
  /** supply is the supply of the coins */
  supply?: { denom?: string; amount?: string }[]

  /**
   * pagination defines the pagination in the response.
   *
   * Since: cosmos-sdk 0.43
   */
  pagination?: { next_key?: string; total?: string }
}

/**
* SendEnabled maps coin denom to a send_enabled status (whether a denom is
sendable).
*/
export interface CosmosBankV1Beta1SendEnabled {
  denom?: string
  enabled?: boolean
}

/**
* DelegationDelegatorReward represents the properties
of a delegator's delegation reward.
*/
export interface CosmosDistributionV1Beta1DelegationDelegatorReward {
  validator_address?: string
  reward?: { denom?: string; amount?: string }[]
}

/**
 * Params defines the set of params for the distribution module.
 */
export interface CosmosDistributionV1Beta1Params {
  community_tax?: string
  base_proposer_reward?: string
  bonus_proposer_reward?: string
  withdraw_addr_enabled?: boolean
}

/**
* QueryCommunityPoolResponse is the response type for the Query/CommunityPool
RPC method.
*/
export interface CosmosDistributionV1Beta1QueryCommunityPoolResponse {
  /** pool defines community pool's coins. */
  pool?: { denom?: string; amount?: string }[]
}

/**
* QueryDelegationRewardsResponse is the response type for the
Query/DelegationRewards RPC method.
*/
export interface CosmosDistributionV1Beta1QueryDelegationRewardsResponse {
  /** rewards defines the rewards accrued by a delegation. */
  rewards?: { denom?: string; amount?: string }[]
}

/**
* QueryDelegationTotalRewardsResponse is the response type for the
Query/DelegationTotalRewards RPC method.
*/
export interface CosmosDistributionV1Beta1QueryDelegationTotalRewardsResponse {
  /** rewards defines all the rewards accrued by a delegator. */
  rewards?: {
    validator_address?: string
    reward?: { denom?: string; amount?: string }[]
  }[]

  /** total defines the sum of all the rewards. */
  total?: { denom?: string; amount?: string }[]
}

/**
* QueryDelegatorValidatorsResponse is the response type for the
Query/DelegatorValidators RPC method.
*/
export interface CosmosDistributionV1Beta1QueryDelegatorValidatorsResponse {
  /** validators defines the validators a delegator is delegating for. */
  validators?: string[]
}

/**
* QueryDelegatorWithdrawAddressResponse is the response type for the
Query/DelegatorWithdrawAddress RPC method.
*/
export interface CosmosDistributionV1Beta1QueryDelegatorWithdrawAddressResponse {
  /** withdraw_address defines the delegator address to query for. */
  withdraw_address?: string
}

/**
 * QueryParamsResponse is the response type for the Query/Params RPC method.
 */
export interface CosmosDistributionV1Beta1QueryParamsResponse {
  /** params defines the parameters of the module. */
  params?: {
    community_tax?: string
    base_proposer_reward?: string
    bonus_proposer_reward?: string
    withdraw_addr_enabled?: boolean
  }
}

export interface CosmosDistributionV1Beta1QueryValidatorCommissionResponse {
  /** commission defines the commision the validator received. */
  commission?: { commission?: { denom?: string; amount?: string }[] }
}

/**
* QueryValidatorOutstandingRewardsResponse is the response type for the
Query/ValidatorOutstandingRewards RPC method.
*/
export interface CosmosDistributionV1Beta1QueryValidatorOutstandingRewardsResponse {
  /**
   * ValidatorOutstandingRewards represents outstanding (un-withdrawn) rewards
   * for a validator inexpensive to track, allows simple sanity checks.
   */
  rewards?: { rewards?: { denom?: string; amount?: string }[] }
}

/**
* QueryValidatorSlashesResponse is the response type for the
Query/ValidatorSlashes RPC method.
*/
export interface CosmosDistributionV1Beta1QueryValidatorSlashesResponse {
  /** slashes defines the slashes the validator received. */
  slashes?: { validator_period?: string; fraction?: string }[]

  /** pagination defines the pagination in the response. */
  pagination?: { next_key?: string; total?: string }
}

/**
* ValidatorAccumulatedCommission represents accumulated commission
for a validator kept as a running counter, can be withdrawn at any time.
*/
export interface CosmosDistributionV1Beta1ValidatorAccumulatedCommission {
  commission?: { denom?: string; amount?: string }[]
}

/**
* ValidatorOutstandingRewards represents outstanding (un-withdrawn) rewards
for a validator inexpensive to track, allows simple sanity checks.
*/
export interface CosmosDistributionV1Beta1ValidatorOutstandingRewards {
  rewards?: { denom?: string; amount?: string }[]
}

/**
* ValidatorSlashEvent represents a validator slash event.
Height is implicit within the store key.
This is needed to calculate appropriate amount of staking tokens
for delegations which are withdrawn after a slash has occurred.
*/
export interface CosmosDistributionV1Beta1ValidatorSlashEvent {
  /** @format uint64 */
  validator_period?: string
  fraction?: string
}

export interface CosmosFeegrantV1Beta1Grant {
  /** granter is the address of the user granting an allowance of their funds. */
  granter?: string

  /** grantee is the address of the user being granted an allowance of another user's funds. */
  grantee?: string

  /** allowance can be any of basic and filtered fee allowance. */
  allowance?: { type_url?: string; value?: string }
}

/**
 * QueryAllowanceResponse is the response type for the Query/Allowance RPC method.
 */
export interface CosmosFeegrantV1Beta1QueryAllowanceResponse {
  /**
   * Grant is stored in the KVStore to record a grant with full context
   * allowance is a allowance granted for grantee by granter.
   */
  allowance?: {
    granter?: string
    grantee?: string
    allowance?: { type_url?: string; value?: string }
  }
}

/**
 * QueryAllowancesResponse is the response type for the Query/Allowances RPC method.
 */
export interface CosmosFeegrantV1Beta1QueryAllowancesResponse {
  /** allowances are allowance's granted for grantee by granter. */
  allowances?: {
    granter?: string
    grantee?: string
    allowance?: { type_url?: string; value?: string }
  }[]

  /** pagination defines an pagination for the response. */
  pagination?: { next_key?: string; total?: string }
}

/**
* QueryAllEvidenceResponse is the response type for the Query/AllEvidence RPC
method.
*/
export interface CosmosEvidenceV1Beta1QueryAllEvidenceResponse {
  /** evidence returns all evidences. */
  evidence?: { type_url?: string; value?: string }[]

  /** pagination defines the pagination in the response. */
  pagination?: { next_key?: string; total?: string }
}

/**
 * QueryEvidenceResponse is the response type for the Query/Evidence RPC method.
 */
export interface CosmosEvidenceV1Beta1QueryEvidenceResponse {
  /** evidence returns the requested evidence. */
  evidence?: { type_url?: string; value?: string }
}

/**
* Deposit defines an amount deposited by an account address to an active
proposal.
*/
export interface CosmosGovV1Beta1Deposit {
  /** @format uint64 */
  proposal_id?: string
  depositor?: string
  amount?: { denom?: string; amount?: string }[]
}

/**
 * DepositParams defines the params for deposits on governance proposals.
 */
export interface CosmosGovV1Beta1DepositParams {
  /** Minimum deposit for a proposal to enter voting period. */
  min_deposit?: { denom?: string; amount?: string }[]

  /** Maximum period for Atom holders to deposit on a proposal. Initial value: 2 months. */
  max_deposit_period?: string
}

/**
 * Proposal defines the core field members of a governance proposal.
 */
export interface CosmosGovV1Beta1Proposal {
  /** @format uint64 */
  proposal_id?: string

  /**
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   * Example 1: Pack and unpack a message in C++.
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   * Example 2: Pack and unpack a message in Java.
   *     Any any = Any.pack(foo);
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *  Example 3: Pack and unpack a message in Python.
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *  Example 4: Pack and unpack a message in Go
   *      foo := &pb.Foo{...}
   *      any, err := ptypes.MarshalAny(foo)
   *      ...
   *      foo := &pb.Foo{}
   *      if err := ptypes.UnmarshalAny(any, foo); err != nil {
   *        ...
   *      }
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   * JSON
   * ====
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   */
  content?: { type_url?: string; value?: string }

  /**
   * ProposalStatus enumerates the valid statuses of a proposal.
   *
   *  - PROPOSAL_STATUS_UNSPECIFIED: PROPOSAL_STATUS_UNSPECIFIED defines the default propopsal status.
   *  - PROPOSAL_STATUS_DEPOSIT_PERIOD: PROPOSAL_STATUS_DEPOSIT_PERIOD defines a proposal status during the deposit
   * period.
   *  - PROPOSAL_STATUS_VOTING_PERIOD: PROPOSAL_STATUS_VOTING_PERIOD defines a proposal status during the voting
   *  - PROPOSAL_STATUS_PASSED: PROPOSAL_STATUS_PASSED defines a proposal status of a proposal that has
   * passed.
   *  - PROPOSAL_STATUS_REJECTED: PROPOSAL_STATUS_REJECTED defines a proposal status of a proposal that has
   * been rejected.
   *  - PROPOSAL_STATUS_FAILED: PROPOSAL_STATUS_FAILED defines a proposal status of a proposal that has
   * failed.
   */
  status?:
    | 'PROPOSAL_STATUS_UNSPECIFIED'
    | 'PROPOSAL_STATUS_DEPOSIT_PERIOD'
    | 'PROPOSAL_STATUS_VOTING_PERIOD'
    | 'PROPOSAL_STATUS_PASSED'
    | 'PROPOSAL_STATUS_REJECTED'
    | 'PROPOSAL_STATUS_FAILED'

  /** TallyResult defines a standard tally for a governance proposal. */
  final_tally_result?: {
    yes?: string
    abstain?: string
    no?: string
    no_with_veto?: string
  }

  /** @format date-time */
  submit_time?: string

  /** @format date-time */
  deposit_end_time?: string
  total_deposit?: { denom?: string; amount?: string }[]

  /** @format date-time */
  voting_start_time?: string

  /** @format date-time */
  voting_end_time?: string
}

/**
* ProposalStatus enumerates the valid statuses of a proposal.

 - PROPOSAL_STATUS_UNSPECIFIED: PROPOSAL_STATUS_UNSPECIFIED defines the default propopsal status.
 - PROPOSAL_STATUS_DEPOSIT_PERIOD: PROPOSAL_STATUS_DEPOSIT_PERIOD defines a proposal status during the deposit
period.
 - PROPOSAL_STATUS_VOTING_PERIOD: PROPOSAL_STATUS_VOTING_PERIOD defines a proposal status during the voting
period.
 - PROPOSAL_STATUS_PASSED: PROPOSAL_STATUS_PASSED defines a proposal status of a proposal that has
passed.
 - PROPOSAL_STATUS_REJECTED: PROPOSAL_STATUS_REJECTED defines a proposal status of a proposal that has
been rejected.
 - PROPOSAL_STATUS_FAILED: PROPOSAL_STATUS_FAILED defines a proposal status of a proposal that has
failed.
*/
export enum CosmosGovV1Beta1ProposalStatus {
  PROPOSAL_STATUS_UNSPECIFIED = 'PROPOSAL_STATUS_UNSPECIFIED',
  PROPOSAL_STATUS_DEPOSIT_PERIOD = 'PROPOSAL_STATUS_DEPOSIT_PERIOD',
  PROPOSAL_STATUS_VOTING_PERIOD = 'PROPOSAL_STATUS_VOTING_PERIOD',
  PROPOSAL_STATUS_PASSED = 'PROPOSAL_STATUS_PASSED',
  PROPOSAL_STATUS_REJECTED = 'PROPOSAL_STATUS_REJECTED',
  PROPOSAL_STATUS_FAILED = 'PROPOSAL_STATUS_FAILED',
}

/**
 * QueryDepositResponse is the response type for the Query/Deposit RPC method.
 */
export interface CosmosGovV1Beta1QueryDepositResponse {
  /** deposit defines the requested deposit. */
  deposit?: {
    proposal_id?: string
    depositor?: string
    amount?: { denom?: string; amount?: string }[]
  }
}

/**
 * QueryDepositsResponse is the response type for the Query/Deposits RPC method.
 */
export interface CosmosGovV1Beta1QueryDepositsResponse {
  deposits?: {
    proposal_id?: string
    depositor?: string
    amount?: { denom?: string; amount?: string }[]
  }[]

  /** pagination defines the pagination in the response. */
  pagination?: { next_key?: string; total?: string }
}

/**
 * QueryParamsResponse is the response type for the Query/Params RPC method.
 */
export interface CosmosGovV1Beta1QueryParamsResponse {
  /** voting_params defines the parameters related to voting. */
  voting_params?: { voting_period?: string }

  /** deposit_params defines the parameters related to deposit. */
  deposit_params?: {
    min_deposit?: { denom?: string; amount?: string }[]
    max_deposit_period?: string
  }

  /** tally_params defines the parameters related to tally. */
  tally_params?: {
    quorum?: string
    threshold?: string
    veto_threshold?: string
  }
}

/**
 * QueryProposalResponse is the response type for the Query/Proposal RPC method.
 */
export interface CosmosGovV1Beta1QueryProposalResponse {
  /** Proposal defines the core field members of a governance proposal. */
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
}

/**
* QueryProposalsResponse is the response type for the Query/Proposals RPC
method.
*/
export interface CosmosGovV1Beta1QueryProposalsResponse {
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

  /** pagination defines the pagination in the response. */
  pagination?: { next_key?: string; total?: string }
}

/**
 * QueryTallyResultResponse is the response type for the Query/Tally RPC method.
 */
export interface CosmosGovV1Beta1QueryTallyResultResponse {
  /** tally defines the requested tally. */
  tally?: { yes?: string; abstain?: string; no?: string; no_with_veto?: string }
}

/**
 * QueryVoteResponse is the response type for the Query/Vote RPC method.
 */
export interface CosmosGovV1Beta1QueryVoteResponse {
  /** vote defined the queried vote. */
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
}

/**
 * QueryVotesResponse is the response type for the Query/Votes RPC method.
 */
export interface CosmosGovV1Beta1QueryVotesResponse {
  /** votes defined the queried votes. */
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

  /** pagination defines the pagination in the response. */
  pagination?: { next_key?: string; total?: string }
}

/**
 * TallyParams defines the params for tallying votes on governance proposals.
 */
export interface CosmosGovV1Beta1TallyParams {
  /**
   * Minimum percentage of total stake needed to vote for a result to be
   *  considered valid.
   * @format byte
   */
  quorum?: string

  /**
   * Minimum proportion of Yes votes for proposal to pass. Default value: 0.5.
   * @format byte
   */
  threshold?: string

  /**
   * Minimum value of Veto votes to Total votes ratio for proposal to be
   *  vetoed. Default value: 1/3.
   * @format byte
   */
  veto_threshold?: string
}

/**
 * TallyResult defines a standard tally for a governance proposal.
 */
export interface CosmosGovV1Beta1TallyResult {
  yes?: string
  abstain?: string
  no?: string
  no_with_veto?: string
}

/**
* Vote defines a vote on a governance proposal.
A Vote consists of a proposal ID, the voter, and the vote option.
*/
export interface CosmosGovV1Beta1Vote {
  /** @format uint64 */
  proposal_id?: string
  voter?: string

  /**
   * Deprecated: Prefer to use `options` instead. This field is set in queries
   * if and only if `len(options) == 1` and that option has weight 1. In all
   * other cases, this field will default to VOTE_OPTION_UNSPECIFIED.
   */
  option?:
    | 'VOTE_OPTION_UNSPECIFIED'
    | 'VOTE_OPTION_YES'
    | 'VOTE_OPTION_ABSTAIN'
    | 'VOTE_OPTION_NO'
    | 'VOTE_OPTION_NO_WITH_VETO'

  /** Since: cosmos-sdk 0.43 */
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

/**
* VoteOption enumerates the valid vote options for a given governance proposal.
 - VOTE_OPTION_UNSPECIFIED: VOTE_OPTION_UNSPECIFIED defines a no-op vote option.
 - VOTE_OPTION_YES: VOTE_OPTION_YES defines a yes vote option.
 - VOTE_OPTION_ABSTAIN: VOTE_OPTION_ABSTAIN defines an abstain vote option.
 - VOTE_OPTION_NO: VOTE_OPTION_NO defines a no vote option.
 - VOTE_OPTION_NO_WITH_VETO: VOTE_OPTION_NO_WITH_VETO defines a no with veto vote option.
*/
export enum CosmosGovV1Beta1VoteOption {
  VOTE_OPTION_UNSPECIFIED = 'VOTE_OPTION_UNSPECIFIED',
  VOTE_OPTION_YES = 'VOTE_OPTION_YES',
  VOTE_OPTION_ABSTAIN = 'VOTE_OPTION_ABSTAIN',
  VOTE_OPTION_NO = 'VOTE_OPTION_NO',
  VOTE_OPTION_NO_WITH_VETO = 'VOTE_OPTION_NO_WITH_VETO',
}

/**
 * VotingParams defines the params for voting on governance proposals.
 */
export interface CosmosGovV1Beta1VotingParams {
  /** Length of the voting period. */
  voting_period?: string
}

/**
* WeightedVoteOption defines a unit of vote for vote split.

Since: cosmos-sdk 0.43
*/
export interface CosmosGovV1Beta1WeightedVoteOption {
  /**
   * VoteOption enumerates the valid vote options for a given governance proposal.
   *  - VOTE_OPTION_UNSPECIFIED: VOTE_OPTION_UNSPECIFIED defines a no-op vote option.
   *  - VOTE_OPTION_YES: VOTE_OPTION_YES defines a yes vote option.
   *  - VOTE_OPTION_ABSTAIN: VOTE_OPTION_ABSTAIN defines an abstain vote option.
   *  - VOTE_OPTION_NO: VOTE_OPTION_NO defines a no vote option.
   *  - VOTE_OPTION_NO_WITH_VETO: VOTE_OPTION_NO_WITH_VETO defines a no with veto vote option.
   */
  option?:
    | 'VOTE_OPTION_UNSPECIFIED'
    | 'VOTE_OPTION_YES'
    | 'VOTE_OPTION_ABSTAIN'
    | 'VOTE_OPTION_NO'
    | 'VOTE_OPTION_NO_WITH_VETO'
  weight?: string
}

/**
 * Params represents the parameters used for by the slashing module.
 */
export interface CosmosSlashingV1Beta1Params {
  /** @format int64 */
  signed_blocks_window?: string

  /** @format byte */
  min_signed_per_window?: string
  downtime_jail_duration?: string

  /** @format byte */
  slash_fraction_double_sign?: string

  /** @format byte */
  slash_fraction_downtime?: string
}

export interface CosmosSlashingV1Beta1QueryParamsResponse {
  /** Params represents the parameters used for by the slashing module. */
  params?: {
    signed_blocks_window?: string
    min_signed_per_window?: string
    downtime_jail_duration?: string
    slash_fraction_double_sign?: string
    slash_fraction_downtime?: string
  }
}

export interface CosmosSlashingV1Beta1QuerySigningInfoResponse {
  /**
   * val_signing_info is the signing info of requested val cons address
   * ValidatorSigningInfo defines a validator's signing info for monitoring their
   * liveness activity.
   */
  val_signing_info?: {
    address?: string
    start_height?: string
    index_offset?: string
    jailed_until?: string
    tombstoned?: boolean
    missed_blocks_counter?: string
  }
}

export interface CosmosSlashingV1Beta1QuerySigningInfosResponse {
  /** info is the signing info of all validators */
  info?: {
    address?: string
    start_height?: string
    index_offset?: string
    jailed_until?: string
    tombstoned?: boolean
    missed_blocks_counter?: string
  }[]

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: { next_key?: string; total?: string }
}

/**
* ValidatorSigningInfo defines a validator's signing info for monitoring their
liveness activity.
*/
export interface CosmosSlashingV1Beta1ValidatorSigningInfo {
  address?: string

  /**
   * Height at which validator was first a candidate OR was unjailed
   * @format int64
   */
  start_height?: string

  /**
   * Index which is incremented each time the validator was a bonded
   * in a block and may have signed a precommit or not. This in conjunction with the
   * `SignedBlocksWindow` param determines the index in the `MissedBlocksBitArray`.
   * @format int64
   */
  index_offset?: string

  /**
   * Timestamp until which the validator is jailed due to liveness downtime.
   * @format date-time
   */
  jailed_until?: string

  /**
   * Whether or not a validator has been tombstoned (killed out of validator set). It is set
   * once the validator commits an equivocation or for any other configured misbehiavor.
   */
  tombstoned?: boolean

  /**
   * A counter kept to avoid unnecessary array reads.
   * Note that `Sum(MissedBlocksBitArray)` always equals `MissedBlocksCounter`.
   * @format int64
   */
  missed_blocks_counter?: string
}

/**
* BondStatus is the status of a validator.

 - BOND_STATUS_UNSPECIFIED: UNSPECIFIED defines an invalid validator status.
 - BOND_STATUS_UNBONDED: UNBONDED defines a validator that is not bonded.
 - BOND_STATUS_UNBONDING: UNBONDING defines a validator that is unbonding.
 - BOND_STATUS_BONDED: BONDED defines a validator that is bonded.
*/
export enum CosmosStakingV1Beta1BondStatus {
  BOND_STATUS_UNSPECIFIED = 'BOND_STATUS_UNSPECIFIED',
  BOND_STATUS_UNBONDED = 'BOND_STATUS_UNBONDED',
  BOND_STATUS_UNBONDING = 'BOND_STATUS_UNBONDING',
  BOND_STATUS_BONDED = 'BOND_STATUS_BONDED',
}

/**
 * Commission defines commission parameters for a given validator.
 */
export interface CosmosStakingV1Beta1Commission {
  /** commission_rates defines the initial commission rates to be used for creating a validator. */
  commission_rates?: {
    rate?: string
    max_rate?: string
    max_change_rate?: string
  }

  /**
   * update_time is the last time the commission rate was changed.
   * @format date-time
   */
  update_time?: string
}

/**
* CommissionRates defines the initial commission rates to be used for creating
a validator.
*/
export interface CosmosStakingV1Beta1CommissionRates {
  /** rate is the commission rate charged to delegators, as a fraction. */
  rate?: string

  /** max_rate defines the maximum commission rate which validator can ever charge, as a fraction. */
  max_rate?: string

  /** max_change_rate defines the maximum daily increase of the validator commission, as a fraction. */
  max_change_rate?: string
}

/**
* Delegation represents the bond with tokens held by an account. It is
owned by one delegator, and is associated with the voting power of one
validator.
*/
export interface CosmosStakingV1Beta1Delegation {
  /** delegator_address is the bech32-encoded address of the delegator. */
  delegator_address?: string

  /** validator_address is the bech32-encoded address of the validator. */
  validator_address?: string

  /** shares define the delegation shares received. */
  shares?: string
}

/**
* DelegationResponse is equivalent to Delegation except that it contains a
balance in addition to shares which is more suitable for client responses.
*/
export interface CosmosStakingV1Beta1DelegationResponse {
  /**
   * Delegation represents the bond with tokens held by an account. It is
   * owned by one delegator, and is associated with the voting power of one
   * validator.
   */
  delegation?: {
    delegator_address?: string
    validator_address?: string
    shares?: string
  }

  /**
   * Coin defines a token with a denomination and an amount.
   *
   * NOTE: The amount field is an Int which implements the custom method
   * signatures required by gogoproto.
   */
  balance?: { denom?: string; amount?: string }
}

/**
 * Description defines a validator description.
 */
export interface CosmosStakingV1Beta1Description {
  /** moniker defines a human-readable name for the validator. */
  moniker?: string

  /** identity defines an optional identity signature (ex. UPort or Keybase). */
  identity?: string

  /** website defines an optional website link. */
  website?: string

  /** security_contact defines an optional email for security contact. */
  security_contact?: string

  /** details define other optional details. */
  details?: string
}

/**
* HistoricalInfo contains header and validator information for a given block.
It is stored as part of staking module's state, which persists the `n` most
recent HistoricalInfo
(`n` is set by the staking module's `historical_entries` parameter).
*/
export interface CosmosStakingV1Beta1HistoricalInfo {
  /** Header defines the structure of a Tendermint block header. */
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

/**
 * Params defines the parameters for the staking module.
 */
export interface CosmosStakingV1Beta1Params {
  /** unbonding_time is the time duration of unbonding. */
  unbonding_time?: string

  /**
   * max_validators is the maximum number of validators.
   * @format int64
   */
  max_validators?: number

  /**
   * max_entries is the max entries for either unbonding delegation or redelegation (per pair/trio).
   * @format int64
   */
  max_entries?: number

  /**
   * historical_entries is the number of historical entries to persist.
   * @format int64
   */
  historical_entries?: number

  /** bond_denom defines the bondable coin denomination. */
  bond_denom?: string
}

/**
* Pool is used for tracking bonded and not-bonded token supply of the bond
denomination.
*/
export interface CosmosStakingV1Beta1Pool {
  not_bonded_tokens?: string
  bonded_tokens?: string
}

/**
 * QueryDelegationResponse is response type for the Query/Delegation RPC method.
 */
export interface CosmosStakingV1Beta1QueryDelegationResponse {
  /** delegation_responses defines the delegation info of a delegation. */
  delegation_response?: {
    delegation?: {
      delegator_address?: string
      validator_address?: string
      shares?: string
    }
    balance?: { denom?: string; amount?: string }
  }
}

/**
* QueryDelegatorDelegationsResponse is response type for the
Query/DelegatorDelegations RPC method.
*/
export interface CosmosStakingV1Beta1QueryDelegatorDelegationsResponse {
  /** delegation_responses defines all the delegations' info of a delegator. */
  delegation_responses?: {
    delegation?: {
      delegator_address?: string
      validator_address?: string
      shares?: string
    }
    balance?: { denom?: string; amount?: string }
  }[]

  /** pagination defines the pagination in the response. */
  pagination?: { next_key?: string; total?: string }
}

/**
* QueryUnbondingDelegatorDelegationsResponse is response type for the
Query/UnbondingDelegatorDelegations RPC method.
*/
export interface CosmosStakingV1Beta1QueryDelegatorUnbondingDelegationsResponse {
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

  /** pagination defines the pagination in the response. */
  pagination?: { next_key?: string; total?: string }
}

/**
* QueryDelegatorValidatorResponse response type for the
Query/DelegatorValidator RPC method.
*/
export interface CosmosStakingV1Beta1QueryDelegatorValidatorResponse {
  /** validator defines the the validator info. */
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
}

/**
* QueryDelegatorValidatorsResponse is response type for the
Query/DelegatorValidators RPC method.
*/
export interface CosmosStakingV1Beta1QueryDelegatorValidatorsResponse {
  /** validators defines the the validators' info of a delegator. */
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

  /** pagination defines the pagination in the response. */
  pagination?: { next_key?: string; total?: string }
}

/**
* QueryHistoricalInfoResponse is response type for the Query/HistoricalInfo RPC
method.
*/
export interface CosmosStakingV1Beta1QueryHistoricalInfoResponse {
  /** hist defines the historical info at the given height. */
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
}

/**
 * QueryParamsResponse is response type for the Query/Params RPC method.
 */
export interface CosmosStakingV1Beta1QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params?: {
    unbonding_time?: string
    max_validators?: number
    max_entries?: number
    historical_entries?: number
    bond_denom?: string
  }
}

/**
 * QueryPoolResponse is response type for the Query/Pool RPC method.
 */
export interface CosmosStakingV1Beta1QueryPoolResponse {
  /** pool defines the pool info. */
  pool?: { not_bonded_tokens?: string; bonded_tokens?: string }
}

/**
* QueryRedelegationsResponse is response type for the Query/Redelegations RPC
method.
*/
export interface CosmosStakingV1Beta1QueryRedelegationsResponse {
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

  /** pagination defines the pagination in the response. */
  pagination?: { next_key?: string; total?: string }
}

/**
* QueryDelegationResponse is response type for the Query/UnbondingDelegation
RPC method.
*/
export interface CosmosStakingV1Beta1QueryUnbondingDelegationResponse {
  /** unbond defines the unbonding information of a delegation. */
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
}

export interface CosmosStakingV1Beta1QueryValidatorDelegationsResponse {
  delegation_responses?: {
    delegation?: {
      delegator_address?: string
      validator_address?: string
      shares?: string
    }
    balance?: { denom?: string; amount?: string }
  }[]

  /** pagination defines the pagination in the response. */
  pagination?: { next_key?: string; total?: string }
}

export interface CosmosStakingV1Beta1QueryValidatorResponse {
  /** validator defines the the validator info. */
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
}

/**
* QueryValidatorUnbondingDelegationsResponse is response type for the
Query/ValidatorUnbondingDelegations RPC method.
*/
export interface CosmosStakingV1Beta1QueryValidatorUnbondingDelegationsResponse {
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

  /** pagination defines the pagination in the response. */
  pagination?: { next_key?: string; total?: string }
}

export interface CosmosStakingV1Beta1QueryValidatorsResponse {
  /** validators contains all the queried validators. */
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

  /** pagination defines the pagination in the response. */
  pagination?: { next_key?: string; total?: string }
}

/**
* Redelegation contains the list of a particular delegator's redelegating bonds
from a particular source validator to a particular destination validator.
*/
export interface CosmosStakingV1Beta1Redelegation {
  /** delegator_address is the bech32-encoded address of the delegator. */
  delegator_address?: string

  /** validator_src_address is the validator redelegation source operator address. */
  validator_src_address?: string

  /** validator_dst_address is the validator redelegation destination operator address. */
  validator_dst_address?: string

  /** entries are the redelegation entries. */
  entries?: {
    creation_height?: string
    completion_time?: string
    initial_balance?: string
    shares_dst?: string
  }[]
}

/**
 * RedelegationEntry defines a redelegation object with relevant metadata.
 */
export interface CosmosStakingV1Beta1RedelegationEntry {
  /**
   * creation_height  defines the height which the redelegation took place.
   * @format int64
   */
  creation_height?: string

  /**
   * completion_time defines the unix time for redelegation completion.
   * @format date-time
   */
  completion_time?: string

  /** initial_balance defines the initial balance when redelegation started. */
  initial_balance?: string

  /** shares_dst is the amount of destination-validator shares created by redelegation. */
  shares_dst?: string
}

/**
* RedelegationEntryResponse is equivalent to a RedelegationEntry except that it
contains a balance in addition to shares which is more suitable for client
responses.
*/
export interface CosmosStakingV1Beta1RedelegationEntryResponse {
  /** RedelegationEntry defines a redelegation object with relevant metadata. */
  redelegation_entry?: {
    creation_height?: string
    completion_time?: string
    initial_balance?: string
    shares_dst?: string
  }
  balance?: string
}

/**
* RedelegationResponse is equivalent to a Redelegation except that its entries
contain a balance in addition to shares which is more suitable for client
responses.
*/
export interface CosmosStakingV1Beta1RedelegationResponse {
  /**
   * Redelegation contains the list of a particular delegator's redelegating bonds
   * from a particular source validator to a particular destination validator.
   */
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
}

/**
* UnbondingDelegation stores all of a single delegator's unbonding bonds
for a single validator in an time-ordered list.
*/
export interface CosmosStakingV1Beta1UnbondingDelegation {
  /** delegator_address is the bech32-encoded address of the delegator. */
  delegator_address?: string

  /** validator_address is the bech32-encoded address of the validator. */
  validator_address?: string

  /** entries are the unbonding delegation entries. */
  entries?: {
    creation_height?: string
    completion_time?: string
    initial_balance?: string
    balance?: string
  }[]
}

/**
 * UnbondingDelegationEntry defines an unbonding object with relevant metadata.
 */
export interface CosmosStakingV1Beta1UnbondingDelegationEntry {
  /**
   * creation_height is the height which the unbonding took place.
   * @format int64
   */
  creation_height?: string

  /**
   * completion_time is the unix time for unbonding completion.
   * @format date-time
   */
  completion_time?: string

  /** initial_balance defines the tokens initially scheduled to receive at completion. */
  initial_balance?: string

  /** balance defines the tokens to receive at completion. */
  balance?: string
}

/**
* Validator defines a validator, together with the total amount of the
Validator's bond shares and their exchange rate to coins. Slashing results in
a decrease in the exchange rate, allowing correct calculation of future
undelegations without iterating over delegators. When coins are delegated to
this validator, the validator is credited with a delegation whose number of
bond shares is based on the amount of coins delegated divided by the current
exchange rate. Voting power can be calculated as total bonded shares
multiplied by exchange rate.
*/
export interface CosmosStakingV1Beta1Validator {
  /** operator_address defines the address of the validator's operator; bech encoded in JSON. */
  operator_address?: string

  /** consensus_pubkey is the consensus public key of the validator, as a Protobuf Any. */
  consensus_pubkey?: { type_url?: string; value?: string }

  /** jailed defined whether the validator has been jailed from bonded status or not. */
  jailed?: boolean

  /** status is the validator status (bonded/unbonding/unbonded). */
  status?:
    | 'BOND_STATUS_UNSPECIFIED'
    | 'BOND_STATUS_UNBONDED'
    | 'BOND_STATUS_UNBONDING'
    | 'BOND_STATUS_BONDED'

  /** tokens define the delegated tokens (incl. self-delegation). */
  tokens?: string

  /** delegator_shares defines total shares issued to a validator's delegators. */
  delegator_shares?: string

  /** description defines the description terms for the validator. */
  description?: {
    moniker?: string
    identity?: string
    website?: string
    security_contact?: string
    details?: string
  }

  /**
   * unbonding_height defines, if unbonding, the height at which this validator has begun unbonding.
   * @format int64
   */
  unbonding_height?: string

  /**
   * unbonding_time defines, if unbonding, the min time for the validator to complete unbonding.
   * @format date-time
   */
  unbonding_time?: string

  /** commission defines the commission parameters. */
  commission?: {
    commission_rates?: {
      rate?: string
      max_rate?: string
      max_change_rate?: string
    }
    update_time?: string
  }

  /** min_self_delegation is the validator's self declared minimum self delegation. */
  min_self_delegation?: string
}

export interface TendermintTypesBlockID {
  /** @format byte */
  hash?: string

  /** PartsetHeader */
  part_set_header?: { total?: number; hash?: string }
}

/**
 * Header defines the structure of a Tendermint block header.
 */
export interface TendermintTypesHeader {
  /**
   * basic block info
   * Consensus captures the consensus rules for processing a block in the
   * blockchain, including all blockchain data structures and the rules of the
   * application's state transition machine.
   */
  version?: { block?: string; app?: string }
  chain_id?: string

  /** @format int64 */
  height?: string

  /** @format date-time */
  time?: string

  /** prev block info */
  last_block_id?: {
    hash?: string
    part_set_header?: { total?: number; hash?: string }
  }

  /**
   * hashes of block data
   * @format byte
   */
  last_commit_hash?: string

  /** @format byte */
  data_hash?: string

  /**
   * hashes from the app output from the prev block
   * @format byte
   */
  validators_hash?: string

  /** @format byte */
  next_validators_hash?: string

  /** @format byte */
  consensus_hash?: string

  /** @format byte */
  app_hash?: string

  /** @format byte */
  last_results_hash?: string

  /**
   * consensus info
   * @format byte
   */
  evidence_hash?: string

  /** @format byte */
  proposer_address?: string
}

export interface TendermintTypesPartSetHeader {
  /** @format int64 */
  total?: number

  /** @format byte */
  hash?: string
}

/**
* Consensus captures the consensus rules for processing a block in the
blockchain, including all blockchain data structures and the rules of the
application's state transition machine.
*/
export interface TendermintVersionConsensus {
  /** @format uint64 */
  block?: string

  /** @format uint64 */
  app?: string
}

/**
 * ABCIMessageLog defines a structure containing an indexed tx ABCI message log.
 */
export interface CosmosBaseAbciV1Beta1ABCIMessageLog {
  /** @format int64 */
  msg_index?: number
  log?: string

  /**
   * Events contains a slice of Event objects that were emitted during some
   * execution.
   */
  events?: { type?: string; attributes?: { key?: string; value?: string }[] }[]
}

/**
* Attribute defines an attribute wrapper where the key and value are
strings instead of raw bytes.
*/
export interface CosmosBaseAbciV1Beta1Attribute {
  key?: string
  value?: string
}

/**
 * GasInfo defines tx execution gas context.
 */
export interface CosmosBaseAbciV1Beta1GasInfo {
  /**
   * GasWanted is the maximum units of work we allow this tx to perform.
   * @format uint64
   */
  gas_wanted?: string

  /**
   * GasUsed is the amount of gas actually consumed.
   * @format uint64
   */
  gas_used?: string
}

/**
 * Result is the union of ResponseFormat and ResponseCheckTx.
 */
export interface CosmosBaseAbciV1Beta1Result {
  /**
   * Data is any data returned from message or handler execution. It MUST be
   * length prefixed in order to separate data from multiple message executions.
   * @format byte
   */
  data?: string

  /** Log contains the log information from message or handler execution. */
  log?: string

  /**
   * Events contains a slice of Event objects that were emitted during message
   * or handler execution.
   */
  events?: {
    type?: string
    attributes?: { key?: string; value?: string; index?: boolean }[]
  }[]
}

/**
* StringEvent defines en Event object wrapper where all the attributes
contain key/value pairs that are strings instead of raw bytes.
*/
export interface CosmosBaseAbciV1Beta1StringEvent {
  type?: string
  attributes?: { key?: string; value?: string }[]
}

/**
* TxResponse defines a structure containing relevant tx data and metadata. The
tags are stringified and the log is JSON decoded.
*/
export interface CosmosBaseAbciV1Beta1TxResponse {
  /**
   * The block height
   * @format int64
   */
  height?: string

  /** The transaction hash. */
  txhash?: string

  /** Namespace for the Code */
  codespace?: string

  /**
   * Response code.
   * @format int64
   */
  code?: number

  /** Result bytes, if any. */
  data?: string

  /**
   * The output of the application's logger (raw string). May be
   * non-deterministic.
   */
  raw_log?: string

  /** The output of the application's logger (typed). May be non-deterministic. */
  logs?: {
    msg_index?: number
    log?: string
    events?: {
      type?: string
      attributes?: { key?: string; value?: string }[]
    }[]
  }[]

  /** Additional information. May be non-deterministic. */
  info?: string

  /**
   * Amount of gas requested for transaction.
   * @format int64
   */
  gas_wanted?: string

  /**
   * Amount of gas consumed by transaction.
   * @format int64
   */
  gas_used?: string

  /** The request transaction bytes. */
  tx?: { type_url?: string; value?: string }

  /**
   * Time of the previous block. For heights > 1, it's the weighted median of
   * the timestamps of the valid votes in the block.LastCommit. For height == 1,
   * it's genesis time.
   */
  timestamp?: string

  /**
   * Events defines all the events emitted by processing a transaction. Note,
   * these events include those emitted by processing all the messages and those
   * emitted from the ante handler. Whereas Logs contains the events, with
   * additional metadata, emitted only by processing the messages.
   *
   * Since: cosmos-sdk 0.42.11, 0.44.5, 0.45
   */
  events?: {
    type?: string
    attributes?: { key?: string; value?: string; index?: boolean }[]
  }[]
}

/**
* CompactBitArray is an implementation of a space efficient bit array.
This is used to ensure that the encoded data takes up a minimal amount of
space after proto encoding.
This is not thread safe, and is not intended for concurrent usage.
*/
export interface CosmosCryptoMultisigV1Beta1CompactBitArray {
  /** @format int64 */
  extra_bits_stored?: number

  /** @format byte */
  elems?: string
}

/**
* SignMode represents a signing mode with its own security guarantees.

 - SIGN_MODE_UNSPECIFIED: SIGN_MODE_UNSPECIFIED specifies an unknown signing mode and will be
rejected
 - SIGN_MODE_DIRECT: SIGN_MODE_DIRECT specifies a signing mode which uses SignDoc and is
verified with raw bytes from Tx
 - SIGN_MODE_TEXTUAL: SIGN_MODE_TEXTUAL is a future signing mode that will verify some
human-readable textual representation on top of the binary representation
from SIGN_MODE_DIRECT
 - SIGN_MODE_LEGACY_AMINO_JSON: SIGN_MODE_LEGACY_AMINO_JSON is a backwards compatibility mode which uses
Amino JSON and will be removed in the future
 - SIGN_MODE_EIP_191: SIGN_MODE_EIP_191 specifies the sign mode for EIP 191 signing on the Cosmos
SDK. Ref: https://eips.ethereum.org/EIPS/eip-191

Currently, SIGN_MODE_EIP_191 is registered as a SignMode enum variant,
but is not implemented on the SDK by default. To enable EIP-191, you need
to pass a custom `TxConfig` that has an implementation of
`SignModeHandler` for EIP-191. The SDK may decide to fully support
EIP-191 in the future.

Since: cosmos-sdk 0.45.2
*/
export enum CosmosTxSigningV1Beta1SignMode {
  SIGN_MODE_UNSPECIFIED = 'SIGN_MODE_UNSPECIFIED',
  SIGN_MODE_DIRECT = 'SIGN_MODE_DIRECT',
  SIGN_MODE_TEXTUAL = 'SIGN_MODE_TEXTUAL',
  SIGN_MODE_LEGACY_AMINO_JSON = 'SIGN_MODE_LEGACY_AMINO_JSON',
  SIGNMODEEIP191 = 'SIGN_MODE_EIP_191',
}

/**
* AuthInfo describes the fee and signer modes that are used to sign a
transaction.
*/
export interface CosmosTxV1Beta1AuthInfo {
  /**
   * signer_infos defines the signing modes for the required signers. The number
   * and order of elements must match the required signers from TxBody's
   * messages. The first element is the primary signer and the one which pays
   * the fee.
   */
  signer_infos?: CosmosTxV1Beta1SignerInfo[]

  /**
   * Fee is the fee and gas limit for the transaction. The first signer is the
   * primary signer and the one which pays the fee. The fee can be calculated
   * based on the cost of evaluating the body and doing signature verification
   * of the signers. This can be estimated via simulation.
   */
  fee?: {
    amount?: { denom?: string; amount?: string }[]
    gas_limit?: string
    payer?: string
    granter?: string
  }
}

/**
* BroadcastMode specifies the broadcast mode for the TxService.Broadcast RPC method.
 - BROADCAST_MODE_UNSPECIFIED: zero-value for mode ordering
 - BROADCAST_MODE_BLOCK: BROADCAST_MODE_BLOCK defines a tx broadcasting mode where the client waits for
the tx to be committed in a block. - BROADCAST_MODE_SYNC: BROADCAST_MODE_SYNC defines a tx broadcasting mode where the client waits for
a CheckTx execution response only. - BROADCAST_MODE_ASYNC: BROADCAST_MODE_ASYNC defines a tx broadcasting mode where the client returns
immediately.
*/
export enum CosmosTxV1Beta1BroadcastMode {
  BROADCAST_MODE_UNSPECIFIED = 'BROADCAST_MODE_UNSPECIFIED',
  BROADCAST_MODE_BLOCK = 'BROADCAST_MODE_BLOCK',
  BROADCAST_MODE_SYNC = 'BROADCAST_MODE_SYNC',
  BROADCAST_MODE_ASYNC = 'BROADCAST_MODE_ASYNC',
}

/**
* BroadcastTxRequest is the request type for the Service.BroadcastTxRequest
RPC method.
*/
export interface CosmosTxV1Beta1BroadcastTxRequest {
  /**
   * tx_bytes is the raw transaction.
   * @format byte
   */
  tx_bytes?: string

  /**
   * BroadcastMode specifies the broadcast mode for the TxService.Broadcast RPC method.
   *  - BROADCAST_MODE_UNSPECIFIED: zero-value for mode ordering
   *  - BROADCAST_MODE_BLOCK: BROADCAST_MODE_BLOCK defines a tx broadcasting mode where the client waits for
   * the tx to be committed in a block. - BROADCAST_MODE_SYNC: BROADCAST_MODE_SYNC defines a tx broadcasting mode where the client waits for
   * a CheckTx execution response only. - BROADCAST_MODE_ASYNC: BROADCAST_MODE_ASYNC defines a tx broadcasting mode where the client returns
   * immediately.
   */
  mode?:
    | 'BROADCAST_MODE_UNSPECIFIED'
    | 'BROADCAST_MODE_BLOCK'
    | 'BROADCAST_MODE_SYNC'
    | 'BROADCAST_MODE_ASYNC'
}

/**
* BroadcastTxResponse is the response type for the
Service.BroadcastTx method.
*/
export interface CosmosTxV1Beta1BroadcastTxResponse {
  /** tx_response is the queried TxResponses. */
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
}

/**
* Fee includes the amount of coins paid in fees and the maximum
gas to be used by the transaction. The ratio yields an effective "gasprice",
which must be above some miminum to be accepted into the mempool.
*/
export interface CosmosTxV1Beta1Fee {
  /** amount is the amount of coins to be paid as a fee */
  amount?: { denom?: string; amount?: string }[]

  /**
   * gas_limit is the maximum gas that can be used in transaction processing
   * before an out of gas error occurs
   * @format uint64
   */
  gas_limit?: string

  /**
   * if unset, the first signer is responsible for paying the fees. If set, the specified account must pay the fees.
   * the payer must be a tx signer (and thus have signed this field in AuthInfo).
   * setting this field does *not* change the ordering of required signers for the transaction.
   */
  payer?: string

  /**
   * if set, the fee payer (either the first signer or the value of the payer field) requests that a fee grant be used
   * to pay fees instead of the fee payer's own balance. If an appropriate fee grant does not exist or the chain does
   * not support fee grants, this will fail
   */
  granter?: string
}

/**
* GetBlockWithTxsResponse is the response type for the Service.GetBlockWithTxs method.

Since: cosmos-sdk 0.45.2
*/
export interface CosmosTxV1Beta1GetBlockWithTxsResponse {
  /** txs are the transactions in the block. */
  txs?: CosmosTxV1Beta1Tx[]

  /** BlockID */
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

  /** pagination defines a pagination for the response. */
  pagination?: { next_key?: string; total?: string }
}

/**
 * GetTxResponse is the response type for the Service.GetTx method.
 */
export interface CosmosTxV1Beta1GetTxResponse {
  /** tx is the queried transaction. */
  tx?: CosmosTxV1Beta1Tx

  /** tx_response is the queried TxResponses. */
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
}

/**
* GetTxsEventResponse is the response type for the Service.TxsByEvents
RPC method.
*/
export interface CosmosTxV1Beta1GetTxsEventResponse {
  /** txs is the list of queried transactions. */
  txs?: CosmosTxV1Beta1Tx[]

  /** tx_responses is the list of queried TxResponses. */
  tx_responses?: {
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
  }[]

  /** pagination defines a pagination for the response. */
  pagination?: { next_key?: string; total?: string }
}

/**
 * ModeInfo describes the signing mode of a single or nested multisig signer.
 */
export interface CosmosTxV1Beta1ModeInfo {
  /** single represents a single signer */
  single?: {
    mode?:
      | 'SIGN_MODE_UNSPECIFIED'
      | 'SIGN_MODE_DIRECT'
      | 'SIGN_MODE_TEXTUAL'
      | 'SIGN_MODE_LEGACY_AMINO_JSON'
      | 'SIGN_MODE_EIP_191'
  }

  /** multi represents a nested multisig signer */
  multi?: CosmosTxV1Beta1ModeInfoMulti
}

export interface CosmosTxV1Beta1ModeInfoMulti {
  /**
   * bitarray specifies which keys within the multisig are signing
   * CompactBitArray is an implementation of a space efficient bit array.
   * This is used to ensure that the encoded data takes up a minimal amount of
   * space after proto encoding.
   * This is not thread safe, and is not intended for concurrent usage.
   */
  bitarray?: { extra_bits_stored?: number; elems?: string }

  /**
   * mode_infos is the corresponding modes of the signers of the multisig
   * which could include nested multisig public keys
   */
  mode_infos?: CosmosTxV1Beta1ModeInfo[]
}

export interface CosmosTxV1Beta1ModeInfoSingle {
  /**
   * mode is the signing mode of the single signer
   * SignMode represents a signing mode with its own security guarantees.
   *  - SIGN_MODE_UNSPECIFIED: SIGN_MODE_UNSPECIFIED specifies an unknown signing mode and will be
   * rejected - SIGN_MODE_DIRECT: SIGN_MODE_DIRECT specifies a signing mode which uses SignDoc and is
   * verified with raw bytes from Tx - SIGN_MODE_TEXTUAL: SIGN_MODE_TEXTUAL is a future signing mode that will verify some
   * human-readable textual representation on top of the binary representation
   * from SIGN_MODE_DIRECT - SIGN_MODE_LEGACY_AMINO_JSON: SIGN_MODE_LEGACY_AMINO_JSON is a backwards compatibility mode which uses
   * Amino JSON and will be removed in the future - SIGN_MODE_EIP_191: SIGN_MODE_EIP_191 specifies the sign mode for EIP 191 signing on the Cosmos
   * SDK. Ref: https://eips.ethereum.org/EIPS/eip-191
   *
   * Currently, SIGN_MODE_EIP_191 is registered as a SignMode enum variant,
   * but is not implemented on the SDK by default. To enable EIP-191, you need
   * to pass a custom `TxConfig` that has an implementation of
   * `SignModeHandler` for EIP-191. The SDK may decide to fully support
   * EIP-191 in the future.
   * Since: cosmos-sdk 0.45.2
   */
  mode?:
    | 'SIGN_MODE_UNSPECIFIED'
    | 'SIGN_MODE_DIRECT'
    | 'SIGN_MODE_TEXTUAL'
    | 'SIGN_MODE_LEGACY_AMINO_JSON'
    | 'SIGN_MODE_EIP_191'
}

/**
* - ORDER_BY_UNSPECIFIED: ORDER_BY_UNSPECIFIED specifies an unknown sorting order. OrderBy defaults to ASC in this case. - ORDER_BY_ASC: ORDER_BY_ASC defines ascending order
 - ORDER_BY_DESC: ORDER_BY_DESC defines descending order
*/
export enum CosmosTxV1Beta1OrderBy {
  ORDER_BY_UNSPECIFIED = 'ORDER_BY_UNSPECIFIED',
  ORDER_BY_ASC = 'ORDER_BY_ASC',
  ORDER_BY_DESC = 'ORDER_BY_DESC',
}

/**
* SignerInfo describes the public key and signing mode of a single top-level
signer.
*/
export interface CosmosTxV1Beta1SignerInfo {
  /**
   * public_key is the public key of the signer. It is optional for accounts
   * that already exist in state. If unset, the verifier can use the required \
   * signer address for this position and lookup the public key.
   */
  public_key?: { type_url?: string; value?: string }

  /**
   * mode_info describes the signing mode of the signer and is a nested
   * structure to support nested multisig pubkey's
   * ModeInfo describes the signing mode of a single or nested multisig signer.
   */
  mode_info?: CosmosTxV1Beta1ModeInfo

  /**
   * sequence is the sequence of the account, which describes the
   * number of committed transactions signed by a given address. It is used to
   * prevent replay attacks.
   * @format uint64
   */
  sequence?: string
}

/**
* SimulateRequest is the request type for the Service.Simulate
RPC method.
*/
export interface CosmosTxV1Beta1SimulateRequest {
  /**
   * tx is the transaction to simulate.
   * Deprecated. Send raw tx bytes instead.
   */
  tx?: CosmosTxV1Beta1Tx

  /**
   * tx_bytes is the raw transaction.
   *
   * Since: cosmos-sdk 0.43
   * @format byte
   */
  tx_bytes?: string
}

/**
* SimulateResponse is the response type for the
Service.SimulateRPC method.
*/
export interface CosmosTxV1Beta1SimulateResponse {
  /** gas_info is the information about gas used in the simulation. */
  gas_info?: { gas_wanted?: string; gas_used?: string }

  /** result is the result of the simulation. */
  result?: {
    data?: string
    log?: string
    events?: {
      type?: string
      attributes?: { key?: string; value?: string; index?: boolean }[]
    }[]
  }
}

/**
 * Tx is the standard type used for broadcasting transactions.
 */
export interface CosmosTxV1Beta1Tx {
  /**
   * body is the processable content of the transaction
   * TxBody is the body of a transaction that all signers sign over.
   */
  body?: {
    messages?: { type_url?: string; value?: string }[]
    memo?: string
    timeout_height?: string
    extension_options?: { type_url?: string; value?: string }[]
    non_critical_extension_options?: { type_url?: string; value?: string }[]
  }

  /**
   * auth_info is the authorization related content of the transaction,
   * specifically signers, signer modes and fee
   * AuthInfo describes the fee and signer modes that are used to sign a
   * transaction.
   */
  auth_info?: CosmosTxV1Beta1AuthInfo

  /**
   * signatures is a list of signatures that matches the length and order of
   * AuthInfo's signer_infos to allow connecting signature meta information like
   * public key and signing mode by position.
   */
  signatures?: string[]
}

/**
 * TxBody is the body of a transaction that all signers sign over.
 */
export interface CosmosTxV1Beta1TxBody {
  /**
   * messages is a list of messages to be executed. The required signers of
   * those messages define the number and order of elements in AuthInfo's
   * signer_infos and Tx's signatures. Each required signer address is added to
   * the list only the first time it occurs.
   * By convention, the first required signer (usually from the first message)
   * is referred to as the primary signer and pays the fee for the whole
   * transaction.
   */
  messages?: { type_url?: string; value?: string }[]

  /**
   * memo is any arbitrary note/comment to be added to the transaction.
   * WARNING: in clients, any publicly exposed text should not be called memo,
   * but should be called `note` instead (see https://github.com/cosmos/cosmos-sdk/issues/9122).
   */
  memo?: string

  /**
   * timeout is the block height after which this transaction will not
   * be processed by the chain
   * @format uint64
   */
  timeout_height?: string

  /**
   * extension_options are arbitrary options that can be added by chains
   * when the default options are not sufficient. If any of these are present
   * and can't be handled, the transaction will be rejected
   */
  extension_options?: { type_url?: string; value?: string }[]

  /**
   * extension_options are arbitrary options that can be added by chains
   * when the default options are not sufficient. If any of these are present
   * and can't be handled, they will be ignored
   */
  non_critical_extension_options?: { type_url?: string; value?: string }[]
}

/**
* Event allows application developers to attach additional information to
ResponseBeginBlock, ResponseEndBlock, ResponseCheckTx and ResponseDeliverTx.
Later, transactions may be queried using these events.
*/
export interface TendermintAbciEvent {
  type?: string
  attributes?: { key?: string; value?: string; index?: boolean }[]
}

/**
 * EventAttribute is a single key-value pair, associated with an event.
 */
export interface TendermintAbciEventAttribute {
  /** @format byte */
  key?: string

  /** @format byte */
  value?: string
  index?: boolean
}

export interface TendermintCryptoPublicKey {
  /** @format byte */
  ed25519?: string

  /** @format byte */
  secp256k1?: string
}

export interface TendermintTypesBlock {
  /** Header defines the structure of a Tendermint block header. */
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

  /** Data contains the set of transactions included in the block */
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

  /**
   * Commit contains the evidence that a block was committed by a set of
   * validators.
   */
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

export enum TendermintTypesBlockIDFlag {
  BLOCK_ID_FLAG_UNKNOWN = 'BLOCK_ID_FLAG_UNKNOWN',
  BLOCK_ID_FLAG_ABSENT = 'BLOCK_ID_FLAG_ABSENT',
  BLOCK_ID_FLAG_COMMIT = 'BLOCK_ID_FLAG_COMMIT',
  BLOCK_ID_FLAG_NIL = 'BLOCK_ID_FLAG_NIL',
}

/**
* Commit contains the evidence that a block was committed by a set of
validators.
*/
export interface TendermintTypesCommit {
  /** @format int64 */
  height?: string

  /** @format int32 */
  round?: number

  /** BlockID */
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

/**
 * CommitSig is a part of the Vote included in a Commit.
 */
export interface TendermintTypesCommitSig {
  /** BlockIdFlag indicates which BlcokID the signature is for */
  block_id_flag?:
    | 'BLOCK_ID_FLAG_UNKNOWN'
    | 'BLOCK_ID_FLAG_ABSENT'
    | 'BLOCK_ID_FLAG_COMMIT'
    | 'BLOCK_ID_FLAG_NIL'

  /** @format byte */
  validator_address?: string

  /** @format date-time */
  timestamp?: string

  /** @format byte */
  signature?: string
}

export interface TendermintTypesData {
  /**
   * Txs that will be applied by state @ block.Height+1.
   * NOTE: not all txs here are valid.  We're just agreeing on the order first.
   * This means that block.AppHash does not include these txs.
   */
  txs?: string[]
}

/**
* DuplicateVoteEvidence contains evidence of a validator signed two conflicting
votes.
*/
export interface TendermintTypesDuplicateVoteEvidence {
  /**
   * Vote represents a prevote, precommit, or commit vote from validators for
   * consensus.
   */
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

  /**
   * Vote represents a prevote, precommit, or commit vote from validators for
   * consensus.
   */
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

  /** @format int64 */
  total_voting_power?: string

  /** @format int64 */
  validator_power?: string

  /** @format date-time */
  timestamp?: string
}

export interface TendermintTypesEvidence {
  /**
   * DuplicateVoteEvidence contains evidence of a validator signed two conflicting
   * votes.
   */
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

  /**
   * LightClientAttackEvidence contains evidence of a set of validators attempting
   * to mislead a light client.
   */
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
}

export interface TendermintTypesEvidenceList {
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

export interface TendermintTypesLightBlock {
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

/**
* LightClientAttackEvidence contains evidence of a set of validators attempting
to mislead a light client.
*/
export interface TendermintTypesLightClientAttackEvidence {
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

  /** @format int64 */
  common_height?: string
  byzantine_validators?: {
    address?: string
    pub_key?: { ed25519?: string; secp256k1?: string }
    voting_power?: string
    proposer_priority?: string
  }[]

  /** @format int64 */
  total_voting_power?: string

  /** @format date-time */
  timestamp?: string
}

export interface TendermintTypesSignedHeader {
  /** Header defines the structure of a Tendermint block header. */
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

  /**
   * Commit contains the evidence that a block was committed by a set of
   * validators.
   */
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

/**
* SignedMsgType is a type of signed message in the consensus.

 - SIGNED_MSG_TYPE_PREVOTE: Votes
 - SIGNED_MSG_TYPE_PROPOSAL: Proposals
*/
export enum TendermintTypesSignedMsgType {
  SIGNED_MSG_TYPE_UNKNOWN = 'SIGNED_MSG_TYPE_UNKNOWN',
  SIGNED_MSG_TYPE_PREVOTE = 'SIGNED_MSG_TYPE_PREVOTE',
  SIGNED_MSG_TYPE_PRECOMMIT = 'SIGNED_MSG_TYPE_PRECOMMIT',
  SIGNED_MSG_TYPE_PROPOSAL = 'SIGNED_MSG_TYPE_PROPOSAL',
}

export interface TendermintTypesValidator {
  /** @format byte */
  address?: string

  /** PublicKey defines the keys available for use with Tendermint Validators */
  pub_key?: { ed25519?: string; secp256k1?: string }

  /** @format int64 */
  voting_power?: string

  /** @format int64 */
  proposer_priority?: string
}

export interface TendermintTypesValidatorSet {
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

  /** @format int64 */
  total_voting_power?: string
}

/**
* Vote represents a prevote, precommit, or commit vote from validators for
consensus.
*/
export interface TendermintTypesVote {
  /**
   * SignedMsgType is a type of signed message in the consensus.
   *
   *  - SIGNED_MSG_TYPE_PREVOTE: Votes
   *  - SIGNED_MSG_TYPE_PROPOSAL: Proposals
   */
  type?:
    | 'SIGNED_MSG_TYPE_UNKNOWN'
    | 'SIGNED_MSG_TYPE_PREVOTE'
    | 'SIGNED_MSG_TYPE_PRECOMMIT'
    | 'SIGNED_MSG_TYPE_PROPOSAL'

  /** @format int64 */
  height?: string

  /** @format int32 */
  round?: number

  /** BlockID */
  block_id?: {
    hash?: string
    part_set_header?: { total?: number; hash?: string }
  }

  /** @format date-time */
  timestamp?: string

  /** @format byte */
  validator_address?: string

  /** @format int32 */
  validator_index?: number

  /** @format byte */
  signature?: string
}

/**
 * GetBlockByHeightResponse is the response type for the Query/GetBlockByHeight RPC method.
 */
export interface CosmosBaseTendermintV1Beta1GetBlockByHeightResponse {
  /** BlockID */
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
}

/**
 * GetLatestBlockResponse is the response type for the Query/GetLatestBlock RPC method.
 */
export interface CosmosBaseTendermintV1Beta1GetLatestBlockResponse {
  /** BlockID */
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
}

/**
 * GetLatestValidatorSetResponse is the response type for the Query/GetValidatorSetByHeight RPC method.
 */
export interface CosmosBaseTendermintV1Beta1GetLatestValidatorSetResponse {
  /** @format int64 */
  block_height?: string
  validators?: {
    address?: string
    pub_key?: { type_url?: string; value?: string }
    voting_power?: string
    proposer_priority?: string
  }[]

  /** pagination defines an pagination for the response. */
  pagination?: { next_key?: string; total?: string }
}

/**
 * GetNodeInfoResponse is the request type for the Query/GetNodeInfo RPC method.
 */
export interface CosmosBaseTendermintV1Beta1GetNodeInfoResponse {
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

  /** VersionInfo is the type for the GetNodeInfoResponse message. */
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
}

/**
 * GetSyncingResponse is the response type for the Query/GetSyncing RPC method.
 */
export interface CosmosBaseTendermintV1Beta1GetSyncingResponse {
  syncing?: boolean
}

/**
 * GetValidatorSetByHeightResponse is the response type for the Query/GetValidatorSetByHeight RPC method.
 */
export interface CosmosBaseTendermintV1Beta1GetValidatorSetByHeightResponse {
  /** @format int64 */
  block_height?: string
  validators?: {
    address?: string
    pub_key?: { type_url?: string; value?: string }
    voting_power?: string
    proposer_priority?: string
  }[]

  /** pagination defines an pagination for the response. */
  pagination?: { next_key?: string; total?: string }
}

export interface CosmosBaseTendermintV1Beta1Module {
  /** module path */
  path?: string

  /** module version */
  version?: string

  /** checksum */
  sum?: string
}

/**
 * Validator is the type for the validator-set.
 */
export interface CosmosBaseTendermintV1Beta1Validator {
  address?: string

  /**
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   * Example 1: Pack and unpack a message in C++.
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   * Example 2: Pack and unpack a message in Java.
   *     Any any = Any.pack(foo);
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *  Example 3: Pack and unpack a message in Python.
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *  Example 4: Pack and unpack a message in Go
   *      foo := &pb.Foo{...}
   *      any, err := ptypes.MarshalAny(foo)
   *      ...
   *      foo := &pb.Foo{}
   *      if err := ptypes.UnmarshalAny(any, foo); err != nil {
   *        ...
   *      }
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   * JSON
   * ====
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   */
  pub_key?: { type_url?: string; value?: string }

  /** @format int64 */
  voting_power?: string

  /** @format int64 */
  proposer_priority?: string
}

/**
 * VersionInfo is the type for the GetNodeInfoResponse message.
 */
export interface CosmosBaseTendermintV1Beta1VersionInfo {
  name?: string
  app_name?: string
  version?: string
  git_commit?: string
  build_tags?: string
  go_version?: string
  build_deps?: { path?: string; version?: string; sum?: string }[]

  /** Since: cosmos-sdk 0.43 */
  cosmos_sdk_version?: string
}

export interface TendermintP2PDefaultNodeInfo {
  protocol_version?: { p2p?: string; block?: string; app?: string }
  default_node_id?: string
  listen_addr?: string
  network?: string
  version?: string

  /** @format byte */
  channels?: string
  moniker?: string
  other?: { tx_index?: string; rpc_address?: string }
}

export interface TendermintP2PDefaultNodeInfoOther {
  tx_index?: string
  rpc_address?: string
}

export interface TendermintP2PProtocolVersion {
  /** @format uint64 */
  p2p?: string

  /** @format uint64 */
  block?: string

  /** @format uint64 */
  app?: string
}
