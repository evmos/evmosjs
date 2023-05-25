# EvmosJS

This is a monorepo that contains the EvmosJS collection of npm packages related to Evmos,
an Ethereum-compatible blockchain platform that supports Ethereum Virtual Machine (EVM) smart contracts.

## Packages

This monorepo includes the following packages:

- [`@evmos/address-converter`](./packages/address-converter/README.md): JS library for converting between `ETH` and `evmos` addresses.
- [`@evmos/eip712`](./packages/eip712/README.md): JS library for creation of EIP712 transactions.
- [`@evmos/proto`](./packages/proto/README.md): JS library with Protobuf files used to generate cosmos/evmos transactions.
- [`@evmos/provider`](./packages/provider/README.md): JS library to query the EVMOS rest api.
- [`@evmos/transactions`](./packages/transactions/README.md): JS library for constructing, signing, and sending transactions on the Evmos network
- [`evmosjs`](./packages/evmosjs/README.md): JS library containing all the other libraries.

For installation guide and examples, check the [`evmosjs` readme file](./packages/evmosjs/README.md).
