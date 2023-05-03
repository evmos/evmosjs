import eip712Types from './createTypes'
import { createBaseTypes } from './createTypes/parsePayload'
import { MAX_DUPL_TYPEDEFS } from './createTypes/parseMessage'
import { payloadMsgFieldForIndex } from './flattenPayload'
import { JSONObject } from './types'
import TestUtils from '../tests/utils'

const { msgSend } = TestUtils

// TODO: Test code coverage and cover missing lines

const createEIP712Types = (msgs: JSONObject[]) => {
  const numMessages = msgs.length
  const payload: JSONObject = {}

  for (let i = 0; i < msgs.length; i++) {
    const key = payloadMsgFieldForIndex(i)
    payload[key] = msgs[i]
  }

  const messageParams = {
    payload,
    numMessages,
  }

  return eip712Types(messageParams)
}

const createExpEIP712Types = (
  expTxTypes: JSONObject[],
  expMsgTypes: JSONObject,
) => {
  let expTypes = createBaseTypes() as JSONObject

  expTypes.Tx.push(...expTxTypes)
  expTypes = { ...expTypes, ...expMsgTypes }

  return expTypes
}

const compareTypesAgainstExpected = (
  types: JSONObject,
  expTxTypes: JSONObject[],
  expMsgTypes: JSONObject,
) => {
  const expTypes = createExpEIP712Types(expTxTypes, expMsgTypes)

  expect(types).toStrictEqual(expTypes)
}

const expectCreateTypesToThrow = (msgs: JSONObject[]) => {
  expect(() => createEIP712Types(msgs)).toThrow(Error)
}

