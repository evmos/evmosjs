# evmosjs

JS and TS libs for Evmos

## Example

### Get account information

Get the account number, sequence and pubkey from an address.
NOTE: if the address had not sent any transaction to the blockchain, the pubkey value are going to be empty.

```ts
import { ethToEvmos } from '@tharsis/address-converter';
import { generateEndpointAccount } from '@tharsis/provider';

const sender = 'evmos1...'
let destination = '0x....'
// The address must be bech32 encoded
if (destination.split('0x').length == 2) {
    destination = ethToEvmos(destination)
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

// Response format at @tharsis/provider/rest/account/AccountResponse
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
import { createMessageSend } from '@tharsis/transactions'

const chain = {
    chainId: 9000,
    cosmosChainId: 'evmos_9000-1',
}

const sender = {
    accountAddress: 'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm',
    sequence: 1,
    accountNumber: 9,
    pubkey: 'AgTw+4v0daIrxsNSW4FcQ+IoingPseFwHO1DnssyoOqZ',
}

const fee = {
    amount: '20',
    denom: 'aevmos',
    gas: '200000',
}

const memo = ''

const params = {
    destinationAddress: 'evmos1pmk2r32ssqwps42y3c9d4clqlca403yd9wymgr',
    amount: '1',
    denom: 'aevmos',
}

const msg = createMessageSend(chain, sender, fee, memo, params)

// msg.signDirect is the transaction in Keplr format
// msg.legacyAmino is the transaction with legacy amino
// msg.eipToSign is the EIP712 data to sign with metamask

```

### Signing with Metamask

After creating the transaction we need to send the payload to metamask so it can be signed. With that signature we are going to add a Web3Extension to the Cosmos Transactions and broadcast it to the Evmos node.

```ts
// Follow the previous step to generate the msg object
import { evmosToEth } from '@tharsis/address-converter'
import { generateEndpointBroadcast, generatePostBodyBroadcast } from '@tharsis/provider'
import { createTxRawEIP712, signatureToWeb3Extension } from '@tharsis/transactions'

// Init Metamask
await window.ethereum.enable();

// Request the signature
let signature = await window.ethereum.request({
    method: 'eth_signTypedData_v4',
    params: [evmosToEth(sender.accountAddress), JSON.stringify(msg.eipToSign)],
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

TODO: after the keplr release for chain type `60`

## TODO

- Add docs and examples to all the packages.
- Add more cosmos messages
