import { createIBCMsgTransfer } from './ibcMsgTransfer'
import { MessageGenerated } from '../common'

import { MsgTransfer } from '../../proto/cosmos-ibc/ibc/applications/tx'

import { from, to, denom } from '../../proto/tests/utils'
import { JSONOptions } from '../../proto/tests/common'

interface MsgTransferParams {
  sourcePort: string
  sourceChannel: string
  amount: string
  denom: string
  sender: string
  receiver: string
  revisionNumber: number
  revisionHeight: number
  timeoutTimestamp: string
  memo?: string
}

const params: MsgTransferParams = {
  sourcePort: 'transfer',
  sourceChannel: 'channel-0',
  amount: '1000000',
  denom,
  sender: from,
  receiver: to,
  revisionNumber: 10,
  revisionHeight: 60,
  timeoutTimestamp: '999',
}

const createMsg = (params: MsgTransferParams) => {
  return createIBCMsgTransfer(
    params.sourcePort,
    params.sourceChannel,
    params.amount,
    params.denom,
    params.sender,
    params.receiver,
    params.revisionNumber,
    params.revisionHeight,
    params.timeoutTimestamp,
    params.memo,
  )
}

const verifyMsg = (
  msg: MessageGenerated<MsgTransfer>,
  params: MsgTransferParams,
) => {
  expect(msg.message.toJson(JSONOptions)).toStrictEqual({
    source_port: params.sourcePort,
    source_channel: params.sourceChannel,
    token: {
      amount: params.amount,
      denom: params.denom,
    },
    sender: params.sender,
    receiver: params.receiver,
    timeout_height: {
      revision_number: params.revisionNumber.toString(),
      revision_height: params.revisionHeight.toString(),
    },
    timeout_timestamp: params.timeoutTimestamp.toString(),
    memo: params.memo ?? '',
  })
  expect(msg.path).toStrictEqual(MsgTransfer.typeName)
}

describe('test IBC Module message generation', () => {
  it('correctly wraps MsgTransfer with memo', () => {
    const paramsWithMemo: MsgTransferParams = {
      ...params,
      memo: 'ibc memo',
    }
    const msg = createMsg(paramsWithMemo)
    verifyMsg(msg, paramsWithMemo)
  })

  it('correctly wraps MsgTransfer without memo', () => {
    const msg = createMsg(params)
    verifyMsg(msg, params)
  })
})
