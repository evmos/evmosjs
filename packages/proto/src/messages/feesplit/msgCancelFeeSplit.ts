import * as feesplit from '../../proto/evmos/feesplit/v1/tx'

export function createMsgCancelFeeSplit(
  contractAddress: string,
  deployerAddress: string,
) {
  const msg = new feesplit.evmos.feesplit.v1.MsgCancelFeeSplit({
    contract_address: contractAddress,
    deployer_address: deployerAddress,
  })
  return {
    message: msg,
    path: 'evmos.feesplit.v1.MsgCancelFeeSplit',
  }
}
