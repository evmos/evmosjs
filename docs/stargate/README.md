# Stargate

See the following in order to use `Stargate` to query for client accounts.
Since Evmos uses Ethereum-style signing (using the `keccak256` hash),
`StargateSigningClient` cannot be used with Evmos.

### Parse Ethermint Accounts

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