describe('test eip-712 type generation from payload', () => {
  it('generates types for a single-message payload', () => {
    const msgs = [msgSend]
    const types = createEIP712Types(msgs)

    console.log(types)

    const expTxTypes = [
      {
        name: 'msg0',
        type: 'TypeMsgSend0',
      },
    ]

    const expMsgTypes = {
      TypeMsgSend0: [
        {
          type: 'TypeValue0',
          name: 'value',
        },
        {
          type: 'string',
          name: 'type',
        },
      ],
      TypeValue0: [
        {
          type: 'string',
          name: 'to_address',
        },
        {
          type: 'string',
          name: 'from_address',
        },
        {
          type: 'TypeValueAmount0',
          name: 'amount',
        },
      ],
      TypeValueAmount0: [
        {
          type: 'string',
          name: 'denom',
        },
        {
          type: 'string',
          name: 'amount',
        },
      ],
    }

    compareTypesAgainstExpected(types, expTxTypes, expMsgTypes)
  })

  it('handles identical duplicate types', () => {
    const msgSendJSON = msgSend
    const types = createEIP712Types([msgSendJSON, msgSendJSON])

    const expTxTypes = [
      {
        name: 'msg0',
        type: 'TypeMsgSend0',
      },
      {
        name: 'msg1',
        type: 'TypeMsgSend0',
      },
    ]

    const expMsgTypes = {
      TypeMsgSend0: [
        {
          type: 'TypeValue0',
          name: 'value',
        },
        {
          type: 'string',
          name: 'type',
        },
      ],
      TypeValue0: [
        {
          type: 'string',
          name: 'to_address',
        },
        {
          type: 'string',
          name: 'from_address',
        },
        {
          type: 'TypeValueAmount0',
          name: 'amount',
        },
      ],
      TypeValueAmount0: [
        {
          type: 'string',
          name: 'denom',
        },
        {
          type: 'string',
          name: 'amount',
        },
      ],
    }

    compareTypesAgainstExpected(types, expTxTypes, expMsgTypes)
  })

  it('handles non-identical duplicate types', () => {
    const msgJSON = msgSend

    // Change amount to be a numeric type instead of a string.
    const modifiedMsgJSON = JSON.parse(JSON.stringify(msgJSON))
    modifiedMsgJSON.value.amount.amount = 100

    const types = createEIP712Types([msgJSON, modifiedMsgJSON])

    const expTxTypes = [
      {
        name: 'msg0',
        type: 'TypeMsgSend0',
      },
      {
        name: 'msg1',
        type: 'TypeMsgSend1',
      },
    ]

    const expMsgTypes = {
      TypeMsgSend0: [
        {
          type: 'TypeValue0',
          name: 'value',
        },
        {
          type: 'string',
          name: 'type',
        },
      ],
      TypeValue0: [
        {
          type: 'string',
          name: 'to_address',
        },
        {
          type: 'string',
          name: 'from_address',
        },
        {
          type: 'TypeValueAmount0',
          name: 'amount',
        },
      ],
      TypeValueAmount0: [
        {
          type: 'string',
          name: 'denom',
        },
        {
          type: 'string',
          name: 'amount',
        },
      ],
      TypeMsgSend1: [
        {
          type: 'TypeValue1',
          name: 'value',
        },
        {
          type: 'string',
          name: 'type',
        },
      ],
      TypeValue1: [
        {
          type: 'string',
          name: 'to_address',
        },
        {
          type: 'string',
          name: 'from_address',
        },
        {
          type: 'TypeValueAmount1',
          name: 'amount',
        },
      ],
      TypeValueAmount1: [
        {
          type: 'string',
          name: 'denom',
        },
        {
          type: 'int64',
          name: 'amount',
        },
      ],
    }

    compareTypesAgainstExpected(types, expTxTypes, expMsgTypes)
  })

  it('handles all eip-712 variable types', () => {
    const msgJSON = {
      type: 'TestMsg',
      value: {
        int64Array: [0],
        emptyArray: [],
        number: 0,
        boolean: false,
        object: {
          string: '',
        },
      },
    }

    const types = createEIP712Types([msgJSON])

    const expTxTypes = [
      {
        name: 'msg0',
        type: 'TypeTestMsg0',
      },
    ]

    const expMsgTypes = {
      TypeTestMsg0: [
        {
          type: 'TypeValue0',
          name: 'value',
        },
        {
          type: 'string',
          name: 'type',
        },
      ],
      TypeValue0: [
        {
          type: 'TypeValueObject0',
          name: 'object',
        },
        {
          type: 'int64',
          name: 'number',
        },
        {
          type: 'int64[]',
          name: 'int64Array',
        },
        {
          type: 'string[]',
          name: 'emptyArray',
        },
        {
          type: 'bool',
          name: 'boolean',
        },
      ],
      TypeValueObject0: [
        {
          type: 'string',
          name: 'string',
        },
      ],
    }

    compareTypesAgainstExpected(types, expTxTypes, expMsgTypes)
  })
})

describe('test eip-712 types error handling', () => {
  it('errors on malformed payload', () => {
    const emptyPayload = {}
    expectCreateTypesToThrow([emptyPayload])

    const payloadMissingMsgs = {
      key: 'value',
    }
    expectCreateTypesToThrow([payloadMissingMsgs])

    const payloadMsgMissingType = {
      msgs: {
        key: 'value',
      },
    }
    expectCreateTypesToThrow([payloadMsgMissingType])
  })

  it('errors on reaching the max number of duplicates', () => {
    const msgSendJSON = msgSend
    const msgJSONs: JSONObject[] = Array(MAX_DUPL_TYPEDEFS)

    for (let i = 0; i < MAX_DUPL_TYPEDEFS + 1; i++) {
      const uniqueJSON = JSON.parse(JSON.stringify(msgSendJSON))
      uniqueJSON[`${i}`] = ''

      msgJSONs[i] = uniqueJSON
    }

    expectCreateTypesToThrow(msgJSONs)
  })

  it('errors on multi-dimensional arrays', () => {
    const msgJSON = msgSend as JSONObject
    msgJSON['2DArray'] = [[0]]

    expectCreateTypesToThrow([msgJSON])
  })
})
