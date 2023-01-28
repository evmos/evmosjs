import { Coin } from '@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/base/v1beta1/coin_pb'
import { MsgTransfer } from '@buf/cosmos_ibc.bufbuild_es/ibc/applications/transfer/v1/tx_pb'
import { Height } from '@buf/cosmos_ibc.bufbuild_es/ibc/core/client/v1/client_pb'

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
