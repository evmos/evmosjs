/*
 * WARNING: This is an auto-generated file. Do not edit it directly.
 */

import { Token } from '../types.js'

export const axlDai: Token = {
  coinDenom: 'axlDAI',
  minCoinDenom: 'dai-wei',
  imgSrc:
    'https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/axldai.svg',
  pngSrc:
    'https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/axldai.png',
  type: 'IBC',
  exponent: '18',
  cosmosDenom:
    'ibc/CBA4784581AD4BEF308C536A3CD44D4A940A520E61B0D1E4FB115C539F61DEE5',
  description: 'DAI Stablecoin on Axelar',
  name: 'DAI by Axelar',
  channel: 'channel-21',
  isEnabled: true,
  erc20Address: '0x4A2a90D444DbB7163B5861b772f882BbA394Ca67',
  ibc: { sourceDenom: 'axldai', source: 'Axelar' },
  hideFromTestnet: true,
  handledByExternalUI: [
    { url: 'https://satellite.money/', handlingAction: 'Deposit and Withdraw' },
  ],
  coingeckoId: 'dai',
  category: 'stablecoin',
  coinSourcePrefix: 'axelar',
}
