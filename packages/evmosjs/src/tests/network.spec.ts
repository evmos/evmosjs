import client, { TxResponse } from './network/client'

const expectSuccess = (response: TxResponse) => {
  // eslint-disable-next-line camelcase
  expect(response.tx_response.code).toBe(0)
}

describe('evmosjs e2e integration tests', () => {
  it('fulfills msgsend transactions', async () => {
    const response = await client.signDirectAndBroadcast()
    expectSuccess(response)
  })
})
