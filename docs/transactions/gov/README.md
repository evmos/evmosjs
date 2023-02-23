# Governance

This package creates transaction payloads with messages from the [Gov Module](https://docs.cosmos.network/main/modules/gov).

Find the `TxContext` and `TxPayload` types in the Transaction Docs.

### MsgDeposit

```ts
export interface MsgDepositParams {
  proposalId: number
  deposit: {
    denom: string
    amount: string
  }
}

/**
 * Creates a transaction for a MsgDeposit object.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK's
 * {@link https://docs.cosmos.network/main/modules/gov#deposit-2 | MsgDeposit}
 *
 * @param context Transaction Context
 * @param params MsgDeposit Params
 * @returns Transaction with the MsgDeposit payload
 *
 */
export const createTxMsgDeposit: (
  context: TxContext,
  params: MsgDepositParams,
): TxPayload
```

### MsgSubmitProposal

Use `@evmos/proto` to generate a Protobuf message type to pass in for the content field.

```ts
export interface MsgSubmitProposalParams {
  content: any
  denom: string
  amount: string
  proposer: string
}

/**
 * Creates a transaction for a MsgSubmitProposal object.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK's
 * {@link https://docs.cosmos.network/main/modules/gov#proposal-submission-1 | MsgSubmitProposal}
 *
 * @param context Transaction Context
 * @param params MsgSubmitProposal Params
 * @returns Transaction with the MsgSubmitProposal payload
 *
 */

export const createTxMsgSubmitProposal: (
  context: TxContext,
  params: MsgSubmitProposalParams,
): TxPayload
```

### MsgVote

```ts
export interface MsgVoteParams {
  proposalId: number
  option: number
}

/**
 * Creates a transaction for a MsgVote object.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK's
 * {@link https://docs.cosmos.network/main/modules/gov#vote-1 | MsgVote}
 *
 * @param context - Transaction Context
 * @param params - MsgVote Params
 * @returns Transaction with the MsgVote payload
 *
 */
export const createTxMsgVote: (
  context: TxContext,
  params: MsgVoteParams,
): TxPayload
```
