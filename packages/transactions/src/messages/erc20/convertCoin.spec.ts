import { createMsgConvertCoin as protoMsgConvertCoin } from '@evmos/proto'

import {
  generateTypes,
  createMsgConvertCoin,
  MSG_CONVERT_COIN_TYPES,
} from '@evmos/eip712'
import { MsgConvertCoinParams, createTxMsgConvertCoin } from './convertCoin'
import { createTransactionPayload } from '../base'
import TestUtils from '../../tests/utils'

const { context, denom } = TestUtils
const amount = TestUtils.amount1
const receiverHex = TestUtils.addrHex1
const senderBech32 = context.sender.accountAddress

const params: MsgConvertCoinParams = {
  denom,
  amount,
  receiverHex,
  senderBech32,
}

describe('test tx payload', () => {
  it('produces tx payloads as expected', () => {
    const types = generateTypes(MSG_CONVERT_COIN_TYPES)
    const message = createMsgConvertCoin(
      params.denom,
      params.amount,
      params.receiverHex,
      params.senderBech32,
    )
    const typedData = {
      types,
      message,
    }

    const messageCosmos = protoMsgConvertCoin(
      params.denom,
      params.amount,
      params.receiverHex,
      params.senderBech32,
    )

    const payload = createTxMsgConvertCoin(context, params)
    const expectedPayload = createTransactionPayload(
      context,
      typedData,
      messageCosmos,
    )
    expect(payload).toStrictEqual(expectedPayload)
  })
})
