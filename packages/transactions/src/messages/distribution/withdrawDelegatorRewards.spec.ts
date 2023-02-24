import { createMsgWithdrawDelegatorReward as protoMsgWithdrawDelegatorReward } from '@evmos/proto'

import {
  generateTypes,
  MSG_WITHDRAW_DELEGATOR_REWARD_TYPES,
  createMsgWithdrawDelegatorReward,
} from '@evmos/eip712'
import {
  MsgWithdrawDelegatorRewardParams,
  createTxMsgWithdrawDelegatorReward,
} from './withdrawDelegatorRewards'
import { createTransactionPayload } from '../base'
import TestUtils from '../../tests/utils'

const { context } = TestUtils
const validatorAddress = TestUtils.addrVal1

const params: MsgWithdrawDelegatorRewardParams = {
  validatorAddress,
}

describe('test tx payload', () => {
  it('produces tx payloads as expected', () => {
    const types = generateTypes(MSG_WITHDRAW_DELEGATOR_REWARD_TYPES)
    const message = createMsgWithdrawDelegatorReward(
      context.sender.accountAddress,
      params.validatorAddress,
    )
    const typedData = {
      types,
      message,
    }

    const messageCosmos = protoMsgWithdrawDelegatorReward(
      context.sender.accountAddress,
      params.validatorAddress,
    )

    const payload = createTxMsgWithdrawDelegatorReward(context, params)
    const expectedPayload = createTransactionPayload(
      context,
      typedData,
      messageCosmos,
    )
    expect(payload).toStrictEqual(expectedPayload)
  })
})
