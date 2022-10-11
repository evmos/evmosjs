import * as govTx from '../../proto/cosmos/gov/v1beta1/tx'

export function createMsgVote(
  proposalId: number,
  option: number,
  sender: string,
) {
  const voteMessage = new govTx.cosmos.gov.v1beta1.MsgVote({
    proposal_id: proposalId,
    voter: sender,
    option,
  })

  return {
    message: voteMessage,
    path: 'cosmos.gov.v1beta1.MsgVote',
  }
}
