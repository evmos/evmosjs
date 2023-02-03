import { MessageType, JsonWriteOptions } from '@bufbuild/protobuf'

import { MsgSend } from '../src/types/cosmos/bank/tx'
import { PubKey } from '../src/types/ethermint/crypto/keys'

// Export common types useful for testing.

const parseType = (msgs: MessageType[], typeName: string) => {
  for (const m of msgs) {
    if (`/${m.typeName}` === typeName) {
      return m
    }
  }
  return undefined
}

const registry = {
  findMessage: (typeName: string): MessageType | undefined => {
    // Add message types to this array as needed
    const msgs = [MsgSend, PubKey]

    return parseType(msgs, typeName)
  },
}

export const JSONOptions: JsonWriteOptions = {
  emitDefaultValues: true,
  enumAsInteger: true,
  useProtoFieldName: true,
  typeRegistry: registry,
}
