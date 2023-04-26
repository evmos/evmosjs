import { JSONObject } from './types.js'
import createDomain from './createDomain.js'
import createTypes from './createTypes/index.js'
import flattenPayload from './flattenPayload.js'

// TODO: Add integration tests against a network.

const PRIMARY_TYPE = 'Tx'

export const createTypedData = (chainId: number, signDoc: JSONObject) => {
  const transformResponse = flattenPayload(signDoc)
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
