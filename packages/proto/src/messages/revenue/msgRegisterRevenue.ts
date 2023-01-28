import { MsgRegisterFeeSplit } from '@buf/evmos_evmos.bufbuild_es/evmos/feesplit/v1/tx_pb'

export function createMsgRegisterFeeSplit(
  contractAddress: string,
  deployerAddress: string,
  withdrawerAddress: string,
  nonces: number[],
) {
  const msg = new MsgRegisterFeeSplit({
    contractAddress,
    deployerAddress,
    withdrawerAddress,
    nonces: nonces.map((n) => BigInt(n)),
  })
  return {
    message: msg,
    path: 'evmos.feesplit.v1.MsgRegisterFeeSplit',
  }
}
