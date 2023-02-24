export const MSG_DELEGATE_TYPES = {
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

export function createMsgDelegate(
  delegatorAddress: string,
  validatorAddress: string,
  amount: string,
  denom: string,
) {
  return {
    type: 'cosmos-sdk/MsgDelegate',
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
