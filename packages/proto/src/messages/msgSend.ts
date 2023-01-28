import { MsgSend } from '@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/bank/v1beta1/tx_pb.js'
import { Coin } from '@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/base/v1beta1/coin_pb.js'

export function createMsgSend(
  fromAddress: string,
  toAddress: string,
  amount: string,
  denom: string,
) {
  const value = new Coin({
    denom,
    amount,
  })

  const message = new MsgSend({
    fromAddress,
    toAddress,
    amount: [value],
  })
  return {
    message,
    path: 'cosmos.bank.v1beta1.MsgSend',
  }
}
