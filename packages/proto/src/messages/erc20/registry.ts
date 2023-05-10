import { MsgConvertCoin, MsgConvertERC20 } from '../../proto/evmos/erc20/tx.js'
import {
  RegisterCoinProposal,
  RegisterERC20Proposal,
} from '../../proto/evmos/erc20/erc20.js'

export const erc20RegistryTypes = [
  MsgConvertCoin,
  MsgConvertERC20,
  RegisterCoinProposal,
  RegisterERC20Proposal,
]
