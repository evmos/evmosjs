/*
 * WARNING: This is an auto-generated file. Do not edit it directly.
 */

import { Token } from '../types.js'

export const axlUsdc: Token = {
  coinDenom: 'axlUSDC',
  minCoinDenom: 'uusdc',
  imgSrc:
    'https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/axlusdc.svg',
  pngSrc:
    'https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/axlusdc.png',
  type: 'IBC',
  exponent: '6',
  cosmosDenom:
    'ibc/63C53CBDF471D4E867366ABE2E631197257118D1B2BEAD1946C8A408F96464C3',
  description: "Circle's stablecoin on Axelar",
  name: 'USD Coin by Axelar',
  channel: 'channel-21',
  isEnabled: true,
  erc20Address: '0x15C3Eb3B621d1Bff62CbA1c9536B7c1AE9149b57',
  ibc: { sourceDenom: 'uusdc', source: 'Axelar' },
  hideFromTestnet: false,
  handledByExternalUI: [
    { url: 'https://satellite.money/', handlingAction: 'Deposit and Withdraw' },
  ],
  coingeckoId: 'usd-coin',
  category: 'stablecoin',
  coinSourcePrefix: 'axelar',
}
