import {
  createGenericAuthorization as protoCreateGenericAuthorization,
  createMsgGrant,
} from '@evmos/proto'

import {
  generateTypes,
  createMsgGenericAuthorization,
  MSG_GENERIC_AUTHORIZATION_TYPES,
} from '@evmos/eip712'

import {
  createTxMsgGenericGrant,
  MsgGenericAuthorizationParams,
} from './genericGrant'
import { createTransactionPayload } from '../base'
import TestUtils from '../../tests/utils'

const { context } = TestUtils
const granteeAddress = TestUtils.addr1
const typeUrl = 'cosmos-sdk/MsgSend'
const expires = 420

const params: MsgGenericAuthorizationParams = {
  granteeAddress,
  typeUrl,
  expires,
}

describe('test tx payload', () => {
  it('produces tx payloads as expected', () => {
    const types = generateTypes(MSG_GENERIC_AUTHORIZATION_TYPES)
    const message = createMsgGenericAuthorization(
      context.sender.accountAddress,
      params.granteeAddress,
      params.typeUrl,
      params.expires,
    )
    const typedData = {
      types,
      message,
    }

    const grant = protoCreateGenericAuthorization(params.typeUrl)
    const messageCosmos = createMsgGrant(
      context.sender.accountAddress,
      params.granteeAddress,
      grant,
      params.expires,
    )

    const payload = createTxMsgGenericGrant(context, params)
    const expectedPayload = createTransactionPayload(
      context,
      typedData,
      messageCosmos,
    )
    expect(payload).toStrictEqual(expectedPayload)
  })
})
