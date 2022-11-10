import * as govTx from '../../proto/cosmos/gov/v1beta1/tx'
import * as coin from '../../proto/cosmos/base/v1beta1/coin'

export function createMsgSubmitProposal(
  content: any,
  initialDepositDenom: string,
  initialDepositAmount: string,
  proposer: string,
) {
  const initialDeposit = new coin.cosmos.base.v1beta1.Coin({
    denom: initialDepositDenom,
    amount: initialDepositAmount,
  })
  const msg = new govTx.cosmos.gov.v1beta1.MsgSubmitProposal({
    content,
    initial_deposit: [initialDeposit],
    proposer,
  })

  return {
    message: msg,
    path: 'cosmos.gov.v1beta1.MsgSubmitProposal',
  }
}
