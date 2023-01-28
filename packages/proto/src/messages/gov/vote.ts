import { MsgVote } from '@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/gov/v1beta1/tx_pb'

export function createMsgVote(
  proposalId: number,
  option: number,
  sender: string,
) {
  const voteMessage = new MsgVote({
    proposalId: BigInt(proposalId),
    voter: sender,
    option,
  })

  return {
    message: voteMessage,
    path: 'cosmos.gov.v1beta1.MsgVote',
  }
}
