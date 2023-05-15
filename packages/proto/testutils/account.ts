import { BaseAccount } from '../src/proto/cosmos/auth/auth.js'
import { EthAccount } from '../src/proto/ethermint/types/account.js'
import { createAnyMessage } from '../src/messages/common.js'
import { pubkeyAsAny as pubKey } from './pubkey.js'

const address = 'evmos1pmk2r32ssqwps42y3c9d4clqlca403yd9wymgr'
const accountNumber = BigInt(40)
const sequence = BigInt(80)

const baseAccount = new BaseAccount({
  address,
  pubKey,
  accountNumber,
  sequence,
})

const codeHash =
  '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'

export const account = new EthAccount({
  baseAccount,
  codeHash,
})

const path = EthAccount.typeName

export const accountAsAny = createAnyMessage({
  path,
  message: account,
})
