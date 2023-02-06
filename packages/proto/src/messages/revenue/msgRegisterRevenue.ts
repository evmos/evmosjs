import { MsgRegisterRevenue } from '../../proto/evmos/revenue/tx'

export function createMsgRegisterRevenue(
  contractAddress: string,
  deployerAddress: string,
  withdrawerAddress: string,
  nonces: number[],
) {
  const bigIntNonces = nonces.map((n) => BigInt(n))

  const msg = new MsgRegisterRevenue({
    contractAddress,
    deployerAddress,
    withdrawerAddress,
    nonces: bigIntNonces,
  })
  return {
    message: msg,
    path: MsgRegisterRevenue.typeName,
  }
}
