import { MSG_UNDELEGATE_TYPES, createMsgUndelegate } from './undelegate'
import TestUtils from '../../tests/utils'

describe('test MsgUndelegate types and messages', () => {
  it('creates types as expected', () => {
    const expTypes = {
      MsgValue: [
        { name: 'delegator_address', type: 'string' },
        { name: 'validator_address', type: 'string' },
        { name: 'amount', type: 'TypeAmount' },
      ],
      TypeAmount: [
        { name: 'denom', type: 'string' },
        { name: 'amount', type: 'string' },
      ],
    }

    expect(MSG_UNDELEGATE_TYPES).toStrictEqual(expTypes)
  })

  it('creates messages as expected', () => {
    const { denom } = TestUtils
    const amount = TestUtils.amount1
    const delegatorAddress = TestUtils.addr1
    const validatorAddress = TestUtils.addrVal1

    const msg = createMsgUndelegate(
      delegatorAddress,
      validatorAddress,
      amount,
      denom,
    )

    const expMsg = {
      type: 'cosmos-sdk/MsgUndelegate',
      value: {
        amount: {
          amount,
          denom,
        },
        delegator_address: delegatorAddress,
        validator_address: validatorAddress,
      },
    }

    expect(msg).toStrictEqual(expMsg)
  })
})
