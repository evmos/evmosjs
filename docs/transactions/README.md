# Transactions

This package exports methods that create signable transaction payloads for Evmos modules.

See the individual documentation pages for each module for more information.

### TxContext

```ts
/**
 * TxContext is the transaction context for a SignDoc, independent
 * from any messages.
 */
export interface TxContext {
  chain: Chain
  sender: Sender
  fee: Fee
  memo: string
}
```

### TxPayload

```ts
/**
 * TxPayload is a transaction object with signable payloads
 * in multiple formats.
 *
 * @remarks
 * TxPayload includes signable payloads for Evmos `EIP-712`,
 * `SignDirect`, and `SignLegacyAmino`.
 *
 * Evmos uses the {@link https://eips.ethereum.org/EIPS/eip-712 | EIP-712 Specification}
 * to wrap and sign Cosmos payloads using Ethereum signers.
 *
 * See {@link https://docs.cosmos.network/main/core/encoding} for more
 * on `SignDirect` and `SignLegacyAmino`.
 */
export interface TxPayload {
  eipToSign: object,
  signDirect: object,
  legacyAmino: object,
}
```
