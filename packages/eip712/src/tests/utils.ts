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

  public readonly proposalId1 = 42
}

const client = new TestingClient()

export default client
