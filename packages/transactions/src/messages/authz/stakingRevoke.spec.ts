import { createMsgRevoke, RevokeMessages } from '@evmos/proto'

import { createTransactionPayload } from '../base'

import {
  MsgStakeRevokeAuthorizationParams,
  createTxMsgStakeRevokeAuthorization,
} from './stakingRevoke'
import TestUtils from '../../tests/utils'

const { context } = TestUtils
const granteeAddress = TestUtils.addr1

const params: MsgStakeRevokeAuthorizationParams = {
  granteeAddress,
}

describe('test tx payload', () => {
  it('produces tx payloads as expected', () => {
    const typedData = {
      types: {},
      message: {},
    }

    const messageCosmos = createMsgRevoke(
      context.sender.accountAddress,
      params.granteeAddress,
      RevokeMessages.REVOKE_MSG_DELEGATE,
    )

    const payload = createTxMsgStakeRevokeAuthorization(context, params)
    const expectedPayload = createTransactionPayload(
      context,
      typedData,
      messageCosmos,
    )

    expect(payload).toStrictEqual(expectedPayload)
  })
})
