import { TxContext, createTxMsgConvertCoin } from '@evmos/transactions'
import { BalanceByDenomResponse, Coin } from '@evmos/provider'
import { BigNumber } from '@ethersproject/bignumber'
import IntegrationClientBase from '../types'
import { ibcDenom, senderAddress, senderHex } from '../../params'
import { fetchBalanceByDenom } from '../../query'

class ConvertCoinConvertCoinClient extends IntegrationClientBase {
  private previousBalanceResponse: BalanceByDenomResponse | undefined

  private transferAmount: string = '1000'

  sendTx = async () => {
    this.previousBalanceResponse = await fetchBalanceByDenom(
      senderAddress,
      ibcDenom,
    )

    return this.networkClient.signDirectAndBroadcast(this.createPayload)
  }

  private createPayload = (context: TxContext) => {
    const params = this.getParams()
    return createTxMsgConvertCoin(context, params)
  }

  private getParams = () => {
    const amount = this.transferAmount
    const denom = ibcDenom
    const receiverHex = senderHex
    const senderBech32 = senderAddress

    return {
      denom,
      amount,
      receiverHex,
      senderBech32,
    }
  }

  verifyStateChange = async () => {
    const { previousBalanceResponse } = this
    if (!previousBalanceResponse) {
      throw new Error(
        'must fetch previous ibc balance before checking state change',
      )
    }

    const balanceResponse = await fetchBalanceByDenom(senderAddress, ibcDenom)
    this.verifyBalanceDecreased(
      previousBalanceResponse.balance,
      balanceResponse.balance,
    )
  }

  private verifyBalanceDecreased = (previous: Coin, current: Coin) => {
    const previousBalance = BigNumber.from(previous.amount)
    const currentBalance = BigNumber.from(current.amount)
    const diff = BigNumber.from(this.transferAmount)

    expect(currentBalance.toString()).toStrictEqual(
      previousBalance.sub(diff).toString(),
    )
  }
}

export default ConvertCoinConvertCoinClient
