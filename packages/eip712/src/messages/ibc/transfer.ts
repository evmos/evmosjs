export const CREATE_IBC_MSG_TRANSFER_TYPES = (memo?: string) => ({
  MsgValue: [
    { name: 'source_port', type: 'string' },
    { name: 'source_channel', type: 'string' },
    { name: 'token', type: 'TypeToken' },
    { name: 'sender', type: 'string' },
    { name: 'receiver', type: 'string' },
    { name: 'timeout_height', type: 'TypeTimeoutHeight' },
    { name: 'timeout_timestamp', type: 'uint64' },
    ...(memo ? [{ name: 'memo', type: 'string' }] : []),
  ],
  TypeToken: [
    { name: 'denom', type: 'string' },
    { name: 'amount', type: 'string' },
  ],
  TypeTimeoutHeight: [
    { name: 'revision_number', type: 'uint64' },
    { name: 'revision_height', type: 'uint64' },
  ],
})

export function createIBCMsgTransfer(
  receiver: string,
  sender: string,
  sourceChannel: string,
  sourcePort: string,
  revisionHeight: number,
  revisionNumber: number,
  timeoutTimestamp: string,
  amount: string,
  denom: string,
  memo?: string,
) {
  /* eslint-disable camelcase */
  return {
    type: 'cosmos-sdk/MsgTransfer',
    value: {
      receiver,
      sender,
      source_channel: sourceChannel,
      source_port: sourcePort,
      timeout_height: {
        revision_height: revisionHeight.toString(),
        revision_number: revisionNumber.toString(),
      },
      timeout_timestamp: timeoutTimestamp,
      token: {
        amount,
        denom,
      },
      ...(memo && { memo }),
    },
  }
}
