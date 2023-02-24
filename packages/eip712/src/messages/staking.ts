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

export const MSG_BEGIN_REDELEGATE_TYPES = {
  MsgValue: [
    { name: 'delegator_address', type: 'string' },
    { name: 'validator_src_address', type: 'string' },
    { name: 'validator_dst_address', type: 'string' },
    { name: 'amount', type: 'TypeAmount' },
  ],
  TypeAmount: [
    { name: 'denom', type: 'string' },
    { name: 'amount', type: 'string' },
  ],
}
export function createMsgBeginRedelegate(
  delegatorAddress: string,
  validatorSrcAddress: string,
  validatorDstAddress: string,
  amount: string,
  denom: string,
) {
  return {
    type: 'cosmos-sdk/MsgBeginRedelegate',
    value: {
      amount: {
        amount,
        denom,
      },
      delegator_address: delegatorAddress,
      validator_src_address: validatorSrcAddress,
      validator_dst_address: validatorDstAddress,
    },
  }
}

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
