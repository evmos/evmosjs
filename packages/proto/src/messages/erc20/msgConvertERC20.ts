import { MsgConvertERC20 } from '../../types/evmos/erc20/tx'

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
    path: MsgConvertERC20.typeName,
  }
}
