import { createMsgCreateClawbackVestingAccount as protoMsgCreateClawbackVestingAccount } from '@evmos/proto'
import {
  generateTypes,
  createMsgCreateClawbackVestingAccount,
  MSG_CREATE_CLAWBACK_VESTING_ACCOUNT_TYPES,
} from '@evmos/eip712'
import {
  MsgCreateClawbackVestingAccountParams,
  createTxMsgCreateClawbackVestingAccount,
} from './createClawbackVestingAccount'
import { createTransactionPayload } from '../base'
import TestUtils from '../../tests/utils'

const { context, denom } = TestUtils
const fromAddress = context.sender.accountAddress
const toAddress = TestUtils.addr2
const startTime = 420
const amount = TestUtils.amount1

const periods = [
  {
    length: 1000,
    amount: [
      {
        denom,
        amount,
      },
    ],
  },
]
const merge = true

const params: MsgCreateClawbackVestingAccountParams = {
  fromAddress,
  toAddress,
  startTime,
  lockupPeriods: periods,
  vestingPeriods: periods,
  merge,
}

describe('test tx payload', () => {
  it('produces tx payloads as expected', () => {
    const types = generateTypes(MSG_CREATE_CLAWBACK_VESTING_ACCOUNT_TYPES)
    const message = createMsgCreateClawbackVestingAccount(
      params.fromAddress,
      params.toAddress,
      params.startTime,
      params.lockupPeriods,
      params.vestingPeriods,
      params.merge,
    )
    const typedData = {
      types,
      message,
    }

    const messageCosmos = protoMsgCreateClawbackVestingAccount(
      params.fromAddress,
      params.toAddress,
      params.startTime,
      params.lockupPeriods,
      params.vestingPeriods,
      params.merge,
    )

    const payload = createTxMsgCreateClawbackVestingAccount(context, params)
    const expectedPayload = createTransactionPayload(
      context,
      typedData,
      messageCosmos,
    )
    expect(payload).toStrictEqual(expectedPayload)
  })
})
