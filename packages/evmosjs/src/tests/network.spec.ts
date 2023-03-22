import NetworkClient from './network/client'
import { expectSuccess } from './network/common'
import { MsgSendUtils } from './utils'
import ConvertCoinClient from './network/integration/convertCoin/main'

const networkClient = new NetworkClient()

describe('evmosjs e2e integration tests', () => {
  it('fulfills msgsend transactions', async () => {
    const response = await networkClient.signDirectAndBroadcast(
      MsgSendUtils.generateTx,
    )
    expectSuccess(response)
  })

  it('fulfills legacy eip-712 signatures', async () => {
    const response = await networkClient.signEIP712AndBroadcast(
      MsgSendUtils.generateTx,
    )
    expectSuccess(response)
  })

  it('fulfills msgconverterc20 transactions', async () => {
    const client = new ConvertCoinClient(networkClient)
    await client.testIntegration()
  }, 30000)
})
