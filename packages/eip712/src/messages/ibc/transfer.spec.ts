import { CREATE_IBC_MSG_TRANSFER_TYPES, createIBCMsgTransfer } from './transfer'
import TestUtils from '../../tests/utils'

const { denom } = TestUtils
const receiver = TestUtils.addr1
const sender = TestUtils.addr2
const sourcePort = 'transfer'
const sourceChannel = 'channel-0'
const revisionHeight = 400
const revisionNumber = 20
const timeoutTimestamp = '1000'
const amount = TestUtils.amount1
const memo = 'ibc memo'

const createExpTypes = (memo?: string) => ({
  MsgValue: [
    { name: 'source_port', type: 'string' },
    { name: 'source_channel', type: 'string' },
    { name: 'token', type: 'TypeToken' },
    { name: 'sender', type: 'string' },
    { name: 'receiver', type: 'string' },
    { name: 'timeout_height', type: 'TypeTimeoutHeight' },
    { name: 'timeout_timestamp', type: 'uint64' },
    ...(memo ? [{ name: 'memo', type: 'string' }] : []),
  ],
  TypeToken: [
    { name: 'denom', type: 'string' },
    { name: 'amount', type: 'string' },
  ],
  TypeTimeoutHeight: [
    { name: 'revision_number', type: 'uint64' },
    { name: 'revision_height', type: 'uint64' },
  ],
})

const createMsg = (memo?: string) =>
  createIBCMsgTransfer(
    receiver,
    sender,
    sourceChannel,
    sourcePort,
    revisionHeight,
    revisionNumber,
    timeoutTimestamp,
    amount,
    denom,
    memo,
  )

const createExpMsg = (memo?: string) => ({
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
    ...(memo && { memo }),
  },
})

const validateTypes = (memo?: string) => {
  const types = CREATE_IBC_MSG_TRANSFER_TYPES(memo)
  const expTypes = createExpTypes(memo)
  expect(types).toStrictEqual(expTypes)

  // Sanity check that memo is parsed as expected:
  const expMsgValueLen = memo && memo !== '' ? 8 : 7
  expect(expTypes.MsgValue).toHaveLength(expMsgValueLen)
}

const validateMsg = (memo?: string) => {
  const msg = createMsg(memo)
  const expMsg = createExpMsg(memo)

  expect(msg).toStrictEqual(expMsg)

  // Sanity check that memo is parsed as expected:
  const expMsgMemo = memo && memo !== '' ? memo : undefined
  expect(expMsg.value.memo).toStrictEqual(expMsgMemo)
}

describe('test IBCMsgTransfer types', () => {
  it('creates types as expected with memo', () => {
    validateTypes(memo)
  })

  it('creates types as expected with empty memo', () => {
    validateTypes('')
  })

  it('creates types as expected with no memo', () => {
    validateTypes()
  })
})

describe('test IBCMsgTransfer message', () => {
  it('creates messages as expected with memo', () => {
    validateMsg(memo)
  })

  it('creates messages as expected with empty memo', () => {
    validateMsg('')
  })

  it('creates messages as expected without memo', () => {
    validateMsg()
  })
})
