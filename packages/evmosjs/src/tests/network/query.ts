/* eslint-disable camelcase */
import {
  generateEndpointAccount,
  generateEndpointGetValidators,
  generateEndpointProposals,
  generateEndpointBalanceByDenom,
  GetValidatorsResponse,
  ProposalsResponse,
  BalanceByDenomResponse,
} from '@evmos/provider'
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

export interface TokenPairResponse {
  token_pairs: [
    {
      erc20_address: string
      denom: string
      enabled: boolean
      contract_owner: string
    },
  ]
}

const restOptions = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
}

export const fetchSenderInfo = async () => {
  const address = senderAddress

  const queryEndpoint = `${nodeUrl}${generateEndpointAccount(address)}`
  const rawResult = await fetch(queryEndpoint, restOptions)

  const result = (await rawResult.json()) as SenderInfo | undefined

  return result
}

export const fetchProposals = async () => {
  const queryEndpoint = `${nodeUrl}${generateEndpointProposals()}`
  const rawResult = await fetch(queryEndpoint, restOptions)

  const result = (await rawResult.json()) as ProposalsResponse

  return result
}

export const fetchValidators = async () => {
  const queryEndpoint = `${nodeUrl}${generateEndpointGetValidators()}`
  const rawResult = await fetch(queryEndpoint, restOptions)

  const result = (await rawResult.json()) as GetValidatorsResponse

  return result
}

export const fetchBalanceByDenom = async (address: string, denom: string) => {
  const queryEndpoint = `${nodeUrl}${generateEndpointBalanceByDenom(
    address,
    denom,
  )}`
  const rawResult = await fetch(queryEndpoint, restOptions)

  const result = (await rawResult.json()) as BalanceByDenomResponse

  return result
}

export const fetchERC20ContractAddress = async () => {
  const queryEndpoint = `${nodeUrl}/evmos/erc20/v1/token_pairs`
  const rawResult = await fetch(queryEndpoint, restOptions)

  const result = (await rawResult.json()) as TokenPairResponse

  return result
}
