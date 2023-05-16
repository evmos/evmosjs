import { MsgSend, MsgMultiSend } from '../../proto/cosmos/bank/tx.js'
import { Metadata } from '../../proto/cosmos/bank/bank.js'

export const bankRegistryTypes = [MsgSend, MsgMultiSend, Metadata]
