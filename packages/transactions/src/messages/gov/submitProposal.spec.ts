import {
  createMsgSubmitProposal as protoMsgSubmitProposal,
  createMsgVote as protoMsgVote,
  createAnyMessage,
} from '@evmos/proto'
import {
  generateTypes,
  createMsgSubmitProposal,
  MSG_SUBMIT_PROPOSAL_TYPES,
} from '@evmos/eip712'
import {
  MsgSubmitProposalParams,
  createTxMsgSubmitProposal,
} from './submitProposal'
import { createTransactionPayload } from '../base'
import TestUtils from '../../tests/utils'

const { context, denom } = TestUtils
const amount = TestUtils.amount1
const proposer = context.sender.accountAddress

const proposalId = TestUtils.proposalId1
const option = TestUtils.voteOption1
const content = protoMsgVote(proposalId, option, proposer)

const params: MsgSubmitProposalParams = {
  content,
  denom,
  amount,
  proposer,
}

describe('test tx payload', () => {
  it('produces tx payloads as expected', () => {
    const types = generateTypes(MSG_SUBMIT_PROPOSAL_TYPES)

    const contentAsJSON = params.content.message.toJSON({
      useProtoFieldName: true,
    })
    const message = createMsgSubmitProposal(
      contentAsJSON,
      params.denom,
      params.amount,
      params.proposer,
    )

    const typedData = {
      types,
      message,
    }

    const contentAsAny = createAnyMessage(params.content)
    const messageCosmos = protoMsgSubmitProposal(
      contentAsAny,
      params.denom,
      params.amount,
      params.proposer,
    )

    const payload = createTxMsgSubmitProposal(context, params)
    const expectedPayload = createTransactionPayload(
      context,
      typedData,
      messageCosmos,
    )
    expect(payload).toStrictEqual(expectedPayload)
  })
})
