const NAME = 'Cosmos Web3'
const VERSION = '1.0.0'
const VERIFYING_CONTRACT = 'cosmos'
const SALT = '0'

const createDomain = (chainId: number) => ({
  domain: {
    name: NAME,
    version: VERSION,
    chainId,
    verifyingContract: VERIFYING_CONTRACT,
    salt: SALT,
  },
})

export default createDomain
