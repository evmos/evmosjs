import { createVestingAminoConverters } from './aminoRegistry'
import {
  MsgClawback,
  MsgCreateClawbackVestingAccount,
} from '../../proto/evmos/vesting/tx'
import { createAminoConverter } from '../../amino/objectConverter'
import { expectEqualsDefaultAminoConverters } from '../../../testutils/compareAminoRegistry'

describe('test vesting amino converters', () => {
  it('creates expected amino converters', () => {
    const aminoConverters = createVestingAminoConverters()
    const expAminoConverters = {
      ...createAminoConverter(MsgClawback, 'evmos/MsgClawback'),
      ...createAminoConverter(
        MsgCreateClawbackVestingAccount,
        'evmos/MsgCreateClawbackVestingAccount',
      ),
    }

    expectEqualsDefaultAminoConverters(aminoConverters, expAminoConverters)
  })
})
