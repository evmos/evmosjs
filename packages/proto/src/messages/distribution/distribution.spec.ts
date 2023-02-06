import {
  createMsgWithdrawDelegatorReward,
  createMsgWithdrawValidatorCommission,
  createMsgSetWithdrawAddress,
} from './distribution'

import { from, to, val } from '../../proto/tests/utils'
import { JSONOptions } from '../../proto/tests/common'

describe('test distribution message generation', () => {
  it('msgWithdrawDelegatorReward', () => {
    const msg = createMsgWithdrawDelegatorReward(from, val)

    expect(msg.message.toJson(JSONOptions)).toStrictEqual({
      delegator_address: from,
      validator_address: val,
    })
    expect(msg.path).toStrictEqual(msg.message.getType().typeName)
  })

  it('msgWithdrawValidatorCommission', () => {
    const msg = createMsgWithdrawValidatorCommission(val)

    expect(msg.message.toJson(JSONOptions)).toStrictEqual({
      validator_address: val,
    })
    expect(msg.path).toStrictEqual(msg.message.getType().typeName)
  })

  it('msgSetWithdrawAddress', () => {
    const msg = createMsgSetWithdrawAddress(from, to)

    expect(msg.message.toJson(JSONOptions)).toStrictEqual({
      delegator_address: from,
      withdraw_address: to,
    })
    expect(msg.path).toStrictEqual(msg.message.getType().typeName)
  })
})
