import { MsgCancelRevenue } from '../../proto/evmos/revenue/tx.js'

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
