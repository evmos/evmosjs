import { createMsgDeposit as protoMsgDeposit } from '@evmos/proto'
import {
  generateTypes,
  createMsgDeposit,
  MSG_DEPOSIT_TYPES,
} from '@evmos/eip712'
import { MsgDepositParams, createTxMsgDeposit } from './deposit'
import { createTransactionPayload } from '../base'
import TestUtils from '../../tests/utils'

const { context, denom } = TestUtils
const amount = TestUtils.amount1
const proposalId = TestUtils.proposalId1
const deposit = {
  denom,
  amount,
}

const params: MsgDepositParams = {
  proposalId,
  deposit,
}

describe('test tx payload', () => {
  it('produces tx payloads as expected', () => {
    const types = generateTypes(MSG_DEPOSIT_TYPES)
    const message = createMsgDeposit(
      params.proposalId,
      context.sender.accountAddress,
      params.deposit,
    )
    const typedData = {
      types,
      message,
    }

    const messageCosmos = protoMsgDeposit(
      params.proposalId,
      context.sender.accountAddress,
      params.deposit,
    )

    const payload = createTxMsgDeposit(context, params)
    const expectedPayload = createTransactionPayload(
      context,
      typedData,
      messageCosmos,
    )
    expect(payload).toStrictEqual(expectedPayload)
  })
})
