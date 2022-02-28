export const broadcastEndpoint = '/cosmos/tx/v1beta1/txs'

/* eslint-disable camelcase */
export interface BroadcastPostBody {
  tx_bytes: Uint8Array
  mode: string
}
