import {
  MSG_GENERIC_AUTHORIZATION_TYPES,
  createMsgGenericAuthorization,
} from './genericGrant'
import TestUtils from '../../tests/utils'

describe('test generic auth grant types and messages', () => {
  it('creates types as expected', () => {
    const expTypes = {
      MsgValue: [
        { name: 'granter', type: 'string' },
        { name: 'grantee', type: 'string' },
        { name: 'grant', type: 'TypeGrant' },
      ],
      TypeGrant: [
        { name: 'authorization', type: 'TypeGrantAuthorization' },
        { name: 'expiration', type: 'string' },
      ],
      TypeGrantAuthorization: [
        { name: 'type', type: 'string' },
        { name: 'value', type: 'TypeGrantAuthorizationValue' },
      ],
      TypeGrantAuthorizationValue: [{ name: 'msg', type: 'string' }],
    }

    expect(MSG_GENERIC_AUTHORIZATION_TYPES).toStrictEqual(expTypes)
  })

  it('creates messages as expected', () => {
    const granter = TestUtils.addr1
    const grantee = TestUtils.addr2
    const typeUrl = TestUtils.typeUrl1
    const expiration = 20000
    // 20000 seconds is 5.56 hours
    const expirationTimestamp = '1970-01-01T05:33:20Z'

    const msg = createMsgGenericAuthorization(
      granter,
      grantee,
      typeUrl,
      expiration,
    )

    const expMsg = {
      type: 'cosmos-sdk/MsgGrant',
      value: {
        grant: {
          authorization: {
            type: 'cosmos-sdk/GenericAuthorization',
            value: {
              msg: typeUrl,
            },
          },
          expiration: expirationTimestamp,
        },
        grantee,
        granter,
      },
    }

    expect(msg).toStrictEqual(expMsg)
  })
})
