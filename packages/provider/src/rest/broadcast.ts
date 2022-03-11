export function generateEndpointBroadcast() {
  return `/cosmos/tx/v1beta1/txs`
}

// TODO: make a @tharsis/types package and move all the interfaces there
// So we can use the same types on provider and transaction without importing
// the complete package to just type the functions
export interface TxToSend {
  message: {
    serializeBinary: () => Uint8Array
  }
  path: string
}

// TODO: export enum for all the broadcast modes
export function generatePostBodyBroadcast(
  txRaw: TxToSend,
  broadcastMode: string = 'BROADCAST_MODE_SYNC',
) {
  return `{ "tx_bytes": [${txRaw.message
    .serializeBinary()
    .toString()}], "mode": ${broadcastMode} }`
}

/* eslint-disable camelcase */
export interface BroadcastPostBody {
  tx_bytes: Uint8Array
  mode: string
}
