# Edit validator

NOTE: current EIP712 implementation doesn't support optional parameters, the `min-self-delegation` parameter should be modified to be bigger than before if you are signing with EIP712, the `commission_rate` can be set the same as the current value.

## Create a validator

```sh
evmosd keys add --recover validator --keyring-backend=test
pluck view carry maid bamboo river major where dutch wood certain oval order wise awkward clerk adult summer because number raven coil crunch hat

evmosd tx bank send mykey evmos14rajuselkxsvqtqv20lamd08t8zxg8qdrlvp8x 100evmos --keyring-backend test --fees=20aevmos

evmosd tx staking create-validator \
  --amount=1000000000000aevmos \
  --pubkey='{"@type":"/cosmos.crypto.ed25519.PubKey","key":"3YAmZANy26ad4otlglkx6sj1zIP8pCDQT8p5Rz4TGu4="}' \
  --moniker="ValidatorTest" \
  --chain-id="evmos_9000-1" \
  --commission-rate="0.05" \
  --commission-max-rate="0.20" \
  --commission-max-change-rate="0.01" \
  --min-self-delegation="1000000" \
  --gas-prices="0.025aevmos" \
  --gas="600000" \
  --from=validator \
  --keyring-backend=test \
  -b block
```

## Example

NOTE: it will only work with signTransaction, right now the eip712 doesn't support optional parameters and I need to double check the `sdk.Dec` EIP712 encoding to make sure that it's correctly supported.

```ts
import { Wallet } from "@ethersproject/wallet"
import { createMessageSend } from '@astradefi/transactions"
import { broadcast, getSender, LOCALNET_CHAIN, LOCALNET_FEE, signTransaction, singTransactionUsingEIP712 } from "@hanchon/evmos-ts-wallet"

async function prepareMessage(wallet: Wallet) {
  const sender = await getSender(wallet)
  const validatorAddress = 'evmosvaloper14rajuselkxsvqtqv20lamd08t8zxg8qdw3r3xm'

  const txSimple = createTxMsgEditValidator(LOCALNET_CHAIN, sender, LOCALNET_FEE, '', {
    moniker: 'a',
    identity: 'b',
    website: 'c',
    securityContact: 'd',
    details: 'e',
    validatorAddress: validatorAddress,
    commissionRate: undefined,
    minSelfDelegation: undefined
  })
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
