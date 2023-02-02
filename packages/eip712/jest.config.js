// const baseConfig = require('../../jest.config.js')

// module.exports = {
//   ...baseConfig,
// }
import { pathsToModuleNameMapper } from 'ts-jest'
// import baseConfig from '../../jest.config.js'

const config = {
  moduleNameMapper: {
    ...pathsToModuleNameMapper(
      {
        evmosjs: ['packages/evmosjs'],
        '@evmos/address-converter': ['./packages/address-converter/*'],
        '@evmos/eip712': ['packages/eip712'],
        '@evmos/proto': ['packages/proto'],
        '@evmos/provider': ['./packages/provider/*'],
        '@evmos/transactions': ['./packages/transactions/*'],
      },
      { prefix: '<rootDir>/../../' },
    ),
  },
  transform: {},
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
}

export default config
