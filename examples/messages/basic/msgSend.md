# Message Send

Send coins to another wallet

```ts
import { Wallet } from "@ethersproject/wallet"
import { createMessageSend } from '@astradefi/transactions"
import { broadcast, getSender, LOCALNET_CHAIN, LOCALNET_FEE, signTransaction, singTransactionUsingEIP712 } from "@hanchon/evmos-ts-wallet"

async function prepareMessage(wallet: Wallet) {
  const sender = await getSender(wallet)
  const txSimple = createMessageSend(
    LOCALNET_CHAIN,
    sender,
    LOCALNET_FEE,
    '',
    {
      destinationAddress: 'evmos1pmk2r32ssqwps42y3c9d4clqlca403yd9wymgr',
      amount: '1',
      denom: 'aevmos',
    },
  )
  return { sender, txSimple }
}

(async () => {
  const privateMnemonic =
    'pluck view carry maid bamboo river major where dutch wood certain oval order wise awkward clerk adult summer because number raven coil crunch hat'
  const wallet = Wallet.fromMnemonic(privateMnemonic)

  const msgKeplr = await prepareMessage(wallet)

  const resKeplr = await signTransaction(wallet, msgKeplr.txSimple)
  const broadcastRes = await broadcast(resKeplr)

  if (broadcastRes.tx_response.code === 0) {
    console.log('Success sign transaction')
  } else {
    console.log(`Error payload signature: ${broadcastRes}`)
  }
})()
```
