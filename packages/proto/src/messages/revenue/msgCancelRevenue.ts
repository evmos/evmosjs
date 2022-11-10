import * as revenue from '../../proto/evmos/revenue/v1/tx'

export function createMsgCancelRevenue(
  contractAddress: string,
  deployerAddress: string,
) {
  const msg = new revenue.evmos.revenue.v1.MsgCancelRevenue({
    contract_address: contractAddress,
    deployer_address: deployerAddress,
  })
  return {
    message: msg,
    path: 'evmos.revenue.v1.MsgCancelRevenue',
  }
}
