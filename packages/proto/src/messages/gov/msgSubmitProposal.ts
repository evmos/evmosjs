import { Coin } from '@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/base/v1beta1/coin_pb'
import { MsgSubmitProposal } from '@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/gov/v1beta1/tx_pb'

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
    path: 'cosmos.gov.v1beta1.MsgSubmitProposal',
  }
}
