import { TxResponse } from './types'

export const expectSuccess = (response: TxResponse) => {
  // eslint-disable-next-line camelcase
  expect(response.tx_response.code).toBe(0)
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const hexToBytes = (hex: string) =>
  Buffer.from(hex.replace('0x', ''), 'hex')

export const base64ToBytes = (base64: string) => Buffer.from(base64, 'base64')
