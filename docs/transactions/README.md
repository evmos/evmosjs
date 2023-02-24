# Transactions

`@evmos/transactions` exports methods that create transaction payloads that can be signed using MetaMask or Keplr.

View the documentation within each module for the supported transaction payloads. For example, find `MsgSend` types and capabilities within the `Bank` [module documentation](https://github.com/evmos/evmosjs/tree/main/docs/transactions/bank).

## Types

### Chain

```ts
/**
 * Chain represents the base chain's chainID.
 *
 * @remarks
 * chainId corresponds to a numerical Ethereum ChainID (e.g. 9001)
 * cosmosChainId corresponds to a Cosmos SDK string ChainID (e.g. 'evmos_9001-2'
 */ 
export interface Chain {
  chainId: number
  cosmosChainId: string
}
```

### Sender

```ts
/**
 * Sender represents a Cosmos SDK Transaction signer.
 *
 * @remarks
 * A sender object is used to populate the Cosmos SDK's SignerInfo field,
 * which is used to declare transaction signers.
 */ 
export interface Sender {
  accountAddress: string
  sequence: number
  accountNumber: number
  pubkey: string
}
```

### Fee

```ts
/**
 * Fee represents a Cosmos SDK transaction fee object.
 *
 * @remarks
 * Learn more about fees in Evmos from the
 * {@link https://docs.cosmos.network/main/basics/gas-fees | Cosmos SDK Fee Docs}
 * and the {@link https://docs.evmos.org/protocol/concepts/gas-and-fees | Evmos Gas and Fee Docs}
 */
export interface Fee {
  amount: string
  denom: string
  gas: string
}
```

### TxContext

```ts
/**
 * TxContext is the transaction context for a SignDoc that is independent
 * from the transaction payload.
 */
export interface TxContext {
  chain: Chain
  sender: Sender
  fee: Fee
  memo: string
}
```

### EIP712ToSign

```ts
/**
 * EI712ToSign represents a signable EIP-712 payload that can be signed using MetaMask or Keplr.
 *
 * @remarks
 * Evmos uses the EIP-712 protocol to wrap Cosmos SDK Transactions for Ethereum signing clients.
 * EIP-712 payload signatures can be used interchangeably with standard Cosmos SDK signatures.
 * Learn more about the {@link https://eips.ethereum.org/EIPS/eip-712 | EIP-712 Standard}
 */ 
export interface EIP712ToSign {
  types: object
  primaryType: string
  domain: {
    name: string
    version: string
    chainId: number
    verifyingContract: string
    salt: string
  }
  message: object
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
  signDirect: {
    body: Proto.Cosmos.Transactions.Tx.TxBody
    authInfo: Proto.Cosmos.Transactions.Tx.AuthInfo
    signBytes: string
  }
  legacyAmino: {
    body: Proto.Cosmos.Transactions.Tx.TxBody
    authInfo: Proto.Cosmos.Transactions.Tx.AuthInfo
    signBytes: string
  }
  eipToSign: EIP712ToSign
}
```
