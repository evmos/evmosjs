/*
 * WARNING: This is an auto-generated file. Do not edit it directly.
 */

import { Token } from '../types.js'

export const axlUsdt: Token = {
  coinDenom: 'axlUSDT',
  minCoinDenom: 'uusdt',
  imgSrc:
    'https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/axlusdt.svg',
  pngSrc:
    'https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/axlusdt.png',
  type: 'IBC',
  exponent: '6',
  cosmosDenom:
    'ibc/F11C8CB7743E4B5FDCEA7C97F3B2C115E1931C5614B84C183DAC439B4C919D94',
  description: 'USD Tether Stablecoin on Axelar',
  name: 'USDT by Axelar',
  channel: 'channel-21',
  isEnabled: true,
  erc20Address: '0xe01C6D4987Fc8dCE22988DADa92d56dA701d0Fe0',
  ibc: { sourceDenom: 'uusdt', source: 'Axelar' },
  hideFromTestnet: true,
  handledByExternalUI: [
    { url: 'https://satellite.money/', handlingAction: 'Deposit and Withdraw' },
  ],
  coingeckoId: 'tether',
  category: 'stablecoin',
  coinSourcePrefix: 'axelar',
}
