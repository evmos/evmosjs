/*
 * WARNING: This is an auto-generated file. Do not edit it directly.
 */

import { Chain } from '../types'

export const teritori: Chain = {
  prefix: 'tori',
  gasPriceStep: { low: '0.01', average: '0.025', high: '0.03' },
  bip44: { coinType: '118' },
  configurations: [
    {
      chainId: 'teritori-1',
      chainName: 'teritori',
      identifier: 'Teritori',
      clientId: '07-tendermint-89',
      rest: [
        'https://teritori-api.lavenderfive.com:443',
        'https://teritori-api.polkachu.com',
        'https://api-teritori.nodeist.net',
        'https://api.teritori.nodestake.top',
        'https://rest.mainnet.teritori.com',
      ],
      jrpc: [
        'https://teritori-rpc.lavenderfive.com:443',
        'https://teritori-rpc.polkachu.com',
        'https://rpc-teritori.nodeist.net',
        'https://rpc.teritori.nodestake.top',
        'https://teritori.nodejumper.io',
      ],
      rpc: ['https://rpc.mainnet.teritori.com'],
      currencies: [
        { coinDenom: 'TORI', coinMinDenom: 'utori', coinDecimals: '6' },
      ],
      source: {
        sourceChannel: 'channel-1',
        sourceIBCDenomToEvmos:
          'IBC/18D5C3CDDF1DEE108CE4BF0A7E0262D94D11AB06A37F68EA38F70CC92C5D894F',
        destinationChannel: 'channel-35',
        jsonRPC: ['https://rpc.mainnet.teritori.com'],
      },
      configurationType: 'mainnet',
      explorerTxUrl: 'https://www.mintscan.io/teritori/txs',
    },
  ],
}
