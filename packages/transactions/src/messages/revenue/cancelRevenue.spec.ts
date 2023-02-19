import { createMsgCancelRevenue as protoMsgCancelRevenue } from '@evmos/proto'
import {
  generateTypes,
  createMsgCancelRevenue,
  MSG_CANCEL_REVENUE_TYPES,
} from '@evmos/eip712'
import {
  MsgCancelRevenueParams,
  createTxMsgCancelRevenue,
} from './cancelRevenue'
import { createTransactionPayload } from '../base'
import TestUtils from '../../tests/utils'

const { context } = TestUtils
const contractAddress = TestUtils.addrHex1
const deployerAddress = context.sender.accountAddress

const params: MsgCancelRevenueParams = {
  contractAddress,
  deployerAddress,
}

describe('test tx payload', () => {
  it('produces tx payloads as expected', () => {
    const types = generateTypes(MSG_CANCEL_REVENUE_TYPES)
    const message = createMsgCancelRevenue(
      params.contractAddress,
      params.deployerAddress,
    )
    const typedData = {
      types,
      message,
    }

    const messageCosmos = protoMsgCancelRevenue(
      params.contractAddress,
      params.deployerAddress,
    )

    const payload = createTxMsgCancelRevenue(context, params)
    const expectedPayload = createTransactionPayload(
      context,
      typedData,
      messageCosmos,
    )
    expect(payload).toStrictEqual(expectedPayload)
  })
})
