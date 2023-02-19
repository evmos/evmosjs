# Staking

This package creates transaction payloads with messages from the [Staking Module](https://docs.cosmos.network/v0.47/modules/staking).

Find the `TxContext` and `TxPayload` types in the Transaction Docs.

### MsgDelegate

```ts
export interface MsgDelegateParams {
  validatorAddress: string
  amount: string
  denom: string
}

/**
 * Creates a transaction for a MsgDelegate object.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK's
 * {@link https://docs.cosmos.network/v0.47/modules/staking#msgdelegate | MsgDelegate}
 *
 * @param context Transaction Context
 * @param params MsgDelegate Params
 * @returns Transaction with the MsgDelegate payload
 *
 */
export const createTxMsgDelegate: (
  context: TxContext,
  params: MsgDelegateParams,
): TxPayload 
```
