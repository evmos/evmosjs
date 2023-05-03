import {
  convertSnakeKeysToCamel,
  snakeToCamelCase,
  convertProtoValueToDefaultAmino,
  convertAminoToProtoValue,
  convertProtoMessageToObject,
  createAminoConverter,
} from './objectConverter'
import { createMsgSend } from '../messages/bank'
import { MsgSend } from '../proto/cosmos/bank/tx'
import { from, to, denom, amount } from '../proto/tests/utils'

// Creates a MsgSend value in both Protobuf and Amino JSON encodings.
const createMsgSendEncodings = () => {
  const wrappedProtoMsg = createMsgSend(from, to, amount, denom)

  const protoValue = convertProtoMessageToObject(wrappedProtoMsg.message).value
  const aminoValue = convertProtoValueToDefaultAmino(protoValue, MsgSend)

  return { protoValue, aminoValue }
}

describe('test converting protobuf to/from amino JSON', () => {
  it('converts protobuf messages to json representations', () => {
    const { protoValue, aminoValue } = createMsgSendEncodings()

    expect(protoValue).toStrictEqual({
      fromAddress: from,
      toAddress: to,
      amount: [
        {
          amount,
          denom,
        },
      ],
    })

    expect(aminoValue).toStrictEqual({
      from_address: from,
      to_address: to,
      amount: [
        {
          amount,
          denom,
        },
      ],
    })
  })

  it('converts protobuf to/from amino using converter functions', () => {
    const { protoValue, aminoValue } = createMsgSendEncodings()

    const protoValueFromAmino = convertAminoToProtoValue(aminoValue, MsgSend)
    expect(protoValueFromAmino).toStrictEqual(protoValue)
  })

  it('creates default amino converters that can convert between proto and amino', () => {
    const { protoValue, aminoValue } = createMsgSendEncodings()

    const expAminoType = 'cosmos-sdk/MsgSend'
    const aminoConverter = createAminoConverter(MsgSend, expAminoType)

    const protoMsgUrl = `/${new MsgSend().getType().typeName}`

    const aminoConverterKeys = Object.keys(aminoConverter)
    expect(aminoConverterKeys).toStrictEqual([protoMsgUrl])

    const { aminoType, toAmino, fromAmino } = aminoConverter[protoMsgUrl]

    expect(aminoType).toStrictEqual(expAminoType)
    expect(toAmino(protoValue)).toStrictEqual(aminoValue)
    expect(fromAmino(aminoValue)).toStrictEqual(protoValue)
  })
})

describe('test converting snake_case to camelCase', () => {
  it('leaves camelCase strings unchanged', () => {
    expect(snakeToCamelCase('lowerstring')).toBe('lowerstring')
    expect(snakeToCamelCase('camelString')).toBe('camelString')
    expect(snakeToCamelCase('multipleCamelString')).toBe('multipleCamelString')
  })

  it('converts snake_cased strings', () => {
    expect(snakeToCamelCase('snake_string')).toBe('snakeString')
    expect(snakeToCamelCase('multiple_snake_string')).toBe(
      'multipleSnakeString',
    )
    expect(snakeToCamelCase('malformed__string')).toBe('malformed_String')
  })

  it('converts simple objects', () => {
    const numValue = 2
    const strValue = 'string'

    const json = {
      num_value: numValue,
      str_value: strValue,
    }

    expect(convertSnakeKeysToCamel(json)).toStrictEqual({
      numValue,
      strValue,
    })
  })

  it('converts complex objects', () => {
    const numValue = 8
    const strValue = 'string'
    const nestedValue = 'nested value'
    const arrayStrValue = 'array string value'
    const objInnerValue = 32

    const json = {
      num_value: numValue,
      str_value: strValue,
      arr_value: [{ nested_in_arr: nestedValue }, arrayStrValue],
      obj_value: {
        nested_obj: {
          inner_val: objInnerValue,
        },
      },
    }

    expect(convertSnakeKeysToCamel(json)).toStrictEqual({
      numValue,
      strValue,
      arrValue: [
        {
          nestedInArr: nestedValue,
        },
        arrayStrValue,
      ],
      objValue: {
        nestedObj: {
          innerVal: objInnerValue,
        },
      },
    })
  })
})
