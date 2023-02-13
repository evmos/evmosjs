export const MSG_GENERIC_AUTHORIZATION_TYPES = {
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

export function createMsgGenericAuthorization(
  sender: string,
  botAddress: string,
  typeUrl: string,
  expires: number,
) {
  const date = new Date()
  date.setTime(expires * 1000)
  let time = date.toISOString()
  time = time.replace('.000Z', 'Z')

  return {
    type: 'cosmos-sdk/MsgGrant',
    value: {
      grant: {
        authorization: {
          type: 'cosmos-sdk/GenericAuthorization',
          value: {
            msg: typeUrl,
          },
        },
        expiration: time,
      },
      grantee: botAddress,
      granter: sender,
    },
  }
}

export const MSG_REVOKE_GENERIC_AUTHORIZATION_TYPES = {
  MsgValue: [
    { name: 'granter', type: 'string' },
    { name: 'grantee', type: 'string' },
    { name: 'msg_type_url', type: 'string' },
  ],
}

export function createMsgRevokeGenericAuthorization(
  sender: string,
  botAddress: string,
  typeUrl: string,
) {
  return {
    type: 'cosmos-sdk/MsgRevoke',
    value: {
      msg_type_url: typeUrl,
      grantee: botAddress,
      granter: sender,
    },
  }
}
