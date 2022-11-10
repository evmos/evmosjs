import * as revenue from '../../proto/evmos/revenue/v1/tx'

export function createMsgRegisterRevenue(
  contractAddress: string,
  deployerAddress: string,
  withdrawerAddress: string,
  nonces: number[],
) {
  const msg = new revenue.evmos.revenue.v1.MsgRegisterRevenue({
    contract_address: contractAddress,
    deployer_address: deployerAddress,
    withdrawer_address: withdrawerAddress,
    nonces,
  })
  return {
    message: msg,
    path: 'evmos.revenue.v1.MsgRegisterRevenue',
  }
}
