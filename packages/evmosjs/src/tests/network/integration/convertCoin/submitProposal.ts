import { TxContext, createTxMsgSubmitProposal } from '@evmos/transactions'
import { createMsgRegisterCoin, Proto } from '@evmos/proto'
import { ProposalsResponse } from '@evmos/provider'
import IntegrationClientBase from '../types'
import { ibcDenom, denom } from '../../params'
import { fetchProposals } from '../../query'

class ConvertCoinSubmitProposalClient extends IntegrationClientBase {
  private previousProposals: ProposalsResponse | undefined

  sendTx = async () => {
    this.previousProposals = await fetchProposals()

    return this.networkClient.signDirectAndBroadcast(this.createPayload)
  }

  private createPayload = (context: TxContext) => {
    const params = this.getParams(context)
    return createTxMsgSubmitProposal(context, params)
  }

  private getParams = (context: TxContext) => {
    const token = 'token'
    const title = 'Test Token'
    // TODO: Find out why this must be 'Test token' and breaks on other values
    const tokenDescription = 'Test token'

    const ibcUnit = new Proto.Cosmos.Bank.Bank.DenomUnit({
      denom: ibcDenom,
      exponent: 0,
      aliases: ['ibctoken'],
    })

    const baseUnit = new Proto.Cosmos.Bank.Bank.DenomUnit({
      denom: token,
      exponent: 6,
    })

    const metadata = new Proto.Cosmos.Bank.Bank.Metadata({
      description: tokenDescription,
      denomUnits: [ibcUnit, baseUnit],
      base: ibcDenom,
      display: token,
      name: title,
      symbol: token,
    })

    const content = createMsgRegisterCoin(
      'Register Test - Convert Coin',
      'Description',
      [metadata],
    )

    const deposit = '100000000000'
    const proposer = context.sender.accountAddress

    return {
      content,
      denom,
      amount: deposit,
      proposer,
    }
  }

  verifyStateChange = async () => {
    const proposals = await fetchProposals()
    const { previousProposals } = this

    if (!previousProposals) {
      throw new Error('must fetch previous proposals before verifying state')
    }

    expect(proposals.proposals).toHaveLength(
      previousProposals.proposals.length + 1,
    )
  }
}

export default ConvertCoinSubmitProposalClient
