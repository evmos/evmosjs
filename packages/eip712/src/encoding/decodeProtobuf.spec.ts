import { generateTypes } from '../messages/base'
import { MSG_VOTE_TYPES } from '../messages/gov'
import { MSG_SEND_TYPES } from '../messages/msgsend'
import { MSG_DELEGATE_TYPES } from '../messages/staking'
import { decodeProtobufSignDoc } from './decodeProtobuf'

// Testing Constants
const eip712Domain = {
  name: 'Cosmos Web3',
  version: '1.0.0',
  chainId: 9000,
  verifyingContract: 'cosmos',
  salt: '0',
}
const eip712PrimaryType = 'Tx'

describe('decoding protobuf', () => {
  it('decodes msg_send payloads', () => {
    const byteString =
      '10 157 1 10 154 1 10 28 47 99 111 115 109 111 115 46 98 97 110 107 46 118 49 98 101 116 97 49 46 77 115 103 83 101 110 100 18 122 10 44 101 118 109 111 115 49 116 121 118 112 113 53 55 51 54 108 122 106 50 121 122 109 106 48 107 97 110 113 120 103 55 119 102 50 57 102 109 112 50 100 114 113 116 48 18 44 101 118 109 111 115 49 104 110 109 114 100 114 48 106 99 50 118 101 51 121 99 120 102 116 48 103 99 106 106 116 114 100 107 110 99 112 109 109 107 101 97 109 102 57 26 28 10 6 97 101 118 109 111 115 18 18 49 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 18 112 10 89 10 79 10 40 47 101 116 104 101 114 109 105 110 116 46 99 114 121 112 116 111 46 118 49 46 101 116 104 115 101 99 112 50 53 54 107 49 46 80 117 98 75 101 121 18 35 10 33 3 49 50 222 101 16 162 111 232 18 113 67 108 229 229 56 46 213 147 92 122 233 142 164 59 1 106 220 154 240 182 35 139 18 4 10 2 8 1 24 1 18 19 10 13 10 6 97 101 118 109 111 115 18 3 50 48 48 16 192 154 12 26 12 101 118 109 111 115 95 57 48 48 48 45 49'
    const bytes = Uint8Array.from(byteString.split(' ').map((el) => Number(el)))
    const eip712 = decodeProtobufSignDoc(bytes)

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
        feePayer: 'evmos1tyvpq5736lzj2yzmj0kanqxg7wf29fmp2drqt0',
      },
      memo: '',
      msgs: [
        {
          type: 'cosmos-sdk/MsgSend',
          value: {
            from_address: 'evmos1tyvpq5736lzj2yzmj0kanqxg7wf29fmp2drqt0',
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
      '10 83 10 81 10 27 47 99 111 115 109 111 115 46 103 111 118 46 118 49 98 101 116 97 49 46 77 115 103 86 111 116 101 18 50 8 1 18 44 101 118 109 111 115 49 56 116 97 121 122 104 116 97 51 118 120 102 107 102 100 56 112 121 99 53 122 102 108 116 115 48 57 103 99 115 106 50 56 52 109 120 52 103 24 1 18 113 10 89 10 79 10 40 47 101 116 104 101 114 109 105 110 116 46 99 114 121 112 116 111 46 118 49 46 101 116 104 115 101 99 112 50 53 54 107 49 46 80 117 98 75 101 121 18 35 10 33 3 139 151 41 107 90 157 51 96 53 119 92 215 182 106 29 41 15 28 120 52 168 207 12 57 191 197 131 95 168 202 190 109 18 4 10 2 8 1 24 1 18 20 10 14 10 6 97 101 118 109 111 115 18 4 50 48 48 48 16 192 154 12 26 12 101 118 109 111 115 95 57 48 48 48 45 49'
    const bytes = Uint8Array.from(byteString.split(' ').map((el) => Number(el)))
    const eip712 = decodeProtobufSignDoc(bytes)

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
        feePayer: 'evmos18tayzhta3vxfkfd8pyc5zflts09gcsj284mx4g',
      },
      memo: '',
      msgs: [
        {
          type: 'cosmos-sdk/MsgVote',
          value: {
            proposal_id: '1',
            voter: 'evmos18tayzhta3vxfkfd8pyc5zflts09gcsj284mx4g',
            option: 1,
          },
        },
      ],
      sequence: '1',
    })
  })

  it('decodes msg_delegate payloads', () => {
    const byteString =
      '10 173 1 10 170 1 10 35 47 99 111 115 109 111 115 46 115 116 97 107 105 110 103 46 118 49 98 101 116 97 49 46 77 115 103 68 101 108 101 103 97 116 101 18 130 1 10 44 101 118 109 111 115 49 107 112 51 121 55 51 53 106 119 112 113 102 108 48 108 122 57 112 97 108 122 107 112 116 117 104 116 104 56 119 108 108 119 56 53 52 103 115 18 51 101 118 109 111 115 118 97 108 111 112 101 114 49 107 112 51 121 55 51 53 106 119 112 113 102 108 48 108 122 57 112 97 108 122 107 112 116 117 104 116 104 56 119 108 108 114 102 109 57 102 100 26 29 10 6 97 101 118 109 111 115 18 19 49 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 18 113 10 89 10 79 10 40 47 101 116 104 101 114 109 105 110 116 46 99 114 121 112 116 111 46 118 49 46 101 116 104 115 101 99 112 50 53 54 107 49 46 80 117 98 75 101 121 18 35 10 33 3 169 240 228 126 233 117 1 65 25 244 84 162 8 57 93 150 124 67 6 177 247 211 57 169 81 122 105 227 85 155 33 195 18 4 10 2 8 1 24 1 18 20 10 14 10 6 97 101 118 109 111 115 18 4 50 48 48 48 16 192 154 12 26 12 101 118 109 111 115 95 57 48 48 48 45 49'
    const bytes = Uint8Array.from(byteString.split(' ').map((el) => Number(el)))
    const eip712 = decodeProtobufSignDoc(bytes)

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
        feePayer: 'evmos1kp3y735jwpqfl0lz9palzkptuhth8wllw854gs',
      },
      memo: '',
      msgs: [
        {
          type: 'cosmos-sdk/MsgDelegate',
          value: {
            delegator_address: 'evmos1kp3y735jwpqfl0lz9palzkptuhth8wllw854gs',
            validator_address:
              'evmosvaloper1kp3y735jwpqfl0lz9palzkptuhth8wllrfm9fd',
            amount: { denom: 'aevmos', amount: '1000000000000000000' },
          },
        },
      ],
      sequence: '1',
    })
  })

  it('throws on invalid byte payload', () => {
    const byteString =
      '10 173 1 10 170 1 10 35 47 99 111 115 109 111 115 46 115 116 97 107 105 110 103 46 118 49 98 101 116 97 49 46 77 115 103 68 101 108 101 103 97 116 101 18 130 1 10 44 101 118 109 111 115 49 107 112 51 121 55 51 53 106 119 112 113 102 108 48 108 122 57 112 97 108 122 107 112 116 117 104 116 104 56 119 108 108 119 56 53 52 103 115 18 51 101 118 109 111 115 118 97 108 111 112 101 114 49 107 112 51 121 55 51 53 106 119 112 113 102 108 48 108 122 57 112 97 108 122 107 112 116 117 104 116 104 56 119 108 108 114 102 109 57 102 100 26 29 10 6 97 101 118 109 111 115 18 19 49 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 18 113 10 89 10 79 10 40 47 101 116 104 101 114 109 105 110 116 46 99 114 121 112 116 111 46 118 49 46 101 116 104 115 101 99 112 50 53 54 107 49 46 80 117 98 75 101 121 18 35 10 33 3 169 240 228 126 233 117 1 65 25 244 84 162 8 57 93 150 124 67 6 177 247 211 57 169 81 122 105 227 85 155 33 195 18 4 10 2 8 1 24 1 18 20 10 14 10 6 97 101 118 109 111 115 18 4 50 48 48 48 16 192 154 12 26 12 101 118 109 111 115 95 57 48 48 48 45'
    const bytes = Uint8Array.from(byteString.split(' ').map((el) => Number(el)))
    expect(() => {
      decodeProtobufSignDoc(bytes)
    }).toThrow(Error)
  })
})
