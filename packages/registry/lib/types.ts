/*
 * WARNING: This is an auto-generated file. Do not edit it directly.
 */

/**
 * Chain Registry via Evmos Governance
 */
export interface Chain {
  /**
   * Chain prefix i.e. evmos
   */
  prefix: string
  gasPriceStep: {
    /**
     * Amount of gas for Low
     */
    low: string
    /**
     * Amount of gas for Average
     */
    average: string
    /**
     * Amount of gas for High
     */
    high: string
  }
  /**
   * Only applicable to EVMOS
   */
  feeMarket?: {
    /**
     * Enter appropriate gas cost
     */
    gas: string
    /**
     * Enter appropriate amount cost
     */
    amount: string
    /**
     * Enter appropriate convert cost
     */
    convert: string
  }
  bip44: {
    /**
     * Cosmos-based chains should be 118 while EVM-based chains are coin type 60
     */
    coinType: string
  }
  configurations?: {
    /**
     * Chain ID should specific to the environment, i.e. Testnet and Mainnet are different
     */
    chainId: string
    /**
     * Global identifier to be used by both client and backend as default reference for the chain
     */
    identifier: string
    /**
     * Name of the chain specific to the environment, i.e. Evmos Testnet
     */
    chainName: string
    /**
     * Query the 'evmosd query ibc channel client-state [port-id] [channel-id] [flags]' and copy over the client-id field
     */
    clientId: string
    /**
     * RPC endpoint link, usually port 1317
     */
    rpc: string[]
    /**
     * @minItems 3
     */
    rest: [string, string, string, ...string[]]
    /**
     * @minItems 3
     */
    jrpc?: [string, string, string, ...string[]]
    web3?: string[]
    currencies: {
      /**
       * Unit of the coin or symbol, i.e. EVMOS
       */
      coinDenom?: string
      /**
       * Smallest unit of the coin, i.e. aevmos
       */
      coinMinDenom?: string
      /**
       * Chain minimum coin denomination, i.e. aevmos
       */
      coinDecimals?: string
    }[]
    source: {
      /**
       * Source channel represents the third-party, i.e. Cosmos Hub side
       */
      sourceChannel: string
      /**
       * The value is ibc/[sha256 of 'transfer/${sourceChannel}/aevmos' phrase]. This value is required to pull in EVMOS from source chain to Evmos chain.
       */
      sourceIBCDenomToEvmos: string
      /**
       * Destination channel represents the main network side, i.e. EVMOS side
       */
      destinationChannel: string
      /**
       * Tendermint endpoint link or using port 26657
       *
       * @minItems 1
       */
      jsonRPC: [string, ...string[]]
    }
    /**
     * Explorer is only necessary for EVMOS network. All other Cosmos chains do not require this array object to be filled out
     */
    explorer?: {
      /**
       * Add the correct explorer data type
       */
      type: 'evm' | 'cosmos'
      /**
       * Link to explorer
       */
      link: string
    }[]
    /**
     * Must select either mainnet or testnet
     */
    configurationType: 'mainnet' | 'testnet'
    /**
     * Explorer tx URL for the chain, i.e https://www.mintscan.io/evmos/txs.
     */
    explorerTxUrl?: string
  }[]
}

/**
 * Token Schema Registry via Evmos Governance
 */
export interface Token {
  /**
   * Coin denom representation, i.e BTC
   */
  coinDenom: string
  /**
   * Minimal coin denom, i.e. satoshi for Bitcoin
   */
  minCoinDenom: string
  /**
   * Link must be SVG link only. If this image is coming from Github, make sure it has a pattern of 'https://raw.githubusercontent.com/cosmos/chain-registry/master/${chain}/images/${coin}.svg' and the link directly opens the image only and not the site of Github with the image.
   */
  imgSrc?: string
  /**
   * Link must be png source. If this image is coming from Github, make sure it has a pattern of 'https://raw.githubusercontent.com/cosmos/chain-registry/master/${chain}/images/${coin}.png' and the link directly opens the image only and not the site of Github with the image.
   */
  pngSrc: string
  type: 'IBC' | 'ERC-20' | 'CW20'
  exponent: string
  /**
   * Starting with ibc/...
   */
  cosmosDenom: string
  /**
   * Coin description goes here. This description will be used to describe the coin to the user. Please keep it concise.
   */
  description: string
  /**
   * Official name of the coin, i.e. EVMOS
   */
  name: string
  /**
   * Channel must be active. Check https://www.mintscan.io/evmos/relayers and find the right network to see which channel is open on both ends. The value wanted here is the From side of Evmos.
   */
  channel: string
  /**
   * Default to true
   */
  isEnabled?: boolean
  /**
   * Hex address only, i.e. 0x. Can be found on the Evmos API TokenPairs endpoint. This field will be populated when the token passes governance.
   */
  erc20Address: string
  ibc: {
    /**
     * There are two states for sourceDenom. Main chain coins like EVMOS will have their minCoinDenom listed here, however, coins from that ecosystem other than the main coin will require its prefix+hexAddress, i.e. gravity0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 for Gravity's USDC.grv
     */
    sourceDenom?: string
    /**
     * Chain name, i.e. Cosmos or Osmosis
     */
    source?: string
  }
  /**
   * If network does not have testnet and the coin is not in the testnet via governance or other means, mark this as true, otherwise, leave as is.
   */
  hideFromTestnet?: boolean
  /**
   * Official string coingecko uses to search and load the asset. Please insure the text matches exactly.
   */
  coingeckoId: string
  /**
   * Select a parental category of this asset. If a category does not exist, please feel free to create a PR to update the schema. For example, all wrapped token are part of the parent category, gWBTC is 'bitcoin'.
   */
  category:
    | 'bitcoin'
    | 'ethereum'
    | 'stablecoin'
    | 'cosmos'
    | 'polygon'
    | 'none'
  /**
   * Use this field to declare if the coin is part of a network's ecosystem, like for example, gWBTC is part of Gravity. If the coin is the main network coin, then the response will be itself still. the string here should match the network prefix.
   */
  coinSourcePrefix: string
  handledByExternalUI?: {
    /**
     * Link to the external UI site
     */
    url: string
    /**
     * Specify if the external UI is for Deposit, Withdraw, Convert, or others.
     */
    handlingAction:
      | 'Deposit'
      | 'Withdraw'
      | 'Convert'
      | 'Deposit and Withdraw'
      | 'All'
  }[]
}
