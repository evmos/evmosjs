import { MsgCancelRevenue } from '../../types/evmos/revenue/tx'

export function createMsgCancelRevenue(
  contractAddress: string,
  deployerAddress: string,
) {
  const msg = new MsgCancelRevenue({
    contractAddress,
    deployerAddress,
  })
  return {
    message: msg,
    path: MsgCancelRevenue.typeName,
  }
}
