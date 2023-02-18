import { TestingClient } from './utils'

class IntegrationTestingClient extends TestingClient {
  private expectedMsgCosmos: object | undefined = undefined

  testLegacyAmino = () => {
    const { denom } = this
    const destinationAddress = this.addr1
    const amount = this.amount1

    const params = {
      destinationAddress,
      amount,
      denom,
    }
  }

  setExpectedMsg = (obj: Object) => {
    this.expectedMsgCosmos = obj
  }

  reset = () => {
    this.expectedMsgCosmos = undefined
  }
}

const client = new IntegrationTestingClient()

export default client
