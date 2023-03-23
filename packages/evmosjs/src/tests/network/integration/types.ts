/* eslint-disable max-classes-per-file */
import NetworkClient from '../client'
import { TxResponse } from '../types'

export abstract class NetworkClientHost {
  public networkClient: NetworkClient

  constructor(client: NetworkClient) {
    this.networkClient = client
  }
}

abstract class IntegrationClientBase extends NetworkClientHost {
  abstract readonly sendTx: () => Promise<TxResponse>

  abstract readonly verifyStateChange: () => Promise<void>
}

export default IntegrationClientBase
