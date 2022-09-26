export const MSG_UPDATE_REVENUE_TYPES = {
  MsgValue: [
    { name: 'contract_address', type: 'string' },
    { name: 'deployer_address', type: 'string' },
    { name: 'withdrawer_address', type: 'string' },
  ],
}

/* eslint-disable camelcase */
export function createMsgUpdateRevenue(
  contract_address: string,
  deployer_address: string,
  withdrawer_address: string,
) {
  return {
    type: 'evmos/MsgUpdateRevenue',
    value: {
      contract_address,
      deployer_address,
      withdrawer_address,
    },
  }
}
