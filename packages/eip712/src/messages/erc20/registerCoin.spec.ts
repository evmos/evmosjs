import {
  REGISTER_COIN_TYPES,
  createRegisterCoin,
  Metadata,
} from './registerCoin'
import TestUtils from '../../tests/utils'

describe('test RegisterERC20 type', () => {
  it('creates msg as expected', () => {
    const expTypes = {
      ContentValue: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'metadata', type: 'TypeMetadata[]' },
      ],
      TypeMetadata: [
        { name: 'description', type: 'string' },
        { name: 'denomUnits', type: 'TypeDenomUnit[]' },
        { name: 'base', type: 'string' },
        { name: 'display', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'symbol', type: 'string' },
        { name: 'uri', type: 'string' },
        { name: 'uriHash', type: 'string' },
      ],
      TypeDenomUnit: [
        { name: 'denom', type: 'string' },
        { name: 'exponent', type: 'number' },
        { name: 'aliases', type: 'string[]' },
      ],
    }

    expect(REGISTER_COIN_TYPES).toStrictEqual(expTypes)
  })

  it('creates msg as expected using the create function', () => {
    const title = 'Register ERC20s for IBC coins'
    const description = title
    const { ibcDenom1, ibcDenom2 } = TestUtils
    const meta1: Metadata = {
      description: 'This is one IBC coin',
      denomUnits: [
        { denom: ibcDenom1, exponent: 0, aliases: ['stuosmo'] },
        { denom: 'stosmo', exponent: 6, aliases: [] },
      ],
      base: ibcDenom1,
      display: 'stosmo',
      name: 'Stride Staked Osmo',
      symbol: 'stOSMO',
      uri: '',
      uriHash: '',
    }
    const meta2: Metadata = {
      description: 'This is another IBC coin',
      denomUnits: [
        { denom: ibcDenom2, exponent: 0, aliases: ['stujuno'] },
        { denom: 'stjuno', exponent: 6, aliases: [] },
      ],
      base: ibcDenom2,
      display: 'stjuno',
      name: 'Stride Staked Juno',
      symbol: 'stJUNO',
      uri: '',
      uriHash: '',
    }
    const metadata = [meta1, meta2]

    const msg = createRegisterCoin(title, description, metadata)

    const expMsg = {
      type: 'erc20/RegisterCoinProposal',
      value: {
        title,
        description,
        metadata,
      },
    }

    expect(msg).toStrictEqual(expMsg)
  })
})
