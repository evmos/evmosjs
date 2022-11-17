# Create and Clawback example

```ts
import { Wallet } from '@ethersproject/wallet'
import {
  broadcast,
  getSender,
  LOCALNET_CHAIN,
  LOCALNET_FEE,
  singTransactionUsingEIP712,
} from '@hanchon/evmos-ts-wallet'
import { transactions } from '@astradefi/astrajs'
;(async () => {
  const privateMnemonic =
    'pluck view carry maid bamboo river major where dutch wood certain oval order wise awkward clerk adult summer because number raven coil crunch hat'
  const wallet = Wallet.fromMnemonic(privateMnemonic)
  const sender = await getSender(wallet, 'http://localhost:1317')
  const paramsCreate: transactions.MessageMsgCreateClawbackVestingAccount = {
    fromAddress: sender.accountAddress,
    toAddress: 'astra14rajuselkxsvqtqv20lamd08t8zxg8qdz5sv9j',
    startTime: 1668177767,
    lockupPeriods: [
      { length: 10, amount: [{ denom: 'aastra', amount: '1000' }] },
    ],
    vestingPeriods: [
      { length: 20, amount: [{ denom: 'aastra', amount: '250' }] },
      { length: 20, amount: [{ denom: 'aastra', amount: '250' }] },
      { length: 20, amount: [{ denom: 'aastra', amount: '250' }] },
      { length: 20, amount: [{ denom: 'aastra', amount: '250' }] },
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
    accountAddress: 'astra14rajuselkxsvqtqv20lamd08t8zxg8qdz5sv9j',
    destAddress: 'astra19u6ft0g0zldkdewd8t76s2tftzpezly7gx7x7h',
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
