import { IBC_MSG_TRANSFER_TYPES, createIBCMsgTransfer } from './transfer'
import TestUtils from '../../tests/utils'

describe('test IBCMsgTransfer types and messages', () => {
  it('creates types as expected', () => {
    const expTypes = {
      MsgValue: [
        { name: 'source_port', type: 'string' },
        { name: 'source_channel', type: 'string' },
        { name: 'token', type: 'TypeToken' },
        { name: 'sender', type: 'string' },
        { name: 'receiver', type: 'string' },
        { name: 'timeout_height', type: 'TypeTimeoutHeight' },
        { name: 'timeout_timestamp', type: 'uint64' },
      ],
      TypeToken: [
        { name: 'denom', type: 'string' },
        { name: 'amount', type: 'string' },
      ],
      TypeTimeoutHeight: [
        { name: 'revision_number', type: 'uint64' },
        { name: 'revision_height', type: 'uint64' },
      ],
    }

    expect(IBC_MSG_TRANSFER_TYPES).toStrictEqual(expTypes)
  })

  it('creates messages as expected', () => {
    const { denom } = TestUtils
    const receiver = TestUtils.addr1
    const sender = TestUtils.addr2
    const sourcePort = 'transfer'
    const sourceChannel = 'channel-0'
    const revisionHeight = 400
    const revisionNumber = 20
    const timeoutTimestamp = '1000'
    const amount = TestUtils.amount1

    const msg = createIBCMsgTransfer(
      receiver,
      sender,
      sourceChannel,
      sourcePort,
      revisionHeight,
      revisionNumber,
      timeoutTimestamp,
      amount,
      denom,
    )

    const expMsg = {
      type: 'cosmos-sdk/MsgTransfer',
      value: {
        receiver,
        sender,
        source_channel: sourceChannel,
        source_port: sourcePort,
        timeout_height: {
          revision_height: revisionHeight.toString(),
          revision_number: revisionNumber.toString(),
        },
        timeout_timestamp: timeoutTimestamp,
        token: {
          amount,
          denom,
        },
      },
    }

    expect(msg).toStrictEqual(expMsg)
  })
})
