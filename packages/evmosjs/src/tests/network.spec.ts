import NetworkClient from './network/client'
import { expectSuccess } from './network/common'
import {
  MsgSendUtils,
  MsgCancelUnbondingPayload,
  IBCMsgTransferUtils,
  TxExtensionsUtils,
} from './utils'
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

  it('fulfills amino msgsend transactions', async () => {
    const response = await networkClient.signAminoAndBroadcast(
      MsgSendUtils.generateTx,
    )
    expectSuccess(response)
  })

  it('fulfills eip-712 msgsend transactions', async () => {
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

describe('msgcancelunbonding integration tests', () => {
  it('fulfills msgcancelunbonding transactions', async () => {
    const response = await networkClient.signDirectAndBroadcast(
      MsgCancelUnbondingPayload.generateTx,
    )
    expectSuccess(response)
  })

  it('fulfills legacy eip-712 msgcancelunbonding transactions', async () => {
    const response = await networkClient.signEIP712AndBroadcast(
      MsgCancelUnbondingPayload.generateTx,
    )
    expectSuccess(response)
  })
})

describe('dynamic fee tx tests', () => {
  it('includes dynamic fee with signdirect', async () => {
    const extension = TxExtensionsUtils.createDynamicFee()
    const response = await networkClient.signDirectAndBroadcast(
      MsgSendUtils.generateTx,
      [extension],
    )
    expectSuccess(response)
  })
})
