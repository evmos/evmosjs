import { createMsgConvertERC20 as protoMsgConvertERC20 } from '@evmos/proto'
import {
  createMsgConvertERC20 as eip712MsgConvertERC20,
  MSG_CONVERT_ERC20_TYPES,
} from '@evmos/eip712'
import { createTxMsgConvertERC20 } from '@evmos/transactions'
import { TestingClient } from '../utils'

class MsgConvertERC20TestingClient extends TestingClient {
  get params() {
    const contractAddress = this.addrHex1
    const amount = this.amount1
    const senderHex = this.addrHex2
    const receiverBech32 = this.addr2

    return {
      contractAddress,
      amount,
      receiverBech32,
      senderHex,
    }
  }

  get protoMsg() {
    const { params } = this

    return protoMsgConvertERC20(
      params.contractAddress,
      params.amount,
      params.receiverBech32,
      params.senderHex,
    )
  }

  get eip712TypedData() {
    const { params } = this

    const types = MSG_CONVERT_ERC20_TYPES
    const message = eip712MsgConvertERC20(
      params.contractAddress,
      params.amount,
      params.receiverBech32,
      params.senderHex,
    )

    return {
      types,
      message,
    }
  }

  get payload() {
    const { context, params, protoMsg, eip712TypedData } = this

    const tx = createTxMsgConvertERC20(context, params)

    return {
      protoMsg,
      eip712TypedData,
      tx,
    }
  }
}

const client = new MsgConvertERC20TestingClient()

export default client
