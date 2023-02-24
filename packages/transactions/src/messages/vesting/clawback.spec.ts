import { createMsgClawback as protoMsgClawback } from '@evmos/proto'
import {
  generateTypes,
  createMsgClawback,
  MSG_CLAWBACK_TYPES,
} from '@evmos/eip712'
import { MsgClawbackParams, createTxMsgClawback } from './clawback'
import { createTransactionPayload } from '../base'
import TestUtils from '../../tests/utils'

const { context } = TestUtils
const funderAddress = context.sender.accountAddress
const accountAddress = TestUtils.addr1
const destAddress = TestUtils.addr2

const params: MsgClawbackParams = {
  funderAddress,
  accountAddress,
  destAddress,
}

describe('test tx payload', () => {
  it('produces tx payloads as expected', () => {
    const types = generateTypes(MSG_CLAWBACK_TYPES)
    const message = createMsgClawback(
      params.funderAddress,
      params.accountAddress,
      params.destAddress,
    )
    const typedData = {
      types,
      message,
    }

    const messageCosmos = protoMsgClawback(
      params.funderAddress,
      params.accountAddress,
      params.destAddress,
    )

    const payload = createTxMsgClawback(context, params)
    const expectedPayload = createTransactionPayload(
      context,
      typedData,
      messageCosmos,
    )
    expect(payload).toStrictEqual(expectedPayload)
  })
})
