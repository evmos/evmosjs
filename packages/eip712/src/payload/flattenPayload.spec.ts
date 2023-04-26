import flattenPayload from './flattenPayload'
import { JSONObject } from './types'

const expectFlattenedMessages = (message: JSONObject, payload: JSONObject) => {
  payload.msgs.forEach((msg: JSONObject, i: number) => {
    expect(message[`msg${i}`]).toStrictEqual(msg)
  })

  expect(message.msgs).toBeUndefined()
}

const expectRestUnchanged = (message: JSONObject, payload: JSONObject) => {
  const newNumKeys = Object.keys(message).length
  const oldNumKeys = Object.keys(payload).length
  const numMsgs = payload.msgs.length

  expect(newNumKeys).toBe(oldNumKeys + numMsgs - 1)

  for (const key of Object.keys(payload)) {
    if (key !== 'msgs') {
      expect(message[key]).toStrictEqual(payload[key])
    }
  }
}

const expectValidMessage = (payload: JSONObject) => {
  const original = JSON.parse(JSON.stringify(payload))
  const message = flattenPayload(payload).payload

  expectFlattenedMessages(message, original)
  expectRestUnchanged(message, original)
}

const expectFlattenToThrow = (payload: JSONObject) => {
  expect(() => flattenPayload(payload)).toThrow(TypeError)
}

describe('test eip712 payload flattening', () => {
  it('flattens a simple payload', () => {
    const payload = {
      foo: 'bar',
      msgs: [
        {
          bar: 'baz',
          count: 32,
        },
      ],
    }

    expectValidMessage(payload)
  })

  it('flattens a payload with multiple messages and nested objects', () => {
    const payload = {
      foo: 'bar',
      num: 64,
      msgs: [
        {
          bar: 'baz',
          count: 256,
        },
        {
          type: 'cosmos-sdk/MsgSend',
          value: {
            receiver: 'receiver.evmos',
            amount: {
              amount: '1024',
              denom: 'aevmos',
            },
          },
        },
      ],
    }

    expectValidMessage(payload)
  })
})

describe('test eip712 flattening errors', () => {
  it('throws on payload without msgs field', () => {
    const payload = { foo: 'bar' }
    expectFlattenToThrow(payload)
  })

  it('throws on payload with invalid msgs field', () => {
    const payload = { msgs: [2, 4, 8] }
    expectFlattenToThrow(payload)
  })

  it('throws on malformed payload', () => {
    const payload = {
      msgs: [
        {
          foo: 'bar',
        },
      ],
      msg0: {
        bar: 'baz',
      },
    }
    expectFlattenToThrow(payload)
  })
})
