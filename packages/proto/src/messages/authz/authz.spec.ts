import { createMsgGrant, createMsgRevoke } from './authz'
import { createGenericAuthorization } from './generic'
import { GenericAuthorization } from '../../proto/cosmos/authz/authz'
import { from, to } from '../../proto/tests/utils'
import { JSONOptions } from '../../proto/tests/common'

const msgType = 'cosmos-sdk/MsgSend'

describe('test authz message generation', () => {
  it('msgGrant', () => {
    const seconds = 42
    const secondsTimeStamp = '1970-01-01T00:00:42Z'

    const auth = createGenericAuthorization(msgType)
    expect(auth.message.toJson(JSONOptions)).toStrictEqual({
      msg: msgType,
    })
    expect(auth.path).toStrictEqual(auth.message.getType().typeName)

    const msg = createMsgGrant(from, to, auth, seconds)

    expect(msg.message.toJson(JSONOptions)).toStrictEqual({
      granter: from,
      grantee: to,
      grant: {
        authorization: {
          '@type': `/${GenericAuthorization.typeName}`,
          msg: msgType,
        },
        expiration: secondsTimeStamp,
      },
    })
    expect(msg.path).toStrictEqual(msg.message.getType().typeName)
  })

  it('msgRevoke', () => {
    const msg = createMsgRevoke(from, to, msgType)

    expect(msg.message.toJson(JSONOptions)).toStrictEqual({
      granter: from,
      grantee: to,
      msg_type_url: msgType,
    })
    expect(msg.path).toStrictEqual(msg.message.getType().typeName)
  })
})
