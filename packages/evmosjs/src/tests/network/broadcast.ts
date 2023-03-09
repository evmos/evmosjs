import {
  generateEndpointBroadcast,
  generatePostBodyBroadcast,
} from '@evmos/provider'
import fetch from 'node-fetch'
import { nodeUrl } from './params.js'

export const broadcastTx = async (signedTx: any) => {
  const postOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: generatePostBodyBroadcast(signedTx),
  }

  const broadcastEndpoint = `${nodeUrl}${generateEndpointBroadcast()}`
  const broadcastPost = await fetch(broadcastEndpoint, postOptions)

  const response = await broadcastPost.json()

  return response
}
