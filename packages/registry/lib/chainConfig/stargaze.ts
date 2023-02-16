/*
 * WARNING: This is an auto-generated file. Do not edit it directly.
 */

import { Chain } from '../types'

export const stargaze: Chain = {
  prefix: 'stars',
  gasPriceStep: { low: '0.005', average: '0.025', high: '0.04' },
  bip44: { coinType: '118' },
  configurations: [
    {
      chainId: 'stargaze-1',
      chainName: 'Stargaze',
      identifier: 'Stars',
      clientId: '07-tendermint-41',
      rest: [
        'https://rest.stargaze-apis.com',
        'https://api.stargaze.pupmos.network',
        'https://api-stargaze.ezstaking.dev',
        'https://api.stars.kingnodes.com',
        'https://api-stargaze-ia.cosmosia.notional.ventures',
        'https://stargaze.c29r3.xyz:443/api',
        'https://stargaze-rapipc.polkachu.com',
        'https://api.stargaze.nodestake.top',
        'https://stargaze-api.ibs.team',
        'https://api-stargaze.d-stake.xyz',
        'https://api.stargaze.silentvalidator.com',
      ],
      jrpc: [
        'https://rpc.stargaze-apis.com',
        'https://rpc.stargaze.pupmos.network',
        'https://rpc-stargaze.ezstaking.dev',
        'https://rpc.stars.kingnodes.com',
        'https://stargaze-rpc.polkachu.com',
        'https://rpc-stargaze-ia.cosmosia.notional.ventures',
        'https://rpc.stargaze.nodestake.top',
        'https://stargaze-rpc.ibs.team',
        'https://rpc-stargaze.d-stake.xyz',
        'https://rpc.stargaze.silentvalidator.com',
      ],
      rpc: [
        'https://rpc.stargaze-apis.com/',
        'https://rpc-stargaze.pupmos.network',
        'https://rpc-stargaze.ezstaking.dev',
        'https://rpc.stars.kingnodes.com/',
        'https://stargaze-rpc.polkachu.com',
      ],
      currencies: [
        { coinDenom: 'STARS', coinMinDenom: 'ustars', coinDecimals: '6' },
      ],
      source: {
        sourceChannel: 'channel-46',
        sourceIBCDenomToEvmos:
          'ibc/F9C792DF71F960BB9EF698493B61E29C1EBB8FCD56B1F8BB08C86871F5F497C0',
        destinationChannel: 'channel-13',
        jsonRPC: ['stargaze-grpc.polkachu.com:13790'],
      },
      configurationType: 'mainnet',
      explorerTxUrl: 'https://www.mintscan.io/stargaze/txs',
    },
  ],
}
