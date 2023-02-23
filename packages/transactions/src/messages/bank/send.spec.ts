import { createMsgSend as protoMsgSend } from '@evmos/proto'
import { generateTypes, createMsgSend, MSG_SEND_TYPES } from '@evmos/eip712'
import { MsgSendParams, createTxMsgSend } from './send'
import { createTransactionPayload } from '../base'
import TestUtils from '../../tests/utils'

const { context, denom } = TestUtils
const destinationAddress = TestUtils.addr1
const amount = TestUtils.amount1

const params: MsgSendParams = {
  destinationAddress,
  amount,
  denom,
}

describe('test tx payload', () => {
  it('produces tx payloads as expected', () => {
    const types = generateTypes(MSG_SEND_TYPES)
    const message = createMsgSend(
      params.amount,
      params.denom,
      context.sender.accountAddress,
      params.destinationAddress,
    )
    const typedData = {
      types,
      message,
    }

    const messageCosmos = protoMsgSend(
      context.sender.accountAddress,
      params.destinationAddress,
      params.amount,
      params.denom,
    )

    const payload = createTxMsgSend(context, params)
    const expectedPayload = createTransactionPayload(
      context,
      typedData,
      messageCosmos,
    )
    expect(payload).toStrictEqual(expectedPayload)
  })
})
