import {
  MSG_BEGIN_REDELEGATE_TYPES,
  createMsgBeginRedelegate,
} from './beginRedelegate'
import TestUtils from '../../tests/utils'

describe('test MsgBeginRedelegate types and messages', () => {
  it('creates types as expected', () => {
    const expTypes = {
      MsgValue: [
        { name: 'delegator_address', type: 'string' },
        { name: 'validator_src_address', type: 'string' },
        { name: 'validator_dst_address', type: 'string' },
        { name: 'amount', type: 'TypeAmount' },
      ],
      TypeAmount: [
        { name: 'denom', type: 'string' },
        { name: 'amount', type: 'string' },
      ],
    }

    expect(MSG_BEGIN_REDELEGATE_TYPES).toStrictEqual(expTypes)
  })

  it('creates messages as expected', () => {
    const { denom } = TestUtils
    const amount = TestUtils.amount1
    const delegatorAddress = TestUtils.addr1
    const validatorSrcAddress = TestUtils.addrVal1
    const validatorDstAddress = TestUtils.addrVal2

    const msg = createMsgBeginRedelegate(
      delegatorAddress,
      validatorSrcAddress,
      validatorDstAddress,
      amount,
      denom,
    )

    const expMsg = {
      type: 'cosmos-sdk/MsgBeginRedelegate',
      value: {
        amount: {
          amount,
          denom,
        },
        delegator_address: delegatorAddress,
        validator_src_address: validatorSrcAddress,
        validator_dst_address: validatorDstAddress,
      },
    }

    expect(msg).toStrictEqual(expMsg)
  })
})
