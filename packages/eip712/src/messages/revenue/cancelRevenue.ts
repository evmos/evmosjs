export const MSG_CANCEL_REVENUE_TYPES = {
  MsgValue: [
    { name: 'contract_address', type: 'string' },
    { name: 'deployer_address', type: 'string' },
  ],
}

/* eslint-disable camelcase */
export function createMsgCancelRevenue(
  contract_address: string,
  deployer_address: string,
) {
  return {
    type: 'evmos/MsgCancelRevenue',
    value: {
      contract_address,
      deployer_address,
    },
  }
}
