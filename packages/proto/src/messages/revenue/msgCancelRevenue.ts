import { MsgCancelFeeSplit } from '@buf/evmos_evmos.bufbuild_es/evmos/feesplit/v1/tx_pb'

export function createMsgCancelRevenue(
  contractAddress: string,
  deployerAddress: string,
) {
  const msg = new MsgCancelFeeSplit({
    contractAddress,
    deployerAddress,
  })
  return {
    message: msg,
    path: 'evmos.revenue.v1.MsgCancelRevenue',
  }
}
