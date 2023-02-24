export const MSG_UNDELEGATE_TYPES = {
  MsgValue: [
    { name: 'delegator_address', type: 'string' },
    { name: 'validator_address', type: 'string' },
    { name: 'amount', type: 'TypeAmount' },
  ],
  TypeAmount: [
    { name: 'denom', type: 'string' },
    { name: 'amount', type: 'string' },
  ],
}

export function createMsgUndelegate(
  delegatorAddress: string,
  validatorAddress: string,
  amount: string,
  denom: string,
) {
  return {
    type: 'cosmos-sdk/MsgUndelegate',
    value: {
      amount: {
        amount,
        denom,
      },
      delegator_address: delegatorAddress,
      validator_address: validatorAddress,
    },
  }
}
