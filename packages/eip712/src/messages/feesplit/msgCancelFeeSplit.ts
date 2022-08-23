export const MSG_CANCEL_FEE_SPLIT_TYPES = {
  MsgValue: [
    { name: 'contract_address', type: 'string' },
    { name: 'deployer_address', type: 'string' },
  ],
}

/* eslint-disable camelcase */
export function createCancelSplit(
  contract_address: string,
  deployer_address: string,
) {
  return {
    type: 'evmos/CancelFeeSplit',
    value: {
      contract_address,
      deployer_address,
    },
  }
}
