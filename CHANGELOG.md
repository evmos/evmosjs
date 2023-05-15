<!--
Guiding Principles:

Changelogs are for humans, not machines.
There should be an entry for every single version.
The same types of changes should be grouped.
Versions and sections should be linkable.
The latest version comes first.
The release date of each version is displayed.
Mention whether you follow Semantic Versioning.

Usage:

Change log entries are to be added to the Unreleased section under the
appropriate stanza (see below). Each entry should ideally include a tag and
the Github issue reference in the following format:

* (<tag>) \#<issue-number> message

The issue numbers will later be link-ified during the release process so you do
not have to worry about including a link manually, but you can if you wish.

Types of changes (Stanzas):

"Features" for new features.
"Improvements" for changes in existing functionality.
"Deprecated" for soon-to-be removed features.
"Bug Fixes" for any bug fixes.
"Client Breaking" for breaking CLI commands and REST routes used by end-users.
"API Breaking" for breaking exported APIs used by developers building on SDK.

Ref: https://keepachangelog.com/en/1.0.0/
-->

# Changelog

## Unreleased

- (proto)[#166](https://github.com/evmos/evmosjs/pull/166) Expose DynamicFeeExtension Protobuf message

## evmosjs v0.3.3

- (proto)[#157](https://github.com/evmos/evmosjs/pull/157) Refactor to use Ethermint Protobuf types exported from Evmos
- (proto)[#159](https://github.com/evmos/evmosjs/pull/159) Add decoding utilities useful for Stargate
- (transactions)[#160](https://github.com/evmos/evmosjs/pull/160) Add memo to IBC `MsgTransfer` payload
- (transactions)[#161](https://github.com/evmos/evmosjs/pull/161) Add `MsgCancelUnbondingDelegation` payload

## evmosjs v0.3.0

### API Breaking

- (transactions)[#123](https://github.com/evmos/evmosjs/pull/123) Remove Transactions `web3Extension` and `txRaw` since they are no longer necessary

### Improvements

- (transactions)[#109](https://github.com/evmos/evmosjs/pull/109) Add base and testing infrastructure to Transactions package
- (transactions)[#110](https://github.com/evmos/evmosjs/pull/110) Refactor Transactions `Authz` module using base infrastructure and add unit tests
- (transactions)[#111](https://github.com/evmos/evmosjs/pull/111) Refactor Transactions `Bank` module using base infrastructure and add unit tests
- (transactions)[#117](https://github.com/evmos/evmosjs/pull/117) Refactor Transactions `ERC-20` module using base infrastructure and add unit tests
- (transactions)[#114](https://github.com/evmos/evmosjs/pull/114) Refactor Transactions `Distribution` module using base infrastructure and add unit tests
- (transactions)[#118](https://github.com/evmos/evmosjs/pull/118) Refactor Transactions `Gov` module using base infrastructure and add unit tests
- (transactions)[#119](https://github.com/evmos/evmosjs/pull/119) Refactor Transactions `IBC` module using base infrastructure and add unit tests
- (transactions)[#120](https://github.com/evmos/evmosjs/pull/120) Refactor Transactions `Revenue` module using base infrastructure and add unit tests
- (transactions)[#121](https://github.com/evmos/evmosjs/pull/121) Refactor Transactions `Staking` module using base infrastructure and add unit tests
- (transactions)[#122](https://github.com/evmos/evmosjs/pull/122) Refactor Transactions `Vesting` module using base infrastructure and add unit tests
- (transactions)[#125](https://github.com/evmos/evmosjs/pull/125) Refactor EIP-712 `Authz` package internally
- (transactions)[#126](https://github.com/evmos/evmosjs/pull/126) Refactor EIP-712 `Bank` package internally
- (transactions)[#127](https://github.com/evmos/evmosjs/pull/127) Refactor EIP-712 `Distribution` package internally
- (transactions)[#128](https://github.com/evmos/evmosjs/pull/128) Refactor EIP-712 `ERC-20` package internally
- (transactions)[#129](https://github.com/evmos/evmosjs/pull/129) Refactor EIP-712 `Gov` package internally
- (transactions)[#130](https://github.com/evmos/evmosjs/pull/130) Refactor EIP-712 `IBC` package internally
- (transactions)[#131](https://github.com/evmos/evmosjs/pull/131) Refactor EIP-712 `Revenue` package internally
- (transactions)[#132](https://github.com/evmos/evmosjs/pull/132) Refactor EIP-712 `Staking` package internally
- (transactions)[#133](https://github.com/evmos/evmosjs/pull/133) Refactor EIP-712 `Vesting` package internally
