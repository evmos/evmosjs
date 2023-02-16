/*
 * WARNING: This is an auto-generated file. Do not edit it directly.
 */

import { Token } from '../types.js'

export const gUsdt: Token = {
  coinDenom: 'gUSDT',
  minCoinDenom: 'uusdt',
  imgSrc: '',
  pngSrc:
    'https://raw.githubusercontent.com/cosmos/chain-registry/master/gravitybridge/images/gusdt.png',
  type: 'ERC-20',
  exponent: '6',
  cosmosDenom:
    'ibc/DF63978F803A2E27CA5CC9B7631654CCF0BBC788B3B7F0A10200508E37C70992',
  description: 'Tether USD via Gravity Bridge',
  name: 'Tether USD',
  channel: 'channel-8',
  isEnabled: true,
  erc20Address: '0xecEEEfCEE421D8062EF8d6b4D814efe4dc898265',
  ibc: {
    sourceDenom: 'gravity0xdAC17F958D2ee523a2206206994597C13D831ec7',
    source: 'Gravity',
  },
  hideFromTestnet: true,
  coingeckoId: 'tether',
  category: 'stablecoin',
  coinSourcePrefix: 'gravity',
}
