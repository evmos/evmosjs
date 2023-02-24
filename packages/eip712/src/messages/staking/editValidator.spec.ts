import {
  MSG_EDIT_VALIDATOR_TYPES,
  createMsgEditValidator,
} from './editValidator'
import TestUtils from '../../tests/utils'

describe('test MsgEditValidator types and messages', () => {
  it('creates types as expected', () => {
    const expTypes = {
      TypeDescription: [
        { name: 'moniker', type: 'string' },
        { name: 'identity', type: 'string' },
        { name: 'website', type: 'string' },
        { name: 'security_contact', type: 'string' },
        { name: 'details', type: 'string' },
      ],
      MsgValue: [
        { name: 'description', type: 'TypeDescription' },
        { name: 'validator_address', type: 'string' },
        { name: 'commission_rate', type: 'string' },
        { name: 'min_self_delegation', type: 'string' },
      ],
    }

    expect(MSG_EDIT_VALIDATOR_TYPES).toStrictEqual(expTypes)
  })

  it('creates messages as expected', () => {
    const { validatorParams } = TestUtils
    const validatorAddress = TestUtils.addrVal1
    const NOT_MODIFY = '[do-not-modify]'

    const msg = createMsgEditValidator(
      validatorParams.moniker,
      validatorParams.identity,
      validatorParams.website,
      validatorParams.securityContact,
      validatorParams.details,
      validatorAddress,
      validatorParams.commissionRate,
      validatorParams.minSelfDelegation,
    )

    const expMsg = {
      type: 'cosmos-sdk/MsgEditValidator',
      value: {
        description: {
          moniker: validatorParams.moniker || NOT_MODIFY,
          identity: validatorParams.identity || NOT_MODIFY,
          website: validatorParams.website || NOT_MODIFY,
          security_contact: validatorParams.securityContact || NOT_MODIFY,
          details: validatorParams.details || NOT_MODIFY,
        },
        validator_address: validatorAddress,
        commission_rate: validatorParams.commissionRate || '<nil>',
        min_self_delegation: validatorParams.minSelfDelegation || '<nil>',
      },
    }

    expect(msg).toStrictEqual(expMsg)
  })
})
