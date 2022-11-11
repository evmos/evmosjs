# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.2.9](https://github.com/evmos/evmosjs/compare/@evmos/eip712@0.2.6...@evmos/eip712@0.2.9) (2022-11-11)

### Features

- governance MsgSubmitProposal ([#80](https://github.com/evmos/evmosjs/issues/80)) ([419bae1](https://github.com/evmos/evmosjs/commit/419bae1f6dbf1e4d1a77d83f50a358f4fc91708a))
- proposal deposit message ([#86](https://github.com/evmos/evmosjs/issues/86)) ([5410c1f](https://github.com/evmos/evmosjs/commit/5410c1fe042c13a77beb5629a07371dd905559de))
- support for MsgSetWithdrawAddress ([#75](https://github.com/evmos/evmosjs/issues/75)) ([a879799](https://github.com/evmos/evmosjs/commit/a879799f06e57b2959b6a0c9bc622f540e3d8920))
- vesting messages ([#85](https://github.com/evmos/evmosjs/issues/85)) ([ca75041](https://github.com/evmos/evmosjs/commit/ca750417ea7db5487de424d65d5d17517443ee01))

## [0.2.8](https://github.com/evmos/evmosjs/compare/@evmos/eip712@0.2.6...@evmos/eip712@0.2.8) (2022-10-10)

### Features

- support for MsgSetWithdrawAddress ([#75](https://github.com/evmos/evmosjs/issues/75)) ([a879799](https://github.com/evmos/evmosjs/commit/a879799f06e57b2959b6a0c9bc622f540e3d8920))

## [0.2.7](https://github.com/evmos/evmosjs/compare/@evmos/eip712@0.2.6...@evmos/eip712@0.2.7) (2022-10-06)

### Features

- support for MsgSetWithdrawAddress ([#75](https://github.com/evmos/evmosjs/issues/75)) ([a879799](https://github.com/evmos/evmosjs/commit/a879799f06e57b2959b6a0c9bc622f540e3d8920))

## 0.2.6 (2022-09-26)

### Bug Fixes

- use the correct values after the evmos pr ([#60](https://github.com/evmos/evmosjs/issues/60)) ([9c06327](https://github.com/evmos/evmosjs/commit/9c06327b25a01024efb862d7bd80c9329299ae1d))

### Features

- add feesplit to transactions pkg and eip712 rename ([#58](https://github.com/evmos/evmosjs/issues/58)) ([1dfefbd](https://github.com/evmos/evmosjs/commit/1dfefbd906a9674453c91c9adaf4273cc92c93b8))
- added multiple transactions support for withdraw rewards ([#26](https://github.com/evmos/evmosjs/issues/26)) ([9cddd62](https://github.com/evmos/evmosjs/commit/9cddd62bdeec00d50791df8fbaa0c1301d08d4ca))
- convertCoin and convertERC20 messages ([#45](https://github.com/evmos/evmosjs/issues/45)) ([9b78984](https://github.com/evmos/evmosjs/commit/9b78984c034208c572e519bf080073014e804f13))
- delegate message ([#15](https://github.com/evmos/evmosjs/issues/15)) ([1e68b10](https://github.com/evmos/evmosjs/commit/1e68b10d107edef6d54358447cee60af84d46053))
- feesplit included in eip712 package ([#56](https://github.com/evmos/evmosjs/issues/56)) ([102c1b0](https://github.com/evmos/evmosjs/commit/102c1b0873e2feedacb51b416a819c3fd8e8898f))
- feesplit renamed to revenue ([#73](https://github.com/evmos/evmosjs/issues/73)) ([75cc699](https://github.com/evmos/evmosjs/commit/75cc699fd318715d3f21da72ec83130ac858f661))
- ibc transactions added ([#14](https://github.com/evmos/evmosjs/issues/14)) ([3809f28](https://github.com/evmos/evmosjs/commit/3809f289e4e54c5013d3027578bde5c244ec8736))
- implement EIP712 enc/decoding infrastructure ([#63](https://github.com/evmos/evmosjs/issues/63)) ([571eb93](https://github.com/evmos/evmosjs/commit/571eb93247214e22ca85924214458ec7792e5dde))
- msgSend added ([#4](https://github.com/evmos/evmosjs/issues/4)) ([fe40011](https://github.com/evmos/evmosjs/commit/fe40011fedad558d6666674b3001e34cc86ae30d))
- proto objects for EIP712 ([#7](https://github.com/evmos/evmosjs/issues/7)) ([6ecd900](https://github.com/evmos/evmosjs/commit/6ecd9004f081c6a70b80d903878877d378ff6c75))
- redelegate/undelegate/claim transactions added ([#23](https://github.com/evmos/evmosjs/issues/23)) ([3b536c3](https://github.com/evmos/evmosjs/commit/3b536c321f7c304f79d121af346f16d6cca74b47))
- use the same naming style across all packages ([#24](https://github.com/evmos/evmosjs/issues/24)) ([348db46](https://github.com/evmos/evmosjs/commit/348db46ac299655257addc7a381e4ac1eb88f20a))
- utils to sign messages locally ([#44](https://github.com/evmos/evmosjs/issues/44)) ([80bdf98](https://github.com/evmos/evmosjs/commit/80bdf980a330630104155d37e4b1a289f94eb10c))
- vote on proposals ([#17](https://github.com/evmos/evmosjs/issues/17)) ([d0db5f9](https://github.com/evmos/evmosjs/commit/d0db5f9d2fba521a3cd20192d8d24c54f7f7fa4c))
- withdrawValidatorCommission message ([#42](https://github.com/evmos/evmosjs/issues/42)) ([9cc09e3](https://github.com/evmos/evmosjs/commit/9cc09e34f0f052555d1f9c6e8f3d81dfbbea6d1c))

## 0.2.5 (2022-09-12)

### Bug Fixes

- use the correct values after the evmos pr ([#60](https://github.com/evmos/evmosjs/issues/60)) ([9c06327](https://github.com/evmos/evmosjs/commit/9c06327b25a01024efb862d7bd80c9329299ae1d))

### Features

- add feesplit to transactions pkg and eip712 rename ([#58](https://github.com/evmos/evmosjs/issues/58)) ([1dfefbd](https://github.com/evmos/evmosjs/commit/1dfefbd906a9674453c91c9adaf4273cc92c93b8))
- added multiple transactions support for withdraw rewards ([#26](https://github.com/evmos/evmosjs/issues/26)) ([9cddd62](https://github.com/evmos/evmosjs/commit/9cddd62bdeec00d50791df8fbaa0c1301d08d4ca))
- convertCoin and convertERC20 messages ([#45](https://github.com/evmos/evmosjs/issues/45)) ([9b78984](https://github.com/evmos/evmosjs/commit/9b78984c034208c572e519bf080073014e804f13))
- delegate message ([#15](https://github.com/evmos/evmosjs/issues/15)) ([1e68b10](https://github.com/evmos/evmosjs/commit/1e68b10d107edef6d54358447cee60af84d46053))
- feesplit included in eip712 package ([#56](https://github.com/evmos/evmosjs/issues/56)) ([102c1b0](https://github.com/evmos/evmosjs/commit/102c1b0873e2feedacb51b416a819c3fd8e8898f))
- ibc transactions added ([#14](https://github.com/evmos/evmosjs/issues/14)) ([3809f28](https://github.com/evmos/evmosjs/commit/3809f289e4e54c5013d3027578bde5c244ec8736))
- msgSend added ([#4](https://github.com/evmos/evmosjs/issues/4)) ([fe40011](https://github.com/evmos/evmosjs/commit/fe40011fedad558d6666674b3001e34cc86ae30d))
- proto objects for EIP712 ([#7](https://github.com/evmos/evmosjs/issues/7)) ([6ecd900](https://github.com/evmos/evmosjs/commit/6ecd9004f081c6a70b80d903878877d378ff6c75))
- redelegate/undelegate/claim transactions added ([#23](https://github.com/evmos/evmosjs/issues/23)) ([3b536c3](https://github.com/evmos/evmosjs/commit/3b536c321f7c304f79d121af346f16d6cca74b47))
- use the same naming style across all packages ([#24](https://github.com/evmos/evmosjs/issues/24)) ([348db46](https://github.com/evmos/evmosjs/commit/348db46ac299655257addc7a381e4ac1eb88f20a))
- utils to sign messages locally ([#44](https://github.com/evmos/evmosjs/issues/44)) ([80bdf98](https://github.com/evmos/evmosjs/commit/80bdf980a330630104155d37e4b1a289f94eb10c))
- vote on proposals ([#17](https://github.com/evmos/evmosjs/issues/17)) ([d0db5f9](https://github.com/evmos/evmosjs/commit/d0db5f9d2fba521a3cd20192d8d24c54f7f7fa4c))
- withdrawValidatorCommission message ([#42](https://github.com/evmos/evmosjs/issues/42)) ([9cc09e3](https://github.com/evmos/evmosjs/commit/9cc09e34f0f052555d1f9c6e8f3d81dfbbea6d1c))

## [0.2.4](https://github.com/evmos/evmosjs/compare/@evmos/eip712@0.2.3...@evmos/eip712@0.2.4) (2022-08-23)

### Bug Fixes

- use the correct values after the evmos pr ([#60](https://github.com/evmos/evmosjs/issues/60)) ([9c06327](https://github.com/evmos/evmosjs/commit/9c06327b25a01024efb862d7bd80c9329299ae1d))

### Features

- add feesplit to transactions pkg and eip712 rename ([#58](https://github.com/evmos/evmosjs/issues/58)) ([1dfefbd](https://github.com/evmos/evmosjs/commit/1dfefbd906a9674453c91c9adaf4273cc92c93b8))
- feesplit included in eip712 package ([#56](https://github.com/evmos/evmosjs/issues/56)) ([102c1b0](https://github.com/evmos/evmosjs/commit/102c1b0873e2feedacb51b416a819c3fd8e8898f))

## [0.2.3](https://github.com/evmos/evmosjs/compare/@evmos/eip712@0.2.2...@evmos/eip712@0.2.3) (2022-06-23)

### Features

- convertCoin and convertERC20 messages ([#45](https://github.com/evmos/evmosjs/issues/45)) ([9b78984](https://github.com/evmos/evmosjs/commit/9b78984c034208c572e519bf080073014e804f13))
- utils to sign messages locally ([#44](https://github.com/evmos/evmosjs/issues/44)) ([80bdf98](https://github.com/evmos/evmosjs/commit/80bdf980a330630104155d37e4b1a289f94eb10c))

## [0.2.2](https://github.com/tharsis/evmosjs/compare/@evmos/eip712@0.2.1...@evmos/eip712@0.2.2) (2022-05-29)

### Features

- withdrawValidatorCommission message ([#42](https://github.com/tharsis/evmosjs/issues/42)) ([9cc09e3](https://github.com/tharsis/evmosjs/commit/9cc09e34f0f052555d1f9c6e8f3d81dfbbea6d1c))

## [0.2.1](https://github.com/tharsis/evmosjs/compare/@evmos/eip712@0.2.0...@evmos/eip712@0.2.1) (2022-03-14)

### Features

- added multiple transactions support for withdraw rewards ([#26](https://github.com/tharsis/evmosjs/issues/26)) ([9cddd62](https://github.com/tharsis/evmosjs/commit/9cddd62bdeec00d50791df8fbaa0c1301d08d4ca))

# [0.2.0](https://github.com/tharsis/evmosjs/compare/@evmos/eip712@0.1.10...@evmos/eip712@0.2.0) (2022-03-11)

### Features

- use the same naming style across all packages ([#24](https://github.com/tharsis/evmosjs/issues/24)) ([348db46](https://github.com/tharsis/evmosjs/commit/348db46ac299655257addc7a381e4ac1eb88f20a))

## [0.1.10](https://github.com/tharsis/evmosjs/compare/@evmos/eip712@0.1.9...@evmos/eip712@0.1.10) (2022-03-11)

### Features

- redelegate/undelegate/claim transactions added ([#23](https://github.com/tharsis/evmosjs/issues/23)) ([3b536c3](https://github.com/tharsis/evmosjs/commit/3b536c321f7c304f79d121af346f16d6cca74b47))

## [0.1.9](https://github.com/tharsis/evmosjs/compare/@evmos/eip712@0.1.8...@evmos/eip712@0.1.9) (2022-03-05)

### Features

- vote on proposals ([#17](https://github.com/tharsis/evmosjs/issues/17)) ([d0db5f9](https://github.com/tharsis/evmosjs/commit/d0db5f9d2fba521a3cd20192d8d24c54f7f7fa4c))

## [0.1.8](https://github.com/tharsis/evmosjs/compare/@evmos/eip712@0.1.7...@evmos/eip712@0.1.8) (2022-03-04)

### Features

- delegate message ([#15](https://github.com/tharsis/evmosjs/issues/15)) ([1e68b10](https://github.com/tharsis/evmosjs/commit/1e68b10d107edef6d54358447cee60af84d46053))

## [0.1.7](https://github.com/tharsis/evmosjs/compare/@evmos/eip712@0.1.6...@evmos/eip712@0.1.7) (2022-03-03)

### Features

- ibc transactions added ([#14](https://github.com/tharsis/evmosjs/issues/14)) ([3809f28](https://github.com/tharsis/evmosjs/commit/3809f289e4e54c5013d3027578bde5c244ec8736))

## 0.1.6 (2022-03-02)

### Features

- msgSend added ([#4](https://github.com/tharsis/evmosjs/issues/4)) ([fe40011](https://github.com/tharsis/evmosjs/commit/fe40011fedad558d6666674b3001e34cc86ae30d))
- proto objects for EIP712 ([#7](https://github.com/tharsis/evmosjs/issues/7)) ([6ecd900](https://github.com/tharsis/evmosjs/commit/6ecd9004f081c6a70b80d903878877d378ff6c75))

## [0.1.5](https://github.com/tharsis/evmosjs/compare/@evmos/eip712@0.1.2...@evmos/eip712@0.1.5) (2022-02-26)

**Note:** Version bump only for package @evmos/eip712
