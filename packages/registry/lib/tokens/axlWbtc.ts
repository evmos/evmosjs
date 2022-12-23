/*
 * WARNING: This is an auto-generated file. Do not edit it directly.
 */

import { Token } from '../types.js'

export const axlWbtc: Token = {
  coinDenom: 'axlWBTC',
  minCoinDenom: 'wbtc-satoshi',
  imgSrc:
    'https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/axlwbtc.svg',
  pngSrc:
    'https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/axlwbtc.png',
  type: 'IBC',
  exponent: '8',
  cosmosDenom:
    'ibc/C834CD421B4FD910BBC97E06E86B5E6F64EA2FE36D6AE0E4304C2E1FB1E7333C',
  description: 'Wrapped Bitcoin on Axelar',
  name: 'Wrapped Bitcoin on Axelar',
  channel: 'channel-21',
  isEnabled: true,
  erc20Address: '0xF5b24c0093b65408ACE53df7ce86a02448d53b25',
  ibc: { sourceDenom: 'wbtc-satoshi', source: 'Axelar' },
  hideFromTestnet: false,
  handledByExternalUI: [
    { url: 'https://satellite.money/', handlingAction: 'Deposit and Withdraw' },
  ],
  coingeckoId: 'wrapped-bitcoin',
  category: 'bitcoin',
  coinSourcePrefix: 'axelar',
}
