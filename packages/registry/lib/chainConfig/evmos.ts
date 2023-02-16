/*
 * WARNING: This is an auto-generated file. Do not edit it directly.
 */

import { Chain } from '../types'

export const evmos: Chain = {
  prefix: 'evmos',
  gasPriceStep: {
    low: '10000000000',
    average: '25000000000',
    high: '40000000000',
  },
  feeMarket: { gas: '350000', amount: '50000', convert: '10500000' },
  bip44: { coinType: '60' },
  configurations: [
    {
      chainId: 'evmos_9001-2',
      chainName: 'Evmos',
      identifier: 'Evmos',
      clientId: '',
      rest: [
        'https://lcd-evmos.whispernode.com',
        'https://rest.bd.evmos.org:1317',
        'https://lcd.evmos.ezstaking.io',
        'https://api-evmos-ia.cosmosia.notional.ventures',
        'https://lcd.evmos.posthuman.digital',
        'https://api.evmos.interbloc.org',
        'https://lcd.evmos.bh.rocks',
      ],
      jrpc: [
        'https://rpc-evmos.whispernode.com',
        'https://tendermint.bd.evmos.org:26657',
        'https://rpc.evmos.ezstaking.io',
        'https://rpc-evmos-ia.cosmosia.notional.ventures:443',
        'https://rpc.evmos.posthuman.digital',
        'https://rpc.evmos.interbloc.org',
        'https://rpc.evmos.nodestake.top',
        'https://rpc-evmos.ecostake.com',
        'https://rpc.evmos.bh.rocks',
      ],
      web3: [
        'https://jsonrpc-rpcaas-evmos-mainnet.ubiquity.blockdaemon.tech',
        'https://eth.bd.evmos.org:8545',
        'https://jsonrpc-evmos-ia.cosmosia.notional.ventures',
        'https://evmos-json-rpc.stakely.io',
        'https://jsonrpc.evmos.nodestake.top',
        'https://json-rpc.evmos.bh.rocks',
      ],
      rpc: ['https://grpc.bd.evmos.org:9090'],
      currencies: [
        { coinDenom: 'EVMOS', coinMinDenom: 'aevmos', coinDecimals: '18' },
      ],
      source: {
        sourceChannel: '',
        sourceIBCDenomToEvmos: '',
        destinationChannel: '',
        jsonRPC: [''],
      },
      explorer: [
        { link: 'https://mintscan.io/evmos', type: 'cosmos' },
        { link: 'https://evm.evmos.org', type: 'evm' },
      ],
      configurationType: 'mainnet',
      explorerTxUrl: 'https://www.mintscan.io/evmos/txs',
    },
  ],
}
