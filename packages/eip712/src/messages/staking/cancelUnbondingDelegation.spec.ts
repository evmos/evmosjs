import {
  CREATE_MSG_CANCEL_UNBONDING_DELEGATION_TYPES,
  createMsgCancelUnbondingDelegation,
} from './cancelUnbondingDelegation'
import TestUtils from '../../tests/utils'

const { denom } = TestUtils
const amount = TestUtils.amount1
const delegatorAddress = TestUtils.addr1
const validatorAddress = TestUtils.addrVal1
const creationHeight = '1000'

const createExpTypes = (amount?: string, denom?: string) => {
  const hasBalance = amount && denom
  return {
    MsgValue: [
      { name: 'delegator_address', type: 'string' },
      { name: 'validator_address', type: 'string' },
      ...(hasBalance ? [{ name: 'amount', type: 'TypeAmount' }] : []),
      { name: 'creation_height', type: 'string' },
    ],
    ...(hasBalance && {
      TypeAmount: [
        { name: 'denom', type: 'string' },
        { name: 'amount', type: 'string' },
      ],
    }),
  }
}

const createExpMsg = (amount?: string, denom?: string) => ({
  type: 'cosmos-sdk/MsgCancelUnbondingDelegation',
  value: {
    ...(amount && denom && { amount: { amount, denom } }),
    delegator_address: delegatorAddress,
    validator_address: validatorAddress,
    creation_height: creationHeight,
  },
})

const validateTypes = (amount?: string, denom?: string) => {
  const types = CREATE_MSG_CANCEL_UNBONDING_DELEGATION_TYPES(amount, denom)
  const expTypes = createExpTypes(amount, denom)

  expect(expTypes).toStrictEqual(types)

  // Sanity check that the optional fields are parsed as expected:
  const hasBalance = amount && denom
  expect(expTypes.MsgValue).toHaveLength(hasBalance ? 4 : 3)
  if (hasBalance) {
    expect(expTypes.TypeAmount).toBeDefined()
  } else {
    expect(expTypes.TypeAmount).toBeUndefined()
  }
}

const validateMsg = (amount?: string, denom?: string) => {
  const msg = createMsgCancelUnbondingDelegation(
    delegatorAddress,
    validatorAddress,
    creationHeight,
    amount,
    denom,
  )
  const expMsg = createExpMsg(amount, denom)

  expect(msg).toStrictEqual(expMsg)

  // Sanity check that the optional fields are parsed as expected:
  expect(expMsg.value.amount).toStrictEqual(
    amount && denom ? { amount, denom } : undefined,
  )
}

describe('test MsgCancelUnbondingDelegation types', () => {
  it('creates types as expected with amount', () => {
    validateTypes(amount, denom)
  })

  it('creates types as expected without amount', () => {
    validateTypes()
  })
})

describe('test MsgCancelUnbondingDelegation message', () => {
  it('creates messages as expected with amount', () => {
    validateMsg(amount, denom)
  })

  it('creates messages as expected without amount', () => {
    validateMsg()
  })
})
