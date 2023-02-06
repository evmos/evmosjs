import { createMsgRegisterRevenue } from './msgRegisterRevenue'
import { createMsgCancelRevenue } from './msgCancelRevenue'
import { createMsgUpdateRevenue } from './msgUpdateRevenue'

import { from, hex, to } from '../../proto/tests/utils'
import { JSONOptions } from '../../proto/tests/common'

describe('test revenue message generation', () => {
  it('msgRegisterRevenue', () => {
    const nonces = [10, 15]
    const msg = createMsgRegisterRevenue(hex, from, to, nonces)

    expect(msg.message.toJson(JSONOptions)).toStrictEqual({
      contract_address: hex,
      deployer_address: from,
      withdrawer_address: to,
      nonces: nonces.map((n) => n.toString()),
    })
    expect(msg.path).toStrictEqual(msg.message.getType().typeName)
  })

  it('msgCancelRevenue', () => {
    const msg = createMsgCancelRevenue(hex, from)

    expect(msg.message.toJson(JSONOptions)).toStrictEqual({
      contract_address: hex,
      deployer_address: from,
    })
    expect(msg.path).toStrictEqual(msg.message.getType().typeName)
  })

  it('msgUpdateRevenue', () => {
    const msg = createMsgUpdateRevenue(hex, from, to)

    expect(msg.message.toJson(JSONOptions)).toStrictEqual({
      contract_address: hex,
      deployer_address: from,
      withdrawer_address: to,
    })
    expect(msg.path).toStrictEqual(msg.message.getType().typeName)
  })
})
