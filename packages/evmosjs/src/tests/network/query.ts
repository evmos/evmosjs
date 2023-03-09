import { generateEndpointAccount } from '@evmos/provider'
import fetch from 'node-fetch'
import { senderAddress, nodeUrl } from './params'

export const fetchSenderInfo = async () => {
  const address = senderAddress

  const queryEndpoint = `${nodeUrl}${generateEndpointAccount(address)}`

  const restOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }

  const rawResult = await fetch(queryEndpoint, restOptions)

  const result = await rawResult.json()

  return result
}
