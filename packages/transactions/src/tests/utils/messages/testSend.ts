import { createMsgSend as protoMsgSend } from '@evmos/proto'
import { createMsgSend as eip712MsgSend, MSG_SEND_TYPES } from '@evmos/eip712'
import { createMessageSend } from '../../../messages/msgSend'
import { TestingClient } from '../utils'

// TODO: Define a common MsgTestingClient interface with the following methods
// once we can import Protobuf types
class MsgSendTestingClient extends TestingClient {
  get params() {
    const { denom } = this
    const destinationAddress = this.addr2
    const amount = this.amount1

    return {
      destinationAddress,
      amount,
      denom,
    }
  }

  get protoMsg() {
    const { context, params } = this

    return protoMsgSend(
      context.sender.accountAddress,
      params.destinationAddress,
      params.amount,
      params.denom,
    )
  }

  get eip712TypedData() {
    const { context, params } = this

    const types = MSG_SEND_TYPES
    const message = eip712MsgSend(
      params.amount,
      params.denom,
      context.sender.accountAddress,
      params.destinationAddress,
    )

    return {
      types,
      message,
    }
  }

  get payload() {
    const { context, params, protoMsg, eip712TypedData } = this

    const tx = createMessageSend(
      context.chain,
      context.sender,
      context.fee,
      context.memo,
      params,
    )

    return {
      protoMsg,
      eip712TypedData,
      tx,
    }
  }
}

const client = new MsgSendTestingClient()

export default client
