import { createMsgConvertCoin } from './msgConvertCoin'
import { createMsgConvertERC20 } from './msgConvertERC20'

import { MsgConvertCoin, MsgConvertERC20 } from '../../proto/evmos/erc20/tx'

import { from, to, denom, hex } from '../../proto/tests/utils'
import { JSONOptions } from '../../proto/tests/common'

describe('test ERC20 Module message generation', () => {
  it('correctly wraps msgConvertCoin', () => {
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
    expect(msg.path).toStrictEqual(MsgConvertCoin.typeName)
  })

  it('correctly wraps msgConvertERC20', () => {
    const amount = '10000000'
    const msg = createMsgConvertERC20(hex, amount, to, from)

    expect(msg.message.toJson(JSONOptions)).toStrictEqual({
      contract_address: hex,
      amount,
      receiver: to,
      sender: from,
    })
    expect(msg.path).toStrictEqual(MsgConvertERC20.typeName)
  })
})
