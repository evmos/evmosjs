import { JsonWriteOptions, Message, AnyMessage } from '@bufbuild/protobuf'

/**
 * Set of utilities to convert between complex Protobuf Messages, Protobuf-
 * formatted JSON objects, and Amino-formatted JSON objects.
 */

export const AminoJSONOptions: JsonWriteOptions = {
  emitDefaultValues: true,
  enumAsInteger: true,
  useProtoFieldName: true,
}

// Converts a Protobuf message into a default Protobuf-formatted
// plain Javascript object.
export function convertProtoMessageToObject<T extends Message<T> = AnyMessage>(
  msg: Message<T>,
) {
  return {
    typeUrl: `/${msg.getType().typeName}`,
    value: msg.toJson(),
  }
}

export function convertProtoValueToMessage<T extends Message<T> = AnyMessage>(
  protoJSON: any,
  ProtoMessage: typeof Message<T>,
) {
  return new ProtoMessage().fromJson(protoJSON)
}

// Converts a Protobuf message into a default Amino-formatted JSON
// value. While this may exactly match the Amino value for some
// messages, others will require custom logic.
export function convertProtoToDefaultAminoJSON<
  T extends Message<T> = AnyMessage,
>(protoJSON: any, ProtoMessage: typeof Message<T>) {
  const protoMessage = convertProtoValueToMessage(protoJSON, ProtoMessage)
  return protoMessage.toJson(AminoJSONOptions)
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

// Converts an Amino JSON object into a Protobuf JSON object value.
export function convertAminoJSONToProtoValue<T extends Message<T> = AnyMessage>(
  aminoJSON: any,
  ProtoMessage: typeof Message<T>,
) {
  const protoJSON = convertSnakeKeysToCamel(aminoJSON)
  const protoMessage = convertProtoValueToMessage(protoJSON, ProtoMessage)
  return protoMessage.toJson()
}

export function createAminoConverter<T extends Message<T> = AnyMessage>(
  ProtoMessage: typeof Message<T>,
  aminoType: string,
  toAmino: typeof convertProtoToDefaultAminoJSON = convertProtoToDefaultAminoJSON,
  fromAmino: typeof convertAminoJSONToProtoValue = convertAminoJSONToProtoValue,
) {
  const { typeName } = new ProtoMessage().getType()
  const protoTypeUrl = `/${typeName}`

  function convertToAmino(protoJSON: any) {
    return toAmino(protoJSON, ProtoMessage)
  }

  function convertFromAmino(aminoJSON: any) {
    return fromAmino(aminoJSON, ProtoMessage)
  }

  return {
    [protoTypeUrl]: {
      aminoType,
      toAmino: convertToAmino,
      fromAmino: convertFromAmino,
    },
  }
}
