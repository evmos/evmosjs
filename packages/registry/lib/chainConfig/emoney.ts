/*
 * WARNING: This is an auto-generated file. Do not edit it directly.
 */

import { Chain } from '../types'

export const emoney: Chain = {
  prefix: 'emoney',
  gasPriceStep: { low: '0.005', average: '0.025', high: '0.04' },
  bip44: { coinType: '118' },
  configurations: [
    {
      chainId: 'emoney-3',
      chainName: 'EMoney',
      identifier: 'Emoney',
      clientId: '07-tendermint-75',
      rest: [
        'https://lcd-emoney.keplr.app',
        'https://emoney.validator.network/api',
        'https://api-emoney-ia.cosmosia.notional.ventures',
        'https://api.emoney.freak12techno.io',
        'https://e-money-api.ibs.team',
        'https://api.emoney.bh.rocks',
      ],
      jrpc: [
        'https://rpc-emoney.keplr.app',
        'https://emoney.validator.network',
        'https://rpc.emoney.badgerbite.xyz:443',
        'https://rpc-emoney-ia.cosmosia.notional.ventures',
        'https://rpc.emoney.freak12techno.io',
        'https://e-money-rpc.ibs.team',
        'https://rpc-emoney.goldenratiostaking.net',
        'https://rpc.emoney.bh.rocks',
      ],
      rpc: ['https://rpc-emoney.keplr.app'],
      currencies: [
        { coinDenom: 'emd', coinMinDenom: 'eeur', coinDecimals: '6' },
      ],
      source: {
        sourceChannel: 'channel-28',
        sourceIBCDenomToEvmos:
          'ibc/10E2FD6A073F2746143FFF978B61C3813B773CBC0647E850A4A562FFFA8F9732',
        destinationChannel: 'channel-24',
        jsonRPC: ['https://rpc-emoney.keplr.app'],
      },
      configurationType: 'mainnet',
      explorerTxUrl: 'https://www.mintscan.io/emoney/txs',
    },
  ],
}
