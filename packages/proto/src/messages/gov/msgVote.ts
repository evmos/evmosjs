import { MsgVote } from '../../proto/cosmos/gov/tx'

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
    path: MsgVote.typeName,
  }
}
