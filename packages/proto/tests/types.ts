import { MessageType, JsonWriteOptions } from '@bufbuild/protobuf'
import { PubKey } from '@buf/evmos_ethermint.bufbuild_es/ethermint/crypto/v1/ethsecp256k1/keys_pb'
import { MsgSend } from '@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/bank/v1beta1/tx_pb.js'

const registry = {
  findMessage: (typeName: string): MessageType | undefined => {
    if (typeName === '/ethermint.crypto.v1.ethsecp256k1.PubKey') {
      return PubKey
    }
    if (typeName === '/cosmos.bank.v1beta1.MsgSend') {
      return MsgSend
    }
    return undefined
  },
}

export const JSONOptions: JsonWriteOptions = {
  emitDefaultValues: true,
  enumAsInteger: true,
  useProtoFieldName: true,
  typeRegistry: registry,
}
