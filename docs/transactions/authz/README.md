# Authz

This package creates transaction payloads with messages from the [Authz Module](https://docs.cosmos.network/main/modules/authz).

Find the `TxContext` and `TxPayload` types in the Transaction Docs.

### Generic MsgGrant

```ts
export interface MsgGenericAuthorizationParams {
  granteeAddress: string
  typeUrl: string
  expires: number
}

/**
 * Creates a transaction for a generic MsgGrant.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK's
 * {@link https://docs.cosmos.network/main/modules/authz#msggrant | MsgGrant}
 *
 * @param context - Transaction Context
 * @param params - MsgGrant Generic Auth Params
 * @returns Transaction with the MsgGrant payload
 *
 */
export const createTxMsgGenericGrant: (
  context: TxContext,
  params: MsgGenericAuthorizationParams,
): TxPayload
```

### Generic MsgRevoke

```ts
export interface MsgGenericRevokeParams {
  granteeAddress: string
  typeUrl: string
}

/**
 * Creates a transaction for a generic MsgRevoke.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK's
 * {@link https://docs.cosmos.network/main/modules/authz#msgrevoke | MsgRevoke}
 *
 * @param context - Transaction Context
 * @param params - MsgRevoke Generic Auth Params
 * @returns Transaction with the MsgRevoke payload
 *
 */
export const createTxMsgGenericRevoke: (
  context: TxContext,
  params: MsgGenericRevokeParams,
): TxPayload
```

### Staking MsgGrant

```ts
export interface MsgStakeAuthorizationParams {
  granteeAddress: string
  validatorAddress: string | string[]
  denom: string
  maxTokens: string | undefined
  expiration: number
}

/**
 * Creates a transaction for a staking MsgGrant.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK's
 * {@link https://docs.cosmos.network/main/modules/authz#msggrant | MsgGrant}
 *
 * @param context - Transaction Context
 * @param params - MsgGrant Staking Auth Params
 * @returns Transaction with the MsgGrant payload
 *
 */
export function createTxMsgStakeAuthorization: (
  context: TxContext,
  params: MsgStakeAuthorizationParams,
): TxPayload
```

### Staking MsgRevoke

```ts
export interface MsgStakeRevokeAuthorizationParams {
  granteeAddress: string
}

/**
 * Creates a transaction for a staking MsgRevoke.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK's
 * {@link https://docs.cosmos.network/main/modules/authz#msgrevoke | MsgRevoke}
 *
 * @param context - Transaction Context
 * @param params - MsgRevoke Staking Auth Params
 * @returns Transaction with the MsgRevoke payload
 *
 */
export function createTxMsgStakeRevokeAuthorization: (
  context: TxContext,
  params: MsgStakeRevokeAuthorizationParams,
): TxPayload
```
