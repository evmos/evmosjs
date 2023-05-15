import { createAnyMessage } from '../messages/common'
import { pubkey, pubkeyAsAny } from '../../testutils/pubkey'
import { account, accountAsAny } from '../../testutils/account'
import { decodeEthSecp256k1PubKey, decodeEthermintAccount } from './decoder'

describe('test decode ethsecp256k1 pubkeys', () => {
  it('decodes ethsecp256k1 pubkeys as expected', () => {
    const decodedPubkey = decodeEthSecp256k1PubKey(pubkeyAsAny)
    expect(decodedPubkey).toStrictEqual(pubkey)
  })

  it('expects to error given an invalid typeurl', () => {
    const pubkeyAsAny = createAnyMessage({
      path: 'invalid-path',
      message: pubkey,
    })

    const decodePubkey = () => {
      decodeEthSecp256k1PubKey(pubkeyAsAny)
    }

    expect(decodePubkey).toThrow(Error)
  })
})

describe('test decode ethermint account', () => {
  it('decodes ethermint accounts as expected', () => {
    const baseAccount = decodeEthermintAccount(accountAsAny)
    const expBaseAccount = account.baseAccount

    // eslint-disable-next-line jest/no-if
    if (!baseAccount || !expBaseAccount) {
      throw new Error('unexpected undefined base account')
    }

    expect(baseAccount.address).toStrictEqual(expBaseAccount.address)
    expect(baseAccount.accountNumber).toStrictEqual(
      Number(expBaseAccount.accountNumber),
    )
    expect(baseAccount.sequence).toStrictEqual(Number(expBaseAccount.sequence))

    const expDecodedPubkey = decodeEthSecp256k1PubKey(expBaseAccount.pubKey)
    expect(baseAccount.pubkey).toStrictEqual(expDecodedPubkey)
  })
})
