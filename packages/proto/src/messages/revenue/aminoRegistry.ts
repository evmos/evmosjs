import { AminoConverters } from '@cosmjs/stargate'
import {
  MsgCancelRevenue,
  MsgRegisterRevenue,
  MsgUpdateRevenue,
} from '../../proto/evmos/revenue/tx.js'
import { createAminoConverter } from '../../amino/objectConverter.js'

// TODO: Add MsgUpdateParams registration when type is added
export function createRevenueAminoConverters(): AminoConverters {
  return {
    ...createAminoConverter(MsgCancelRevenue, 'evmos/MsgCancelRevenue'),
    ...createAminoConverter(MsgRegisterRevenue, 'evmos/MsgRegisterRevenue'),
    ...createAminoConverter(MsgUpdateRevenue, 'evmos/MsgUpdateRevenue'),
  }
}
