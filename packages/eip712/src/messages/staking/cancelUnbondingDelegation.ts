export const CREATE_MSG_CANCEL_UNBONDING_DELEGATION_TYPES = (
  amount?: string,
  denom?: string,
) => {
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

export function createMsgCancelUnbondingDelegation(
  delegatorAddress: string,
  validatorAddress: string,
  creationHeight: string,
  amount?: string,
  denom?: string,
) {
  return {
    type: 'cosmos-sdk/MsgCancelUnbondingDelegation',
    value: {
      delegator_address: delegatorAddress,
      validator_address: validatorAddress,
      ...(amount && denom && { amount: { amount, denom } }),
      creation_height: creationHeight,
    },
  }
}
