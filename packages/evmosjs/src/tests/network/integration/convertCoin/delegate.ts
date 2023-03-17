import { TxContext, createTxMsgDelegate } from '@evmos/transactions'
import { GetValidatorsResponse } from '@evmos/provider'
import { BigNumber } from '@ethersproject/bignumber'
import NetworkClient from '../../client'
import { denom } from '../../params'
import { fetchValidators } from '../../query'

class ConvertCoinDelegateClient {
  private previousValidators: GetValidatorsResponse | undefined

  private stakeAmount = '500000000000000000000000000'

  sendTx = async () => {
    this.previousValidators = await fetchValidators()

    const client = new NetworkClient(this.generator)
    return client.signDirectAndBroadcast()
  }

  private generator = (context: TxContext) => {
    const validatorAddress = this.getValidatorAddress()
    const params = this.getParams(validatorAddress)

    return createTxMsgDelegate(context, params)
  }

  private getValidatorAddress = () => {
    const { previousValidators } = this
    if (!previousValidators) {
      throw new Error('must fetch validators before getting validator address')
    }

    return previousValidators.validators[0].operator_address
  }

  private getParams = (validatorAddress: string) => {
    const amount = this.stakeAmount

    return {
      validatorAddress,
      amount,
      denom,
    }
  }

  verifyStateChange = async () => {
    const response = await fetchValidators()
    expect(this.stateIncludesDelegation(response)).toBe(true)
  }

  private stateIncludesDelegation = (response: GetValidatorsResponse) => {
    const delegation = BigNumber.from(response.validators[0].tokens)
    const target = BigNumber.from(this.stakeAmount)

    return delegation.gte(target)
  }
}

export default ConvertCoinDelegateClient
