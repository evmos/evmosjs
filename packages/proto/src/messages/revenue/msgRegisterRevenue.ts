import { MsgRegisterRevenue } from '../../proto/evmos/revenue/tx.js'

export function createMsgRegisterRevenue(
  contractAddress: string,
  deployerAddress: string,
  withdrawerAddress: string,
  nonces: number[],
) {
  const noncesBigInt = nonces.map((n) => BigInt(n))

  const msg = new MsgRegisterRevenue({
    contractAddress,
    deployerAddress,
    withdrawerAddress,
    nonces: noncesBigInt,
  })
  return {
    message: msg,
    path: MsgRegisterRevenue.typeName,
  }
}
