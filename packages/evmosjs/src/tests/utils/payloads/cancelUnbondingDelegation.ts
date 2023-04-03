import {
  TxContext,
  createTxMsgCancelUnbondingDelegation,
} from '@evmos/transactions'
import { TestingClient } from '../utils'

class MsgCancelUnbondingTestingClient extends TestingClient {
  private params = (context: TxContext) => {
    const delegatorAddress = context.sender.accountAddress
    const validatorAddress = this.addrVal1
    const amount = this.amount1
    const { denom } = this
    const creationHeight = '1000'

    return {
      delegatorAddress,
      validatorAddress,
      amount,
      denom,
      creationHeight,
    }
  }

  generateTx = (context: TxContext) => {
    const params = this.params(context)
    return createTxMsgCancelUnbondingDelegation(context, params)
  }
}

const client = new MsgCancelUnbondingTestingClient()

export default client
