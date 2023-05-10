import { ExtensionOptionDynamicFeeTx } from '../../proto/ethermint/types/dynamicFee.js'
import {
  MsgEthereumTx,
  LegacyTx,
  AccessListTx,
  DynamicFeeTx,
} from '../../proto/ethermint/evm/tx.js'
import { ExtensionOptionsWeb3Tx } from '../../proto/ethermint/types/web3.js'

export const evmRegistryTypes = [
  ExtensionOptionDynamicFeeTx,
  MsgEthereumTx,
  LegacyTx,
  AccessListTx,
  DynamicFeeTx,
  ExtensionOptionsWeb3Tx,
]
