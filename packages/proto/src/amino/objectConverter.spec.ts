import {
  convertSnakeKeysToCamel,
  snakeToCamelCase,
  convertProtoToDefaultJSON,
  convertAminoJSONToProto,
} from './objectConverter'
import { createMsgSend } from '../messages/bank'
import { MsgSend } from '../proto/cosmos/bank/tx'
import { from, to, denom } from '../proto/tests/utils'

describe('test converting protobuf to/from amino JSON', () => {
  it('correctly converts protobuf to/from amino', () => {
    const msgAmount = '100000'
    const protoMsgSend = createMsgSend(from, to, msgAmount, denom).message

    const aminoMsgSend = convertProtoToDefaultJSON(protoMsgSend)
    expect(aminoMsgSend).toStrictEqual({
      from_address: from,
      to_address: to,
      amount: [
        {
          amount: msgAmount,
          denom,
        },
      ],
    })

    const reconstructedProtoMsg = convertAminoJSONToProto(aminoMsgSend, MsgSend)
    expect(protoMsgSend).toStrictEqual(reconstructedProtoMsg)
  })
})

describe('test converting snake_case to camelCase', () => {
  it('leaves camelCase strings unchanged', () => {
    expect(snakeToCamelCase('lowerstring')).toBe('lowerstring')
    expect(snakeToCamelCase('camelString')).toBe('camelString')
    expect(snakeToCamelCase('multipleCamelString')).toBe('multipleCamelString')
  })

  it('correctly converts snake_cased strings', () => {
    expect(snakeToCamelCase('snake_string')).toBe('snakeString')
    expect(snakeToCamelCase('multiple_snake_string')).toBe(
      'multipleSnakeString',
    )
    expect(snakeToCamelCase('malformed__string')).toBe('malformed_String')
  })

  it('correctly converts simple objects', () => {
    const json = {
      num_value: 2,
      str_value: 'string',
    }

    expect(convertSnakeKeysToCamel(json)).toStrictEqual({
      numValue: 2,
      strValue: 'string',
    })
  })

  it('correctly converts complex objects', () => {
    const json = {
      num_value: 8,
      str_value: 'string',
      arr_value: [{ nested_in_arr: 'nested value' }, 'second array value'],
      obj_value: {
        nested_obj: {
          inner_val: 32,
        },
      },
    }

    expect(convertSnakeKeysToCamel(json)).toStrictEqual({
      numValue: 8,
      strValue: 'string',
      arrValue: [
        {
          nestedInArr: 'nested value',
        },
        'second array value',
      ],
      objValue: {
        nestedObj: {
          innerVal: 32,
        },
      },
    })
  })
})
