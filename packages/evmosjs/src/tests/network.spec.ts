import NetworkClient from './network/client'
import { expectSuccess } from './network/common'
import { MsgSendUtils } from './utils'
import ConvertCoinClient from './network/integration/convertCoin/main'
import MsgCancelUnbondingUtils from './utils/payloads/cancelUnbondingDelegation'

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
  }, 36000)
})

describe('msgcancelunbonding integration tests', () => {
  it('fulfills msgcancelunbonding transactions', async () => {
    const response = await networkClient.signDirectAndBroadcast(
      MsgCancelUnbondingUtils.generateTx,
    )
    expectSuccess(response)
  })

  it('fulfills legacy eip-712 msgcancelunbonding transactions', async () => {
    const response = await networkClient.signEIP712AndBroadcast(
      MsgCancelUnbondingUtils.generateTx,
    )
    expectSuccess(response)
  })
})
