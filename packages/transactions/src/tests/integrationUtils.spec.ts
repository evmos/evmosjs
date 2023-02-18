import IntegrationTestClient from './integrationUtils'

describe('test integration testing client', () => {
  it('renders correct legacyAmino content', () => {
    IntegrationTestClient.testLegacyAmino()
  })
})
