import * as feesplit from '../../proto/evmos/feesplit/v1/tx'

export function createMsgRegisterFeeSplit(
  contractAddress: string,
  deployerAddress: string,
  withdrawerAddress: string,
  nonces: number[],
) {
  const msg = new feesplit.evmos.feesplit.v1.MsgRegisterFeeSplit({
    contract_address: contractAddress,
    deployer_address: deployerAddress,
    withdrawer_address: withdrawerAddress,
    nonces,
  })
  return {
    message: msg,
    path: 'feesplit.erc20.v1.MsgRegisterFeeSplit',
  }
}
