import { createIBCMsgTransfer as protoIBCMsgTransfer } from '@evmos/proto'
import {
  createIBCMsgTransfer as eip712IBCMsgTransfer,
  CREATE_IBC_MSG_TRANSFER_TYPES,
} from '@evmos/eip712'
import { createTxIBCMsgTransfer, TxContext } from '@evmos/transactions'
import { TestingClient } from '../utils'

class IBCMsgTransferTestingClient extends TestingClient {
  get params() {
    const { denom } = this
    const sourcePort = 'transfer'
    const sourceChannel = 'channel-0'
    const amount = this.amount1
    const receiver = this.addr2
    const revisionNumber = 1000
    const revisionHeight = 84000
    const timeoutTimestamp = '900000000'
    const memo = 'ibc memo'

    return {
      sourcePort,
      sourceChannel,
      amount,
      denom,
      receiver,
      revisionNumber,
      revisionHeight,
      timeoutTimestamp,
      memo,
    }
  }

  get protoMsg() {
    const { context, params } = this

    return protoIBCMsgTransfer(
      params.sourcePort,
      params.sourceChannel,
      params.amount,
      params.denom,
      context.sender.accountAddress,
      params.receiver,
      params.revisionNumber,
      params.revisionHeight,
      params.timeoutTimestamp,
      params.memo,
    )
  }

  get eip712TypedData() {
    const { context, params } = this

    const types = CREATE_IBC_MSG_TRANSFER_TYPES(params.memo)
    const message = eip712IBCMsgTransfer(
      params.receiver,
      context.sender.accountAddress,
      params.sourceChannel,
      params.sourcePort,
      params.revisionHeight,
      params.revisionNumber,
      params.timeoutTimestamp,
      params.amount,
      params.denom,
      params.memo,
    )

    return {
      types,
      message,
    }
  }

  get payload() {
    const { context, params, protoMsg, eip712TypedData } = this

    const tx = createTxIBCMsgTransfer(context, params)

    return {
      protoMsg,
      eip712TypedData,
      tx,
    }
  }

  generateTxWithoutMemo = (context: TxContext) => {
    const txParams = JSON.parse(JSON.stringify(this.params))
    delete txParams.memo
    return createTxIBCMsgTransfer(context, txParams)
  }

  generateTx = (context: TxContext) => {
    const { params } = this
    return createTxIBCMsgTransfer(context, params)
  }
}

const client = new IBCMsgTransferTestingClient()

export default client
