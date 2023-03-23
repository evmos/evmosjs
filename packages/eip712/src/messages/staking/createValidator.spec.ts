import {
  MSG_CREATE_VALIDATOR_TYPES,
  createMsgCreateValidator,
} from './createValidator'
import TestUtils from '../../tests/utils'

describe('test MsgCreateValidator types and messages', () => {
  it('creates types as expected', () => {
    const expTypes = {
      TypeDescription: [
        { name: 'moniker', type: 'string' },
        { name: 'identity', type: 'string' },
        { name: 'website', type: 'string' },
        { name: 'security_contact', type: 'string' },
        { name: 'details', type: 'string' },
      ],
      TypeCommission: [
        { name: 'rate', type: 'string' },
        { name: 'max_rate', type: 'string' },
        { name: 'max_change_rate', type: 'string' },
      ],
      TypePubkey: [
        { name: 'type', type: 'string' },
        { name: 'value', type: 'string' },
      ],
      MsgValue: [
        { name: 'description', type: 'TypeDescription' },
        { name: 'commission', type: 'TypeCommission' },
        { name: 'min_self_delegation', type: 'string' },
        { name: 'delegator_address', type: 'string' },
        { name: 'validator_address', type: 'string' },
        { name: 'pubkey', type: 'TypePubkey' },
        { name: 'value', type: 'TypeValue' },
      ],
      TypeValue: [
        { name: 'denom', type: 'string' },
        { name: 'amount', type: 'string' },
      ],
    }

    expect(MSG_CREATE_VALIDATOR_TYPES).toStrictEqual(expTypes)
  })

  it('creates messages as expected', () => {
    const { denom, validatorParams } = TestUtils
    const amount = TestUtils.amount1
    const delegatorAddress = TestUtils.addr1
    const validatorAddress = TestUtils.addrVal1
    const pubkey = TestUtils.pubKey

    const validatorDescription = {
      moniker: validatorParams.moniker,
      identity: validatorParams.identity,
      website: validatorParams.website,
      securityContact: validatorParams.securityContact,
      details: validatorParams.details,
    }

    const rate = '0.1'
    const maxRate = '0.2'
    const maxChangeRate = '0.025'

    const validatorCommission = {
      rate,
      maxRate,
      maxChangeRate,
    }

    const msg = createMsgCreateValidator(
      validatorDescription,
      validatorCommission,
      validatorParams.minSelfDelegation,
      delegatorAddress,
      validatorAddress,
      amount,
      denom,
      pubkey,
    )

    const expMsg = {
      type: 'cosmos-sdk/MsgCreateValidator',
      value: {
        commission: {
          max_change_rate: validatorCommission.maxChangeRate,
          max_rate: validatorCommission.maxRate,
          rate: validatorCommission.rate,
        },
        delegator_address: delegatorAddress,
        description: {
          details: validatorDescription.details,
          identity: validatorDescription.identity,
          moniker: validatorDescription.moniker,
          security_contact: validatorDescription.securityContact,
          website: validatorDescription.website,
        },
        min_self_delegation: validatorParams.minSelfDelegation,
        pubkey: {
          type: 'tendermint/PubKeyEd25519',
          value: pubkey,
        },
        validator_address: validatorAddress,
        value: {
          amount,
          denom,
        },
      },
    }

    expect(msg).toStrictEqual(expMsg)
  })
})
