import { erc20RegistryTypes } from './registry'

import { MsgConvertCoin, MsgConvertERC20 } from '../../proto/evmos/erc20/tx'
import {
  RegisterCoinProposal,
  RegisterERC20Proposal,
} from '../../proto/evmos/erc20/erc20'

describe('test erc20 registry types against expected', () => {
  it('exactly equals expected types', () => {
    expect(erc20RegistryTypes).toStrictEqual([
      MsgConvertCoin,
      MsgConvertERC20,
      RegisterCoinProposal,
      RegisterERC20Proposal,
    ])
  })
})
