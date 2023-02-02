// @ts-ignore
import {
  isValidChecksumAddress,
  stripHexPrefix,
  toChecksumAddress,
} from 'crypto-addr-codec'

import { bech32 } from 'bech32'

function makeChecksummedHexDecoder(chainId?: number) {
  return (data: string) => {
    const stripped = stripHexPrefix(data)
    if (
      !isValidChecksumAddress(data, chainId || null) &&
      stripped !== stripped.toLowerCase() &&
      stripped !== stripped.toUpperCase()
    ) {
      throw Error('Invalid address checksum')
    }
    return Buffer.from(stripHexPrefix(data), 'hex')
  }
}

function makeChecksummedHexEncoder(chainId?: number) {
  return (data: Buffer) =>
    toChecksumAddress(data.toString('hex'), chainId || null)
}

const hexChecksumChain = (name: string, chainId?: number) => ({
  decoder: makeChecksummedHexDecoder(chainId),
  encoder: makeChecksummedHexEncoder(chainId),
  name,
})

export const ETH = hexChecksumChain('ETH')

function makeBech32Encoder(prefix: string) {
  return (data: Buffer) => bech32.encode(prefix, bech32.toWords(data))
}

function makeBech32Decoder(currentPrefix: string) {
  return (data: string) => {
    const { prefix, words } = bech32.decode(data)
    if (prefix !== currentPrefix) {
      throw Error('Unrecognised address format')
    }
    return Buffer.from(bech32.fromWords(words))
  }
}

const bech32Chain = (name: string, prefix: string) => ({
  decoder: makeBech32Decoder(prefix),
  encoder: makeBech32Encoder(prefix),
  name,
})

export const ETHERMINT = bech32Chain('ETHERMINT', 'ethm')

export const ethToEthermint = (ethAddress: string) => {
  const data = ETH.decoder(ethAddress)
  return ETHERMINT.encoder(data)
}

export const ethermintToEth = (ethermintAddress: string) => {
  const data = ETHERMINT.decoder(ethermintAddress)
  return ETH.encoder(data)
}

export const EVMOS = bech32Chain('EVMOS', 'evmos')

export const ethToEvmos = (ethAddress: string) => {
  const data = ETH.decoder(ethAddress)
  return EVMOS.encoder(data)
}

export const evmosToEth = (evmosAddress: string) => {
  const data = EVMOS.decoder(evmosAddress)
  return ETH.encoder(data)
}

export const OSMOSIS = bech32Chain('OSMOSIS', 'osmo')

export const ethToOsmosis = (ethAddress: string) => {
  const data = ETH.decoder(ethAddress)
  return OSMOSIS.encoder(data)
}

export const osmosisToEth = (evmosAddress: string) => {
  const data = OSMOSIS.decoder(evmosAddress)
  return ETH.encoder(data)
}

export const COSMOS = bech32Chain('COSMOS', 'cosmos')

export const ethToCosmos = (ethAddress: string) => {
  const data = ETH.decoder(ethAddress)
  return COSMOS.encoder(data)
}

export const cosmosToEth = (evmosAddress: string) => {
  const data = COSMOS.decoder(evmosAddress)
  return ETH.encoder(data)
}

export const KYVE = bech32Chain('KORELLIA', 'kyve')

export const ethToKyve = (ethAddress: string) => {
  const data = ETH.decoder(ethAddress)
  return KYVE.encoder(data)
}

export const kyveToEth = (kyveAddress: string) => {
  const data = KYVE.decoder(kyveAddress)
  return ETH.encoder(data)
}
