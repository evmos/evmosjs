import * as revenue from '../../proto/evmos/revenue/v1/tx'

export function createMsgUpdateRevenue(
  contractAddress: string,
  deployerAddress: string,
  withdrawerAddress: string,
) {
  const msg = new revenue.evmos.revenue.v1.MsgUpdateRevenue({
    contract_address: contractAddress,
    deployer_address: deployerAddress,
    withdrawer_address: withdrawerAddress,
  })
  return {
    message: msg,
    path: 'evmos.revenue.v1.MsgUpdateRevenue',
  }
}
