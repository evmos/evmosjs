# astrajs

This project forked from [https://github.com/evmos/evmosjs](https://github.com/evmos/evmosjs)

JS and TS libs for Astra

## Example

### Get account information

Get the account number, sequence and pubkey from an address.
NOTE: if the address had not sent any transaction to the blockchain, the pubkey value are going to be empty.

```ts
import { ethToAstra } from '@astradefi/address-converter';
import { generateEndpointAccount } from '@astradefi/provider';

const sender = 'astra1...'
let destination = '0x....'
// The address must be bech32 encoded
if (destination.split('0x').length == 2) {
    destination = ethToAstra(destination)
}

// Query the node
const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
};

let addrRawData = await fetch(
    `http://127.0.0.1:1317${generateEndpointAccount(sender)}`,
    options
);
// NOTE: the node returns status code 400 if the wallet doesn't exist, catch that error

let addrData = await addRawData.json()

// Response format at @astradefi/provider/rest/account/AccountResponse
/*
  account: {
    '@type': string
    base_account: {
      address: string
      pub_key?: {
        '@type': string
        key: string
      }
      account_number: string
      sequence: string
    }
    code_hash: string
  }
*/
```

### Create a MsgSend Transaction

The transaction can be signed using EIP712 on Metamask and SignDirect on Keplr.

```ts
import { createMessageSend } from @astradefi/transactions

const chain = {
    chainId: 11110,
    cosmosChainId: 'astra_11110-1',
}

const sender = {
    accountAddress: 'astra198g5t8ct4udcgflfkc07htnctp945sjwaagwf2',
    sequence: 1,
    accountNumber: 9,
    pubkey: 'A8OsUq+hI7+SQSopU7TssYaD69tQImP3qUACUsFS57Gk',
}

const fee = {
    amount: '20',
    denom: 'aastra',
    gas: '200000',
}

const memo = ''

const params = {
    destinationAddress: 'astra1uqayy4cwyuu6xxedy48jd7ldua3x0uahrd78dt',
    amount: '1',
    denom: 'aastra',
}

const msg = createMessageSend(chain, sender, fee, memo, params)

// msg.signDirect is the transaction in Keplr format
// msg.legacyAmino is the transaction with legacy amino
// msg.eipToSign is the EIP712 data to sign with metamask

```

### Signing with Metamask

After creating the transaction we need to send the payload to metamask so it can be signed. With that signature we are going to add a Web3Extension to the Cosmos Transactions and broadcast it to the Astra node.

```ts
// Follow the previous step to generate the msg object
import { astraToEth } from '@astradefi/address-converter'
import { generateEndpointBroadcast, generatePostBodyBroadcast } from '@astradefi/provider'
import { createTxRawEIP712, signatureToWeb3Extension } from '@astradefi/transactions'

// Init Metamask
await window.ethereum.enable();

// Request the signature
let signature = await window.ethereum.request({
    method: 'eth_signTypedData_v4',
    params: [astraToEth(sender.accountAddress), JSON.stringify(msg.eipToSign)],
});

// The chain and sender objects are the same as the previous example
let extension = signatureToWeb3Extension(chain, sender, signature)

// Create the txRaw
let rawTx = createTxRawEIP712(msg.legacyAmino.body, msg.legacyAmino.authInfo, extension)

// Broadcast it
const postOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: generatePostBodyBroadcast(rawTx),
};

let broadcastPost = await fetch(
    `http://localhost:1317${generateEndpointBroadcast()}`,
    postOptions
);
let response = await broadcastPost.json();
```

### Signing with Keplr

```ts
 // Follow the previous step to generate the msg object
 import { createTxRaw } from '@astradefi/proto'
 import {
   generateEndpointBroadcast,
   generatePostBodyBroadcast,
 } from '@astradefi/provider'
 let sign = await window?.keplr?.signDirect(
   chain.cosmosChainId,
   sender.accountAddress,
   {
     bodyBytes: msg.signDirect.body.serializeBinary(),
     authInfoBytes: msg.signDirect.authInfo.serializeBinary(),
     chainId: chain.cosmosChainId,
     accountNumber: new Long(sender.accountNumber),
   },
   // @ts-expect-error the types are not updated on Keplr side
   { isEthereum: true },
 )
 if (sign !== undefined) {
   let rawTx = createTxRaw(sign.signed.bodyBytes, sign.signed.authInfoBytes, [
     new Uint8Array(Buffer.from(sign.signature.signature, 'base64')),
   ])
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
 }
 ```

## TODO

- Add docs and examples to all the packages.
- Add more cosmos messages
