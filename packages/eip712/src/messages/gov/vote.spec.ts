import { MSG_VOTE_TYPES, createMsgVote } from './vote'
import TestUtils from '../../tests/utils'

describe('test MsgVote types and messages', () => {
  it('creates types as expected', () => {
    const expTypes = {
      MsgValue: [
        { name: 'proposal_id', type: 'uint64' },
        { name: 'voter', type: 'string' },
        { name: 'option', type: 'int32' },
      ],
    }

    expect(MSG_VOTE_TYPES).toStrictEqual(expTypes)
  })

  it('creates messages as expected', () => {
    const proposalId = TestUtils.proposalId1
    const option = 1
    const sender = TestUtils.addr1

    const msg = createMsgVote(proposalId, option, sender)

    const expMsg = {
      type: 'cosmos-sdk/MsgVote',
      value: {
        proposal_id: proposalId,
        voter: sender,
        option,
      },
    }

    expect(msg).toStrictEqual(expMsg)
  })
})
