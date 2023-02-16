/*
 * WARNING: This is an auto-generated file. Do not edit it directly.
 */

import { Chain } from '../types'

export const stride: Chain = {
  prefix: 'stride',
  gasPriceStep: { low: '0.01', average: '0.025', high: '0.03' },
  bip44: { coinType: '118' },
  configurations: [
    {
      chainId: 'stride-1',
      chainName: 'stride',
      identifier: 'Stride',
      rpc: ['https://stride-rpc.polkachu.com:443'],
      rest: [
        'https://stride-api.polkachu.com',
        'https://stride.api.chandrastation.com',
        'https://api.stride.bh.rocks',
        'http://api-stride.nodeist.net',
        'https://stride-api.lavenderfive.com',
        'https://stride.rest.interchain.ivaldilabs.xyz',
        'https://api.stride.nodestake.top',
        'https://api-stride.d-stake.xyz',
      ],
      jrpc: [
        'https://stride-rpc.polkachu.com',
        'https://stride.rpc.chandrastation.com',
        'https://rpc.stride.bh.rocks',
        'http://rpc-stride.nodeist.net',
        'https://stride-rpc.lavenderfive.com',
        'https://stride.rpc.interchain.ivaldilabs.xyz',
        'https://rpc.stride.nodestake.top',
        'https://rpc-stride.d-stake.xyz',
        'https://rpc.stride.silentvalidator.com',
        'https://stride.rpc.kjnodes.com',
      ],
      clientId: '07-tendermint-80',
      currencies: [
        { coinDenom: 'STRD', coinMinDenom: 'ustrd', coinDecimals: '6' },
      ],
      source: {
        sourceChannel: 'channel-16',
        sourceIBCDenomToEvmos:
          'ibc/A3643FAA80C7DA7E72B23853340F6EAD4F3A698CDC39CE42FBF23F3A4A6E3803',
        destinationChannel: 'channel-27',
        jsonRPC: ['https://stride-rpc.polkachu.com:443'],
      },
      configurationType: 'mainnet',
      explorerTxUrl: 'https://www.mintscan.io/stride/txs',
    },
  ],
}
