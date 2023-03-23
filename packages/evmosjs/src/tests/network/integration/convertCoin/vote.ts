import { TxContext, createTxMsgVote } from '@evmos/transactions'
import { Proposal } from '@evmos/provider'
import IntegrationClientBase from '../types'
import { fetchProposals } from '../../query'

class ConvertCoinVoteClient extends IntegrationClientBase {
  private proposalId: number | undefined

  sendTx = async () => {
    return this.networkClient.signDirectAndBroadcast(this.createPayload)
  }

  private createPayload = (context: TxContext) => {
    const { proposalId } = this
    if (!proposalId) {
      throw new Error('must set proposal id before generating')
    }

    const params = this.getParams(proposalId)

    return createTxMsgVote(context, params)
  }

  private getParams = (proposalId: number) => {
    const option = 1

    return {
      proposalId,
      option,
    }
  }

  setProposalId = (proposalId: number) => {
    this.proposalId = proposalId
  }

  verifyStateChange = async () => {
    const response = await fetchProposals()
    const { proposals } = response
    const { proposalId } = this

    if (!proposalId) {
      throw new Error('must set proposal id before verifying state')
    }

    expect(proposals.length).toBeGreaterThanOrEqual(proposalId)
    const proposal = proposals[proposalId - 1]

    this.verifyProposalPassed(proposal)
  }

  private verifyProposalPassed = (proposal: Proposal) => {
    expect(proposal.status).toBe('PROPOSAL_STATUS_PASSED')
  }
}

export default ConvertCoinVoteClient
