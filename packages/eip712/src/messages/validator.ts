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

/* eslint-disable camelcase */
export const MSG_SET_WITHDRAW_ADDRESS_TYPES = {
  MsgValue: [
    { name: 'delegator_address', type: 'string' },
    { name: 'withdraw_address', type: 'string' },
  ],
}

export function createMsgSetWithdrawAddress(
  delegatorAddress: string,
  withdrawAddress: string,
) {
  return {
    type: 'cosmos-sdk/MsgModifyWithdrawAddress',
    value: {
      delegator_address: delegatorAddress,
      withdraw_address: withdrawAddress,
    },
  }
}
