import * as coin from '../proto/cosmos/base/v1beta1/coin'
import * as ibcMsg from '../proto/ibc/applications/transfer/v1/tx'
import * as ibcCore from '../proto/ibc/core/client/v1/client'

export function createIBCMsgTransfer(
  // Channel
  sourcePort: string,
  sourceChannel: string,
  // Token
  amount: string,
  denom: string,
  // Addresses
  sender: string,
  receiver: string,
  // Timeout
  revisionNumber: number,
  revisionHeight: number,
  timeoutTimestamp: string,
) {
  const token = new coin.cosmos.base.v1beta1.Coin({
    denom,
    amount,
  })

  const timeoutHeight = new ibcCore.ibc.core.client.v1.Height({
    revision_number: revisionNumber,
    revision_height: revisionHeight,
  })

  const ibcMessage = new ibcMsg.ibc.applications.transfer.v1.MsgTransfer({
    source_port: sourcePort,
    source_channel: sourceChannel,
    token,
    sender,
    receiver,
    timeout_height: timeoutHeight,
    timeout_timestamp: parseInt(timeoutTimestamp, 10),
  })

  return {
    message: ibcMessage,
    path: 'ibc.applications.transfer.v1.MsgTransfer',
  }
}
