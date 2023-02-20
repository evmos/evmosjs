import ProtoUtils from './protoUtils'
import MsgUtils from './msgUtils'

describe('test transactions package integration', () => {
  it('handles Protobuf encoding', () => {
    const { tx, msg } = MsgUtils.payloadMsgSend
    const protoTx = tx.signDirect

    const expAuthInfo = ProtoUtils.authInfo
    const expBody = ProtoUtils.createTxBody(msg)
    const expSignDoc = ProtoUtils.createSignDoc(expBody)
    const expSignBytes = ProtoUtils.getSignBytes(expSignDoc)

    expect(protoTx.authInfo).toStrictEqual(expAuthInfo)
    expect(protoTx.body).toStrictEqual(expBody)
    expect(protoTx.signBytes).toStrictEqual(expSignBytes)

    // Verify generated payloads against the equivalent in Golang.
  })
})
