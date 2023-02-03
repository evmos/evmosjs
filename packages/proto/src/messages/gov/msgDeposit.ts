import { Coin } from '../../types/cosmos/base/coin'
import { MsgDeposit } from '../../types/cosmos/gov/tx'

export function createMsgDeposit(
  proposalId: number,
  depositor: string,
  deposit: {
    denom: string
    amount: string
  },
) {
  const depositAmount = new Coin({ ...deposit })
  const depositMessage = new MsgDeposit({
    proposalId: BigInt(proposalId),
    depositor,
    amount: [depositAmount],
  })

  return {
    path: MsgDeposit.typeName,
    message: depositMessage,
  }
}
