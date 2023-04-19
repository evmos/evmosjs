import { Proto } from '@evmos/proto'
import { TxContext, TxPayload } from '@evmos/transactions'

export interface TxResponse {
  // eslint-disable-next-line camelcase
  tx_response: {
    code: number
    txhash: string
  }
}

export interface SignedTx {
  message: Proto.Cosmos.Transactions.Tx.TxRaw
  path: string
}

export interface TxExtensionParams {
  extensions: any[]
  context: TxContext
}

export type CreatePayloadFn = (context: TxContext) => TxPayload
export type SignPayloadFn = (
  payload: TxPayload,
  extensionParams?: TxExtensionParams,
) => SignedTx
