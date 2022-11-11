# Create and Clawback example

NOTE: it requires the [PR](https://github.com/evmos/evmos/pull/1070) merged to be able to sign with eip712. Signing with Keplr/Protobuf is supported on all the evmos versions.

```ts
import { Wallet } from '@ethersproject/wallet'
import {
  broadcast,
  getSender,
  LOCALNET_CHAIN,
  LOCALNET_FEE,
  singTransactionUsingEIP712,
} from '@hanchon/evmos-ts-wallet'
import { transactions } from 'evmosjs'
;(async () => {
  const privateMnemonic =
    'pluck view carry maid bamboo river major where dutch wood certain oval order wise awkward clerk adult summer because number raven coil crunch hat'
  const wallet = Wallet.fromMnemonic(privateMnemonic)
  const sender = await getSender(wallet, 'http://localhost:1317')

  const paramsCreate: transactions.MessageMsgCreateClawbackVestingAccount = {
    fromAddress: sender.accountAddress,
    toAddress: 'evmos1vs6w9aq4ahv423g2zuzavk0x3xrrf6m389g6d2',
    startTime: 1668177767,
    lockupPeriods: [
      { length: 10, amount: [{ denom: 'aevmos', amount: '1000' }] },
    ],
    vestingPeriods: [
      { length: 20, amount: [{ denom: 'aevmos', amount: '250' }] },
      { length: 20, amount: [{ denom: 'aevmos', amount: '250' }] },
      { length: 20, amount: [{ denom: 'aevmos', amount: '250' }] },
      { length: 20, amount: [{ denom: 'aevmos', amount: '250' }] },
    ],
    merge: true,
  }

  // CREATE
  const txCreate = transactions.createTxCreateClawbackVestingAccount(
    LOCALNET_CHAIN,
    sender,
    LOCALNET_FEE,
    '',
    paramsCreate,
  )

  console.log(JSON.stringify(txCreate.eipToSign))

  const sigCreate = await singTransactionUsingEIP712(
    wallet,
    sender.accountAddress,
    txCreate,
  )
  if (false) {
    const broadcastResCreate = await broadcast(
      sigCreate,
      'http://localhost:1317',
    )

    if (broadcastResCreate.tx_response.code === 0) {
      console.log('Success sign transaction')
    } else {
      console.log(
        `Error payload signature: ${JSON.stringify(broadcastResCreate)}`,
      )
    }
  }

  const paramsClawback: transactions.MessageMsgClawback = {
    funderAddress: sender.accountAddress,
    accountAddress: 'evmos1vs6w9aq4ahv423g2zuzavk0x3xrrf6m389g6d2',
    destAddress: 'evmos1vs6w9aq4ahv423g2zuzavk0x3xrrf6m389g6d2',
  }
  const tx = transactions.createTxMsgClawback(
    LOCALNET_CHAIN,
    sender,
    LOCALNET_FEE,
    '',
    paramsClawback,
  )

  const sig = await singTransactionUsingEIP712(
    wallet,
    sender.accountAddress,
    tx,
  )
  const broadcastRes = await broadcast(sig, 'http://localhost:1317')

  if (broadcastRes.tx_response.code === 0) {
    console.log('Success sign transaction')
  } else {
    console.log(`Error payload signature: ${JSON.stringify(broadcastRes)}`)
  }
})()
```
