import { createMsgBeginRedelegate as protoMsgBeginRedelegate } from '@evmos/proto'
import {
  generateTypes,
  createMsgBeginRedelegate,
  MSG_BEGIN_REDELEGATE_TYPES,
} from '@evmos/eip712'
import {
  MsgBeginRedelegateParams,
  createTxMsgBeginRedelegate,
} from './beginRedelegate'
import { createTransactionPayload } from '../base'
import TestUtils from '../../tests/utils'

const { context, denom } = TestUtils
const validatorSrcAddress = TestUtils.addrVal1
const validatorDstAddress = TestUtils.addrVal2
const amount = TestUtils.amount1

const params: MsgBeginRedelegateParams = {
  validatorSrcAddress,
  validatorDstAddress,
  amount,
  denom,
}

describe('test tx payload', () => {
  it('produces tx payloads as expected', () => {
    const types = generateTypes(MSG_BEGIN_REDELEGATE_TYPES)
    const message = createMsgBeginRedelegate(
      context.sender.accountAddress,
      params.validatorSrcAddress,
      params.validatorDstAddress,
      params.amount,
      params.denom,
    )
    const typedData = {
      types,
      message,
    }

    const messageCosmos = protoMsgBeginRedelegate(
      context.sender.accountAddress,
      params.validatorSrcAddress,
      params.validatorDstAddress,
      params.amount,
      params.denom,
    )

    const payload = createTxMsgBeginRedelegate(context, params)
    const expectedPayload = createTransactionPayload(
      context,
      typedData,
      messageCosmos,
    )
    expect(payload).toStrictEqual(expectedPayload)
  })
})
