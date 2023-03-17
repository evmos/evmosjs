import { TxContext, createTxMsgVote } from '@evmos/transactions'
import { Proposal } from '@evmos/provider'
import NetworkClient from '../../client'
import { fetchProposals } from '../../query'

class ConvertCoinVoteClient {
  private proposalId: number | undefined

  sendTx = async () => {
    const query = await fetchProposals()
    this.proposalId = query.proposals.length

    const client = new NetworkClient(this.generator)
    return client.signDirectAndBroadcast()
  }

  private generator = (context: TxContext) => {
    const { proposalId } = this
    if (!proposalId) {
      throw new Error('must fetch proposal id before generating')
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

  verifyStateChange = async () => {
    const response = await fetchProposals()
    const { proposals } = response
    const { proposalId } = this

    if (!proposalId) {
      throw new Error('must fetch proposal id before verifying state')
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
