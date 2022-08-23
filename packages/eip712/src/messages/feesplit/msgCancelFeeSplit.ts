export const MSG_CANCEL_FEE_SPLIT_TYPES = {
  MsgValue: [
    { name: 'contract_address', type: 'string' },
    { name: 'deployer_address', type: 'string' },
  ],
}

/* eslint-disable camelcase */
export function createMsgCancelFeeSplit(
  contract_address: string,
  deployer_address: string,
) {
  return {
    type: 'evmos/MsgCancelFeeSplit',
    value: {
      contract_address,
      deployer_address,
    },
  }
}
