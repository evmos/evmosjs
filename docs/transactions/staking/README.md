# Staking

This package creates transaction payloads with messages from the [Staking Module](https://docs.cosmos.network/v0.47/modules/staking).

Find the `TxContext` and `TxPayload` types in the Transaction Docs.

### MsgBeginRedelegate

```ts
export interface MsgBeginRedelegateParams {
  validatorSrcAddress: string
  validatorDstAddress: string
  amount: string
  denom: string
}

/**
 * Creates a transaction for a MsgBeginRedelegate object.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK's
 * {@link https://docs.cosmos.network/v0.47/modules/staking#msgbeginredelegate | MsgBeginRedelegate}
 *
 * @param context Transaction Context
 * @param params MsgBeginRedelegate Params
 * @returns Transaction with the MsgBeginRedelegate payload
 *
 */
export const createTxMsgBeginRedelegate: (
  context: TxContext,
  params: MsgBeginRedelegateParams,
): TxPayload
```

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

### MsgUndelegate

```ts
export interface MsgUndelegateParams {
  validatorAddress: string
  amount: string
  denom: string
}

/**
 * Creates a transaction for a MsgUndelegate object.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK's
 * {@link https://docs.cosmos.network/v0.47/modules/staking#msgundelegate | MsgUndelegate}
 *
 * @param context Transaction Context
 * @param params MsgUndelegate Params
 * @returns Transaction with the MsgUndelegate payload
 *
 */
export const createTxMsgUndelegate: (
  context: TxContext,
  params: MsgUndelegateParams,
): TxPayload 
```
