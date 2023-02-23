import {
  genTestEthSecp256k1PubKey,
  genTestMsgClawback,
  genTestMsgConvertCoin,
  genTestMsgRegisterRevenue,
} from './evmos-utils'
import { testMessageEncodeDecode } from './utils'

// Test Encode/Decode serialization against Cosmos SDK encodings in Go.
describe('test ethermint encode/decode', () => {
  it('handles pubkey types', () => {
    const [msg, expBase64] = genTestEthSecp256k1PubKey()
    testMessageEncodeDecode(msg, expBase64)
  })
})

describe('test evmos encode/decode', () => {
  it('handles erc20 types', () => {
    const [msg, expBase64] = genTestMsgConvertCoin()
    testMessageEncodeDecode(msg, expBase64)
  })

  it('handles revenue types', () => {
    const [msg, expBase64] = genTestMsgRegisterRevenue()
    testMessageEncodeDecode(msg, expBase64)
  })

  it('handles vesting types', () => {
    const [msg, expBase64] = genTestMsgClawback()
    testMessageEncodeDecode(msg, expBase64)
  })
})
