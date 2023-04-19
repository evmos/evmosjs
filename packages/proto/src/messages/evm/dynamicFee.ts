import { ExtensionOptionDynamicFeeTx } from '../../proto/ethermint/types/dynamicFee.js'

export function createDynamicFeeExtension(maxPriorityPrice: string) {
  const message = new ExtensionOptionDynamicFeeTx({
    maxPriorityPrice,
  })
  return {
    message,
    path: ExtensionOptionDynamicFeeTx.typeName,
  }
}
