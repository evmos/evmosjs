import {
  MSG_WITHDRAW_VALIDATOR_COMMISSION_TYPES,
  createMsgWithdrawValidatorCommission,
} from './withdrawValidatorCommission'
import TestUtils from '../../tests/utils'

describe('test MsgWithdrawValidatorCommission types and messages', () => {
  it('creates types as expected', () => {
    const expTypes = {
      MsgValue: [{ name: 'validator_address', type: 'string' }],
    }

    expect(MSG_WITHDRAW_VALIDATOR_COMMISSION_TYPES).toStrictEqual(expTypes)
  })

  it('creates messages as expected', () => {
    const validatorAddress = TestUtils.addrVal1

    const msg = createMsgWithdrawValidatorCommission(validatorAddress)

    const expMsg = {
      type: 'cosmos-sdk/MsgWithdrawValidatorCommission',
      value: {
        validator_address: validatorAddress,
      },
    }

    expect(msg).toStrictEqual(expMsg)
  })
})
