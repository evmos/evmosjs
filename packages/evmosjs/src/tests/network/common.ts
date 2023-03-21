import { TxResponse } from './client'

export const expectSuccess = (response: TxResponse) => {
  // eslint-disable-next-line camelcase
  expect(response.tx_response.code).toBe(0)
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))
