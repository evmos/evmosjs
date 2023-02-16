import {
  createMsgGrant,
  createStakeAuthorization,
  stakeAuthTypes,
} from '@evmos/proto'
import { createTransactionPayload } from '../base'

import {
  MsgStakeAuthorizationParams,
  createTxMsgStakeAuthorization,
} from './stakingGrant'
import TestUtils from '../../tests/utils'

const { context, denom } = TestUtils
const granteeAddress = TestUtils.addr1
const validatorAddress = TestUtils.addrVal1
const maxTokens = TestUtils.amount1
const durationInSeconds = 10000

const params: MsgStakeAuthorizationParams = {
  granteeAddress,
  validatorAddress,
  denom,
  maxTokens,
  durationInSeconds,
}

describe('test tx payload', () => {
  it('produces tx payloads as expected', () => {
    const typedData = {
      types: {},
      message: {},
    }

    const auth = createStakeAuthorization(
      params.validatorAddress,
      params.denom,
      params.maxTokens,
      stakeAuthTypes.AUTHORIZATION_TYPE_DELEGATE,
    )

    const messageCosmos = createMsgGrant(
      context.sender.accountAddress,
      params.granteeAddress,
      auth,
      params.durationInSeconds,
    )

    const payload = createTxMsgStakeAuthorization(context, params)
    const expectedPayload = createTransactionPayload(
      context,
      typedData,
      messageCosmos,
    )

    expect(payload).toStrictEqual(expectedPayload)
  })
})