import { createMsgSend } from '../../src/messages/msgSend'

describe('msgSend tests', () => {
  it('create message send', async () => {
    const message = createMsgSend(
      'evmos18lw704zeyg5zs098lq7x6ypfkfjqlzzln5qh89',
      'evmos1ndfagggdkgv9vc7wha5gj2zzrnyqd3r704lr4q',
      '69420',
      'aphoton',
    )
    const expectedObject = {
      fromAddress: 'evmos18lw704zeyg5zs098lq7x6ypfkfjqlzzln5qh89',
      toAddress: 'evmos1ndfagggdkgv9vc7wha5gj2zzrnyqd3r704lr4q',
      amount: [
        {
          denom: 'aphoton',
          amount: '69420',
        },
      ],
    }

    expect(message.message.toJson()).toStrictEqual(expectedObject)
    expect(message.path).toBe('cosmos.bank.v1beta1.MsgSend')
  })
})
