export const MSG_SUBMIT_TYPES = {
  MsgValue: [
    { name: 'content', type: 'any' },
    { name: 'proposer', type: 'string' },
    { name: 'initial_deposit', type: 'TypeDeposit[]' },
  ],
  TypeDeposit: [
    { name: 'denom', type: 'string' },
    { name: 'amount', type: 'string' },
  ],
}

export function createMsgSubmitProposal(
  content: any,
  initialDepositDenom: string,
  initialDepositAmount: string,
  proposer: string,
) {
  return {
    type: 'cosmos-sdk/MsgSubmitProposal',
    value: {
      content,
      initial_deposit: [
        {
          amount: initialDepositAmount,
          denom: initialDepositDenom,
        },
      ],
      proposer,
    },
  }
}
