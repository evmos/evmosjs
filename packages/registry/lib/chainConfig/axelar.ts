/*
 * WARNING: This is an auto-generated file. Do not edit it directly.
 */

import { Chain } from '../types'

export const axelar: Chain = {
  prefix: 'axelar',
  gasPriceStep: { low: '0.00005', average: '0.00025', high: '0.0004' },
  bip44: { coinType: '118' },
  configurations: [
    {
      chainId: 'axelar-dojo-1',
      identifier: 'Axelar',
      chainName: 'Axelar',
      clientId: '07-tendermint-69',
      rest: [
        'https://lcd-axelar.imperator.co:443',
        'https://axelar-lcd.quickapi.com:443',
        'https://axelar-rest.chainode.tech:443',
        'https://axelar-lcd.qubelabs.io:443',
        'https://api-1.axelar.nodes.guru:443',
        'https://api-axelar-ia.cosmosia.notional.ventures/',
        'https://axelar-api.polkachu.com',
      ],
      jrpc: [
        'https://rpc-axelar.imperator.co:443',
        'https://axelar-rpc.quickapi.com:443',
        'https://axelar-rpc.chainode.tech:443',
        'https://axelar-rpc.pops.one:443',
        'https://axelar-rpc.qubelabs.io:443',
        'https://rpc-1.axelar.nodes.guru:443',
        'https://rpc-axelar-ia.cosmosia.notional.ventures/',
        'https://axelar-rpc.polkachu.com',
      ],
      rpc: ['https://axelar-grpc.quantnode.tech:9090'],
      currencies: [
        { coinDenom: 'AXL', coinMinDenom: 'uaxl', coinDecimals: '6' },
      ],
      source: {
        sourceChannel: 'channel-22',
        sourceIBCDenomToEvmos:
          'ibc/73D370D177CC659EA123B423D1AC194F0733537E5A346ECEA1DCBC8FEBB45FD3',
        destinationChannel: 'channel-21',
        jsonRPC: ['https://axelar-mainnet-rpc.allthatnode.com:26657'],
      },
      configurationType: 'mainnet',
      explorerTxUrl: 'https://www.mintscan.io/axelar/txs',
    },
  ],
}
