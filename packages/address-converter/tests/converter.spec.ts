import {
  ETH,
  ETHERMINT,
  ethToEthermint,
  ethermintToEth,
  evmosToEth,
  ethToEvmos,
  ethToAstra,
  astraToEth,
} from '../src/index'

describe('converter tests', () => {
  it('decoders', () => {
    // ETH
    let hex = ETH.decoder('0xe2D61e49ff8a9d724CC54d338D8076F878aC6b71')
    expect(hex.toString('hex')).toBe('e2d61e49ff8a9d724cc54d338d8076f878ac6b71')
    // ETHERMINT
    hex = ETHERMINT.decoder('ethm1uttpuj0l32whynx9f5ecmqrklpu2c6m3973048')
    expect(hex.toString('hex')).toBe('e2d61e49ff8a9d724cc54d338d8076f878ac6b71')
  })

  it('encoders', () => {
    // ETH
    let address = ETH.encoder(
      Buffer.from('e2d61e49ff8a9d724cc54d338d8076f878ac6b71', 'hex'),
    )
    expect(address).toBe('0xe2D61e49ff8a9d724CC54d338D8076F878aC6b71')
    // ETHERMINT
    address = ETHERMINT.encoder(
      Buffer.from('e2d61e49ff8a9d724cc54d338d8076f878ac6b71', 'hex'),
    )
    expect(address).toBe('ethm1uttpuj0l32whynx9f5ecmqrklpu2c6m3973048')
  })

  it('converters', () => {
    // ETH
    let address = ethToEthermint('0xe2D61e49ff8a9d724CC54d338D8076F878aC6b71')
    expect(address).toBe('ethm1uttpuj0l32whynx9f5ecmqrklpu2c6m3973048')

    // ETHERMINT
    address = ethermintToEth('ethm1uttpuj0l32whynx9f5ecmqrklpu2c6m3973048')
    expect(address).toBe('0xe2D61e49ff8a9d724CC54d338D8076F878aC6b71')

    // EVMOS
    address = evmosToEth('evmos1z3t55m0l9h0eupuz3dp5t5cypyv674jj7mz2jw')
    expect(address).toBe('0x14574a6DFF2Ddf9e07828b4345d3040919AF5652')
    // ETH to EVMOS
    address = ethToEvmos('0x14574a6DFF2Ddf9e07828b4345d3040919AF5652')
    expect(address).toBe('evmos1z3t55m0l9h0eupuz3dp5t5cypyv674jj7mz2jw')

    // ETH to Astra.
    address = ethToAstra('0xcF758c4039c1655b82cf8b6f267321a3Ac9eb953')
    expect(address).toBe('astra1ea6ccspec9j4hqk03dhjvuep5wkfaw2nshmzkf')

    // Astra to ETH
    address = astraToEth('astra1ea6ccspec9j4hqk03dhjvuep5wkfaw2nshmzkf')
    expect(address).toBe('0xcF758c4039c1655b82cf8b6f267321a3Ac9eb953')
  })
})
