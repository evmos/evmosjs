import { AminoConverters } from '@cosmjs/stargate'
import {
  MsgClawback,
  MsgCreateClawbackVestingAccount,
} from '../../proto/evmos/vesting/tx.js'
import { createAminoConverter } from '../../amino/objectConverter.js'

export function createVestingAminoConverters(): AminoConverters {
  return {
    ...createAminoConverter(MsgClawback, 'evmos/MsgClawback'),
    ...createAminoConverter(
      MsgCreateClawbackVestingAccount,
      'evmos/MsgCreateClawbackVestingAccount',
    ),
  }
}
