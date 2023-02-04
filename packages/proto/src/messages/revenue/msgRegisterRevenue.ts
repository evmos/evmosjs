import { MsgRegisterRevenue } from '../../proto/evmos/revenue/tx'

export function createMsgRegisterRevenue(
  contractAddress: string,
  deployerAddress: string,
  withdrawerAddress: string,
  nonces: number[],
) {
  const msg = new MsgRegisterRevenue({
    contractAddress,
    deployerAddress,
    withdrawerAddress,
    nonces: nonces.map((n) => BigInt(n)),
  })
  return {
    message: msg,
    path: MsgRegisterRevenue.typeName,
  }
}
