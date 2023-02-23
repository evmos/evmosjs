export function generateEndpointBroadcast() {
  return `/cosmos/tx/v1beta1/txs`
}

// TODO: make a @evmos/types package and move all the interfaces there
// So we can use the same types on provider and transaction without importing
// the complete package to just type the functions
export interface TxToSend {
  message: {
    toBinary: () => Uint8Array
  }
  path: string
}

export enum BroadcastMode {
  Unspecified = 'BROADCAST_MODE_UNSPECIFIED',
  Block = 'BROADCAST_MODE_BLOCK',
  Sync = 'BROADCAST_MODE_SYNC',
  Async = 'BROADCAST_MODE_ASYNC',
}

export function generatePostBodyBroadcast(
  txRaw: TxToSend,
  broadcastMode: string = BroadcastMode.Sync,
) {
  return `{ "tx_bytes": [${txRaw.message
    .toBinary()
    .toString()}], "mode": "${broadcastMode}" }`
}

/* eslint-disable camelcase */
export interface BroadcastPostBody {
  tx_bytes: Uint8Array
  mode: string
}
