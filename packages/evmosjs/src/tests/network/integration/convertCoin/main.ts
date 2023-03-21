import { expectSuccess, delay } from '../../common'
import { NetworkClientHost } from '../types'
import SubmitProposalClient from './submitProposal'
import DelegateClient from './delegate'
import VoteClient from './vote'
import ConvertCoinClient from './convertCoin'

class ConvertCoinIntegrationClient extends NetworkClientHost {
  testIntegration = async () => {
    const { networkClient } = this

    const proposalClient = new SubmitProposalClient(networkClient)
    const delegateClient = new DelegateClient(networkClient)
    const voteClient = new VoteClient(networkClient)
    const convertCoinClient = new ConvertCoinClient(networkClient)

    let response = await proposalClient.sendTx()
    expectSuccess(response)

    response = await delegateClient.sendTx()
    expectSuccess(response)

    const proposalId = proposalClient.getProposalId()
    voteClient.setProposalId(proposalId)

    response = await voteClient.sendTx()
    expectSuccess(response)

    // Wait for voting period to expire and token pair to be added.
    await delay(10000)

    response = await convertCoinClient.sendTx()
    expectSuccess(response)

    // Wait for state changes to propogate to API
    await delay(15000)

    // Verify state changes for each client.
    await proposalClient.verifyStateChange()
    await delegateClient.verifyStateChange()
    await voteClient.verifyStateChange()
    await convertCoinClient.verifyStateChange()
  }
}

export default ConvertCoinIntegrationClient
