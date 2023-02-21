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
