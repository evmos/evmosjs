# Stargate

Use `Stargate` to query for client accounts and sign Evmos payloads.

### Decode Ethermint Accounts

Create a custom `accountParser` to decode Ethermint type accounts
from `Stargate` client queries.

```ts
import { decodeEthermintAccount } from '@evmos/proto';
import { StargateClient, accountFromAny } from '@cosmjs/stargate';

const accountParser = (account: any) => {
  try {
    return decodeEthermintAccount(account);
  } catch {
    return accountFromAny(account);
  }
}

// Initialize the StargateClient with this registry.
const options = { accountParser: accountParser };

// See the list of gRPC node endpoints here:
// 'https://docs.evmos.org/develop/api/networks'
const endpoint = 'https://tendermint.bd.evmos.org:26657';

export const queryClient = async () => {
  const client = await StargateClient.connect(endpoint, options);

  // Query logic goes here...
  const account = await client.getAccount(<your address>);
  console.log(account)
}
```

### Sign Payloads

To enable users to sign Evmos transactions using the `StargateSigningClient`,
be sure its `OfflineSigner` parameter supports Ethereum-style signing.
In particular, note that we use the `keccak256` hash over `sha256` (the rest
is identical).

By default, `StargateSigningClient` will work with
[Keplr](https://wallet.keplr.app/)'s offline signer for Evmos, but note that
it may not work with other Cosmos signing solutions without modification.
