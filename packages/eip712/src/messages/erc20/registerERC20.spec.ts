import { REGISTER_ERC20_TYPES, createRegisterERC20 } from './registerERC20'
import TestUtils from '../../tests/utils'

describe('test RegisterERC20 type', () => {
  it('creates type as expected', () => {
    const expTypes = {
      ContentValue: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'erc20addresses', type: 'string[]' },
      ],
    }

    expect(REGISTER_ERC20_TYPES).toStrictEqual(expTypes)
  })

  it('creates msg as expected using the create function', () => {
    const title = 'Register ERC20s'
    const description = title
    const { addrHex1, addrHex2 } = TestUtils
    const erc20addresses = [addrHex1, addrHex2]

    const msg = createRegisterERC20(title, description, erc20addresses)

    const expMsg = {
      type: 'erc20/RegisterERC20Proposal',
      value: {
        title,
        description,
        erc20addresses,
      },
    }

    expect(msg).toStrictEqual(expMsg)
  })
})
