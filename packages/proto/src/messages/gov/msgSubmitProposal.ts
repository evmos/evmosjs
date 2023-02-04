import { Coin } from '../../types/cosmos/base/coin'
import { MsgSubmitProposal } from '../../types/cosmos/gov/tx'

export function createMsgSubmitProposal(
  content: any,
  initialDepositDenom: string,
  initialDepositAmount: string,
  proposer: string,
) {
  const initialDeposit = new Coin({
    denom: initialDepositDenom,
    amount: initialDepositAmount,
  })
  const msg = new MsgSubmitProposal({
    content,
    initialDeposit: [initialDeposit],
    proposer,
  })

  return {
    message: msg,
    path: MsgSubmitProposal.typeName,
  }
}
