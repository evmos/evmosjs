import { createMsgSend as protoMsgSend } from '@evmos/proto'
import { createMessageSend } from '../messages/msgSend'
import { TestingClient } from './utils'

class MsgTestingClient extends TestingClient {
  get payloadMsgSend() {
    const { context, denom } = this
    const destinationAddress = this.addr2
    const amount = this.amount1

    const params = {
      destinationAddress,
      amount,
      denom,
    }

    const msg = protoMsgSend(
      context.sender.accountAddress,
      params.destinationAddress,
      params.amount,
      params.denom,
    )

    const tx = createMessageSend(
      context.chain,
      context.sender,
      context.fee,
      context.memo,
      params,
    )

    return {
      msg,
      tx,
    }
  }
}

const client = new MsgTestingClient()

export default client
