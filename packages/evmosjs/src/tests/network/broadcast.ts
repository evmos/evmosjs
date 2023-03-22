import {
  generateEndpointBroadcast,
  generatePostBodyBroadcast,
} from '@evmos/provider'
import fetch from 'node-fetch'
import { nodeUrl } from './params'
import { SignedTx } from './types'

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
