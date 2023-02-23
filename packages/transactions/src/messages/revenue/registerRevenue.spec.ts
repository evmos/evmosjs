import { createMsgRegisterRevenue as protoMsgRegisterRevenue } from '@evmos/proto'
import {
  generateTypes,
  createMsgRegisterRevenue,
  MSG_REGISTER_REVENUE_TYPES,
} from '@evmos/eip712'
import {
  MsgRegisterRevenueParams,
  createTxMsgRegisterRevenue,
} from './registerRevenue'
import { createTransactionPayload } from '../base'
import TestUtils from '../../tests/utils'

const { context } = TestUtils
const contractAddress = TestUtils.addrHex1
const deployerAddress = context.sender.accountAddress
const withdrawerAddress = TestUtils.addr2
const nonces: number[] = [10, 15000, 30]

const params: MsgRegisterRevenueParams = {
  contractAddress,
  deployerAddress,
  withdrawerAddress,
  nonces,
}

describe('test tx payload', () => {
  it('produces tx payloads as expected', () => {
    const types = generateTypes(MSG_REGISTER_REVENUE_TYPES)
    const message = createMsgRegisterRevenue(
      params.contractAddress,
      params.deployerAddress,
      params.withdrawerAddress,
      params.nonces,
    )
    const typedData = {
      types,
      message,
    }

    const messageCosmos = protoMsgRegisterRevenue(
      params.contractAddress,
      params.deployerAddress,
      params.withdrawerAddress,
      params.nonces,
    )

    const payload = createTxMsgRegisterRevenue(context, params)
    const expectedPayload = createTransactionPayload(
      context,
      typedData,
      messageCosmos,
    )
    expect(payload).toStrictEqual(expectedPayload)
  })
})
