import { Coin } from '../types/cosmos/base/coin'
import { Height } from '../types/cosmos-ibc/ibc/core/client'
import { MsgTransfer } from '../types/cosmos-ibc/ibc/applications/tx'

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
  const token = new Coin({
    denom,
    amount,
  })

  const timeoutHeight = new Height({
    revisionNumber: BigInt(revisionNumber),
    revisionHeight: BigInt(revisionHeight),
  })

  const ibcMessage = new MsgTransfer({
    sourcePort,
    sourceChannel,
    token,
    sender,
    receiver,
    timeoutHeight,
    timeoutTimestamp: BigInt(parseInt(timeoutTimestamp, 10)),
  })

  return {
    message: ibcMessage,
    path: 'ibc.applications.transfer.v1.MsgTransfer',
  }
}
