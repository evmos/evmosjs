import {
  MsgEthereumTx,
  LegacyTx,
  AccessListTx,
  DynamicFeeTx,
} from '@buf/evmos_ethermint.bufbuild_es/ethermint/evm/v1/tx_pb'

export function bytesToMsgEthereumTx(bytes: Uint8Array) {
  return MsgEthereumTx.fromBinary(bytes)
}

export function bytesToLegacyTx(bytes: Uint8Array) {
  return LegacyTx.fromBinary(bytes)
}

export function bytesToAccessListTx(bytes: Uint8Array) {
  return AccessListTx.fromBinary(bytes)
}

export function bytesToDynamicFeeTx(bytes: Uint8Array) {
  return DynamicFeeTx.fromBinary(bytes)
}
