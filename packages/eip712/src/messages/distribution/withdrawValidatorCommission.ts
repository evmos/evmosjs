export const MSG_WITHDRAW_VALIDATOR_COMMISSION_TYPES = {
  MsgValue: [{ name: 'validator_address', type: 'string' }],
}

/* eslint-disable camelcase */
export interface MsgWithdrawValidatorCommissionInterface {
  type: string
  value: {
    validator_address: string
  }
}

export function createMsgWithdrawValidatorCommission(validatorAddress: string) {
  return {
    type: 'cosmos-sdk/MsgWithdrawValidatorCommission',
    value: {
      validator_address: validatorAddress,
    },
  }
}
