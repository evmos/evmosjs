import createDomain, {
  NAME,
  VERSION,
  VERIFYING_CONTRACT,
  SALT,
} from './createDomain'

import TestUtils from '../tests/utils'

const { chainId } = TestUtils

describe('eip-712 createDomain unit tests', () => {
  it('correctly generates domain given chainId', () => {
    const domain = createDomain(chainId)

    const expDomain = {
      name: NAME,
      version: VERSION,
      chainId,
      verifyingContract: VERIFYING_CONTRACT,
      salt: SALT,
    }

    expect(domain).toStrictEqual(expDomain)
  })
})
