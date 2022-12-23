/*
 * WARNING: This is an auto-generated file. Do not edit it directly.
 */

import { Chain } from '../types'

export const atom: Chain = {
  prefix: 'cosmos',
  gasPriceStep: { low: '0.005', average: '0.025', high: '0.04' },
  bip44: { coinType: '118' },
  configurations: [
    {
      chainId: 'cosmoshub-4',
      identifier: 'Cosmos',
      chainName: 'Cosmos Hub',
      clientId: '07-tendermint-3',
      rest: [
        'https://cosmos-lcd.quickapi.com:443',
        'https://lcd-cosmoshub.whispernode.com',
        'https://lcd-cosmoshub.blockapsis.com',
        'https://rest-cosmoshub.ecostake.com',
        'https://api.cosmoshub.pupmos.network',
        'https://lcd.cosmos.ezstaking.io',
        'https://api-cosmoshub-ia.notional.ventures/',
      ],
      jrpc: [
        'https://cosmos-rpc.quickapi.com:443',
        'https://rpc-cosmoshub.whispernode.com',
        'https://rpc-cosmoshub.blockapsis.com',
        'https://cosmoshub.validator.network/',
        'https://rpc.cosmoshub.strange.love',
        'https://rpc.cosmos.network:443',
        'https://rpc-cosmoshub.ecostake.com',
        'https://rpc.cosmoshub.pupmos.network',
        'https://cosmos-rpc.polkachu.com',
        'https://rpc.cosmos.ezstaking.io',
        'https://rpc-cosmoshub-ia.notional.ventures/',
      ],
      rpc: ['https://cosmoshub-rpc.stakely.io/'],
      currencies: [
        { coinDenom: 'ATOM', coinMinDenom: 'uatom', coinDecimals: '6' },
      ],
      source: {
        sourceChannel: 'channel-292',
        sourceIBCDenomToEvmos:
          'ibc/19DD710119533524061885A6F190B18AF28D9537E2BAE37F32A62C1A25979287',
        destinationChannel: 'channel-3',
        jsonRPC: ['https://cosmoshub-rpc.stakely.io/'],
      },
      configurationType: 'mainnet',
      explorerTxUrl: 'https://www.mintscan.io/cosmos/txs',
    },
  ],
}
