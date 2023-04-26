import eip712Types from './createTypes'

describe('test eip-712 type generation from payload', () => {
  it('generates types for a complex payload', () => {
    const params = {
      payload: {
        msg0: {
          type: 'cosmos-sdk/MsgSend',
          value: {
            recipient: 'recipient.evmos',
            amount: {
              amount: '10000',
              denom: 'aevmos',
            },
          },
        },
      },
      numMessages: 1,
    }
    const types = eip712Types(params)

    console.log(types)

    expect(types.TypeMsgSend0).toStrictEqual([
      {
        type: 'string',
        name: 'type',
      },
      {
        type: 'TypeValue0',
        name: 'value',
      },
    ])
    expect(types.TypeValue0).toStrictEqual([
      {
        type: 'TypeValueAmount0',
        name: 'amount',
      },
      {
        type: 'string',
        name: 'recipient',
      },
    ])
    expect(types.TypeValueAmount0).toStrictEqual([
      {
        type: 'string',
        name: 'amount',
      },
      {
        type: 'string',
        name: 'denom',
      },
    ])
  })
})

// eslint-disable-next-line jest/no-commented-out-tests
// describe('test eip-712 types edge cases', () => {
// })
//
// eslint-disable-next-line jest/no-commented-out-tests
// describe('test eip-712 types error handling', () => {
// })
