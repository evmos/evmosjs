import {
  MSG_WITHDRAW_DELEGATOR_REWARD_TYPES,
  createMsgWithdrawDelegatorReward,
} from './withdrawDelegatorReward'
import TestUtils from '../../tests/utils'

describe('test MsgWithdrawDelegatorReward types and messages', () => {
  it('creates types as expected', () => {
    const expTypes = {
      MsgValue: [
        { name: 'delegator_address', type: 'string' },
        { name: 'validator_address', type: 'string' },
      ],
    }

    expect(MSG_WITHDRAW_DELEGATOR_REWARD_TYPES).toStrictEqual(expTypes)
  })

  it('creates messages as expected', () => {
    const delegatorAddress = TestUtils.addr1
    const validatorAddress = TestUtils.addrVal1

    const msg = createMsgWithdrawDelegatorReward(
      delegatorAddress,
      validatorAddress,
    )

    const expMsg = {
      type: 'cosmos-sdk/MsgWithdrawDelegationReward',
      value: {
        delegator_address: delegatorAddress,
        validator_address: validatorAddress,
      },
    }

    expect(msg).toStrictEqual(expMsg)
  })
})
