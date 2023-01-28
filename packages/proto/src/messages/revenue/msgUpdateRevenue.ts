import { MsgUpdateFeeSplit } from '@buf/evmos_evmos.bufbuild_es/evmos/feesplit/v1/tx_pb'

export function createMsgUpdateFeeSplit(
  contractAddress: string,
  deployerAddress: string,
  withdrawerAddress: string,
) {
  const msg = new MsgUpdateFeeSplit({
    contractAddress,
    deployerAddress,
    withdrawerAddress,
  })
  return {
    message: msg,
    path: 'evmos.feesplit.v1.MsgUpdateFeeSplit',
  }
}
