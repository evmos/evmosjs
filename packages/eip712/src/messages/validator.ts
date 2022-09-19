const NOT_MODIFY = '[do-not-modify]'

/* eslint-disable camelcase */
export const MSG_EDIT_VALIDATOR_TYPES = {
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

export interface MsgEditValidatorInterface {
  type: string
  value: {
    validator_address: string
  }
}

export function createMsgEditValidator(
  moniker: string | undefined,
  identity: string | undefined,
  website: string | undefined,
  securityContact: string | undefined,
  details: string | undefined,
  validatorAddress: string | undefined,
  commissionRate: string | undefined,
  minSelfDelegation: string | undefined,
) {
  return {
    type: 'cosmos-sdk/MsgEditValidator',
    value: {
      description: {
        moniker: moniker || NOT_MODIFY,
        identity: identity || NOT_MODIFY,
        website: website || NOT_MODIFY,
        security_contact: securityContact || NOT_MODIFY,
        details: details || NOT_MODIFY,
      },
      validator_address: validatorAddress,
      // TODO: passing '<nil>' is the correct value but it's not supported by ethermint (EIP712 parser) https://github.com/tharsis/ethermint/issues/1125
      commission_rate: commissionRate || '<nil>',
      min_self_delegation: minSelfDelegation || '<nil>',
    },
  }
}

export const MSG_CREATE_VALIDATOR_TYPES = {
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
  MsgValue: [
    { name: 'description', type: 'TypeDescription' },
    { name: 'commission', type: 'TypeCommission' },
    { name: 'min_self_delegation', type: 'string' },
    { name: 'delegator_address', type: 'string' },
    { name: 'validator_address', type: 'string' },
    { name: 'pubkey', type: 'TypePubkey' },
    { name: 'value', type: 'TypeValue' },
  ],
  TypePubkey: [{ name: 'key', type: 'string' }],
  TypeValue: [
    { name: 'denom', type: 'string' },
    { name: 'amount', type: 'string' },
  ],
}

export function createMsgCreateValidator(
  validatorDescription: {
    moniker: string
    identity: string
    website: string
    securityContact: string
    details: string
  },
  validatorCommission: {
    rate: string
    maxRate: string
    maxChangeRate: string
  },
  minSelfDelegation: string,
  delegatorAddress: string,
  validatorAddress: string,
  amount: string,
  denom: string,
  pubkey: string,
) {
  return {
    type: 'cosmos-sdk/MsgCreateValidator',
    value: {
      amount: {
        amount,
        denom,
      },
      delegator_address: delegatorAddress,
      validator_address: validatorAddress,
      validator_description: {
        moniker: validatorDescription.moniker,
        identity: validatorDescription.identity,
        website: validatorDescription.website,
        security_contract: validatorDescription.securityContact,
        details: validatorDescription.details,
      },
      validator_commission: {
        rate: validatorCommission.rate,
        max_rate: validatorCommission.maxRate,
        max_change_rate: validatorCommission.maxChangeRate,
      },
      min_self_delegation: minSelfDelegation,
      pubkey: { key: pubkey },
    },
  }
}
