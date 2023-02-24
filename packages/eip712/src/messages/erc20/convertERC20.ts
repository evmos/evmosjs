export const MSG_CONVERT_ERC20_TYPES = {
  MsgValue: [
    { name: 'contract_address', type: 'string' },
    { name: 'amount', type: 'string' },
    { name: 'receiver', type: 'string' },
    { name: 'sender', type: 'string' },
  ],
}

export function createMsgConvertERC20(
  contractAddress: string,
  amount: string,
  receiver: string,
  sender: string,
) {
  return {
    type: 'evmos/MsgConvertERC20',
    value: {
      contract_address: contractAddress,
      amount,
      receiver,
      sender,
    },
  }
}
