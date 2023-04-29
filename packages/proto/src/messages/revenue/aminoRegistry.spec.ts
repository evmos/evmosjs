import { createRevenueAminoConverters } from './aminoRegistry'
import {
  MsgCancelRevenue,
  MsgRegisterRevenue,
  MsgUpdateRevenue,
} from '../../proto/evmos/revenue/tx'
import { createAminoConverter } from '../../amino/objectConverter'
import { expectEqualDefaultAminoConverters } from '../../../testutils/compareAminoRegistry'

describe('test revenue amino converters', () => {
  it('creates expected amino converters', () => {
    const aminoConverters = createRevenueAminoConverters()
    const expAminoConverters = {
      ...createAminoConverter(MsgCancelRevenue, 'evmos/MsgCancelRevenue'),
      ...createAminoConverter(MsgRegisterRevenue, 'evmos/MsgRegisterRevenue'),
      ...createAminoConverter(MsgUpdateRevenue, 'evmos/MsgUpdateRevenue'),
    }

    expectEqualDefaultAminoConverters(aminoConverters, expAminoConverters)
  })
})
