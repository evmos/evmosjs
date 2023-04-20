import { createMsgGrant, createStakeAuthorization, Proto } from '@evmos/proto'
import { createTransactionPayload } from '../base'

import {
  MsgStakeAuthorizationParams,
  createTxMsgStakeAuthorization,
} from './stakingGrant'
import TestUtils from '../../tests/utils'

const { context, denom } = TestUtils
const granteeAddress = TestUtils.addr1
const maxTokens = TestUtils.amount1
const expiration = 10000

const createParams = (validatorAddress: string | string[]) => ({
  granteeAddress,
  validatorAddress,
  denom,
  maxTokens,
  expiration,
})

const validatePayload = (params: MsgStakeAuthorizationParams) => {
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
}

describe('test tx payload', () => {
  it('correctly produces tx payloads with single validator', () => {
    const validator = TestUtils.addrVal1
    const params = createParams(validator)
    validatePayload(params)
  })

  it('correctly produces tx payloads with multiple validators', () => {
    const validators = [TestUtils.addrVal1, TestUtils.addrVal2]
    const params = createParams(validators)
    validatePayload(params)
  })
})
