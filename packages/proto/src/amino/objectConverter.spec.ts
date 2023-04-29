import {
  convertSnakeKeysToCamel,
  snakeToCamelCase,
  convertProtoToDefaultAminoJSON,
  convertAminoJSONToProtoValue,
  createAminoConverter,
} from './objectConverter'
import { createMsgSend } from '../messages/bank'
import { MsgSend } from '../proto/cosmos/bank/tx'
import { from, to, denom, amount } from '../proto/tests/utils'

describe('test converting protobuf to/from amino JSON', () => {
  it('correctly converts protobuf to/from amino', () => {
    const protoMsgSend = createMsgSend(from, to, amount, denom).message
    const protoMsgSendJSON = protoMsgSend.toJson()
    const aminoMsgSend = convertProtoToDefaultAminoJSON(
      protoMsgSendJSON,
      MsgSend,
    )

    expect(aminoMsgSend).toStrictEqual({
      from_address: from,
      to_address: to,
      amount: [
        {
          amount,
          denom,
        },
      ],
    })

    const reconstructedProtoMsg = convertAminoJSONToProtoValue(
      aminoMsgSend,
      MsgSend,
    )
    expect(reconstructedProtoMsg).toStrictEqual(protoMsgSendJSON)
  })

  it('correctly creates default amino converters', () => {
    const protoMsgSend = createMsgSend(from, to, amount, denom).message
    const protoMsgSendJSON = protoMsgSend.toJson()
    const aminoMsgSend = convertProtoToDefaultAminoJSON(
      protoMsgSendJSON,
      MsgSend,
    )

    const expAminoType = 'cosmos-sdk/MsgSend'
    const aminoConverter = createAminoConverter(MsgSend, expAminoType)

    const protoMsgUrl = `/${new MsgSend().getType().typeName}`
    const aminoConverterKeys = Object.keys(aminoConverter)

    expect(aminoConverterKeys).toStrictEqual([protoMsgUrl])

    const { aminoType, toAmino, fromAmino } = aminoConverter[protoMsgUrl]

    expect(aminoType).toStrictEqual(expAminoType)
    expect(toAmino(protoMsgSend)).toStrictEqual(aminoMsgSend)
    expect(fromAmino(aminoMsgSend)).toStrictEqual(protoMsgSendJSON)
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
