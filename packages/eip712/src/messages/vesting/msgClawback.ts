export const MSG_CLAWBACK = {
  MsgValue: [
    { name: 'funder_address', type: 'string' },
    { name: 'account_address', type: 'string' },
    { name: 'dest_address', type: 'string' },
  ],
}

/* eslint-disable camelcase */
export function createMsgClawback(
  funder_address: string,
  account_address: string,
  dest_address?: string,
) {
  return {
    type: 'evmos/MsgClawback',
    value: {
      funder_address,
      account_address,
      dest_address,
    },
  }
}
