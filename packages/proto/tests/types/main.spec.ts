import { genTestEmptyMsg } from './cosmos-utils'

// Enforce that the Protobuf encoder omits default values
describe('defaults', () => {
  it('omits default values', () => {
    const emptyMsg = genTestEmptyMsg()
    expect(emptyMsg.toBinary()).toStrictEqual(new Uint8Array([]))
  })
})
