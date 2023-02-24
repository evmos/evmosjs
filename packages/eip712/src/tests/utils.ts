class TestingClient {
  public readonly denom = 'aevmos'

  public readonly amount1 = '1000000000000000000'

  public readonly amount2 = '999999999999'

  public readonly addr1 = 'evmos1pmk2r32ssqwps42y3c9d4clqlca403yd9wymgr'

  public readonly addr2 = 'evmos12nml2w93uva0smjw3c36stczfay0k67ny94ecz'

  public readonly addr3 = 'evmos1xqnm0wf0rmntujjmpsz8nr28324qqyzy5k02u0'

  public readonly addrVal1 =
    'evmosvaloper14rajuselkxsvqtqv20lamd08t8zxg8qdw3r3xm'

  public readonly addrVal2 =
    'evmosvaloper1ex3wpda6mpczlgtcm2dsd60ltz39g5a7wqewls'

  public readonly chainId = 9001

  public readonly memo = 'Transaction Memo'

  public readonly typeUrl1 = 'cosmos-sdk/MsgSend'

  // eslint-disable-next-line
  get validatorParams() {
    const moniker = 'test moniker'
    const identity = 'test identity'
    const website = 'test website'
    const securityContact = 'test security contact'
    const details = 'test details'
    const validatorAddress = 'test validator address'
    const commissionRate = 'test commission rate'
    const minSelfDelegation = 'test min self-delegation'

    return {
      moniker,
      identity,
      website,
      securityContact,
      details,
      validatorAddress,
      commissionRate,
      minSelfDelegation,
    }
  }

  // eslint-disable-next-line
  get pubKey() {
    const bytes = new Uint8Array([
      10, 33, 2, 136, 177, 245, 49, 184, 120, 113, 219, 192, 55, 41, 81, 135,
      37, 92, 174, 75, 160, 196, 188, 55, 202, 114, 97, 5, 178, 20, 10, 253,
    ])

    return Buffer.from(bytes).toString('base64')
  }
}

const client = new TestingClient()

export default client