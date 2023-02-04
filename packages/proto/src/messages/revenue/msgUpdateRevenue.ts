import { MsgUpdateRevenue } from '../../proto/evmos/revenue/tx'

export function createMsgUpdateRevenue(
  contractAddress: string,
  deployerAddress: string,
  withdrawerAddress: string,
) {
  const msg = new MsgUpdateRevenue({
    contractAddress,
    deployerAddress,
    withdrawerAddress,
  })
  return {
    message: msg,
    path: MsgUpdateRevenue.typeName,
  }
}
