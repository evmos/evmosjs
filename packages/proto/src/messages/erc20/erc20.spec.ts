import { Metadata } from '@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/bank/v1beta1/bank_pb'
import { createMsgConvertCoin } from './msgConvertCoin'
import { createMsgConvertERC20 } from './msgConvertERC20'
import { createMsgRegisterERC20 } from './msgRegisterERC20'
import { createMsgRegisterCoin } from './msgRegisterCoin'

import { MsgConvertCoin, MsgConvertERC20 } from '../../proto/evmos/erc20/tx'
import {
  RegisterERC20Proposal,
  RegisterCoinProposal,
} from '../../proto/evmos/erc20/erc20'

import { from, to, denom, hex, ibcDenom } from '../../proto/tests/utils'
import { JSONOptions } from '../../proto/tests/common'

describe('test ERC20 Module message generation', () => {
  it('correctly wraps msgConvertCoin', () => {
    const amount = '10000000'
    const msg = createMsgConvertCoin(denom, amount, hex, from)

    expect(msg.message.toJson(JSONOptions)).toStrictEqual({
      coin: {
        amount,
        denom,
      },
      receiver: hex,
      sender: from,
    })
    expect(msg.path).toStrictEqual(MsgConvertCoin.typeName)
  })

  it('correctly wraps msgConvertERC20', () => {
    const amount = '10000000'
    const msg = createMsgConvertERC20(hex, amount, to, from)

    expect(msg.message.toJson(JSONOptions)).toStrictEqual({
      contract_address: hex,
      amount,
      receiver: to,
      sender: from,
    })
    expect(msg.path).toStrictEqual(MsgConvertERC20.typeName)
  })

  it('correctly wraps msgRegisterERC20', () => {
    const title = 'Register Test ERC20'
    const msg = createMsgRegisterERC20(title, title, [hex])

    expect(msg.message.toJson(JSONOptions)).toStrictEqual({
      title,
      description: title,
      erc20addresses: [hex],
    })
    expect(msg.path).toStrictEqual(RegisterERC20Proposal.typeName)
  })

  it('correctly wraps msgRegisterCoin', () => {
    const title = 'Register Test IBC Coin'
    const metadata = new Metadata({
      description: 'This is one IBC coin',
      denomUnits: [
        { denom: ibcDenom, exponent: 0, aliases: ['stuosmo'] },
        { denom: 'stosmo', exponent: 6, aliases: [] },
      ],
      base: ibcDenom,
      display: 'stosmo',
      name: 'Stride Staked Osmo',
      symbol: 'stOSMO',
      uri: '',
      uriHash: '',
    })
    const msg = createMsgRegisterCoin(title, title, [metadata])

    // expected output uses snake_case naming instead of camelCase
    const expMeta = {
      description: 'This is one IBC coin',
      denom_units: [
        { denom: ibcDenom, exponent: 0, aliases: ['stuosmo'] },
        { denom: 'stosmo', exponent: 6, aliases: [] },
      ],
      base: ibcDenom,
      display: 'stosmo',
      name: 'Stride Staked Osmo',
      symbol: 'stOSMO',
      uri: '',
      uri_hash: '',
    }

    expect(msg.message.toJson(JSONOptions)).toStrictEqual({
      title,
      description: title,
      metadata: [expMeta],
    })
    expect(msg.path).toStrictEqual(RegisterCoinProposal.typeName)
  })
})
