import * as bank from '../proto/cosmos/bank/v1beta1/tx'
import * as coin from '../proto/cosmos/base/v1beta1/coin'

export function createMsgSend(
  fromAddress: string,
  toAddress: string,
  amount: string,
  denom: string,
) {
  const value = new coin.cosmos.base.v1beta1.Coin({
    denom,
    amount,
  })

  const message = new bank.cosmos.bank.v1beta1.MsgSend({
    from_address: fromAddress,
    to_address: toAddress,
    amount: [value],
  })
  return {
    message,
    path: 'cosmos.bank.v1beta1.MsgSend',
  }
}
