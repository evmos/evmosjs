import { AminoConverters } from '@cosmjs/stargate'
import {
  MsgClawback,
  MsgCreateClawbackVestingAccount,
} from '../../proto/evmos/vesting/tx.js'
import { createAminoConverter } from '../../amino/objectConverter.js'

// TODO: Add aminoRegistry types for updateVestingFunder and
// convertVestingAccount after they are added.
// TODO: Add support for legacy_coins encoding on empty coins
export function createVestingAminoConverters(): AminoConverters {
  return {
    ...createAminoConverter(MsgClawback, 'evmos/MsgClawback'),
    ...createAminoConverter(
      MsgCreateClawbackVestingAccount,
      'evmos/MsgCreateClawbackVestingAccount',
    ),
  }
}
