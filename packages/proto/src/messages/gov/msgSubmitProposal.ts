import * as govTx from '../../proto/cosmos/gov/v1beta1/tx'
import * as coin from '../../proto/cosmos/base/v1beta1/coin'
import { createAnyMessage } from '../utils'
// import * as dependency_5 from "../../proto/google/protobuf/any";

export function createMsgSubmitProposal(
  content: any,
  initialDepositDenom: string,
  initialDepositAmount: string,
  proposer: string,
) {
  const initialDeposit: coin.cosmos.base.v1beta1.Coin[] = [
    new coin.cosmos.base.v1beta1.Coin({
      denom: initialDepositDenom,
      amount: initialDepositAmount,
    }),
  ]

  const serializedContent = createAnyMessage(content)
  const msg = new govTx.cosmos.gov.v1beta1.MsgSubmitProposal({
    content: serializedContent,
    initial_deposit: initialDeposit,
    proposer,
  })

  return {
    message: msg,
    path: 'cosmos.gov.v1beta1.MsgSubmitProposal',
  }
}
