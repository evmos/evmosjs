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

  public readonly addrHex1 = '0xe2D61e49ff8a9d724CC54d338D8076F878aC6b71'

  public readonly addrHex2 = '0xC1c85eB8278F783C5FE2103F1e4ac041B094160a'

  public readonly chainId = 9001

  public readonly memo = 'Transaction Memo'

  public readonly typeUrl1 = 'cosmos-sdk/MsgSend'
}

const client = new TestingClient()

export default client
