/*
 * WARNING: This is an auto-generated file. Do not edit it directly.
 */

import { Token } from '../types.js'

export const gWbtc: Token = {
  coinDenom: 'gWBTC',
  minCoinDenom: 'satoshi',
  imgSrc: '',
  pngSrc:
    'https://raw.githubusercontent.com/cosmos/chain-registry/master/gravitybridge/images/gwbtc.png',
  type: 'ERC-20',
  exponent: '8',
  cosmosDenom:
    'ibc/350B6DC0FF48E3BDB856F40A8259909E484259ED452B3F4F39A0FEF874F30F61',
  description: 'Wrapped Bitcoin via Gravity Bridge',
  name: 'Wrapped Bitcoin',
  channel: 'channel-8',
  isEnabled: true,
  erc20Address: '0x1D54EcB8583Ca25895c512A8308389fFD581F9c9',
  ibc: {
    sourceDenom: 'gravity0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    source: 'Gravity',
  },
  hideFromTestnet: true,
  coingeckoId: 'wrapped-bitcoin',
  category: 'bitcoin',
  coinSourcePrefix: 'gravity',
}
