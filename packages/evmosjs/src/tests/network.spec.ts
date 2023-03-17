import NetworkClient from './network/client'
import { expectSuccess } from './network/common'
import { MsgSendUtils } from './utils'
import ConvertCoinClient from './network/integration/convertCoin/main'

describe('evmosjs e2e integration tests', () => {
  it('fulfills msgsend transactions', async () => {
    const client = new NetworkClient()
    const response = await client.signDirectAndBroadcast(
      MsgSendUtils.generateTx,
    )

    expectSuccess(response)

    await new Promise((resolve) => setTimeout(resolve, 5000))
  }, 10000)

  it('fulfills msgconverterc20 transactions', async () => {
    const client = new ConvertCoinClient()
    await client.testIntegration()
  }, 50000)
})
