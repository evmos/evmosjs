import { registryTypes, JSONOptions } from './registry'
import {
  baseRegistryTypes,
  authzRegistryTypes,
  bankRegistryTypes,
  cryptoRegistryTypes,
  distributionRegistryTypes,
  erc20RegistryTypes,
  evmRegistryTypes,
  govRegistryTypes,
  ibcRegistryTypes,
  revenueRegistryTypes,
  stakingRegistryTypes,
  transactionsRegistryTypes,
  vestingRegistryTypes,
  createAnyMessage,
  createMsgSend,
  createMsgConvertCoin,
  createMsgVote,
} from '../messages/index'

import { from, to, denom, hex } from '../proto/tests/utils'

describe('test registry types and encoding', () => {
  it('registry types matches expected list of modules', () => {
    expect(registryTypes).toStrictEqual([
      ...baseRegistryTypes,
      ...authzRegistryTypes,
      ...bankRegistryTypes,
      ...cryptoRegistryTypes,
      ...distributionRegistryTypes,
      ...erc20RegistryTypes,
      ...evmRegistryTypes,
      ...govRegistryTypes,
      ...ibcRegistryTypes,
      ...revenueRegistryTypes,
      ...stakingRegistryTypes,
      ...transactionsRegistryTypes,
      ...vestingRegistryTypes,
    ])
  })

  it('registry decodes messages from any', () => {
    const msgSend = createMsgSend(from, to, '10000', denom)
    const msgSendAsAny = createAnyMessage(msgSend)
    // Decode to JSON fails if type is not registered.
    msgSendAsAny.toJson(JSONOptions)

    const msgConvertCoin = createMsgConvertCoin(denom, '1000', hex, from)
    const msgConvertCoinAsAny = createAnyMessage(msgConvertCoin)
    msgConvertCoinAsAny.toJson(JSONOptions)

    const msgVote = createMsgVote(1, 1, from)
    const msgVoteAsAny = createAnyMessage(msgVote)
    msgVoteAsAny.toJson(JSONOptions)
  })
})
