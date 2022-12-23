/*
 * WARNING: This is an auto-generated file. Do not edit it directly.
 */

import { Chain } from '../types'

export const osmosis: Chain = {
  prefix: 'osmo',
  gasPriceStep: { low: '0.005', average: '0.025', high: '0.04' },
  bip44: { coinType: '118' },
  configurations: [
    {
      chainId: 'osmosis-1',
      chainName: 'Osmosis',
      identifier: 'Osmosis',
      clientId: '07-tendermint-0',
      rest: [
        'https://osmosis-lcd.quickapi.com:443',
        'https://lcd-osmosis.whispernode.com',
        'https://lcd-osmosis.blockapsis.com',
        'https://rest-osmosis.ecostake.com',
        'https://api-osmosis-ia.notional.ventures',
        'https://lcd.osmosis.zone',
        'https://api.osmosis.interbloc.org',
      ],
      jrpc: [
        'https://osmosis-rpc.quickapi.com:443',
        'https://rpc-osmosis.whispernode.com',
        'https://osmosis.validator.network',
        'https://rpc-osmosis.blockapsis.com',
        'https://rpc-osmosis.ecostake.com',
        'https://osmosis-rpc.polkachu.com',
        'https://rpc-osmosis-ia.notional.ventures',
        'https://rpc.osmosis.zone',
        'https://rpc.osmosis.interbloc.org',
      ],
      rpc: [''],
      currencies: [
        { coinDenom: 'OSMO', coinMinDenom: 'uosmo', coinDecimals: '6' },
      ],
      source: {
        sourceChannel: 'channel-204',
        sourceIBCDenomToEvmos:
          'ibc/6AE98883D4D5D5FF9E50D7130F1305DA2FFA0C652D1DD9C123657C6B4EB2DF8A',
        destinationChannel: 'channel-0',
        jsonRPC: ['https://rpc-osmosis.blockapsis.com/'],
      },
      configurationType: 'mainnet',
      explorerTxUrl: 'https://www.mintscan.io/osmosis/txs',
    },
  ],
}
