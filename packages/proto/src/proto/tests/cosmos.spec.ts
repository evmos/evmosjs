import {
  genTestGrantAuthorization,
  genTestMsgSend,
  genTestMsgDelegate,
  genTestMsgVote,
  genTestMsgWithdrawDelegatorReward,
  genTestMsgIBCTransfer,
} from './cosmos-utils'
import { testMessageEncodeDecode } from './utils'

// Sanity test message construction and deconstruction to verify there are no unexpected issues.

// Note that serialization that includes default values is considered incorrect, as it creates a payload
// that is larger than necessary and thus consumes extra gas for end-users.

// Test Encode/Decode serialization against Cosmos SDK encodings in Go.
describe('test Protobuf encode/decode', () => {
  it('handles authz types', () => {
    const [msg, expBase64] = genTestGrantAuthorization()
    testMessageEncodeDecode(msg, expBase64)
  })

  it('handles bank types', () => {
    const [msg, expBase64] = genTestMsgSend()
    testMessageEncodeDecode(msg, expBase64)
  })

  it('handles distribution types', () => {
    const [msg, expBase64] = genTestMsgWithdrawDelegatorReward()
    testMessageEncodeDecode(msg, expBase64)
  })

  it('handles gov types', () => {
    const [msg, expBase64] = genTestMsgVote()
    testMessageEncodeDecode(msg, expBase64)
  })

  it('handles stake types', () => {
    const [msg, expBase64] = genTestMsgDelegate()
    testMessageEncodeDecode(msg, expBase64)
  })

  it('handles ibc types', () => {
    const [msg, expBase64] = genTestMsgIBCTransfer()
    testMessageEncodeDecode(msg, expBase64)
  })
})
