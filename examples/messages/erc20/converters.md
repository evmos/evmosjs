# ConvertCoin & ConvertERC20

```ts
/* eslint-disable import/no-extraneous-dependencies */
// This dependency is local to the utils project
import { evmosToEth } from '@tharsis/address-converter'
import { Wallet } from '@ethersproject/wallet'
import { createTxMsgConvertCoin, createTxMsgConvertERC20 } from '@tharsis/transactions'
import {
  broadcast,
  getSender,
  signTransaction,
  LOCALNET_CHAIN,
  LOCALNET_FEE,
} from '@hanchon/evmos-ts-wallet'

async function prepareMessageConvertCoin(wallet: Wallet) {
  const fee = LOCALNET_FEE
  fee.gas = '3000000'
  fee.amount = '300000'

  const sender = await getSender(wallet, 'http://localhost:1317')
  const txSimple = createTxMsgConvertCoin(LOCALNET_CHAIN, sender, fee, '', {
    denom: 'erc20/0xC7f37A81cE8F11955051E176A15954Fc4777A51B',
    amount: '1',
    receiverHexFormatted: evmosToEth(sender.accountAddress),
    senderEvmosFormatted: sender.accountAddress,
  })
  return { sender, txSimple }
}

async function prepareMessageConvertERC20(wallet: Wallet) {
  const fee = LOCALNET_FEE
  fee.gas = '3000000'
  fee.amount = '300000'

  const sender = await getSender(wallet, 'http://localhost:1317')
  const txSimple = createTxMsgConvertERC20(LOCALNET_CHAIN, sender, fee, '', {
    contract_address: '0xC7f37A81cE8F11955051E176A15954Fc4777A51B',
    amount: '1',
    receiverEvmosFormatted: sender.accountAddress,
    senderHexFormatted: evmosToEth(sender.accountAddress),
  })
  return { sender, txSimple }
}

/* eslint-disable jest/require-hook */
// This code is just for testing purposes

; (async () => {
  const privateMnemonic =
    'pluck view carry maid bamboo river major where dutch wood certain oval order wise awkward clerk adult summer because number raven coil crunch hat'
  const wallet = Wallet.fromMnemonic(privateMnemonic)

  // You can use prepareMessageConvertERC20 here
  const msgKeplr = await prepareMessageConvertCoin(wallet)


  const resKeplr = await signTransaction(wallet, msgKeplr.txSimple)
  const broadcastRes = await broadcast(resKeplr, 'http://localhost:1317')

  if (broadcastRes.tx_response.code === 0) {
    console.log('Success sign transaction')
  } else {
    console.log(`Error payload signature: ${JSON.stringify(broadcastRes)}`)
  }
})()
```
