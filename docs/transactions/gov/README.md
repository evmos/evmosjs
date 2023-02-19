# Gov

This package creates transaction payloads with messages from the [Gov Module](https://docs.cosmos.network/v0.47/modules/gov).

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
 * {@link https://docs.cosmos.network/v0.47/modules/gov#deposit-2 | MsgDeposit}
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
