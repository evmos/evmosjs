import { createDynamicFeeExtension } from './dynamicFee'

import { ExtensionOptionDynamicFeeTx } from '../../proto/ethermint/types/dynamicFee'

import { JSONOptions } from '../../proto/tests/common'

describe('test DynamicFeeExtension message generation', () => {
  it('correctly wraps dynamic fee extension', () => {
    const maxPriorityPrice = '10000000000'

    const ext = createDynamicFeeExtension(maxPriorityPrice)

    expect(ext.message.toJson(JSONOptions)).toStrictEqual({
      max_priority_price: maxPriorityPrice,
    })
    expect(ext.path).toStrictEqual(ExtensionOptionDynamicFeeTx.typeName)
  })
})
