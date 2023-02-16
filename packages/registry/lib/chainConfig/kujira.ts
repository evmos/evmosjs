/*
 * WARNING: This is an auto-generated file. Do not edit it directly.
 */

import { Chain } from '../types'

export const kujira: Chain = {
  prefix: 'kujira',
  gasPriceStep: { low: '0.01', average: '0.025', high: '0.03' },
  bip44: { coinType: '118' },
  configurations: [
    {
      chainId: 'kaiyo-1',
      chainName: 'kujira',
      identifier: 'Kujira',
      clientId: '07-tendermint-53',
      rest: [
        'https://lcd.kaiyo.kujira.setten.io',
        'https://lcd-kujira.whispernode.com',
        'https://kujira-api.lavenderfive.com:443',
        'https://kujira-api.polkachu.com',
        'https://rest-kujira.ecostake.com',
        'https://api.kujira.chaintools.tech',
        'https://api-kujira-ia.cosmosia.notional.ventures',
        'https://kujira-lcd.wildsage.io',
        'https://api-kujira.nodeist.net',
        'https://kujira-api.ibs.team',
        'https://api-kujira.starsquid.io',
        'https://kujira.api.kjnodes.com',
        'https://kuji-api.kleomedes.network',
      ],
      jrpc: [
        'https://rpc-kujira.whispernode.com',
        'https://rpc.kaiyo.kujira.setten.io',
        'https://kujira-rpc.polkachu.com',
        'https://rpc-kujira.ecostake.com',
        'https://kujira-rpc.lavenderfive.com:443',
        'https://rpc.kujira.chaintools.tech',
        'https://rpc-kujira-ia.cosmosia.notional.ventures',
        'https://kujira-rpc.wildsage.io',
        'https://rpc-kujira.nodeist.net',
        'https://kujira-rpc.ibs.team',
        'https://rpc-kujira.starsquid.io',
        'https://kujira.rpc.kjnodes.com',
      ],
      rpc: ['https://rpc.kaiyo.kujira.setten.io'],
      currencies: [
        { coinDenom: 'KUJI', coinMinDenom: 'ukuji', coinDecimals: '6' },
      ],
      source: {
        sourceChannel: 'channel-23',
        sourceIBCDenomToEvmos:
          'ibc/F3AA7EF362EC5E791FE78A0F4CCC69FEE1F9A7485EB1A8CAB3F6601C00522F10',
        destinationChannel: 'channel-18',
        jsonRPC: ['https://rpc.kaiyo.kujira.setten.io'],
      },
      configurationType: 'mainnet',
      explorerTxUrl: 'https://www.mintscan.io/kujira/txs',
    },
  ],
}
