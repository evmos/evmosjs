import { createMsgSend } from './msgsend'

describe('msgSend tests', () => {
  it('createMsgSend', () => {
    expect(
      createMsgSend(
        '1',
        'aphoton',
        'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm',
        'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm',
      ),
    ).toStrictEqual({
      type: 'cosmos-sdk/MsgSend',
      value: {
        amount: [
          {
            amount: '1',
            denom: 'aphoton',
          },
        ],
        from_address: 'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm',
        to_address: 'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm',
      },
    })
  })
})
