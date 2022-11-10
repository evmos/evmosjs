# Set withdraw address

## Example

```ts
import { createTxMsgSetWithdrawAddress } from "@evmos/transactions";

// This dependency is local to the utils project
import { evmosToEth } from "@evmos/address-converter";
import { Wallet } from "@ethersproject/wallet";
import {
createTxMsgConvertCoin,
createTxMsgConvertERC20,
} from "@evmos/transactions";
import {
broadcast,
getSender,
singTransactionUsingEIP712,
LOCALNET_CHAIN,
LOCALNET_FEE,
} from "@hanchon/evmos-ts-wallet";

async function prepareMsg(wallet: Wallet) {
const fee = LOCALNET_FEE;
fee.gas = "3000000";
fee.amount = "300000";

const sender = await getSender(wallet, "http://localhost:1317");
const txSimple = createTxMsgSetWithdrawAddress(
LOCALNET_CHAIN,
sender,
fee,
"",
{
delegatorAddress: "evmos12nml2w93uva0smjw3c36stczfay0k67ny94ecz",
withdrawAddress: "evmos1qrteqz682d36ev6qnarutn7t4wj9zk20cqdj8w",
}
);
return { sender, txSimple };
}

(async () => {
const privateMnemonic =
"enlist jar utility clog satoshi advance worth hundred style lemon know faith quick wedding decline vital broom approve patrol history dinosaur area kangaroo cereal";
const wallet = Wallet.fromMnemonic(privateMnemonic);

const { sender, txSimple } = await prepareMsg(wallet);
/_
const resKeplr = await signTransaction(wallet, msgKeplr.txSimple);
const broadcastRes = await broadcast(resKeplr, "http://localhost:1317");
_/

const res = await singTransactionUsingEIP712(
wallet,
sender.accountAddress,
txSimple
);
const broadcastRes = await broadcast(res, "http://localhost:1317");
if (broadcastRes.tx_response.code === 0) {
console.log("Success sign transaction");
} else {
console.log(`Error payload signature: ${JSON.stringify(broadcastRes)}`);
}
})();
```
