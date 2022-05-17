# Get the from value from a LegacyTx

## Requirements

```sh
yarn add @astraprotocol/proto
yarn add ethers
```

## Example

We are going to use this transaction [LINK](https://cronoscan.com/tx/0xd82d4fe7ac3c73d6394920ede94536d2f34fe6101a9cec9741fc792358c69f5d)

```ts
import { ethers } from 'ethers'
import { bytesToLegacyTx, bytesToMsgEthereumTx, bytesToTxBody, bytesToTxRaw } from "@astraprotocol/proto"

// Create the legacyTx
const blockchainTx = "CpgDCuQCCh8vZXRoZXJtaW50LmV2bS52MS5Nc2dFdGhlcmV1bVR4EsACCvABChovZXRoZXJtaW50LmV2bS52MS5MZWdhY3lUeBLRAQgBEg01MDAwMDAwMDAwMDAwGP3wAiIqMHhEQzViQkRiNEE0YjA1MUJEQjg1Qjk1OWVCM2NCRDFjOEMwZDBjMTA1KgEwMkSiLLRlAAAAAAAAAAAAAAAAejzbI2T5I2mmAsroEWfQZ5CH5qMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAToBVUIgLB9VIqNf1ehvCU+duvAioON8KnG/dm6uyCXm5ftj6G5KIAfE/UfA1uCbKVxlsqYWPgu22ORLlm0aGC3CiKawhcmJEQAAAAAAgGVAGkIweGQ4MmQ0ZmU3YWMzYzczZDYzOTQ5MjBlZGU5NDUzNmQyZjM0ZmU2MTAxYTljZWM5NzQxZmM3OTIzNThjNjlmNWT6Py4KLC9ldGhlcm1pbnQuZXZtLnYxLkV4dGVuc2lvbk9wdGlvbnNFdGhlcmV1bVR4EiUSIwodCgdiYXNlY3JvEhIyMzYxNDUwMDAwMDAwMDAwMDAQ/fAC"
const txRawProto = bytesToTxRaw(Buffer.from(blockchainTx, 'base64'))
const bodyProto = bytesToTxBody(txRawProto.body_bytes)
const bodyProtoMessages = bodyProto.messages as any
const msgEthereumTxProto = bytesToMsgEthereumTx(
  bodyProtoMessages[0].value as Uint8Array,
)
const msgEthTx = msgEthereumTxProto.toObject()
const ethTx = bytesToLegacyTx(msgEthTx.data?.value as Uint8Array).toObject()

// Look for the address
const EXPECTED_FROM = "0x8b6b989d0b1256dc574de378734a4bc85e3cd2db"
const EXPECTED_HASH = "0xd82d4fe7ac3c73d6394920ede94536d2f34fe6101a9cec9741fc792358c69f5d"

// Create the legacy transaction
let tx: ethers.utils.UnsignedTransaction = {
  to: ethTx.to as string,
  nonce: ethTx.nonce as number,
  gasLimit: ethTx.gas as number,
  gasPrice: parseInt(ethTx.gas_price as string),
  data: ethTx.data as Uint8Array,
  value: parseInt(ethTx.value as string),
  chainId: 25 // CRO Chain ID
}
let ethersTx = ethers.utils.serializeTransaction(tx)

// Generate the payload that was signed
let toSign = ethers.utils.keccak256(Buffer.from(ethersTx.slice(2), 'hex'))

// Read the signature from the proto message
let signature = {
  r: `0x${Buffer.from(ethTx.r).toString('hex')}`,
  s: `0x${Buffer.from(ethTx.s).toString('hex')}`,
  v: ethTx.v[0],
}

// Recover the address
const address = ethers.utils.recoverAddress(Buffer.from(toSign.slice(2), 'hex'), signature);

// Verify the values
console.log(address.toUpperCase() == EXPECTED_FROM.toUpperCase())
console.log(msgEthTx.hash == EXPECTED_HASH)
```
