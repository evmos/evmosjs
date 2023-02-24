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
