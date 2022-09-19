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
  TypePubkey: [
    { name: 'type', type: 'string' },
    { name: 'value', type: 'TypePubkeyValue' },
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
  TypePubkeyValue: [{ name: 'key', type: 'uint8[]' }],
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
  pubkey: Uint8Array,
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
