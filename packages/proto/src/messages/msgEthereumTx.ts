import * as ethermint from '../proto/ethermint/evm/v1/tx'

export function bytesToMsgEthereumTx(bytes: Uint8Array) {
  return ethermint.ethermint.evm.v1.MsgEthereumTx.deserialize(bytes)
}

export function bytesToLegacyTx(bytes: Uint8Array) {
  return ethermint.ethermint.evm.v1.LegacyTx.deserialize(bytes)
}

export function bytesToAccessListTx(bytes: Uint8Array) {
  return ethermint.ethermint.evm.v1.AccessListTx.deserialize(bytes)
}

export function bytesToDynamicFeeTx(bytes: Uint8Array) {
  return ethermint.ethermint.evm.v1.DynamicFeeTx.deserialize(bytes)
}
