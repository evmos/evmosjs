import { createMsgSend } from '../../src/messages/msgSend'
import {
  createBody,
  createFee,
  createSignerInfo,
  createAuthInfo,
  createSigDoc,
} from '../../src/transaction/transaction'

describe('transaction tests', () => {
  it('createBody test', () => {
    const msgSend = createMsgSend(
      'evmos18lw704zeyg5zs098lq7x6ypfkfjqlzzln5qh89',
      'evmos1ndfagggdkgv9vc7wha5gj2zzrnyqd3r704lr4q',
      '69420',
      'aphoton',
    )
    const res = createBody(msgSend, 'this is a test')
    expect(res.toObject()).toStrictEqual({
      messages: [
        {
          type_url: '/cosmos.bank.v1beta1.MsgSend',
          value: new Uint8Array([
            10, 44, 101, 118, 109, 111, 115, 49, 56, 108, 119, 55, 48, 52, 122,
            101, 121, 103, 53, 122, 115, 48, 57, 56, 108, 113, 55, 120, 54, 121,
            112, 102, 107, 102, 106, 113, 108, 122, 122, 108, 110, 53, 113, 104,
            56, 57, 18, 44, 101, 118, 109, 111, 115, 49, 110, 100, 102, 97, 103,
            103, 103, 100, 107, 103, 118, 57, 118, 99, 55, 119, 104, 97, 53,
            103, 106, 50, 122, 122, 114, 110, 121, 113, 100, 51, 114, 55, 48,
            52, 108, 114, 52, 113, 26, 16, 10, 7, 97, 112, 104, 111, 116, 111,
            110, 18, 5, 54, 57, 52, 50, 48,
          ]),
        },
      ],
      memo: 'this is a test',
      extension_options: [],
      non_critical_extension_options: [],
    })
  })

  it('createFee test', () => {
    const value = '20'
    const denom = 'aphoton'
    const gas = 20000
    const fee = createFee(value, denom, gas)
    expect(fee.toObject()).toStrictEqual({
      amount: [
        {
          amount: value,
          denom,
        },
      ],
      gas_limit: gas,
    })
  })

  it('createSignerInfo test', () => {
    const pubkey = new Uint8Array([
      10, 33, 2, 136, 177, 245, 49, 184, 120, 113, 219, 192, 55, 41, 81, 135,
      37, 92, 174, 75, 160, 196, 188, 55, 202, 114, 97, 5, 178, 20, 10, 253, 14,
      105, 23,
    ])
    const sequence = 0
    const info = createSignerInfo('ethsecp256k1', pubkey, sequence)
    expect(info.toObject()).toStrictEqual({
      public_key: {
        type_url: '/ethermint.crypto.v1.ethsecp256k1.PubKey',
        // value: 'CiMKIQKIsfUxuHhx28A3KVGHJVyuS6DEvDfKcmEFshQK/Q5pFw=='
        value: new Uint8Array([
          10, 35, 10, 33, 2, 136, 177, 245, 49, 184, 120, 113, 219, 192, 55, 41,
          81, 135, 37, 92, 174, 75, 160, 196, 188, 55, 202, 114, 97, 5, 178, 20,
          10, 253, 14, 105, 23,
        ]),
      },
      mode_info: { single: { mode: 1 } },
      sequence: 0,
    })
  })

  it('createAuthInfo test', () => {
    const pubkey = new Uint8Array([
      10, 33, 2, 136, 177, 245, 49, 184, 120, 113, 219, 192, 55, 41, 81, 135,
      37, 92, 174, 75, 160, 196, 188, 55, 202, 114, 97, 5, 178, 20, 10, 253, 14,
      105, 23,
    ])
    const sequence = 0
    const info = createSignerInfo('ethsecp256k1', pubkey, sequence)
    const value = '20'
    const denom = 'aphoton'
    const gas = 20000
    const fee = createFee(value, denom, gas)

    const msg = createAuthInfo(info, fee)
    expect(msg.toObject()).toStrictEqual({
      signer_infos: [
        {
          public_key: {
            type_url: '/ethermint.crypto.v1.ethsecp256k1.PubKey',
            // value: 'CiMKIQKIsfUxuHhx28A3KVGHJVyuS6DEvDfKcmEFshQK/Q5pFw=='
            value: new Uint8Array([
              10, 35, 10, 33, 2, 136, 177, 245, 49, 184, 120, 113, 219, 192, 55,
              41, 81, 135, 37, 92, 174, 75, 160, 196, 188, 55, 202, 114, 97, 5,
              178, 20, 10, 253, 14, 105, 23,
            ]),
          },
          mode_info: { single: { mode: 1 } },
          sequence,
        },
      ],
      fee: {
        amount: [
          {
            amount: value,
            denom,
          },
        ],
        gas_limit: gas,
      },
    })
  })

  it('createSigDoc test', () => {
    const msgSend = createMsgSend(
      'evmos18lw704zeyg5zs098lq7x6ypfkfjqlzzln5qh89',
      'evmos1ndfagggdkgv9vc7wha5gj2zzrnyqd3r704lr4q',
      '69420',
      'aphoton',
    )
    const bodyBytes = createBody(msgSend, 'this is a test')

    const pubkey = new Uint8Array([
      10, 33, 2, 136, 177, 245, 49, 184, 120, 113, 219, 192, 55, 41, 81, 135,
      37, 92, 174, 75, 160, 196, 188, 55, 202, 114, 97, 5, 178, 20, 10, 253, 14,
      105, 23,
    ])
    const sequence = 0
    const info = createSignerInfo('ethsecp256k1', pubkey, sequence)
    const value = '20'
    const denom = 'aphoton'
    const gas = 20000
    const fee = createFee(value, denom, gas)

    const authInfo = createAuthInfo(info, fee)

    const chainId = 'evmos-9000_1'

    const accountNumber = 0

    const s = bodyBytes.serializeBinary()

    const res = createSigDoc(
      bodyBytes.serializeBinary(),
      authInfo.serializeBinary(),
      chainId,
      accountNumber,
    )
    expect(res.toObject()).toStrictEqual({
      body_bytes: new Uint8Array([
        10, 142, 1, 10, 28, 47, 99, 111, 115, 109, 111, 115, 46, 98, 97, 110,
        107, 46, 118, 49, 98, 101, 116, 97, 49, 46, 77, 115, 103, 83, 101, 110,
        100, 18, 110, 10, 44, 101, 118, 109, 111, 115, 49, 56, 108, 119, 55, 48,
        52, 122, 101, 121, 103, 53, 122, 115, 48, 57, 56, 108, 113, 55, 120, 54,
        121, 112, 102, 107, 102, 106, 113, 108, 122, 122, 108, 110, 53, 113,
        104, 56, 57, 18, 44, 101, 118, 109, 111, 115, 49, 110, 100, 102, 97,
        103, 103, 103, 100, 107, 103, 118, 57, 118, 99, 55, 119, 104, 97, 53,
        103, 106, 50, 122, 122, 114, 110, 121, 113, 100, 51, 114, 55, 48, 52,
        108, 114, 52, 113, 26, 16, 10, 7, 97, 112, 104, 111, 116, 111, 110, 18,
        5, 54, 57, 52, 50, 48, 18, 14, 116, 104, 105, 115, 32, 105, 115, 32, 97,
        32, 116, 101, 115, 116,
      ]),
      auth_info_bytes: new Uint8Array([
        10, 91, 10, 81, 10, 40, 47, 101, 116, 104, 101, 114, 109, 105, 110, 116,
        46, 99, 114, 121, 112, 116, 111, 46, 118, 49, 46, 101, 116, 104, 115,
        101, 99, 112, 50, 53, 54, 107, 49, 46, 80, 117, 98, 75, 101, 121, 18,
        37, 10, 35, 10, 33, 2, 136, 177, 245, 49, 184, 120, 113, 219, 192, 55,
        41, 81, 135, 37, 92, 174, 75, 160, 196, 188, 55, 202, 114, 97, 5, 178,
        20, 10, 253, 14, 105, 23, 18, 4, 10, 2, 8, 1, 24, 0, 18, 19, 10, 13, 10,
        7, 97, 112, 104, 111, 116, 111, 110, 18, 2, 50, 48, 16, 160, 156, 1,
      ]),
      chain_id: chainId,
      account_number: accountNumber,
    })
  })
})
