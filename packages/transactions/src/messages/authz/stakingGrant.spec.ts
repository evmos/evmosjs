import { createMsgGrant, createStakeAuthorization, Proto } from '@evmos/proto'
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
const expiration = 10000

const params: MsgStakeAuthorizationParams = {
  granteeAddress,
  validatorAddress,
  denom,
  maxTokens,
  expiration,
}

describe('test tx payload', () => {
  it('produces tx payloads as expected', () => {
    const typedData = {
      types: {},
      message: {},
    }

    const stakeAuthType = Proto.Cosmos.Staking.Authz.AuthorizationType.DELEGATE
    const auth = createStakeAuthorization(
      params.validatorAddress,
      params.denom,
      params.maxTokens,
      stakeAuthType,
    )

    const messageCosmos = createMsgGrant(
      context.sender.accountAddress,
      params.granteeAddress,
      auth,
      params.expiration,
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
