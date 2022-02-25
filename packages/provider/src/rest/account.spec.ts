import { getAccount } from './account'

// TODO: add mockttp for these tests or directly remove the getAccount function
// users should use the accountEndpoint and AccountResponse to make their own http requests
describe('account tests', () => {
  it('getAccount valid', async () => {
    const res = await getAccount(
      'http://localhost:1317',
      'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm',
    )
    expect(res).toStrictEqual({
      account: {
        '@type': '/ethermint.types.v1.EthAccount',
        base_account: {
          address: 'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm',
          pub_key: {
            '@type': '/ethermint.crypto.v1.ethsecp256k1.PubKey',
            key: 'AgTw+4v0daIrxsNSW4FcQ+IoingPseFwHO1DnssyoOqZ',
          },
          account_number: '9',
          sequence: '1',
        },
        code_hash:
          '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
      },
    })
  })

  class NoErrorThrownError extends Error {}

  const getError = async <TError>(call: () => unknown): Promise<TError> => {
    try {
      await call()

      throw new NoErrorThrownError()
    } catch (error: unknown) {
      return error as TError
    }
  }

  it('getAccount invalid', async () => {
    const error = await getError(async () =>
      getAccount(
        'http://localhost:1317',
        'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm2',
      ),
    )
    // 400
    expect(error).not.toBeInstanceOf(NoErrorThrownError)
  })

  it('getAccount valid not found', async () => {
    const error = await getError(async () =>
      getAccount(
        'http://localhost:1317',
        'ethm18v23kmz4fpzlxgch5zy364fwlawvyhmjudl2ym',
      ),
    )
    // 404
    expect(error).not.toBeInstanceOf(NoErrorThrownError)
  })
})
