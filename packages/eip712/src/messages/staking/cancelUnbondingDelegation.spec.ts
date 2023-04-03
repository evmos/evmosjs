import {
  MSG_CANCEL_UNBONDING_DELEGATION_TYPES,
  createMsgCancelUnbondingDelegation,
} from './cancelUnbondingDelegation'
import TestUtils from '../../tests/utils'

describe('test MsgCancelUnbondingDelegation types and messages', () => {
  it('creates types as expected', () => {
    const expTypes = {
      MsgValue: [
        { name: 'delegator_address', type: 'string' },
        { name: 'validator_address', type: 'string' },
        { name: 'amount', type: 'TypeAmount' },
        { name: 'creation_height', type: 'int64' },
      ],
      TypeAmount: [
        { name: 'denom', type: 'string' },
        { name: 'amount', type: 'string' },
      ],
    }

    expect(MSG_CANCEL_UNBONDING_DELEGATION_TYPES).toStrictEqual(expTypes)
  })

  it('creates messages as expected', () => {
    const delegatorAddress = TestUtils.addr1
    const validatorAddress = TestUtils.addrVal1
    const amount = TestUtils.amount1
    const { denom } = TestUtils
    const creationHeight = '1000'

    const msg = createMsgCancelUnbondingDelegation(
      delegatorAddress,
      validatorAddress,
      amount,
      denom,
      creationHeight,
    )

    const expMsg = {
      type: 'cosmos-sdk/MsgCancelUnbondingDelegation',
      value: {
        delegator_address: delegatorAddress,
        validator_address: validatorAddress,
        amount: {
          amount,
          denom,
        },
        creation_height: parseInt(creationHeight, 10),
      },
    }

    expect(msg).toStrictEqual(expMsg)
  })
})
