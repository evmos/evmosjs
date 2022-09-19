import * as feesplit from '../../proto/evmos/feesplit/v1/tx'

export function createMsgUpdateFeeSplit(
  contractAddress: string,
  deployerAddress: string,
  withdrawerAddress: string,
) {
  const msg = new feesplit.evmos.feesplit.v1.MsgUpdateFeeSplit({
    contract_address: contractAddress,
    deployer_address: deployerAddress,
    withdrawer_address: withdrawerAddress,
  })
  return {
    message: msg,
    path: 'evmos.feesplit.v1.MsgUpdateFeeSplit',
  }
}
