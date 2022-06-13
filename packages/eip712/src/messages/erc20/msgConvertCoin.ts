export const MSG_CONVERT_COIN_TYPES = {
  MsgValue: [
    { name: 'coin', type: 'TypeCoin' },
    { name: 'receiver', type: 'string' },
    { name: 'sender', type: 'string' },
  ],
  TypeCoin: [
    { name: 'denom', type: 'string' },
    { name: 'amount', type: 'string' },
  ],
}
export function createMsgConvertCoin(
  denom: string,
  amount: string,
  receiver: string,
  sender: string,
) {
  return {
    type: 'cosmos-sdk/MsgConvertCoin',
    value: {
      coin: {
        denom,
        amount,
      },
      amount,
      receiver,
      sender,
    },
  }
}
