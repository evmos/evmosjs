/*
 * WARNING: This is an auto-generated file. Do not edit it directly.
 */

import { Chain } from '../types'

export const gravity: Chain = {
  prefix: 'gravity',
  gasPriceStep: { low: '0.000', average: '0.000', high: '0.035' },
  bip44: { coinType: '118' },
  configurations: [
    {
      chainId: 'gravity-bridge-3',
      chainName: 'Gravity Bridge',
      identifier: 'Gravity',
      clientId: '07-tendermint-3',
      rest: [
        'https://gravitychain.io:1317',
        'https://lcd.gravity-bridge.ezstaking.io',
        'https://api-gravitybridge-ia.notional.ventures',
        'https://api.gravity-bridge.nodestake.top',
      ],
      jrpc: [
        'https://gravitychain.io:26657',
        'http://gravity-bridge-1-08.nodes.amhost.net:26657',
        'https://gravity-rpc.polkachu.com',
        'https://rpc.gravity-bridge.ezstaking.io',
        'https://rpc-gravitybridge-ia.notional.ventures',
        'https://rpc.gravity-bridge.nodestake.top',
      ],
      rpc: ['https://lcd-gravity-bridge.keplr.app:9090/'],
      currencies: [
        { coinDenom: 'GRAV', coinMinDenom: 'ugraviton', coinDecimals: '6' },
      ],
      source: {
        sourceChannel: 'channel-65',
        sourceIBCDenomToEvmos:
          'ibc/6B207CDA2448604B83A0674AADD830C490C1AAB7D568135E52589E96A00B6EEF',
        destinationChannel: 'channel-8',
        jsonRPC: ['https://gravitychain.io:26657/'],
      },
      configurationType: 'mainnet',
      explorerTxUrl: 'https://www.mintscan.io/gravity-bridge/txs',
    },
  ],
}
