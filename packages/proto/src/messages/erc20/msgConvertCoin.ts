import { Coin } from '../../proto/cosmos/base/coin.js'
import { MsgConvertCoin } from '../../proto/evmos/erc20/tx.js'

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
