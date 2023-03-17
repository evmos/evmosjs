import NetworkClient, { TxResponse } from '../client'

abstract class IntegrationClientBase {
  public networkClient: NetworkClient

  constructor(client: NetworkClient) {
    this.networkClient = client
  }

  abstract readonly sendTx: () => Promise<TxResponse>

  abstract readonly verifyStateChange: () => Promise<void>
}

export default IntegrationClientBase
