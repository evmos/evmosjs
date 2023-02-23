import { MessageType, JsonWriteOptions } from '@bufbuild/protobuf'

import { MsgSend } from '../cosmos/bank/tx'
import { PubKey } from '../ethermint/crypto/keys'
import { GenericAuthorization } from '../cosmos/authz/authz'
import { MsgVote } from '../cosmos/gov/tx'
import { PubKey as ED25519PubKey } from '../cosmos/crypto/ed25519/keys'

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
    const msgs = [MsgSend, PubKey, GenericAuthorization, MsgVote, ED25519PubKey]

    return parseType(msgs, typeName)
  },
}

export const JSONOptions: JsonWriteOptions = {
  emitDefaultValues: true,
  enumAsInteger: true,
  useProtoFieldName: true,
  typeRegistry: registry,
}
