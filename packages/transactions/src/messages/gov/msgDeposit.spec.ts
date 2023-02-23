import { createTxMsgDeposit, MessageMsgDepositParams } from './msgDeposit'

describe('msgDeposit tests', () => {
  it('valid', async () => {
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

    const params: MessageMsgDepositParams = {
      proposalId: 42,
      deposit: {
        amount: '1',
        denom: 'aevmos',
      },
    }

    const msg = createTxMsgDeposit(chain, sender, fee, memo, params)
    expect(
      Buffer.from(msg.legacyAmino.body.toBinary()).toString('base64'),
    ).toBe(
      'Cl4KHi9jb3Ntb3MuZ292LnYxYmV0YTEuTXNnRGVwb3NpdBI8CCoSK2V0aG0xdGZlZ2Y1MG41eGwwaGQ1Y3hmempjYTN5bHNmcGcwZm5lZDVncW0aCwoGYWV2bW9zEgEx',
    )
    expect(
      Buffer.from(msg.legacyAmino.authInfo.toBinary()).toString('base64'),
    ).toBe(
      'ClkKTwooL2V0aGVybWludC5jcnlwdG8udjEuZXRoc2VjcDI1NmsxLlB1YktleRIjCiECBPD7i/R1oivGw1JbgVxD4iiKeA+x4XAc7UOeyzKg6pkSBAoCCH8YARISCgwKBmFldm1vcxICMjAQwJoM',
    )
    expect(msg.legacyAmino.signBytes).toBe(
      'rPuR5O7Omn7EdM790sDbISuhQB1GGZz3YIzq34HBh3k=',
    )

    expect(Buffer.from(msg.signDirect.body.toBinary()).toString('base64')).toBe(
      'Cl4KHi9jb3Ntb3MuZ292LnYxYmV0YTEuTXNnRGVwb3NpdBI8CCoSK2V0aG0xdGZlZ2Y1MG41eGwwaGQ1Y3hmempjYTN5bHNmcGcwZm5lZDVncW0aCwoGYWV2bW9zEgEx',
    )
    expect(
      Buffer.from(msg.signDirect.authInfo.toBinary()).toString('base64'),
    ).toBe(
      'ClkKTwooL2V0aGVybWludC5jcnlwdG8udjEuZXRoc2VjcDI1NmsxLlB1YktleRIjCiECBPD7i/R1oivGw1JbgVxD4iiKeA+x4XAc7UOeyzKg6pkSBAoCCAEYARISCgwKBmFldm1vcxICMjAQwJoM',
    )
    expect(msg.signDirect.signBytes).toBe(
      '3BTa2GzN5hI2IiNsrOsbtxbNSRqIxgar49teQWcxIa0=',
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
            type: 'cosmos-sdk/MsgDeposit',
            value: {
              proposal_id: 42,
              depositor: 'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm',
              deposit: [{ amount: '1', denom: 'aevmos' }],
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
          { name: 'proposal_id', type: 'uint64' },
          { name: 'depositor', type: 'string' },
          { name: 'deposit', type: 'Coin[]' },
        ],
        Tx: [
          { name: 'account_number', type: 'string' },
          { name: 'chain_id', type: 'string' },
          { name: 'fee', type: 'Fee' },
          { name: 'memo', type: 'string' },
          { name: 'msgs', type: 'Msg[]' },
          { name: 'sequence', type: 'string' },
        ],
      },
    })
  })
})
