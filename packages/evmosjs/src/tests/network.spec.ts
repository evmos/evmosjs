import NetworkClient, { TxResponse } from './network/client'
import { MsgSendUtils } from './utils'
import SubmitProposalIntegration from './network/integration/convertCoin/submitProposal'
import DelegateIntegration from './network/integration/convertCoin/delegate'
import VoteIntegration from './network/integration/convertCoin/vote'
import ConvertCoinIntegration from './network/integration/convertCoin/convertCoin'

const expectSuccess = (response: TxResponse) => {
  // eslint-disable-next-line camelcase
  expect(response.tx_response.code).toBe(0)
}

describe('evmosjs e2e integration tests', () => {
  it('fulfills msgsend transactions', async () => {
    const client = new NetworkClient(MsgSendUtils.generateTx)
    const response = await client.signDirectAndBroadcast()

    expectSuccess(response)

    await new Promise((resolve) => setTimeout(resolve, 5000))
  }, 10000)

  it('fulfills msgconverterc20 transactions', async () => {
    const submitConvertCoinProposal = async () => {
      const integrationClient = new SubmitProposalIntegration()

      const response = await integrationClient.sendTx()

      expectSuccess(response)

      await new Promise((resolve) => setTimeout(resolve, 5000))
      await integrationClient.verifyStateChange()
    }

    const bondTokens = async () => {
      const integrationClient = new DelegateIntegration()

      const response = await integrationClient.sendTx()

      expectSuccess(response)

      await new Promise((resolve) => setTimeout(resolve, 5000))
      await integrationClient.verifyStateChange()
    }

    const voteOnProposal = async () => {
      const integrationClient = new VoteIntegration()
      const response = await integrationClient.sendTx()

      expectSuccess(response)

      await new Promise((resolve) => setTimeout(resolve, 20000))
      await integrationClient.verifyStateChange()
    }

    const convertCoin = async () => {
      const integrationClient = new ConvertCoinIntegration()
      const response = await integrationClient.sendTx()

      expectSuccess(response)

      await new Promise((resolve) => setTimeout(resolve, 5000))
      await integrationClient.verifyStateChange()
    }

    await submitConvertCoinProposal()
    await bondTokens()
    await voteOnProposal()
    await convertCoin()
  }, 50000)
})
