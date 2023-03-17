import { TxContext, createTxMsgConvertCoin } from '@evmos/transactions'
import { BalanceByDenomResponse, Coin } from '@evmos/provider'
import { BigNumber } from '@ethersproject/bignumber'
import { JsonRpcProvider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'
import IntegrationClientBase from '../types'
import { ibcDenom, senderAddress, senderHex, jsonRPCUrl } from '../../params'
import { fetchBalanceByDenom, fetchERC20ContractAddress } from '../../query'

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
    await this.verifyIBCBalanceStateChange()
    await this.verifyERC20StateChange()
  }

  private verifyIBCBalanceStateChange = async () => {
    const { previousBalanceResponse } = this
    if (!previousBalanceResponse) {
      throw new Error(
        'must fetch previous ibc balance before checking state change',
      )
    }

    const balanceResponse = await fetchBalanceByDenom(senderAddress, ibcDenom)
    this.verifyIBCBalanceDecreased(
      previousBalanceResponse.balance,
      balanceResponse.balance,
    )
  }

  private verifyIBCBalanceDecreased = (previous: Coin, current: Coin) => {
    const previousBalance = BigNumber.from(previous.amount)
    const currentBalance = BigNumber.from(current.amount)
    const diff = BigNumber.from(this.transferAmount)

    expect(currentBalance.toString()).toStrictEqual(
      previousBalance.sub(diff).toString(),
    )
  }

  private verifyERC20StateChange = async () => {
    const contractAddress = await this.fetchContractAddress()
    const balance = await this.fetchContractBalance(contractAddress)

    const expBalance = BigNumber.from(this.transferAmount)

    expect(balance.toString()).toBe(expBalance.toString())
  }

  private fetchContractAddress = async () => {
    const response = await fetchERC20ContractAddress()
    const tokenPairs = response.token_pairs
    const latestPair = tokenPairs[tokenPairs.length - 1]

    return latestPair.erc20_address
  }

  private fetchContractBalance = async (address: string) => {
    const provider = new JsonRpcProvider(jsonRPCUrl)
    const abi = ['function balanceOf(address owner) view returns (uint256)']

    const contract = new Contract(address, abi, provider)
    const balance = await contract.balanceOf(senderHex)

    return balance
  }
}

export default ConvertCoinConvertCoinClient
