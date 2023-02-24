import { MSG_DEPOSIT_TYPES, createMsgDeposit } from './deposit'
import TestUtils from '../../tests/utils'

describe('test MsgDeposit types and messages', () => {
  it('creates types as expected', () => {
    const expTypes = {
      MsgValue: [
        { name: 'proposal_id', type: 'uint64' },
        { name: 'depositor', type: 'string' },
        { name: 'deposit', type: 'Coin[]' },
      ],
    }

    expect(MSG_DEPOSIT_TYPES).toStrictEqual(expTypes)
  })

  it('creates messages as expected', () => {
    const { denom } = TestUtils
    const amount = TestUtils.amount1
    const depositor = TestUtils.addr1
    const proposalId = TestUtils.proposalId1

    const deposit = {
      amount,
      denom,
    }

    const msg = createMsgDeposit(proposalId, depositor, deposit)

    const expMsg = {
      type: 'cosmos-sdk/MsgDeposit',
      value: {
        proposal_id: proposalId,
        depositor,
        deposit: [deposit],
      },
    }

    expect(msg).toStrictEqual(expMsg)
  })
})
