import { createMessageSend } from './msgSend'

describe('msgSend tests', () => {
  it('valid', () => {
    const chain = {
      chainId: 9000,
      cosmosChainId: 'evmos_9000-1',
    }

    const sender = {
      accountAddress: 'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm',
      sequence: 1,
      accountNumber: 9,
      pubkey: 'AgTw+4v0daIrxsNSW4FcQ+IoingPseFwHO1DnssyoOqZ',
    }

    const fee = {
      amount: '20',
      denom: 'aevmos',
      gas: '200000',
    }

    const memo = ''

    const params = {
      destinationAddress: 'evmos1pmk2r32ssqwps42y3c9d4clqlca403yd9wymgr',
      amount: '1',
      denom: 'aevmos',
    }

    const msg = createMessageSend(chain, sender, fee, memo, params)
    expect(
      Buffer.from(msg.legacyAmino.body.toBinary()).toString('base64'),
    ).toBe(
      'CogBChwvY29zbW9zLmJhbmsudjFiZXRhMS5Nc2dTZW5kEmgKK2V0aG0xdGZlZ2Y1MG41eGwwaGQ1Y3hmempjYTN5bHNmcGcwZm5lZDVncW0SLGV2bW9zMXBtazJyMzJzc3F3cHM0MnkzYzlkNGNscWxjYTQwM3lkOXd5bWdyGgsKBmFldm1vcxIBMQ==',
    )
    expect(
      Buffer.from(msg.legacyAmino.authInfo.toBinary()).toString('base64'),
    ).toBe(
      'ClkKTwooL2V0aGVybWludC5jcnlwdG8udjEuZXRoc2VjcDI1NmsxLlB1YktleRIjCiECBPD7i/R1oivGw1JbgVxD4iiKeA+x4XAc7UOeyzKg6pkSBAoCCH8YARISCgwKBmFldm1vcxICMjAQwJoM',
    )
    expect(msg.legacyAmino.signBytes).toBe(
      '2XbbRbgd5cQ05gDxc1xxKAH++HXulj5JSrwLI51R0ss=',
    )

    expect(Buffer.from(msg.signDirect.body.toBinary()).toString('base64')).toBe(
      'CogBChwvY29zbW9zLmJhbmsudjFiZXRhMS5Nc2dTZW5kEmgKK2V0aG0xdGZlZ2Y1MG41eGwwaGQ1Y3hmempjYTN5bHNmcGcwZm5lZDVncW0SLGV2bW9zMXBtazJyMzJzc3F3cHM0MnkzYzlkNGNscWxjYTQwM3lkOXd5bWdyGgsKBmFldm1vcxIBMQ==',
    )
    expect(
      Buffer.from(msg.signDirect.authInfo.toBinary()).toString('base64'),
    ).toBe(
      'ClkKTwooL2V0aGVybWludC5jcnlwdG8udjEuZXRoc2VjcDI1NmsxLlB1YktleRIjCiECBPD7i/R1oivGw1JbgVxD4iiKeA+x4XAc7UOeyzKg6pkSBAoCCAEYARISCgwKBmFldm1vcxICMjAQwJoM',
    )
    expect(msg.signDirect.signBytes).toBe(
      'gmgo2KWJ6FwXEH69W0xMGtrmjUMU182nxn9B3vUw2iI=',
    )

    expect(msg.eipToSign).toStrictEqual({
      domain: {
        chainId: 9000,
        name: 'Cosmos Web3',
        salt: '0',
        verifyingContract: 'cosmos',
        version: '1.0.0',
      },
      message: {
        account_number: '9',
        chain_id: 'evmos_9000-1',
        fee: {
          amount: [{ amount: '20', denom: 'aevmos' }],
          feePayer: 'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm',
          gas: '200000',
        },
        memo: '',
        msgs: [
          {
            type: 'cosmos-sdk/MsgSend',
            value: {
              amount: [{ amount: '1', denom: 'aevmos' }],
              from_address: 'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm',
              to_address: 'evmos1pmk2r32ssqwps42y3c9d4clqlca403yd9wymgr',
            },
          },
        ],
        sequence: '1',
      },
      primaryType: 'Tx',
      types: {
        Coin: [
          { name: 'denom', type: 'string' },
          { name: 'amount', type: 'string' },
        ],
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'string' },
          { name: 'salt', type: 'string' },
        ],
        Fee: [
          { name: 'feePayer', type: 'string' },
          { name: 'amount', type: 'Coin[]' },
          { name: 'gas', type: 'string' },
        ],
        Msg: [
          { name: 'type', type: 'string' },
          { name: 'value', type: 'MsgValue' },
        ],
        MsgValue: [
          { name: 'from_address', type: 'string' },
          { name: 'to_address', type: 'string' },
          { name: 'amount', type: 'TypeAmount[]' },
        ],
        Tx: [
          { name: 'account_number', type: 'string' },
          { name: 'chain_id', type: 'string' },
          { name: 'fee', type: 'Fee' },
          { name: 'memo', type: 'string' },
          { name: 'msgs', type: 'Msg[]' },
          { name: 'sequence', type: 'string' },
        ],
        TypeAmount: [
          { name: 'denom', type: 'string' },
          { name: 'amount', type: 'string' },
        ],
      },
    })
  })
})
