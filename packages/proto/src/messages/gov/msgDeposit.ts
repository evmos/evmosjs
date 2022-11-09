import * as tx from '../../proto/cosmos/gov/v1beta1/tx'
import * as coin from '../../proto/cosmos/base/v1beta1/coin'

export function createMsgDeposit(
  proposalId: number,
  depositor: string,
  deposit: {
    denom: string
    amount: string
  },
) {
  const depositAmount = new coin.cosmos.base.v1beta1.Coin({ ...deposit })
  const depositMessage = new tx.cosmos.gov.v1beta1.MsgDeposit({
    proposal_id: proposalId,
    depositor,
    amount: [depositAmount],
  })

  return {
    path: 'cosmos.gov.v1beta1.MsgDeposit',
    message: depositMessage,
  }
}
