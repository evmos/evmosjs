import { createMsgUpdateRevenue as protoMsgUpdateRevenue } from '@evmos/proto'
import {
  generateTypes,
  createMsgUpdateRevenue,
  MSG_UPDATE_REVENUE_TYPES,
} from '@evmos/eip712'
import {
  MsgUpdateRevenueParams,
  createTxMsgUpdateRevenue,
} from './updateRevenue'
import { createTransactionPayload } from '../base'
import TestUtils from '../../tests/utils'

const { context } = TestUtils
const contractAddress = TestUtils.addrHex1
const deployerAddress = context.sender.accountAddress
const withdrawerAddress = TestUtils.addr2

const params: MsgUpdateRevenueParams = {
  contractAddress,
  deployerAddress,
  withdrawerAddress,
}

describe('test tx payload', () => {
  it('produces tx payloads as expected', () => {
    const types = generateTypes(MSG_UPDATE_REVENUE_TYPES)
    const message = createMsgUpdateRevenue(
      params.contractAddress,
      params.deployerAddress,
      params.withdrawerAddress,
    )
    const typedData = {
      types,
      message,
    }

    const messageCosmos = protoMsgUpdateRevenue(
      params.contractAddress,
      params.deployerAddress,
      params.withdrawerAddress,
    )

    const payload = createTxMsgUpdateRevenue(context, params)
    const expectedPayload = createTransactionPayload(
      context,
      typedData,
      messageCosmos,
    )
    expect(payload).toStrictEqual(expectedPayload)
  })
})
