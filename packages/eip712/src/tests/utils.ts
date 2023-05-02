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

  public readonly ibcDenom1 =
    'ibc/748375B5DD168C6C4DCBF54B3D54DCF20C2B41572C9603B1B9774419326A5A43'

  public readonly ibcDenom2 =
    'ibc/C9364B2C453F0428D04FD40B6CF486BA138FA462FE43A116268A7B695AFCFE7F'

  public readonly accountNumber = 10

  public readonly sequence = 6

  public readonly chainId = 9001

  public readonly memo = 'Transaction Memo'

  public readonly typeUrl1 = 'cosmos-sdk/MsgSend'

  public readonly proposalId1 = 42

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

  get msgSend() {
    const { denom } = this
    const recipient = this.addr1
    const amount = this.amount1
    const type = this.typeUrl1

    return {
      type,
      value: {
        recipient,
        amount: {
          amount,
          denom,
        },
      },
    }
  }

  get stdFee() {
    const amount = this.amount1
    const { denom } = this
    const gas = this.amount2
    const granter = this.addr1
    const payer = this.addr2

    return {
      amount: [
        {
          amount,
          denom,
        },
      ],
      gas,
      granter,
      payer,
    }
  }

  // TODO: Replace with imported cosmjs AminoMsg type
  createStdSignDoc(aminoMsgs: any[]) {
    const fee = this.stdFee
    const { accountNumber, sequence, chainId, memo } = this

    return {
      chain_id: chainId,
      account_number: accountNumber,
      sequence,
      fee,
      msgs: aminoMsgs,
      memo,
    }
  }
}

const client = new TestingClient()

export default client
