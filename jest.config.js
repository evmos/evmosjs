const { pathsToModuleNameMapper } = require('ts-jest')
// const { compilerOptions } = require('./tsconfig')

// import { pathsToModuleNameMapper } from 'ts-jest'

// module.exports = {
//   // A list of reporter names that Jest uses when writing coverage reports
//   coverageReporters: ['json', 'html'],
//   // An array of file extensions your modules use
//   moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],

//   moduleNameMapper: {
//     ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
//   },
//   // A preset that is used as a base for Jest's configuration.
//   // Use Default-ESM to support imports from node_modules.
//   preset: 'ts-jest/presets/default-esm',
//   // The test environment that will be used for testing
//   testEnvironment: 'node',
//   // transform: {
//   //   '^.+\\.[tj]sx?$': ['ts-jest', { useESM: true }],
//   // },
//   // transformIgnorePatterns: [],
//   extensionsToTreatAsEsm: ['.ts'],
// }

// const config = {
module.exports = {
  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['json', 'html'],
  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],

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
      { prefix: '<rootDir>/' },
    ),
  },
  // moduleNameMapper: {
  //   '^(\\.{1,2}/.*)\\.[j|t]s$': '$1',
  // },
  // A preset that is used as a base for Jest's configuration.
  // Use Default-ESM to support imports from node_modules.
  // preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts'],
  // verbose: true,
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    // '^.+\\.[tj]sx?$': ['ts-jest', { useESM: true }],
  },
  // projects: [
  //   '<rootDir>',
  //   '<rootDir>/packages/transactions/*',
  //   '<rootDir>/packages/proto/*',
  // ],
  transformIgnorePatterns: ['/node_modules/(?!(@buf|@bufbuild)/)'],
  testPathIgnorePatterns: ['^.+\\/dist'],
}

// export default config
