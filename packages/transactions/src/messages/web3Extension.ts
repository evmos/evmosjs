import { createWeb3Extension } from '@astradefi/proto'
import { Chain, Sender } from './common'

export function signatureToWeb3Extension(
  chain: Chain,
  sender: Sender,
  hexFormattedSignature: string,
) {
  let signature = hexFormattedSignature
  const temp = hexFormattedSignature.split('0x')
  if (temp.length === 2) {
    ;[, signature] = temp
  }
  return createWeb3Extension(
    chain.chainId,
    sender.accountAddress,
    Uint8Array.from(Buffer.from(signature, 'hex')),
  )
}
