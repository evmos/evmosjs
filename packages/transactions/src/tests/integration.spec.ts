import ProtoUtils from './utils/proto'
import EIP712Utils from './utils/eip712'
import MsgSendUtils from './utils/messages/testSend'

const testMessageClients = [MsgSendUtils]

describe('test transactions package integration', () => {
  it('handles Protobuf encoding', () => {
    testMessageClients.forEach((msgClient) => {
      const { tx, protoMsg } = msgClient.payload
      const protoTx = tx.signDirect

      const expAuthInfo = ProtoUtils.authInfo
      const expBody = ProtoUtils.createTxBody(protoMsg)
      const expSignDoc = ProtoUtils.createSignDoc(expBody)
      const expSignBytes = ProtoUtils.getSignBytes(expSignDoc)

      expect(protoTx.authInfo).toStrictEqual(expAuthInfo)
      expect(protoTx.body).toStrictEqual(expBody)
      expect(protoTx.signBytes).toStrictEqual(expSignBytes)

      // TODO: Verify generated payloads against the equivalent in Golang.
    })
  })

  it('handles EIP-712 encoding', () => {
    testMessageClients.forEach((msgClient) => {
      const { tx, eip712TypedData } = msgClient.payload
      const { types, message } = eip712TypedData

      const expTypes = EIP712Utils.generateTypes(types)
      const expMessage = EIP712Utils.generateMessage(message)
      const expEIP712TypedData = EIP712Utils.generateEIP712(
        expTypes,
        expMessage,
      )

      expect(tx.eipToSign).toStrictEqual(expEIP712TypedData)
    })
  })
})
