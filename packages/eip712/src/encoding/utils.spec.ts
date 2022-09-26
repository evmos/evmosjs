import { parseChainId } from './utils'

describe('eip712 encoding utils', () => {
  it('parses standard chainIds', () => {
    const id = 'evmos_9000-1'
    expect(parseChainId(id)).toBe(9000)
  })

  it('throws on invalid case 1', () => {
    const id = 'evmos_9000'
    expect(() => {
      parseChainId(id)
    }).toThrow(Error)
  })

  it('throws on invalid case 2', () => {
    const id = 'evmos9000'
    expect(() => {
      parseChainId(id)
    }).toThrow(Error)
  })

  it('throws on invalid case 3', () => {
    const id = 'evmos_9000-1evmos_9000-1'
    expect(() => {
      parseChainId(id)
    }).toThrow(Error)
  })
})
