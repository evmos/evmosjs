import { govRegistryTypes } from './registry'

import {
  MsgDeposit,
  MsgSubmitProposal,
  MsgVote,
  MsgVoteWeighted,
} from '../../proto/cosmos/gov/tx'

describe('test gov registry types against expected', () => {
  it('exactly equals expected types', () => {
    expect(govRegistryTypes).toStrictEqual([
      MsgDeposit,
      MsgSubmitProposal,
      MsgVote,
      MsgVoteWeighted,
    ])
  })
})
