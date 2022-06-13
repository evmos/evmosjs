import * as erc20 from '../../proto/evmos/erc20/v1/tx'

export function createMsgConvertERC20(
  contractAddress: string,
  amount: string,
  receiver: string,
  sender: string,
) {
  const msg = new erc20.evmos.erc20.v1.MsgConvertERC20({
    contract_address: contractAddress,
    amount,
    receiver,
    sender,
  })
  return {
    message: msg,
    path: 'evmos.erc20.v1.MsgConvertERC20',
  }
}
