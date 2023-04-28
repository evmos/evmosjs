import { AminoConverters } from '@cosmjs/stargate'
import { MsgConvertCoin, MsgConvertERC20 } from './tx.js'
import { createAminoConverter } from '../../../amino/objectConverter.js'

export function createERC20AminoConverters(): AminoConverters {
  return {
    ...createAminoConverter(MsgConvertCoin, 'evmos/MsgConvertCoin'),
    ...createAminoConverter(MsgConvertERC20, 'evmos/MsgConvertERC20'),
  }
}
