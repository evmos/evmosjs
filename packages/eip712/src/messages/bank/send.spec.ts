import { MSG_SEND_TYPES, createMsgSend } from './send'
import TestUtils from '../../tests/utils'

describe('test MsgSend types and messages', () => {
  it('creates types as expected', () => {
    const expTypes = {
      MsgValue: [
        { name: 'from_address', type: 'string' },
        { name: 'to_address', type: 'string' },
        { name: 'amount', type: 'TypeAmount[]' },
      ],
      TypeAmount: [
        { name: 'denom', type: 'string' },
        { name: 'amount', type: 'string' },
      ],
    }

    expect(MSG_SEND_TYPES).toStrictEqual(expTypes)
  })

  it('creates messages as expected', () => {
    const { denom } = TestUtils
    const amount = TestUtils.amount1
    const sender = TestUtils.addr1
    const receiver = TestUtils.addr2

    const msg = createMsgSend(amount, denom, sender, receiver)

    const expMsg = {
      type: 'cosmos-sdk/MsgSend',
      value: {
        amount: [
          {
            amount,
            denom,
          },
        ],
        from_address: sender,
        to_address: receiver,
      },
    }

    expect(msg).toStrictEqual(expMsg)
  })
})
