# Message Send with Eip712

Send coins to another wallet and check wallet balance

```ts
import { ethToEvmos } from '@evmos/address-converter'
import { Wallet } from '@ethersproject/wallet'
import { getSender, MAINNET_CHAIN, MAINNET_FEE, broadcast,  singTransactionUsingEIP712 } from '@hanchon/evmos-ts-wallet'
import { createMessageSend, MessageSendParams, Sender} from '@evmos/transactions'

// CONSTANTS
const privateKey = "pluck view carry maid bamboo river major where dutch wood certain oval order wise awkward clerk adult summer because number raven coil crunch hat"
const url = 'https://rest.bd.evmos.org:1317'
const urlBalance = 'https://rest.bd.evmos.org:1317/cosmos/bank/v1beta1/balances/'


async function fetchGet(route: string){
    try {
        const request = await fetch(route)
        if (request.status !== 200){
            return "0"
        }
        const response = await request.json()
        return response
    } catch (e) {
        console.log(e);
        console.error("Error calling fetch GET: " + e);
        return "0";
    }
}

async function getWalletBalance (wallet: string, urlBalance: string): Promise<string> {
    // given a wallet, it returns the balances and pagination
    const requestUrl = urlBalance + wallet
    let response = await fetchGet(requestUrl)
    // if there was an error
    if (response === "0"){
        return "0"
    }

    const balances = response.balances

    if (balances.length !== 0){
        return balances[0].amount
    }else {
        return "0"
    }
}

async function signAndBroadcastTx(wallet: Wallet, sender: Sender, url: string) {
    const params: MessageSendParams = {
        destinationAddress: 'evmos1pmk2r32ssqwps42y3c9d4clqlca403yd9wymgr',
        amount: '1',
        denom: 'aevmos',
    }
    let fee = MAINNET_FEE
    // the fee amount it has to be bigger than the gas
    fee.gas = "150000"
    fee.amount = '3000000000000000'

    // create the message
    const message = createMessageSend(MAINNET_CHAIN, sender, MAINNET_FEE, 'message', params)
    // sign the tx
    let txBody = await singTransactionUsingEIP712(wallet, sender.accountAddress, message, MAINNET_CHAIN)
    // broadcast the tx signed
    await broadcast(txBody, url)
}

async function main(){
    // create a wallet using the private keys
    const wallet = Wallet.fromMnemonic(privateKey)
    // For sending txns it's needed: accountNumber, sequence, pubkey
    const sender = await getSender(wallet, url)
    /*  getSender: returns the accountAddress, the sequence,
        the accountNumber and the pubkey
        If the pubkey is not created, it has a method that 'creates' it
    */
    await signAndBroadcastTx(wallet, sender, url)
    await getWalletBalance(sender.accountAddress, urlBalance)
}

main()
