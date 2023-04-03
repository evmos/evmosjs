import { createMsgCancelUnbondingDelegation as protoMsgCancelUnbondingDelegation } from '@evmos/proto'
import {
  generateTypes,
  createMsgCancelUnbondingDelegation,
  MSG_CANCEL_UNBONDING_DELEGATION_TYPES,
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
const amount = TestUtils.amount1
const creationHeight = '2000'

const params: MsgCancelUnbondingDelegationParams = {
  delegatorAddress,
  validatorAddress,
  amount,
  denom,
  creationHeight,
}

describe('test tx payload', () => {
  it('produces tx payloads as expected', () => {
    const types = generateTypes(MSG_CANCEL_UNBONDING_DELEGATION_TYPES)
    const message = createMsgCancelUnbondingDelegation(
      params.delegatorAddress,
      params.validatorAddress,
      params.amount,
      params.denom,
      params.creationHeight,
    )
    const typedData = {
      types,
      message,
    }

    const messageCosmos = protoMsgCancelUnbondingDelegation(
      params.delegatorAddress,
      params.validatorAddress,
      params.amount,
      params.denom,
      params.creationHeight,
    )

    const payload = createTxMsgCancelUnbondingDelegation(context, params)
    const expectedPayload = createTransactionPayload(
      context,
      typedData,
      messageCosmos,
    )
    expect(payload).toStrictEqual(expectedPayload)
  })
})
