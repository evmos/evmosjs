import { SignTypedDataVersion, TypedDataUtils } from '@metamask/eth-sig-util'
import { decodeAminoSignDoc } from './decodeAmino'
import { decodeProtobufSignDoc } from './decodeProtobuf'

// Decode Amino StdSignDoc or Protobuf SignDoc bytes into the corresponding
// EIP-712 TypedData representation. Throws on errors.
export function decodeSignDocToTypedData(bytes: Uint8Array) {
  let eip712

  let aminoDecodeErr: Error | undefined
  let protoDecodeErr: Error | undefined

  try {
    eip712 = decodeAminoSignDoc(bytes)
  } catch (e) {
    aminoDecodeErr = e as Error
  }

  try {
    eip712 = decodeProtobufSignDoc(bytes)
  } catch (e) {
    protoDecodeErr = e as Error
  }

  // Throw if neither decoding was successful
  if (!eip712) {
    throw new Error(`Could not cast bytes to either StdSignDoc or SignDoc:\n
                    Amino: ${aminoDecodeErr?.message}\n
                    Protobuf: ${protoDecodeErr?.message}\n`)
  }

  return eip712
}

// Return the hashed V4 EIP-712 domain and struct objects to be signed.
// Throws on errors.
export function hashEIP712(eip712: any) {
  try {
    const eip712Domain = TypedDataUtils.hashStruct(
      'EIP712Domain',
      eip712.domain,
      eip712.types,
      SignTypedDataVersion.V4,
    )
    const eip712Hash = TypedDataUtils.hashStruct(
      eip712.primaryType,
      eip712.message as Record<string, unknown>,
      eip712.types,
      SignTypedDataVersion.V4,
    )

    return {
      domain: eip712Domain,
      message: eip712Hash,
    }
  } catch (e) {
    throw new Error(`Could not hash EIP-712 object: ${e}`)
  }
}
