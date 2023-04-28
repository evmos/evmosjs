import { createERC20AminoConverters } from './aminoRegistry'
import { MsgConvertCoin, MsgConvertERC20 } from '../../proto/evmos/erc20/tx'
import { createAminoConverter } from '../../amino/objectConverter'
import { expectEqualDefaultAminoConverters } from '../../../testutils/compareAminoRegistry'

describe('test erc20 amino converters', () => {
  it('creates expected amino converters', () => {
    const aminoConverters = createERC20AminoConverters()
    const expAminoConverters = {
      ...createAminoConverter(MsgConvertCoin, 'evmos/MsgConvertCoin'),
      ...createAminoConverter(MsgConvertERC20, 'evmos/MsgConvertERC20'),
    }

    expectEqualDefaultAminoConverters(aminoConverters, expAminoConverters)
  })
})
