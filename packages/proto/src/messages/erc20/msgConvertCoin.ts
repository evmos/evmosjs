import { MsgConvertCoin } from '@buf/evmos_evmos.bufbuild_es/evmos/erc20/v1/tx_pb'
import { Coin } from '@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/base/v1beta1/coin_pb'

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
    path: 'evmos.erc20.v1.MsgConvertCoin',
  }
}
