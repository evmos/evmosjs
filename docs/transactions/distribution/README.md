# Distribution

This package creates transaction payloads with messages from the [Distribution Module](https://docs.cosmos.network/main/modules/distribution).

Find the `TxContext` and `TxPayload` types in the Transaction Docs.

### MsgSetWithdrawAddress

```ts
export interface MsgSetWithdrawAddressParams {
  delegatorAddress: string
  withdrawAddress: string
}

/**
 * Creates a transaction for a MsgWithdrawRewards object.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK's
 * {@link https://docs.cosmos.network/main/modules/distribution#msgsetwithdrawaddress | MsgSetWithdrawAddress}
 *
 * @param context - Transaction Context
 * @param params - MsgSetWithdrawAddress Params
 * @returns Transaction with the MsgSetWithdrawAddress payload
 *
 */
export const createTxMsgSetWithdrawAddress: (
  context: TxContext,
  params: MsgSetWithdrawAddressParams,
): TxPayload 
```

### MsgWithdrawDelegatorReward

```ts
export interface MsgWithdrawDelegatorRewardParams {
  validatorAddress: string
}

/**
 * Creates a transaction for a MsgWithdrawRewards object.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK's
 * {@link https://docs.cosmos.network/main/modules/distribution#msgwithdrawdelegatorreward | MsgWithdrawDelegatorReward}
 *
 * @param context - Transaction Context
 * @param params - MsgWithdrawDelegatorReward Params
 * @returns Transaction with the MsgWithdrawDelegatorReward payload
 *
 */
export const createTxMsgWithdrawDelegatorReward: (
  context: TxContext,
  params: MsgWithdrawDelegatorRewardParams,
): TxPayload 
```

### Multiple MsgWithdrawDelegatorReward

```ts
export interface MultipleMsgWithdrawDelegatorRewardParams {
  validatorAddresses: string[]
}

/**
 * Creates a transaction for multiple MsgWithdrawDelegatorReward objects.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK's
 * {@link https://docs.cosmos.network/main/modules/distribution#msgwithdrawdelegatorreward | MsgWithdrawDelegatorReward}
 *
 * @param context - Transaction Context
 * @param params - MultipleMsgWithdrawDelegatorReward Params
 * @returns Transaction with multiple MsgWithdrawDelegatorReward objects in the payload
 *
 */
export const createTxMultipleMsgWithdrawDelegatorReward: (
  context: TxContext,
  params: MultipleMsgWithdrawDelegatorRewardParams,
): TxPayload
```
