import {
  MsgDelegate,
  MsgBeginRedelegate,
  MsgUndelegate,
  MsgCancelUnbondingDelegation,
  MsgEditValidator,
  MsgCreateValidator,
} from '../../proto/cosmos/staking/tx.js'
import {
  Description,
  CommissionRates,
} from '../../proto/cosmos/staking/staking.js'

export const stakingRegistryTypes = [
  MsgDelegate,
  MsgBeginRedelegate,
  MsgUndelegate,
  MsgCancelUnbondingDelegation,
  MsgEditValidator,
  MsgCreateValidator,
  Description,
  CommissionRates,
]
