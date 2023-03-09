/* eslint-disable camelcase */
import { generateEndpointAccount } from '@evmos/provider'
import fetch from 'node-fetch'
import { senderAddress, nodeUrl } from './params'

export interface SenderInfo {
  account: {
    '@type': string
    base_account: {
      address: string
      pub_key?: {
        '@type': string
        key: string
      }
      account_number: string
      sequence: string
    }
  }
}

export const fetchSenderInfo = async () => {
  const address = senderAddress

  const queryEndpoint = `${nodeUrl}${generateEndpointAccount(address)}`

  const restOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }

  const rawResult = await fetch(queryEndpoint, restOptions)

  const result = (await rawResult.json()) as SenderInfo | undefined

  return result
}
