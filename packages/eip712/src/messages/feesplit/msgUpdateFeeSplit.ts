export const MSG_UPDATE_FEE_SPLIT_TYPES = {
  MsgValue: [
    { name: 'contract_address', type: 'string' },
    { name: 'deployer_address', type: 'string' },
    { name: 'withdrawer_address', type: 'string' },
  ],
}

/* eslint-disable camelcase */
export function createMsgUpdateFeeSplit(
  contract_address: string,
  deployer_address: string,
  withdrawer_address: string,
) {
  return {
    type: 'evmos/UpdateFeeSplit',
    value: {
      contract_address,
      deployer_address,
      withdrawer_address,
    },
  }
}
