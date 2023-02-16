/*
 * WARNING: This is an auto-generated file. Do not edit it directly.
 */

import { Token } from '../types.js'

export const gWeth: Token = {
  coinDenom: 'gWETH',
  minCoinDenom: 'wei',
  imgSrc: '',
  pngSrc:
    'https://raw.githubusercontent.com/cosmos/chain-registry/master/gravitybridge/images/gweth.png',
  type: 'ERC-20',
  exponent: '18',
  cosmosDenom:
    'ibc/6B3FCE336C3465D3B72F7EFB4EB92FC521BC480FE9653F627A0BD0237DF213F3',
  description: 'Wrapped Ether via Gravity Bridge',
  name: 'Wrapped Ether',
  channel: 'channel-8',
  isEnabled: true,
  erc20Address: '0xc03345448969Dd8C00e9E4A85d2d9722d093aF8E',
  ibc: {
    sourceDenom: 'gravity0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    source: 'Gravity',
  },
  hideFromTestnet: true,
  coingeckoId: 'weth',
  category: 'ethereum',
  coinSourcePrefix: 'gravity',
}
