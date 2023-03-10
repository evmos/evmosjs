import NetworkClient, { TxResponse } from './network/client'
import { MsgSendUtils } from './utils'

const expectSuccess = (response: TxResponse) => {
  // eslint-disable-next-line camelcase
  expect(response.tx_response.code).toBe(0)
}

describe('evmosjs e2e integration tests', () => {
  it('fulfills msgsend transactions', async () => {
    const client = new NetworkClient(MsgSendUtils.generateTx)
    const response = await client.signDirectAndBroadcast()

    expectSuccess(response)
  })
})
