import NetworkClient from './network/client'
import { expectSuccess } from './network/common'
import { MsgSendUtils, IBCMsgTransferUtils } from './utils'
import ConvertCoinClient from './network/integration/convertCoin/main'

const networkClient = new NetworkClient()

describe('evmosjs e2e integration tests', () => {
  it('fulfills msgconverterc20 transactions', async () => {
    const client = new ConvertCoinClient(networkClient)
    await client.testIntegration()
  }, 36000)
})

describe('msgsend integration tests', () => {
  it('fulfills msgsend transactions', async () => {
    const response = await networkClient.signDirectAndBroadcast(
      MsgSendUtils.generateTx,
    )
    expectSuccess(response)
  })

  it('fulfills legacy eip-712 msgsend transactions', async () => {
    const response = await networkClient.signEIP712AndBroadcast(
      MsgSendUtils.generateTx,
    )
    expectSuccess(response)
  })
})

describe('ibc msgtransfer integration tests', () => {
  it('fulfills ibc msgtransfer with memo', async () => {
    const response = await networkClient.signDirectAndBroadcast(
      IBCMsgTransferUtils.generateTx,
    )
    expectSuccess(response)
  })

  it('fulfills legacy eip-712 ibc msgtransfer with memo', async () => {
    const response = await networkClient.signEIP712AndBroadcast(
      IBCMsgTransferUtils.generateTx,
    )
    expectSuccess(response)
  })

  it('fulfills ibc msgtransfer without memo', async () => {
    const response = await networkClient.signDirectAndBroadcast(
      IBCMsgTransferUtils.generateTxWithoutMemo,
    )
    expectSuccess(response)
  })

  it('fulfills legacy eip-712 ibc msgtransfer without memo', async () => {
    const response = await networkClient.signEIP712AndBroadcast(
      IBCMsgTransferUtils.generateTxWithoutMemo,
    )
    expectSuccess(response)
  })
})
