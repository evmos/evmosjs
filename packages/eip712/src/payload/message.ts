import { JSON, MessagePayload } from './common.js'

const payloadMessages = (payload: JSON) => {
  const { msgs } = payload
  if (!msgs || !Array.isArray(msgs)) {
    throw new TypeError(
      `invalid payload msgs field: expected JSON array but got ${msgs}`,
    )
  }

  return msgs
}

const flattenMessages = (payload: JSON, msgs: any[]) => {
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
}

const eip712Message = (payload: JSON): MessagePayload => {
  const msgs = payloadMessages(payload)
  flattenMessages(payload, msgs)

  return {
    numMessages: msgs.length,
    payload,
  }
}

export default eip712Message
