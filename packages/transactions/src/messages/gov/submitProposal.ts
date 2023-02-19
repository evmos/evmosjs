import {
  createMsgSubmitProposal as protoMsgSubmitProposal,
  createAnyMessage,
} from '@evmos/proto'
import {
  generateTypes,
  createMsgSubmitProposal,
  MSG_SUBMIT_TYPES,
} from '@evmos/eip712'
import { createTransactionPayload, TxContext } from '../base'

export interface MsgSubmitProposalParams {
  content: any // TODO: Use Protobuf Generic Type
  denom: string
  amount: string
  proposer: string
}

const createEIP712MsgSubmitProposal = (params: MsgSubmitProposalParams) => {
  const types = generateTypes(MSG_SUBMIT_TYPES)

  const contentAsJSON = params.content.message.toObject() // TODO: replace with Proto's toJSON()

  const message = createMsgSubmitProposal(
    contentAsJSON,
    params.denom,
    params.amount,
    params.proposer,
  )

  return {
    types,
    message,
  }
}

const createCosmosMsgSubmitProposal = (params: MsgSubmitProposalParams) => {
  const contentAsAny = createAnyMessage(params.content)

  return protoMsgSubmitProposal(
    contentAsAny,
    params.denom,
    params.amount,
    params.proposer,
  )
}

/**
 * Creates a transaction for a MsgSubmitProposal object.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK's
 * {@link https://docs.cosmos.network/v0.47/modules/gov#proposal-submission-1 | MsgSubmitProposal}
 *
 * @param context Transaction Context
 * @param params MsgSubmitProposal Params
 * @returns Transaction with the MsgSubmitProposal payload
 *
 */
export const createTxMsgSubmitProposal = (
  context: TxContext,
  params: MsgSubmitProposalParams,
) => {
  const typedData = createEIP712MsgSubmitProposal(params)
  const cosmosMsg = createCosmosMsgSubmitProposal(params)

  return createTransactionPayload(context, typedData, cosmosMsg)
}
