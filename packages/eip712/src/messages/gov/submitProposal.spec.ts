import {
  MSG_SUBMIT_PROPOSAL_TYPES,
  createMsgSubmitProposal,
} from './submitProposal'
import TestUtils from '../../tests/utils'

describe('test MsgSubmitProposal types and messages', () => {
  it('creates types as expected', () => {
    const expTypes = {
      MsgValue: [
        { name: 'content', type: 'any' },
        { name: 'proposer', type: 'string' },
        { name: 'initial_deposit', type: 'TypeDeposit[]' },
      ],
      TypeDeposit: [
        { name: 'denom', type: 'string' },
        { name: 'amount', type: 'string' },
      ],
    }

    expect(MSG_SUBMIT_PROPOSAL_TYPES).toStrictEqual(expTypes)
  })

  it('creates messages as expected', () => {
    const { denom } = TestUtils
    const amount = TestUtils.amount1
    const sender = TestUtils.addr1
    const receiver = TestUtils.addr2

    const content = {
      type: 'cosmos-sdk/MsgSend',
      value: {
        amount: [
          {
            amount,
            denom,
          },
        ],
        from_address: sender,
        to_address: receiver,
      },
    }

    const proposer = TestUtils.addr3
    const depositAmount = TestUtils.amount2
    const msg = createMsgSubmitProposal(content, denom, depositAmount, proposer)

    const expMsg = {
      type: 'cosmos-sdk/MsgSubmitProposal',
      value: {
        content,
        initial_deposit: [
          {
            amount: depositAmount,
            denom,
          },
        ],
        proposer,
      },
    }

    expect(msg).toStrictEqual(expMsg)
  })
})
