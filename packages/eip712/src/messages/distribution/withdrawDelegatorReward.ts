export const MSG_WITHDRAW_DELEGATOR_REWARD_TYPES = {
  MsgValue: [
    { name: 'delegator_address', type: 'string' },
    { name: 'validator_address', type: 'string' },
  ],
}

/* eslint-disable camelcase */
export interface MsgWithdrawDelegatorRewardInterface {
  type: string
  value: {
    delegator_address: string
    validator_address: string
  }
}
export function createMsgWithdrawDelegatorReward(
  delegatorAddress: string,
  validatorAddress: string,
) {
  return {
    type: 'cosmos-sdk/MsgWithdrawDelegationReward',
    value: {
      delegator_address: delegatorAddress,
      validator_address: validatorAddress,
    },
  }
}
