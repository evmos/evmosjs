import { generateTypes } from '../messages/base'
import { MSG_VOTE_TYPES } from '../messages/gov/msgVote'
import { MSG_SEND_TYPES } from '../messages/msgsend'
import { MSG_DELEGATE_TYPES } from '../messages/staking'
import { decodeAminoSignDoc } from './decodeAmino'

// Testing Constants
const eip712Domain = {
  name: 'Cosmos Web3',
  version: '1.0.0',
  chainId: 9000,
  verifyingContract: 'cosmos',
  salt: '0',
}
const eip712PrimaryType = 'Tx'

describe('decoding amino', () => {
  it('decodes msg_send payloads', () => {
    const byteString =
      '123 34 97 99 99 111 117 110 116 95 110 117 109 98 101 114 34 58 34 48 34 44 34 99 104 97 105 110 95 105 100 34 58 34 101 118 109 111 115 95 57 48 48 48 45 49 34 44 34 102 101 101 34 58 123 34 97 109 111 117 110 116 34 58 91 123 34 97 109 111 117 110 116 34 58 34 50 48 48 34 44 34 100 101 110 111 109 34 58 34 97 101 118 109 111 115 34 125 93 44 34 103 97 115 34 58 34 50 48 48 48 48 48 34 125 44 34 109 101 109 111 34 58 34 34 44 34 109 115 103 115 34 58 91 123 34 116 121 112 101 34 58 34 99 111 115 109 111 115 45 115 100 107 47 77 115 103 83 101 110 100 34 44 34 118 97 108 117 101 34 58 123 34 97 109 111 117 110 116 34 58 91 123 34 97 109 111 117 110 116 34 58 34 49 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 34 44 34 100 101 110 111 109 34 58 34 97 101 118 109 111 115 34 125 93 44 34 102 114 111 109 95 97 100 100 114 101 115 115 34 58 34 101 118 109 111 115 49 119 115 97 117 114 112 121 55 117 120 109 50 110 56 118 102 103 103 99 57 101 104 112 106 108 122 109 102 115 115 120 51 48 53 97 119 120 120 34 44 34 116 111 95 97 100 100 114 101 115 115 34 58 34 101 118 109 111 115 49 104 110 109 114 100 114 48 106 99 50 118 101 51 121 99 120 102 116 48 103 99 106 106 116 114 100 107 110 99 112 109 109 107 101 97 109 102 57 34 125 125 93 44 34 115 101 113 117 101 110 99 101 34 58 34 49 34 125'
    const bytes = Uint8Array.from(byteString.split(' ').map((el) => Number(el)))
    const eip712 = decodeAminoSignDoc(bytes)

    expect(eip712.domain).toStrictEqual(eip712Domain)
    expect(eip712.primaryType).toBe(eip712PrimaryType)
    expect(eip712.types).toStrictEqual(generateTypes(MSG_SEND_TYPES))
    expect(eip712.message).toStrictEqual({
      account_number: '0',
      chain_id: 'evmos_9000-1',
      fee: {
        amount: [
          {
            amount: '200',
            denom: 'aevmos',
          },
        ],
        gas: '200000',
        feePayer: 'evmos1wsaurpy7uxm2n8vfggc9ehpjlzmfssx305awxx',
      },
      memo: '',
      msgs: [
        {
          type: 'cosmos-sdk/MsgSend',
          value: {
            from_address: 'evmos1wsaurpy7uxm2n8vfggc9ehpjlzmfssx305awxx',
            to_address: 'evmos1hnmrdr0jc2ve3ycxft0gcjjtrdkncpmmkeamf9',
            amount: [
              {
                amount: '100000000000000000',
                denom: 'aevmos',
              },
            ],
          },
        },
      ],
      sequence: '1',
    })
  })

  it('decodes msg_vote payloads', () => {
    const byteString =
      '123 34 97 99 99 111 117 110 116 95 110 117 109 98 101 114 34 58 34 48 34 44 34 99 104 97 105 110 95 105 100 34 58 34 101 118 109 111 115 95 57 48 48 48 45 49 34 44 34 102 101 101 34 58 123 34 97 109 111 117 110 116 34 58 91 123 34 97 109 111 117 110 116 34 58 34 50 48 48 48 34 44 34 100 101 110 111 109 34 58 34 97 101 118 109 111 115 34 125 93 44 34 103 97 115 34 58 34 50 48 48 48 48 48 34 125 44 34 109 101 109 111 34 58 34 34 44 34 109 115 103 115 34 58 91 123 34 116 121 112 101 34 58 34 99 111 115 109 111 115 45 115 100 107 47 77 115 103 86 111 116 101 34 44 34 118 97 108 117 101 34 58 123 34 111 112 116 105 111 110 34 58 49 44 34 112 114 111 112 111 115 97 108 95 105 100 34 58 34 49 34 44 34 118 111 116 101 114 34 58 34 101 118 109 111 115 49 121 103 120 113 50 53 118 108 112 51 117 52 108 113 121 121 115 54 118 114 115 100 97 122 57 119 119 57 107 103 114 120 55 120 108 104 116 121 34 125 125 93 44 34 115 101 113 117 101 110 99 101 34 58 34 49 34 125'
    const bytes = Uint8Array.from(byteString.split(' ').map((el) => Number(el)))
    const eip712 = decodeAminoSignDoc(bytes)

    expect(eip712.domain).toStrictEqual(eip712Domain)
    expect(eip712.primaryType).toBe(eip712PrimaryType)
    expect(eip712.types).toStrictEqual(generateTypes(MSG_VOTE_TYPES))
    expect(eip712.message).toStrictEqual({
      account_number: '0',
      chain_id: 'evmos_9000-1',
      fee: {
        amount: [
          {
            amount: '2000',
            denom: 'aevmos',
          },
        ],
        gas: '200000',
        feePayer: 'evmos1ygxq25vlp3u4lqyys6vrsdaz9ww9kgrx7xlhty',
      },
      memo: '',
      msgs: [
        {
          type: 'cosmos-sdk/MsgVote',
          value: {
            option: 1,
            proposal_id: '1',
            voter: 'evmos1ygxq25vlp3u4lqyys6vrsdaz9ww9kgrx7xlhty',
          },
        },
      ],
      sequence: '1',
    })
  })

  it('decodes msg_delegate payloads', () => {
    const byteString =
      '123 34 97 99 99 111 117 110 116 95 110 117 109 98 101 114 34 58 34 48 34 44 34 99 104 97 105 110 95 105 100 34 58 34 101 118 109 111 115 95 57 48 48 48 45 49 34 44 34 102 101 101 34 58 123 34 97 109 111 117 110 116 34 58 91 123 34 97 109 111 117 110 116 34 58 34 50 48 48 48 34 44 34 100 101 110 111 109 34 58 34 97 101 118 109 111 115 34 125 93 44 34 103 97 115 34 58 34 50 48 48 48 48 48 34 125 44 34 109 101 109 111 34 58 34 34 44 34 109 115 103 115 34 58 91 123 34 116 121 112 101 34 58 34 99 111 115 109 111 115 45 115 100 107 47 77 115 103 68 101 108 101 103 97 116 101 34 44 34 118 97 108 117 101 34 58 123 34 97 109 111 117 110 116 34 58 123 34 97 109 111 117 110 116 34 58 34 49 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 34 44 34 100 101 110 111 109 34 58 34 97 101 118 109 111 115 34 125 44 34 100 101 108 101 103 97 116 111 114 95 97 100 100 114 101 115 115 34 58 34 101 118 109 111 115 49 115 110 54 53 97 99 118 50 54 106 103 56 107 122 97 104 108 102 56 103 113 55 99 108 56 112 121 122 51 113 99 112 115 48 55 101 101 109 34 44 34 118 97 108 105 100 97 116 111 114 95 97 100 100 114 101 115 115 34 58 34 101 118 109 111 115 118 97 108 111 112 101 114 49 115 110 54 53 97 99 118 50 54 106 103 56 107 122 97 104 108 102 56 103 113 55 99 108 56 112 121 122 51 113 99 112 97 112 51 102 99 120 34 125 125 93 44 34 115 101 113 117 101 110 99 101 34 58 34 49 34 125'
    const bytes = Uint8Array.from(byteString.split(' ').map((el) => Number(el)))
    const eip712 = decodeAminoSignDoc(bytes)

    expect(eip712.domain).toStrictEqual(eip712Domain)
    expect(eip712.primaryType).toBe(eip712PrimaryType)
    expect(eip712.types).toStrictEqual(generateTypes(MSG_DELEGATE_TYPES))
    expect(eip712.message).toStrictEqual({
      account_number: '0',
      chain_id: 'evmos_9000-1',
      fee: {
        amount: [
          {
            amount: '2000',
            denom: 'aevmos',
          },
        ],
        gas: '200000',
        feePayer: 'evmos1sn65acv26jg8kzahlf8gq7cl8pyz3qcps07eem',
      },
      memo: '',
      msgs: [
        {
          type: 'cosmos-sdk/MsgDelegate',
          value: {
            amount: { amount: '1000000000000000000', denom: 'aevmos' },
            delegator_address: 'evmos1sn65acv26jg8kzahlf8gq7cl8pyz3qcps07eem',
            validator_address:
              'evmosvaloper1sn65acv26jg8kzahlf8gq7cl8pyz3qcpap3fcx',
          },
        },
      ],
      sequence: '1',
    })
  })

  it('throws on invalid byte payload', () => {
    const byteString =
      '123 34 97 99 99 111 117 110 116 95 110 117 109 98 101 114 34 58 34 48 34 44 34 99 104 97 105 110 95 105 100 34 58 34 101 118 109 111 115 95 57 48 48 48 45 49 34 44 34 102 101 101 34 58 123 34 97 109 111 117 110 116 34 58 91 123 34 97 109 111 117 110 116 34 58 34 50 48 48 48 34 44 34 100 101 110 111 109 34 58 34 97 101 118 109 111 115 34 125 93 44 34 103 97 115 34 58 34 50 48 48 48 48 48 34 125 44 34 109 101 109 111 34 58 34 34 44 34 109 115 103 115 34 58 91 123 34 116 121 112 101 34 58 34 99 111 115 109 111 115 45 115 100 107 47 77 115 103 68 101 108 101 103 97 116 101 34 44 34 118 97 108 117 101 34 58 123 34 97 109 111 117 110 116 34 58 123 34 97 109 111 117 110 116 34 58 34 49 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 34 44 34 100 101 110 111 109 34 58 34 97 101 118 109 111 115 34 125 44 34 100 101 108 101 103 97 116 111 114 95 97 100 100 114 101 115 115 34 58 34 101 118 109 111 115 49 115 110 54 53 97 99 118 50 54 106 103 56 107 122 97 104 108 102 56 103 113 55 99 108 56 112 121 122 51 113 99 112 115 48 55 101 101 109 34 44 34 118 97 108 105 100 97 116 111 114 95 97 100 100 114 101 115 115 34 58 34 101 118 109 111 115 118 97 108 111 112 101 114 49 115 110 54 53 97 99 118 50 54 106 103 56 107 122 97 104 108 102 56 103 113 55 99 108 56 112 121 122 51 113 99 112 97 112 51 102 99 120 34 125 125 93 44 34 115 101 113 117 101 110 99 101 34 58 34 49 34'
    const bytes = Uint8Array.from(byteString.split(' ').map((el) => Number(el)))
    expect(() => {
      decodeAminoSignDoc(bytes)
    }).toThrow(Error)
  })

  it('fills blank feePayers', () => {
    const signDoc = {
      account_number: '0',
      chain_id: 'evmos_9000-1',
      fee: {
        amount: [{ amount: '2000', denom: 'aevmos' }],
        gas: '200000',
        feePayer: '',
      },
      memo: '',
      msgs: [
        {
          type: 'cosmos-sdk/MsgVote',
          value: {
            option: 1,
            proposal_id: '1',
            voter: 'evmos1ygxq25vlp3u4lqyys6vrsdaz9ww9kgrx7xlhty',
          },
        },
      ],
      sequence: '1',
    }

    const bytes = Buffer.from(JSON.stringify(signDoc))
    const eip712 = decodeAminoSignDoc(bytes)
    const message = eip712.message as any

    expect(message.fee.feePayer).toBe(
      'evmos1ygxq25vlp3u4lqyys6vrsdaz9ww9kgrx7xlhty',
    )
  })
})
