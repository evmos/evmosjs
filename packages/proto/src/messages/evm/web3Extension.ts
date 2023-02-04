import { ExtensionOptionsWeb3Tx } from '../../types/ethermint/types/web3'

export function createWeb3Extension(
  chainId: number,
  feePayer: string,
  feePayerSig: Uint8Array,
) {
  const message = new ExtensionOptionsWeb3Tx({
    typedDataChainId: BigInt(chainId),
    feePayer,
    feePayerSig,
  })
  return {
    message,
    path: 'ethermint.types.v1.ExtensionOptionsWeb3Tx',
  }
}
