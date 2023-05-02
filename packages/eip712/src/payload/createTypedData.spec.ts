import createTypedData, { PRIMARY_TYPE } from './createTypedData'
import createDomain from './createDomain.js'
import createTypes from './createTypes/index.js'
import flattenPayload from './flattenPayload.js'

import TestUtils from '../tests/utils'

const { msgSend, chainId } = TestUtils

describe('eip-712 TypedData generation unit tests', () => {
  it('correctly generates TypedData given StdSignDocs', () => {
    const aminoMsgs = [msgSend, msgSend]
    const stdSignDoc = TestUtils.createStdSignDoc(aminoMsgs)
    const stdSignDocCopy = JSON.parse(JSON.stringify(stdSignDoc))

    const typedData = createTypedData(chainId, stdSignDoc)

    const expDomain = createDomain(chainId)
    expect(typedData.domain).toStrictEqual(expDomain)

    expect(typedData.primaryType).toBe(PRIMARY_TYPE)

    const flattenPayloadResponse = flattenPayload(stdSignDocCopy)
    const expMessage = flattenPayloadResponse.payload
    const expTypes = createTypes(flattenPayloadResponse)

    expect(typedData.message).toStrictEqual(expMessage)
    expect(typedData.types).toStrictEqual(expTypes)
  })
})
