import { MsgClawback } from '../../proto/evmos/vesting/tx'

export function createMsgClawback(
  funderAddress: string,
  accountAddress: string,
  destAddress?: string,
) {
  const msg = new MsgClawback({
    funderAddress,
    accountAddress,
    destAddress,
  })
  return {
    message: msg,
    path: MsgClawback.typeName,
  }
}
