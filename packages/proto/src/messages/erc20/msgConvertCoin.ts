import * as erc20 from '../../proto/evmos/erc20/v1/tx'
import * as coin from '../../proto/cosmos/base/v1beta1/coin'

export function createMsgConvertCoin(
  denom: string,
  amount: string,
  receiver: string,
  sender: string,
) {
  const msg = new erc20.evmos.erc20.v1.MsgConvertCoin({
    coin: new coin.cosmos.base.v1beta1.Coin({
      denom,
      amount,
    }),
    receiver,
    sender,
  })
  return {
    message: msg,
    path: 'evmos.erc20.v1.MsgConvertCoin',
  }
}
