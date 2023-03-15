# Contributing to EvmosJS

Before submitting a contribution, please take a moment to review this document to ensure
that your contribution follows our guidelines.

## Getting Started

If you're new to contributing to open source projects, you may find it helpful to
read [GitHub's Guide to Contributing to Open Source](https://opensource.guide/how-to-contribute/).

To contribute to EvmosJS, follow these steps:

1. Fork the repository.
2. Clone the forked repository onto your local machine.
3. Create a new branch for your changes. We recommend that you name the branch according to the issue you are addressing (e.g. issue-123).
4. Make your changes to the code.
5. Ensure that your changes pass the existing tests by running `npm test` (see [testing](#testing)).
6. Commit your changes with a descriptive commit message.
7. Push your changes to your forked repository.
8. Open a pull request to the original repository, explaining the changes you've made and referencing the issue number(s) the changes relate to.

## Overview

EvmosJS contains a total of 6 different packages:

1. [address-converter](https://github.com/evmos/evmosjs/tree/main/packages/address-converter)
    - Convert address encodings, e.g. from Ethereum
      hex addresses to Evmos Bech32 addresses and vice-versa
2. [provider](https://github.com/evmos/evmosjs/tree/main/packages/provider)
    - Create endpoints from which to query nodes for information
      or broadcast transactions
3. [eip712](https://github.com/evmos/evmosjs/tree/main/packages/eip712)
    - Create signable low-level
      [EIP-712 TypedData Payloads](https://eips.ethereum.org/EIPS/eip-712),
      to be used to sign Cosmos transactions from Ethereum signers
4. [proto](https://github.com/evmos/evmosjs/tree/main/packages/proto)
    - Create signable low-level [Protobuf Payloads](https://protobuf.dev/),
      to be used to sign native Cosmos transactions using `SignDirect`, and access
      Protobuf types used by Evmos
5. [transactions](https://github.com/evmos/evmosjs/tree/main/packages/transactions)
    - Create signable high-level payloads
      that include both Protobuf- and EIP-712-signable transactions
6. [evmosjs](https://github.com/evmos/evmosjs/tree/main/packages/evmosjs)
    - Import the above packages from a single dependency

Depending on the issue you are contributing to, you will
likely need to make changes in one or more of these.

## Commit Messages

EvmosJS uses [commitlint](https://github.com/conventional-changelog/commitlint) to enforce consistent commit message styling.

In general, the commit message should describe the action performed by the commit, e.g. "test: add unit tests for proto MsgSend."

## Pull Requests

Pull requests should include a description that covers:

1. Purpose of the PR
2. Solution by the PR
3. Relevant Context and Considerations

Simply, it should be simple for someone with working knowledge of the repository
to understand what the PR changes and why.

## Common Changes

There are certain changes that are commonly made to EvmosJS, and as a result,
have a specific workflow for convenience.

### Add a New Cosmos Transaction Interface

To add a new Cosmos transaction interface to EvmosJS, be sure to include the following:

1. Add a new EIP-712 interface in `eip712` with unit tests
    - Example: [Implementation](https://github.com/evmos/evmosjs/blob/main/packages/eip712/src/messages/bank/send.ts),
    [Unit Tests](https://github.com/evmos/evmosjs/blob/main/packages/eip712/src/messages/bank/send.spec.ts)
2. Add a new Protobuf interface in `proto` with unit tests
    - Example: [Implementation](https://github.com/evmos/evmosjs/blob/main/packages/proto/src/messages/bank/msgSend.ts),
    [Unit Tests](https://github.com/evmos/evmosjs/blob/main/packages/proto/src/messages/bank/bank.spec.ts)
3. Add a new Transaction interface in `transactions` with unit tests, using the `eip712` and `proto` implementations
    - Example: [Implementation](https://github.com/evmos/evmosjs/blob/main/packages/transactions/src/messages/bank/send.ts),
    [Unit Tests](https://github.com/evmos/evmosjs/blob/main/packages/transactions/src/messages/bank/send.spec.ts)
4. Add documentation for the new message in the [Transaction Docs](https://github.com/evmos/evmosjs/tree/main/docs/transactions) for the given module
    - Example: [Documentation](https://github.com/evmos/evmosjs/tree/main/docs/transactions/bank)

## Testing

EvmosJS uses [Jest](https://jestjs.io/) and [ts-jest](https://kulshekhar.github.io/ts-jest/)
to run both unit and end-to-end tests. Run:

```bash
npm run test
```

from the base repository in order to execute the test suite.

In addition, these tests are run as part of the CI/CD cycle on each pull request that modifies
the codebase.

## Linting

EvmosJS enforces lint settings on each commit and as part of CI/CD. To check the lint settings,
run:

```bash
npm run lint
```

from the base repository to lint the code.
