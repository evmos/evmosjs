import { MSG_CONVERT_COIN_TYPES, createMsgConvertCoin } from './convertCoin'
import TestUtils from '../../tests/utils'

describe('test MsgConvertCoin types and messages', () => {
  it('creates types as expected', () => {
    const expTypes = {
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

    expect(MSG_CONVERT_COIN_TYPES).toStrictEqual(expTypes)
  })

  it('creates messages as expected', () => {
    const { denom } = TestUtils
    const amount = TestUtils.amount1
    const senderBech32 = TestUtils.addr1
    const receiverHex = TestUtils.addrHex1

    const msg = createMsgConvertCoin(denom, amount, receiverHex, senderBech32)

    const expMsg = {
      type: 'evmos/MsgConvertCoin',
      value: {
        coin: {
          denom,
          amount,
        },
        receiver: receiverHex,
        sender: senderBech32,
      },
    }

    expect(msg).toStrictEqual(expMsg)
  })
})
