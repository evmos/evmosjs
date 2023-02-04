import { createMsgConvertCoin } from './msgConvertCoin'
import { createMsgConvertERC20 } from './msgConvertERC20'
import { from, to, denom, hex } from '../../proto/tests/utils'
import { JSONOptions } from '../../proto/tests/common'

describe('erc20 messages', () => {
  it('msgConvertCoin', () => {
    const amount = '10000000'
    const msg = createMsgConvertCoin(denom, amount, hex, from)

    expect(msg.message.toJson(JSONOptions)).toStrictEqual({
      coin: {
        amount,
        denom,
      },
      receiver: hex,
      sender: from,
    })
    expect(msg.path).toStrictEqual(msg.message.getType().typeName)
  })

  it('msgConvertERC20', () => {
    const amount = '10000000'
    const msg = createMsgConvertERC20(hex, amount, to, from)

    expect(msg.message.toJson(JSONOptions)).toStrictEqual({
      contract_address: hex,
      amount,
      receiver: to,
      sender: from,
    })
    expect(msg.path).toStrictEqual(msg.message.getType().typeName)
  })
})
