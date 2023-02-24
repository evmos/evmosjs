import {
  MSG_SET_WITHDRAW_ADDRESS_TYPES,
  createMsgSetWithdrawAddress,
} from './setWithdrawAddress'
import TestUtils from '../../tests/utils'

describe('test MsgSetWithdrawAddress types and messages', () => {
  it('creates types as expected', () => {
    const expTypes = {
      MsgValue: [
        { name: 'delegator_address', type: 'string' },
        { name: 'withdraw_address', type: 'string' },
      ],
    }

    expect(MSG_SET_WITHDRAW_ADDRESS_TYPES).toStrictEqual(expTypes)
  })

  it('creates messages as expected', () => {
    const delegatorAddress = TestUtils.addr1
    const withdrawAddress = TestUtils.addr2

    const msg = createMsgSetWithdrawAddress(delegatorAddress, withdrawAddress)

    const expMsg = {
      type: 'cosmos-sdk/MsgModifyWithdrawAddress',
      value: {
        delegator_address: delegatorAddress,
        withdraw_address: withdrawAddress,
      },
    }

    expect(msg).toStrictEqual(expMsg)
  })
})
