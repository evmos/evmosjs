import * as web3 from '../proto/ethermint/types/v1/web3'

export function createWeb3Extension(
  chainId: number,
  feePayer: string,
  feePayerSig: Uint8Array,
) {
  const message = new web3.ethermint.types.v1.ExtensionOptionsWeb3Tx({
    typed_data_chain_id: chainId,
    fee_payer: feePayer,
    fee_payer_sig: feePayerSig,
  })
  return {
    message,
    path: 'ethermint.types.v1.ExtensionOptionsWeb3Tx',
  }
}
