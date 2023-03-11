import {
  generateEndpointBroadcast,
  generatePostBodyBroadcast,
} from '@evmos/provider'
import { Proto } from '@evmos/proto'
import fetch from 'node-fetch'
import { nodeUrl } from './params.js'

interface SignedTx {
  message: Proto.Cosmos.Transactions.Tx.TxRaw
  path: string
}

export const broadcastTx = async (signedTx: SignedTx) => {
  const postOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: generatePostBodyBroadcast(signedTx),
  }

  const broadcastEndpoint = `${nodeUrl}${generateEndpointBroadcast()}`
  const broadcastResult = await fetch(broadcastEndpoint, postOptions)

  const response = await broadcastResult.json()

  return response
}
