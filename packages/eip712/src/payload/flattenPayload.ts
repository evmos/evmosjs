import {
  JSONObject,
  FlattenPayloadResponse,
  payloadMsgFieldForIndex,
} from './common.js'

const getPayloadMessages = (payload: JSONObject) => {
  const { msgs } = payload
  if (!msgs || !Array.isArray(msgs)) {
    throw new TypeError(
      `invalid payload msgs field: expected JSON array but got ${msgs}`,
    )
  }

  return msgs
}

// Flattens a payload messages in-place: moves each message in
// the `msgs` array to a corresponding field msg{i}.
// This allows different EIP-712 types per message.
const flattenPayloadMessages = (payload: JSONObject) => {
  const msgs = getPayloadMessages(payload)

  msgs.forEach((msg, i: number) => {
    const key = payloadMsgFieldForIndex(i)

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

// Flattens the payload in-place and returns a response containing
// the number of messages and transformed payload.
const flattenPayload = (payload: JSONObject): FlattenPayloadResponse => {
  const numMessages = flattenPayloadMessages(payload)

  return {
    numMessages,
    payload,
  }
}

export default flattenPayload
