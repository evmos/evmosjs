import { JSONObject } from './types.js'
import createDomain from './createDomain.js'
import createTypes from './createTypes/index.js'
import flattenPayload from './flattenPayload.js'

// TODO: Add integration tests against a network.

export const PRIMARY_TYPE = 'Tx'

// TODO: Replace with cosmjs StdSignDoc
const createTypedData = (chainId: number, stdSignDoc: JSONObject) => {
  const transformResponse = flattenPayload(stdSignDoc)
  const types = createTypes(transformResponse)
  const domain = createDomain(chainId)
  const message = transformResponse.payload

  return {
    types,
    primaryType: PRIMARY_TYPE,
    domain,
    message,
  }
}

export default createTypedData
