import {
  MSG_REVOKE_GENERIC_AUTHORIZATION_TYPES,
  createMsgRevokeGenericAuthorization,
} from './genericRevoke'
import TestUtils from '../../tests/utils'

describe('test generic auth revoke types and messages', () => {
  it('creates types as expected', () => {
    const expTypes = {
      MsgValue: [
        { name: 'granter', type: 'string' },
        { name: 'grantee', type: 'string' },
        { name: 'msg_type_url', type: 'string' },
      ],
    }

    expect(MSG_REVOKE_GENERIC_AUTHORIZATION_TYPES).toStrictEqual(expTypes)
  })

  it('creates messages as expected', () => {
    const granter = TestUtils.addr1
    const grantee = TestUtils.addr2
    const typeUrl = TestUtils.typeUrl1

    const msg = createMsgRevokeGenericAuthorization(granter, grantee, typeUrl)

    const expMsg = {
      type: 'cosmos-sdk/MsgRevoke',
      value: {
        msg_type_url: typeUrl,
        grantee,
        granter,
      },
    }

    expect(msg).toStrictEqual(expMsg)
  })
})
