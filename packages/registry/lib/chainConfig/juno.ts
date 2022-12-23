/*
 * WARNING: This is an auto-generated file. Do not edit it directly.
 */

import { Chain } from '../types'

export const juno: Chain = {
  prefix: 'juno',
  gasPriceStep: { low: '0.03', average: '0.04', high: '0.05' },
  bip44: { coinType: '118' },
  configurations: [
    {
      chainId: 'juno-1',
      chainName: 'Juno',
      identifier: 'Juno',
      clientId: '07-tendermint-14',
      rest: [
        'https://lcd-juno.itastakers.com',
        'https://rest-juno.ecostake.com',
        'https://juno-api.lavenderfive.com:443',
        'https://api.juno.pupmos.network',
        'https://api-juno-ia.cosmosia.notional.ventures',
        'https://juno-api.polkachu.com',
      ],
      jrpc: [
        'https://rpc-juno.itastakers.com',
        'https://rpc-juno.ecostake.com',
        'https://juno-rpc.polkachu.com',
        'https://juno-rpc.lavenderfive.com:443',
        'https://rpc-juno-ia.cosmosia.notional.ventures',
        'https://rpc.juno.chaintools.tech',
        'https://rpc.juno.pupmos.network',
      ],
      rpc: ['https://rpc-juno.whispernode.com'],
      currencies: [
        { coinDenom: 'JUNO', coinMinDenom: 'ujuno', coinDecimals: '6' },
      ],
      source: {
        sourceChannel: 'channel-70',
        sourceIBCDenomToEvmos:
          'ibc/9B990F95D85E7CA8C46544975776CAA20A3DEE3507EEA829A4000D8D65617F6D',
        destinationChannel: 'channel-5',
        jsonRPC: ['https://rpc-juno.whispernode.com'],
      },
      configurationType: 'mainnet',
      explorerTxUrl: 'https://www.mintscan.io/juno/txs',
    },
  ],
}
