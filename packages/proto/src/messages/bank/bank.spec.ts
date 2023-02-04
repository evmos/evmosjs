import { createMsgSend } from './msgSend'
import { from, to, denom } from '../../proto/tests/utils'
import { JSONOptions } from '../../proto/tests/common'

describe('bank messages', () => {
  it('msgSend', () => {
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
    expect(msg.path).toStrictEqual(msg.message.getType().typeName)
  })
})
