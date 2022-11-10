export const MSG_REGISTER_REVENUE_TYPES = {
  MsgValue: [
    { name: 'contract_address', type: 'string' },
    { name: 'deployer_address', type: 'string' },
    { name: 'withdrawer_address', type: 'string' },
    { name: 'nonces', type: 'uint64[]' },
  ],
}

/* eslint-disable camelcase */
export function createMsgRegisterRevenue(
  contract_address: string,
  deployer_address: string,
  withdrawer_address: string,
  nonces: number[],
) {
  return {
    type: 'evmos/MsgRegisterRevenue',
    value: {
      contract_address,
      deployer_address,
      withdrawer_address,
      nonces,
    },
  }
}
