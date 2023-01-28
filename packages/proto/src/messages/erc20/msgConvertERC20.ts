import { MsgConvertERC20 } from '@buf/evmos_evmos.bufbuild_es/evmos/erc20/v1/tx_pb'

export function createMsgConvertERC20(
  contractAddress: string,
  amount: string,
  receiver: string,
  sender: string,
) {
  const msg = new MsgConvertERC20({
    contractAddress,
    amount,
    receiver,
    sender,
  })
  return {
    message: msg,
    path: 'evmos.erc20.v1.MsgConvertERC20',
  }
}
