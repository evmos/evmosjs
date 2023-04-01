import { createMsgCancelUnbondingDelegation as protoMsgCancelUnbondingDelegation } from '@evmos/proto'
import {
  generateTypes,
  createMsgCancelUnbondingDelegation,
  CREATE_MSG_CANCEL_UNBONDING_DELEGATION_TYPES,
} from '@evmos/eip712'
import {
  MsgCancelUnbondingDelegationParams,
  createTxMsgCancelUnbondingDelegation,
} from './cancelUnbondingDelegation'
import { createTransactionPayload } from '../base'
import TestUtils from '../../tests/utils'

const { context, denom } = TestUtils
const delegatorAddress = TestUtils.addr1
const validatorAddress = TestUtils.addrVal1
const creationHeight = TestUtils.amount2
const amount = TestUtils.amount1

const createParams = (amount?: string, denom?: string) => ({
  delegatorAddress,
  validatorAddress,
  creationHeight,
  amount,
  denom,
})

const createAndValidatePayload = (
  params: MsgCancelUnbondingDelegationParams,
) => {
  const msgTypes = CREATE_MSG_CANCEL_UNBONDING_DELEGATION_TYPES(
    params.amount,
    params.denom,
  )
  const types = generateTypes(msgTypes)
  const message = createMsgCancelUnbondingDelegation(
    params.delegatorAddress,
    params.validatorAddress,
    params.creationHeight,
    params.amount,
    params.denom,
  )
  const typedData = {
    types,
    message,
  }

  const messageCosmos = protoMsgCancelUnbondingDelegation(
    context.sender.accountAddress,
    params.validatorAddress,
    params.creationHeight,
    params.amount,
    params.denom,
  )

  const payload = createTxMsgCancelUnbondingDelegation(context, params)
  const expectedPayload = createTransactionPayload(
    context,
    typedData,
    messageCosmos,
  )
  expect(payload).toStrictEqual(expectedPayload)
}

describe('test tx payload', () => {
  it('produces tx payloads as expected with balance', () => {
    const params = createParams(amount, denom)
    createAndValidatePayload(params)
  })

  it('produces tx payloads as expected without balance', () => {
    const params = createParams()
    createAndValidatePayload(params)
  })
})
