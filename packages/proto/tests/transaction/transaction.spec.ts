import { createMsgSend } from '../../src/messages/msgSend'

import {
  createBody,
  createFee,
  createSignerInfo,
  createAuthInfo,
  createSigDoc,
  createTransaction,
  SIGN_DIRECT,
} from '../../src/transaction/transaction'
import { JSONOptions } from '../types'

describe('transaction tests', () => {
  it('createBody test', () => {
    const msgSend = createMsgSend(
      'evmos18lw704zeyg5zs098lq7x6ypfkfjqlzzln5qh89',
      'evmos1ndfagggdkgv9vc7wha5gj2zzrnyqd3r704lr4q',
      '69420',
      'aphoton',
    )
    const res = createBody(msgSend, 'this is a test')
    expect(res.toJson(JSONOptions)).toStrictEqual({
      messages: [
        {
          '@type': '/cosmos.bank.v1beta1.MsgSend',
          amount: [
            {
              amount: '69420',
              denom: 'aphoton',
            },
          ],
          from_address: 'evmos18lw704zeyg5zs098lq7x6ypfkfjqlzzln5qh89',
          to_address: 'evmos1ndfagggdkgv9vc7wha5gj2zzrnyqd3r704lr4q',
        },
      ],
      memo: 'this is a test',
      extension_options: [],
      non_critical_extension_options: [],
      timeout_height: '0',
    })
  })

  it('createFee test', () => {
    const value = '20'
    const denom = 'aphoton'
    const gas = 20000
    const fee = createFee(value, denom, gas)
    expect(fee.toJson(JSONOptions)).toStrictEqual({
      amount: [
        {
          amount: value,
          denom,
        },
      ],
      gas_limit: gas.toString(),
      granter: '',
      payer: '',
    })
  })

  it('createSignerInfo test', () => {
    const pubkey = new Uint8Array([
      10, 33, 2, 136, 177, 245, 49, 184, 120, 113, 219, 192, 55, 41, 81, 135,
      37, 92, 174, 75, 160, 196, 188, 55, 202, 114, 97, 5, 178, 20, 10, 253, 14,
      105, 23,
    ])
    const sequence = BigInt(0)
    const info = createSignerInfo(pubkey, sequence, SIGN_DIRECT)
    expect(info.toJson(JSONOptions)).toStrictEqual({
      public_key: {
        '@type': '/ethermint.crypto.v1.ethsecp256k1.PubKey',
        key: Buffer.from(pubkey).toString('base64'),
      },
      mode_info: { single: { mode: 1 } },
      sequence: '0',
    })
  })

  it('createAuthInfo test', () => {
    const pubkey = new Uint8Array([
      10, 33, 2, 136, 177, 245, 49, 184, 120, 113, 219, 192, 55, 41, 81, 135,
      37, 92, 174, 75, 160, 196, 188, 55, 202, 114, 97, 5, 178, 20, 10, 253, 14,
      105, 23,
    ])
    const sequence = BigInt(10)
    const info = createSignerInfo(pubkey, sequence, SIGN_DIRECT)
    const value = '20'
    const denom = 'aphoton'
    const gas = 20000
    const fee = createFee(value, denom, gas)
    const msg = createAuthInfo(info, fee)
    expect(msg.toJson(JSONOptions)).toStrictEqual({
      signer_infos: [
        {
          public_key: {
            '@type': '/ethermint.crypto.v1.ethsecp256k1.PubKey',
            // value: 'CiMKIQKIsfUxuHhx28A3KVGHJVyuS6DEvDfKcmEFshQK/Q5pFw=='
            key: Buffer.from(pubkey).toString('base64'),
          },
          mode_info: { single: { mode: 1 } },
          sequence: '10',
        },
      ],
      fee: {
        amount: [
          {
            amount: value,
            denom,
          },
        ],
        gas_limit: gas.toString(),
        granter: '',
        payer: '',
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
    const body = createBody(msgSend, 'this is a test')
    const pubkey = new Uint8Array([
      10, 33, 2, 136, 177, 245, 49, 184, 120, 113, 219, 192, 55, 41, 81, 135,
      37, 92, 174, 75, 160, 196, 188, 55, 202, 114, 97, 5, 178, 20, 10, 253, 14,
      105, 23,
    ])
    const sequence = BigInt(0)
    const info = createSignerInfo(pubkey, sequence, 1)
    const value = '20'
    const denom = 'aphoton'
    const gas = 20000
    const fee = createFee(value, denom, gas)
    const authInfo = createAuthInfo(info, fee)
    const chainId = 'evmos-9000_1'
    const accountNumber = 0
    const res = createSigDoc(
      body.toBinary(),
      authInfo.toBinary(),
      chainId,
      accountNumber,
    )
    expect(res.toJson(JSONOptions)).toStrictEqual({
      body_bytes: Buffer.from(
        new Uint8Array([
          10, 142, 1, 10, 28, 47, 99, 111, 115, 109, 111, 115, 46, 98, 97, 110,
          107, 46, 118, 49, 98, 101, 116, 97, 49, 46, 77, 115, 103, 83, 101,
          110, 100, 18, 110, 10, 44, 101, 118, 109, 111, 115, 49, 56, 108, 119,
          55, 48, 52, 122, 101, 121, 103, 53, 122, 115, 48, 57, 56, 108, 113,
          55, 120, 54, 121, 112, 102, 107, 102, 106, 113, 108, 122, 122, 108,
          110, 53, 113, 104, 56, 57, 18, 44, 101, 118, 109, 111, 115, 49, 110,
          100, 102, 97, 103, 103, 103, 100, 107, 103, 118, 57, 118, 99, 55, 119,
          104, 97, 53, 103, 106, 50, 122, 122, 114, 110, 121, 113, 100, 51, 114,
          55, 48, 52, 108, 114, 52, 113, 26, 16, 10, 7, 97, 112, 104, 111, 116,
          111, 110, 18, 5, 54, 57, 52, 50, 48, 18, 14, 116, 104, 105, 115, 32,
          105, 115, 32, 97, 32, 116, 101, 115, 116,
        ]),
      ).toString('base64'),
      auth_info_bytes: Buffer.from(
        new Uint8Array([
          10, 91, 10, 81, 10, 40, 47, 101, 116, 104, 101, 114, 109, 105, 110,
          116, 46, 99, 114, 121, 112, 116, 111, 46, 118, 49, 46, 101, 116, 104,
          115, 101, 99, 112, 50, 53, 54, 107, 49, 46, 80, 117, 98, 75, 101, 121,
          18, 37, 10, 35, 10, 33, 2, 136, 177, 245, 49, 184, 120, 113, 219, 192,
          55, 41, 81, 135, 37, 92, 174, 75, 160, 196, 188, 55, 202, 114, 97, 5,
          178, 20, 10, 253, 14, 105, 23, 18, 4, 10, 2, 8, 1, 24, 0, 18, 19, 10,
          13, 10, 7, 97, 112, 104, 111, 116, 111, 110, 18, 2, 50, 48, 16, 160,
          156, 1,
        ]),
      ).toString('base64'),
      chain_id: chainId,
      account_number: accountNumber.toString(),
    })
  })
})

describe('transaction eip712', () => {
  it('valid eip712', () => {
    const msg = createMsgSend(
      'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm',
      'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm',
      '1',
      'aphoton',
    )
    const tx = createTransaction(
      msg,
      '',
      '20',
      'aphoton',
      200000,
      'AgTw+4v0daIrxsNSW4FcQ+IoingPseFwHO1DnssyoOqZ',
      BigInt(1),
      9,
      '',
    )
    expect(Buffer.from(tx.legacyAmino.body.toBinary()).toString('base64')).toBe(
      'CogBChwvY29zbW9zLmJhbmsudjFiZXRhMS5Nc2dTZW5kEmgKK2V0aG0xdGZlZ2Y1MG41eGwwaGQ1Y3hmempjYTN5bHNmcGcwZm5lZDVncW0SK2V0aG0xdGZlZ2Y1MG41eGwwaGQ1Y3hmempjYTN5bHNmcGcwZm5lZDVncW0aDAoHYXBob3RvbhIBMQ==',
    )
    expect(
      Buffer.from(tx.legacyAmino.authInfo.toBinary()).toString('base64'),
    ).toBe(
      'ClkKTwooL2V0aGVybWludC5jcnlwdG8udjEuZXRoc2VjcDI1NmsxLlB1YktleRIjCiECBPD7i/R1oivGw1JbgVxD4iiKeA+x4XAc7UOeyzKg6pkSBAoCCH8YARITCg0KB2FwaG90b24SAjIwEMCaDA==',
    )
    expect(Buffer.from(tx.signDirect.body.toBinary()).toString('base64')).toBe(
      'CogBChwvY29zbW9zLmJhbmsudjFiZXRhMS5Nc2dTZW5kEmgKK2V0aG0xdGZlZ2Y1MG41eGwwaGQ1Y3hmempjYTN5bHNmcGcwZm5lZDVncW0SK2V0aG0xdGZlZ2Y1MG41eGwwaGQ1Y3hmempjYTN5bHNmcGcwZm5lZDVncW0aDAoHYXBob3RvbhIBMQ==',
    )
    expect(
      Buffer.from(tx.signDirect.authInfo.toBinary()).toString('base64'),
    ).toBe(
      'ClkKTwooL2V0aGVybWludC5jcnlwdG8udjEuZXRoc2VjcDI1NmsxLlB1YktleRIjCiECBPD7i/R1oivGw1JbgVxD4iiKeA+x4XAc7UOeyzKg6pkSBAoCCAEYARITCg0KB2FwaG90b24SAjIwEMCaDA==',
    )
  })
})
