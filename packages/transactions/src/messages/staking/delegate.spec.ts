import { createMsgDelegate as protoMsgDelegate } from '@evmos/proto'
import {
  generateTypes,
  createMsgDelegate,
  MSG_DELEGATE_TYPES,
} from '@evmos/eip712'
import { MsgDelegateParams, createTxMsgDelegate } from './delegate'
import { createTransactionPayload } from '../base'
import TestUtils from '../../tests/utils'

const { context, denom } = TestUtils
const validatorAddress = TestUtils.addrVal1
const amount = TestUtils.amount1

const params: MsgDelegateParams = {
  validatorAddress,
  amount,
  denom,
}

describe('test tx payload', () => {
  it('produces tx payloads as expected', () => {
    const types = generateTypes(MSG_DELEGATE_TYPES)
    const message = createMsgDelegate(
      context.sender.accountAddress,
      params.validatorAddress,
      params.amount,
      params.denom,
    )
    const typedData = {
      types,
      message,
    }

    const messageCosmos = protoMsgDelegate(
      context.sender.accountAddress,
      params.validatorAddress,
      params.amount,
      params.denom,
    )

    const payload = createTxMsgDelegate(context, params)
    const expectedPayload = createTransactionPayload(
      context,
      typedData,
      messageCosmos,
    )
    expect(payload).toStrictEqual(expectedPayload)
  })
})
