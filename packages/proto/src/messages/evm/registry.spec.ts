import { evmRegistryTypes } from './registry'

import { ExtensionOptionDynamicFeeTx } from '../../proto/ethermint/types/dynamicFee'
import {
  MsgEthereumTx,
  LegacyTx,
  AccessListTx,
  DynamicFeeTx,
} from '../../proto/ethermint/evm/tx'
import { ExtensionOptionsWeb3Tx } from '../../proto/ethermint/types/web3'

describe('test evm registry types against expected', () => {
  it('exactly equals expected types', () => {
    expect(evmRegistryTypes).toStrictEqual([
      ExtensionOptionDynamicFeeTx,
      MsgEthereumTx,
      LegacyTx,
      AccessListTx,
      DynamicFeeTx,
      ExtensionOptionsWeb3Tx,
    ])
  })
})
