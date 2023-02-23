import { createMsgVote as protoMsgVote } from '@evmos/proto'
import { generateTypes, createMsgVote, MSG_VOTE_TYPES } from '@evmos/eip712'
import { MsgVoteParams, createTxMsgVote } from './vote'
import { createTransactionPayload } from '../base'
import TestUtils from '../../tests/utils'

const { context } = TestUtils
const proposalId = TestUtils.proposalId1
const option = TestUtils.voteOption1
const sender = context.sender.accountAddress

const params: MsgVoteParams = {
  proposalId,
  option,
}

describe('test tx payload', () => {
  it('produces tx payloads as expected', () => {
    const types = generateTypes(MSG_VOTE_TYPES)
    const message = createMsgVote(params.proposalId, params.option, sender)
    const typedData = {
      types,
      message,
    }

    const messageCosmos = protoMsgVote(params.proposalId, params.option, sender)

    const payload = createTxMsgVote(context, params)
    const expectedPayload = createTransactionPayload(
      context,
      typedData,
      messageCosmos,
    )
    expect(payload).toStrictEqual(expectedPayload)
  })
})
