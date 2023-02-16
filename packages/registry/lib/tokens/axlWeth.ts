/*
 * WARNING: This is an auto-generated file. Do not edit it directly.
 */

import { Token } from '../types.js'

export const axlWeth: Token = {
  coinDenom: 'axlWETH',
  minCoinDenom: 'weth-wei',
  imgSrc:
    'https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/axlweth.svg',
  pngSrc:
    'https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/axlweth.png',
  type: 'IBC',
  exponent: '18',
  cosmosDenom:
    'ibc/356EDE917394B2AEF7F915EB24FA683A0CCB8D16DD4ECCEDC2AD0CEC6B66AC81',
  description: 'Wrapped Ether on Axelar',
  name: 'Wrapped Ether on Axelar',
  channel: 'channel-21',
  isEnabled: true,
  erc20Address: '0x50dE24B3f0B3136C50FA8A3B8ebc8BD80a269ce5',
  ibc: { sourceDenom: 'weth-wei', source: 'Axelar' },
  hideFromTestnet: false,
  handledByExternalUI: [
    { url: 'https://satellite.money/', handlingAction: 'Deposit and Withdraw' },
  ],
  coingeckoId: 'weth',
  category: 'ethereum',
  coinSourcePrefix: 'axelar',
}
