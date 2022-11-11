import * as vesting from '../../proto/evmos/vesting/v1/tx'

export function createMsgClawback(
  funderAddress: string,
  accountAddress: string,
  destAddress?: string,
) {
  const msg = new vesting.evmos.vesting.v1.MsgClawback({
    funder_address: funderAddress,
    account_address: accountAddress,
    dest_address: destAddress,
  })
  return {
    message: msg,
    path: 'evmos.vesting.v1.MsgClawback',
  }
}
