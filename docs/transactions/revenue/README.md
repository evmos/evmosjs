# Revenue

This package creates transaction payloads with messages from the [Revenue Module](https://docs.evmos.org/modules/revenue/).

Find the `TxContext` and `TxPayload` types in the Transaction Docs.

### MsgCancelRevenue

```ts
export interface MsgCancelRevenueParams {
  contractAddress: string
  deployerAddress: string
}

/**
 * Creates a transaction for a `MsgCancelRevenue` object.
 *
 * @remarks
 * This method creates a transaction wrapping the Evmos
 * {@link https://docs.evmos.org/modules/revenue/04_transactions.html#msgcancelrevenue | MsgCancelRevenue}
 *
 * @param context - Transaction Context
 * @param params - MsgCancelRevenue Params
 * @returns Transaction with the MsgCancelRevenue payload
 *
 */
export const createTxMsgCancelRevenue: (
  context: TxContext,
  params: MsgCancelRevenueParams,
): TxPayload 
```

### MsgRegisterRevenue

```ts
export interface MsgRegisterRevenueParams {
  contractAddress: string
  deployerAddress: string
  withdrawerAddress: string
  nonces: number[]
}

/**
 * Creates a transaction for a `MsgRegisterRevenue` object.
 *
 * @remarks
 * This method creates a transaction wrapping the Evmos
 * {@link https://docs.evmos.org/modules/revenue/04_transactions.html#msgregisterrevenue | MsgRegisterRevenue}
 *
 * @param context - Transaction Context
 * @param params - MsgRegisterRevenue Params
 * @returns Transaction with the MsgRegisterRevenue payload
 *
 */
export const createTxMsgRegisterRevenue: (
  context: TxContext,
  params: MsgRegisterRevenueParams,
): TxPayload
```

### MsgUpdateRevenue

```ts
export interface MsgUpdateRevenueParams {
  contractAddress: string
  deployerAddress: string
  withdrawerAddress: string
}

/**
 * Creates a transaction for a `MsgUpdateRevenue` object.
 *
 * @remarks
 * This method creates a transaction wrapping the Evmos
 * {@link https://docs.evmos.org/modules/revenue/04_transactions.html#msgupdaterevenue | MsgUpdateRevenue}
 *
 * @param context - Transaction Context
 * @param params - MsgUpdateRevenue Params
 * @returns Transaction with the MsgUpdateRevenue payload
 *
 */
export const createTxMsgUpdateRevenue: (
  context: TxContext,
  params: MsgUpdateRevenueParams,
): TxPayload 
```
