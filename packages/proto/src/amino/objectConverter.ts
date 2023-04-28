import { JsonWriteOptions, Message, AnyMessage } from '@bufbuild/protobuf'

export const AminoJSONOptions: JsonWriteOptions = {
  emitDefaultValues: true,
  enumAsInteger: true,
  useProtoFieldName: true,
}

// Converts a Protobuf message into a default Amino-formatted JSON
// value. While this may exactly match the Amino value for some
// messages, others will require custom logic.
export function convertProtoToDefaultJSON<T extends Message<T> = AnyMessage>(
  msg: Message<T>,
) {
  return msg.toJson(AminoJSONOptions)
}

export const snakeToCamelCase = (str: string) =>
  str.replace(/_[a-zA-Z]/g, (substr) => substr[1].toUpperCase())

// Converts snake_case keys in an Amino JSON object to
// an object with camelCase keys that can be passed to
// a Protobuf message initializer.
export function convertSnakeKeysToCamel(item: any) {
  if (typeof item !== 'object') {
    return item
  }

  if (Array.isArray(item)) {
    const arrayWithCamel: any[] = []
    item.forEach((el) => {
      arrayWithCamel.push(convertSnakeKeysToCamel(el))
    })
    return arrayWithCamel
  }

  const objectWithCamel: any = {}
  Object.keys(item).forEach((key) => {
    objectWithCamel[snakeToCamelCase(key)] = convertSnakeKeysToCamel(item[key])
  })

  return objectWithCamel
}

// Converts an Amino JSON object into a fully-formed instance of the
// provided Protobuf type.
export function convertAminoJSONToProto<T extends Message<T> = AnyMessage>(
  aminoJSON: any,
  ProtoMessage: typeof Message<T>,
) {
  const camelCaseJSON = convertSnakeKeysToCamel(aminoJSON)
  const protoMessageObj = new ProtoMessage()
  return protoMessageObj.fromJson(camelCaseJSON)
}

export function createAminoConverter<T extends Message<T> = AnyMessage>(
  ProtoMessage: typeof Message<T>,
  aminoType: string,
  toAmino: typeof convertProtoToDefaultJSON = convertProtoToDefaultJSON,
  fromAmino: typeof convertAminoJSONToProto = convertAminoJSONToProto,
) {
  const { typeName } = new ProtoMessage().getType()
  const protoTypeUrl = `/${typeName}`

  function convertFromAmino(aminoJSON: any) {
    return fromAmino(aminoJSON, ProtoMessage)
  }

  return {
    [protoTypeUrl]: {
      aminoType,
      toAmino,
      fromAmino: convertFromAmino,
    },
  }
}
