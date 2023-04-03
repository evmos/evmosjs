# Staking

This package creates transaction payloads with messages from the [Staking Module](https://docs.cosmos.network/main/modules/staking).

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
 * {@link https://docs.cosmos.network/main/modules/staking#msgbeginredelegate | MsgBeginRedelegate}
 *
 * @param context - Transaction Context
 * @param params - MsgBeginRedelegate Params
 * @returns Transaction with the MsgBeginRedelegate payload
 *
 */
export const createTxMsgBeginRedelegate: (
  context: TxContext,
  params: MsgBeginRedelegateParams,
): TxPayload
```

### MsgCancelUnbondingDelegation

```ts
export interface MsgCancelUnbondingDelegationParams {
  delegatorAddress: string
  validatorAddress: string
  amount: string
  denom: string
  creationHeight: string
}

/**
 * Creates a transaction for a MsgCancelUnbondingDelegation object.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK's
 * {@link https://docs.cosmos.network/main/modules/staking#msgcancelunbondingdelegation | MsgCancelUnbondingDelegation}
 *
 * @param context - Transaction Context
 * @param params - MsgCancelUnbondingDelegation Params
 * @returns Transaction with the MsgCancelUnbondingDelegation payload
 *
 */
export const createTxMsgCancelUnbondingDelegation = (
  context: TxContext,
  params: MsgCancelUnbondingDelegationParams,
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
 * {@link https://docs.cosmos.network/main/modules/staking#msgdelegate | MsgDelegate}
 *
 * @param context - Transaction Context
 * @param params - MsgDelegate Params
 * @returns Transaction with the MsgDelegate payload
 *
 */
export const createTxMsgDelegate: (
  context: TxContext,
  params: MsgDelegateParams,
): TxPayload 
```

### Multiple MsgDelegate

```ts
export interface MultipleMsgDelegateParams {
  values: MsgDelegateParams[]
}

/**
 * Creates a transaction for multiple MsgDelegate objects.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK's
 * {@link https://docs.cosmos.network/main/modules/staking#msgdelegate | MsgDelegate}
 *
 * @param context - Transaction Context
 * @param params - MultipleMsgDelegate Params
 * @returns Transaction with multiple MsgDelegate objects in the payload
 *
 */
export const createTxMultipleMsgDelegate: (
  context: TxContext,
  params: MultipleMsgDelegateParams,
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
 * {@link https://docs.cosmos.network/main/modules/staking#msgundelegate | MsgUndelegate}
 *
 * @param context - Transaction Context
 * @param params - MsgUndelegate Params
 * @returns Transaction with the MsgUndelegate payload
 *
 */
export const createTxMsgUndelegate: (
  context: TxContext,
  params: MsgUndelegateParams,
): TxPayload 
```

### MsgEditValidator

```ts
export interface MsgEditValidatorParams {
  moniker: string | undefined
  identity: string | undefined
  website: string | undefined
  securityContact: string | undefined
  details: string | undefined
  validatorAddress: string | undefined
  commissionRate: string | undefined
  minSelfDelegation: string | undefined
}

/**
 * Creates a transaction for a `MsgEditValidator` object.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK's
 * {@link https://docs.cosmos.network/main/modules/staking#msgeditvalidator | MsgEditValidator}
 *
 * @param context - Transaction Context
 * @param params - MsgEditValidator Params
 * @returns Transaction with the MsgEditValidator payload
 *
 */
export const createTxMsgEditValidator: (
  context: TxContext,
  params: MsgEditValidatorParams,
): TxPayload 
```
