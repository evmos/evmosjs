export const msgVoteTypes = {
  MsgValue: [
    { name: 'proposal_id', type: 'uint64' },
    { name: 'voter', type: 'string' },
    { name: 'option', type: 'uint64' },
  ],
}
export function createMsgVote(
  proposalId: number,
  option: number,
  sender: string,
) {
  return {
    type: 'cosmos-sdk/MsgVote',
    value: {
      proposal_id: proposalId,
      voter: sender,
      option,
    },
  }
}
