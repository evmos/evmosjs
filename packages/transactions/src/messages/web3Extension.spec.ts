import { signatureToWeb3Extension } from './web3Extension'

describe('web3Extension tests', () => {
  it('valid', async () => {
    const chain = {
      chainId: 9000,
      cosmosChainId: 'evmos_9000-1',
    }

    const sender = {
      accountAddress: 'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm',
      sequence: 1,
      accountNumber: 9,
      pubkey: 'AgTw+4v0daIrxsNSW4FcQ+IoingPseFwHO1DnssyoOqZ',
    }

    const signature =
      '0xee543cc5a50d25a5bab4da0609bf63095804282aeb82f3fd16e03784db19723a727f515b8d8e7b52c6f059f324ec5a651c92829f15e38e4d0db3788e230318a41c'

    const res = signatureToWeb3Extension(chain, sender, signature)
    expect(res.path).toBe('ethermint.types.v1.ExtensionOptionsWeb3Tx')
    expect(Buffer.from(res.message.serializeBinary()).toString('base64')).toBe(
      'CKhGEitldGhtMXRmZWdmNTBuNXhsMGhkNWN4ZnpqY2EzeWxzZnBnMGZuZWQ1Z3FtGkHuVDzFpQ0lpbq02gYJv2MJWAQoKuuC8/0W4DeE2xlyOnJ/UVuNjntSxvBZ8yTsWmUckoKfFeOOTQ2zeI4jAxikHA==',
    )
  })
})
