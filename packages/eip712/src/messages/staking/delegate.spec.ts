import { MSG_DELEGATE_TYPES, createMsgDelegate } from './delegate'
import TestUtils from '../../tests/utils'

describe('test MsgDelegate types and messages', () => {
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

    expect(MSG_DELEGATE_TYPES).toStrictEqual(expTypes)
  })

  it('creates messages as expected', () => {
    const { denom } = TestUtils
    const amount = TestUtils.amount1
    const delegatorAddress = TestUtils.addr1
    const validatorAddress = TestUtils.addrVal1

    const msg = createMsgDelegate(
      delegatorAddress,
      validatorAddress,
      amount,
      denom,
    )

    const expMsg = {
      type: 'cosmos-sdk/MsgDelegate',
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
