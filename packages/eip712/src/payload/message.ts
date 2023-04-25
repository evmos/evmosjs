import { JSONObject, MessageParams } from './common.js'

const payloadMessages = (payload: JSONObject) => {
  const { msgs } = payload
  if (!msgs || !Array.isArray(msgs)) {
    throw new TypeError(
      `invalid payload msgs field: expected JSON array but got ${msgs}`,
    )
  }

  return msgs
}

const flattenPayload = (payload: JSONObject) => {
  const msgs = payloadMessages(payload)

  msgs.forEach((msg, i: number) => {
    const key = `msg${i}`

    if (Object.keys(payload).includes(key)) {
      throw new TypeError(`malformed payload, found unexpected key ${key}`)
    }

    if (!msg || !(msg instanceof Object)) {
      throw new TypeError(
        `invalid msg field, expected JSON object but got ${msg}`,
      )
    }

    // eslint-disable-next-line no-param-reassign
    payload[key] = msg
  })

  // eslint-disable-next-line no-param-reassign
  delete payload.msgs

  return msgs.length
}

const messageParams = (payload: JSONObject): MessageParams => {
  const numMessages = flattenPayload(payload)

  return {
    numMessages,
    payload,
  }
}

export default messageParams
