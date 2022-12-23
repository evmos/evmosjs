/*
 * WARNING: This is an auto-generated file. Do not edit it directly.
 */

import { Chain } from '../types'

export const regen: Chain = {
  prefix: 'regen',
  gasPriceStep: { low: '0.005', average: '0.025', high: '0.04' },
  bip44: { coinType: '118' },
  configurations: [
    {
      chainId: 'regen-1',
      chainName: 'Regen Network',
      identifier: 'Regen',
      clientId: '07-tendermint-67',
      rest: [
        'https://rest-regen.ecostake.com',
        'http://public-rpc.regen.vitwit.com:1317',
        'https://regen.stakesystems.io',
        'https://api-regen-ia.cosmosia.notional.ventures',
      ],
      jrpc: [
        'https://rpc-regen.ecostake.com',
        'http://public-rpc.regen.vitwit.com:26657',
        'https://regen.stakesystems.io:2053',
        'http://rpc.regen.forbole.com:80',
        'https://rpc-regen-ia.cosmosia.notional.ventures',
      ],
      rpc: ['https://rpc-regen.ecostake.com'],
      currencies: [
        { coinDenom: 'REGEN', coinMinDenom: 'uregen', coinDecimals: '6' },
      ],
      source: {
        sourceChannel: 'channel-44',
        sourceIBCDenomToEvmos:
          'ibc/3F0E005C3822C1BBA60E7CC368630441B1F5055FBD58A004F729A98FE1AA17B0',
        destinationChannel: 'channel-20',
        jsonRPC: ['https://rpc-regen.ecostake.com'],
      },
      configurationType: 'mainnet',
      explorerTxUrl: 'https://www.mintscan.io/regen/txs',
    },
  ],
}
