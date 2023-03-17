import { expectSuccess } from '../../common'
import NetworkClient from '../../client'
import SubmitProposalClient from './submitProposal'
import DelegateClient from './delegate'
import VoteClient from './vote'
import ConvertCoinClient from './convertCoin'

class ConvertCoinIntegrationClient {
  public networkClient: NetworkClient

  constructor() {
    this.networkClient = new NetworkClient()
  }

  testIntegration = async () => {
    await this.submitConvertCoinProposal()
    await this.bondTokens()
    await this.voteOnProposal()
    await this.convertCoin()
  }

  private submitConvertCoinProposal = async () => {
    const integrationClient = new SubmitProposalClient(this.networkClient)

    const response = await integrationClient.sendTx()

    expectSuccess(response)

    await new Promise((resolve) => setTimeout(resolve, 5000))
    await integrationClient.verifyStateChange()
  }

  private bondTokens = async () => {
    const integrationClient = new DelegateClient(this.networkClient)

    const response = await integrationClient.sendTx()

    expectSuccess(response)

    await new Promise((resolve) => setTimeout(resolve, 5000))
    await integrationClient.verifyStateChange()
  }

  private voteOnProposal = async () => {
    const integrationClient = new VoteClient(this.networkClient)
    const response = await integrationClient.sendTx()

    expectSuccess(response)

    await new Promise((resolve) => setTimeout(resolve, 20000))
    await integrationClient.verifyStateChange()
  }

  private convertCoin = async () => {
    const integrationClient = new ConvertCoinClient(this.networkClient)
    const response = await integrationClient.sendTx()

    expectSuccess(response)

    await new Promise((resolve) => setTimeout(resolve, 5000))
    await integrationClient.verifyStateChange()
  }
}

export default ConvertCoinIntegrationClient
