import { createMsgVote as protoMsgVote } from '@evmos/proto'
import { createMsgVote as eip712MsgVote, MSG_VOTE_TYPES } from '@evmos/eip712'
import { createTxMsgVote } from '@evmos/transactions'
import { TestingClient } from '../utils'

class MsgVoteTestingClient extends TestingClient {
  get params() {
    const proposalId = this.proposalId1
    const option = this.voteOption1

    return {
      proposalId,
      option,
    }
  }

  get protoMsg() {
    const { context, params } = this

    return protoMsgVote(
      params.proposalId,
      params.option,
      context.sender.accountAddress,
    )
  }

  get eip712TypedData() {
    const { context, params } = this

    const types = MSG_VOTE_TYPES
    const message = eip712MsgVote(
      params.proposalId,
      params.option,
      context.sender.accountAddress,
    )

    return {
      types,
      message,
    }
  }

  get payload() {
    const { context, params, protoMsg, eip712TypedData } = this

    const tx = createTxMsgVote(context, params)

    return {
      protoMsg,
      eip712TypedData,
      tx,
    }
  }
}

const client = new MsgVoteTestingClient()

export default client
