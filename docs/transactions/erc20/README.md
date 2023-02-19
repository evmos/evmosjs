# ERC-20

This package creates transaction payloads with messages from the [ERC-20 Module](https://docs.evmos.org/modules/erc20/).

Find the `TxContext` and `TxPayload` types in the Transaction Docs.

### MsgConvertCoin

```ts
export interface MsgConvertCoinParams {
  denom: string
  amount: string
  receiverHex: string
  senderBech32: string
}

/**
 * Creates a transaction for a `MsgConvertCoin` object.
 *
 * @remarks
 * This method creates a transaction wrapping the Evmos
 * {@link https://docs.evmos.org/modules/erc20/04_transactions.html#msgconvertcoin | MsgConvertCoin}
 *
 * @param context - Transaction Context
 * @param params - MsgConvertCoin Params
 * @returns Transaction with the MsgConvertCoin payload
 *
 */
export const createTxMsgConvertCoin: (
  context: TxContext,
  params: MsgConvertCoinParams,
): TxPayload
```

### MsgConvertERC20

```ts
export interface MsgConvertERC20Params {
  contractAddress: string
  amount: string
  receiverBech32: string
  senderHex: string
}

/**
 * Creates a transaction for a `MsgConvertERC20` object.
 *
 * @remarks
 * This method creates a transaction wrapping the Evmos
 * {@link https://docs.evmos.org/modules/erc20/04_transactions.html#msgconverterc20 | MsgConvertERC20}
 *
 * @param context - Transaction Context
 * @param params - MsgConvertERC20 Params
 * @returns Transaction with the MsgConvertERC20 payload
 *
 */
export const createTxMsgConvertERC20: (
  context: TxContext,
  params: MsgConvertERC20Params,
): TxPayload
```
