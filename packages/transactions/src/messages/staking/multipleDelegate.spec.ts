import { createMsgDelegate as protoMsgDelegate } from '@evmos/proto'

import {
  generateTypes,
  MSG_DELEGATE_TYPES,
  createMsgDelegate,
} from '@evmos/eip712'
import {
  MultipleMsgDelegateParams,
  createTxMultipleMsgDelegate,
} from './multipleDelegate'
import { MsgDelegateParams } from './delegate'
import { createTransactionPayload } from '../base'
import TestUtils from '../../tests/utils'

const { context, denom } = TestUtils

const multipleMsgDelegateParams: MsgDelegateParams[] = [
  {
    validatorAddress: TestUtils.addrVal1,
    amount: TestUtils.amount1,
    denom,
  },
  {
    validatorAddress: TestUtils.addrVal2,
    amount: TestUtils.amount2,
    denom,
  },
]

const params: MultipleMsgDelegateParams = {
  values: multipleMsgDelegateParams,
}

describe('test tx payload', () => {
  it('produces tx payloads as expected', () => {
    const types = generateTypes(MSG_DELEGATE_TYPES)
    const messages = params.values.map((delegateParams) =>
      createMsgDelegate(
        context.sender.accountAddress,
        delegateParams.validatorAddress,
        delegateParams.amount,
        delegateParams.denom,
      ),
    )
    expect(messages).toHaveLength(multipleMsgDelegateParams.length)

    const typedData = {
      types,
      message: messages,
    }

    const messagesCosmos = params.values.map((delegateParams) =>
      protoMsgDelegate(
        context.sender.accountAddress,
        delegateParams.validatorAddress,
        delegateParams.amount,
        delegateParams.denom,
      ),
    )
    expect(messagesCosmos).toHaveLength(multipleMsgDelegateParams.length)

    const payload = createTxMultipleMsgDelegate(context, params)
    const expectedPayload = createTransactionPayload(
      context,
      typedData,
      messagesCosmos,
    )
    expect(payload).toStrictEqual(expectedPayload)
  })
})
