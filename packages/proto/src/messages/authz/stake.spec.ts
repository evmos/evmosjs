import { createStakeAuthorization } from './stake'
import { StakeAuthorization } from '../../proto/cosmos/staking/authz'
import { denom, val, val2 } from '../../proto/tests/utils'
import { JSONOptions } from '../../registry/registry'

const validateStakeAuthorization = (validators: string | string[]) => {
  const authorization = 1
  const amount = '100000'

  const msg = createStakeAuthorization(validators, denom, amount, authorization)

  const expValidators = Array.isArray(validators) ? validators : [validators]

  expect(msg.message.toJson(JSONOptions)).toStrictEqual({
    allow_list: {
      address: expValidators,
    },
    authorization_type: authorization,
    max_tokens: {
      denom,
      amount,
    },
  })
  expect(msg.path).toStrictEqual(StakeAuthorization.typeName)
}

describe('test authz staking messages', () => {
  it('encodes single validator addresses', () => {
    validateStakeAuthorization(val)
  })

  it('encodes multiple validator addresses', () => {
    const validators = [val, val2]
    validateStakeAuthorization(validators)
  })
})
