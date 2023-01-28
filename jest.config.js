const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['json', 'html'],
  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],

  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  },
  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest/presets/default-esm',
  // The test environment that will be used for testing
  testEnvironment: 'node',
  transform: {},
}
