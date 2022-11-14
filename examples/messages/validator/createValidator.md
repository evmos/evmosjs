# Create validator

This is an example of how to use the current implementation of createValidator.
This will be included in a function named `createMsgCreateValidator` as soon as Evmos supports EIP712 encoding for this message.

```ty
import { ethToEvmos, evmosToEth } from "@tharsis/address-converter";
import {
  createTransactionWithMultipleMessages,
  createMsgSend as protoMsgSend,
  createMsgDelegate as protoMsgDelegate,
  createMsgCreateValidator as protoMsgCreateValidator,
} from "@evmos/proto";
import { Wallet } from "@ethersproject/wallet";
import {
  broadcast,
  getSender,
  signTransaction,
  LOCALNET_CHAIN,
  LOCALNET_FEE,
  singTransactionUsingEIP712,
} from "@hanchon/evmos-ts-wallet";
import {
  createEIP712,
  createMsgSend,
  generateFee,
  generateMessageWithMultipleTransactions,
  generateTypes,
  MSG_SEND_TYPES,
  createMsgDelegate,
  MSG_DELEGATE_TYPES,
  createMsgCreateValidator,
  MSG_CREATE_VALIDATOR_TYPES,
} from "@evmos/eip712";

async function prepareTx(wallet: Wallet) {
  const fee = LOCALNET_FEE;
  fee.gas = "3000000";
  fee.amount = "300000";
  const sender = await getSender(wallet, "http://localhost:1317");
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress
  );

  var types = generateTypes(MSG_CREATE_VALIDATOR_TYPES);
  const msgs: any[] = [];

  var pubkey = wallet.publicKey.split("0x")[1];
  var ba64 = Buffer.from(pubkey, "hex").toString("base64");

  const max = "0.400000000000000000";
  const change = "0.000000000000000001";
  const rate = "0.100000000000000000";

  const valPubkey = "BM7KLPmJUCwDUWmPD6nhxFSrUK7ykZ0wbydKmzYBgGA=";

  msgs.push(
    createMsgCreateValidator(
      {
        moniker: "qwe",
        identity: "asd",
        website: "asd",
        securityContact: "zxc",
        details: " tyu",
      },
      {
        rate: rate,
        maxChangeRate: change,
        maxRate: max,
      },
      "100000000000000000",
      sender.accountAddress,
      "evmosvaloper14rajuselkxsvqtqv20lamd08t8zxg8qdw3r3xm",
      "100000000000000000",
      "aevmos",
      valPubkey
    )
  );

  const messages = generateMessageWithMultipleTransactions(
    sender.accountNumber.toString(),
    sender.sequence.toString(),
    LOCALNET_CHAIN.cosmosChainId,
    "",
    feeObject,
    msgs
  );

  const eipToSign = createEIP712(types, LOCALNET_CHAIN.chainId, messages);
  const protoMsgs: any[] = [];

  protoMsgs.push(
    protoMsgCreateValidator(
      {
        moniker: "qwe",
        identity: "asd",
        website: "asd",
        securityContact: "zxc",
        details: " tyu",
      },
      {
        maxChangeRate: "1",
        rate: "100000000000000000",
        maxRate: "400000000000000000",
      },
      "100000000000000000",
      sender.accountAddress,
      "evmosvaloper14rajuselkxsvqtqv20lamd08t8zxg8qdw3r3xm",
      "100000000000000000",
      "aevmos",
      valPubkey
    )
  );

  const tx = createTransactionWithMultipleMessages(
    protoMsgs,
    "",
    fee.amount,
    fee.denom,
    parseInt(fee.gas, 10),
    "ethsecp256",
    sender.pubkey,
    sender.sequence,
    sender.accountNumber,
    LOCALNET_CHAIN.cosmosChainId
  );

  return {
    sender,
    txSimple: {
      signDirect: tx.signDirect,
      legacyAmino: tx.legacyAmino,
      eipToSign,
    },
  };
}

(async () => {
  const seed =
    "pluck view carry maid bamboo river major where dutch wood certain oval order wise awkward clerk adult summer because number raven coil crunch hat";
  const wallet = Wallet.fromMnemonic(seed);

  const msgMM = await prepareTx(wallet);
  const resMM = await singTransactionUsingEIP712(
    wallet,
    msgMM.sender.accountAddress,
    msgMM.txSimple
  );

  const broadcastRes = await broadcast(resMM, "http://localhost:1317");

  if (broadcastRes.tx_response.code === 0) {
    console.log("Success sign transaction");
  } else {
    console.log(`Error payload signature: ${JSON.stringify(broadcastRes)}`);
  }
})();
```
