import { Coin } from '../../proto/cosmos/base/coin'
import { MsgConvertCoin } from '../../proto/evmos/erc20/tx'

export function createMsgConvertCoin(
  denom: string,
  amount: string,
  receiver: string,
  sender: string,
) {
  const msg = new MsgConvertCoin({
    coin: new Coin({
      denom,
      amount,
    }),
    receiver,
    sender,
  })
  return {
    message: msg,
    path: MsgConvertCoin.typeName,
  }
}
