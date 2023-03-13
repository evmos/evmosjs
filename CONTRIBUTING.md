# Contributing

## Packages Overview

EvmosJS contains a total of 6 different packages:

1. [address-converter](https://github.com/evmos/evmosjs/tree/main/packages/address-converter)
    - Exposes interfaces to convert address encodings, e.g. from Ethereum
      hex addresses to Evmos Bech32 addresses and vice-versa
2. [provider](https://github.com/evmos/evmosjs/tree/main/packages/provider)
    - Exposes interfaces to create endpoints from which to query nodes for information
      or broadcast transactions
3. [eip712](https://github.com/evmos/evmosjs/tree/main/packages/eip712)
    - Enables creating signable low-level
      [EIP-712 TypedData Payloads](https://eips.ethereum.org/EIPS/eip-712),
      to sign Cosmos transactions from Ethereum signers
4. [proto](https://github.com/evmos/evmosjs/tree/main/packages/proto)
    - Enables creating signable low-level [Protobuf Payloads](https://protobuf.dev/),
      to sign native Cosmos transactions using `SignDirect`;
      exposes all Protobuf types used by Evmos
5. [transactions](https://github.com/evmos/evmosjs/tree/main/packages/transactions)
    - Enables creating signable high-level payloads
      that include both Protobuf- and EIP-712-signable transactions
6. [evmosjs](https://github.com/evmos/evmosjs/tree/main/packages/evmosjs)
    - Re-exports all of the above packages in a single dependency

## Adding New Messages

To add a new message type to EvmosJS, be sure to include the following:

1. Add a new EIP-712 interface in `eip712` with unit tests
    - Example: [MsgSend](https://github.com/evmos/evmosjs/blob/main/packages/eip712/src/messages/bank/send.ts),
    [MsgSend Unit Tests](https://github.com/evmos/evmosjs/blob/main/packages/eip712/src/messages/bank/send.spec.ts)
2. Add a new Protobuf interface in `proto` with unit tests
    - Example: [MsgSend](https://github.com/evmos/evmosjs/blob/main/packages/proto/src/messages/bank/msgSend.ts),
    [Bank Module Unit Tests](https://github.com/evmos/evmosjs/blob/main/packages/proto/src/messages/bank/bank.spec.ts)
3. Add a new Transaction interface in `transactions` with unit tests, using the `eip712` and `proto` implementations
    - Example: [CreateTxMsgSend](https://github.com/evmos/evmosjs/blob/main/packages/transactions/src/messages/bank/send.ts),
    [CreateTxMsgSend Unit Tests](https://github.com/evmos/evmosjs/blob/main/packages/transactions/src/messages/bank/send.spec.ts)
4. Add documentation for the new message in the [Transaction Docs](https://github.com/evmos/evmosjs/tree/main/docs/transactions) for the given module
    - Example: [Bank Module Documentation](https://github.com/evmos/evmosjs/tree/main/docs/transactions/bank)
