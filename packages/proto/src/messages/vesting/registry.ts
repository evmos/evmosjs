import {
  MsgClawback,
  MsgCreateClawbackVestingAccount,
} from '../../proto/evmos/vesting/tx.js'
import { Period } from '../../proto/cosmos/vesting/vesting.js'

export const vestingRegistryTypes = [
  MsgClawback,
  MsgCreateClawbackVestingAccount,
  Period,
]
