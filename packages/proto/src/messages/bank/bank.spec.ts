import { createMsgSend } from './msgSend.js'
import { MsgSend } from '../../proto/cosmos/bank/tx.js'
import { from, to, denom } from '../../proto/tests/utils.js'
import { JSONOptions } from '../../proto/tests/common.js'

describe('test Bank Module message generation', () => {
  it('correctly wraps MsgSend', () => {
    const amount = '10000000'
    const msg = createMsgSend(from, to, amount, denom)

    expect(msg.message.toJson(JSONOptions)).toStrictEqual({
      from_address: from,
      to_address: to,
      amount: [
        {
          amount,
          denom,
        },
      ],
    })
    expect(msg.path).toStrictEqual(MsgSend.typeName)
  })
})
