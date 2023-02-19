# IBC

This package creates transaction payloads with messages from the [IBC Module](https://github.com/cosmos/ibc-go/tree/main/docs).

Find the `TxContext` and `TxPayload` types in the Transaction Docs.

### MsgTransfer

```ts
export interface IBCMsgTransferParams {
  // Channel
  sourcePort: string
  sourceChannel: string
  // Token
  amount: string
  denom: string
  // Addresses
  receiver: string
  // Timeout
  revisionNumber: number
  revisionHeight: number
  timeoutTimestamp: string
}

/**
 * Creates a transaction for a `IBCMsgTransfer` object.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK
 * {@link https://github.com/cosmos/ibc-go/blob/main/docs/apps/transfer/messages.md | IBCMsgTransfer}
 *
 * @param context - Transaction Context
 * @param params - IBCMsgTransfer Params
 * @returns Transaction with the IBCMsgTransfer payload
 *
 */
export const createTxIBCMsgTransfer: (
  context: TxContext,
  params: IBCMsgTransferParams,
): TxPayload 
```
