# Examples

All examples are using the function `getSender` that will return a valid account querying the blockchain.

Type:

```ts
interface Sender {
  accountAddress: string
  sequence: number
  accountNumber: number
  pubkey: string
}
```

An example on how to implement it can be found in the [README.md](https://github.com/tharsis/evmosjs/blob/main/README.md) example.

All the message will also required the chain information and the fee to pay:

Types

```ts
export interface Fee {
  amount: string
  denom: string
  gas: string
}

export interface Chain {
  chainId: number
  cosmosChainId: string
}
```

## Signer

The examples are using `signTransaction` or `singTransactionUsingEIP712` to sign the generated messages, but Metamask or Keplr can be used to sign them.

### Metamask

NOTE: msg is the result of calling any `createTx...` function using evmosjs

```ts
import { evmosToEth } from '@evmos/address-converter'
import {
  generateEndpointBroadcast,
  generatePostBodyBroadcast,
} from '@evmos/provider'
import {
  createTxRawEIP712,
  signatureToWeb3Extension,
} from '@evmos/transactions'

// Init Metamask
await window.ethereum.enable()

// Request the signature
let signature = await window.ethereum.request({
  method: 'eth_signTypedData_v4',
  params: [evmosToEth(sender.accountAddress), JSON.stringify(msg.eipToSign)],
})

// The chain and sender objects are the same as the previous example
let extension = signatureToWeb3Extension(chain, sender, signature)

// Create the txRaw
let rawTx = createTxRawEIP712(
  msg.legacyAmino.body,
  msg.legacyAmino.authInfo,
  extension,
)

// Broadcast it
const postOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: generatePostBodyBroadcast(rawTx),
}

let broadcastPost = await fetch(
  `http://localhost:1317${generateEndpointBroadcast()}`,
  postOptions,
)
let response = await broadcastPost.json()
```

### Keplr

TODO: add keplr example
