## Overview

evmos and cometbft provide many interfaces for us to query information about the chain. However, unfortunately, evmosjs does not implement these interfaces in the provider package. In actual business scenarios, when these interfaces are needed, they are individually encapsulated. To solve the above problem, the `packages/provider/src/rest/cometbft.ts` file in evmosjs implements the related request interfaces of cometbft, and the `packages/provider/src/rest/app.ts` file implements the related request interfaces of evmos.

To be able to use both in Node.js and browsers, axios is used as the underlying network library.

## Usage and Examples

Below is a simple code example that demonstrates how to use the provider package in evmosjs to query information about the evmos chain.

```javascript
import { App, Cometbft } from '@evmos/provider'

const main = async () => {
  let data

  // Find node urls for either mainnet or testnet here:
  // https://docs.evmos.org/develop/api/networks.
  const cbft = new Cometbft({ baseURL: 'http://127.0.0.1:26657' })
  const app = new App({ baseURL: 'http://127.0.0.1:1317' })
  const address = 'evmos1qqqqhe5pnaq5qq39wqkn957aydnrm45sdn8583'

  {
    // query block info
    data = await cbft.block({ height: 1 })
    console.log('block = ', data)
  }

  {
    // query accounts
    data = await app.auth.accounts({
      'pagination.count_total': true,
      'pagination.limit': 3,
    })
    console.log('accounts = ', data)
  }

  {
    // query account balances
    data = await app.bank.allBalances(address, {
      'pagination.limit': 10,
    })
    console.log(`${address} all balances = `, data)
  }

  try {
    // a invalid query tendminter block for error
    data = await cbft.block({ height: -1 })
  } catch (error) {
    console.log('cbft.block error = ', error)
  }

  try {
    // a invalid query account balances for error
    data = await app.bank.allBalances(address + 'ERROR', {
      'pagination.limit': 10,
    })
  } catch (error) {
    console.log('app.bank.allBalances error = ', error)
  }

  try {
    const errBaseUrlApp = new App({ baseURL: 'http://127.0.0.1:12345' })
    await errBaseUrlApp.bank.allBalances(address, {
      'pagination.limit': 10,
    })
  } catch (error) {
    console.log('err base url app error = ', error)
  }

  try {
    const errBaseUrlCbft = new Cometbft({ baseURL: 'http://127.0.0.1:23456' })
    await errBaseUrlCbft.block({ height: 1 })
  } catch (error) {
    console.log('err base url cometbft error = ', error)
  }
}

main()
  .then()
  .catch((err) => console.error('main error = ', err))
```

If the returned data is correct, you can directly retrieve the values from the returned `Object`. For example, if the data returned by `bank.allBalances` is as follows:

```json
{
  balances: [
    { denom: 'aevmos', amount: '1000000000000000000000' }
  ],
  pagination: { next_key: null, total: '0' }
}
```

If the returned data is an error, the evmos declares the error data as follows:

```javascript
export interface GrpcGatewayRuntimeError {
  error?: string
  /** @format int32 */
  code?: number
  message?: string
  details?: GoogleProtobufAny[]
}
```

Cometbft declares the error data as follows：

```jsx
/** Error Response RPC */
export type ErrorResponseRPC = {
  /** @example "Description of failure" */
  code?: number
  message?: string
  data?: string
}
```

## Evmos RPC

**Note: To solve the problem of function name conflicts, such as both auth module and bank have the params interface, we will place all query interfaces under their respective modules.**

### **auth.accountInfo**

#### GET

##### Summary

AccountInfo queries account info which is common to all account types.

##### Description

Since: cosmos-sdk 0.47

##### Parameters

| Name    | Located in | Description                            | Required | Schema |
| ------- | ---------- | -------------------------------------- | -------- | ------ |
| address | path       | address is the account address string. | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                        |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.auth.v1beta1.QueryAccountInfoResponse](#cosmos.auth.v1beta1.QueryAccountInfoResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                     |

### **auth.accounts**

#### GET

##### Summary

Accounts returns all the existing accounts.

##### Description

When called from another module, this query might consume a high amount of
gas if the pagination field is incorrectly set.

Since: cosmos-sdk 0.43

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                  |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.auth.v1beta1.QueryAccountsResponse](#cosmos.auth.v1beta1.QueryAccountsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                               |

### **auth.account**

#### GET

##### Summary

Account returns account details based on address.

##### Parameters

| Name    | Located in | Description                               | Required | Schema |
| ------- | ---------- | ----------------------------------------- | -------- | ------ |
| address | path       | address defines the address to query for. | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.auth.v1beta1.QueryAccountResponse](#cosmos.auth.v1beta1.QueryAccountResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                             |

### **auth.accountAddressByID**

#### GET

##### Summary

AccountAddressByID returns account address based on account number.

##### Description

Since: cosmos-sdk 0.46.2

##### Parameters

| Name       | Located in | Description                                                                                                                                                                                                                       | Required | Schema          |
| ---------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| id         | path       | Deprecated, use account_id instead  id is the account number of the address to be queried. This field should have been an uint64 (like all account numbers), and will be updated to uint64 in a future version of the auth query. | Yes      | string (int64)  |
| account_id | query      | account_id is the account number of the address to be queried.  Since: cosmos-sdk 0.47                                                                                                                                            | No       | string (uint64) |

##### Responses

| Code    | Description                   | Schema                                                                                                      |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.auth.v1beta1.QueryAccountAddressByIDResponse](#cosmos.auth.v1beta1.QueryAccountAddressByIDResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                   |

### **auth.bech32Prefix**

#### GET

##### Summary

Bech32Prefix queries bech32Prefix

##### Description

Since: cosmos-sdk 0.46

##### Responses

| Code    | Description                   | Schema                                                                                |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.auth.v1beta1.Bech32PrefixResponse](#cosmos.auth.v1beta1.Bech32PrefixResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                             |

### **auth.addressBytesToString**

#### GET

##### Summary

AddressBytesToString converts Account Address bytes to string

##### Description

Since: cosmos-sdk 0.46

##### Parameters

| Name          | Located in | Description | Required | Schema |
| ------------- | ---------- | ----------- | -------- | ------ |
| address_bytes | path       |             | Yes      | byte   |

##### Responses

| Code    | Description                   | Schema                                                                                                |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.auth.v1beta1.AddressBytesToStringResponse](#cosmos.auth.v1beta1.AddressBytesToStringResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                             |

### **auth.addressStringToBytes**

#### GET

##### Summary

AddressStringToBytes converts Address string to bytes

##### Description

Since: cosmos-sdk 0.46

##### Parameters

| Name           | Located in | Description | Required | Schema |
| -------------- | ---------- | ----------- | -------- | ------ |
| address_string | path       |             | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                                |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.auth.v1beta1.AddressStringToBytesResponse](#cosmos.auth.v1beta1.AddressStringToBytesResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                             |

### **auth.moduleAccounts**

#### GET

##### Summary

ModuleAccounts returns all the existing module accounts.

##### Description

Since: cosmos-sdk 0.46

##### Responses

| Code    | Description                   | Schema                                                                                              |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.auth.v1beta1.QueryModuleAccountsResponse](#cosmos.auth.v1beta1.QueryModuleAccountsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                           |

### **auth.moduleAccountByName**

#### GET

##### Summary

ModuleAccountByName returns the module account info by module name

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| name | path       |             | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                                        |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.auth.v1beta1.QueryModuleAccountByNameResponse](#cosmos.auth.v1beta1.QueryModuleAccountByNameResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                     |

### **auth.params**

#### GET

##### Summary

Params queries all parameters.

##### Responses

| Code    | Description                   | Schema                                                                              |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.auth.v1beta1.QueryParamsResponse](#cosmos.auth.v1beta1.QueryParamsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                           |

### **authz.grants**

#### GET

##### Summary

Returns list of `Authorization`, granted to the grantee by the granter.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| granter                | query      |                                                                                                                                                                                                                                    | No       | string          |
| grantee                | query      |                                                                                                                                                                                                                                    | No       | string          |
| msg_type_url           | query      | Optional, msg_type_url, when set, will query only grants matching given msg type.                                                                                                                                                  | No       | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.authz.v1beta1.QueryGrantsResponse](#cosmos.authz.v1beta1.QueryGrantsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                             |

### **authz.granteeGrants**

#### GET

##### Summary

GranteeGrants returns a list of `GrantAuthorization` by grantee.

##### Description

Since: cosmos-sdk 0.46

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| grantee                | path       |                                                                                                                                                                                                                                    | Yes      | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                              |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.authz.v1beta1.QueryGranteeGrantsResponse](#cosmos.authz.v1beta1.QueryGranteeGrantsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                           |

### **authz.granterGrants**

#### GET

##### Summary

GranterGrants returns list of `GrantAuthorization`, granted by granter.

##### Description

Since: cosmos-sdk 0.46

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| granter                | path       |                                                                                                                                                                                                                                    | Yes      | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                              |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.authz.v1beta1.QueryGranterGrantsResponse](#cosmos.authz.v1beta1.QueryGranterGrantsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                           |

### **bank.allBalances**

#### GET

##### Summary

AllBalances queries the balance of all coins for a single account.

##### Description

When called from another module, this query might consume a high amount of
gas if the pagination field is incorrectly set.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| address                | path       | address is the address to query balances for.                                                                                                                                                                                      | Yes      | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |
| resolve_denom          | query      | resolve_denom is the flag to resolve the denom into a human-readable form from the metadata.  Since: cosmos-sdk 0.50                                                                                                               | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                        |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.bank.v1beta1.QueryAllBalancesResponse](#cosmos.bank.v1beta1.QueryAllBalancesResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                     |

### **bank.balance**

#### GET

##### Summary

Balance queries the balance of a single coin for a single account.

##### Parameters

| Name    | Located in | Description                                    | Required | Schema |
| ------- | ---------- | ---------------------------------------------- | -------- | ------ |
| address | path       | address is the address to query balances for.  | Yes      | string |
| denom   | query      | denom is the coin denom to query balances for. | No       | string |

##### Responses

| Code    | Description                   | Schema                                                                                |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.bank.v1beta1.QueryBalanceResponse](#cosmos.bank.v1beta1.QueryBalanceResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                             |

### **bank.denomOwners**

#### GET

##### Summary

DenomOwners queries for all account addresses that own a particular token
denomination.

##### Description

When called from another module, this query might consume a high amount of
gas if the pagination field is incorrectly set.

Since: cosmos-sdk 0.46

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| denom                  | path       | denom defines the coin denomination to query all account holders for.                                                                                                                                                              | Yes      | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                        |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.bank.v1beta1.QueryDenomOwnersResponse](#cosmos.bank.v1beta1.QueryDenomOwnersResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                     |

### **bank.denomsMetadata**

#### GET

##### Summary

DenomsMetadata queries the client metadata for all registered coin
denominations.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                              |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.bank.v1beta1.QueryDenomsMetadataResponse](#cosmos.bank.v1beta1.QueryDenomsMetadataResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                           |

### **bank.denomMetadata**

#### GET

##### Summary

DenomsMetadata queries the client metadata of a given coin denomination.

##### Parameters

| Name  | Located in | Description                                        | Required | Schema |
| ----- | ---------- | -------------------------------------------------- | -------- | ------ |
| denom | path       | denom is the coin denom to query the metadata for. | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                            |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.bank.v1beta1.QueryDenomMetadataResponse](#cosmos.bank.v1beta1.QueryDenomMetadataResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                         |

### **bank.denomMetadataByQueryString**

#### GET

##### Summary

DenomsMetadata queries the client metadata of a given coin denomination.

##### Parameters

| Name  | Located in | Description                                        | Required | Schema |
| ----- | ---------- | -------------------------------------------------- | -------- | ------ |
| denom | query      | denom is the coin denom to query the metadata for. | No       | string |

##### Responses

| Code    | Description                   | Schema                                                                                                                      |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.bank.v1beta1.QueryDenomMetadataByQueryStringResponse](#cosmos.bank.v1beta1.QueryDenomMetadataByQueryStringResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                                   |

### **bank.params**

#### GET

##### Summary

Params queries the parameters of x/bank module.

##### Responses

| Code    | Description                   | Schema                                                                              |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.bank.v1beta1.QueryParamsResponse](#cosmos.bank.v1beta1.QueryParamsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                           |

### **bank.sendEnabled**

#### GET

##### Summary

SendEnabled queries for SendEnabled entries.

##### Description

This query only returns denominations that have specific SendEnabled settings.
Any denomination that does not have a specific setting will use the default
params.default_send_enabled, and will not be returned by this query.

Since: cosmos-sdk 0.47

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| denoms                 | query      | denoms is the specific denoms you want look up. Leave empty to get all entries.                                                                                                                                                    | No       | [ string ]      |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                        |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.bank.v1beta1.QuerySendEnabledResponse](#cosmos.bank.v1beta1.QuerySendEnabledResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                     |

### **bank.spendableBalances**

#### GET

##### Summary

SpendableBalances queries the spendable balance of all coins for a single
account.

##### Description

When called from another module, this query might consume a high amount of
gas if the pagination field is incorrectly set.

Since: cosmos-sdk 0.46

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| address                | path       | address is the address to query spendable balances for.                                                                                                                                                                            | Yes      | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                                    |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.bank.v1beta1.QuerySpendableBalancesResponse](#cosmos.bank.v1beta1.QuerySpendableBalancesResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                 |

### **bank.spendableBalanceByDenom**

#### GET

##### Summary

SpendableBalanceByDenom queries the spendable balance of a single denom for
a single account.

##### Description

When called from another module, this query might consume a high amount of
gas if the pagination field is incorrectly set.

Since: cosmos-sdk 0.47

##### Parameters

| Name    | Located in | Description                                    | Required | Schema |
| ------- | ---------- | ---------------------------------------------- | -------- | ------ |
| address | path       | address is the address to query balances for.  | Yes      | string |
| denom   | query      | denom is the coin denom to query balances for. | No       | string |

##### Responses

| Code    | Description                   | Schema                                                                                                                |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.bank.v1beta1.QuerySpendableBalanceByDenomResponse](#cosmos.bank.v1beta1.QuerySpendableBalanceByDenomResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                             |

### **bank.totalSupply**

#### GET

##### Summary

TotalSupply queries the total supply of all coins.

##### Description

When called from another module, this query might consume a high amount of
gas if the pagination field is incorrectly set.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                        |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.bank.v1beta1.QueryTotalSupplyResponse](#cosmos.bank.v1beta1.QueryTotalSupplyResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                     |

### **bank.supplyOf**

#### GET

##### Summary

SupplyOf queries the supply of a single coin.

##### Description

When called from another module, this query might consume a high amount of
gas if the pagination field is incorrectly set.

##### Parameters

| Name  | Located in | Description                                    | Required | Schema |
| ----- | ---------- | ---------------------------------------------- | -------- | ------ |
| denom | query      | denom is the coin denom to query balances for. | No       | string |

##### Responses

| Code    | Description                   | Schema                                                                                  |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.bank.v1beta1.QuerySupplyOfResponse](#cosmos.bank.v1beta1.QuerySupplyOfResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                               |

### **base.config**

#### GET

##### Summary

Config queries for the operator configuration.

##### Responses

| Code    | Description                   | Schema                                                                              |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.base.node.v1beta1.ConfigResponse](#cosmos.base.node.v1beta1.ConfigResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                           |

### **base.status**

#### GET

##### Summary

Status queries for the node status.

##### Responses

| Code    | Description                   | Schema                                                                              |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.base.node.v1beta1.StatusResponse](#cosmos.base.node.v1beta1.StatusResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                           |

### **base.aBCIQuery**

#### GET

##### Summary

ABCIQuery defines a query handler that supports ABCI queries directly to the
application, bypassing Cometbft completely. The ABCI query must contain
a valid and supported path, including app, custom, p2p, and store.

##### Description

Since: cosmos-sdk 0.46

##### Parameters

| Name   | Located in | Description | Required | Schema         |
| ------ | ---------- | ----------- | -------- | -------------- |
| data   | query      |             | No       | byte           |
| path   | query      |             | No       | string         |
| height | query      |             | No       | string (int64) |
| prove  | query      |             | No       | boolean        |

##### Responses

| Code    | Description                   | Schema                                                                                                |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.base.tendermint.v1beta1.ABCIQueryResponse](#cosmos.base.tendermint.v1beta1.ABCIQueryResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                             |

### **base.getLatestBlock**

#### GET

##### Summary

GetLatestBlock returns the latest block.

##### Responses

| Code    | Description                   | Schema                                                                                                          |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.base.tendermint.v1beta1.GetLatestBlockResponse](#cosmos.base.tendermint.v1beta1.GetLatestBlockResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                       |

### **base.getBlockByHeight**

#### GET

##### Summary

GetBlockByHeight queries block for given height.

##### Parameters

| Name   | Located in | Description | Required | Schema         |
| ------ | ---------- | ----------- | -------- | -------------- |
| height | path       |             | Yes      | string (int64) |

##### Responses

| Code    | Description                   | Schema                                                                                                              |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.base.tendermint.v1beta1.GetBlockByHeightResponse](#cosmos.base.tendermint.v1beta1.GetBlockByHeightResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                           |

### **base.getNodeInfo**

#### GET

##### Summary

GetNodeInfo queries the current node info.

##### Responses

| Code    | Description                   | Schema                                                                                                    |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.base.tendermint.v1beta1.GetNodeInfoResponse](#cosmos.base.tendermint.v1beta1.GetNodeInfoResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                 |

### **base.getSyncing**

#### GET

##### Summary

GetSyncing queries node syncing.

##### Responses

| Code    | Description                   | Schema                                                                                                  |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.base.tendermint.v1beta1.GetSyncingResponse](#cosmos.base.tendermint.v1beta1.GetSyncingResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                               |

### **base.getLatestValidatorSet**

#### GET

##### Summary

GetLatestValidatorSet queries latest validator-set.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                                                        |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.base.tendermint.v1beta1.GetLatestValidatorSetResponse](#cosmos.base.tendermint.v1beta1.GetLatestValidatorSetResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                                     |

### **base.getValidatorSetByHeight**

#### GET

##### Summary

GetValidatorSetByHeight queries validator-set at a given height.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| height                 | path       |                                                                                                                                                                                                                                    | Yes      | string (int64)  |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                                                            |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.base.tendermint.v1beta1.GetValidatorSetByHeightResponse](#cosmos.base.tendermint.v1beta1.GetValidatorSetByHeightResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                                         |

### **circuit.accounts**

#### GET

##### Summary

Account returns account permissions.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                    |
| ------- | ----------------------------- | ------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.circuit.v1.AccountsResponse](#cosmos.circuit.v1.AccountsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                 |

### **circuit.account**

#### GET

##### Summary

Account returns account permissions.

##### Parameters

| Name    | Located in | Description | Required | Schema |
| ------- | ---------- | ----------- | -------- | ------ |
| address | path       |             | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                  |
| ------- | ----------------------------- | ----------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.circuit.v1.AccountResponse](#cosmos.circuit.v1.AccountResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)               |

### **circuit.disabledList**

#### GET

##### Summary

DisabledList returns a list of disabled message urls

##### Responses

| Code    | Description                   | Schema                                                                            |
| ------- | ----------------------------- | --------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.circuit.v1.DisabledListResponse](#cosmos.circuit.v1.DisabledListResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                         |

### **consensus.params**

#### GET

##### Summary

Params queries the parameters of x/consensus module.

##### Responses

| Code    | Description                   | Schema                                                                              |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.consensus.v1.QueryParamsResponse](#cosmos.consensus.v1.QueryParamsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                           |

### **distribution.communityPool**

#### GET

##### Summary

CommunityPool queries the community pool coins.

##### Responses

| Code    | Description                   | Schema                                                                                                            |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.distribution.v1beta1.QueryCommunityPoolResponse](#cosmos.distribution.v1beta1.QueryCommunityPoolResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                         |

### **distribution.delegationTotalRewards**

#### GET

##### Summary

DelegationTotalRewards queries the total rewards accrued by each
validator.

##### Parameters

| Name              | Located in | Description                                                   | Required | Schema |
| ----------------- | ---------- | ------------------------------------------------------------- | -------- | ------ |
| delegator_address | path       | delegator_address defines the delegator address to query for. | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                                                              |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.distribution.v1beta1.QueryDelegationTotalRewardsResponse](#cosmos.distribution.v1beta1.QueryDelegationTotalRewardsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                                           |

### **distribution.delegationRewards**

#### GET

##### Summary

DelegationRewards queries the total rewards accrued by a delegation.

##### Parameters

| Name              | Located in | Description                                                   | Required | Schema |
| ----------------- | ---------- | ------------------------------------------------------------- | -------- | ------ |
| delegator_address | path       | delegator_address defines the delegator address to query for. | Yes      | string |
| validator_address | path       | validator_address defines the validator address to query for. | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                                                    |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.distribution.v1beta1.QueryDelegationRewardsResponse](#cosmos.distribution.v1beta1.QueryDelegationRewardsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                                 |

### **distribution.delegatorValidators**

#### GET

##### Summary

DelegatorValidators queries the validators of a delegator.

##### Parameters

| Name              | Located in | Description                                                   | Required | Schema |
| ----------------- | ---------- | ------------------------------------------------------------- | -------- | ------ |
| delegator_address | path       | delegator_address defines the delegator address to query for. | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                                                        |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.distribution.v1beta1.QueryDelegatorValidatorsResponse](#cosmos.distribution.v1beta1.QueryDelegatorValidatorsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                                     |

### **distribution.delegatorWithdrawAddress**

#### GET

##### Summary

DelegatorWithdrawAddress queries withdraw address of a delegator.

##### Parameters

| Name              | Located in | Description                                                   | Required | Schema |
| ----------------- | ---------- | ------------------------------------------------------------- | -------- | ------ |
| delegator_address | path       | delegator_address defines the delegator address to query for. | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                                                                  |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.distribution.v1beta1.QueryDelegatorWithdrawAddressResponse](#cosmos.distribution.v1beta1.QueryDelegatorWithdrawAddressResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                                               |

### **distribution.params**

#### GET

##### Summary

Params queries params of the distribution module.

##### Responses

| Code    | Description                   | Schema                                                                                              |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.distribution.v1beta1.QueryParamsResponse](#cosmos.distribution.v1beta1.QueryParamsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                           |

### **distribution.validatorDistributionInfo**

#### GET

##### Summary

ValidatorDistributionInfo queries validator commission and self-delegation rewards for validator

##### Parameters

| Name              | Located in | Description                                                   | Required | Schema |
| ----------------- | ---------- | ------------------------------------------------------------- | -------- | ------ |
| validator_address | path       | validator_address defines the validator address to query for. | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                                                                    |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.distribution.v1beta1.QueryValidatorDistributionInfoResponse](#cosmos.distribution.v1beta1.QueryValidatorDistributionInfoResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                                                 |

### **distribution.validatorCommission**

#### GET

##### Summary

ValidatorCommission queries accumulated commission for a validator.

##### Parameters

| Name              | Located in | Description                                                   | Required | Schema |
| ----------------- | ---------- | ------------------------------------------------------------- | -------- | ------ |
| validator_address | path       | validator_address defines the validator address to query for. | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                                                        |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.distribution.v1beta1.QueryValidatorCommissionResponse](#cosmos.distribution.v1beta1.QueryValidatorCommissionResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                                     |

### **distribution.validatorOutstandingRewards**

#### GET

##### Summary

ValidatorOutstandingRewards queries rewards of a validator address.

##### Parameters

| Name              | Located in | Description                                                   | Required | Schema |
| ----------------- | ---------- | ------------------------------------------------------------- | -------- | ------ |
| validator_address | path       | validator_address defines the validator address to query for. | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                                                                        |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.distribution.v1beta1.QueryValidatorOutstandingRewardsResponse](#cosmos.distribution.v1beta1.QueryValidatorOutstandingRewardsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                                                     |

### **distribution.validatorSlashes**

#### GET

##### Summary

ValidatorSlashes queries slash events of a validator.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| validator_address      | path       | validator_address defines the validator address to query for.                                                                                                                                                                      | Yes      | string          |
| starting_height        | query      | starting_height defines the optional starting height to query the slashes.                                                                                                                                                         | No       | string (uint64) |
| ending_height          | query      | starting_height defines the optional ending height to query the slashes.                                                                                                                                                           | No       | string (uint64) |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                                                  |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.distribution.v1beta1.QueryValidatorSlashesResponse](#cosmos.distribution.v1beta1.QueryValidatorSlashesResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                               |

### **evidence.allEvidence**

#### GET

##### Summary

AllEvidence queries all evidence.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                                |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.evidence.v1beta1.QueryAllEvidenceResponse](#cosmos.evidence.v1beta1.QueryAllEvidenceResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                             |

### **evidence.evidence**

#### GET

##### Summary

Evidence queries evidence based on evidence hash.

##### Parameters

| Name          | Located in | Description                                                                                                    | Required | Schema |
| ------------- | ---------- | -------------------------------------------------------------------------------------------------------------- | -------- | ------ |
| hash          | path       | hash defines the evidence hash of the requested evidence.  Since: cosmos-sdk 0.47                              | Yes      | string |
| evidence_hash | query      | evidence_hash defines the hash of the requested evidence. Deprecated: Use hash, a HEX encoded string, instead. | No       | byte   |

##### Responses

| Code    | Description                   | Schema                                                                                          |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.evidence.v1beta1.QueryEvidenceResponse](#cosmos.evidence.v1beta1.QueryEvidenceResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                       |

### **feegrant.allowance**

#### GET

##### Summary

Allowance returns granted allwance to the grantee by the granter.

##### Parameters

| Name    | Located in | Description                                                                            | Required | Schema |
| ------- | ---------- | -------------------------------------------------------------------------------------- | -------- | ------ |
| granter | path       | granter is the address of the user granting an allowance of their funds.               | Yes      | string |
| grantee | path       | grantee is the address of the user being granted an allowance of another user's funds. | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                            |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.feegrant.v1beta1.QueryAllowanceResponse](#cosmos.feegrant.v1beta1.QueryAllowanceResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                         |

### **feegrant.allowances**

#### GET

##### Summary

Allowances returns all the grants for the given grantee address.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| grantee                | path       |                                                                                                                                                                                                                                    | Yes      | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                              |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.feegrant.v1beta1.QueryAllowancesResponse](#cosmos.feegrant.v1beta1.QueryAllowancesResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                           |

### **feegrant.allowancesByGranter**

#### GET

##### Summary

AllowancesByGranter returns all the grants given by an address

##### Description

Since: cosmos-sdk 0.46

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| granter                | path       |                                                                                                                                                                                                                                    | Yes      | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                                                |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.feegrant.v1beta1.QueryAllowancesByGranterResponse](#cosmos.feegrant.v1beta1.QueryAllowancesByGranterResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                             |

### **gov.constitution**

#### GET

##### Summary

Constitution queries the chain's constitution.

##### Responses

| Code    | Description                   | Schema                                                                              |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.gov.v1.QueryConstitutionResponse](#cosmos.gov.v1.QueryConstitutionResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                           |

### **gov.params**

#### GET

##### Summary

Params queries all parameters of the gov module.

##### Parameters

| Name        | Located in | Description                                                                                         | Required | Schema |
| ----------- | ---------- | --------------------------------------------------------------------------------------------------- | -------- | ------ |
| params_type | path       | params_type defines which parameters to query for, can be one of "voting", "tallying" or "deposit". | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                  |
| ------- | ----------------------------- | ----------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.gov.v1.QueryParamsResponse](#cosmos.gov.v1.QueryParamsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)               |

### **gov.proposals**

#### GET

##### Summary

Proposals queries all proposals based on given status.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Required | Schema          |
| ---------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| proposal_status        | query      | proposal_status defines the status of the proposals.   - PROPOSAL_STATUS_UNSPECIFIED: PROPOSAL_STATUS_UNSPECIFIED defines the default proposal status.  - PROPOSAL_STATUS_DEPOSIT_PERIOD: PROPOSAL_STATUS_DEPOSIT_PERIOD defines a proposal status during the deposit period.  - PROPOSAL_STATUS_VOTING_PERIOD: PROPOSAL_STATUS_VOTING_PERIOD defines a proposal status during the voting period.  - PROPOSAL_STATUS_PASSED: PROPOSAL_STATUS_PASSED defines a proposal status of a proposal that has passed.  - PROPOSAL_STATUS_REJECTED: PROPOSAL_STATUS_REJECTED defines a proposal status of a proposal that has been rejected.  - PROPOSAL_STATUS_FAILED: PROPOSAL_STATUS_FAILED defines a proposal status of a proposal that has failed. | No       | string          |
| voter                  | query      | voter defines the voter address for the proposals.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | No       | string          |
| depositor              | query      | depositor defines the deposit addresses from the proposals.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | No       | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                        |
| ------- | ----------------------------- | ----------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.gov.v1.QueryProposalsResponse](#cosmos.gov.v1.QueryProposalsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                     |

### **gov.proposal**

#### GET

##### Summary

Proposal queries proposal details based on ProposalID.

##### Parameters

| Name        | Located in | Description                                        | Required | Schema          |
| ----------- | ---------- | -------------------------------------------------- | -------- | --------------- |
| proposal_id | path       | proposal_id defines the unique id of the proposal. | Yes      | string (uint64) |

##### Responses

| Code    | Description                   | Schema                                                                      |
| ------- | ----------------------------- | --------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.gov.v1.QueryProposalResponse](#cosmos.gov.v1.QueryProposalResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                   |

### **gov.deposits**

#### GET

##### Summary

Deposits queries all deposits of a single proposal.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| proposal_id            | path       | proposal_id defines the unique id of the proposal.                                                                                                                                                                                 | Yes      | string (uint64) |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                      |
| ------- | ----------------------------- | --------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.gov.v1.QueryDepositsResponse](#cosmos.gov.v1.QueryDepositsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                   |

### **gov.deposit**

#### GET

##### Summary

Deposit queries single deposit information based on proposalID, depositAddr.

##### Parameters

| Name        | Located in | Description                                                 | Required | Schema          |
| ----------- | ---------- | ----------------------------------------------------------- | -------- | --------------- |
| proposal_id | path       | proposal_id defines the unique id of the proposal.          | Yes      | string (uint64) |
| depositor   | path       | depositor defines the deposit addresses from the proposals. | Yes      | string          |

##### Responses

| Code    | Description                   | Schema                                                                    |
| ------- | ----------------------------- | ------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.gov.v1.QueryDepositResponse](#cosmos.gov.v1.QueryDepositResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                 |

### **gov.tallyResult**

#### GET

##### Summary

TallyResult queries the tally of a proposal vote.

##### Parameters

| Name        | Located in | Description                                        | Required | Schema          |
| ----------- | ---------- | -------------------------------------------------- | -------- | --------------- |
| proposal_id | path       | proposal_id defines the unique id of the proposal. | Yes      | string (uint64) |

##### Responses

| Code    | Description                   | Schema                                                                            |
| ------- | ----------------------------- | --------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.gov.v1.QueryTallyResultResponse](#cosmos.gov.v1.QueryTallyResultResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                         |

### **gov.votes**

#### GET

##### Summary

Votes queries votes of a given proposal.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| proposal_id            | path       | proposal_id defines the unique id of the proposal.                                                                                                                                                                                 | Yes      | string (uint64) |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                |
| ------- | ----------------------------- | --------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.gov.v1.QueryVotesResponse](#cosmos.gov.v1.QueryVotesResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)             |

### **gov.vote**

#### GET

##### Summary

Vote queries voted information based on proposalID, voterAddr.

##### Parameters

| Name        | Located in | Description                                        | Required | Schema          |
| ----------- | ---------- | -------------------------------------------------- | -------- | --------------- |
| proposal_id | path       | proposal_id defines the unique id of the proposal. | Yes      | string (uint64) |
| voter       | path       | voter defines the voter address for the proposals. | Yes      | string          |

##### Responses

| Code    | Description                   | Schema                                                              |
| ------- | ----------------------------- | ------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.gov.v1.QueryVoteResponse](#cosmos.gov.v1.QueryVoteResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)           |

### **group.groupInfo**

#### GET

##### Summary

GroupInfo queries group info based on group id.

##### Parameters

| Name     | Located in | Description                             | Required | Schema          |
| -------- | ---------- | --------------------------------------- | -------- | --------------- |
| group_id | path       | group_id is the unique ID of the group. | Yes      | string (uint64) |

##### Responses

| Code    | Description                   | Schema                                                                            |
| ------- | ----------------------------- | --------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.group.v1.QueryGroupInfoResponse](#cosmos.group.v1.QueryGroupInfoResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                         |

### **group.groupMembers**

#### GET

##### Summary

GroupMembers queries members of a group by group id.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| group_id               | path       | group_id is the unique ID of the group.                                                                                                                                                                                            | Yes      | string (uint64) |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                  |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.group.v1.QueryGroupMembersResponse](#cosmos.group.v1.QueryGroupMembersResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                               |

### **group.groupPoliciesByAdmin**

#### GET

##### Summary

GroupPoliciesByAdmin queries group policies by admin address.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| admin                  | path       | admin is the admin address of the group policy.                                                                                                                                                                                    | Yes      | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                                  |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.group.v1.QueryGroupPoliciesByAdminResponse](#cosmos.group.v1.QueryGroupPoliciesByAdminResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                               |

### **group.groupPoliciesByGroup**

#### GET

##### Summary

GroupPoliciesByGroup queries group policies by group id.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| group_id               | path       | group_id is the unique ID of the group policy's group.                                                                                                                                                                             | Yes      | string (uint64) |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                                  |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.group.v1.QueryGroupPoliciesByGroupResponse](#cosmos.group.v1.QueryGroupPoliciesByGroupResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                               |

### **group.groupPolicyInfo**

#### GET

##### Summary

GroupPolicyInfo queries group policy info based on account address of group policy.

##### Parameters

| Name    | Located in | Description                                         | Required | Schema |
| ------- | ---------- | --------------------------------------------------- | -------- | ------ |
| address | path       | address is the account address of the group policy. | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                        |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.group.v1.QueryGroupPolicyInfoResponse](#cosmos.group.v1.QueryGroupPolicyInfoResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                     |

### **group.groups**

#### GET

##### Summary

Groups queries all groups in state.

##### Description

Since: cosmos-sdk 0.47.1

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                      |
| ------- | ----------------------------- | --------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.group.v1.QueryGroupsResponse](#cosmos.group.v1.QueryGroupsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                   |

### **group.groupsByAdmin**

#### GET

##### Summary

GroupsByAdmin queries groups by admin address.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| admin                  | path       | admin is the account address of a group's admin.                                                                                                                                                                                   | Yes      | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                    |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.group.v1.QueryGroupsByAdminResponse](#cosmos.group.v1.QueryGroupsByAdminResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                 |

### **group.groupsByMember**

#### GET

##### Summary

GroupsByMember queries groups by member address.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| address                | path       | address is the group member address.                                                                                                                                                                                               | Yes      | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                      |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.group.v1.QueryGroupsByMemberResponse](#cosmos.group.v1.QueryGroupsByMemberResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                   |

### **group.proposal**

#### GET

##### Summary

Proposal queries a proposal based on proposal id.

##### Parameters

| Name        | Located in | Description                                 | Required | Schema          |
| ----------- | ---------- | ------------------------------------------- | -------- | --------------- |
| proposal_id | path       | proposal_id is the unique ID of a proposal. | Yes      | string (uint64) |

##### Responses

| Code    | Description                   | Schema                                                                          |
| ------- | ----------------------------- | ------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.group.v1.QueryProposalResponse](#cosmos.group.v1.QueryProposalResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                       |

### **group.tallyResult**

#### GET

##### Summary

TallyResult returns the tally result of a proposal. If the proposal is
still in voting period, then this query computes the current tally state,
which might not be final. On the other hand, if the proposal is final,
then it simply returns the `final_tally_result` state stored in the
proposal itself.

##### Parameters

| Name        | Located in | Description                                 | Required | Schema          |
| ----------- | ---------- | ------------------------------------------- | -------- | --------------- |
| proposal_id | path       | proposal_id is the unique id of a proposal. | Yes      | string (uint64) |

##### Responses

| Code    | Description                   | Schema                                                                                |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.group.v1.QueryTallyResultResponse](#cosmos.group.v1.QueryTallyResultResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                             |

### **group.proposalsByGroupPolicy**

#### GET

##### Summary

ProposalsByGroupPolicy queries proposals based on account address of group policy.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| address                | path       | address is the account address of the group policy related to proposals.                                                                                                                                                           | Yes      | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                                      |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.group.v1.QueryProposalsByGroupPolicyResponse](#cosmos.group.v1.QueryProposalsByGroupPolicyResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                   |

### **group.voteByProposalVoter**

#### GET

##### Summary

VoteByProposalVoter queries a vote by proposal id and voter.

##### Parameters

| Name        | Located in | Description                                 | Required | Schema          |
| ----------- | ---------- | ------------------------------------------- | -------- | --------------- |
| proposal_id | path       | proposal_id is the unique ID of a proposal. | Yes      | string (uint64) |
| voter       | path       | voter is a proposal voter account address.  | Yes      | string          |

##### Responses

| Code    | Description                   | Schema                                                                                                |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.group.v1.QueryVoteByProposalVoterResponse](#cosmos.group.v1.QueryVoteByProposalVoterResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                             |

### **group.votesByProposal**

#### GET

##### Summary

VotesByProposal queries a vote by proposal id.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| proposal_id            | path       | proposal_id is the unique ID of a proposal.                                                                                                                                                                                        | Yes      | string (uint64) |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                        |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.group.v1.QueryVotesByProposalResponse](#cosmos.group.v1.QueryVotesByProposalResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                     |

### **group.votesByVoter**

#### GET

##### Summary

VotesByVoter queries a vote by voter.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| voter                  | path       | voter is a proposal voter account address.                                                                                                                                                                                         | Yes      | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                  |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.group.v1.QueryVotesByVoterResponse](#cosmos.group.v1.QueryVotesByVoterResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                               |

### **mint.annualProvisions**

#### GET

##### Summary

AnnualProvisions current minting annual provisions value.

##### Responses

| Code    | Description                   | Schema                                                                                                  |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.mint.v1beta1.QueryAnnualProvisionsResponse](#cosmos.mint.v1beta1.QueryAnnualProvisionsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                               |

### **mint.inflation**

#### GET

##### Summary

Inflation returns the current minting inflation value.

##### Responses

| Code    | Description                   | Schema                                                                                    |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.mint.v1beta1.QueryInflationResponse](#cosmos.mint.v1beta1.QueryInflationResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                 |

### **mint.params**

#### GET

##### Summary

Params returns the total set of minting parameters.

##### Responses

| Code    | Description                   | Schema                                                                              |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.mint.v1beta1.QueryParamsResponse](#cosmos.mint.v1beta1.QueryParamsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                           |

### **nft.balance**

#### GET

##### Summary

Balance queries the number of NFTs of a given class owned by the owner, same as balanceOf in ERC721

##### Parameters

| Name     | Located in | Description                           | Required | Schema |
| -------- | ---------- | ------------------------------------- | -------- | ------ |
| owner    | path       | owner is the owner address of the nft | Yes      | string |
| class_id | path       | class_id associated with the nft      | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                              |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.nft.v1beta1.QueryBalanceResponse](#cosmos.nft.v1beta1.QueryBalanceResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                           |

### **nft.classes**

#### GET

##### Summary

Classes queries all NFT classes

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                              |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.nft.v1beta1.QueryClassesResponse](#cosmos.nft.v1beta1.QueryClassesResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                           |

### **nft.class**

#### GET

##### Summary

Class queries an NFT class based on its id

##### Parameters

| Name     | Located in | Description                      | Required | Schema |
| -------- | ---------- | -------------------------------- | -------- | ------ |
| class_id | path       | class_id associated with the nft | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                          |
| ------- | ----------------------------- | ------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.nft.v1beta1.QueryClassResponse](#cosmos.nft.v1beta1.QueryClassResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                       |

### **nft.nFTs**

#### GET

##### Summary

NFTs queries all NFTs of a given class or owner,choose at least one of the two, similar to tokenByIndex in
ERC721Enumerable

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| class_id               | query      | class_id associated with the nft.                                                                                                                                                                                                  | No       | string          |
| owner                  | query      | owner is the owner address of the nft.                                                                                                                                                                                             | No       | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                        |
| ------- | ----------------------------- | ----------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.nft.v1beta1.QueryNFTsResponse](#cosmos.nft.v1beta1.QueryNFTsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                     |

### **nft.nFT**

#### GET

##### Summary

NFT queries an NFT based on its class and id.

##### Parameters

| Name     | Located in | Description                          | Required | Schema |
| -------- | ---------- | ------------------------------------ | -------- | ------ |
| class_id | path       | class_id associated with the nft     | Yes      | string |
| id       | path       | id is a unique identifier of the NFT | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                      |
| ------- | ----------------------------- | --------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.nft.v1beta1.QueryNFTResponse](#cosmos.nft.v1beta1.QueryNFTResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                   |

### **nft.owner**

#### GET

##### Summary

Owner queries the owner of the NFT based on its class and id, same as ownerOf in ERC721

##### Parameters

| Name     | Located in | Description                          | Required | Schema |
| -------- | ---------- | ------------------------------------ | -------- | ------ |
| class_id | path       | class_id associated with the nft     | Yes      | string |
| id       | path       | id is a unique identifier of the NFT | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                          |
| ------- | ----------------------------- | ------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.nft.v1beta1.QueryOwnerResponse](#cosmos.nft.v1beta1.QueryOwnerResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                       |

### **nft.supply**

#### GET

##### Summary

Supply queries the number of NFTs from the given class, same as totalSupply of ERC721.

##### Parameters

| Name     | Located in | Description                      | Required | Schema |
| -------- | ---------- | -------------------------------- | -------- | ------ |
| class_id | path       | class_id associated with the nft | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                            |
| ------- | ----------------------------- | --------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.nft.v1beta1.QuerySupplyResponse](#cosmos.nft.v1beta1.QuerySupplyResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                         |

### **params.params**

#### GET

##### Summary

Params queries a specific parameter of a module, given its subspace and
key.

##### Parameters

| Name     | Located in | Description                                             | Required | Schema |
| -------- | ---------- | ------------------------------------------------------- | -------- | ------ |
| subspace | query      | subspace defines the module to query the parameter for. | No       | string |
| key      | query      | key defines the key of the parameter in the subspace.   | No       | string |

##### Responses

| Code    | Description                   | Schema                                                                                  |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.params.v1beta1.QueryParamsResponse](#cosmos.params.v1beta1.QueryParamsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                               |

### **params.subspaces**

#### GET

##### Summary

Subspaces queries for all registered subspaces and all keys for a subspace.

##### Description

Since: cosmos-sdk 0.46

##### Responses

| Code    | Description                   | Schema                                                                                        |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.params.v1beta1.QuerySubspacesResponse](#cosmos.params.v1beta1.QuerySubspacesResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                     |

### **slashing.params**

#### GET

##### Summary

Params queries the parameters of slashing module

##### Responses

| Code    | Description                   | Schema                                                                                      |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.slashing.v1beta1.QueryParamsResponse](#cosmos.slashing.v1beta1.QueryParamsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                   |

### **slashing.signingInfos**

#### GET

##### Summary

SigningInfos queries signing info of all validators

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                                  |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.slashing.v1beta1.QuerySigningInfosResponse](#cosmos.slashing.v1beta1.QuerySigningInfosResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                               |

### **slashing.signingInfo**

#### GET

##### Summary

SigningInfo queries the signing info of given cons address

##### Parameters

| Name         | Located in | Description                                          | Required | Schema |
| ------------ | ---------- | ---------------------------------------------------- | -------- | ------ |
| cons_address | path       | cons_address is the address to query signing info of | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                                |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.slashing.v1beta1.QuerySigningInfoResponse](#cosmos.slashing.v1beta1.QuerySigningInfoResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                             |

### **staking.delegatorDelegations**

#### GET

##### Summary

DelegatorDelegations queries all delegations of a given delegator address.

##### Description

When called from another module, this query might consume a high amount of
gas if the pagination field is incorrectly set.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| delegator_addr         | path       | delegator_addr defines the delegator address to query for.                                                                                                                                                                         | Yes      | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                                                |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.staking.v1beta1.QueryDelegatorDelegationsResponse](#cosmos.staking.v1beta1.QueryDelegatorDelegationsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                             |

### **staking.redelegations**

#### GET

##### Summary

Redelegations queries redelegations of given address.

##### Description

When called from another module, this query might consume a high amount of
gas if the pagination field is incorrectly set.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| delegator_addr         | path       | delegator_addr defines the delegator address to query for.                                                                                                                                                                         | Yes      | string          |
| src_validator_addr     | query      | src_validator_addr defines the validator address to redelegate from.                                                                                                                                                               | No       | string          |
| dst_validator_addr     | query      | dst_validator_addr defines the validator address to redelegate to.                                                                                                                                                                 | No       | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                                  |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.staking.v1beta1.QueryRedelegationsResponse](#cosmos.staking.v1beta1.QueryRedelegationsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                               |

### **staking.delegatorUnbondingDelegations**

#### GET

##### Summary

DelegatorUnbondingDelegations queries all unbonding delegations of a given
delegator address.

##### Description

When called from another module, this query might consume a high amount of
gas if the pagination field is incorrectly set.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| delegator_addr         | path       | delegator_addr defines the delegator address to query for.                                                                                                                                                                         | Yes      | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                                                                  |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.staking.v1beta1.QueryDelegatorUnbondingDelegationsResponse](#cosmos.staking.v1beta1.QueryDelegatorUnbondingDelegationsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                                               |

### **staking.delegatorValidators**

#### GET

##### Summary

DelegatorValidators queries all validators info for given delegator
address.

##### Description

When called from another module, this query might consume a high amount of
gas if the pagination field is incorrectly set.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| delegator_addr         | path       | delegator_addr defines the delegator address to query for.                                                                                                                                                                         | Yes      | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                                              |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.staking.v1beta1.QueryDelegatorValidatorsResponse](#cosmos.staking.v1beta1.QueryDelegatorValidatorsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                           |

### **staking.delegatorValidator**

#### GET

##### Summary

DelegatorValidator queries validator info for given delegator validator
pair.

##### Parameters

| Name           | Located in | Description                                                | Required | Schema |
| -------------- | ---------- | ---------------------------------------------------------- | -------- | ------ |
| delegator_addr | path       | delegator_addr defines the delegator address to query for. | Yes      | string |
| validator_addr | path       | validator_addr defines the validator address to query for. | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                                            |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.staking.v1beta1.QueryDelegatorValidatorResponse](#cosmos.staking.v1beta1.QueryDelegatorValidatorResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                         |

### **staking.historicalInfo**

#### GET

##### Summary

HistoricalInfo queries the historical info for given height.

##### Parameters

| Name   | Located in | Description                                                  | Required | Schema         |
| ------ | ---------- | ------------------------------------------------------------ | -------- | -------------- |
| height | path       | height defines at which height to query the historical info. | Yes      | string (int64) |

##### Responses

| Code    | Description                   | Schema                                                                                                    |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.staking.v1beta1.QueryHistoricalInfoResponse](#cosmos.staking.v1beta1.QueryHistoricalInfoResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                 |

### **staking.params**

#### GET

##### Summary

Parameters queries the staking parameters.

##### Responses

| Code    | Description                   | Schema                                                                                    |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.staking.v1beta1.QueryParamsResponse](#cosmos.staking.v1beta1.QueryParamsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                 |

### **staking.pool**

#### GET

##### Summary

Pool queries the pool info.

##### Responses

| Code    | Description                   | Schema                                                                                |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.staking.v1beta1.QueryPoolResponse](#cosmos.staking.v1beta1.QueryPoolResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                             |

### **staking.validators**

#### GET

##### Summary

Validators queries all validators that match the given status.

##### Description

When called from another module, this query might consume a high amount of
gas if the pagination field is incorrectly set.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| status                 | query      | status enables to query for validators matching a given status.                                                                                                                                                                    | No       | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                            |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.staking.v1beta1.QueryValidatorsResponse](#cosmos.staking.v1beta1.QueryValidatorsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                         |

### **staking.validator**

#### GET

##### Summary

Validator queries validator info for given validator address.

##### Parameters

| Name           | Located in | Description                                                | Required | Schema |
| -------------- | ---------- | ---------------------------------------------------------- | -------- | ------ |
| validator_addr | path       | validator_addr defines the validator address to query for. | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                          |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.staking.v1beta1.QueryValidatorResponse](#cosmos.staking.v1beta1.QueryValidatorResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                       |

### **staking.validatorDelegations**

#### GET

##### Summary

ValidatorDelegations queries delegate info for given validator.

##### Description

When called from another module, this query might consume a high amount of
gas if the pagination field is incorrectly set.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| validator_addr         | path       | validator_addr defines the validator address to query for.                                                                                                                                                                         | Yes      | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                                                |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.staking.v1beta1.QueryValidatorDelegationsResponse](#cosmos.staking.v1beta1.QueryValidatorDelegationsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                             |

### **staking.delegation**

#### GET

##### Summary

Delegation queries delegate info for given validator delegator pair.

##### Parameters

| Name           | Located in | Description                                                | Required | Schema |
| -------------- | ---------- | ---------------------------------------------------------- | -------- | ------ |
| validator_addr | path       | validator_addr defines the validator address to query for. | Yes      | string |
| delegator_addr | path       | delegator_addr defines the delegator address to query for. | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                            |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.staking.v1beta1.QueryDelegationResponse](#cosmos.staking.v1beta1.QueryDelegationResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                         |

### **staking.unbondingDelegation**

#### GET

##### Summary

UnbondingDelegation queries unbonding info for given validator delegator
pair.

##### Parameters

| Name           | Located in | Description                                                | Required | Schema |
| -------------- | ---------- | ---------------------------------------------------------- | -------- | ------ |
| validator_addr | path       | validator_addr defines the validator address to query for. | Yes      | string |
| delegator_addr | path       | delegator_addr defines the delegator address to query for. | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                                              |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.staking.v1beta1.QueryUnbondingDelegationResponse](#cosmos.staking.v1beta1.QueryUnbondingDelegationResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                           |

### **staking.validatorUnbondingDelegations**

#### GET

##### Summary

ValidatorUnbondingDelegations queries unbonding delegations of a validator.

##### Description

When called from another module, this query might consume a high amount of
gas if the pagination field is incorrectly set.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| validator_addr         | path       | validator_addr defines the validator address to query for.                                                                                                                                                                         | Yes      | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                                                                  |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.staking.v1beta1.QueryValidatorUnbondingDelegationsResponse](#cosmos.staking.v1beta1.QueryValidatorUnbondingDelegationsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                                               |

### **tx.txDecode**

#### POST

##### Summary

TxDecode decodes the transaction.

##### Description

Since: cosmos-sdk 0.47

##### Parameters

| Name | Located in | Description | Required | Schema                                                                  |
| ---- | ---------- | ----------- | -------- | ----------------------------------------------------------------------- |
| body | body       |             | Yes      | [cosmos.tx.v1beta1.TxDecodeRequest](#cosmos.tx.v1beta1.TxDecodeRequest) |

##### Responses

| Code    | Description                   | Schema                                                                    |
| ------- | ----------------------------- | ------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.tx.v1beta1.TxDecodeResponse](#cosmos.tx.v1beta1.TxDecodeResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                 |

### **tx.txDecodeAmino**

#### POST

##### Summary

TxDecodeAmino decodes an Amino transaction from encoded bytes to JSON.

##### Description

Since: cosmos-sdk 0.47

##### Parameters

| Name | Located in | Description | Required | Schema                                                                            |
| ---- | ---------- | ----------- | -------- | --------------------------------------------------------------------------------- |
| body | body       |             | Yes      | [cosmos.tx.v1beta1.TxDecodeAminoRequest](#cosmos.tx.v1beta1.TxDecodeAminoRequest) |

##### Responses

| Code    | Description                   | Schema                                                                              |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.tx.v1beta1.TxDecodeAminoResponse](#cosmos.tx.v1beta1.TxDecodeAminoResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                           |

### **tx.txEncode**

#### POST

##### Summary

TxEncode encodes the transaction.

##### Description

Since: cosmos-sdk 0.47

##### Parameters

| Name | Located in | Description | Required | Schema                                                                  |
| ---- | ---------- | ----------- | -------- | ----------------------------------------------------------------------- |
| body | body       |             | Yes      | [cosmos.tx.v1beta1.TxEncodeRequest](#cosmos.tx.v1beta1.TxEncodeRequest) |

##### Responses

| Code    | Description                   | Schema                                                                    |
| ------- | ----------------------------- | ------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.tx.v1beta1.TxEncodeResponse](#cosmos.tx.v1beta1.TxEncodeResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                 |

### **tx.txEncodeAmino**

#### POST

##### Summary

TxEncodeAmino encodes an Amino transaction from JSON to encoded bytes.

##### Description

Since: cosmos-sdk 0.47

##### Parameters

| Name | Located in | Description | Required | Schema                                                                            |
| ---- | ---------- | ----------- | -------- | --------------------------------------------------------------------------------- |
| body | body       |             | Yes      | [cosmos.tx.v1beta1.TxEncodeAminoRequest](#cosmos.tx.v1beta1.TxEncodeAminoRequest) |

##### Responses

| Code    | Description                   | Schema                                                                              |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.tx.v1beta1.TxEncodeAminoResponse](#cosmos.tx.v1beta1.TxEncodeAminoResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                           |

### **tx.simulate**

#### POST

##### Summary

Simulate simulates executing a transaction for estimating gas usage.

##### Parameters

| Name | Located in | Description | Required | Schema                                                                  |
| ---- | ---------- | ----------- | -------- | ----------------------------------------------------------------------- |
| body | body       |             | Yes      | [cosmos.tx.v1beta1.SimulateRequest](#cosmos.tx.v1beta1.SimulateRequest) |

##### Responses

| Code    | Description                   | Schema                                                                    |
| ------- | ----------------------------- | ------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.tx.v1beta1.SimulateResponse](#cosmos.tx.v1beta1.SimulateResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                 |

### **tx.getTxsEvent**

#### GET

##### Summary

GetTxsEvent fetches txs by event.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                           | Required | Schema          |
| ---------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| events                 | query      | events is the list of transaction event type. Deprecated post v0.47.x: use query instead, which should contain a valid events query.                                                                                                  | No       | [ string ]      |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                           | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                    | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                               | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set.    | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                                 | No       | boolean         |
| order_by               | query      | - ORDER_BY_UNSPECIFIED: ORDER_BY_UNSPECIFIED specifies an unknown sorting order. OrderBy defaults to ASC in this case.  - ORDER_BY_ASC: ORDER_BY_ASC defines ascending order  - ORDER_BY_DESC: ORDER_BY_DESC defines descending order | No       | string          |
| page                   | query      | page is the page number to query, starts at 1. If not provided, will default to first page.                                                                                                                                           | No       | string (uint64) |
| limit                  | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                               | No       | string (uint64) |
| query                  | query      | query defines the transaction event query that is proxied to Cometbft's TxSearch RPC method. The query must be valid.  Since cosmos-sdk 0.50                                                                                          | No       | string          |

##### Responses

| Code    | Description                   | Schema                                                                          |
| ------- | ----------------------------- | ------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.tx.v1beta1.GetTxsEventResponse](#cosmos.tx.v1beta1.GetTxsEventResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                       |

#### POST

##### Summary

BroadcastTx broadcast transaction.

##### Parameters

| Name | Located in | Description | Required | Schema                                                                        |
| ---- | ---------- | ----------- | -------- | ----------------------------------------------------------------------------- |
| body | body       |             | Yes      | [cosmos.tx.v1beta1.BroadcastTxRequest](#cosmos.tx.v1beta1.BroadcastTxRequest) |

##### Responses

| Code    | Description                   | Schema                                                                          |
| ------- | ----------------------------- | ------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.tx.v1beta1.BroadcastTxResponse](#cosmos.tx.v1beta1.BroadcastTxResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                       |

### **tx.getBlockWithTxs**

#### GET

##### Summary

GetBlockWithTxs fetches a block with decoded txs.

##### Description

Since: cosmos-sdk 0.45.2

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| height                 | path       | height is the height of the block to query.                                                                                                                                                                                        | Yes      | string (int64)  |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                  |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.tx.v1beta1.GetBlockWithTxsResponse](#cosmos.tx.v1beta1.GetBlockWithTxsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                               |

### **tx.getTx**

#### GET

##### Summary

GetTx fetches a tx by hash.

##### Parameters

| Name | Located in | Description                                            | Required | Schema |
| ---- | ---------- | ------------------------------------------------------ | -------- | ------ |
| hash | path       | hash is the tx hash to query, encoded as a hex string. | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                              |
| ------- | ----------------------------- | ------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.tx.v1beta1.GetTxResponse](#cosmos.tx.v1beta1.GetTxResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)           |

### **upgrade.appliedPlan**

#### GET

##### Summary

AppliedPlan queries a previously applied upgrade plan by its name.

##### Parameters

| Name | Located in | Description                                        | Required | Schema |
| ---- | ---------- | -------------------------------------------------- | -------- | ------ |
| name | path       | name is the name of the applied plan to query for. | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                              |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.upgrade.v1beta1.QueryAppliedPlanResponse](#cosmos.upgrade.v1beta1.QueryAppliedPlanResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                           |

### **upgrade.authority**

#### GET

##### Summary

Returns the account with authority to conduct upgrades

##### Description

Since: cosmos-sdk 0.46

##### Responses

| Code    | Description                   | Schema                                                                                          |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.upgrade.v1beta1.QueryAuthorityResponse](#cosmos.upgrade.v1beta1.QueryAuthorityResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                       |

### **upgrade.currentPlan**

#### GET

##### Summary

CurrentPlan queries the current upgrade plan.

##### Responses

| Code    | Description                   | Schema                                                                                              |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.upgrade.v1beta1.QueryCurrentPlanResponse](#cosmos.upgrade.v1beta1.QueryCurrentPlanResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                           |

### **upgrade.moduleVersions**

#### GET

##### Summary

ModuleVersions queries the list of module versions from state.

##### Description

Since: cosmos-sdk 0.43

##### Parameters

| Name        | Located in | Description                                                                                                                                                | Required | Schema |
| ----------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------ |
| module_name | query      | module_name is a field to query a specific module consensus version from state. Leaving this empty will fetch the full list of module versions from state. | No       | string |

##### Responses

| Code    | Description                   | Schema                                                                                                    |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.upgrade.v1beta1.QueryModuleVersionsResponse](#cosmos.upgrade.v1beta1.QueryModuleVersionsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                 |

### **upgrade.upgradedConsensusState**

#### GET

##### Summary

UpgradedConsensusState queries the consensus state that will serve
as a trusted kernel for the next version of this chain. It will only be
stored at the last height of this chain.
UpgradedConsensusState RPC not supported with legacy querier
This rpc is deprecated now that IBC has its own replacement
(<https://github.com/cosmos/ibc-go/blob/2c880a22e9f9cc75f62b527ca94aa75ce1106001/proto/ibc/core/client/v1/query.proto#L54>)

##### Parameters

| Name        | Located in | Description                                                                                                               | Required | Schema         |
| ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------------- | -------- | -------------- |
| last_height | path       | last height of the current chain must be sent in request as this is the height under which next consensus state is stored | Yes      | string (int64) |

##### Responses

| Code    | Description                   | Schema                                                                                                                    |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [cosmos.upgrade.v1beta1.QueryUpgradedConsensusStateResponse](#cosmos.upgrade.v1beta1.QueryUpgradedConsensusStateResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                                 |

### **evm.account**

#### GET

##### Summary

Account queries an Ethereum account.

##### Parameters

| Name    | Located in | Description                                                   | Required | Schema |
| ------- | ---------- | ------------------------------------------------------------- | -------- | ------ |
| address | path       | address is the ethereum hex address to query the account for. | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                          |
| ------- | ----------------------------- | ------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ethermint.evm.v1.QueryAccountResponse](#ethermint.evm.v1.QueryAccountResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                       |

### **evm.balance**

#### GET

##### Summary

Balance queries the balance of a the EVM denomination for a single
EthAccount.

##### Parameters

| Name    | Located in | Description                                                   | Required | Schema |
| ------- | ---------- | ------------------------------------------------------------- | -------- | ------ |
| address | path       | address is the ethereum hex address to query the balance for. | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                          |
| ------- | ----------------------------- | ------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ethermint.evm.v1.QueryBalanceResponse](#ethermint.evm.v1.QueryBalanceResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                       |

### **evm.baseFee**

#### GET

##### Summary

BaseFee queries the base fee of the parent block of the current block,
it's similar to feemarket module's method, but also checks london hardfork status.

##### Responses

| Code    | Description                   | Schema                                                                          |
| ------- | ----------------------------- | ------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ethermint.evm.v1.QueryBaseFeeResponse](#ethermint.evm.v1.QueryBaseFeeResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                       |

### **evm.code**

#### GET

##### Summary

Code queries the balance of all coins for a single account.

##### Parameters

| Name    | Located in | Description                                                | Required | Schema |
| ------- | ---------- | ---------------------------------------------------------- | -------- | ------ |
| address | path       | address is the ethereum hex address to query the code for. | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                    |
| ------- | ----------------------------- | ------------------------------------------------------------------------- |
| 200     | A successful response.        | [ethermint.evm.v1.QueryCodeResponse](#ethermint.evm.v1.QueryCodeResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                 |

### **evm.cosmosAccount**

#### GET

##### Summary

CosmosAccount queries an Ethereum account's Cosmos Address.

##### Parameters

| Name    | Located in | Description                                                   | Required | Schema |
| ------- | ---------- | ------------------------------------------------------------- | -------- | ------ |
| address | path       | address is the ethereum hex address to query the account for. | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                      |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ethermint.evm.v1.QueryCosmosAccountResponse](#ethermint.evm.v1.QueryCosmosAccountResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                   |

### **evm.estimateGas**

#### GET

##### Summary

EstimateGas implements the `eth_estimateGas` rpc api

##### Parameters

| Name             | Located in | Description                                                             | Required | Schema          |
| ---------------- | ---------- | ----------------------------------------------------------------------- | -------- | --------------- |
| args             | query      | args uses the same json format as the json rpc api.                     | No       | byte            |
| gas_cap          | query      | gas_cap defines the default gas cap to be used.                         | No       | string (uint64) |
| proposer_address | query      | proposer_address of the requested block in hex format.                  | No       | byte            |
| chain_id         | query      | chain_id is the eip155 chain id parsed from the requested block header. | No       | string (int64)  |

##### Responses

| Code    | Description                   | Schema                                                                        |
| ------- | ----------------------------- | ----------------------------------------------------------------------------- |
| 200     | A successful response.        | [ethermint.evm.v1.EstimateGasResponse](#ethermint.evm.v1.EstimateGasResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                     |

### **evm.ethCall**

#### GET

##### Summary

EthCall implements the `eth_call` rpc api

##### Parameters

| Name             | Located in | Description                                                             | Required | Schema          |
| ---------------- | ---------- | ----------------------------------------------------------------------- | -------- | --------------- |
| args             | query      | args uses the same json format as the json rpc api.                     | No       | byte            |
| gas_cap          | query      | gas_cap defines the default gas cap to be used.                         | No       | string (uint64) |
| proposer_address | query      | proposer_address of the requested block in hex format.                  | No       | byte            |
| chain_id         | query      | chain_id is the eip155 chain id parsed from the requested block header. | No       | string (int64)  |

##### Responses

| Code    | Description                   | Schema                                                                            |
| ------- | ----------------------------- | --------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ethermint.evm.v1.MsgEthereumTxResponse](#ethermint.evm.v1.MsgEthereumTxResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                         |

### **evm.params**

#### GET

##### Summary

Params queries the parameters of x/evm module.

##### Responses

| Code    | Description                   | Schema                                                                        |
| ------- | ----------------------------- | ----------------------------------------------------------------------------- |
| 200     | A successful response.        | [ethermint.evm.v1.QueryParamsResponse](#ethermint.evm.v1.QueryParamsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                     |

### **evm.storage**

#### GET

##### Summary

Storage queries the balance of all coins for a single account.

##### Parameters

| Name    | Located in | Description                                                         | Required | Schema |
| ------- | ---------- | ------------------------------------------------------------------- | -------- | ------ |
| address | path       | address is the ethereum hex address to query the storage state for. | Yes      | string |
| key     | path       | key defines the key of the storage state                            | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                          |
| ------- | ----------------------------- | ------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ethermint.evm.v1.QueryStorageResponse](#ethermint.evm.v1.QueryStorageResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                       |

### **evm.traceBlock**

#### GET

##### Summary

TraceBlock implements the `debug_traceBlockByNumber` and `debug_traceBlockByHash` rpc api

##### Parameters

| Name                                        | Located in | Description                                                                                                                        | Required | Schema          |
| ------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| trace_config.tracer                         | query      | tracer is a custom javascript tracer.                                                                                              | No       | string          |
| trace_config.timeout                        | query      | timeout overrides the default timeout of 5 seconds for JavaScript-based tracing calls.                                             | No       | string          |
| trace_config.reexec                         | query      | reexec defines the number of blocks the tracer is willing to go back.                                                              | No       | string (uint64) |
| trace_config.disable_stack                  | query      | disable_stack switches stack capture.                                                                                              | No       | boolean         |
| trace_config.disable_storage                | query      | disable_storage switches storage capture.                                                                                          | No       | boolean         |
| trace_config.debug                          | query      | debug can be used to print output during capture end.                                                                              | No       | boolean         |
| trace_config.limit                          | query      | limit defines the maximum length of output, but zero means unlimited.                                                              | No       | integer         |
| trace_config.overrides.homestead_block      | query      | homestead_block switch (nil no fork, 0 = already homestead).                                                                       | No       | string          |
| trace_config.overrides.dao_fork_block       | query      | dao_fork_block corresponds to TheDAO hard-fork switch block (nil no fork).                                                         | No       | string          |
| trace_config.overrides.dao_fork_support     | query      | dao_fork_support defines whether the nodes supports or opposes the DAO hard-fork.                                                  | No       | boolean         |
| trace_config.overrides.eip150_block         | query      | eip150_block: EIP150 implements the Gas price changes (<https://github.com/ethereum/EIPs/issues/150>) EIP150 HF block (nil no fork). | No       | string          |
| trace_config.overrides.eip150_hash          | query      | eip150_hash: EIP150 HF hash (needed for header only clients as only gas pricing changed).                                          | No       | string          |
| trace_config.overrides.eip155_block         | query      | eip155_block: EIP155Block HF block.                                                                                                | No       | string          |
| trace_config.overrides.eip158_block         | query      | eip158_block: EIP158 HF block.                                                                                                     | No       | string          |
| trace_config.overrides.byzantium_block      | query      | byzantium_block: Byzantium switch block (nil no fork, 0 = already on byzantium).                                                   | No       | string          |
| trace_config.overrides.constantinople_block | query      | constantinople_block: Constantinople switch block (nil no fork, 0 = already activated).                                            | No       | string          |
| trace_config.overrides.petersburg_block     | query      | petersburg_block: Petersburg switch block (nil same as Constantinople).                                                            | No       | string          |
| trace_config.overrides.istanbul_block       | query      | istanbul_block: Istanbul switch block (nil no fork, 0 = already on istanbul).                                                      | No       | string          |
| trace_config.overrides.muir_glacier_block   | query      | muir_glacier_block: Eip-2384 (bomb delay) switch block (nil no fork, 0 = already activated).                                       | No       | string          |
| trace_config.overrides.berlin_block         | query      | berlin_block: Berlin switch block (nil = no fork, 0 = already on berlin).                                                          | No       | string          |
| trace_config.overrides.london_block         | query      | london_block: London switch block (nil = no fork, 0 = already on london).                                                          | No       | string          |
| trace_config.overrides.arrow_glacier_block  | query      | arrow_glacier_block: Eip-4345 (bomb delay) switch block (nil = no fork, 0 = already activated).                                    | No       | string          |
| trace_config.overrides.gray_glacier_block   | query      | gray_glacier_block: EIP-5133 (bomb delay) switch block (nil = no fork, 0 = already activated).                                     | No       | string          |
| trace_config.overrides.merge_netsplit_block | query      | merge_netsplit_block: Virtual fork after The Merge to use as a network splitter.                                                   | No       | string          |
| trace_config.overrides.shanghai_block       | query      | shanghai_block switch block (nil = no fork, 0 = already on shanghai).                                                              | No       | string          |
| trace_config.overrides.cancun_block         | query      | cancun_block switch block (nil = no fork, 0 = already on cancun).                                                                  | No       | string          |
| trace_config.enable_memory                  | query      | enable_memory switches memory capture.                                                                                             | No       | boolean         |
| trace_config.enable_return_data             | query      | enable_return_data switches the capture of return data.                                                                            | No       | boolean         |
| trace_config.tracer_json_config             | query      | tracer_json_config configures the tracer using a JSON string.                                                                      | No       | string          |
| block_number                                | query      | block_number of the traced block.                                                                                                  | No       | string (int64)  |
| block_hash                                  | query      | block_hash (hex) of the traced block.                                                                                              | No       | string          |
| block_time                                  | query      | block_time of the traced block.                                                                                                    | No       | dateTime        |
| proposer_address                            | query      | proposer_address is the address of the requested block.                                                                            | No       | byte            |
| chain_id                                    | query      | chain_id is the eip155 chain id parsed from the requested block header.                                                            | No       | string (int64)  |
| block_max_gas                               | query      | block_max_gas of the traced block.                                                                                                 | No       | string (int64)  |

##### Responses

| Code    | Description                   | Schema                                                                                |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ethermint.evm.v1.QueryTraceBlockResponse](#ethermint.evm.v1.QueryTraceBlockResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                             |

### **evm.traceTx**

#### GET

##### Summary

TraceTx implements the `debug_traceTransaction` rpc api

##### Parameters

| Name                                        | Located in | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Required | Schema          |
| ------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| msg.data.type_url                           | query      | A URL/resource name that uniquely identifies the type of the serialized protocol buffer message. This string must contain at least one "/" character. The last segment of the URL's path must represent the fully qualified name of the type (as in `path/google.protobuf.Duration`). The name should be in a canonical form (e.g., leading "." is not accepted).  In practice, teams usually precompile into the binary all types that they expect it to use in the context of Any. However, for URLs which use the scheme `http`, `https`, or no scheme, one can optionally set up a type server that maps type URLs to message definitions as follows:  *If no scheme is provided, `https` is assumed.* An HTTP GET on the URL must yield a [google.protobuf.Type][]   value in binary format, or produce an error. * Applications are allowed to cache lookup results based on the   URL, or have them precompiled into a binary to avoid any   lookup. Therefore, binary compatibility needs to be preserved   on changes to types. (Use versioned type names to manage   breaking changes.)  Note: this functionality is not currently available in the official protobuf release, and it is not used for type URLs beginning with type.googleapis.com.  Schemes other than `http`, `https` (or the empty scheme) might be used with implementation specific semantics. | No       | string          |
| msg.data.value                              | query      | Must be a valid serialized protocol buffer of the above specified type.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | No       | byte            |
| msg.size                                    | query      | size is the encoded storage size of the transaction (DEPRECATED).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | No       | double          |
| msg.hash                                    | query      | hash of the transaction in hex format.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | No       | string          |
| msg.from                                    | query      | from is the ethereum signer address in hex format. This address value is checked against the address derived from the signature (V, R, S) using the secp256k1 elliptic curve.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | No       | string          |
| trace_config.tracer                         | query      | tracer is a custom javascript tracer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | No       | string          |
| trace_config.timeout                        | query      | timeout overrides the default timeout of 5 seconds for JavaScript-based tracing calls.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | No       | string          |
| trace_config.reexec                         | query      | reexec defines the number of blocks the tracer is willing to go back.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | No       | string (uint64) |
| trace_config.disable_stack                  | query      | disable_stack switches stack capture.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | No       | boolean         |
| trace_config.disable_storage                | query      | disable_storage switches storage capture.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | No       | boolean         |
| trace_config.debug                          | query      | debug can be used to print output during capture end.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | No       | boolean         |
| trace_config.limit                          | query      | limit defines the maximum length of output, but zero means unlimited.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | No       | integer         |
| trace_config.overrides.homestead_block      | query      | homestead_block switch (nil no fork, 0 = already homestead).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | No       | string          |
| trace_config.overrides.dao_fork_block       | query      | dao_fork_block corresponds to TheDAO hard-fork switch block (nil no fork).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | No       | string          |
| trace_config.overrides.dao_fork_support     | query      | dao_fork_support defines whether the nodes supports or opposes the DAO hard-fork.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | No       | boolean         |
| trace_config.overrides.eip150_block         | query      | eip150_block: EIP150 implements the Gas price changes (<https://github.com/ethereum/EIPs/issues/150>) EIP150 HF block (nil no fork).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | No       | string          |
| trace_config.overrides.eip150_hash          | query      | eip150_hash: EIP150 HF hash (needed for header only clients as only gas pricing changed).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | No       | string          |
| trace_config.overrides.eip155_block         | query      | eip155_block: EIP155Block HF block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | No       | string          |
| trace_config.overrides.eip158_block         | query      | eip158_block: EIP158 HF block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | No       | string          |
| trace_config.overrides.byzantium_block      | query      | byzantium_block: Byzantium switch block (nil no fork, 0 = already on byzantium).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | No       | string          |
| trace_config.overrides.constantinople_block | query      | constantinople_block: Constantinople switch block (nil no fork, 0 = already activated).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | No       | string          |
| trace_config.overrides.petersburg_block     | query      | petersburg_block: Petersburg switch block (nil same as Constantinople).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | No       | string          |
| trace_config.overrides.istanbul_block       | query      | istanbul_block: Istanbul switch block (nil no fork, 0 = already on istanbul).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | No       | string          |
| trace_config.overrides.muir_glacier_block   | query      | muir_glacier_block: Eip-2384 (bomb delay) switch block (nil no fork, 0 = already activated).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | No       | string          |
| trace_config.overrides.berlin_block         | query      | berlin_block: Berlin switch block (nil = no fork, 0 = already on berlin).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | No       | string          |
| trace_config.overrides.london_block         | query      | london_block: London switch block (nil = no fork, 0 = already on london).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | No       | string          |
| trace_config.overrides.arrow_glacier_block  | query      | arrow_glacier_block: Eip-4345 (bomb delay) switch block (nil = no fork, 0 = already activated).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | No       | string          |
| trace_config.overrides.gray_glacier_block   | query      | gray_glacier_block: EIP-5133 (bomb delay) switch block (nil = no fork, 0 = already activated).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | No       | string          |
| trace_config.overrides.merge_netsplit_block | query      | merge_netsplit_block: Virtual fork after The Merge to use as a network splitter.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | No       | string          |
| trace_config.overrides.shanghai_block       | query      | shanghai_block switch block (nil = no fork, 0 = already on shanghai).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | No       | string          |
| trace_config.overrides.cancun_block         | query      | cancun_block switch block (nil = no fork, 0 = already on cancun).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | No       | string          |
| trace_config.enable_memory                  | query      | enable_memory switches memory capture.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | No       | boolean         |
| trace_config.enable_return_data             | query      | enable_return_data switches the capture of return data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | No       | boolean         |
| trace_config.tracer_json_config             | query      | tracer_json_config configures the tracer using a JSON string.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | No       | string          |
| block_number                                | query      | block_number of requested transaction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | No       | string (int64)  |
| block_hash                                  | query      | block_hash of requested transaction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | No       | string          |
| block_time                                  | query      | block_time of requested transaction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | No       | dateTime        |
| proposer_address                            | query      | proposer_address is the proposer of the requested block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | No       | byte            |
| chain_id                                    | query      | chain_id is the the eip155 chain id parsed from the requested block header.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | No       | string (int64)  |
| block_max_gas                               | query      | block_max_gas of the block of the requested transaction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | No       | string (int64)  |

##### Responses

| Code    | Description                   | Schema                                                                          |
| ------- | ----------------------------- | ------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ethermint.evm.v1.QueryTraceTxResponse](#ethermint.evm.v1.QueryTraceTxResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                       |

### **evm.validatorAccount**

#### GET

##### Summary

ValidatorAccount queries an Ethereum account's from a validator consensus
Address.

##### Parameters

| Name         | Located in | Description                                                          | Required | Schema |
| ------------ | ---------- | -------------------------------------------------------------------- | -------- | ------ |
| cons_address | path       | cons_address is the validator cons address to query the account for. | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                            |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ethermint.evm.v1.QueryValidatorAccountResponse](#ethermint.evm.v1.QueryValidatorAccountResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                         |

### **feemarket.baseFee**

#### GET

##### Summary

BaseFee queries the base fee of the parent block of the current block.

##### Responses

| Code    | Description                   | Schema                                                                                      |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ethermint.feemarket.v1.QueryBaseFeeResponse](#ethermint.feemarket.v1.QueryBaseFeeResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                   |

### **feemarket.blockGas**

#### GET

##### Summary

BlockGas queries the gas used at a given block height

##### Responses

| Code    | Description                   | Schema                                                                                        |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ethermint.feemarket.v1.QueryBlockGasResponse](#ethermint.feemarket.v1.QueryBlockGasResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                     |

### **feemarket.params**

#### GET

##### Summary

Params queries the parameters of x/feemarket module.

##### Responses

| Code    | Description                   | Schema                                                                                    |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ethermint.feemarket.v1.QueryParamsResponse](#ethermint.feemarket.v1.QueryParamsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                 |

### **claims.claimsRecords**

#### GET

##### Summary

ClaimsRecords returns all claims records

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                    |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.claims.v1.QueryClaimsRecordsResponse](#evmos.claims.v1.QueryClaimsRecordsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                 |

### **claims.claimsRecord**

#### GET

##### Summary

ClaimsRecord returns the claims record for a given address

##### Parameters

| Name    | Located in | Description                                         | Required | Schema |
| ------- | ---------- | --------------------------------------------------- | -------- | ------ |
| address | path       | address defines the user to query claims record for | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                  |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.claims.v1.QueryClaimsRecordResponse](#evmos.claims.v1.QueryClaimsRecordResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                               |

### **claims.params**

#### GET

##### Summary

Params returns the claims module parameters

##### Responses

| Code    | Description                   | Schema                                                                      |
| ------- | ----------------------------- | --------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.claims.v1.QueryParamsResponse](#evmos.claims.v1.QueryParamsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                   |

### **claims.totalUnclaimed**

#### GET

##### Summary

TotalUnclaimed queries the total unclaimed tokens from the airdrop

##### Responses

| Code    | Description                   | Schema                                                                                      |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.claims.v1.QueryTotalUnclaimedResponse](#evmos.claims.v1.QueryTotalUnclaimedResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                   |

### **epochs.currentEpoch**

#### GET

##### Summary

CurrentEpoch provide current epoch of specified identifier

##### Parameters

| Name       | Located in | Description                      | Required | Schema |
| ---------- | ---------- | -------------------------------- | -------- | ------ |
| identifier | query      | identifier of the current epoch. | No       | string |

##### Responses

| Code    | Description                   | Schema                                                                                  |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.epochs.v1.QueryCurrentEpochResponse](#evmos.epochs.v1.QueryCurrentEpochResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                               |

### **epochs.epochInfos**

#### GET

##### Summary

EpochInfos provide running epochInfos

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                              |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.epochs.v1.QueryEpochsInfoResponse](#evmos.epochs.v1.QueryEpochsInfoResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                           |

### **erc20.params**

#### GET

##### Summary

Params retrieves the erc20 module params

##### Responses

| Code    | Description                   | Schema                                                                    |
| ------- | ----------------------------- | ------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.erc20.v1.QueryParamsResponse](#evmos.erc20.v1.QueryParamsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                 |

### **erc20.tokenPairs**

#### GET

##### Summary

TokenPairs retrieves registered token pairs

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                            |
| ------- | ----------------------------- | --------------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.erc20.v1.QueryTokenPairsResponse](#evmos.erc20.v1.QueryTokenPairsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                         |

### **erc20.tokenPair**

#### GET

##### Summary

TokenPair retrieves a registered token pair

##### Parameters

| Name  | Located in | Description                                                                                          | Required | Schema |
| ----- | ---------- | ---------------------------------------------------------------------------------------------------- | -------- | ------ |
| token | path       | token identifier can be either the hex contract address of the ERC20 or the Cosmos base denomination | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                          |
| ------- | ----------------------------- | ------------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.erc20.v1.QueryTokenPairResponse](#evmos.erc20.v1.QueryTokenPairResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                       |

### **incentives.allocationMeters**

#### GET

##### Summary

AllocationMeters retrieves active allocation meters for a given
denomination

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                                  |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.incentives.v1.QueryAllocationMetersResponse](#evmos.incentives.v1.QueryAllocationMetersResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                               |

### **incentives.allocationMeter**

#### GET

##### Summary

AllocationMeter retrieves a active gas meter

##### Parameters

| Name  | Located in | Description                                               | Required | Schema |
| ----- | ---------- | --------------------------------------------------------- | -------- | ------ |
| denom | path       | denom is the coin denom to query an allocation meter for. | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                                |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.incentives.v1.QueryAllocationMeterResponse](#evmos.incentives.v1.QueryAllocationMeterResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                             |

### **incentives.gasMeters**

#### GET

##### Summary

GasMeters retrieves active gas meters for a given contract

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| contract               | path       | contract is the hex contract address of a incentivized smart contract                                                                                                                                                              | Yes      | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                    |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.incentives.v1.QueryGasMetersResponse](#evmos.incentives.v1.QueryGasMetersResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                 |

### **incentives.gasMeter**

#### GET

##### Summary

GasMeter retrieves a active gas meter

##### Parameters

| Name        | Located in | Description                                        | Required | Schema |
| ----------- | ---------- | -------------------------------------------------- | -------- | ------ |
| contract    | path       | contract is the hex contract address of a contract | Yes      | string |
| participant | path       | participant is the hex address of a user           | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                  |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.incentives.v1.QueryGasMeterResponse](#evmos.incentives.v1.QueryGasMeterResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                               |

### **incentives.incentives**

#### GET

##### Summary

Incentives retrieves registered incentives

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                      |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.incentives.v1.QueryIncentivesResponse](#evmos.incentives.v1.QueryIncentivesResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                   |

### **incentives.incentive**

#### GET

##### Summary

Incentive retrieves a registered incentive

##### Parameters

| Name     | Located in | Description                                                           | Required | Schema |
| -------- | ---------- | --------------------------------------------------------------------- | -------- | ------ |
| contract | path       | contract is the hex contract address of a incentivized smart contract | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                    |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.incentives.v1.QueryIncentiveResponse](#evmos.incentives.v1.QueryIncentiveResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                 |

### **incentives.params**

#### GET

##### Summary

Params retrieves the incentives module params

##### Responses

| Code    | Description                   | Schema                                                                              |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.incentives.v1.QueryParamsResponse](#evmos.incentives.v1.QueryParamsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                           |

### **inflation.circulatingSupply**

#### GET

##### Summary

CirculatingSupply retrieves the total number of tokens that are in
circulation (i.e. excluding unvested tokens).

##### Responses

| Code    | Description                   | Schema                                                                                                  |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.inflation.v1.QueryCirculatingSupplyResponse](#evmos.inflation.v1.QueryCirculatingSupplyResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                               |

### **inflation.epochMintProvision**

#### GET

##### Summary

EpochMintProvision retrieves current minting epoch provision value.

##### Responses

| Code    | Description                   | Schema                                                                                                    |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.inflation.v1.QueryEpochMintProvisionResponse](#evmos.inflation.v1.QueryEpochMintProvisionResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                 |

### **inflation.inflationRate**

#### GET

##### Summary

InflationRate retrieves the inflation rate of the current period.

##### Responses

| Code    | Description                   | Schema                                                                                          |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.inflation.v1.QueryInflationRateResponse](#evmos.inflation.v1.QueryInflationRateResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                       |

### **inflation.params**

#### GET

##### Summary

Params retrieves the total set of minting parameters.

##### Responses

| Code    | Description                   | Schema                                                                            |
| ------- | ----------------------------- | --------------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.inflation.v1.QueryParamsResponse](#evmos.inflation.v1.QueryParamsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                         |

### **inflation.period**

#### GET

##### Summary

Period retrieves current period.

##### Responses

| Code    | Description                   | Schema                                                                            |
| ------- | ----------------------------- | --------------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.inflation.v1.QueryPeriodResponse](#evmos.inflation.v1.QueryPeriodResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                         |

### **inflation.skippedEpochs**

#### GET

##### Summary

SkippedEpochs retrieves the total number of skipped epochs.

##### Responses

| Code    | Description                   | Schema                                                                                          |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.inflation.v1.QuerySkippedEpochsResponse](#evmos.inflation.v1.QuerySkippedEpochsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                       |

### **recovery.params**

#### GET

##### Summary

Params retrieves the total set of recovery parameters.

##### Responses

| Code    | Description                   | Schema                                                                          |
| ------- | ----------------------------- | ------------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.recovery.v1.QueryParamsResponse](#evmos.recovery.v1.QueryParamsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                       |

### **revenue.params**

#### GET

##### Summary

Params retrieves the revenue module params

##### Responses

| Code    | Description                   | Schema                                                                        |
| ------- | ----------------------------- | ----------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.revenue.v1.QueryParamsResponse](#evmos.revenue.v1.QueryParamsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                     |

### **revenue.revenues**

#### GET

##### Summary

Revenues retrieves all registered revenues

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                            |
| ------- | ----------------------------- | --------------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.revenue.v1.QueryRevenuesResponse](#evmos.revenue.v1.QueryRevenuesResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                         |

### **revenue.revenue**

#### GET

##### Summary

Revenue retrieves a registered revenue for a given contract address

##### Parameters

| Name             | Located in | Description                                             | Required | Schema |
| ---------------- | ---------- | ------------------------------------------------------- | -------- | ------ |
| contract_address | path       | contract_address of a registered contract in hex format | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                          |
| ------- | ----------------------------- | ------------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.revenue.v1.QueryRevenueResponse](#evmos.revenue.v1.QueryRevenueResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                       |

### **revenue.deployerRevenues**

#### GET

##### Summary

DeployerRevenues retrieves all revenues that a given deployer has
registered

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| deployer_address       | path       | deployer_address in bech32 format                                                                                                                                                                                                  | Yes      | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                            |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.revenue.v1.QueryDeployerRevenuesResponse](#evmos.revenue.v1.QueryDeployerRevenuesResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                         |

### **revenue.withdrawerRevenues**

#### GET

##### Summary

WithdrawerRevenues retrieves all revenues with a given withdrawer
address

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| withdrawer_address     | path       | withdrawer_address in bech32 format                                                                                                                                                                                                | Yes      | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                                |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.revenue.v1.QueryWithdrawerRevenuesResponse](#evmos.revenue.v1.QueryWithdrawerRevenuesResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                             |

### **vesting.balances**

#### GET

##### Summary

Balances retrieves the unvested, vested and locked tokens for a vesting account

##### Parameters

| Name    | Located in | Description                             | Required | Schema |
| ------- | ---------- | --------------------------------------- | -------- | ------ |
| address | path       | address of the clawback vesting account | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                            |
| ------- | ----------------------------- | --------------------------------------------------------------------------------- |
| 200     | A successful response.        | [evmos.vesting.v1.QueryBalancesResponse](#evmos.vesting.v1.QueryBalancesResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                         |

### **apps.feeEnabledChannel**

#### GET

##### Summary

FeeEnabledChannel returns true if the provided port and channel identifiers belong to a fee enabled channel

##### Parameters

| Name       | Located in | Description               | Required | Schema |
| ---------- | ---------- | ------------------------- | -------- | ------ |
| channel_id | path       | unique channel identifier | Yes      | string |
| port_id    | path       | unique port identifier    | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                                            |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.applications.fee.v1.QueryFeeEnabledChannelResponse](#ibc.applications.fee.v1.QueryFeeEnabledChannelResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                         |

### **apps.incentivizedPacketsForChannel**

#### GET

##### Summary

Gets all incentivized packets for a specific channel

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| channel_id             | path       |                                                                                                                                                                                                                                    | Yes      | string          |
| port_id                | path       |                                                                                                                                                                                                                                    | Yes      | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |
| query_height           | query      | Height to query at.                                                                                                                                                                                                                | No       | string (uint64) |

##### Responses

| Code    | Description                   | Schema                                                                                                                                    |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.applications.fee.v1.QueryIncentivizedPacketsForChannelResponse](#ibc.applications.fee.v1.QueryIncentivizedPacketsForChannelResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                                                 |

### **apps.counterpartyPayee**

#### GET

##### Summary

CounterpartyPayee returns the registered counterparty payee for forward relaying

##### Parameters

| Name       | Located in | Description                                                 | Required | Schema |
| ---------- | ---------- | ----------------------------------------------------------- | -------- | ------ |
| channel_id | path       | unique channel identifier                                   | Yes      | string |
| relayer    | path       | the relayer address to which the counterparty is registered | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                                            |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.applications.fee.v1.QueryCounterpartyPayeeResponse](#ibc.applications.fee.v1.QueryCounterpartyPayeeResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                         |

### **apps.payee**

#### GET

##### Summary

Payee returns the registered payee address for a specific channel given the relayer address

##### Parameters

| Name       | Located in | Description                                                         | Required | Schema |
| ---------- | ---------- | ------------------------------------------------------------------- | -------- | ------ |
| channel_id | path       | unique channel identifier                                           | Yes      | string |
| relayer    | path       | the relayer address to which the distribution address is registered | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                    |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.applications.fee.v1.QueryPayeeResponse](#ibc.applications.fee.v1.QueryPayeeResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                 |

### **apps.incentivizedPacket**

#### GET

##### Summary

IncentivizedPacket returns all packet fees for a packet given its identifier

##### Parameters

| Name                 | Located in | Description                     | Required | Schema          |
| -------------------- | ---------- | ------------------------------- | -------- | --------------- |
| packet_id.channel_id | path       | channel unique identifier       | Yes      | string          |
| packet_id.port_id    | path       | channel port identifier         | Yes      | string          |
| packet_id.sequence   | path       | packet sequence                 | Yes      | string (uint64) |
| query_height         | query      | block height at which to query. | No       | string (uint64) |

##### Responses

| Code    | Description                   | Schema                                                                                                              |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.applications.fee.v1.QueryIncentivizedPacketResponse](#ibc.applications.fee.v1.QueryIncentivizedPacketResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                           |

### **apps.totalAckFees**

#### GET

##### Summary

TotalAckFees returns the total acknowledgement fees for a packet given its identifier

##### Parameters

| Name                 | Located in | Description               | Required | Schema          |
| -------------------- | ---------- | ------------------------- | -------- | --------------- |
| packet_id.channel_id | path       | channel unique identifier | Yes      | string          |
| packet_id.port_id    | path       | channel port identifier   | Yes      | string          |
| packet_id.sequence   | path       | packet sequence           | Yes      | string (uint64) |

##### Responses

| Code    | Description                   | Schema                                                                                                  |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.applications.fee.v1.QueryTotalAckFeesResponse](#ibc.applications.fee.v1.QueryTotalAckFeesResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                               |

### **apps.totalRecvFees**

#### GET

##### Summary

TotalRecvFees returns the total receive fees for a packet given its identifier

##### Parameters

| Name                 | Located in | Description               | Required | Schema          |
| -------------------- | ---------- | ------------------------- | -------- | --------------- |
| packet_id.channel_id | path       | channel unique identifier | Yes      | string          |
| packet_id.port_id    | path       | channel port identifier   | Yes      | string          |
| packet_id.sequence   | path       | packet sequence           | Yes      | string (uint64) |

##### Responses

| Code    | Description                   | Schema                                                                                                    |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.applications.fee.v1.QueryTotalRecvFeesResponse](#ibc.applications.fee.v1.QueryTotalRecvFeesResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                 |

### **apps.totalTimeoutFees**

#### GET

##### Summary

TotalTimeoutFees returns the total timeout fees for a packet given its identifier

##### Parameters

| Name                 | Located in | Description               | Required | Schema          |
| -------------------- | ---------- | ------------------------- | -------- | --------------- |
| packet_id.channel_id | path       | channel unique identifier | Yes      | string          |
| packet_id.port_id    | path       | channel port identifier   | Yes      | string          |
| packet_id.sequence   | path       | packet sequence           | Yes      | string (uint64) |

##### Responses

| Code    | Description                   | Schema                                                                                                          |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.applications.fee.v1.QueryTotalTimeoutFeesResponse](#ibc.applications.fee.v1.QueryTotalTimeoutFeesResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                       |

### **apps.feeEnabledChannels**

#### GET

##### Summary

FeeEnabledChannels returns a list of all fee enabled channels

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |
| query_height           | query      | block height at which to query.                                                                                                                                                                                                    | No       | string (uint64) |

##### Responses

| Code    | Description                   | Schema                                                                                                              |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.applications.fee.v1.QueryFeeEnabledChannelsResponse](#ibc.applications.fee.v1.QueryFeeEnabledChannelsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                           |

### **apps.incentivizedPackets**

#### GET

##### Summary

IncentivizedPackets returns all incentivized packets and their associated fees

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |
| query_height           | query      | block height at which to query.                                                                                                                                                                                                    | No       | string (uint64) |

##### Responses

| Code    | Description                   | Schema                                                                                                                |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.applications.fee.v1.QueryIncentivizedPacketsResponse](#ibc.applications.fee.v1.QueryIncentivizedPacketsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                             |

### **apps.interchainAccount**

#### GET

##### Summary

InterchainAccount returns the interchain account address for a given owner address on a given connection

##### Parameters

| Name          | Located in | Description | Required | Schema |
| ------------- | ---------- | ----------- | -------- | ------ |
| owner         | path       |             | Yes      | string |
| connection_id | path       |             | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                                                                                                  |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.applications.interchain_accounts.controller.v1.QueryInterchainAccountResponse](#ibc.applications.interchain_accounts.controller.v1.QueryInterchainAccountResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                                                                               |

### **apps.params**

#### GET

##### Summary

Params queries all parameters of the ICA controller submodule.

##### Responses

| Code    | Description                   | Schema                                                                                                                                            |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.applications.interchain_accounts.controller.v1.QueryParamsResponse](#ibc.applications.interchain_accounts.controller.v1.QueryParamsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                                                         |

### **apps.params**

#### GET

##### Summary

Params queries all parameters of the ICA host submodule.

##### Responses

| Code    | Description                   | Schema                                                                                                                                |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.applications.interchain_accounts.host.v1.QueryParamsResponse](#ibc.applications.interchain_accounts.host.v1.QueryParamsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                                             |

### **apps.escrowAddress**

#### GET

##### Summary

EscrowAddress returns the escrow address for a particular port and channel id.

##### Parameters

| Name       | Located in | Description               | Required | Schema |
| ---------- | ---------- | ------------------------- | -------- | ------ |
| channel_id | path       | unique channel identifier | Yes      | string |
| port_id    | path       | unique port identifier    | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                                              |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.applications.transfer.v1.QueryEscrowAddressResponse](#ibc.applications.transfer.v1.QueryEscrowAddressResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                           |

### **apps.denomHash**

#### GET

##### Summary

DenomHash queries a denomination hash information.

##### Parameters

| Name  | Located in | Description                                              | Required | Schema |
| ----- | ---------- | -------------------------------------------------------- | -------- | ------ |
| trace | path       | The denomination trace ([port_id]/[channel_id])+/[denom] | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                                      |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.applications.transfer.v1.QueryDenomHashResponse](#ibc.applications.transfer.v1.QueryDenomHashResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                   |

### **apps.denomTraces**

#### GET

##### Summary

DenomTraces queries all denomination traces.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                                          |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.applications.transfer.v1.QueryDenomTracesResponse](#ibc.applications.transfer.v1.QueryDenomTracesResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                       |

### **apps.denomTrace**

#### GET

##### Summary

DenomTrace queries a denomination trace information.

##### Parameters

| Name | Located in | Description                                                                                       | Required | Schema |
| ---- | ---------- | ------------------------------------------------------------------------------------------------- | -------- | ------ |
| hash | path       | hash (in hex format) or denom (full denom with ibc prefix) of the denomination trace information. | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                                        |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.applications.transfer.v1.QueryDenomTraceResponse](#ibc.applications.transfer.v1.QueryDenomTraceResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                     |

### **apps.totalEscrowForDenom**

#### GET

##### Summary

TotalEscrowForDenom returns the total amount of tokens in escrow based on the denom.

##### Parameters

| Name  | Located in | Description | Required | Schema |
| ----- | ---------- | ----------- | -------- | ------ |
| denom | path       |             | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                                                          |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.applications.transfer.v1.QueryTotalEscrowForDenomResponse](#ibc.applications.transfer.v1.QueryTotalEscrowForDenomResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                                       |

### **apps.params**

#### GET

##### Summary

Params queries all parameters of the ibc-transfer module.

##### Responses

| Code    | Description                   | Schema                                                                                                |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.applications.transfer.v1.QueryParamsResponse](#ibc.applications.transfer.v1.QueryParamsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                             |

### **core.channels**

#### GET

##### Summary

Channels queries all the IBC channels of a chain.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                  |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.channel.v1.QueryChannelsResponse](#ibc.core.channel.v1.QueryChannelsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                               |

### **core.channel**

#### GET

##### Summary

Channel queries an IBC Channel.

##### Parameters

| Name       | Located in | Description               | Required | Schema |
| ---------- | ---------- | ------------------------- | -------- | ------ |
| channel_id | path       | channel unique identifier | Yes      | string |
| port_id    | path       | port unique identifier    | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.channel.v1.QueryChannelResponse](#ibc.core.channel.v1.QueryChannelResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                             |

### **core.channelClientState**

#### GET

##### Summary

ChannelClientState queries for the client state for the channel associated
with the provided channel identifiers.

##### Parameters

| Name       | Located in | Description               | Required | Schema |
| ---------- | ---------- | ------------------------- | -------- | ------ |
| channel_id | path       | channel unique identifier | Yes      | string |
| port_id    | path       | port unique identifier    | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                                      |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.channel.v1.QueryChannelClientStateResponse](#ibc.core.channel.v1.QueryChannelClientStateResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                   |

### **core.channelConsensusState**

#### GET

##### Summary

ChannelConsensusState queries for the consensus state for the channel
associated with the provided channel identifiers.

##### Parameters

| Name            | Located in | Description                            | Required | Schema          |
| --------------- | ---------- | -------------------------------------- | -------- | --------------- |
| channel_id      | path       | channel unique identifier              | Yes      | string          |
| port_id         | path       | port unique identifier                 | Yes      | string          |
| revision_number | path       | revision number of the consensus state | Yes      | string (uint64) |
| revision_height | path       | revision height of the consensus state | Yes      | string (uint64) |

##### Responses

| Code    | Description                   | Schema                                                                                                            |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.channel.v1.QueryChannelConsensusStateResponse](#ibc.core.channel.v1.QueryChannelConsensusStateResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                         |

### **core.nextSequenceReceive**

#### GET

##### Summary

NextSequenceReceive returns the next receive sequence for a given channel.

##### Parameters

| Name       | Located in | Description               | Required | Schema |
| ---------- | ---------- | ------------------------- | -------- | ------ |
| channel_id | path       | channel unique identifier | Yes      | string |
| port_id    | path       | port unique identifier    | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                                        |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.channel.v1.QueryNextSequenceReceiveResponse](#ibc.core.channel.v1.QueryNextSequenceReceiveResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                     |

### **core.nextSequenceSend**

#### GET

##### Summary

NextSequenceSend returns the next send sequence for a given channel.

##### Parameters

| Name       | Located in | Description               | Required | Schema |
| ---------- | ---------- | ------------------------- | -------- | ------ |
| channel_id | path       | channel unique identifier | Yes      | string |
| port_id    | path       | port unique identifier    | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                                  |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.channel.v1.QueryNextSequenceSendResponse](#ibc.core.channel.v1.QueryNextSequenceSendResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                               |

### **core.packetAcknowledgements**

#### GET

##### Summary

PacketAcknowledgements returns all the packet acknowledgements associated
with a channel.

##### Parameters

| Name                        | Located in | Description                                                                                                                                                                                                                        | Required | Schema              |
| --------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------- |
| channel_id                  | path       | channel unique identifier                                                                                                                                                                                                          | Yes      | string              |
| port_id                     | path       | port unique identifier                                                                                                                                                                                                             | Yes      | string              |
| pagination.key              | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte                |
| pagination.offset           | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64)     |
| pagination.limit            | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64)     |
| pagination.count_total      | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean             |
| pagination.reverse          | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean             |
| packet_commitment_sequences | query      | list of packet sequences.                                                                                                                                                                                                          | No       | [ string (uint64) ] |

##### Responses

| Code    | Description                   | Schema                                                                                                              |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.channel.v1.QueryPacketAcknowledgementsResponse](#ibc.core.channel.v1.QueryPacketAcknowledgementsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                           |

### **core.packetAcknowledgement**

#### GET

##### Summary

PacketAcknowledgement queries a stored packet acknowledgement hash.

##### Parameters

| Name       | Located in | Description               | Required | Schema          |
| ---------- | ---------- | ------------------------- | -------- | --------------- |
| channel_id | path       | channel unique identifier | Yes      | string          |
| port_id    | path       | port unique identifier    | Yes      | string          |
| sequence   | path       | packet sequence           | Yes      | string (uint64) |

##### Responses

| Code    | Description                   | Schema                                                                                                            |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.channel.v1.QueryPacketAcknowledgementResponse](#ibc.core.channel.v1.QueryPacketAcknowledgementResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                         |

### **core.packetCommitments**

#### GET

##### Summary

PacketCommitments returns all the packet commitments hashes associated
with a channel.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| channel_id             | path       | channel unique identifier                                                                                                                                                                                                          | Yes      | string          |
| port_id                | path       | port unique identifier                                                                                                                                                                                                             | Yes      | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                                    |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.channel.v1.QueryPacketCommitmentsResponse](#ibc.core.channel.v1.QueryPacketCommitmentsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                 |

### **core.unreceivedAcks**

#### GET

##### Summary

UnreceivedAcks returns all the unreceived IBC acknowledgements associated
with a channel and sequences.

##### Parameters

| Name                 | Located in | Description                       | Required | Schema              |
| -------------------- | ---------- | --------------------------------- | -------- | ------------------- |
| channel_id           | path       | channel unique identifier         | Yes      | string              |
| port_id              | path       | port unique identifier            | Yes      | string              |
| packet_ack_sequences | path       | list of acknowledgement sequences | Yes      | [ string (uint64) ] |

##### Responses

| Code    | Description                   | Schema                                                                                              |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.channel.v1.QueryUnreceivedAcksResponse](#ibc.core.channel.v1.QueryUnreceivedAcksResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                           |

### **core.unreceivedPackets**

#### GET

##### Summary

UnreceivedPackets returns all the unreceived IBC packets associated with a
channel and sequences.

##### Parameters

| Name                        | Located in | Description               | Required | Schema              |
| --------------------------- | ---------- | ------------------------- | -------- | ------------------- |
| channel_id                  | path       | channel unique identifier | Yes      | string              |
| port_id                     | path       | port unique identifier    | Yes      | string              |
| packet_commitment_sequences | path       | list of packet sequences  | Yes      | [ string (uint64) ] |

##### Responses

| Code    | Description                   | Schema                                                                                                    |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.channel.v1.QueryUnreceivedPacketsResponse](#ibc.core.channel.v1.QueryUnreceivedPacketsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                 |

### **core.packetCommitment**

#### GET

##### Summary

PacketCommitment queries a stored packet commitment hash.

##### Parameters

| Name       | Located in | Description               | Required | Schema          |
| ---------- | ---------- | ------------------------- | -------- | --------------- |
| channel_id | path       | channel unique identifier | Yes      | string          |
| port_id    | path       | port unique identifier    | Yes      | string          |
| sequence   | path       | packet sequence           | Yes      | string (uint64) |

##### Responses

| Code    | Description                   | Schema                                                                                                  |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.channel.v1.QueryPacketCommitmentResponse](#ibc.core.channel.v1.QueryPacketCommitmentResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                               |

### **core.packetReceipt**

#### GET

##### Summary

PacketReceipt queries if a given packet sequence has been received on the
queried chain

##### Parameters

| Name       | Located in | Description               | Required | Schema          |
| ---------- | ---------- | ------------------------- | -------- | --------------- |
| channel_id | path       | channel unique identifier | Yes      | string          |
| port_id    | path       | port unique identifier    | Yes      | string          |
| sequence   | path       | packet sequence           | Yes      | string (uint64) |

##### Responses

| Code    | Description                   | Schema                                                                                            |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.channel.v1.QueryPacketReceiptResponse](#ibc.core.channel.v1.QueryPacketReceiptResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                         |

### **core.connectionChannels**

#### GET

##### Summary

ConnectionChannels queries all the channels associated with a connection
end.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| connection             | path       | connection unique identifier                                                                                                                                                                                                       | Yes      | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                                      |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.channel.v1.QueryConnectionChannelsResponse](#ibc.core.channel.v1.QueryConnectionChannelsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                   |

### **core.clientStates**

#### GET

##### Summary

ClientStates queries all the IBC light clients of a chain.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                        |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.client.v1.QueryClientStatesResponse](#ibc.core.client.v1.QueryClientStatesResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                     |

### **core.clientState**

#### GET

##### Summary

ClientState queries an IBC light client.

##### Parameters

| Name      | Located in | Description                    | Required | Schema |
| --------- | ---------- | ------------------------------ | -------- | ------ |
| client_id | path       | client state unique identifier | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                      |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.client.v1.QueryClientStateResponse](#ibc.core.client.v1.QueryClientStateResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                   |

### **core.clientStatus**

#### GET

##### Summary

Status queries the status of an IBC client.

##### Parameters

| Name      | Located in | Description              | Required | Schema |
| --------- | ---------- | ------------------------ | -------- | ------ |
| client_id | path       | client unique identifier | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                        |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.client.v1.QueryClientStatusResponse](#ibc.core.client.v1.QueryClientStatusResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                     |

### **core.consensusStates**

#### GET

##### Summary

ConsensusStates queries all the consensus state associated with a given
client.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| client_id              | path       | client identifier                                                                                                                                                                                                                  | Yes      | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                              |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.client.v1.QueryConsensusStatesResponse](#ibc.core.client.v1.QueryConsensusStatesResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                           |

### **core.consensusStateHeights**

#### GET

##### Summary

ConsensusStateHeights queries the height of every consensus states associated with a given client.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| client_id              | path       | client identifier                                                                                                                                                                                                                  | Yes      | string          |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                                          |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.client.v1.QueryConsensusStateHeightsResponse](#ibc.core.client.v1.QueryConsensusStateHeightsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                       |

### **core.consensusState**

#### GET

##### Summary

ConsensusState queries a consensus state associated with a client state at
a given height.

##### Parameters

| Name            | Located in | Description                                                                             | Required | Schema          |
| --------------- | ---------- | --------------------------------------------------------------------------------------- | -------- | --------------- |
| client_id       | path       | client identifier                                                                       | Yes      | string          |
| revision_number | path       | consensus state revision number                                                         | Yes      | string (uint64) |
| revision_height | path       | consensus state revision height                                                         | Yes      | string (uint64) |
| latest_height   | query      | latest_height overrrides the height field and queries the latest stored ConsensusState. | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                            |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.client.v1.QueryConsensusStateResponse](#ibc.core.client.v1.QueryConsensusStateResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                         |

### **core.clientParams**

#### GET

##### Summary

ClientParams queries all parameters of the ibc client submodule.

##### Responses

| Code    | Description                   | Schema                                                                                        |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.client.v1.QueryClientParamsResponse](#ibc.core.client.v1.QueryClientParamsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                     |

### **core.upgradedClientState**

#### GET

##### Summary

UpgradedClientState queries an Upgraded IBC light client.

##### Responses

| Code    | Description                   | Schema                                                                                                      |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.client.v1.QueryUpgradedClientStateResponse](#ibc.core.client.v1.QueryUpgradedClientStateResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                   |

### **core.upgradedConsensusState**

#### GET

##### Summary

UpgradedConsensusState queries an Upgraded IBC consensus state.

##### Responses

| Code    | Description                   | Schema                                                                                                            |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.client.v1.QueryUpgradedConsensusStateResponse](#ibc.core.client.v1.QueryUpgradedConsensusStateResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                         |

### **core.clientConnections**

#### GET

##### Summary

ClientConnections queries the connection paths associated with a client
state.

##### Parameters

| Name      | Located in | Description                                    | Required | Schema |
| --------- | ---------- | ---------------------------------------------- | -------- | ------ |
| client_id | path       | client identifier associated with a connection | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                                          |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.connection.v1.QueryClientConnectionsResponse](#ibc.core.connection.v1.QueryClientConnectionsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                       |

### **core.connections**

#### GET

##### Summary

Connections queries all the IBC connections of a chain.

##### Parameters

| Name                   | Located in | Description                                                                                                                                                                                                                        | Required | Schema          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| pagination.key         | query      | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       | byte            |
| pagination.offset      | query      | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       | string (uint64) |
| pagination.limit       | query      | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       | string (uint64) |
| pagination.count_total | query      | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       | boolean         |
| pagination.reverse     | query      | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       | boolean         |

##### Responses

| Code    | Description                   | Schema                                                                                              |
| ------- | ----------------------------- | --------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.connection.v1.QueryConnectionsResponse](#ibc.core.connection.v1.QueryConnectionsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                           |

### **core.connection**

#### GET

##### Summary

Connection queries an IBC connection end.

##### Parameters

| Name          | Located in | Description                  | Required | Schema |
| ------------- | ---------- | ---------------------------- | -------- | ------ |
| connection_id | path       | connection unique identifier | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                            |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.connection.v1.QueryConnectionResponse](#ibc.core.connection.v1.QueryConnectionResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                         |

### **core.connectionClientState**

#### GET

##### Summary

ConnectionClientState queries the client state associated with the
connection.

##### Parameters

| Name          | Located in | Description           | Required | Schema |
| ------------- | ---------- | --------------------- | -------- | ------ |
| connection_id | path       | connection identifier | Yes      | string |

##### Responses

| Code    | Description                   | Schema                                                                                                                  |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.connection.v1.QueryConnectionClientStateResponse](#ibc.core.connection.v1.QueryConnectionClientStateResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                               |

### **core.connectionConsensusState**

#### GET

##### Summary

ConnectionConsensusState queries the consensus state associated with the
connection.

##### Parameters

| Name            | Located in | Description           | Required | Schema          |
| --------------- | ---------- | --------------------- | -------- | --------------- |
| connection_id   | path       | connection identifier | Yes      | string          |
| revision_number | path       |                       | Yes      | string (uint64) |
| revision_height | path       |                       | Yes      | string (uint64) |

##### Responses

| Code    | Description                   | Schema                                                                                                                        |
| ------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.connection.v1.QueryConnectionConsensusStateResponse](#ibc.core.connection.v1.QueryConnectionConsensusStateResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                                     |

### **core.connectionParams**

#### GET

##### Summary

ConnectionParams queries all parameters of the ibc connection submodule.

##### Responses

| Code    | Description                   | Schema                                                                                                        |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 200     | A successful response.        | [ibc.core.connection.v1.QueryConnectionParamsResponse](#ibc.core.connection.v1.QueryConnectionParamsResponse) |
| default | An unexpected error response. | [grpc.gateway.runtime.Error](#grpc.gateway.runtime.Error)                                                     |

### Models

#### cosmos.accounts.v1.AccountQueryResponse

AccountQueryResponse is the response type for the Query/AccountQuery RPC method.

| Name     | Type | Description                                         | Required |
| -------- | ---- | --------------------------------------------------- | -------- |
| response | byte | response defines the query response of the account. | No       |

#### google.protobuf.Any

`Any` contains an arbitrary serialized protocol buffer message along with a
URL that describes the type of the serialized message.

Protobuf library provides support to pack/unpack Any values in the form
of utility functions or additional generated methods of the Any type.

Example 1: Pack and unpack a message in C++.

    Foo foo = ...;
    Any any;
    any.PackFrom(foo);
    ...
    if (any.UnpackTo(&foo)) {
      ...
    }

Example 2: Pack and unpack a message in Java.

    Foo foo = ...;
    Any any = Any.pack(foo);
    ...
    if (any.is(Foo.class)) {
      foo = any.unpack(Foo.class);
    }

Example 3: Pack and unpack a message in Python.

    foo = Foo(...)
    any = Any()
    any.Pack(foo)
    ...
    if any.Is(Foo.DESCRIPTOR):
      any.Unpack(foo)
      ...

Example 4: Pack and unpack a message in Go

     foo := &pb.Foo{...}
     any, err := anypb.New(foo)
     if err != nil {
       ...
     }
     ...
     foo := &pb.Foo{}
     if err := any.UnmarshalTo(foo); err != nil {
       ...
     }

The pack methods provided by protobuf library will by default use
'type.googleapis.com/full.type.name' as the type URL and the unpack
methods only use the fully qualified type name after the last '/'
in the type URL, for example "foo.bar.com/x/y.z" will yield type
name "y.z".

JSON

The JSON representation of an `Any` value uses the regular
representation of the deserialized, embedded message, with an
additional field `@type` which contains the type URL. Example:

    package google.profile;
    message Person {
      string first_name = 1;
      string last_name = 2;
    }

    {
      "@type": "type.googleapis.com/google.profile.Person",
      "firstName": <string>,
      "lastName": <string>
    }

If the embedded message type is well-known and has a custom JSON
representation, that representation will be embedded adding a field
`value` which holds the custom JSON in addition to the `@type`
field. Example (for message [google.protobuf.Duration][]):

    {
      "@type": "type.googleapis.com/google.protobuf.Duration",
      "value": "1.212s"
    }

| Name     | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Required |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| type_url | string | A URL/resource name that uniquely identifies the type of the serialized protocol buffer message. This string must contain at least one "/" character. The last segment of the URL's path must represent the fully qualified name of the type (as in `path/google.protobuf.Duration`). The name should be in a canonical form (e.g., leading "." is not accepted).  In practice, teams usually precompile into the binary all types that they expect it to use in the context of Any. However, for URLs which use the scheme `http`, `https`, or no scheme, one can optionally set up a type server that maps type URLs to message definitions as follows:  *If no scheme is provided, `https` is assumed.* An HTTP GET on the URL must yield a [google.protobuf.Type][]   value in binary format, or produce an error. * Applications are allowed to cache lookup results based on the   URL, or have them precompiled into a binary to avoid any   lookup. Therefore, binary compatibility needs to be preserved   on changes to types. (Use versioned type names to manage   breaking changes.)  Note: this functionality is not currently available in the official protobuf release, and it is not used for type URLs beginning with type.googleapis.com.  Schemes other than `http`, `https` (or the empty scheme) might be used with implementation specific semantics. | No       |
| value    | byte   | Must be a valid serialized protocol buffer of the above specified type.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | No       |

#### grpc.gateway.runtime.Error

| Name    | Type                                            | Description | Required |
| ------- | ----------------------------------------------- | ----------- | -------- |
| error   | string                                          |             | No       |
| code    | integer                                         |             | No       |
| message | string                                          |             | No       |
| details | [ [google.protobuf.Any](#google.protobuf.Any) ] |             | No       |

#### cosmos.app.v1alpha1.Config

Config represents the configuration for a Cosmos SDK ABCI app.
It is intended that all state machine logic including the version of
baseapp and tx handlers (and possibly even Cometbft) that an app needs
can be described in a config object. For compatibility, the framework should
allow a mixture of declarative and imperative app wiring, however, apps
that strive for the maximum ease of maintainability should be able to describe
their state machine with a config object alone.

| Name            | Type                                                                        | Description                                                                                                                                                                                                                    | Required |
| --------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| modules         | [ [cosmos.app.v1alpha1.ModuleConfig](#cosmos.app.v1alpha1.ModuleConfig) ]   | modules are the module configurations for the app.                                                                                                                                                                             | No       |
| golang_bindings | [ [cosmos.app.v1alpha1.GolangBinding](#cosmos.app.v1alpha1.GolangBinding) ] | golang_bindings specifies explicit interface to implementation type bindings which depinject uses to resolve interface inputs to provider functions.  The scope of this field's configuration is global (not module specific). | No       |

#### cosmos.app.v1alpha1.GolangBinding

GolangBinding is an explicit interface type to implementing type binding for dependency injection.

| Name           | Type   | Description | Required |
| -------------- | ------ | ----------- | -------- |
| interface_type | string |             | No       |
| implementation | string |             | No       |

#### cosmos.app.v1alpha1.ModuleConfig

ModuleConfig is a module configuration for an app.

| Name            | Type                                                                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Required |
| --------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| name            | string                                                                      | name is the unique name of the module within the app. It should be a name that persists between different versions of a module so that modules can be smoothly upgraded to new versions.  For example, for the module cosmos.bank.module.v1.Module, we may chose to simply name the module "bank" in the app. When we upgrade to cosmos.bank.module.v2.Module, the app-specific name "bank" stays the same and the framework knows that the v2 module should receive all the same state that the v1 module had. Note: modules should provide info on which versions they can migrate from in the ModuleDescriptor.can_migration_from field. | No       |
| config          | [google.protobuf.Any](#google.protobuf.Any)                                 | config is the config object for the module. Module config messages should define a ModuleDescriptor using the cosmos.app.v1alpha1.is_module extension.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | No       |
| golang_bindings | [ [cosmos.app.v1alpha1.GolangBinding](#cosmos.app.v1alpha1.GolangBinding) ] | golang_bindings specifies explicit interface to implementation type bindings which depinject uses to resolve interface inputs to provider functions.  The scope of this field's configuration is module specific.                                                                                                                                                                                                                                                                                                                                                                                                                           | No       |

#### cosmos.app.v1alpha1.QueryConfigResponse

QueryConfigRequest is the Query/Config response type.

| Name   | Type                                                      | Description                       | Required |
| ------ | --------------------------------------------------------- | --------------------------------- | -------- |
| config | [cosmos.app.v1alpha1.Config](#cosmos.app.v1alpha1.Config) | config is the current app config. | No       |

#### cosmos.auth.v1beta1.AddressBytesToStringResponse

AddressBytesToStringResponse is the response type for AddressString rpc method.

Since: cosmos-sdk 0.46

| Name           | Type   | Description | Required |
| -------------- | ------ | ----------- | -------- |
| address_string | string |             | No       |

#### cosmos.auth.v1beta1.AddressStringToBytesResponse

AddressStringToBytesResponse is the response type for AddressBytes rpc method.

Since: cosmos-sdk 0.46

| Name          | Type | Description | Required |
| ------------- | ---- | ----------- | -------- |
| address_bytes | byte |             | No       |

#### cosmos.auth.v1beta1.BaseAccount

BaseAccount defines a base account type. It contains all the necessary fields
for basic account functionality. Any custom account type should extend this
type for additional functionality (e.g. vesting).

| Name           | Type                                        | Description | Required |
| -------------- | ------------------------------------------- | ----------- | -------- |
| address        | string                                      |             | No       |
| pub_key        | [google.protobuf.Any](#google.protobuf.Any) |             | No       |
| account_number | string (uint64)                             |             | No       |
| sequence       | string (uint64)                             |             | No       |

#### cosmos.auth.v1beta1.Bech32PrefixResponse

Bech32PrefixResponse is the response type for Bech32Prefix rpc method.

Since: cosmos-sdk 0.46

| Name          | Type   | Description | Required |
| ------------- | ------ | ----------- | -------- |
| bech32_prefix | string |             | No       |

#### cosmos.auth.v1beta1.Params

Params defines the parameters for the auth module.

| Name                      | Type            | Description | Required |
| ------------------------- | --------------- | ----------- | -------- |
| max_memo_characters       | string (uint64) |             | No       |
| tx_sig_limit              | string (uint64) |             | No       |
| tx_size_cost_per_byte     | string (uint64) |             | No       |
| sig_verify_cost_ed25519   | string (uint64) |             | No       |
| sig_verify_cost_secp256k1 | string (uint64) |             | No       |

#### cosmos.auth.v1beta1.QueryAccountAddressByIDResponse

Since: cosmos-sdk 0.46.2

| Name            | Type   | Description | Required |
| --------------- | ------ | ----------- | -------- |
| account_address | string |             | No       |

#### cosmos.auth.v1beta1.QueryAccountInfoResponse

QueryAccountInfoResponse is the Query/AccountInfo response type.

Since: cosmos-sdk 0.47

| Name | Type                                                                | Description                                                   | Required |
| ---- | ------------------------------------------------------------------- | ------------------------------------------------------------- | -------- |
| info | [cosmos.auth.v1beta1.BaseAccount](#cosmos.auth.v1beta1.BaseAccount) | info is the account info which is represented by BaseAccount. | No       |

#### cosmos.auth.v1beta1.QueryAccountResponse

QueryAccountResponse is the response type for the Query/Account RPC method.

| Name    | Type                                        | Description                                               | Required |
| ------- | ------------------------------------------- | --------------------------------------------------------- | -------- |
| account | [google.protobuf.Any](#google.protobuf.Any) | account defines the account of the corresponding address. | No       |

#### cosmos.auth.v1beta1.QueryAccountsResponse

QueryAccountsResponse is the response type for the Query/Accounts RPC method.

Since: cosmos-sdk 0.43

| Name       | Type                                                                              | Description                                        | Required |
| ---------- | --------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| accounts   | [ [google.protobuf.Any](#google.protobuf.Any) ]                                   |                                                    | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response. | No       |

#### cosmos.auth.v1beta1.QueryModuleAccountByNameResponse

QueryModuleAccountByNameResponse is the response type for the Query/ModuleAccountByName RPC method.

| Name    | Type                                        | Description | Required |
| ------- | ------------------------------------------- | ----------- | -------- |
| account | [google.protobuf.Any](#google.protobuf.Any) |             | No       |

#### cosmos.auth.v1beta1.QueryModuleAccountsResponse

QueryModuleAccountsResponse is the response type for the Query/ModuleAccounts RPC method.

Since: cosmos-sdk 0.46

| Name     | Type                                            | Description | Required |
| -------- | ----------------------------------------------- | ----------- | -------- |
| accounts | [ [google.protobuf.Any](#google.protobuf.Any) ] |             | No       |

#### cosmos.auth.v1beta1.QueryParamsResponse

QueryParamsResponse is the response type for the Query/Params RPC method.

| Name   | Type                                                      | Description                                  | Required |
| ------ | --------------------------------------------------------- | -------------------------------------------- | -------- |
| params | [cosmos.auth.v1beta1.Params](#cosmos.auth.v1beta1.Params) | params defines the parameters of the module. | No       |

#### cosmos.base.query.v1beta1.PageRequest

message SomeRequest {
         Foo some_parameter = 1;
         PageRequest pagination = 2;
 }

| Name        | Type            | Description                                                                                                                                                                                                                        | Required |
| ----------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| key         | byte            | key is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set.                                                                                        | No       |
| offset      | string (uint64) | offset is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set.                                                                                 | No       |
| limit       | string (uint64) | limit is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app.                                                                                            | No       |
| count_total | boolean         | count_total is set to true  to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. | No       |
| reverse     | boolean         | reverse is set to true if results are to be returned in the descending order.  Since: cosmos-sdk 0.43                                                                                                                              | No       |

#### cosmos.base.query.v1beta1.PageResponse

PageResponse is to be embedded in gRPC response messages where the
corresponding request message has used PageRequest.

 message SomeResponse {
         repeated Bar results = 1;
         PageResponse page = 2;
 }

| Name     | Type            | Description                                                                                                                                 | Required |
| -------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| next_key | byte            | next_key is the key to be passed to PageRequest.key to query the next page most efficiently. It will be empty if there are no more results. | No       |
| total    | string (uint64) |                                                                                                                                             | No       |

#### cosmos.authz.v1beta1.Grant

Grant gives permissions to execute
the provide method with expiration time.

| Name          | Type                                        | Description | Required |
| ------------- | ------------------------------------------- | ----------- | -------- |
| authorization | [google.protobuf.Any](#google.protobuf.Any) |             | No       |
| expiration    | dateTime                                    |             | No       |

#### cosmos.authz.v1beta1.GrantAuthorization

| Name          | Type                                        | Description | Required |
| ------------- | ------------------------------------------- | ----------- | -------- |
| granter       | string                                      |             | No       |
| grantee       | string                                      |             | No       |
| authorization | [google.protobuf.Any](#google.protobuf.Any) |             | No       |
| expiration    | dateTime                                    |             | No       |

#### cosmos.authz.v1beta1.QueryGranteeGrantsResponse

QueryGranteeGrantsResponse is the response type for the Query/GranteeGrants RPC method.

| Name       | Type                                                                                    | Description                                        | Required |
| ---------- | --------------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| grants     | [ [cosmos.authz.v1beta1.GrantAuthorization](#cosmos.authz.v1beta1.GrantAuthorization) ] | grants is a list of grants granted to the grantee. | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse)       | pagination defines an pagination for the response. | No       |

#### cosmos.authz.v1beta1.QueryGranterGrantsResponse

QueryGranterGrantsResponse is the response type for the Query/GranterGrants RPC method.

| Name       | Type                                                                                    | Description                                        | Required |
| ---------- | --------------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| grants     | [ [cosmos.authz.v1beta1.GrantAuthorization](#cosmos.authz.v1beta1.GrantAuthorization) ] | grants is a list of grants granted by the granter. | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse)       | pagination defines an pagination for the response. | No       |

#### cosmos.authz.v1beta1.QueryGrantsResponse

QueryGrantsResponse is the response type for the Query/Authorizations RPC method.

| Name       | Type                                                                              | Description                                                        | Required |
| ---------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------ | -------- |
| grants     | [ [cosmos.authz.v1beta1.Grant](#cosmos.authz.v1beta1.Grant) ]                     | authorizations is a list of grants granted for grantee by granter. | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines an pagination for the response.                 | No       |

#### cosmos.autocli.v1.AppOptionsResponse

AppOptionsResponse is the RemoteInfoService/AppOptions response type.

| Name           | Type   | Description                                                       | Required |
| -------------- | ------ | ----------------------------------------------------------------- | -------- |
| module_options | object | module_options is a map of module name to autocli module options. | No       |

#### cosmos.autocli.v1.FlagOptions

FlagOptions are options for flags generated from rpc request fields.
By default, all request fields are configured as flags based on the
kebab-case name of the field. Fields can be turned into positional arguments
instead by using RpcCommandOptions.positional_args.

| Name                 | Type    | Description                                                                                 | Required |
| -------------------- | ------- | ------------------------------------------------------------------------------------------- | -------- |
| name                 | string  | name is an alternate name to use for the field flag.                                        | No       |
| shorthand            | string  | shorthand is a one-letter abbreviated flag.                                                 | No       |
| usage                | string  | usage is the help message.                                                                  | No       |
| default_value        | string  | default_value is the default value as text.                                                 | No       |
| deprecated           | string  | deprecated is the usage text to show if this flag is deprecated.                            | No       |
| shorthand_deprecated | string  | shorthand_deprecated is the usage text to show if the shorthand of this flag is deprecated. | No       |
| hidden               | boolean |                                                                                             | No       |

#### cosmos.autocli.v1.ModuleOptions

ModuleOptions describes the CLI options for a Cosmos SDK module.

| Name  | Type                                                                                      | Description                                          | Required |
| ----- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------- | -------- |
| tx    | [cosmos.autocli.v1.ServiceCommandDescriptor](#cosmos.autocli.v1.ServiceCommandDescriptor) | tx describes the tx commands for the module.         | No       |
| query | [cosmos.autocli.v1.ServiceCommandDescriptor](#cosmos.autocli.v1.ServiceCommandDescriptor) | query describes the queries commands for the module. | No       |

#### cosmos.autocli.v1.PositionalArgDescriptor

PositionalArgDescriptor describes a positional argument.

| Name        | Type    | Description                                                                                                                                                                                              | Required |
| ----------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| proto_field | string  | proto_field specifies the proto field to use as the positional arg. Any fields used as positional args will not have a flag generated.                                                                   | No       |
| varargs     | boolean | varargs makes a positional parameter a varargs parameter. This can only be applied to last positional parameter and the proto_field must a repeated field. Note: It is mutually exclusive with optional. | No       |
| optional    | boolean | optional makes the last positional parameter optional. Note: It is mutually exclusive with varargs.                                                                                                      | No       |

#### cosmos.autocli.v1.RpcCommandOptions

RpcCommandOptions specifies options for commands generated from protobuf
rpc methods.

| Name            | Type                                                                                        | Description                                                                                                                                                                                                                                                                                                                   | Required |
| --------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| rpc_method      | string                                                                                      | rpc_method is short name of the protobuf rpc method that this command is generated from.                                                                                                                                                                                                                                      | No       |
| use             | string                                                                                      | use is the one-line usage method. It also allows specifying an alternate name for the command as the first word of the usage text.  By default the name of an rpc command is the kebab-case short name of the rpc method.                                                                                                     | No       |
| long            | string                                                                                      | long is the long message shown in the 'help <this-command>' output.                                                                                                                                                                                                                                                           | No       |
| short           | string                                                                                      | short is the short description shown in the 'help' output.                                                                                                                                                                                                                                                                    | No       |
| example         | string                                                                                      | example is examples of how to use the command.                                                                                                                                                                                                                                                                                | No       |
| alias           | [ string ]                                                                                  | alias is an array of aliases that can be used instead of the first word in Use.                                                                                                                                                                                                                                               | No       |
| suggest_for     | [ string ]                                                                                  | suggest_for is an array of command names for which this command will be suggested - similar to aliases but only suggests.                                                                                                                                                                                                     | No       |
| deprecated      | string                                                                                      | deprecated defines, if this command is deprecated and should print this string when used.                                                                                                                                                                                                                                     | No       |
| version         | string                                                                                      | version defines the version for this command. If this value is non-empty and the command does not define a "version" flag, a "version" boolean flag will be added to the command and, if specified, will print content of the "Version" variable. A shorthand "v" flag will also be added if the command does not define one. | No       |
| flag_options    | object                                                                                      | flag_options are options for flags generated from rpc request fields. By default all request fields are configured as flags. They can also be configured as positional args instead using positional_args.                                                                                                                    | No       |
| positional_args | [ [cosmos.autocli.v1.PositionalArgDescriptor](#cosmos.autocli.v1.PositionalArgDescriptor) ] | positional_args specifies positional arguments for the command.                                                                                                                                                                                                                                                               | No       |
| skip            | boolean                                                                                     | skip specifies whether to skip this rpc method when generating commands.                                                                                                                                                                                                                                                      | No       |

#### cosmos.autocli.v1.ServiceCommandDescriptor

ServiceCommandDescriptor describes a CLI command based on a protobuf service.

| Name                   | Type                                                                            | Description                                                                                                                                                                                                                                                                                                                          | Required |
| ---------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| service                | string                                                                          | service is the fully qualified name of the protobuf service to build the command from. It can be left empty if sub_commands are used instead which may be the case if a module provides multiple tx and/or query services.                                                                                                           | No       |
| rpc_command_options    | [ [cosmos.autocli.v1.RpcCommandOptions](#cosmos.autocli.v1.RpcCommandOptions) ] | rpc_command_options are options for commands generated from rpc methods. If no options are specified for a given rpc method on the service, a command will be generated for that method with the default options.                                                                                                                    | No       |
| sub_commands           | object                                                                          | sub_commands is a map of optional sub-commands for this command based on different protobuf services. The map key is used as the name of the sub-command.                                                                                                                                                                            | No       |
| enhance_custom_command | boolean                                                                         | enhance_custom_commands specifies whether to skip the service when generating commands, if a custom command already exists, or enhance the existing command. If set to true, the custom command will be enhanced with the services from gRPC. otherwise when a custom command exists, no commands will be generated for the service. | No       |

#### cosmos.bank.v1beta1.DenomOwner

DenomOwner defines structure representing an account that owns or holds a
particular denominated token. It contains the account address and account
balance of the denominated token.

Since: cosmos-sdk 0.46

| Name    | Type                                                  | Description                                                      | Required |
| ------- | ----------------------------------------------------- | ---------------------------------------------------------------- | -------- |
| address | string                                                | address defines the address that owns a particular denomination. | No       |
| balance | [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) | balance is the balance of the denominated coin for an account.   | No       |

#### cosmos.bank.v1beta1.DenomUnit

DenomUnit represents a struct that describes a given
denomination unit of the basic token.

| Name     | Type       | Description                                                                                                                                                                                                                                                                         | Required |
| -------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| denom    | string     | denom represents the string name of the given denom unit (e.g uatom).                                                                                                                                                                                                               | No       |
| exponent | long       | exponent represents power of 10 exponent that one must raise the base_denom to in order to equal the given DenomUnit's denom 1 denom = 10^exponent base_denom (e.g. with a base_denom of uatom, one can create a DenomUnit of 'atom' with exponent = 6, thus: 1 atom = 10^6 uatom). | No       |
| aliases  | [ string ] |                                                                                                                                                                                                                                                                                     | No       |

#### cosmos.bank.v1beta1.Metadata

Metadata represents a struct that describes
a basic token.

| Name        | Type                                                                | Description                                                                                                                                   | Required |
| ----------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| description | string                                                              |                                                                                                                                               | No       |
| denom_units | [ [cosmos.bank.v1beta1.DenomUnit](#cosmos.bank.v1beta1.DenomUnit) ] |                                                                                                                                               | No       |
| base        | string                                                              | base represents the base denom (should be the DenomUnit with exponent = 0).                                                                   | No       |
| display     | string                                                              | display indicates the suggested denom that should be displayed in clients.                                                                    | No       |
| name        | string                                                              | Since: cosmos-sdk 0.43                                                                                                                        | No       |
| symbol      | string                                                              | symbol is the token symbol usually shown on exchanges (eg: ATOM). This can be the same as the display.  Since: cosmos-sdk 0.43                | No       |
| uri         | string                                                              | URI to a document (on or off-chain) that contains additional information. Optional.  Since: cosmos-sdk 0.46                                   | No       |
| uri_hash    | string                                                              | URIHash is a sha256 hash of a document pointed by URI. It's used to verify that the document didn't change. Optional.  Since: cosmos-sdk 0.46 | No       |

#### cosmos.bank.v1beta1.Params

Params defines the parameters for the bank module.

| Name                 | Type                                                                    | Description                                                                                                                                                                                                                                                                                           | Required |
| -------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| send_enabled         | [ [cosmos.bank.v1beta1.SendEnabled](#cosmos.bank.v1beta1.SendEnabled) ] | Deprecated: Use of SendEnabled in params is deprecated. For genesis, use the newly added send_enabled field in the genesis object. Storage, lookup, and manipulation of this information is now in the keeper.  As of cosmos-sdk 0.47, this only exists for backwards compatibility of genesis files. | No       |
| default_send_enabled | boolean                                                                 |                                                                                                                                                                                                                                                                                                       | No       |

#### cosmos.bank.v1beta1.QueryAllBalancesResponse

QueryAllBalancesResponse is the response type for the Query/AllBalances RPC
method.

| Name       | Type                                                                              | Description                                        | Required |
| ---------- | --------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| balances   | [ [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) ]                         | balances is the balances of all the coins.         | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response. | No       |

#### cosmos.bank.v1beta1.QueryBalanceResponse

QueryBalanceResponse is the response type for the Query/Balance RPC method.

| Name    | Type                                                  | Description                         | Required |
| ------- | ----------------------------------------------------- | ----------------------------------- | -------- |
| balance | [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) | balance is the balance of the coin. | No       |

#### cosmos.bank.v1beta1.QueryDenomMetadataByQueryStringResponse

QueryDenomMetadataByQueryStringResponse is the response type for the Query/DenomMetadata RPC
method. Identical with QueryDenomMetadataResponse but receives denom as query string in request.

| Name     | Type                                                          | Description                                                                         | Required |
| -------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------- | -------- |
| metadata | [cosmos.bank.v1beta1.Metadata](#cosmos.bank.v1beta1.Metadata) | metadata describes and provides all the client information for the requested token. | No       |

#### cosmos.bank.v1beta1.QueryDenomMetadataResponse

QueryDenomMetadataResponse is the response type for the Query/DenomMetadata RPC
method.

| Name     | Type                                                          | Description                                                                         | Required |
| -------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------- | -------- |
| metadata | [cosmos.bank.v1beta1.Metadata](#cosmos.bank.v1beta1.Metadata) | metadata describes and provides all the client information for the requested token. | No       |

#### cosmos.bank.v1beta1.QueryDenomOwnersResponse

QueryDenomOwnersResponse defines the RPC response of a DenomOwners RPC query.

Since: cosmos-sdk 0.46

| Name         | Type                                                                              | Description                                        | Required |
| ------------ | --------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| denom_owners | [ [cosmos.bank.v1beta1.DenomOwner](#cosmos.bank.v1beta1.DenomOwner) ]             |                                                    | No       |
| pagination   | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response. | No       |

#### cosmos.bank.v1beta1.QueryDenomsMetadataResponse

QueryDenomsMetadataResponse is the response type for the Query/DenomsMetadata RPC
method.

| Name       | Type                                                                              | Description                                                             | Required |
| ---------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | -------- |
| metadatas  | [ [cosmos.bank.v1beta1.Metadata](#cosmos.bank.v1beta1.Metadata) ]                 | metadata provides the client information for all the registered tokens. | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response.                      | No       |

#### cosmos.bank.v1beta1.QueryParamsResponse

QueryParamsResponse defines the response type for querying x/bank parameters.

| Name   | Type                                                      | Description                                        | Required |
| ------ | --------------------------------------------------------- | -------------------------------------------------- | -------- |
| params | [cosmos.bank.v1beta1.Params](#cosmos.bank.v1beta1.Params) | params provides the parameters of the bank module. | No       |

#### cosmos.bank.v1beta1.QuerySendEnabledResponse

QuerySendEnabledResponse defines the RPC response of a SendEnable query.

Since: cosmos-sdk 0.47

| Name         | Type                                                                              | Description                                                                                                                  | Required |
| ------------ | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------- |
| send_enabled | [ [cosmos.bank.v1beta1.SendEnabled](#cosmos.bank.v1beta1.SendEnabled) ]           |                                                                                                                              | No       |
| pagination   | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response. This field is only populated if the denoms field in the request is empty. | No       |

#### cosmos.bank.v1beta1.QuerySpendableBalanceByDenomResponse

QuerySpendableBalanceByDenomResponse defines the gRPC response structure for
querying an account's spendable balance for a specific denom.

Since: cosmos-sdk 0.47

| Name    | Type                                                  | Description                         | Required |
| ------- | ----------------------------------------------------- | ----------------------------------- | -------- |
| balance | [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) | balance is the balance of the coin. | No       |

#### cosmos.bank.v1beta1.QuerySpendableBalancesResponse

QuerySpendableBalancesResponse defines the gRPC response structure for querying
an account's spendable balances.

Since: cosmos-sdk 0.46

| Name       | Type                                                                              | Description                                          | Required |
| ---------- | --------------------------------------------------------------------------------- | ---------------------------------------------------- | -------- |
| balances   | [ [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) ]                         | balances is the spendable balances of all the coins. | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response.   | No       |

#### cosmos.bank.v1beta1.QuerySupplyOfResponse

QuerySupplyOfResponse is the response type for the Query/SupplyOf RPC method.

| Name   | Type                                                  | Description                       | Required |
| ------ | ----------------------------------------------------- | --------------------------------- | -------- |
| amount | [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) | amount is the supply of the coin. | No       |

#### cosmos.bank.v1beta1.QueryTotalSupplyResponse

| Name       | Type                                                                              | Description                                                                | Required |
| ---------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------- |
| supply     | [ [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) ]                         |                                                                            | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response.  Since: cosmos-sdk 0.43 | No       |

#### cosmos.bank.v1beta1.SendEnabled

SendEnabled maps coin denom to a send_enabled status (whether a denom is
sendable).

| Name    | Type    | Description | Required |
| ------- | ------- | ----------- | -------- |
| denom   | string  |             | No       |
| enabled | boolean |             | No       |

#### cosmos.base.v1beta1.Coin

Coin defines a token with a denomination and an amount.

NOTE: The amount field is an Int which implements the custom method
signatures required by gogoproto.

| Name   | Type   | Description | Required |
| ------ | ------ | ----------- | -------- |
| denom  | string |             | No       |
| amount | string |             | No       |

#### cosmos.base.node.v1beta1.ConfigResponse

ConfigResponse defines the response structure for the Config gRPC query.

| Name                | Type   | Description | Required |
| ------------------- | ------ | ----------- | -------- |
| minimum_gas_price   | string |             | No       |
| pruning_keep_recent | string |             | No       |
| pruning_interval    | string |             | No       |

#### cosmos.base.node.v1beta1.StatusResponse

StateResponse defines the response structure for the status of a node.

| Name                  | Type            | Description | Required |
| --------------------- | --------------- | ----------- | -------- |
| earliest_store_height | string (uint64) |             | No       |
| height                | string (uint64) |             | No       |
| timestamp             | dateTime        |             | No       |
| app_hash              | byte            |             | No       |
| validator_hash        | byte            |             | No       |

#### cosmos.base.tendermint.v1beta1.ABCIQueryResponse

ABCIQueryResponse defines the response structure for the ABCIQuery gRPC query.

Note: This type is a duplicate of the ResponseQuery proto type defined in
Cometbft.

| Name      | Type                                                                                | Description | Required |
| --------- | ----------------------------------------------------------------------------------- | ----------- | -------- |
| code      | long                                                                                |             | No       |
| log       | string                                                                              |             | No       |
| info      | string                                                                              |             | No       |
| index     | string (int64)                                                                      |             | No       |
| key       | byte                                                                                |             | No       |
| value     | byte                                                                                |             | No       |
| proof_ops | [cosmos.base.tendermint.v1beta1.ProofOps](#cosmos.base.tendermint.v1beta1.ProofOps) |             | No       |
| height    | string (int64)                                                                      |             | No       |
| codespace | string                                                                              |             | No       |

#### cosmos.base.tendermint.v1beta1.Block

Block is tendermint type Block, with the Header proposer address
field converted to bech32 string.

| Name        | Type                                                                            | Description | Required |
| ----------- | ------------------------------------------------------------------------------- | ----------- | -------- |
| header      | [cosmos.base.tendermint.v1beta1.Header](#cosmos.base.tendermint.v1beta1.Header) |             | No       |
| data        | [tendermint.types.Data](#tendermint.types.Data)                                 |             | No       |
| evidence    | [tendermint.types.EvidenceList](#tendermint.types.EvidenceList)                 |             | No       |
| last_commit | [tendermint.types.Commit](#tendermint.types.Commit)                             |             | No       |

#### cosmos.base.tendermint.v1beta1.GetBlockByHeightResponse

GetBlockByHeightResponse is the response type for the Query/GetBlockByHeight RPC method.

| Name      | Type                                                                          | Description | Required |
| --------- | ----------------------------------------------------------------------------- | ----------- | -------- |
| block_id  | [tendermint.types.BlockID](#tendermint.types.BlockID)                         |             | No       |
| block     | [tendermint.types.Block](#tendermint.types.Block)                             |             | No       |
| sdk_block | [cosmos.base.tendermint.v1beta1.Block](#cosmos.base.tendermint.v1beta1.Block) |             | No       |

#### cosmos.base.tendermint.v1beta1.GetLatestBlockResponse

GetLatestBlockResponse is the response type for the Query/GetLatestBlock RPC method.

| Name      | Type                                                                          | Description | Required |
| --------- | ----------------------------------------------------------------------------- | ----------- | -------- |
| block_id  | [tendermint.types.BlockID](#tendermint.types.BlockID)                         |             | No       |
| block     | [tendermint.types.Block](#tendermint.types.Block)                             |             | No       |
| sdk_block | [cosmos.base.tendermint.v1beta1.Block](#cosmos.base.tendermint.v1beta1.Block) |             | No       |

#### cosmos.base.tendermint.v1beta1.GetLatestValidatorSetResponse

GetLatestValidatorSetResponse is the response type for the Query/GetValidatorSetByHeight RPC method.

| Name         | Type                                                                                      | Description                                        | Required |
| ------------ | ----------------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| block_height | string (int64)                                                                            |                                                    | No       |
| validators   | [ [cosmos.base.tendermint.v1beta1.Validator](#cosmos.base.tendermint.v1beta1.Validator) ] |                                                    | No       |
| pagination   | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse)         | pagination defines an pagination for the response. | No       |

#### cosmos.base.tendermint.v1beta1.GetNodeInfoResponse

GetNodeInfoResponse is the response type for the Query/GetNodeInfo RPC method.

| Name                | Type                                                                                      | Description | Required |
| ------------------- | ----------------------------------------------------------------------------------------- | ----------- | -------- |
| default_node_info   | [tendermint.p2p.DefaultNodeInfo](#tendermint.p2p.DefaultNodeInfo)                         |             | No       |
| application_version | [cosmos.base.tendermint.v1beta1.VersionInfo](#cosmos.base.tendermint.v1beta1.VersionInfo) |             | No       |

#### cosmos.base.tendermint.v1beta1.GetSyncingResponse

GetSyncingResponse is the response type for the Query/GetSyncing RPC method.

| Name    | Type    | Description | Required |
| ------- | ------- | ----------- | -------- |
| syncing | boolean |             | No       |

#### cosmos.base.tendermint.v1beta1.GetValidatorSetByHeightResponse

GetValidatorSetByHeightResponse is the response type for the Query/GetValidatorSetByHeight RPC method.

| Name         | Type                                                                                      | Description                                        | Required |
| ------------ | ----------------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| block_height | string (int64)                                                                            |                                                    | No       |
| validators   | [ [cosmos.base.tendermint.v1beta1.Validator](#cosmos.base.tendermint.v1beta1.Validator) ] |                                                    | No       |
| pagination   | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse)         | pagination defines an pagination for the response. | No       |

#### cosmos.base.tendermint.v1beta1.Header

Header defines the structure of a Cometbft block header.

| Name                 | Type                                                          | Description                                                                                                                                                                               | Required |
| -------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| version              | [tendermint.version.Consensus](#tendermint.version.Consensus) |                                                                                                                                                                                           | No       |
| chain_id             | string                                                        |                                                                                                                                                                                           | No       |
| height               | string (int64)                                                |                                                                                                                                                                                           | No       |
| time                 | dateTime                                                      |                                                                                                                                                                                           | No       |
| last_block_id        | [tendermint.types.BlockID](#tendermint.types.BlockID)         |                                                                                                                                                                                           | No       |
| last_commit_hash     | byte                                                          |                                                                                                                                                                                           | No       |
| data_hash            | byte                                                          |                                                                                                                                                                                           | No       |
| validators_hash      | byte                                                          |                                                                                                                                                                                           | No       |
| next_validators_hash | byte                                                          |                                                                                                                                                                                           | No       |
| consensus_hash       | byte                                                          |                                                                                                                                                                                           | No       |
| app_hash             | byte                                                          |                                                                                                                                                                                           | No       |
| last_results_hash    | byte                                                          |                                                                                                                                                                                           | No       |
| evidence_hash        | byte                                                          |                                                                                                                                                                                           | No       |
| proposer_address     | string                                                        | proposer_address is the original block proposer address, formatted as a Bech32 string. In Cometbft, this type is `bytes`, but in the SDK, we convert it to a Bech32 string for better UX. | No       |

#### cosmos.base.tendermint.v1beta1.Module

| Name    | Type   | Description | Required |
| ------- | ------ | ----------- | -------- |
| path    | string |             | No       |
| version | string |             | No       |
| sum     | string |             | No       |

#### cosmos.base.tendermint.v1beta1.ProofOp

ProofOp defines an operation used for calculating Merkle root. The data could
be arbitrary format, providing necessary data for example neighbouring node
hash.

Note: This type is a duplicate of the ProofOp proto type defined in Cometbft.

| Name | Type   | Description | Required |
| ---- | ------ | ----------- | -------- |
| type | string |             | No       |
| key  | byte   |             | No       |
| data | byte   |             | No       |

#### cosmos.base.tendermint.v1beta1.ProofOps

ProofOps is Merkle proof defined by the list of ProofOps.

Note: This type is a duplicate of the ProofOps proto type defined in Cometbft.

| Name | Type                                                                                  | Description | Required |
| ---- | ------------------------------------------------------------------------------------- | ----------- | -------- |
| ops  | [ [cosmos.base.tendermint.v1beta1.ProofOp](#cosmos.base.tendermint.v1beta1.ProofOp) ] |             | No       |

#### cosmos.base.tendermint.v1beta1.Validator

Validator is the type for the validator-set.

| Name              | Type                                        | Description | Required |
| ----------------- | ------------------------------------------- | ----------- | -------- |
| address           | string                                      |             | No       |
| pub_key           | [google.protobuf.Any](#google.protobuf.Any) |             | No       |
| voting_power      | string (int64)                              |             | No       |
| proposer_priority | string (int64)                              |             | No       |

#### cosmos.base.tendermint.v1beta1.VersionInfo

VersionInfo is the type for the GetNodeInfoResponse message.

| Name               | Type                                                                                | Description | Required |
| ------------------ | ----------------------------------------------------------------------------------- | ----------- | -------- |
| name               | string                                                                              |             | No       |
| app_name           | string                                                                              |             | No       |
| version            | string                                                                              |             | No       |
| git_commit         | string                                                                              |             | No       |
| build_tags         | string                                                                              |             | No       |
| go_version         | string                                                                              |             | No       |
| build_deps         | [ [cosmos.base.tendermint.v1beta1.Module](#cosmos.base.tendermint.v1beta1.Module) ] |             | No       |
| cosmos_sdk_version | string                                                                              |             | No       |

#### tendermint.crypto.PublicKey

| Name      | Type | Description | Required |
| --------- | ---- | ----------- | -------- |
| ed25519   | byte |             | No       |
| secp256k1 | byte |             | No       |

#### tendermint.p2p.DefaultNodeInfo

| Name             | Type                                                                        | Description | Required |
| ---------------- | --------------------------------------------------------------------------- | ----------- | -------- |
| protocol_version | [tendermint.p2p.ProtocolVersion](#tendermint.p2p.ProtocolVersion)           |             | No       |
| default_node_id  | string                                                                      |             | No       |
| listen_addr      | string                                                                      |             | No       |
| network          | string                                                                      |             | No       |
| version          | string                                                                      |             | No       |
| channels         | byte                                                                        |             | No       |
| moniker          | string                                                                      |             | No       |
| other            | [tendermint.p2p.DefaultNodeInfoOther](#tendermint.p2p.DefaultNodeInfoOther) |             | No       |

#### tendermint.p2p.DefaultNodeInfoOther

| Name        | Type   | Description | Required |
| ----------- | ------ | ----------- | -------- |
| tx_index    | string |             | No       |
| rpc_address | string |             | No       |

#### tendermint.p2p.ProtocolVersion

| Name  | Type            | Description | Required |
| ----- | --------------- | ----------- | -------- |
| p2p   | string (uint64) |             | No       |
| block | string (uint64) |             | No       |
| app   | string (uint64) |             | No       |

#### tendermint.types.Block

| Name        | Type                                                            | Description | Required |
| ----------- | --------------------------------------------------------------- | ----------- | -------- |
| header      | [tendermint.types.Header](#tendermint.types.Header)             |             | No       |
| data        | [tendermint.types.Data](#tendermint.types.Data)                 |             | No       |
| evidence    | [tendermint.types.EvidenceList](#tendermint.types.EvidenceList) |             | No       |
| last_commit | [tendermint.types.Commit](#tendermint.types.Commit)             |             | No       |

#### tendermint.types.BlockID

| Name            | Type                                                              | Description | Required |
| --------------- | ----------------------------------------------------------------- | ----------- | -------- |
| hash            | byte                                                              |             | No       |
| part_set_header | [tendermint.types.PartSetHeader](#tendermint.types.PartSetHeader) |             | No       |

#### tendermint.types.BlockIDFlag

| Name                         | Type   | Description | Required |
| ---------------------------- | ------ | ----------- | -------- |
| tendermint.types.BlockIDFlag | string |             |          |

#### tendermint.types.Commit

Commit contains the evidence that a block was committed by a set of validators.

| Name       | Type                                                          | Description | Required |
| ---------- | ------------------------------------------------------------- | ----------- | -------- |
| height     | string (int64)                                                |             | No       |
| round      | integer                                                       |             | No       |
| block_id   | [tendermint.types.BlockID](#tendermint.types.BlockID)         |             | No       |
| signatures | [ [tendermint.types.CommitSig](#tendermint.types.CommitSig) ] |             | No       |

#### tendermint.types.CommitSig

CommitSig is a part of the Vote included in a Commit.

| Name              | Type                                                          | Description | Required |
| ----------------- | ------------------------------------------------------------- | ----------- | -------- |
| block_id_flag     | [tendermint.types.BlockIDFlag](#tendermint.types.BlockIDFlag) |             | No       |
| validator_address | byte                                                          |             | No       |
| timestamp         | dateTime                                                      |             | No       |
| signature         | byte                                                          |             | No       |

#### tendermint.types.Data

| Name | Type     | Description                                                                                                                                                                              | Required |
| ---- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| txs  | [ byte ] | Txs that will be applied by state @ block.Height+1. NOTE: not all txs here are valid.  We're just agreeing on the order first. This means that block.AppHash does not include these txs. | No       |

#### tendermint.types.DuplicateVoteEvidence

DuplicateVoteEvidence contains evidence of a validator signed two conflicting votes.

| Name               | Type                                            | Description | Required |
| ------------------ | ----------------------------------------------- | ----------- | -------- |
| vote_a             | [tendermint.types.Vote](#tendermint.types.Vote) |             | No       |
| vote_b             | [tendermint.types.Vote](#tendermint.types.Vote) |             | No       |
| total_voting_power | string (int64)                                  |             | No       |
| validator_power    | string (int64)                                  |             | No       |
| timestamp          | dateTime                                        |             | No       |

#### tendermint.types.Evidence

| Name                         | Type                                                                                      | Description | Required |
| ---------------------------- | ----------------------------------------------------------------------------------------- | ----------- | -------- |
| duplicate_vote_evidence      | [tendermint.types.DuplicateVoteEvidence](#tendermint.types.DuplicateVoteEvidence)         |             | No       |
| light_client_attack_evidence | [tendermint.types.LightClientAttackEvidence](#tendermint.types.LightClientAttackEvidence) |             | No       |

#### tendermint.types.EvidenceList

| Name     | Type                                                        | Description | Required |
| -------- | ----------------------------------------------------------- | ----------- | -------- |
| evidence | [ [tendermint.types.Evidence](#tendermint.types.Evidence) ] |             | No       |

#### tendermint.types.Header

Header defines the structure of a block header.

| Name                 | Type                                                          | Description | Required |
| -------------------- | ------------------------------------------------------------- | ----------- | -------- |
| version              | [tendermint.version.Consensus](#tendermint.version.Consensus) |             | No       |
| chain_id             | string                                                        |             | No       |
| height               | string (int64)                                                |             | No       |
| time                 | dateTime                                                      |             | No       |
| last_block_id        | [tendermint.types.BlockID](#tendermint.types.BlockID)         |             | No       |
| last_commit_hash     | byte                                                          |             | No       |
| data_hash            | byte                                                          |             | No       |
| validators_hash      | byte                                                          |             | No       |
| next_validators_hash | byte                                                          |             | No       |
| consensus_hash       | byte                                                          |             | No       |
| app_hash             | byte                                                          |             | No       |
| last_results_hash    | byte                                                          |             | No       |
| evidence_hash        | byte                                                          |             | No       |
| proposer_address     | byte                                                          |             | No       |

#### tendermint.types.LightBlock

| Name          | Type                                                            | Description | Required |
| ------------- | --------------------------------------------------------------- | ----------- | -------- |
| signed_header | [tendermint.types.SignedHeader](#tendermint.types.SignedHeader) |             | No       |
| validator_set | [tendermint.types.ValidatorSet](#tendermint.types.ValidatorSet) |             | No       |

#### tendermint.types.LightClientAttackEvidence

LightClientAttackEvidence contains evidence of a set of validators attempting to mislead a light client.

| Name                 | Type                                                          | Description | Required |
| -------------------- | ------------------------------------------------------------- | ----------- | -------- |
| conflicting_block    | [tendermint.types.LightBlock](#tendermint.types.LightBlock)   |             | No       |
| common_height        | string (int64)                                                |             | No       |
| byzantine_validators | [ [tendermint.types.Validator](#tendermint.types.Validator) ] |             | No       |
| total_voting_power   | string (int64)                                                |             | No       |
| timestamp            | dateTime                                                      |             | No       |

#### tendermint.types.PartSetHeader

| Name  | Type | Description | Required |
| ----- | ---- | ----------- | -------- |
| total | long |             | No       |
| hash  | byte |             | No       |

#### tendermint.types.SignedHeader

| Name   | Type                                                | Description | Required |
| ------ | --------------------------------------------------- | ----------- | -------- |
| header | [tendermint.types.Header](#tendermint.types.Header) |             | No       |
| commit | [tendermint.types.Commit](#tendermint.types.Commit) |             | No       |

#### tendermint.types.SignedMsgType

SignedMsgType is a type of signed message in the consensus.

- SIGNED_MSG_TYPE_PREVOTE: Votes
- SIGNED_MSG_TYPE_PROPOSAL: Proposals

| Name                           | Type   | Description                                                                                                                           | Required |
| ------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| tendermint.types.SignedMsgType | string | SignedMsgType is a type of signed message in the consensus.   - SIGNED_MSG_TYPE_PREVOTE: Votes  - SIGNED_MSG_TYPE_PROPOSAL: Proposals |          |

#### tendermint.types.Validator

| Name              | Type                                                        | Description | Required |
| ----------------- | ----------------------------------------------------------- | ----------- | -------- |
| address           | byte                                                        |             | No       |
| pub_key           | [tendermint.crypto.PublicKey](#tendermint.crypto.PublicKey) |             | No       |
| voting_power      | string (int64)                                              |             | No       |
| proposer_priority | string (int64)                                              |             | No       |

#### tendermint.types.ValidatorSet

| Name               | Type                                                          | Description | Required |
| ------------------ | ------------------------------------------------------------- | ----------- | -------- |
| validators         | [ [tendermint.types.Validator](#tendermint.types.Validator) ] |             | No       |
| proposer           | [tendermint.types.Validator](#tendermint.types.Validator)     |             | No       |
| total_voting_power | string (int64)                                                |             | No       |

#### tendermint.types.Vote

Vote represents a prevote or precommit vote from validators for
consensus.

| Name                | Type                                                              | Description                                                                                                                              | Required |
| ------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| type                | [tendermint.types.SignedMsgType](#tendermint.types.SignedMsgType) |                                                                                                                                          | No       |
| height              | string (int64)                                                    |                                                                                                                                          | No       |
| round               | integer                                                           |                                                                                                                                          | No       |
| block_id            | [tendermint.types.BlockID](#tendermint.types.BlockID)             |                                                                                                                                          | No       |
| timestamp           | dateTime                                                          |                                                                                                                                          | No       |
| validator_address   | byte                                                              |                                                                                                                                          | No       |
| validator_index     | integer                                                           |                                                                                                                                          | No       |
| signature           | byte                                                              | Vote signature by the validator if they participated in consensus for the associated block.                                              | No       |
| extension           | byte                                                              | Vote extension provided by the application. Only valid for precommit messages.                                                           | No       |
| extension_signature | byte                                                              | Vote extension signature by the validator if they participated in consensus for the associated block. Only valid for precommit messages. | No       |

#### tendermint.version.Consensus

Consensus captures the consensus rules for processing a block in the blockchain,
including all blockchain data structures and the rules of the application's
state transition machine.

| Name  | Type            | Description | Required |
| ----- | --------------- | ----------- | -------- |
| block | string (uint64) |             | No       |
| app   | string (uint64) |             | No       |

#### cosmos.circuit.v1.AccountResponse

AccountResponse is the response type for the Query/Account RPC method.

| Name       | Type                                                            | Description | Required |
| ---------- | --------------------------------------------------------------- | ----------- | -------- |
| permission | [cosmos.circuit.v1.Permissions](#cosmos.circuit.v1.Permissions) |             | No       |

#### cosmos.circuit.v1.AccountsResponse

AccountsResponse is the response type for the Query/Accounts RPC method.

| Name       | Type                                                                                            | Description                                        | Required |
| ---------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| accounts   | [ [cosmos.circuit.v1.GenesisAccountPermissions](#cosmos.circuit.v1.GenesisAccountPermissions) ] |                                                    | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse)               | pagination defines the pagination in the response. | No       |

#### cosmos.circuit.v1.DisabledListResponse

DisabledListResponse is the response type for the Query/DisabledList RPC method.

| Name          | Type       | Description | Required |
| ------------- | ---------- | ----------- | -------- |
| disabled_list | [ string ] |             | No       |

#### cosmos.circuit.v1.GenesisAccountPermissions

| Name        | Type                                                            | Description | Required |
| ----------- | --------------------------------------------------------------- | ----------- | -------- |
| address     | string                                                          |             | No       |
| permissions | [cosmos.circuit.v1.Permissions](#cosmos.circuit.v1.Permissions) |             | No       |

#### cosmos.circuit.v1.Permissions

Permissions are the permissions that an account has to trip
or reset the circuit breaker.

| Name            | Type                                                                        | Description                                                                                                                                                                                | Required |
| --------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| level           | [cosmos.circuit.v1.Permissions.Level](#cosmos.circuit.v1.Permissions.Level) | level is the level of permissions granted to this account.                                                                                                                                 | No       |
| limit_type_urls | [ string ]                                                                  | limit_type_urls is used with LEVEL_SOME_MSGS to limit the lists of Msg type URLs that the account can trip. It is an error to use limit_type_urls with a level other than LEVEL_SOME_MSGS. | No       |

#### cosmos.circuit.v1.Permissions.Level

Level is the permission level.

- LEVEL_NONE_UNSPECIFIED: LEVEL_NONE_UNSPECIFIED indicates that the account will have no circuit
breaker permissions.
- LEVEL_SOME_MSGS: LEVEL_SOME_MSGS indicates that the account will have permission to
trip or reset the circuit breaker for some Msg type URLs. If this level
is chosen, a non-empty list of Msg type URLs must be provided in
limit_type_urls.
- LEVEL_ALL_MSGS: LEVEL_ALL_MSGS indicates that the account can trip or reset the circuit
breaker for Msg's of all type URLs.
- LEVEL_SUPER_ADMIN: LEVEL_SUPER_ADMIN indicates that the account can take all circuit breaker
actions and can grant permissions to other accounts.

| Name                                | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Required |
| ----------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| cosmos.circuit.v1.Permissions.Level | string | Level is the permission level.   - LEVEL_NONE_UNSPECIFIED: LEVEL_NONE_UNSPECIFIED indicates that the account will have no circuit breaker permissions.  - LEVEL_SOME_MSGS: LEVEL_SOME_MSGS indicates that the account will have permission to trip or reset the circuit breaker for some Msg type URLs. If this level is chosen, a non-empty list of Msg type URLs must be provided in limit_type_urls.  - LEVEL_ALL_MSGS: LEVEL_ALL_MSGS indicates that the account can trip or reset the circuit breaker for Msg's of all type URLs.  - LEVEL_SUPER_ADMIN: LEVEL_SUPER_ADMIN indicates that the account can take all circuit breaker actions and can grant permissions to other accounts. |          |

#### cosmos.consensus.v1.QueryParamsResponse

QueryParamsResponse defines the response type for querying x/consensus parameters.

| Name   | Type                                                                  | Description                                                                                                                                                                                       | Required |
| ------ | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| params | [tendermint.types.ConsensusParams](#tendermint.types.ConsensusParams) | params are the tendermint consensus params stored in the consensus module. Please note that `params.version` is not populated in this response, it is tracked separately in the x/upgrade module. | No       |

#### tendermint.types.ABCIParams

ABCIParams configure functionality specific to the Application Blockchain Interface.

| Name                          | Type           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Required |
| ----------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| vote_extensions_enable_height | string (int64) | vote_extensions_enable_height configures the first height during which vote extensions will be enabled. During this specified height, and for all subsequent heights, precommit messages that do not contain valid extension data will be considered invalid. Prior to this height, vote extensions will not be used or accepted by validators on the network.  Once enabled, vote extensions will be created by the application in ExtendVote, passed to the application for validation in VerifyVoteExtension and given to the application to use when proposing a block during PrepareProposal. | No       |

#### tendermint.types.BlockParams

BlockParams contains limits on the block size.

| Name      | Type           | Description | Required |
| --------- | -------------- | ----------- | -------- |
| max_bytes | string (int64) |             | No       |
| max_gas   | string (int64) |             | No       |

#### tendermint.types.ConsensusParams

ConsensusParams contains consensus critical parameters that determine the
validity of blocks.

| Name      | Type                                                                  | Description | Required |
| --------- | --------------------------------------------------------------------- | ----------- | -------- |
| block     | [tendermint.types.BlockParams](#tendermint.types.BlockParams)         |             | No       |
| evidence  | [tendermint.types.EvidenceParams](#tendermint.types.EvidenceParams)   |             | No       |
| validator | [tendermint.types.ValidatorParams](#tendermint.types.ValidatorParams) |             | No       |
| version   | [tendermint.types.VersionParams](#tendermint.types.VersionParams)     |             | No       |
| abci      | [tendermint.types.ABCIParams](#tendermint.types.ABCIParams)           |             | No       |

#### tendermint.types.EvidenceParams

EvidenceParams determine how we handle evidence of malfeasance.

| Name               | Type           | Description                                                                                                                                                                                                                                                                     | Required |
| ------------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| max_age_num_blocks | string (int64) | Max age of evidence, in blocks.  The basic formula for calculating this is: MaxAgeDuration / {average block time}.                                                                                                                                                              | No       |
| max_age_duration   | string         | Max age of evidence, in time.  It should correspond with an app's "unbonding period" or other similar mechanism for handling [Nothing-At-Stake attacks](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed). | No       |
| max_bytes          | string (int64) |                                                                                                                                                                                                                                                                                 | No       |

#### tendermint.types.ValidatorParams

ValidatorParams restrict the public key types validators can use.
NOTE: uses ABCI pubkey naming, not Amino names.

| Name          | Type       | Description | Required |
| ------------- | ---------- | ----------- | -------- |
| pub_key_types | [ string ] |             | No       |

#### tendermint.types.VersionParams

VersionParams contains the ABCI application version.

| Name | Type            | Description | Required |
| ---- | --------------- | ----------- | -------- |
| app  | string (uint64) |             | No       |

#### cosmos.base.v1beta1.DecCoin

DecCoin defines a token with a denomination and a decimal amount.

NOTE: The amount field is an Dec which implements the custom method
signatures required by gogoproto.

| Name   | Type   | Description | Required |
| ------ | ------ | ----------- | -------- |
| denom  | string |             | No       |
| amount | string |             | No       |

#### cosmos.distribution.v1beta1.DelegationDelegatorReward

DelegationDelegatorReward represents the properties
of a delegator's delegation reward.

| Name              | Type                                                            | Description | Required |
| ----------------- | --------------------------------------------------------------- | ----------- | -------- |
| validator_address | string                                                          |             | No       |
| reward            | [ [cosmos.base.v1beta1.DecCoin](#cosmos.base.v1beta1.DecCoin) ] |             | No       |

#### cosmos.distribution.v1beta1.Params

Params defines the set of params for the distribution module.

| Name                  | Type    | Description                                                                                                                      | Required |
| --------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- | -------- |
| community_tax         | string  |                                                                                                                                  | No       |
| base_proposer_reward  | string  | Deprecated: The base_proposer_reward field is deprecated and is no longer used in the x/distribution module's reward mechanism.  | No       |
| bonus_proposer_reward | string  | Deprecated: The bonus_proposer_reward field is deprecated and is no longer used in the x/distribution module's reward mechanism. | No       |
| withdraw_addr_enabled | boolean |                                                                                                                                  | No       |

#### cosmos.distribution.v1beta1.QueryCommunityPoolResponse

QueryCommunityPoolResponse is the response type for the Query/CommunityPool
RPC method.

| Name | Type                                                            | Description                          | Required |
| ---- | --------------------------------------------------------------- | ------------------------------------ | -------- |
| pool | [ [cosmos.base.v1beta1.DecCoin](#cosmos.base.v1beta1.DecCoin) ] | pool defines community pool's coins. | No       |

#### cosmos.distribution.v1beta1.QueryDelegationRewardsResponse

QueryDelegationRewardsResponse is the response type for the
Query/DelegationRewards RPC method.

| Name    | Type                                                            | Description                                          | Required |
| ------- | --------------------------------------------------------------- | ---------------------------------------------------- | -------- |
| rewards | [ [cosmos.base.v1beta1.DecCoin](#cosmos.base.v1beta1.DecCoin) ] | rewards defines the rewards accrued by a delegation. | No       |

#### cosmos.distribution.v1beta1.QueryDelegationTotalRewardsResponse

QueryDelegationTotalRewardsResponse is the response type for the
Query/DelegationTotalRewards RPC method.

| Name    | Type                                                                                                                | Description                                             | Required |
| ------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | -------- |
| rewards | [ [cosmos.distribution.v1beta1.DelegationDelegatorReward](#cosmos.distribution.v1beta1.DelegationDelegatorReward) ] | rewards defines all the rewards accrued by a delegator. | No       |
| total   | [ [cosmos.base.v1beta1.DecCoin](#cosmos.base.v1beta1.DecCoin) ]                                                     | total defines the sum of all the rewards.               | No       |

#### cosmos.distribution.v1beta1.QueryDelegatorValidatorsResponse

QueryDelegatorValidatorsResponse is the response type for the
Query/DelegatorValidators RPC method.

| Name       | Type       | Description                                                      | Required |
| ---------- | ---------- | ---------------------------------------------------------------- | -------- |
| validators | [ string ] | validators defines the validators a delegator is delegating for. | No       |

#### cosmos.distribution.v1beta1.QueryDelegatorWithdrawAddressResponse

QueryDelegatorWithdrawAddressResponse is the response type for the
Query/DelegatorWithdrawAddress RPC method.

| Name             | Type   | Description                                                  | Required |
| ---------------- | ------ | ------------------------------------------------------------ | -------- |
| withdraw_address | string | withdraw_address defines the delegator address to query for. | No       |

#### cosmos.distribution.v1beta1.QueryParamsResponse

QueryParamsResponse is the response type for the Query/Params RPC method.

| Name   | Type                                                                      | Description                                  | Required |
| ------ | ------------------------------------------------------------------------- | -------------------------------------------- | -------- |
| params | [cosmos.distribution.v1beta1.Params](#cosmos.distribution.v1beta1.Params) | params defines the parameters of the module. | No       |

#### cosmos.distribution.v1beta1.QueryValidatorCommissionResponse

| Name       | Type                                                                                                                      | Description                                               | Required |
| ---------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | -------- |
| commission | [cosmos.distribution.v1beta1.ValidatorAccumulatedCommission](#cosmos.distribution.v1beta1.ValidatorAccumulatedCommission) | commission defines the commission the validator received. | No       |

#### cosmos.distribution.v1beta1.QueryValidatorDistributionInfoResponse

QueryValidatorDistributionInfoResponse is the response type for the Query/ValidatorDistributionInfo RPC method.

| Name              | Type                                                            | Description                                               | Required |
| ----------------- | --------------------------------------------------------------- | --------------------------------------------------------- | -------- |
| operator_address  | string                                                          | operator_address defines the validator operator address.  | No       |
| self_bond_rewards | [ [cosmos.base.v1beta1.DecCoin](#cosmos.base.v1beta1.DecCoin) ] | self_bond_rewards defines the self delegations rewards.   | No       |
| commission        | [ [cosmos.base.v1beta1.DecCoin](#cosmos.base.v1beta1.DecCoin) ] | commission defines the commission the validator received. | No       |

#### cosmos.distribution.v1beta1.QueryValidatorOutstandingRewardsResponse

QueryValidatorOutstandingRewardsResponse is the response type for the
Query/ValidatorOutstandingRewards RPC method.

| Name    | Type                                                                                                                | Description | Required |
| ------- | ------------------------------------------------------------------------------------------------------------------- | ----------- | -------- |
| rewards | [cosmos.distribution.v1beta1.ValidatorOutstandingRewards](#cosmos.distribution.v1beta1.ValidatorOutstandingRewards) |             | No       |

#### cosmos.distribution.v1beta1.QueryValidatorSlashesResponse

QueryValidatorSlashesResponse is the response type for the
Query/ValidatorSlashes RPC method.

| Name       | Type                                                                                                    | Description                                         | Required |
| ---------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | -------- |
| slashes    | [ [cosmos.distribution.v1beta1.ValidatorSlashEvent](#cosmos.distribution.v1beta1.ValidatorSlashEvent) ] | slashes defines the slashes the validator received. | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse)                       | pagination defines the pagination in the response.  | No       |

#### cosmos.distribution.v1beta1.ValidatorAccumulatedCommission

ValidatorAccumulatedCommission represents accumulated commission
for a validator kept as a running counter, can be withdrawn at any time.

| Name       | Type                                                            | Description | Required |
| ---------- | --------------------------------------------------------------- | ----------- | -------- |
| commission | [ [cosmos.base.v1beta1.DecCoin](#cosmos.base.v1beta1.DecCoin) ] |             | No       |

#### cosmos.distribution.v1beta1.ValidatorOutstandingRewards

ValidatorOutstandingRewards represents outstanding (un-withdrawn) rewards
for a validator inexpensive to track, allows simple sanity checks.

| Name    | Type                                                            | Description | Required |
| ------- | --------------------------------------------------------------- | ----------- | -------- |
| rewards | [ [cosmos.base.v1beta1.DecCoin](#cosmos.base.v1beta1.DecCoin) ] |             | No       |

#### cosmos.distribution.v1beta1.ValidatorSlashEvent

ValidatorSlashEvent represents a validator slash event.
Height is implicit within the store key.
This is needed to calculate appropriate amount of staking tokens
for delegations which are withdrawn after a slash has occurred.

| Name             | Type            | Description | Required |
| ---------------- | --------------- | ----------- | -------- |
| validator_period | string (uint64) |             | No       |
| fraction         | string          |             | No       |

#### cosmos.evidence.v1beta1.QueryAllEvidenceResponse

QueryAllEvidenceResponse is the response type for the Query/AllEvidence RPC
method.

| Name       | Type                                                                              | Description                                        | Required |
| ---------- | --------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| evidence   | [ [google.protobuf.Any](#google.protobuf.Any) ]                                   | evidence returns all evidences.                    | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response. | No       |

#### cosmos.evidence.v1beta1.QueryEvidenceResponse

QueryEvidenceResponse is the response type for the Query/Evidence RPC method.

| Name     | Type                                        | Description                              | Required |
| -------- | ------------------------------------------- | ---------------------------------------- | -------- |
| evidence | [google.protobuf.Any](#google.protobuf.Any) | evidence returns the requested evidence. | No       |

#### cosmos.feegrant.v1beta1.Grant

| Name      | Type                                        | Description                                                                            | Required |
| --------- | ------------------------------------------- | -------------------------------------------------------------------------------------- | -------- |
| granter   | string                                      | granter is the address of the user granting an allowance of their funds.               | No       |
| grantee   | string                                      | grantee is the address of the user being granted an allowance of another user's funds. | No       |
| allowance | [google.protobuf.Any](#google.protobuf.Any) | allowance can be any of basic, periodic, allowed fee allowance.                        | No       |

#### cosmos.feegrant.v1beta1.QueryAllowanceResponse

QueryAllowanceResponse is the response type for the Query/Allowance RPC method.

| Name      | Type                                                            | Description                                              | Required |
| --------- | --------------------------------------------------------------- | -------------------------------------------------------- | -------- |
| allowance | [cosmos.feegrant.v1beta1.Grant](#cosmos.feegrant.v1beta1.Grant) | allowance is a allowance granted for grantee by granter. | No       |

#### cosmos.feegrant.v1beta1.QueryAllowancesByGranterResponse

QueryAllowancesByGranterResponse is the response type for the Query/AllowancesByGranter RPC method.

Since: cosmos-sdk 0.46

| Name       | Type                                                                              | Description                                        | Required |
| ---------- | --------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| allowances | [ [cosmos.feegrant.v1beta1.Grant](#cosmos.feegrant.v1beta1.Grant) ]               | allowances that have been issued by the granter.   | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines an pagination for the response. | No       |

#### cosmos.feegrant.v1beta1.QueryAllowancesResponse

QueryAllowancesResponse is the response type for the Query/Allowances RPC method.

| Name       | Type                                                                              | Description                                                | Required |
| ---------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------- | -------- |
| allowances | [ [cosmos.feegrant.v1beta1.Grant](#cosmos.feegrant.v1beta1.Grant) ]               | allowances are allowance's granted for grantee by granter. | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines an pagination for the response.         | No       |

#### cosmos.gov.v1.Deposit

Deposit defines an amount deposited by an account address to an active
proposal.

| Name        | Type                                                      | Description                                                 | Required |
| ----------- | --------------------------------------------------------- | ----------------------------------------------------------- | -------- |
| proposal_id | string (uint64)                                           | proposal_id defines the unique id of the proposal.          | No       |
| depositor   | string                                                    | depositor defines the deposit addresses from the proposals. | No       |
| amount      | [ [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) ] | amount to be deposited by depositor.                        | No       |

#### cosmos.gov.v1.DepositParams

DepositParams defines the params for deposits on governance proposals.

| Name               | Type                                                      | Description                                                                        | Required |
| ------------------ | --------------------------------------------------------- | ---------------------------------------------------------------------------------- | -------- |
| min_deposit        | [ [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) ] | Minimum deposit for a proposal to enter voting period.                             | No       |
| max_deposit_period | string                                                    | Maximum period for Atom holders to deposit on a proposal. Initial value: 2 months. | No       |

#### cosmos.gov.v1.Params

Params defines the parameters for the x/gov module.

Since: cosmos-sdk 0.47

| Name                          | Type                                                      | Description                                                                                                                                                                                   | Required |
| ----------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| min_deposit                   | [ [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) ] | Minimum deposit for a proposal to enter voting period.                                                                                                                                        | No       |
| max_deposit_period            | string                                                    | Maximum period for Atom holders to deposit on a proposal. Initial value: 2 months.                                                                                                            | No       |
| voting_period                 | string                                                    | Duration of the voting period.                                                                                                                                                                | No       |
| quorum                        | string                                                    | Minimum percentage of total stake needed to vote for a result to be  considered valid.                                                                                                        | No       |
| threshold                     | string                                                    | Minimum proportion of Yes votes for proposal to pass. Default value: 0.5.                                                                                                                     | No       |
| veto_threshold                | string                                                    | Minimum value of Veto votes to Total votes ratio for proposal to be  vetoed. Default value: 1/3.                                                                                              | No       |
| min_initial_deposit_ratio     | string                                                    | The ratio representing the proportion of the deposit value that must be paid at proposal submission.                                                                                          | No       |
| proposal_cancel_ratio         | string                                                    | The cancel ratio which will not be returned back to the depositors when a proposal is cancelled.  Since: cosmos-sdk 0.50                                                                      | No       |
| proposal_cancel_dest          | string                                                    | The address which will receive (proposal_cancel_ratio *deposit) proposal deposits. If empty, the (proposal_cancel_ratio* deposit) proposal deposits will be burned.  Since: cosmos-sdk 0.50 | No       |
| expedited_voting_period       | string                                                    | Duration of the voting period of an expedited proposal.  Since: cosmos-sdk 0.50                                                                                                               | No       |
| expedited_threshold           | string                                                    | Minimum proportion of Yes votes for proposal to pass. Default value: 0.67.  Since: cosmos-sdk 0.50                                                                                            | No       |
| expedited_min_deposit         | [ [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) ] | Minimum expedited deposit for a proposal to enter voting period.                                                                                                                              | No       |
| burn_vote_quorum              | boolean                                                   |                                                                                                                                                                                               | No       |
| burn_proposal_deposit_prevote | boolean                                                   |                                                                                                                                                                                               | No       |
| burn_vote_veto                | boolean                                                   |                                                                                                                                                                                               | No       |

#### cosmos.gov.v1.Proposal

Proposal defines the core field members of a governance proposal.

| Name               | Type                                                          | Description                                                                                                                                                                | Required |
| ------------------ | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| id                 | string (uint64)                                               | id defines the unique id of the proposal.                                                                                                                                  | No       |
| messages           | [ [google.protobuf.Any](#google.protobuf.Any) ]               | messages are the arbitrary messages to be executed if the proposal passes.                                                                                                 | No       |
| status             | [cosmos.gov.v1.ProposalStatus](#cosmos.gov.v1.ProposalStatus) | status defines the proposal status.                                                                                                                                        | No       |
| final_tally_result | [cosmos.gov.v1.TallyResult](#cosmos.gov.v1.TallyResult)       | final_tally_result is the final tally result of the proposal. When querying a proposal via gRPC, this field is not populated until the proposal's voting period has ended. | No       |
| submit_time        | dateTime                                                      | submit_time is the time of proposal submission.                                                                                                                            | No       |
| deposit_end_time   | dateTime                                                      | deposit_end_time is the end time for deposition.                                                                                                                           | No       |
| total_deposit      | [ [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) ]     | total_deposit is the total deposit on the proposal.                                                                                                                        | No       |
| voting_start_time  | dateTime                                                      | voting_start_time is the starting time to vote on a proposal.                                                                                                              | No       |
| voting_end_time    | dateTime                                                      | voting_end_time is the end time of voting on a proposal.                                                                                                                   | No       |
| metadata           | string                                                        |                                                                                                                                                                            | No       |
| title              | string                                                        | Since: cosmos-sdk 0.47                                                                                                                                                     | No       |
| summary            | string                                                        | Since: cosmos-sdk 0.47                                                                                                                                                     | No       |
| proposer           | string                                                        | Since: cosmos-sdk 0.47                                                                                                                                                     | No       |
| expedited          | boolean                                                       | Since: cosmos-sdk 0.50                                                                                                                                                     | No       |
| failed_reason      | string                                                        | Since: cosmos-sdk 0.50                                                                                                                                                     | No       |

#### cosmos.gov.v1.ProposalStatus

ProposalStatus enumerates the valid statuses of a proposal.

- PROPOSAL_STATUS_UNSPECIFIED: PROPOSAL_STATUS_UNSPECIFIED defines the default proposal status.
- PROPOSAL_STATUS_DEPOSIT_PERIOD: PROPOSAL_STATUS_DEPOSIT_PERIOD defines a proposal status during the deposit
period.
- PROPOSAL_STATUS_VOTING_PERIOD: PROPOSAL_STATUS_VOTING_PERIOD defines a proposal status during the voting
period.
- PROPOSAL_STATUS_PASSED: PROPOSAL_STATUS_PASSED defines a proposal status of a proposal that has
passed.
- PROPOSAL_STATUS_REJECTED: PROPOSAL_STATUS_REJECTED defines a proposal status of a proposal that has
been rejected.
- PROPOSAL_STATUS_FAILED: PROPOSAL_STATUS_FAILED defines a proposal status of a proposal that has
failed.

| Name                         | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Required |
| ---------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| cosmos.gov.v1.ProposalStatus | string | ProposalStatus enumerates the valid statuses of a proposal.   - PROPOSAL_STATUS_UNSPECIFIED: PROPOSAL_STATUS_UNSPECIFIED defines the default proposal status.  - PROPOSAL_STATUS_DEPOSIT_PERIOD: PROPOSAL_STATUS_DEPOSIT_PERIOD defines a proposal status during the deposit period.  - PROPOSAL_STATUS_VOTING_PERIOD: PROPOSAL_STATUS_VOTING_PERIOD defines a proposal status during the voting period.  - PROPOSAL_STATUS_PASSED: PROPOSAL_STATUS_PASSED defines a proposal status of a proposal that has passed.  - PROPOSAL_STATUS_REJECTED: PROPOSAL_STATUS_REJECTED defines a proposal status of a proposal that has been rejected.  - PROPOSAL_STATUS_FAILED: PROPOSAL_STATUS_FAILED defines a proposal status of a proposal that has failed. |          |

#### cosmos.gov.v1.QueryConstitutionResponse

| Name         | Type   | Description | Required |
| ------------ | ------ | ----------- | -------- |
| constitution | string |             | No       |

#### cosmos.gov.v1.QueryDepositResponse

QueryDepositResponse is the response type for the Query/Deposit RPC method.

| Name    | Type                                            | Description                            | Required |
| ------- | ----------------------------------------------- | -------------------------------------- | -------- |
| deposit | [cosmos.gov.v1.Deposit](#cosmos.gov.v1.Deposit) | deposit defines the requested deposit. | No       |

#### cosmos.gov.v1.QueryDepositsResponse

QueryDepositsResponse is the response type for the Query/Deposits RPC method.

| Name       | Type                                                                              | Description                                        | Required |
| ---------- | --------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| deposits   | [ [cosmos.gov.v1.Deposit](#cosmos.gov.v1.Deposit) ]                               | deposits defines the requested deposits.           | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response. | No       |

#### cosmos.gov.v1.QueryParamsResponse

QueryParamsResponse is the response type for the Query/Params RPC method.

| Name           | Type                                                        | Description                                                                                           | Required |
| -------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | -------- |
| voting_params  | [cosmos.gov.v1.VotingParams](#cosmos.gov.v1.VotingParams)   | Deprecated: Prefer to use `params` instead. voting_params defines the parameters related to voting.   | No       |
| deposit_params | [cosmos.gov.v1.DepositParams](#cosmos.gov.v1.DepositParams) | Deprecated: Prefer to use `params` instead. deposit_params defines the parameters related to deposit. | No       |
| tally_params   | [cosmos.gov.v1.TallyParams](#cosmos.gov.v1.TallyParams)     | Deprecated: Prefer to use `params` instead. tally_params defines the parameters related to tally.     | No       |
| params         | [cosmos.gov.v1.Params](#cosmos.gov.v1.Params)               | params defines all the paramaters of x/gov module.  Since: cosmos-sdk 0.47                            | No       |

#### cosmos.gov.v1.QueryProposalResponse

QueryProposalResponse is the response type for the Query/Proposal RPC method.

| Name     | Type                                              | Description                                    | Required |
| -------- | ------------------------------------------------- | ---------------------------------------------- | -------- |
| proposal | [cosmos.gov.v1.Proposal](#cosmos.gov.v1.Proposal) | proposal is the requested governance proposal. | No       |

#### cosmos.gov.v1.QueryProposalsResponse

QueryProposalsResponse is the response type for the Query/Proposals RPC
method.

| Name       | Type                                                                              | Description                                               | Required |
| ---------- | --------------------------------------------------------------------------------- | --------------------------------------------------------- | -------- |
| proposals  | [ [cosmos.gov.v1.Proposal](#cosmos.gov.v1.Proposal) ]                             | proposals defines all the requested governance proposals. | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response.        | No       |

#### cosmos.gov.v1.QueryTallyResultResponse

QueryTallyResultResponse is the response type for the Query/Tally RPC method.

| Name  | Type                                                    | Description                        | Required |
| ----- | ------------------------------------------------------- | ---------------------------------- | -------- |
| tally | [cosmos.gov.v1.TallyResult](#cosmos.gov.v1.TallyResult) | tally defines the requested tally. | No       |

#### cosmos.gov.v1.QueryVoteResponse

QueryVoteResponse is the response type for the Query/Vote RPC method.

| Name | Type                                      | Description                    | Required |
| ---- | ----------------------------------------- | ------------------------------ | -------- |
| vote | [cosmos.gov.v1.Vote](#cosmos.gov.v1.Vote) | vote defines the queried vote. | No       |

#### cosmos.gov.v1.QueryVotesResponse

QueryVotesResponse is the response type for the Query/Votes RPC method.

| Name       | Type                                                                              | Description                                        | Required |
| ---------- | --------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| votes      | [ [cosmos.gov.v1.Vote](#cosmos.gov.v1.Vote) ]                                     | votes defines the queried votes.                   | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response. | No       |

#### cosmos.gov.v1.TallyParams

TallyParams defines the params for tallying votes on governance proposals.

| Name           | Type   | Description                                                                                     | Required |
| -------------- | ------ | ----------------------------------------------------------------------------------------------- | -------- |
| quorum         | string | Minimum percentage of total stake needed to vote for a result to be considered valid.           | No       |
| threshold      | string | Minimum proportion of Yes votes for proposal to pass. Default value: 0.5.                       | No       |
| veto_threshold | string | Minimum value of Veto votes to Total votes ratio for proposal to be vetoed. Default value: 1/3. | No       |

#### cosmos.gov.v1.TallyResult

TallyResult defines a standard tally for a governance proposal.

| Name               | Type   | Description                                                           | Required |
| ------------------ | ------ | --------------------------------------------------------------------- | -------- |
| yes_count          | string | yes_count is the number of yes votes on a proposal.                   | No       |
| abstain_count      | string | abstain_count is the number of abstain votes on a proposal.           | No       |
| no_count           | string | no_count is the number of no votes on a proposal.                     | No       |
| no_with_veto_count | string | no_with_veto_count is the number of no with veto votes on a proposal. | No       |

#### cosmos.gov.v1.Vote

Vote defines a vote on a governance proposal.
A Vote consists of a proposal ID, the voter, and the vote option.

| Name        | Type                                                                      | Description                                        | Required |
| ----------- | ------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| proposal_id | string (uint64)                                                           | proposal_id defines the unique id of the proposal. | No       |
| voter       | string                                                                    | voter is the voter address of the proposal.        | No       |
| options     | [ [cosmos.gov.v1.WeightedVoteOption](#cosmos.gov.v1.WeightedVoteOption) ] | options is the weighted vote options.              | No       |
| metadata    | string                                                                    |                                                    | No       |

#### cosmos.gov.v1.VoteOption

VoteOption enumerates the valid vote options for a given governance proposal.

- VOTE_OPTION_UNSPECIFIED: VOTE_OPTION_UNSPECIFIED defines a no-op vote option.
- VOTE_OPTION_YES: VOTE_OPTION_YES defines a yes vote option.
- VOTE_OPTION_ABSTAIN: VOTE_OPTION_ABSTAIN defines an abstain vote option.
- VOTE_OPTION_NO: VOTE_OPTION_NO defines a no vote option.
- VOTE_OPTION_NO_WITH_VETO: VOTE_OPTION_NO_WITH_VETO defines a no with veto vote option.

| Name                     | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Required |
| ------------------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| cosmos.gov.v1.VoteOption | string | VoteOption enumerates the valid vote options for a given governance proposal.   - VOTE_OPTION_UNSPECIFIED: VOTE_OPTION_UNSPECIFIED defines a no-op vote option.  - VOTE_OPTION_YES: VOTE_OPTION_YES defines a yes vote option.  - VOTE_OPTION_ABSTAIN: VOTE_OPTION_ABSTAIN defines an abstain vote option.  - VOTE_OPTION_NO: VOTE_OPTION_NO defines a no vote option.  - VOTE_OPTION_NO_WITH_VETO: VOTE_OPTION_NO_WITH_VETO defines a no with veto vote option. |          |

#### cosmos.gov.v1.VotingParams

VotingParams defines the params for voting on governance proposals.

| Name          | Type   | Description                    | Required |
| ------------- | ------ | ------------------------------ | -------- |
| voting_period | string | Duration of the voting period. | No       |

#### cosmos.gov.v1.WeightedVoteOption

WeightedVoteOption defines a unit of vote for vote split.

| Name   | Type                                                  | Description                                                                        | Required |
| ------ | ----------------------------------------------------- | ---------------------------------------------------------------------------------- | -------- |
| option | [cosmos.gov.v1.VoteOption](#cosmos.gov.v1.VoteOption) | option defines the valid vote options, it must not contain duplicate vote options. | No       |
| weight | string                                                | weight is the vote weight associated with the vote option.                         | No       |

#### cosmos.group.v1.GroupInfo

GroupInfo represents the high-level on-chain information for a group.

| Name         | Type            | Description                                                    | Required |
| ------------ | --------------- | -------------------------------------------------------------- | -------- |
| id           | string (uint64) | id is the unique ID of the group.                              | No       |
| admin        | string          | admin is the account address of the group's admin.             | No       |
| metadata     | string          |                                                                | No       |
| version      | string (uint64) |                                                                | No       |
| total_weight | string          | total_weight is the sum of the group members' weights.         | No       |
| created_at   | dateTime        | created_at is a timestamp specifying when a group was created. | No       |

#### cosmos.group.v1.GroupMember

GroupMember represents the relationship between a group and a member.

| Name     | Type                                              | Description                             | Required |
| -------- | ------------------------------------------------- | --------------------------------------- | -------- |
| group_id | string (uint64)                                   | group_id is the unique ID of the group. | No       |
| member   | [cosmos.group.v1.Member](#cosmos.group.v1.Member) | member is the member data.              | No       |

#### cosmos.group.v1.GroupPolicyInfo

GroupPolicyInfo represents the high-level on-chain information for a group policy.

| Name            | Type                                        | Description                                                                                                                         | Required |
| --------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------- |
| address         | string                                      | address is the account address of group policy.                                                                                     | No       |
| group_id        | string (uint64)                             | group_id is the unique ID of the group.                                                                                             | No       |
| admin           | string                                      | admin is the account address of the group admin.                                                                                    | No       |
| metadata        | string                                      |                                                                                                                                     | No       |
| version         | string (uint64)                             | version is used to track changes to a group's GroupPolicyInfo structure that would create a different result on a running proposal. | No       |
| decision_policy | [google.protobuf.Any](#google.protobuf.Any) | decision_policy specifies the group policy's decision policy.                                                                       | No       |
| created_at      | dateTime                                    | created_at is a timestamp specifying when a group policy was created.                                                               | No       |

#### cosmos.group.v1.Member

Member represents a group member with an account address,
non-zero weight, metadata and added_at timestamp.

| Name     | Type     | Description                                                         | Required |
| -------- | -------- | ------------------------------------------------------------------- | -------- |
| address  | string   | address is the member's account address.                            | No       |
| weight   | string   | weight is the member's voting weight that should be greater than 0. | No       |
| metadata | string   | metadata is any arbitrary metadata attached to the member.          | No       |
| added_at | dateTime | added_at is a timestamp specifying when a member was added.         | No       |

#### cosmos.group.v1.Proposal

Proposal defines a group proposal. Any member of a group can submit a proposal
for a group policy to decide upon.
A proposal consists of a set of `sdk.Msg`s that will be executed if the proposal
passes as well as some optional metadata associated with the proposal.

| Name                 | Type                                                                              | Description                                                                                                                                                                                                                                                                                                          | Required |
| -------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| id                   | string (uint64)                                                                   | id is the unique id of the proposal.                                                                                                                                                                                                                                                                                 | No       |
| group_policy_address | string                                                                            | group_policy_address is the account address of group policy.                                                                                                                                                                                                                                                         | No       |
| metadata             | string                                                                            |                                                                                                                                                                                                                                                                                                                      | No       |
| proposers            | [ string ]                                                                        | proposers are the account addresses of the proposers.                                                                                                                                                                                                                                                                | No       |
| submit_time          | dateTime                                                                          | submit_time is a timestamp specifying when a proposal was submitted.                                                                                                                                                                                                                                                 | No       |
| group_version        | string (uint64)                                                                   | group_version tracks the version of the group at proposal submission. This field is here for informational purposes only.                                                                                                                                                                                            | No       |
| group_policy_version | string (uint64)                                                                   | group_policy_version tracks the version of the group policy at proposal submission. When a decision policy is changed, existing proposals from previous policy versions will become invalid with the `ABORTED` status. This field is here for informational purposes only.                                           | No       |
| status               | [cosmos.group.v1.ProposalStatus](#cosmos.group.v1.ProposalStatus)                 | status represents the high level position in the life cycle of the proposal. Initial value is Submitted.                                                                                                                                                                                                             | No       |
| final_tally_result   | [cosmos.group.v1.TallyResult](#cosmos.group.v1.TallyResult)                       | final_tally_result contains the sums of all weighted votes for this proposal for each vote option. It is empty at submission, and only populated after tallying, at voting period end or at proposal execution, whichever happens first.                                                                             | No       |
| voting_period_end    | dateTime                                                                          | voting_period_end is the timestamp before which voting must be done. Unless a successful MsgExec is called before (to execute a proposal whose tally is successful before the voting period ends), tallying will be done at this point, and the `final_tally_result`and `status` fields will be accordingly updated. | No       |
| executor_result      | [cosmos.group.v1.ProposalExecutorResult](#cosmos.group.v1.ProposalExecutorResult) | executor_result is the final result of the proposal execution. Initial value is NotRun.                                                                                                                                                                                                                              | No       |
| messages             | [ [google.protobuf.Any](#google.protobuf.Any) ]                                   | messages is a list of `sdk.Msg`s that will be executed if the proposal passes.                                                                                                                                                                                                                                       | No       |
| title                | string                                                                            | Since: cosmos-sdk 0.47                                                                                                                                                                                                                                                                                               | No       |
| summary              | string                                                                            | Since: cosmos-sdk 0.47                                                                                                                                                                                                                                                                                               | No       |

#### cosmos.group.v1.ProposalExecutorResult

ProposalExecutorResult defines types of proposal executor results.

- PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED: An empty value is not allowed.
- PROPOSAL_EXECUTOR_RESULT_NOT_RUN: We have not yet run the executor.
- PROPOSAL_EXECUTOR_RESULT_SUCCESS: The executor was successful and proposed action updated state.
- PROPOSAL_EXECUTOR_RESULT_FAILURE: The executor returned an error and proposed action didn't update state.

| Name                                   | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                         | Required |
| -------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| cosmos.group.v1.ProposalExecutorResult | string | ProposalExecutorResult defines types of proposal executor results.   - PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED: An empty value is not allowed.  - PROPOSAL_EXECUTOR_RESULT_NOT_RUN: We have not yet run the executor.  - PROPOSAL_EXECUTOR_RESULT_SUCCESS: The executor was successful and proposed action updated state.  - PROPOSAL_EXECUTOR_RESULT_FAILURE: The executor returned an error and proposed action didn't update state. |          |

#### cosmos.group.v1.ProposalStatus

ProposalStatus defines proposal statuses.

- PROPOSAL_STATUS_UNSPECIFIED: An empty value is invalid and not allowed.
- PROPOSAL_STATUS_SUBMITTED: Initial status of a proposal when submitted.
- PROPOSAL_STATUS_ACCEPTED: Final status of a proposal when the final tally is done and the outcome
passes the group policy's decision policy.
- PROPOSAL_STATUS_REJECTED: Final status of a proposal when the final tally is done and the outcome
is rejected by the group policy's decision policy.
- PROPOSAL_STATUS_ABORTED: Final status of a proposal when the group policy is modified before the
final tally.
- PROPOSAL_STATUS_WITHDRAWN: A proposal can be withdrawn before the voting start time by the owner.
When this happens the final status is Withdrawn.

| Name                           | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Required |
| ------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| cosmos.group.v1.ProposalStatus | string | ProposalStatus defines proposal statuses.   - PROPOSAL_STATUS_UNSPECIFIED: An empty value is invalid and not allowed.  - PROPOSAL_STATUS_SUBMITTED: Initial status of a proposal when submitted.  - PROPOSAL_STATUS_ACCEPTED: Final status of a proposal when the final tally is done and the outcome passes the group policy's decision policy.  - PROPOSAL_STATUS_REJECTED: Final status of a proposal when the final tally is done and the outcome is rejected by the group policy's decision policy.  - PROPOSAL_STATUS_ABORTED: Final status of a proposal when the group policy is modified before the final tally.  - PROPOSAL_STATUS_WITHDRAWN: A proposal can be withdrawn before the voting start time by the owner. When this happens the final status is Withdrawn. |          |

#### cosmos.group.v1.QueryGroupInfoResponse

QueryGroupInfoResponse is the Query/GroupInfo response type.

| Name | Type                                                    | Description                         | Required |
| ---- | ------------------------------------------------------- | ----------------------------------- | -------- |
| info | [cosmos.group.v1.GroupInfo](#cosmos.group.v1.GroupInfo) | info is the GroupInfo of the group. | No       |

#### cosmos.group.v1.QueryGroupMembersResponse

QueryGroupMembersResponse is the Query/GroupMembersResponse response type.

| Name       | Type                                                                              | Description                                               | Required |
| ---------- | --------------------------------------------------------------------------------- | --------------------------------------------------------- | -------- |
| members    | [ [cosmos.group.v1.GroupMember](#cosmos.group.v1.GroupMember) ]                   | members are the members of the group with given group_id. | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response.        | No       |

#### cosmos.group.v1.QueryGroupPoliciesByAdminResponse

QueryGroupPoliciesByAdminResponse is the Query/GroupPoliciesByAdmin response type.

| Name           | Type                                                                              | Description                                                     | Required |
| -------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------- | -------- |
| group_policies | [ [cosmos.group.v1.GroupPolicyInfo](#cosmos.group.v1.GroupPolicyInfo) ]           | group_policies are the group policies info with provided admin. | No       |
| pagination     | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response.              | No       |

#### cosmos.group.v1.QueryGroupPoliciesByGroupResponse

QueryGroupPoliciesByGroupResponse is the Query/GroupPoliciesByGroup response type.

| Name           | Type                                                                              | Description                                                                    | Required |
| -------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | -------- |
| group_policies | [ [cosmos.group.v1.GroupPolicyInfo](#cosmos.group.v1.GroupPolicyInfo) ]           | group_policies are the group policies info associated with the provided group. | No       |
| pagination     | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response.                             | No       |

#### cosmos.group.v1.QueryGroupPolicyInfoResponse

QueryGroupPolicyInfoResponse is the Query/GroupPolicyInfo response type.

| Name | Type                                                                | Description                                      | Required |
| ---- | ------------------------------------------------------------------- | ------------------------------------------------ | -------- |
| info | [cosmos.group.v1.GroupPolicyInfo](#cosmos.group.v1.GroupPolicyInfo) | info is the GroupPolicyInfo of the group policy. | No       |

#### cosmos.group.v1.QueryGroupsByAdminResponse

QueryGroupsByAdminResponse is the Query/GroupsByAdminResponse response type.

| Name       | Type                                                                              | Description                                         | Required |
| ---------- | --------------------------------------------------------------------------------- | --------------------------------------------------- | -------- |
| groups     | [ [cosmos.group.v1.GroupInfo](#cosmos.group.v1.GroupInfo) ]                       | groups are the groups info with the provided admin. | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response.  | No       |

#### cosmos.group.v1.QueryGroupsByMemberResponse

QueryGroupsByMemberResponse is the Query/GroupsByMember response type.

| Name       | Type                                                                              | Description                                                | Required |
| ---------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------- | -------- |
| groups     | [ [cosmos.group.v1.GroupInfo](#cosmos.group.v1.GroupInfo) ]                       | groups are the groups info with the provided group member. | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response.         | No       |

#### cosmos.group.v1.QueryGroupsResponse

QueryGroupsResponse is the Query/Groups response type.

Since: cosmos-sdk 0.47.1

| Name       | Type                                                                              | Description                                        | Required |
| ---------- | --------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| groups     | [ [cosmos.group.v1.GroupInfo](#cosmos.group.v1.GroupInfo) ]                       | `groups` is all the groups present in state.       | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response. | No       |

#### cosmos.group.v1.QueryProposalResponse

QueryProposalResponse is the Query/Proposal response type.

| Name     | Type                                                  | Description                    | Required |
| -------- | ----------------------------------------------------- | ------------------------------ | -------- |
| proposal | [cosmos.group.v1.Proposal](#cosmos.group.v1.Proposal) | proposal is the proposal info. | No       |

#### cosmos.group.v1.QueryProposalsByGroupPolicyResponse

QueryProposalsByGroupPolicyResponse is the Query/ProposalByGroupPolicy response type.

| Name       | Type                                                                              | Description                                          | Required |
| ---------- | --------------------------------------------------------------------------------- | ---------------------------------------------------- | -------- |
| proposals  | [ [cosmos.group.v1.Proposal](#cosmos.group.v1.Proposal) ]                         | proposals are the proposals with given group policy. | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response.   | No       |

#### cosmos.group.v1.QueryTallyResultResponse

QueryTallyResultResponse is the Query/TallyResult response type.

| Name  | Type                                                        | Description                        | Required |
| ----- | ----------------------------------------------------------- | ---------------------------------- | -------- |
| tally | [cosmos.group.v1.TallyResult](#cosmos.group.v1.TallyResult) | tally defines the requested tally. | No       |

#### cosmos.group.v1.QueryVoteByProposalVoterResponse

QueryVoteByProposalVoterResponse is the Query/VoteByProposalVoter response type.

| Name | Type                                          | Description                                        | Required |
| ---- | --------------------------------------------- | -------------------------------------------------- | -------- |
| vote | [cosmos.group.v1.Vote](#cosmos.group.v1.Vote) | vote is the vote with given proposal_id and voter. | No       |

#### cosmos.group.v1.QueryVotesByProposalResponse

QueryVotesByProposalResponse is the Query/VotesByProposal response type.

| Name       | Type                                                                              | Description                                        | Required |
| ---------- | --------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| votes      | [ [cosmos.group.v1.Vote](#cosmos.group.v1.Vote) ]                                 | votes are the list of votes for given proposal_id. | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response. | No       |

#### cosmos.group.v1.QueryVotesByVoterResponse

QueryVotesByVoterResponse is the Query/VotesByVoter response type.

| Name       | Type                                                                              | Description                                        | Required |
| ---------- | --------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| votes      | [ [cosmos.group.v1.Vote](#cosmos.group.v1.Vote) ]                                 | votes are the list of votes by given voter.        | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response. | No       |

#### cosmos.group.v1.TallyResult

TallyResult represents the sum of weighted votes for each vote option.

| Name               | Type   | Description                                      | Required |
| ------------------ | ------ | ------------------------------------------------ | -------- |
| yes_count          | string | yes_count is the weighted sum of yes votes.      | No       |
| abstain_count      | string | abstain_count is the weighted sum of abstainers. | No       |
| no_count           | string | no_count is the weighted sum of no votes.        | No       |
| no_with_veto_count | string | no_with_veto_count is the weighted sum of veto.  | No       |

#### cosmos.group.v1.Vote

| Name        | Type                                                      | Description                                               | Required |
| ----------- | --------------------------------------------------------- | --------------------------------------------------------- | -------- |
| proposal_id | string (uint64)                                           | proposal is the unique ID of the proposal.                | No       |
| voter       | string                                                    | voter is the account address of the voter.                | No       |
| option      | [cosmos.group.v1.VoteOption](#cosmos.group.v1.VoteOption) | option is the voter's choice on the proposal.             | No       |
| metadata    | string                                                    |                                                           | No       |
| submit_time | dateTime                                                  | submit_time is the timestamp when the vote was submitted. | No       |

#### cosmos.group.v1.VoteOption

VoteOption enumerates the valid vote options for a given proposal.

- VOTE_OPTION_UNSPECIFIED: VOTE_OPTION_UNSPECIFIED defines an unspecified vote option which will
return an error.
- VOTE_OPTION_YES: VOTE_OPTION_YES defines a yes vote option.
- VOTE_OPTION_ABSTAIN: VOTE_OPTION_ABSTAIN defines an abstain vote option.
- VOTE_OPTION_NO: VOTE_OPTION_NO defines a no vote option.
- VOTE_OPTION_NO_WITH_VETO: VOTE_OPTION_NO_WITH_VETO defines a no with veto vote option.

| Name                       | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Required |
| -------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| cosmos.group.v1.VoteOption | string | VoteOption enumerates the valid vote options for a given proposal.   - VOTE_OPTION_UNSPECIFIED: VOTE_OPTION_UNSPECIFIED defines an unspecified vote option which will return an error.  - VOTE_OPTION_YES: VOTE_OPTION_YES defines a yes vote option.  - VOTE_OPTION_ABSTAIN: VOTE_OPTION_ABSTAIN defines an abstain vote option.  - VOTE_OPTION_NO: VOTE_OPTION_NO defines a no vote option.  - VOTE_OPTION_NO_WITH_VETO: VOTE_OPTION_NO_WITH_VETO defines a no with veto vote option. |          |

#### cosmos.mint.v1beta1.Params

Params defines the parameters for the x/mint module.

| Name                  | Type            | Description | Required |
| --------------------- | --------------- | ----------- | -------- |
| mint_denom            | string          |             | No       |
| inflation_rate_change | string          |             | No       |
| inflation_max         | string          |             | No       |
| inflation_min         | string          |             | No       |
| goal_bonded           | string          |             | No       |
| blocks_per_year       | string (uint64) |             | No       |

#### cosmos.mint.v1beta1.QueryAnnualProvisionsResponse

QueryAnnualProvisionsResponse is the response type for the
Query/AnnualProvisions RPC method.

| Name              | Type | Description                                                       | Required |
| ----------------- | ---- | ----------------------------------------------------------------- | -------- |
| annual_provisions | byte | annual_provisions is the current minting annual provisions value. | No       |

#### cosmos.mint.v1beta1.QueryInflationResponse

QueryInflationResponse is the response type for the Query/Inflation RPC
method.

| Name      | Type | Description                                       | Required |
| --------- | ---- | ------------------------------------------------- | -------- |
| inflation | byte | inflation is the current minting inflation value. | No       |

#### cosmos.mint.v1beta1.QueryParamsResponse

QueryParamsResponse is the response type for the Query/Params RPC method.

| Name   | Type                                                      | Description                                  | Required |
| ------ | --------------------------------------------------------- | -------------------------------------------- | -------- |
| params | [cosmos.mint.v1beta1.Params](#cosmos.mint.v1beta1.Params) | params defines the parameters of the module. | No       |

#### cosmos.nft.v1beta1.Class

Class defines the class of the nft type.

| Name        | Type                                        | Description | Required |
| ----------- | ------------------------------------------- | ----------- | -------- |
| id          | string                                      |             | No       |
| name        | string                                      |             | No       |
| symbol      | string                                      |             | No       |
| description | string                                      |             | No       |
| uri         | string                                      |             | No       |
| uri_hash    | string                                      |             | No       |
| data        | [google.protobuf.Any](#google.protobuf.Any) |             | No       |

#### cosmos.nft.v1beta1.NFT

NFT defines the NFT.

| Name     | Type                                        | Description | Required |
| -------- | ------------------------------------------- | ----------- | -------- |
| class_id | string                                      |             | No       |
| id       | string                                      |             | No       |
| uri      | string                                      |             | No       |
| uri_hash | string                                      |             | No       |
| data     | [google.protobuf.Any](#google.protobuf.Any) |             | No       |

#### cosmos.nft.v1beta1.QueryBalanceResponse

| Name   | Type            | Description | Required |
| ------ | --------------- | ----------- | -------- |
| amount | string (uint64) |             | No       |

#### cosmos.nft.v1beta1.QueryClassResponse

| Name  | Type                                                  | Description                              | Required |
| ----- | ----------------------------------------------------- | ---------------------------------------- | -------- |
| class | [cosmos.nft.v1beta1.Class](#cosmos.nft.v1beta1.Class) | class defines the class of the nft type. | No       |

#### cosmos.nft.v1beta1.QueryClassesResponse

| Name       | Type                                                                              | Description                                        | Required |
| ---------- | --------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| classes    | [ [cosmos.nft.v1beta1.Class](#cosmos.nft.v1beta1.Class) ]                         | class defines the class of the nft type.           | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response. | No       |

#### cosmos.nft.v1beta1.QueryNFTResponse

| Name | Type                                              | Description | Required |
| ---- | ------------------------------------------------- | ----------- | -------- |
| nft  | [cosmos.nft.v1beta1.NFT](#cosmos.nft.v1beta1.NFT) |             | No       |

#### cosmos.nft.v1beta1.QueryNFTsResponse

| Name       | Type                                                                              | Description                                        | Required |
| ---------- | --------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| nfts       | [ [cosmos.nft.v1beta1.NFT](#cosmos.nft.v1beta1.NFT) ]                             |                                                    | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response. | No       |

#### cosmos.nft.v1beta1.QueryOwnerResponse

| Name  | Type   | Description | Required |
| ----- | ------ | ----------- | -------- |
| owner | string |             | No       |

#### cosmos.nft.v1beta1.QuerySupplyResponse

| Name   | Type            | Description | Required |
| ------ | --------------- | ----------- | -------- |
| amount | string (uint64) |             | No       |

#### cosmos.orm.query.v1alpha1.GetResponse

GetResponse is the Query/Get response type.

| Name   | Type                                        | Description                                                                                                   | Required |
| ------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------- |
| result | [google.protobuf.Any](#google.protobuf.Any) | result is the result of the get query. If no value is found, the gRPC status code NOT_FOUND will be returned. | No       |

#### cosmos.orm.query.v1alpha1.IndexValue

IndexValue represents the value of a field in an ORM index expression.

| Name      | Type            | Description                                                                     | Required |
| --------- | --------------- | ------------------------------------------------------------------------------- | -------- |
| uint      | string (uint64) | uint specifies a value for an uint32, fixed32, uint64, or fixed64 index field.  | No       |
| int       | string (int64)  | int64 specifies a value for an int32, sfixed32, int64, or sfixed64 index field. | No       |
| str       | string          | str specifies a value for a string index field.                                 | No       |
| bytes     | byte            | bytes specifies a value for a bytes index field.                                | No       |
| enum      | string          | enum specifies a value for an enum index field.                                 | No       |
| bool      | boolean         | bool specifies a value for a bool index field.                                  | No       |
| timestamp | dateTime        | timestamp specifies a value for a timestamp index field.                        | No       |
| duration  | string          | duration specifies a value for a duration index field.                          | No       |

#### cosmos.orm.query.v1alpha1.ListRequest.Prefix

Prefix specifies the arguments to a prefix query.

| Name   | Type                                                                              | Description                                                                                                                                               | Required |
| ------ | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| values | [ [cosmos.orm.query.v1alpha1.IndexValue](#cosmos.orm.query.v1alpha1.IndexValue) ] | values specifies the index values for the prefix query. It is valid to special a partial prefix with fewer values than the number of fields in the index. | No       |

#### cosmos.orm.query.v1alpha1.ListRequest.Range

Range specifies the arguments to a range query.

| Name  | Type                                                                              | Description                                                                                                                                      | Required |
| ----- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| start | [ [cosmos.orm.query.v1alpha1.IndexValue](#cosmos.orm.query.v1alpha1.IndexValue) ] | start specifies the starting index values for the range query. It is valid to provide fewer values than the number of fields in the index.       | No       |
| end   | [ [cosmos.orm.query.v1alpha1.IndexValue](#cosmos.orm.query.v1alpha1.IndexValue) ] | end specifies the inclusive ending index values for the range query. It is valid to provide fewer values than the number of fields in the index. | No       |

#### cosmos.orm.query.v1alpha1.ListResponse

ListResponse is the Query/List response type.

| Name       | Type                                                                              | Description                            | Required |
| ---------- | --------------------------------------------------------------------------------- | -------------------------------------- | -------- |
| results    | [ [google.protobuf.Any](#google.protobuf.Any) ]                                   | results are the results of the query.  | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination is the pagination response. | No       |

#### cosmos.params.v1beta1.ParamChange

ParamChange defines an individual parameter change, for use in
ParameterChangeProposal.

| Name     | Type   | Description | Required |
| -------- | ------ | ----------- | -------- |
| subspace | string |             | No       |
| key      | string |             | No       |
| value    | string |             | No       |

#### cosmos.params.v1beta1.QueryParamsResponse

QueryParamsResponse is response type for the Query/Params RPC method.

| Name  | Type                                                                    | Description                          | Required |
| ----- | ----------------------------------------------------------------------- | ------------------------------------ | -------- |
| param | [cosmos.params.v1beta1.ParamChange](#cosmos.params.v1beta1.ParamChange) | param defines the queried parameter. | No       |

#### cosmos.params.v1beta1.QuerySubspacesResponse

QuerySubspacesResponse defines the response types for querying for all
registered subspaces and all keys for a subspace.

Since: cosmos-sdk 0.46

| Name      | Type                                                                  | Description | Required |
| --------- | --------------------------------------------------------------------- | ----------- | -------- |
| subspaces | [ [cosmos.params.v1beta1.Subspace](#cosmos.params.v1beta1.Subspace) ] |             | No       |

#### cosmos.params.v1beta1.Subspace

Subspace defines a parameter subspace name and all the keys that exist for
the subspace.

Since: cosmos-sdk 0.46

| Name     | Type       | Description | Required |
| -------- | ---------- | ----------- | -------- |
| subspace | string     |             | No       |
| keys     | [ string ] |             | No       |

#### cosmos.slashing.v1beta1.Params

Params represents the parameters used for by the slashing module.

| Name                       | Type           | Description | Required |
| -------------------------- | -------------- | ----------- | -------- |
| signed_blocks_window       | string (int64) |             | No       |
| min_signed_per_window      | byte           |             | No       |
| downtime_jail_duration     | string         |             | No       |
| slash_fraction_double_sign | byte           |             | No       |
| slash_fraction_downtime    | byte           |             | No       |

#### cosmos.slashing.v1beta1.QueryParamsResponse

| Name   | Type                                                              | Description | Required |
| ------ | ----------------------------------------------------------------- | ----------- | -------- |
| params | [cosmos.slashing.v1beta1.Params](#cosmos.slashing.v1beta1.Params) |             | No       |

#### cosmos.slashing.v1beta1.QuerySigningInfoResponse

| Name             | Type                                                                                          | Description | Required |
| ---------------- | --------------------------------------------------------------------------------------------- | ----------- | -------- |
| val_signing_info | [cosmos.slashing.v1beta1.ValidatorSigningInfo](#cosmos.slashing.v1beta1.ValidatorSigningInfo) |             | No       |

#### cosmos.slashing.v1beta1.QuerySigningInfosResponse

| Name       | Type                                                                                              | Description | Required |
| ---------- | ------------------------------------------------------------------------------------------------- | ----------- | -------- |
| info       | [ [cosmos.slashing.v1beta1.ValidatorSigningInfo](#cosmos.slashing.v1beta1.ValidatorSigningInfo) ] |             | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse)                 |             | No       |

#### cosmos.slashing.v1beta1.ValidatorSigningInfo

ValidatorSigningInfo defines a validator's signing info for monitoring their
liveness activity.

| Name                  | Type           | Description                                                                                                                                                                                                                | Required |
| --------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| address               | string         |                                                                                                                                                                                                                            | No       |
| start_height          | string (int64) |                                                                                                                                                                                                                            | No       |
| index_offset          | string (int64) | Index which is incremented every time a validator is bonded in a block and _may_ have signed a pre-commit or not. This in conjunction with the signed_blocks_window param determines the index in the missed block bitmap. | No       |
| jailed_until          | dateTime       | Timestamp until which the validator is jailed due to liveness downtime.                                                                                                                                                    | No       |
| tombstoned            | boolean        | Whether or not a validator has been tombstoned (killed out of validator set). It is set once the validator commits an equivocation or for any other configured misbehavior.                                                | No       |
| missed_blocks_counter | string (int64) | A counter of missed (unsigned) blocks. It is used to avoid unnecessary reads in the missed block bitmap.                                                                                                                   | No       |

#### cosmos.staking.v1beta1.BondStatus

BondStatus is the status of a validator.

- BOND_STATUS_UNSPECIFIED: UNSPECIFIED defines an invalid validator status.
- BOND_STATUS_UNBONDED: UNBONDED defines a validator that is not bonded.
- BOND_STATUS_UNBONDING: UNBONDING defines a validator that is unbonding.
- BOND_STATUS_BONDED: BONDED defines a validator that is bonded.

| Name                              | Type   | Description                                                                                                                                                                                                                                                                                                                                   | Required |
| --------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| cosmos.staking.v1beta1.BondStatus | string | BondStatus is the status of a validator.   - BOND_STATUS_UNSPECIFIED: UNSPECIFIED defines an invalid validator status.  - BOND_STATUS_UNBONDED: UNBONDED defines a validator that is not bonded.  - BOND_STATUS_UNBONDING: UNBONDING defines a validator that is unbonding.  - BOND_STATUS_BONDED: BONDED defines a validator that is bonded. |          |

#### cosmos.staking.v1beta1.Commission

Commission defines commission parameters for a given validator.

| Name             | Type                                                                              | Description                                                                                | Required |
| ---------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------- |
| commission_rates | [cosmos.staking.v1beta1.CommissionRates](#cosmos.staking.v1beta1.CommissionRates) | commission_rates defines the initial commission rates to be used for creating a validator. | No       |
| update_time      | dateTime                                                                          | update_time is the last time the commission rate was changed.                              | No       |

#### cosmos.staking.v1beta1.CommissionRates

CommissionRates defines the initial commission rates to be used for creating
a validator.

| Name            | Type   | Description                                                                                    | Required |
| --------------- | ------ | ---------------------------------------------------------------------------------------------- | -------- |
| rate            | string | rate is the commission rate charged to delegators, as a fraction.                              | No       |
| max_rate        | string | max_rate defines the maximum commission rate which validator can ever charge, as a fraction.   | No       |
| max_change_rate | string | max_change_rate defines the maximum daily increase of the validator commission, as a fraction. | No       |

#### cosmos.staking.v1beta1.Delegation

Delegation represents the bond with tokens held by an account. It is
owned by one delegator, and is associated with the voting power of one
validator.

| Name              | Type   | Description                                                | Required |
| ----------------- | ------ | ---------------------------------------------------------- | -------- |
| delegator_address | string | delegator_address is the encoded address of the delegator. | No       |
| validator_address | string | validator_address is the encoded address of the validator. | No       |
| shares            | string | shares define the delegation shares received.              | No       |

#### cosmos.staking.v1beta1.DelegationResponse

DelegationResponse is equivalent to Delegation except that it contains a
balance in addition to shares which is more suitable for client responses.

| Name       | Type                                                                    | Description | Required |
| ---------- | ----------------------------------------------------------------------- | ----------- | -------- |
| delegation | [cosmos.staking.v1beta1.Delegation](#cosmos.staking.v1beta1.Delegation) |             | No       |
| balance    | [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin)                   |             | No       |

#### cosmos.staking.v1beta1.Description

Description defines a validator description.

| Name             | Type   | Description                                                             | Required |
| ---------------- | ------ | ----------------------------------------------------------------------- | -------- |
| moniker          | string | moniker defines a human-readable name for the validator.                | No       |
| identity         | string | identity defines an optional identity signature (ex. UPort or Keybase). | No       |
| website          | string | website defines an optional website link.                               | No       |
| security_contact | string | security_contact defines an optional email for security contact.        | No       |
| details          | string | details define other optional details.                                  | No       |

#### cosmos.staking.v1beta1.HistoricalInfo

HistoricalInfo contains header and validator information for a given block.
It is stored as part of staking module's state, which persists the `n` most
recent HistoricalInfo
(`n` is set by the staking module's `historical_entries` parameter).

| Name   | Type                                                                      | Description | Required |
| ------ | ------------------------------------------------------------------------- | ----------- | -------- |
| header | [tendermint.types.Header](#tendermint.types.Header)                       |             | No       |
| valset | [ [cosmos.staking.v1beta1.Validator](#cosmos.staking.v1beta1.Validator) ] |             | No       |

#### cosmos.staking.v1beta1.Params

Params defines the parameters for the x/staking module.

| Name                | Type   | Description                                                                                     | Required |
| ------------------- | ------ | ----------------------------------------------------------------------------------------------- | -------- |
| unbonding_time      | string | unbonding_time is the time duration of unbonding.                                               | No       |
| max_validators      | long   | max_validators is the maximum number of validators.                                             | No       |
| max_entries         | long   | max_entries is the max entries for either unbonding delegation or redelegation (per pair/trio). | No       |
| historical_entries  | long   | historical_entries is the number of historical entries to persist.                              | No       |
| bond_denom          | string | bond_denom defines the bondable coin denomination.                                              | No       |
| min_commission_rate | string |                                                                                                 | No       |

#### cosmos.staking.v1beta1.Pool

Pool is used for tracking bonded and not-bonded token supply of the bond
denomination.

| Name              | Type   | Description | Required |
| ----------------- | ------ | ----------- | -------- |
| not_bonded_tokens | string |             | No       |
| bonded_tokens     | string |             | No       |

#### cosmos.staking.v1beta1.QueryDelegationResponse

QueryDelegationResponse is response type for the Query/Delegation RPC method.

| Name                | Type                                                                                    | Description                                                       | Required |
| ------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | -------- |
| delegation_response | [cosmos.staking.v1beta1.DelegationResponse](#cosmos.staking.v1beta1.DelegationResponse) | delegation_responses defines the delegation info of a delegation. | No       |

#### cosmos.staking.v1beta1.QueryDelegatorDelegationsResponse

QueryDelegatorDelegationsResponse is response type for the
Query/DelegatorDelegations RPC method.

| Name                 | Type                                                                                        | Description                                                            | Required |
| -------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | -------- |
| delegation_responses | [ [cosmos.staking.v1beta1.DelegationResponse](#cosmos.staking.v1beta1.DelegationResponse) ] | delegation_responses defines all the delegations' info of a delegator. | No       |
| pagination           | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse)           | pagination defines the pagination in the response.                     | No       |

#### cosmos.staking.v1beta1.QueryDelegatorUnbondingDelegationsResponse

QueryUnbondingDelegatorDelegationsResponse is response type for the
Query/UnbondingDelegatorDelegations RPC method.

| Name                | Type                                                                                          | Description                                        | Required |
| ------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| unbonding_responses | [ [cosmos.staking.v1beta1.UnbondingDelegation](#cosmos.staking.v1beta1.UnbondingDelegation) ] |                                                    | No       |
| pagination          | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse)             | pagination defines the pagination in the response. | No       |

#### cosmos.staking.v1beta1.QueryDelegatorValidatorResponse

QueryDelegatorValidatorResponse response type for the
Query/DelegatorValidator RPC method.

| Name      | Type                                                                  | Description                           | Required |
| --------- | --------------------------------------------------------------------- | ------------------------------------- | -------- |
| validator | [cosmos.staking.v1beta1.Validator](#cosmos.staking.v1beta1.Validator) | validator defines the validator info. | No       |

#### cosmos.staking.v1beta1.QueryDelegatorValidatorsResponse

QueryDelegatorValidatorsResponse is response type for the
Query/DelegatorValidators RPC method.

| Name       | Type                                                                              | Description                                             | Required |
| ---------- | --------------------------------------------------------------------------------- | ------------------------------------------------------- | -------- |
| validators | [ [cosmos.staking.v1beta1.Validator](#cosmos.staking.v1beta1.Validator) ]         | validators defines the validators' info of a delegator. | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response.      | No       |

#### cosmos.staking.v1beta1.QueryHistoricalInfoResponse

QueryHistoricalInfoResponse is response type for the Query/HistoricalInfo RPC
method.

| Name | Type                                                                            | Description                                           | Required |
| ---- | ------------------------------------------------------------------------------- | ----------------------------------------------------- | -------- |
| hist | [cosmos.staking.v1beta1.HistoricalInfo](#cosmos.staking.v1beta1.HistoricalInfo) | hist defines the historical info at the given height. | No       |

#### cosmos.staking.v1beta1.QueryParamsResponse

QueryParamsResponse is response type for the Query/Params RPC method.

| Name   | Type                                                            | Description                                     | Required |
| ------ | --------------------------------------------------------------- | ----------------------------------------------- | -------- |
| params | [cosmos.staking.v1beta1.Params](#cosmos.staking.v1beta1.Params) | params holds all the parameters of this module. | No       |

#### cosmos.staking.v1beta1.QueryPoolResponse

QueryPoolResponse is response type for the Query/Pool RPC method.

| Name | Type                                                        | Description                 | Required |
| ---- | ----------------------------------------------------------- | --------------------------- | -------- |
| pool | [cosmos.staking.v1beta1.Pool](#cosmos.staking.v1beta1.Pool) | pool defines the pool info. | No       |

#### cosmos.staking.v1beta1.QueryRedelegationsResponse

QueryRedelegationsResponse is response type for the Query/Redelegations RPC
method.

| Name                   | Type                                                                                            | Description                                        | Required |
| ---------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| redelegation_responses | [ [cosmos.staking.v1beta1.RedelegationResponse](#cosmos.staking.v1beta1.RedelegationResponse) ] |                                                    | No       |
| pagination             | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse)               | pagination defines the pagination in the response. | No       |

#### cosmos.staking.v1beta1.QueryUnbondingDelegationResponse

QueryDelegationResponse is response type for the Query/UnbondingDelegation
RPC method.

| Name   | Type                                                                                      | Description                                               | Required |
| ------ | ----------------------------------------------------------------------------------------- | --------------------------------------------------------- | -------- |
| unbond | [cosmos.staking.v1beta1.UnbondingDelegation](#cosmos.staking.v1beta1.UnbondingDelegation) | unbond defines the unbonding information of a delegation. | No       |

#### cosmos.staking.v1beta1.QueryValidatorDelegationsResponse

| Name                 | Type                                                                                        | Description                                        | Required |
| -------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| delegation_responses | [ [cosmos.staking.v1beta1.DelegationResponse](#cosmos.staking.v1beta1.DelegationResponse) ] |                                                    | No       |
| pagination           | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse)           | pagination defines the pagination in the response. | No       |

#### cosmos.staking.v1beta1.QueryValidatorResponse

| Name      | Type                                                                  | Description                           | Required |
| --------- | --------------------------------------------------------------------- | ------------------------------------- | -------- |
| validator | [cosmos.staking.v1beta1.Validator](#cosmos.staking.v1beta1.Validator) | validator defines the validator info. | No       |

#### cosmos.staking.v1beta1.QueryValidatorUnbondingDelegationsResponse

QueryValidatorUnbondingDelegationsResponse is response type for the
Query/ValidatorUnbondingDelegations RPC method.

| Name                | Type                                                                                          | Description                                        | Required |
| ------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| unbonding_responses | [ [cosmos.staking.v1beta1.UnbondingDelegation](#cosmos.staking.v1beta1.UnbondingDelegation) ] |                                                    | No       |
| pagination          | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse)             | pagination defines the pagination in the response. | No       |

#### cosmos.staking.v1beta1.QueryValidatorsResponse

| Name       | Type                                                                              | Description                                        | Required |
| ---------- | --------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| validators | [ [cosmos.staking.v1beta1.Validator](#cosmos.staking.v1beta1.Validator) ]         | validators contains all the queried validators.    | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response. | No       |

#### cosmos.staking.v1beta1.Redelegation

Redelegation contains the list of a particular delegator's redelegating bonds
from a particular source validator to a particular destination validator.

| Name                  | Type                                                                                      | Description                                                                       | Required |
| --------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | -------- |
| delegator_address     | string                                                                                    | delegator_address is the bech32-encoded address of the delegator.                 | No       |
| validator_src_address | string                                                                                    | validator_src_address is the validator redelegation source operator address.      | No       |
| validator_dst_address | string                                                                                    | validator_dst_address is the validator redelegation destination operator address. | No       |
| entries               | [ [cosmos.staking.v1beta1.RedelegationEntry](#cosmos.staking.v1beta1.RedelegationEntry) ] | entries are the redelegation entries.                                             | No       |

#### cosmos.staking.v1beta1.RedelegationEntry

RedelegationEntry defines a redelegation object with relevant metadata.

| Name                        | Type            | Description                                                                       | Required |
| --------------------------- | --------------- | --------------------------------------------------------------------------------- | -------- |
| creation_height             | string (int64)  | creation_height  defines the height which the redelegation took place.            | No       |
| completion_time             | dateTime        | completion_time defines the unix time for redelegation completion.                | No       |
| initial_balance             | string          | initial_balance defines the initial balance when redelegation started.            | No       |
| shares_dst                  | string          | shares_dst is the amount of destination-validator shares created by redelegation. | No       |
| unbonding_id                | string (uint64) |                                                                                   | No       |
| unbonding_on_hold_ref_count | string (int64)  |                                                                                   | No       |

#### cosmos.staking.v1beta1.RedelegationEntryResponse

RedelegationEntryResponse is equivalent to a RedelegationEntry except that it
contains a balance in addition to shares which is more suitable for client
responses.

| Name               | Type                                                                                  | Description | Required |
| ------------------ | ------------------------------------------------------------------------------------- | ----------- | -------- |
| redelegation_entry | [cosmos.staking.v1beta1.RedelegationEntry](#cosmos.staking.v1beta1.RedelegationEntry) |             | No       |
| balance            | string                                                                                |             | No       |

#### cosmos.staking.v1beta1.RedelegationResponse

RedelegationResponse is equivalent to a Redelegation except that its entries
contain a balance in addition to shares which is more suitable for client
responses.

| Name         | Type                                                                                                      | Description | Required |
| ------------ | --------------------------------------------------------------------------------------------------------- | ----------- | -------- |
| redelegation | [cosmos.staking.v1beta1.Redelegation](#cosmos.staking.v1beta1.Redelegation)                               |             | No       |
| entries      | [ [cosmos.staking.v1beta1.RedelegationEntryResponse](#cosmos.staking.v1beta1.RedelegationEntryResponse) ] |             | No       |

#### cosmos.staking.v1beta1.UnbondingDelegation

UnbondingDelegation stores all of a single delegator's unbonding bonds
for a single validator in an time-ordered list.

| Name              | Type                                                                                                    | Description                                                | Required |
| ----------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | -------- |
| delegator_address | string                                                                                                  | delegator_address is the encoded address of the delegator. | No       |
| validator_address | string                                                                                                  | validator_address is the encoded address of the validator. | No       |
| entries           | [ [cosmos.staking.v1beta1.UnbondingDelegationEntry](#cosmos.staking.v1beta1.UnbondingDelegationEntry) ] | entries are the unbonding delegation entries.              | No       |

#### cosmos.staking.v1beta1.UnbondingDelegationEntry

UnbondingDelegationEntry defines an unbonding object with relevant metadata.

| Name                        | Type            | Description                                                                      | Required |
| --------------------------- | --------------- | -------------------------------------------------------------------------------- | -------- |
| creation_height             | string (int64)  | creation_height is the height which the unbonding took place.                    | No       |
| completion_time             | dateTime        | completion_time is the unix time for unbonding completion.                       | No       |
| initial_balance             | string          | initial_balance defines the tokens initially scheduled to receive at completion. | No       |
| balance                     | string          | balance defines the tokens to receive at completion.                             | No       |
| unbonding_id                | string (uint64) |                                                                                  | No       |
| unbonding_on_hold_ref_count | string (int64)  |                                                                                  | No       |

#### cosmos.staking.v1beta1.Validator

Validator defines a validator, together with the total amount of the
Validator's bond shares and their exchange rate to coins. Slashing results in
a decrease in the exchange rate, allowing correct calculation of future
undelegations without iterating over delegators. When coins are delegated to
this validator, the validator is credited with a delegation whose number of
bond shares is based on the amount of coins delegated divided by the current
exchange rate. Voting power can be calculated as total bonded shares
multiplied by exchange rate.

| Name                        | Type                                                                      | Description                                                                                           | Required |
| --------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | -------- |
| operator_address            | string                                                                    | operator_address defines the address of the validator's operator; bech encoded in JSON.               | No       |
| consensus_pubkey            | [google.protobuf.Any](#google.protobuf.Any)                               | consensus_pubkey is the consensus public key of the validator, as a Protobuf Any.                     | No       |
| jailed                      | boolean                                                                   | jailed defined whether the validator has been jailed from bonded status or not.                       | No       |
| status                      | [cosmos.staking.v1beta1.BondStatus](#cosmos.staking.v1beta1.BondStatus)   | status is the validator status (bonded/unbonding/unbonded).                                           | No       |
| tokens                      | string                                                                    | tokens define the delegated tokens (incl. self-delegation).                                           | No       |
| delegator_shares            | string                                                                    | delegator_shares defines total shares issued to a validator's delegators.                             | No       |
| description                 | [cosmos.staking.v1beta1.Description](#cosmos.staking.v1beta1.Description) | description defines the description terms for the validator.                                          | No       |
| unbonding_height            | string (int64)                                                            | unbonding_height defines, if unbonding, the height at which this validator has begun unbonding.       | No       |
| unbonding_time              | dateTime                                                                  | unbonding_time defines, if unbonding, the min time for the validator to complete unbonding.           | No       |
| commission                  | [cosmos.staking.v1beta1.Commission](#cosmos.staking.v1beta1.Commission)   | commission defines the commission parameters.                                                         | No       |
| min_self_delegation         | string                                                                    | min_self_delegation is the validator's self declared minimum self delegation.  Since: cosmos-sdk 0.46 | No       |
| unbonding_on_hold_ref_count | string (int64)                                                            |                                                                                                       | No       |
| unbonding_ids               | [ string (uint64) ]                                                       |                                                                                                       | No       |

#### cosmos.base.abci.v1beta1.ABCIMessageLog

ABCIMessageLog defines a structure containing an indexed tx ABCI message log.

| Name      | Type                                                                              | Description                                                                       | Required |
| --------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | -------- |
| msg_index | long                                                                              |                                                                                   | No       |
| log       | string                                                                            |                                                                                   | No       |
| events    | [ [cosmos.base.abci.v1beta1.StringEvent](#cosmos.base.abci.v1beta1.StringEvent) ] | Events contains a slice of Event objects that were emitted during some execution. | No       |

#### cosmos.base.abci.v1beta1.Attribute

Attribute defines an attribute wrapper where the key and value are
strings instead of raw bytes.

| Name  | Type   | Description | Required |
| ----- | ------ | ----------- | -------- |
| key   | string |             | No       |
| value | string |             | No       |

#### cosmos.base.abci.v1beta1.GasInfo

GasInfo defines tx execution gas context.

| Name       | Type            | Description                                                         | Required |
| ---------- | --------------- | ------------------------------------------------------------------- | -------- |
| gas_wanted | string (uint64) | GasWanted is the maximum units of work we allow this tx to perform. | No       |
| gas_used   | string (uint64) | GasUsed is the amount of gas actually consumed.                     | No       |

#### cosmos.base.abci.v1beta1.Result

Result is the union of ResponseFormat and ResponseCheckTx.

| Name          | Type                                                | Description                                                                                                                                                                                                                                                                       | Required |
| ------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| data          | byte                                                | Data is any data returned from message or handler execution. It MUST be length prefixed in order to separate data from multiple message executions. Deprecated. This field is still populated, but prefer msg_response instead because it also contains the Msg response typeURL. | No       |
| log           | string                                              | Log contains the log information from message or handler execution.                                                                                                                                                                                                               | No       |
| events        | [ [tendermint.abci.Event](#tendermint.abci.Event) ] | Events contains a slice of Event objects that were emitted during message or handler execution.                                                                                                                                                                                   | No       |
| msg_responses | [ [google.protobuf.Any](#google.protobuf.Any) ]     | msg_responses contains the Msg handler responses type packed in Anys.  Since: cosmos-sdk 0.46                                                                                                                                                                                     | No       |

#### cosmos.base.abci.v1beta1.StringEvent

StringEvent defines en Event object wrapper where all the attributes
contain key/value pairs that are strings instead of raw bytes.

| Name       | Type                                                                          | Description | Required |
| ---------- | ----------------------------------------------------------------------------- | ----------- | -------- |
| type       | string                                                                        |             | No       |
| attributes | [ [cosmos.base.abci.v1beta1.Attribute](#cosmos.base.abci.v1beta1.Attribute) ] |             | No       |

#### cosmos.base.abci.v1beta1.TxResponse

TxResponse defines a structure containing relevant tx data and metadata. The
tags are stringified and the log is JSON decoded.

| Name       | Type                                                                                    | Description                                                                                                                                                                                                                                                                                                               | Required |
| ---------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| height     | string (int64)                                                                          |                                                                                                                                                                                                                                                                                                                           | No       |
| txhash     | string                                                                                  | The transaction hash.                                                                                                                                                                                                                                                                                                     | No       |
| codespace  | string                                                                                  |                                                                                                                                                                                                                                                                                                                           | No       |
| code       | long                                                                                    | Response code.                                                                                                                                                                                                                                                                                                            | No       |
| data       | string                                                                                  | Result bytes, if any.                                                                                                                                                                                                                                                                                                     | No       |
| raw_log    | string                                                                                  | The output of the application's logger (raw string). May be non-deterministic.                                                                                                                                                                                                                                            | No       |
| logs       | [ [cosmos.base.abci.v1beta1.ABCIMessageLog](#cosmos.base.abci.v1beta1.ABCIMessageLog) ] | The output of the application's logger (typed). May be non-deterministic.                                                                                                                                                                                                                                                 | No       |
| info       | string                                                                                  | Additional information. May be non-deterministic.                                                                                                                                                                                                                                                                         | No       |
| gas_wanted | string (int64)                                                                          | Amount of gas requested for transaction.                                                                                                                                                                                                                                                                                  | No       |
| gas_used   | string (int64)                                                                          | Amount of gas consumed by transaction.                                                                                                                                                                                                                                                                                    | No       |
| tx         | [google.protobuf.Any](#google.protobuf.Any)                                             | The request transaction bytes.                                                                                                                                                                                                                                                                                            | No       |
| timestamp  | string                                                                                  | Time of the previous block. For heights > 1, it's the weighted median of the timestamps of the valid votes in the block.LastCommit. For height == 1, it's genesis time.                                                                                                                                                   | No       |
| events     | [ [tendermint.abci.Event](#tendermint.abci.Event) ]                                     | Events defines all the events emitted by processing a transaction. Note, these events include those emitted by processing all the messages and those emitted from the ante. Whereas Logs contains the events, with additional metadata, emitted only by processing the messages.  Since: cosmos-sdk 0.42.11, 0.44.5, 0.45 | No       |

#### cosmos.crypto.multisig.v1beta1.CompactBitArray

CompactBitArray is an implementation of a space efficient bit array.
This is used to ensure that the encoded data takes up a minimal amount of
space after proto encoding.
This is not thread safe, and is not intended for concurrent usage.

| Name              | Type | Description | Required |
| ----------------- | ---- | ----------- | -------- |
| extra_bits_stored | long |             | No       |
| elems             | byte |             | No       |

#### cosmos.tx.signing.v1beta1.SignMode

SignMode represents a signing mode with its own security guarantees.

This enum should be considered a registry of all known sign modes
in the Cosmos ecosystem. Apps are not expected to support all known
sign modes. Apps that would like to support custom  sign modes are
encouraged to open a small PR against this file to add a new case
to this SignMode enum describing their sign mode so that different
apps have a consistent version of this enum.

- SIGN_MODE_UNSPECIFIED: SIGN_MODE_UNSPECIFIED specifies an unknown signing mode and will be
rejected.
- SIGN_MODE_DIRECT: SIGN_MODE_DIRECT specifies a signing mode which uses SignDoc and is
verified with raw bytes from Tx.
- SIGN_MODE_TEXTUAL: SIGN_MODE_TEXTUAL is a future signing mode that will verify some
human-readable textual representation on top of the binary representation
from SIGN_MODE_DIRECT. It is currently experimental, and should be used
for testing purposes only, until Textual is fully released. Please follow
the tracking issue <https://github.com/cosmos/cosmos-sdk/issues/11970>.
- SIGN_MODE_DIRECT_AUX: SIGN_MODE_DIRECT_AUX specifies a signing mode which uses
SignDocDirectAux. As opposed to SIGN_MODE_DIRECT, this sign mode does not
require signers signing over other signers' `signer_info`. It also allows
for adding Tips in transactions.

Since: cosmos-sdk 0.46

- SIGN_MODE_LEGACY_AMINO_JSON: SIGN_MODE_LEGACY_AMINO_JSON is a backwards compatibility mode which uses
Amino JSON and will be removed in the future.
- SIGN_MODE_EIP_191: SIGN_MODE_EIP_191 specifies the sign mode for EIP 191 signing on the Cosmos
SDK. Ref: <https://eips.ethereum.org/EIPS/eip-191>

Currently, SIGN_MODE_EIP_191 is registered as a SignMode enum variant,
but is not implemented on the SDK by default. To enable EIP-191, you need
to pass a custom `TxConfig` that has an implementation of
`SignModeHandler` for EIP-191. The SDK may decide to fully support
EIP-191 in the future.

Since: cosmos-sdk 0.45.2

| Name                               | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Required |
| ---------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| cosmos.tx.signing.v1beta1.SignMode | string | SignMode represents a signing mode with its own security guarantees.  This enum should be considered a registry of all known sign modes in the Cosmos ecosystem. Apps are not expected to support all known sign modes. Apps that would like to support custom  sign modes are encouraged to open a small PR against this file to add a new case to this SignMode enum describing their sign mode so that different apps have a consistent version of this enum.   - SIGN_MODE_UNSPECIFIED: SIGN_MODE_UNSPECIFIED specifies an unknown signing mode and will be rejected.  - SIGN_MODE_DIRECT: SIGN_MODE_DIRECT specifies a signing mode which uses SignDoc and is verified with raw bytes from Tx.  - SIGN_MODE_TEXTUAL: SIGN_MODE_TEXTUAL is a future signing mode that will verify some human-readable textual representation on top of the binary representation from SIGN_MODE_DIRECT. It is currently experimental, and should be used for testing purposes only, until Textual is fully released. Please follow the tracking issue <https://github.com/cosmos/cosmos-sdk/issues/11970>.  - SIGN_MODE_DIRECT_AUX: SIGN_MODE_DIRECT_AUX specifies a signing mode which uses SignDocDirectAux. As opposed to SIGN_MODE_DIRECT, this sign mode does not require signers signing over other signers' `signer_info`. It also allows for adding Tips in transactions.  Since: cosmos-sdk 0.46  - SIGN_MODE_LEGACY_AMINO_JSON: SIGN_MODE_LEGACY_AMINO_JSON is a backwards compatibility mode which uses Amino JSON and will be removed in the future.  - SIGN_MODE_EIP_191: SIGN_MODE_EIP_191 specifies the sign mode for EIP 191 signing on the Cosmos SDK. Ref: <https://eips.ethereum.org/EIPS/eip-191>  Currently, SIGN_MODE_EIP_191 is registered as a SignMode enum variant, but is not implemented on the SDK by default. To enable EIP-191, you need to pass a custom `TxConfig` that has an implementation of `SignModeHandler` for EIP-191. The SDK may decide to fully support EIP-191 in the future.  Since: cosmos-sdk 0.45.2 |          |

#### cosmos.tx.v1beta1.AuthInfo

AuthInfo describes the fee and signer modes that are used to sign a
transaction.

| Name         | Type                                                              | Description                                                                                                                                                                                                                                                                        | Required |
| ------------ | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| signer_infos | [ [cosmos.tx.v1beta1.SignerInfo](#cosmos.tx.v1beta1.SignerInfo) ] | signer_infos defines the signing modes for the required signers. The number and order of elements must match the required signers from TxBody's messages. The first element is the primary signer and the one which pays the fee.                                                  | No       |
| fee          | [cosmos.tx.v1beta1.Fee](#cosmos.tx.v1beta1.Fee)                   | Fee is the fee and gas limit for the transaction. The first signer is the primary signer and the one which pays the fee. The fee can be calculated based on the cost of evaluating the body and doing signature verification of the signers. This can be estimated via simulation. | No       |
| tip          | [cosmos.tx.v1beta1.Tip](#cosmos.tx.v1beta1.Tip)                   | Tip is the optional tip used for transactions fees paid in another denom.  This field is ignored if the chain didn't enable tips, i.e. didn't add the `TipDecorator` in its posthandler.  Since: cosmos-sdk 0.46                                                                   | No       |

#### cosmos.tx.v1beta1.BroadcastMode

BroadcastMode specifies the broadcast mode for the TxService.Broadcast RPC
method.

- BROADCAST_MODE_UNSPECIFIED: zero-value for mode ordering
- BROADCAST_MODE_BLOCK: DEPRECATED: use BROADCAST_MODE_SYNC instead,
BROADCAST_MODE_BLOCK is not supported by the SDK from v0.47.x onwards.
- BROADCAST_MODE_SYNC: BROADCAST_MODE_SYNC defines a tx broadcasting mode where the client waits
for a CheckTx execution response only.
- BROADCAST_MODE_ASYNC: BROADCAST_MODE_ASYNC defines a tx broadcasting mode where the client
returns immediately.

| Name                            | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Required |
| ------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| cosmos.tx.v1beta1.BroadcastMode | string | BroadcastMode specifies the broadcast mode for the TxService.Broadcast RPC method.   - BROADCAST_MODE_UNSPECIFIED: zero-value for mode ordering  - BROADCAST_MODE_BLOCK: DEPRECATED: use BROADCAST_MODE_SYNC instead, BROADCAST_MODE_BLOCK is not supported by the SDK from v0.47.x onwards.  - BROADCAST_MODE_SYNC: BROADCAST_MODE_SYNC defines a tx broadcasting mode where the client waits for a CheckTx execution response only.  - BROADCAST_MODE_ASYNC: BROADCAST_MODE_ASYNC defines a tx broadcasting mode where the client returns immediately. |          |

#### cosmos.tx.v1beta1.BroadcastTxRequest

BroadcastTxRequest is the request type for the Service.BroadcastTxRequest
RPC method.

| Name     | Type                                                                | Description                      | Required |
| -------- | ------------------------------------------------------------------- | -------------------------------- | -------- |
| tx_bytes | byte                                                                | tx_bytes is the raw transaction. | No       |
| mode     | [cosmos.tx.v1beta1.BroadcastMode](#cosmos.tx.v1beta1.BroadcastMode) |                                  | No       |

#### cosmos.tx.v1beta1.BroadcastTxResponse

BroadcastTxResponse is the response type for the
Service.BroadcastTx method.

| Name        | Type                                                                        | Description                             | Required |
| ----------- | --------------------------------------------------------------------------- | --------------------------------------- | -------- |
| tx_response | [cosmos.base.abci.v1beta1.TxResponse](#cosmos.base.abci.v1beta1.TxResponse) | tx_response is the queried TxResponses. | No       |

#### cosmos.tx.v1beta1.Fee

Fee includes the amount of coins paid in fees and the maximum
gas to be used by the transaction. The ratio yields an effective "gasprice",
which must be above some miminum to be accepted into the mempool.

| Name      | Type                                                      | Description                                                                                                                                                                                                                                                                             | Required |
| --------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| amount    | [ [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) ] |                                                                                                                                                                                                                                                                                         | No       |
| gas_limit | string (uint64)                                           |                                                                                                                                                                                                                                                                                         | No       |
| payer     | string                                                    | if unset, the first signer is responsible for paying the fees. If set, the specified account must pay the fees. the payer must be a tx signer (and thus have signed this field in AuthInfo). setting this field does *not* change the ordering of required signers for the transaction. | No       |
| granter   | string                                                    |                                                                                                                                                                                                                                                                                         | No       |

#### cosmos.tx.v1beta1.GetBlockWithTxsResponse

GetBlockWithTxsResponse is the response type for the Service.GetBlockWithTxs
method.

Since: cosmos-sdk 0.45.2

| Name       | Type                                                                              | Description                                       | Required |
| ---------- | --------------------------------------------------------------------------------- | ------------------------------------------------- | -------- |
| txs        | [ [cosmos.tx.v1beta1.Tx](#cosmos.tx.v1beta1.Tx) ]                                 | txs are the transactions in the block.            | No       |
| block_id   | [tendermint.types.BlockID](#tendermint.types.BlockID)                             |                                                   | No       |
| block      | [tendermint.types.Block](#tendermint.types.Block)                                 |                                                   | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines a pagination for the response. | No       |

#### cosmos.tx.v1beta1.GetTxResponse

GetTxResponse is the response type for the Service.GetTx method.

| Name        | Type                                                                        | Description                             | Required |
| ----------- | --------------------------------------------------------------------------- | --------------------------------------- | -------- |
| tx          | [cosmos.tx.v1beta1.Tx](#cosmos.tx.v1beta1.Tx)                               | tx is the queried transaction.          | No       |
| tx_response | [cosmos.base.abci.v1beta1.TxResponse](#cosmos.base.abci.v1beta1.TxResponse) | tx_response is the queried TxResponses. | No       |

#### cosmos.tx.v1beta1.GetTxsEventResponse

GetTxsEventResponse is the response type for the Service.TxsByEvents
RPC method.

| Name         | Type                                                                              | Description                                                                                   | Required |
| ------------ | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | -------- |
| txs          | [ [cosmos.tx.v1beta1.Tx](#cosmos.tx.v1beta1.Tx) ]                                 | txs is the list of queried transactions.                                                      | No       |
| tx_responses | [ [cosmos.base.abci.v1beta1.TxResponse](#cosmos.base.abci.v1beta1.TxResponse) ]   | tx_responses is the list of queried TxResponses.                                              | No       |
| pagination   | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines a pagination for the response. Deprecated post v0.46.x: use total instead. | No       |
| total        | string (uint64)                                                                   |                                                                                               | No       |

#### cosmos.tx.v1beta1.ModeInfo

ModeInfo describes the signing mode of a single or nested multisig signer.

| Name   | Type                                                                    | Description | Required |
| ------ | ----------------------------------------------------------------------- | ----------- | -------- |
| single | [cosmos.tx.v1beta1.ModeInfo.Single](#cosmos.tx.v1beta1.ModeInfo.Single) |             | No       |
| multi  | [cosmos.tx.v1beta1.ModeInfo.Multi](#cosmos.tx.v1beta1.ModeInfo.Multi)   |             | No       |

#### cosmos.tx.v1beta1.ModeInfo.Multi

| Name       | Type                                                                                              | Description | Required |
| ---------- | ------------------------------------------------------------------------------------------------- | ----------- | -------- |
| bitarray   | [cosmos.crypto.multisig.v1beta1.CompactBitArray](#cosmos.crypto.multisig.v1beta1.CompactBitArray) |             | No       |
| mode_infos | [ [cosmos.tx.v1beta1.ModeInfo](#cosmos.tx.v1beta1.ModeInfo) ]                                     |             | No       |

#### cosmos.tx.v1beta1.ModeInfo.Single

| Name | Type                                                                      | Description | Required |
| ---- | ------------------------------------------------------------------------- | ----------- | -------- |
| mode | [cosmos.tx.signing.v1beta1.SignMode](#cosmos.tx.signing.v1beta1.SignMode) |             | No       |

#### cosmos.tx.v1beta1.OrderBy

- ORDER_BY_UNSPECIFIED: ORDER_BY_UNSPECIFIED specifies an unknown sorting order. OrderBy defaults
to ASC in this case.
- ORDER_BY_ASC: ORDER_BY_ASC defines ascending order
- ORDER_BY_DESC: ORDER_BY_DESC defines descending order

| Name                      | Type   | Description                                                                                                                                                                                                                           | Required |
| ------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| cosmos.tx.v1beta1.OrderBy | string | - ORDER_BY_UNSPECIFIED: ORDER_BY_UNSPECIFIED specifies an unknown sorting order. OrderBy defaults to ASC in this case.  - ORDER_BY_ASC: ORDER_BY_ASC defines ascending order  - ORDER_BY_DESC: ORDER_BY_DESC defines descending order |          |

#### cosmos.tx.v1beta1.SignerInfo

SignerInfo describes the public key and signing mode of a single top-level
signer.

| Name       | Type                                                      | Description                                                                                                                                                                                                    | Required |
| ---------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| public_key | [google.protobuf.Any](#google.protobuf.Any)               | public_key is the public key of the signer. It is optional for accounts that already exist in state. If unset, the verifier can use the required \ signer address for this position and lookup the public key. | No       |
| mode_info  | [cosmos.tx.v1beta1.ModeInfo](#cosmos.tx.v1beta1.ModeInfo) |                                                                                                                                                                                                                | No       |
| sequence   | string (uint64)                                           | sequence is the sequence of the account, which describes the number of committed transactions signed by a given address. It is used to prevent replay attacks.                                                 | No       |

#### cosmos.tx.v1beta1.SimulateRequest

SimulateRequest is the request type for the Service.Simulate
RPC method.

| Name     | Type                                          | Description                                                               | Required |
| -------- | --------------------------------------------- | ------------------------------------------------------------------------- | -------- |
| tx       | [cosmos.tx.v1beta1.Tx](#cosmos.tx.v1beta1.Tx) | tx is the transaction to simulate. Deprecated. Send raw tx bytes instead. | No       |
| tx_bytes | byte                                          | tx_bytes is the raw transaction.  Since: cosmos-sdk 0.43                  | No       |

#### cosmos.tx.v1beta1.SimulateResponse

SimulateResponse is the response type for the
Service.SimulateRPC method.

| Name     | Type                                                                  | Description                                                   | Required |
| -------- | --------------------------------------------------------------------- | ------------------------------------------------------------- | -------- |
| gas_info | [cosmos.base.abci.v1beta1.GasInfo](#cosmos.base.abci.v1beta1.GasInfo) | gas_info is the information about gas used in the simulation. | No       |
| result   | [cosmos.base.abci.v1beta1.Result](#cosmos.base.abci.v1beta1.Result)   | result is the result of the simulation.                       | No       |

#### cosmos.tx.v1beta1.Tip

Tip is the tip used for meta-transactions.

Since: cosmos-sdk 0.46

| Name   | Type                                                      | Description | Required |
| ------ | --------------------------------------------------------- | ----------- | -------- |
| amount | [ [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) ] |             | No       |
| tipper | string                                                    |             | No       |

#### cosmos.tx.v1beta1.Tx

Tx is the standard type used for broadcasting transactions.

| Name       | Type                                                      | Description                                                                                                                                                                                  | Required |
| ---------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| body       | [cosmos.tx.v1beta1.TxBody](#cosmos.tx.v1beta1.TxBody)     |                                                                                                                                                                                              | No       |
| auth_info  | [cosmos.tx.v1beta1.AuthInfo](#cosmos.tx.v1beta1.AuthInfo) |                                                                                                                                                                                              | No       |
| signatures | [ byte ]                                                  | signatures is a list of signatures that matches the length and order of AuthInfo's signer_infos to allow connecting signature meta information like public key and signing mode by position. | No       |

#### cosmos.tx.v1beta1.TxBody

TxBody is the body of a transaction that all signers sign over.

| Name                           | Type                                            | Description                                                                                                                                                                                                                                                                                                                                                                                                               | Required |
| ------------------------------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| messages                       | [ [google.protobuf.Any](#google.protobuf.Any) ] | messages is a list of messages to be executed. The required signers of those messages define the number and order of elements in AuthInfo's signer_infos and Tx's signatures. Each required signer address is added to the list only the first time it occurs. By convention, the first required signer (usually from the first message) is referred to as the primary signer and pays the fee for the whole transaction. | No       |
| memo                           | string                                          | memo is any arbitrary note/comment to be added to the transaction. WARNING: in clients, any publicly exposed text should not be called memo, but should be called `note` instead (see <https://github.com/cosmos/cosmos-sdk/issues/9122>).                                                                                                                                                                                  | No       |
| timeout_height                 | string (uint64)                                 |                                                                                                                                                                                                                                                                                                                                                                                                                           | No       |
| extension_options              | [ [google.protobuf.Any](#google.protobuf.Any) ] |                                                                                                                                                                                                                                                                                                                                                                                                                           | No       |
| non_critical_extension_options | [ [google.protobuf.Any](#google.protobuf.Any) ] |                                                                                                                                                                                                                                                                                                                                                                                                                           | No       |

#### cosmos.tx.v1beta1.TxDecodeAminoRequest

TxDecodeAminoRequest is the request type for the Service.TxDecodeAmino
RPC method.

Since: cosmos-sdk 0.47

| Name         | Type | Description | Required |
| ------------ | ---- | ----------- | -------- |
| amino_binary | byte |             | No       |

#### cosmos.tx.v1beta1.TxDecodeAminoResponse

TxDecodeAminoResponse is the response type for the Service.TxDecodeAmino
RPC method.

Since: cosmos-sdk 0.47

| Name       | Type   | Description | Required |
| ---------- | ------ | ----------- | -------- |
| amino_json | string |             | No       |

#### cosmos.tx.v1beta1.TxDecodeRequest

TxDecodeRequest is the request type for the Service.TxDecode
RPC method.

Since: cosmos-sdk 0.47

| Name     | Type | Description                      | Required |
| -------- | ---- | -------------------------------- | -------- |
| tx_bytes | byte | tx_bytes is the raw transaction. | No       |

#### cosmos.tx.v1beta1.TxDecodeResponse

TxDecodeResponse is the response type for the
Service.TxDecode method.

Since: cosmos-sdk 0.47

| Name | Type                                          | Description                    | Required |
| ---- | --------------------------------------------- | ------------------------------ | -------- |
| tx   | [cosmos.tx.v1beta1.Tx](#cosmos.tx.v1beta1.Tx) | tx is the decoded transaction. | No       |

#### cosmos.tx.v1beta1.TxEncodeAminoRequest

TxEncodeAminoRequest is the request type for the Service.TxEncodeAmino
RPC method.

Since: cosmos-sdk 0.47

| Name       | Type   | Description | Required |
| ---------- | ------ | ----------- | -------- |
| amino_json | string |             | No       |

#### cosmos.tx.v1beta1.TxEncodeAminoResponse

TxEncodeAminoResponse is the response type for the Service.TxEncodeAmino
RPC method.

Since: cosmos-sdk 0.47

| Name         | Type | Description | Required |
| ------------ | ---- | ----------- | -------- |
| amino_binary | byte |             | No       |

#### cosmos.tx.v1beta1.TxEncodeRequest

TxEncodeRequest is the request type for the Service.TxEncode
RPC method.

Since: cosmos-sdk 0.47

| Name | Type                                          | Description                      | Required |
| ---- | --------------------------------------------- | -------------------------------- | -------- |
| tx   | [cosmos.tx.v1beta1.Tx](#cosmos.tx.v1beta1.Tx) | tx is the transaction to encode. | No       |

#### cosmos.tx.v1beta1.TxEncodeResponse

TxEncodeResponse is the response type for the
Service.TxEncode method.

Since: cosmos-sdk 0.47

| Name     | Type | Description                                | Required |
| -------- | ---- | ------------------------------------------ | -------- |
| tx_bytes | byte | tx_bytes is the encoded transaction bytes. | No       |

#### tendermint.abci.Event

Event allows application developers to attach additional information to
ResponseFinalizeBlock and ResponseCheckTx.
Later, transactions may be queried using these events.

| Name       | Type                                                                  | Description | Required |
| ---------- | --------------------------------------------------------------------- | ----------- | -------- |
| type       | string                                                                |             | No       |
| attributes | [ [tendermint.abci.EventAttribute](#tendermint.abci.EventAttribute) ] |             | No       |

#### tendermint.abci.EventAttribute

EventAttribute is a single key-value pair, associated with an event.

| Name  | Type    | Description | Required |
| ----- | ------- | ----------- | -------- |
| key   | string  |             | No       |
| value | string  |             | No       |
| index | boolean |             | No       |

#### cosmos.upgrade.v1beta1.ModuleVersion

ModuleVersion specifies a module and its consensus version.

Since: cosmos-sdk 0.43

| Name    | Type            | Description | Required |
| ------- | --------------- | ----------- | -------- |
| name    | string          |             | No       |
| version | string (uint64) |             | No       |

#### cosmos.upgrade.v1beta1.Plan

Plan specifies information about a planned upgrade and when it should occur.

| Name                  | Type                                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Required |
| --------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| name                  | string                                      | Sets the name for the upgrade. This name will be used by the upgraded version of the software to apply any special "on-upgrade" commands during the first BeginBlock method after the upgrade is applied. It is also used to detect whether a software version can handle a given upgrade. If no upgrade handler with this name has been set in the software, it will be assumed that the software is out-of-date when the upgrade Time or Height is reached and the software will exit. | No       |
| time                  | dateTime                                    | Deprecated: Time based upgrades have been deprecated. Time based upgrade logic has been removed from the SDK. If this field is not empty, an error will be thrown.                                                                                                                                                                                                                                                                                                                       | No       |
| height                | string (int64)                              | The height at which the upgrade must be performed.                                                                                                                                                                                                                                                                                                                                                                                                                                       | No       |
| info                  | string                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | No       |
| upgraded_client_state | [google.protobuf.Any](#google.protobuf.Any) | Deprecated: UpgradedClientState field has been deprecated. IBC upgrade logic has been moved to the IBC module in the sub module 02-client. If this field is not empty, an error will be thrown.                                                                                                                                                                                                                                                                                          | No       |

#### cosmos.upgrade.v1beta1.QueryAppliedPlanResponse

QueryAppliedPlanResponse is the response type for the Query/AppliedPlan RPC
method.

| Name   | Type           | Description                                               | Required |
| ------ | -------------- | --------------------------------------------------------- | -------- |
| height | string (int64) | height is the block height at which the plan was applied. | No       |

#### cosmos.upgrade.v1beta1.QueryAuthorityResponse

Since: cosmos-sdk 0.46

| Name    | Type   | Description | Required |
| ------- | ------ | ----------- | -------- |
| address | string |             | No       |

#### cosmos.upgrade.v1beta1.QueryCurrentPlanResponse

QueryCurrentPlanResponse is the response type for the Query/CurrentPlan RPC
method.

| Name | Type                                                        | Description                       | Required |
| ---- | ----------------------------------------------------------- | --------------------------------- | -------- |
| plan | [cosmos.upgrade.v1beta1.Plan](#cosmos.upgrade.v1beta1.Plan) | plan is the current upgrade plan. | No       |

#### cosmos.upgrade.v1beta1.QueryModuleVersionsResponse

QueryModuleVersionsResponse is the response type for the Query/ModuleVersions
RPC method.

Since: cosmos-sdk 0.43

| Name            | Type                                                                              | Description                                                              | Required |
| --------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | -------- |
| module_versions | [ [cosmos.upgrade.v1beta1.ModuleVersion](#cosmos.upgrade.v1beta1.ModuleVersion) ] | module_versions is a list of module names with their consensus versions. | No       |

#### cosmos.upgrade.v1beta1.QueryUpgradedConsensusStateResponse

QueryUpgradedConsensusStateResponse is the response type for the Query/UpgradedConsensusState
RPC method.

| Name                     | Type | Description | Required |
| ------------------------ | ---- | ----------- | -------- |
| upgraded_consensus_state | byte |             | No       |

#### ethermint.evm.v1.ChainConfig

ChainConfig defines the Ethereum ChainConfig parameters using *sdk.Int values
instead of*big.Int.

| Name                 | Type    | Description | Required |
| -------------------- | ------- | ----------- | -------- |
| homestead_block      | string  |             | No       |
| dao_fork_block       | string  |             | No       |
| dao_fork_support     | boolean |             | No       |
| eip150_block         | string  |             | No       |
| eip150_hash          | string  |             | No       |
| eip155_block         | string  |             | No       |
| eip158_block         | string  |             | No       |
| byzantium_block      | string  |             | No       |
| constantinople_block | string  |             | No       |
| petersburg_block     | string  |             | No       |
| istanbul_block       | string  |             | No       |
| muir_glacier_block   | string  |             | No       |
| berlin_block         | string  |             | No       |
| london_block         | string  |             | No       |
| arrow_glacier_block  | string  |             | No       |
| gray_glacier_block   | string  |             | No       |
| merge_netsplit_block | string  |             | No       |
| shanghai_block       | string  |             | No       |
| cancun_block         | string  |             | No       |

#### ethermint.evm.v1.EstimateGasResponse

| Name | Type            | Description | Required |
| ---- | --------------- | ----------- | -------- |
| gas  | string (uint64) |             | No       |

#### ethermint.evm.v1.Log

Log represents an protobuf compatible Ethereum Log that defines a contract
log event. These events are generated by the LOG opcode and stored/indexed by
the node.

NOTE: address, topics and data are consensus fields. The rest of the fields
are derived, i.e. filled in by the nodes, but not secured by consensus.

| Name         | Type            | Description                                                                                                                                              | Required |
| ------------ | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| address      | string          |                                                                                                                                                          | No       |
| topics       | [ string ]      | topics is a list of topics provided by the contract.                                                                                                     | No       |
| data         | byte            |                                                                                                                                                          | No       |
| block_number | string (uint64) |                                                                                                                                                          | No       |
| tx_hash      | string          |                                                                                                                                                          | No       |
| tx_index     | string (uint64) |                                                                                                                                                          | No       |
| block_hash   | string          |                                                                                                                                                          | No       |
| index        | string (uint64) |                                                                                                                                                          | No       |
| removed      | boolean         | removed is true if this log was reverted due to a chain reorganisation. You must pay attention to this field if you receive logs through a filter query. | No       |

#### ethermint.evm.v1.MsgEthereumTx

MsgEthereumTx encapsulates an Ethereum transaction as an SDK message.

| Name | Type                                        | Description | Required |
| ---- | ------------------------------------------- | ----------- | -------- |
| data | [google.protobuf.Any](#google.protobuf.Any) |             | No       |
| size | double                                      |             | No       |
| hash | string                                      |             | No       |
| from | string                                      |             | No       |

#### ethermint.evm.v1.MsgEthereumTxResponse

MsgEthereumTxResponse defines the Msg/EthereumTx response type.

| Name     | Type                                              | Description                                                                | Required |
| -------- | ------------------------------------------------- | -------------------------------------------------------------------------- | -------- |
| hash     | string                                            |                                                                            | No       |
| logs     | [ [ethermint.evm.v1.Log](#ethermint.evm.v1.Log) ] | logs contains the transaction hash and the proto-compatible ethereum logs. | No       |
| ret      | byte                                              |                                                                            | No       |
| vm_error | string                                            |                                                                            | No       |
| gas_used | string (uint64)                                   |                                                                            | No       |

#### ethermint.evm.v1.Params

| Name                  | Type                                                          | Description                                                                                                                  | Required |
| --------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------- |
| evm_denom             | string                                                        | evm_denom represents the token denomination used to run the EVM state transitions.                                           | No       |
| enable_create         | boolean                                                       |                                                                                                                              | No       |
| enable_call           | boolean                                                       |                                                                                                                              | No       |
| extra_eips            | [ string (int64) ]                                            |                                                                                                                              | No       |
| chain_config          | [ethermint.evm.v1.ChainConfig](#ethermint.evm.v1.ChainConfig) |                                                                                                                              | No       |
| allow_unprotected_txs | boolean                                                       | allow_unprotected_txs defines if replay-protected (i.e non EIP155 signed) transactions can be executed on the state machine. | No       |
| active_precompiles    | [ string ]                                                    |                                                                                                                              | No       |

#### ethermint.evm.v1.QueryAccountResponse

QueryAccountResponse is the response type for the Query/Account RPC method.

| Name      | Type            | Description                                             | Required |
| --------- | --------------- | ------------------------------------------------------- | -------- |
| balance   | string          | balance is the balance of the EVM denomination.         | No       |
| code_hash | string          | code_hash is the hex-formatted code bytes from the EOA. | No       |
| nonce     | string (uint64) | nonce is the account's sequence number.                 | No       |

#### ethermint.evm.v1.QueryBalanceResponse

QueryBalanceResponse is the response type for the Query/Balance RPC method.

| Name    | Type   | Description                                     | Required |
| ------- | ------ | ----------------------------------------------- | -------- |
| balance | string | balance is the balance of the EVM denomination. | No       |

#### ethermint.evm.v1.QueryBaseFeeResponse

QueryBaseFeeResponse returns the EIP1559 base fee.

| Name     | Type   | Description | Required |
| -------- | ------ | ----------- | -------- |
| base_fee | string |             | No       |

#### ethermint.evm.v1.QueryCodeResponse

QueryCodeResponse is the response type for the Query/Code RPC
method.

| Name | Type | Description                                              | Required |
| ---- | ---- | -------------------------------------------------------- | -------- |
| code | byte | code represents the code bytes from an ethereum address. | No       |

#### ethermint.evm.v1.QueryCosmosAccountResponse

QueryCosmosAccountResponse is the response type for the Query/CosmosAccount
RPC method.

| Name           | Type            | Description                                          | Required |
| -------------- | --------------- | ---------------------------------------------------- | -------- |
| cosmos_address | string          | cosmos_address is the cosmos address of the account. | No       |
| sequence       | string (uint64) | sequence is the account's sequence number.           | No       |
| account_number | string (uint64) |                                                      | No       |

#### ethermint.evm.v1.QueryParamsResponse

QueryParamsResponse defines the response type for querying x/evm parameters.

| Name   | Type                                                | Description                              | Required |
| ------ | --------------------------------------------------- | ---------------------------------------- | -------- |
| params | [ethermint.evm.v1.Params](#ethermint.evm.v1.Params) | params define the evm module parameters. | No       |

#### ethermint.evm.v1.QueryStorageResponse

QueryStorageResponse is the response type for the Query/Storage RPC
method.

| Name  | Type   | Description                                                               | Required |
| ----- | ------ | ------------------------------------------------------------------------- | -------- |
| value | string | value defines the storage state value hash associated with the given key. | No       |

#### ethermint.evm.v1.QueryTraceBlockResponse

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | byte |             | No       |

#### ethermint.evm.v1.QueryTraceTxResponse

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | byte |             | No       |

#### ethermint.evm.v1.QueryValidatorAccountResponse

QueryValidatorAccountResponse is the response type for the
Query/ValidatorAccount RPC method.

| Name            | Type            | Description                                                            | Required |
| --------------- | --------------- | ---------------------------------------------------------------------- | -------- |
| account_address | string          | account_address is the cosmos address of the account in bech32 format. | No       |
| sequence        | string (uint64) | sequence is the account's sequence number.                             | No       |
| account_number  | string (uint64) |                                                                        | No       |

#### ethermint.evm.v1.TraceConfig

TraceConfig holds extra parameters to trace functions.

| Name               | Type                                                          | Description | Required |
| ------------------ | ------------------------------------------------------------- | ----------- | -------- |
| tracer             | string                                                        |             | No       |
| timeout            | string                                                        |             | No       |
| reexec             | string (uint64)                                               |             | No       |
| disable_stack      | boolean                                                       |             | No       |
| disable_storage    | boolean                                                       |             | No       |
| debug              | boolean                                                       |             | No       |
| limit              | integer                                                       |             | No       |
| overrides          | [ethermint.evm.v1.ChainConfig](#ethermint.evm.v1.ChainConfig) |             | No       |
| enable_memory      | boolean                                                       |             | No       |
| enable_return_data | boolean                                                       |             | No       |
| tracer_json_config | string                                                        |             | No       |

#### ethermint.feemarket.v1.Params

| Name                        | Type           | Description                                                                           | Required |
| --------------------------- | -------------- | ------------------------------------------------------------------------------------- | -------- |
| no_base_fee                 | boolean        |                                                                                       | No       |
| base_fee_change_denominator | long           | base_fee_change_denominator bounds the amount the base fee can change between blocks. | No       |
| elasticity_multiplier       | long           | elasticity_multiplier bounds the maximum gas limit an EIP-1559 block may have.        | No       |
| enable_height               | string (int64) | enable_height defines at which block height the base fee calculation is enabled.      | No       |
| base_fee                    | string         | base_fee for EIP-1559 blocks.                                                         | No       |
| min_gas_price               | string         |                                                                                       | No       |
| min_gas_multiplier          | string         |                                                                                       | No       |

#### ethermint.feemarket.v1.QueryBaseFeeResponse

QueryBaseFeeResponse returns the EIP1559 base fee.

| Name     | Type   | Description | Required |
| -------- | ------ | ----------- | -------- |
| base_fee | string |             | No       |

#### ethermint.feemarket.v1.QueryBlockGasResponse

QueryBlockGasResponse returns block gas used for a given height.

| Name | Type           | Description | Required |
| ---- | -------------- | ----------- | -------- |
| gas  | string (int64) |             | No       |

#### ethermint.feemarket.v1.QueryParamsResponse

QueryParamsResponse defines the response type for querying x/evm parameters.

| Name   | Type                                                            | Description                              | Required |
| ------ | --------------------------------------------------------------- | ---------------------------------------- | -------- |
| params | [ethermint.feemarket.v1.Params](#ethermint.feemarket.v1.Params) | params define the evm module parameters. | No       |

#### evmos.claims.v1.Action

Action defines the list of available actions to claim the airdrop tokens.

- ACTION_UNSPECIFIED: ACTION_UNSPECIFIED defines an invalid action.
- ACTION_VOTE: ACTION_VOTE defines a proposal vote.
- ACTION_DELEGATE: ACTION_DELEGATE defines an staking delegation.
- ACTION_EVM: ACTION_EVM defines an EVM transaction.
- ACTION_IBC_TRANSFER: ACTION_IBC_TRANSFER defines a fungible token transfer transaction via IBC.

| Name                   | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                      | Required |
| ---------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| evmos.claims.v1.Action | string | Action defines the list of available actions to claim the airdrop tokens.   - ACTION_UNSPECIFIED: ACTION_UNSPECIFIED defines an invalid action.  - ACTION_VOTE: ACTION_VOTE defines a proposal vote.  - ACTION_DELEGATE: ACTION_DELEGATE defines an staking delegation.  - ACTION_EVM: ACTION_EVM defines an EVM transaction.  - ACTION_IBC_TRANSFER: ACTION_IBC_TRANSFER defines a fungible token transfer transaction via IBC. |          |

#### evmos.claims.v1.Claim

Claim defines the action, completed flag and the remaining claimable amount
for a given user. This is only used during client queries.

| Name             | Type                                              | Description | Required |
| ---------------- | ------------------------------------------------- | ----------- | -------- |
| action           | [evmos.claims.v1.Action](#evmos.claims.v1.Action) |             | No       |
| completed        | boolean                                           |             | No       |
| claimable_amount | string                                            |             | No       |

#### evmos.claims.v1.ClaimsRecordAddress

ClaimsRecordAddress is the claims metadata per address that is used at
Genesis.

| Name                     | Type        | Description | Required |
| ------------------------ | ----------- | ----------- | -------- |
| address                  | string      |             | No       |
| initial_claimable_amount | string      |             | No       |
| actions_completed        | [ boolean ] |             | No       |

#### evmos.claims.v1.Params

Params defines the claims module's parameters.

| Name                 | Type       | Description                                                                                                      | Required |
| -------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------- | -------- |
| enable_claims        | boolean    |                                                                                                                  | No       |
| airdrop_start_time   | dateTime   |                                                                                                                  | No       |
| duration_until_decay | string     |                                                                                                                  | No       |
| duration_of_decay    | string     |                                                                                                                  | No       |
| claims_denom         | string     |                                                                                                                  | No       |
| authorized_channels  | [ string ] | authorized_channels is the list of authorized channel identifiers that can perform address attestations via IBC. | No       |
| evm_channels         | [ string ] |                                                                                                                  | No       |

#### evmos.claims.v1.QueryClaimsRecordResponse

QueryClaimsRecordResponse is the response type for the Query/ClaimsRecord RPC
method.

| Name                     | Type                                                | Description | Required |
| ------------------------ | --------------------------------------------------- | ----------- | -------- |
| initial_claimable_amount | string                                              |             | No       |
| claims                   | [ [evmos.claims.v1.Claim](#evmos.claims.v1.Claim) ] |             | No       |

#### evmos.claims.v1.QueryClaimsRecordsResponse

QueryClaimsRecordsResponse is the response type for the Query/ClaimsRecords
RPC method.

| Name       | Type                                                                              | Description                                        | Required |
| ---------- | --------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| claims     | [ [evmos.claims.v1.ClaimsRecordAddress](#evmos.claims.v1.ClaimsRecordAddress) ]   |                                                    | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response. | No       |

#### evmos.claims.v1.QueryParamsResponse

QueryParamsResponse is the response type for the Query/Params RPC method.

| Name   | Type                                              | Description                                  | Required |
| ------ | ------------------------------------------------- | -------------------------------------------- | -------- |
| params | [evmos.claims.v1.Params](#evmos.claims.v1.Params) | params defines the parameters of the module. | No       |

#### evmos.claims.v1.QueryTotalUnclaimedResponse

QueryTotalUnclaimedResponse is the response type for the Query/TotalUnclaimed
RPC method.

| Name  | Type                                                      | Description | Required |
| ----- | --------------------------------------------------------- | ----------- | -------- |
| coins | [ [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) ] |             | No       |

#### evmos.epochs.v1.EpochInfo

EpochInfo defines the message interface containing the relevant informations about
an epoch.

| Name                       | Type           | Description | Required |
| -------------------------- | -------------- | ----------- | -------- |
| identifier                 | string         |             | No       |
| start_time                 | dateTime       |             | No       |
| duration                   | string         |             | No       |
| current_epoch              | string (int64) |             | No       |
| current_epoch_start_time   | dateTime       |             | No       |
| epoch_counting_started     | boolean        |             | No       |
| current_epoch_start_height | string (int64) |             | No       |

#### evmos.epochs.v1.QueryCurrentEpochResponse

QueryCurrentEpochResponse is the response type for the Query/EpochInfos RPC
method.

| Name          | Type           | Description | Required |
| ------------- | -------------- | ----------- | -------- |
| current_epoch | string (int64) |             | No       |

#### evmos.epochs.v1.QueryEpochsInfoResponse

QueryEpochsInfoResponse is the response type for the Query/EpochInfos RPC
method.

| Name       | Type                                                                              | Description                                                | Required |
| ---------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------- | -------- |
| epochs     | [ [evmos.epochs.v1.EpochInfo](#evmos.epochs.v1.EpochInfo) ]                       |                                                            | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines an optional pagination for the request. | No       |

#### evmos.erc20.v1.Owner

Owner enumerates the ownership of a ERC20 contract.

- OWNER_UNSPECIFIED: OWNER_UNSPECIFIED defines an invalid/undefined owner.
- OWNER_MODULE: OWNER_MODULE - erc20 is owned by the erc20 module account.
- OWNER_EXTERNAL: OWNER_EXTERNAL - erc20 is owned by an external account.

| Name                 | Type   | Description                                                                                                                                                                                                                                                                             | Required |
| -------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| evmos.erc20.v1.Owner | string | Owner enumerates the ownership of a ERC20 contract.   - OWNER_UNSPECIFIED: OWNER_UNSPECIFIED defines an invalid/undefined owner.  - OWNER_MODULE: OWNER_MODULE - erc20 is owned by the erc20 module account.  - OWNER_EXTERNAL: OWNER_EXTERNAL - erc20 is owned by an external account. |          |

#### evmos.erc20.v1.Params

| Name            | Type    | Description                                                                                                                                                                                     | Required |
| --------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| enable_erc20    | boolean | enable_erc20 is the parameter to enable the conversion of Cosmos coins <--> ERC20 tokens.                                                                                                       | No       |
| enable_evm_hook | boolean | enable_evm_hook is the parameter to enable the EVM hook that converts an ERC20 token to a Cosmos Coin by transferring the Tokens through a MsgEthereumTx to the ModuleAddress Ethereum address. | No       |

#### evmos.erc20.v1.QueryParamsResponse

QueryParamsResponse is the response type for the Query/Params RPC
method.

| Name   | Type                                            | Description | Required |
| ------ | ----------------------------------------------- | ----------- | -------- |
| params | [evmos.erc20.v1.Params](#evmos.erc20.v1.Params) |             | No       |

#### evmos.erc20.v1.QueryTokenPairResponse

QueryTokenPairResponse is the response type for the Query/TokenPair RPC
method.

| Name       | Type                                                  | Description | Required |
| ---------- | ----------------------------------------------------- | ----------- | -------- |
| token_pair | [evmos.erc20.v1.TokenPair](#evmos.erc20.v1.TokenPair) |             | No       |

#### evmos.erc20.v1.QueryTokenPairsResponse

QueryTokenPairsResponse is the response type for the Query/TokenPairs RPC
method.

| Name        | Type                                                                              | Description                                        | Required |
| ----------- | --------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| token_pairs | [ [evmos.erc20.v1.TokenPair](#evmos.erc20.v1.TokenPair) ]                         |                                                    | No       |
| pagination  | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response. | No       |

#### evmos.erc20.v1.TokenPair

TokenPair defines an instance that records a pairing consisting of a native
 Cosmos Coin and an ERC20 token address.

| Name           | Type                                          | Description | Required |
| -------------- | --------------------------------------------- | ----------- | -------- |
| erc20_address  | string                                        |             | No       |
| denom          | string                                        |             | No       |
| enabled        | boolean                                       |             | No       |
| contract_owner | [evmos.erc20.v1.Owner](#evmos.erc20.v1.Owner) |             | No       |

#### evmos.incentives.v1.GasMeter

| Name           | Type            | Description | Required |
| -------------- | --------------- | ----------- | -------- |
| contract       | string          |             | No       |
| participant    | string          |             | No       |
| cumulative_gas | string (uint64) |             | No       |

#### evmos.incentives.v1.Incentive

| Name        | Type                                                            | Description | Required |
| ----------- | --------------------------------------------------------------- | ----------- | -------- |
| contract    | string                                                          |             | No       |
| allocations | [ [cosmos.base.v1beta1.DecCoin](#cosmos.base.v1beta1.DecCoin) ] |             | No       |
| epochs      | long                                                            |             | No       |
| start_time  | dateTime                                                        |             | No       |
| total_gas   | string (uint64)                                                 |             | No       |

#### evmos.incentives.v1.Params

| Name                        | Type    | Description | Required |
| --------------------------- | ------- | ----------- | -------- |
| enable_incentives           | boolean |             | No       |
| allocation_limit            | string  |             | No       |
| incentives_epoch_identifier | string  |             | No       |
| reward_scaler               | string  |             | No       |

#### evmos.incentives.v1.QueryAllocationMeterResponse

QueryAllocationMeterResponse is the response type for the
Query/AllocationMeter RPC method.

| Name             | Type                                                        | Description | Required |
| ---------------- | ----------------------------------------------------------- | ----------- | -------- |
| allocation_meter | [cosmos.base.v1beta1.DecCoin](#cosmos.base.v1beta1.DecCoin) |             | No       |

#### evmos.incentives.v1.QueryAllocationMetersResponse

QueryAllocationMetersResponse is the response type for the
Query/AllocationMeters RPC method.

| Name              | Type                                                                              | Description                                        | Required |
| ----------------- | --------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| allocation_meters | [ [cosmos.base.v1beta1.DecCoin](#cosmos.base.v1beta1.DecCoin) ]                   |                                                    | No       |
| pagination        | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response. | No       |

#### evmos.incentives.v1.QueryGasMeterResponse

QueryGasMeterResponse is the response type for the Query/Incentive RPC
method.

| Name      | Type            | Description | Required |
| --------- | --------------- | ----------- | -------- |
| gas_meter | string (uint64) |             | No       |

#### evmos.incentives.v1.QueryGasMetersResponse

QueryGasMetersResponse is the response type for the Query/Incentives RPC
method.

| Name       | Type                                                                              | Description                                        | Required |
| ---------- | --------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| gas_meters | [ [evmos.incentives.v1.GasMeter](#evmos.incentives.v1.GasMeter) ]                 |                                                    | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response. | No       |

#### evmos.incentives.v1.QueryIncentiveResponse

QueryIncentiveResponse is the response type for the Query/Incentive RPC
method.

| Name      | Type                                                            | Description | Required |
| --------- | --------------------------------------------------------------- | ----------- | -------- |
| incentive | [evmos.incentives.v1.Incentive](#evmos.incentives.v1.Incentive) |             | No       |

#### evmos.incentives.v1.QueryIncentivesResponse

QueryIncentivesResponse is the response type for the Query/Incentives RPC
method.

| Name       | Type                                                                              | Description                                        | Required |
| ---------- | --------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| incentives | [ [evmos.incentives.v1.Incentive](#evmos.incentives.v1.Incentive) ]               |                                                    | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response. | No       |

#### evmos.incentives.v1.QueryParamsResponse

QueryParamsResponse is the response type for the Query/Params RPC
method.

| Name   | Type                                                      | Description | Required |
| ------ | --------------------------------------------------------- | ----------- | -------- |
| params | [evmos.incentives.v1.Params](#evmos.incentives.v1.Params) |             | No       |

#### evmos.inflation.v1.ExponentialCalculation

| Name           | Type   | Description | Required |
| -------------- | ------ | ----------- | -------- |
| a              | string |             | No       |
| r              | string |             | No       |
| c              | string |             | No       |
| bonding_target | string |             | No       |
| max_variance   | string |             | No       |

#### evmos.inflation.v1.InflationDistribution

| Name             | Type   | Description | Required |
| ---------------- | ------ | ----------- | -------- |
| staking_rewards  | string |             | No       |
| usage_incentives | string |             | No       |
| community_pool   | string |             | No       |

#### evmos.inflation.v1.Params

Params holds parameters for the inflation module.

| Name                    | Type                                                                                    | Description | Required |
| ----------------------- | --------------------------------------------------------------------------------------- | ----------- | -------- |
| mint_denom              | string                                                                                  |             | No       |
| exponential_calculation | [evmos.inflation.v1.ExponentialCalculation](#evmos.inflation.v1.ExponentialCalculation) |             | No       |
| inflation_distribution  | [evmos.inflation.v1.InflationDistribution](#evmos.inflation.v1.InflationDistribution)   |             | No       |
| enable_inflation        | boolean                                                                                 |             | No       |

#### evmos.inflation.v1.QueryCirculatingSupplyResponse

QueryCirculatingSupplyResponse is the response type for the
Query/CirculatingSupply RPC method.

| Name               | Type                                                        | Description | Required |
| ------------------ | ----------------------------------------------------------- | ----------- | -------- |
| circulating_supply | [cosmos.base.v1beta1.DecCoin](#cosmos.base.v1beta1.DecCoin) |             | No       |

#### evmos.inflation.v1.QueryEpochMintProvisionResponse

QueryEpochMintProvisionResponse is the response type for the
Query/EpochMintProvision RPC method.

| Name                 | Type                                                        | Description                                                            | Required |
| -------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------- | -------- |
| epoch_mint_provision | [cosmos.base.v1beta1.DecCoin](#cosmos.base.v1beta1.DecCoin) | epoch_mint_provision is the current minting per epoch provision value. | No       |

#### evmos.inflation.v1.QueryInflationRateResponse

QueryInflationRateResponse is the response type for the Query/InflationRate
RPC method.

| Name           | Type   | Description | Required |
| -------------- | ------ | ----------- | -------- |
| inflation_rate | string |             | No       |

#### evmos.inflation.v1.QueryParamsResponse

QueryParamsResponse is the response type for the Query/Params RPC method.

| Name   | Type                                                    | Description                                  | Required |
| ------ | ------------------------------------------------------- | -------------------------------------------- | -------- |
| params | [evmos.inflation.v1.Params](#evmos.inflation.v1.Params) | params defines the parameters of the module. | No       |

#### evmos.inflation.v1.QueryPeriodResponse

QueryPeriodResponse is the response type for the Query/Period RPC method.

| Name   | Type            | Description                                              | Required |
| ------ | --------------- | -------------------------------------------------------- | -------- |
| period | string (uint64) | period is the current minting per epoch provision value. | No       |

#### evmos.inflation.v1.QuerySkippedEpochsResponse

QuerySkippedEpochsResponse is the response type for the Query/SkippedEpochs
RPC method.

| Name           | Type            | Description                                                                         | Required |
| -------------- | --------------- | ----------------------------------------------------------------------------------- | -------- |
| skipped_epochs | string (uint64) | skipped_epochs is the number of epochs that the inflation module has been disabled. | No       |

#### evmos.recovery.v1.Params

| Name                    | Type    | Description | Required |
| ----------------------- | ------- | ----------- | -------- |
| enable_recovery         | boolean |             | No       |
| packet_timeout_duration | string  |             | No       |

#### evmos.recovery.v1.QueryParamsResponse

QueryParamsResponse is the response type for the Query/Params RPC method.

| Name   | Type                                                  | Description                                  | Required |
| ------ | ----------------------------------------------------- | -------------------------------------------- | -------- |
| params | [evmos.recovery.v1.Params](#evmos.recovery.v1.Params) | params defines the parameters of the module. | No       |

#### evmos.revenue.v1.Params

| Name                        | Type            | Description | Required |
| --------------------------- | --------------- | ----------- | -------- |
| enable_revenue              | boolean         |             | No       |
| developer_shares            | string          |             | No       |
| addr_derivation_cost_create | string (uint64) |             | No       |

#### evmos.revenue.v1.QueryDeployerRevenuesResponse

QueryDeployerRevenuesResponse is the response type for the
Query/DeployerRevenues RPC method.

| Name               | Type                                                                              | Description                                        | Required |
| ------------------ | --------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| contract_addresses | [ string ]                                                                        |                                                    | No       |
| pagination         | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response. | No       |

#### evmos.revenue.v1.QueryParamsResponse

QueryParamsResponse is the response type for the Query/Params RPC method.

| Name   | Type                                                | Description | Required |
| ------ | --------------------------------------------------- | ----------- | -------- |
| params | [evmos.revenue.v1.Params](#evmos.revenue.v1.Params) |             | No       |

#### evmos.revenue.v1.QueryRevenueResponse

QueryRevenueResponse is the response type for the Query/Revenue RPC method.

| Name    | Type                                                  | Description | Required |
| ------- | ----------------------------------------------------- | ----------- | -------- |
| revenue | [evmos.revenue.v1.Revenue](#evmos.revenue.v1.Revenue) |             | No       |

#### evmos.revenue.v1.QueryRevenuesResponse

QueryRevenuesResponse is the response type for the Query/Revenues RPC method.

| Name       | Type                                                                              | Description                                        | Required |
| ---------- | --------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| revenues   | [ [evmos.revenue.v1.Revenue](#evmos.revenue.v1.Revenue) ]                         |                                                    | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response. | No       |

#### evmos.revenue.v1.QueryWithdrawerRevenuesResponse

QueryWithdrawerRevenuesResponse is the response type for the
Query/WithdrawerRevenues RPC method.

| Name               | Type                                                                              | Description                                        | Required |
| ------------------ | --------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| contract_addresses | [ string ]                                                                        |                                                    | No       |
| pagination         | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) | pagination defines the pagination in the response. | No       |

#### evmos.revenue.v1.Revenue

| Name               | Type   | Description | Required |
| ------------------ | ------ | ----------- | -------- |
| contract_address   | string |             | No       |
| deployer_address   | string |             | No       |
| withdrawer_address | string |             | No       |

#### evmos.vesting.v1.QueryBalancesResponse

QueryBalancesResponse is the response type for the Query/Balances RPC
method.

| Name     | Type                                                      | Description | Required |
| -------- | --------------------------------------------------------- | ----------- | -------- |
| locked   | [ [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) ] |             | No       |
| unvested | [ [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) ] |             | No       |
| vested   | [ [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) ] |             | No       |

#### ibc.applications.fee.v1.Fee

| Name        | Type                                                      | Description | Required |
| ----------- | --------------------------------------------------------- | ----------- | -------- |
| recv_fee    | [ [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) ] |             | No       |
| ack_fee     | [ [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) ] |             | No       |
| timeout_fee | [ [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) ] |             | No       |

#### ibc.applications.fee.v1.FeeEnabledChannel

| Name       | Type   | Description | Required |
| ---------- | ------ | ----------- | -------- |
| port_id    | string |             | No       |
| channel_id | string |             | No       |

#### ibc.applications.fee.v1.IdentifiedPacketFees

| Name        | Type                                                                        | Description | Required |
| ----------- | --------------------------------------------------------------------------- | ----------- | -------- |
| packet_id   | [ibc.core.channel.v1.PacketId](#ibc.core.channel.v1.PacketId)               |             | No       |
| packet_fees | [ [ibc.applications.fee.v1.PacketFee](#ibc.applications.fee.v1.PacketFee) ] |             | No       |

#### ibc.applications.fee.v1.PacketFee

| Name           | Type                                                        | Description | Required |
| -------------- | ----------------------------------------------------------- | ----------- | -------- |
| fee            | [ibc.applications.fee.v1.Fee](#ibc.applications.fee.v1.Fee) |             | No       |
| refund_address | string                                                      |             | No       |
| relayers       | [ string ]                                                  |             | No       |

#### ibc.applications.fee.v1.QueryCounterpartyPayeeResponse

| Name               | Type   | Description | Required |
| ------------------ | ------ | ----------- | -------- |
| counterparty_payee | string |             | No       |

#### ibc.applications.fee.v1.QueryFeeEnabledChannelResponse

| Name        | Type    | Description | Required |
| ----------- | ------- | ----------- | -------- |
| fee_enabled | boolean |             | No       |

#### ibc.applications.fee.v1.QueryFeeEnabledChannelsResponse

| Name                 | Type                                                                                        | Description                                        | Required |
| -------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| fee_enabled_channels | [ [ibc.applications.fee.v1.FeeEnabledChannel](#ibc.applications.fee.v1.FeeEnabledChannel) ] |                                                    | No       |
| pagination           | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse)           | pagination defines the pagination in the response. | No       |

#### ibc.applications.fee.v1.QueryIncentivizedPacketResponse

| Name                | Type                                                                                          | Description | Required |
| ------------------- | --------------------------------------------------------------------------------------------- | ----------- | -------- |
| incentivized_packet | [ibc.applications.fee.v1.IdentifiedPacketFees](#ibc.applications.fee.v1.IdentifiedPacketFees) |             | No       |

#### ibc.applications.fee.v1.QueryIncentivizedPacketsForChannelResponse

| Name                 | Type                                                                                              | Description                                        | Required |
| -------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| incentivized_packets | [ [ibc.applications.fee.v1.IdentifiedPacketFees](#ibc.applications.fee.v1.IdentifiedPacketFees) ] |                                                    | No       |
| pagination           | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse)                 | pagination defines the pagination in the response. | No       |

#### ibc.applications.fee.v1.QueryIncentivizedPacketsResponse

| Name                 | Type                                                                                              | Description                                        | Required |
| -------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| incentivized_packets | [ [ibc.applications.fee.v1.IdentifiedPacketFees](#ibc.applications.fee.v1.IdentifiedPacketFees) ] |                                                    | No       |
| pagination           | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse)                 | pagination defines the pagination in the response. | No       |

#### ibc.applications.fee.v1.QueryPayeeResponse

| Name          | Type   | Description | Required |
| ------------- | ------ | ----------- | -------- |
| payee_address | string |             | No       |

#### ibc.applications.fee.v1.QueryTotalAckFeesResponse

| Name     | Type                                                      | Description | Required |
| -------- | --------------------------------------------------------- | ----------- | -------- |
| ack_fees | [ [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) ] |             | No       |

#### ibc.applications.fee.v1.QueryTotalRecvFeesResponse

| Name      | Type                                                      | Description | Required |
| --------- | --------------------------------------------------------- | ----------- | -------- |
| recv_fees | [ [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) ] |             | No       |

#### ibc.applications.fee.v1.QueryTotalTimeoutFeesResponse

| Name         | Type                                                      | Description | Required |
| ------------ | --------------------------------------------------------- | ----------- | -------- |
| timeout_fees | [ [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) ] |             | No       |

#### ibc.core.channel.v1.PacketId

| Name       | Type            | Description | Required |
| ---------- | --------------- | ----------- | -------- |
| port_id    | string          |             | No       |
| channel_id | string          |             | No       |
| sequence   | string (uint64) |             | No       |

#### ibc.applications.interchain_accounts.controller.v1.Params

Params defines the set of on-chain interchain accounts parameters.
The following parameters may be used to disable the controller submodule.

| Name               | Type    | Description                                                      | Required |
| ------------------ | ------- | ---------------------------------------------------------------- | -------- |
| controller_enabled | boolean | controller_enabled enables or disables the controller submodule. | No       |

#### ibc.applications.interchain_accounts.controller.v1.QueryInterchainAccountResponse

QueryInterchainAccountResponse the response type for the Query/InterchainAccount RPC method.

| Name    | Type   | Description | Required |
| ------- | ------ | ----------- | -------- |
| address | string |             | No       |

#### ibc.applications.interchain_accounts.controller.v1.QueryParamsResponse

QueryParamsResponse is the response type for the Query/Params RPC method.

| Name   | Type                                                                                                                    | Description                                  | Required |
| ------ | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | -------- |
| params | [ibc.applications.interchain_accounts.controller.v1.Params](#ibc.applications.interchain_accounts.controller.v1.Params) | params defines the parameters of the module. | No       |

#### ibc.applications.interchain_accounts.host.v1.Params

Params defines the set of on-chain interchain accounts parameters.
The following parameters may be used to disable the host submodule.

| Name           | Type       | Description                                                                                   | Required |
| -------------- | ---------- | --------------------------------------------------------------------------------------------- | -------- |
| host_enabled   | boolean    | host_enabled enables or disables the host submodule.                                          | No       |
| allow_messages | [ string ] | allow_messages defines a list of sdk message typeURLs allowed to be executed on a host chain. | No       |

#### ibc.applications.interchain_accounts.host.v1.QueryParamsResponse

QueryParamsResponse is the response type for the Query/Params RPC method.

| Name   | Type                                                                                                        | Description                                  | Required |
| ------ | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------- | -------- |
| params | [ibc.applications.interchain_accounts.host.v1.Params](#ibc.applications.interchain_accounts.host.v1.Params) | params defines the parameters of the module. | No       |

#### ibc.applications.transfer.v1.DenomTrace

DenomTrace contains the base denomination for ICS20 fungible tokens and the
source tracing information path.

| Name       | Type   | Description                                                                                           | Required |
| ---------- | ------ | ----------------------------------------------------------------------------------------------------- | -------- |
| path       | string | path defines the chain of port/channel identifiers used for tracing the source of the fungible token. | No       |
| base_denom | string | base denomination of the relayed fungible token.                                                      | No       |

#### ibc.applications.transfer.v1.Params

Params defines the set of IBC transfer parameters.
NOTE: To prevent a single token from being transferred, set the
TransfersEnabled parameter to true and then set the bank module's SendEnabled
parameter for the denomination to false.

| Name            | Type    | Description                                                                        | Required |
| --------------- | ------- | ---------------------------------------------------------------------------------- | -------- |
| send_enabled    | boolean | send_enabled enables or disables all cross-chain token transfers from this chain.  | No       |
| receive_enabled | boolean | receive_enabled enables or disables all cross-chain token transfers to this chain. | No       |

#### ibc.applications.transfer.v1.QueryDenomHashResponse

QueryDenomHashResponse is the response type for the Query/DenomHash RPC
method.

| Name | Type   | Description                                                 | Required |
| ---- | ------ | ----------------------------------------------------------- | -------- |
| hash | string | hash (in hex format) of the denomination trace information. | No       |

#### ibc.applications.transfer.v1.QueryDenomTraceResponse

QueryDenomTraceResponse is the response type for the Query/DenomTrace RPC
method.

| Name        | Type                                                                                | Description                                                       | Required |
| ----------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------- | -------- |
| denom_trace | [ibc.applications.transfer.v1.DenomTrace](#ibc.applications.transfer.v1.DenomTrace) | denom_trace returns the requested denomination trace information. | No       |

#### ibc.applications.transfer.v1.QueryDenomTracesResponse

QueryConnectionsResponse is the response type for the Query/DenomTraces RPC
method.

| Name         | Type                                                                                    | Description                                               | Required |
| ------------ | --------------------------------------------------------------------------------------- | --------------------------------------------------------- | -------- |
| denom_traces | [ [ibc.applications.transfer.v1.DenomTrace](#ibc.applications.transfer.v1.DenomTrace) ] | denom_traces returns all denominations trace information. | No       |
| pagination   | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse)       | pagination defines the pagination in the response.        | No       |

#### ibc.applications.transfer.v1.QueryEscrowAddressResponse

QueryEscrowAddressResponse is the response type of the EscrowAddress RPC method.

| Name           | Type   | Description | Required |
| -------------- | ------ | ----------- | -------- |
| escrow_address | string |             | No       |

#### ibc.applications.transfer.v1.QueryParamsResponse

QueryParamsResponse is the response type for the Query/Params RPC method.

| Name   | Type                                                                        | Description                                  | Required |
| ------ | --------------------------------------------------------------------------- | -------------------------------------------- | -------- |
| params | [ibc.applications.transfer.v1.Params](#ibc.applications.transfer.v1.Params) | params defines the parameters of the module. | No       |

#### ibc.applications.transfer.v1.QueryTotalEscrowForDenomResponse

QueryTotalEscrowForDenomResponse is the response type for TotalEscrowForDenom RPC method.

| Name   | Type                                                  | Description | Required |
| ------ | ----------------------------------------------------- | ----------- | -------- |
| amount | [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) |             | No       |

#### ibc.core.channel.v1.Channel

Channel defines pipeline for exactly-once packet delivery between specific
modules on separate blockchains, which has at least one end capable of
sending packets and one end capable of receiving packets.

| Name            | Type                                                                  | Description | Required |
| --------------- | --------------------------------------------------------------------- | ----------- | -------- |
| state           | [ibc.core.channel.v1.State](#ibc.core.channel.v1.State)               |             | No       |
| ordering        | [ibc.core.channel.v1.Order](#ibc.core.channel.v1.Order)               |             | No       |
| counterparty    | [ibc.core.channel.v1.Counterparty](#ibc.core.channel.v1.Counterparty) |             | No       |
| connection_hops | [ string ]                                                            |             | No       |
| version         | string                                                                |             | No       |

#### ibc.core.channel.v1.Counterparty

| Name       | Type   | Description                                                             | Required |
| ---------- | ------ | ----------------------------------------------------------------------- | -------- |
| port_id    | string | port on the counterparty chain which owns the other end of the channel. | No       |
| channel_id | string |                                                                         | No       |

#### ibc.core.channel.v1.IdentifiedChannel

IdentifiedChannel defines a channel with additional port and channel
identifier fields.

| Name            | Type                                                                  | Description | Required |
| --------------- | --------------------------------------------------------------------- | ----------- | -------- |
| state           | [ibc.core.channel.v1.State](#ibc.core.channel.v1.State)               |             | No       |
| ordering        | [ibc.core.channel.v1.Order](#ibc.core.channel.v1.Order)               |             | No       |
| counterparty    | [ibc.core.channel.v1.Counterparty](#ibc.core.channel.v1.Counterparty) |             | No       |
| connection_hops | [ string ]                                                            |             | No       |
| version         | string                                                                |             | No       |
| port_id         | string                                                                |             | No       |
| channel_id      | string                                                                |             | No       |

#### ibc.core.channel.v1.Order

- ORDER_NONE_UNSPECIFIED: zero-value for channel ordering
- ORDER_UNORDERED: packets can be delivered in any order, which may differ from the order in
which they were sent.
- ORDER_ORDERED: packets are delivered exactly in the order which they were sent

| Name                      | Type   | Description                                                                                                                                                                                                                                                     | Required |
| ------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| ibc.core.channel.v1.Order | string | - ORDER_NONE_UNSPECIFIED: zero-value for channel ordering  - ORDER_UNORDERED: packets can be delivered in any order, which may differ from the order in which they were sent.  - ORDER_ORDERED: packets are delivered exactly in the order which they were sent |          |

#### ibc.core.channel.v1.PacketState

PacketState defines the generic type necessary to retrieve and store
packet commitments, acknowledgements, and receipts.
Caller is responsible for knowing the context necessary to interpret this
state as a commitment, acknowledgement, or a receipt.

| Name       | Type            | Description                                 | Required |
| ---------- | --------------- | ------------------------------------------- | -------- |
| port_id    | string          | channel port identifier.                    | No       |
| channel_id | string          | channel unique identifier.                  | No       |
| sequence   | string (uint64) | packet sequence.                            | No       |
| data       | byte            | embedded data that represents packet state. | No       |

#### ibc.core.channel.v1.QueryChannelClientStateResponse

| Name                    | Type                                                                                  | Description | Required |
| ----------------------- | ------------------------------------------------------------------------------------- | ----------- | -------- |
| identified_client_state | [ibc.core.client.v1.IdentifiedClientState](#ibc.core.client.v1.IdentifiedClientState) |             | No       |
| proof                   | byte                                                                                  |             | No       |
| proof_height            | [ibc.core.client.v1.Height](#ibc.core.client.v1.Height)                               |             | No       |

#### ibc.core.channel.v1.QueryChannelConsensusStateResponse

| Name            | Type                                                    | Description | Required |
| --------------- | ------------------------------------------------------- | ----------- | -------- |
| consensus_state | [google.protobuf.Any](#google.protobuf.Any)             |             | No       |
| client_id       | string                                                  |             | No       |
| proof           | byte                                                    |             | No       |
| proof_height    | [ibc.core.client.v1.Height](#ibc.core.client.v1.Height) |             | No       |

#### ibc.core.channel.v1.QueryChannelResponse

QueryChannelResponse is the response type for the Query/Channel RPC method.
Besides the Channel end, it includes a proof and the height from which the
proof was retrieved.

| Name         | Type                                                        | Description | Required |
| ------------ | ----------------------------------------------------------- | ----------- | -------- |
| channel      | [ibc.core.channel.v1.Channel](#ibc.core.channel.v1.Channel) |             | No       |
| proof        | byte                                                        |             | No       |
| proof_height | [ibc.core.client.v1.Height](#ibc.core.client.v1.Height)     |             | No       |

#### ibc.core.channel.v1.QueryChannelsResponse

QueryChannelsResponse is the response type for the Query/Channels RPC method.

| Name       | Type                                                                                | Description                           | Required |
| ---------- | ----------------------------------------------------------------------------------- | ------------------------------------- | -------- |
| channels   | [ [ibc.core.channel.v1.IdentifiedChannel](#ibc.core.channel.v1.IdentifiedChannel) ] | list of stored channels of the chain. | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse)   |                                       | No       |
| height     | [ibc.core.client.v1.Height](#ibc.core.client.v1.Height)                             |                                       | No       |

#### ibc.core.channel.v1.QueryConnectionChannelsResponse

| Name       | Type                                                                                | Description                                    | Required |
| ---------- | ----------------------------------------------------------------------------------- | ---------------------------------------------- | -------- |
| channels   | [ [ibc.core.channel.v1.IdentifiedChannel](#ibc.core.channel.v1.IdentifiedChannel) ] | list of channels associated with a connection. | No       |
| pagination | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse)   |                                                | No       |
| height     | [ibc.core.client.v1.Height](#ibc.core.client.v1.Height)                             |                                                | No       |

#### ibc.core.channel.v1.QueryNextSequenceReceiveResponse

| Name                  | Type                                                    | Description | Required |
| --------------------- | ------------------------------------------------------- | ----------- | -------- |
| next_sequence_receive | string (uint64)                                         |             | No       |
| proof                 | byte                                                    |             | No       |
| proof_height          | [ibc.core.client.v1.Height](#ibc.core.client.v1.Height) |             | No       |

#### ibc.core.channel.v1.QueryNextSequenceSendResponse

| Name               | Type                                                    | Description | Required |
| ------------------ | ------------------------------------------------------- | ----------- | -------- |
| next_sequence_send | string (uint64)                                         |             | No       |
| proof              | byte                                                    |             | No       |
| proof_height       | [ibc.core.client.v1.Height](#ibc.core.client.v1.Height) |             | No       |

#### ibc.core.channel.v1.QueryPacketAcknowledgementResponse

| Name            | Type                                                    | Description | Required |
| --------------- | ------------------------------------------------------- | ----------- | -------- |
| acknowledgement | byte                                                    |             | No       |
| proof           | byte                                                    |             | No       |
| proof_height    | [ibc.core.client.v1.Height](#ibc.core.client.v1.Height) |             | No       |

#### ibc.core.channel.v1.QueryPacketAcknowledgementsResponse

| Name             | Type                                                                              | Description | Required |
| ---------------- | --------------------------------------------------------------------------------- | ----------- | -------- |
| acknowledgements | [ [ibc.core.channel.v1.PacketState](#ibc.core.channel.v1.PacketState) ]           |             | No       |
| pagination       | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) |             | No       |
| height           | [ibc.core.client.v1.Height](#ibc.core.client.v1.Height)                           |             | No       |

#### ibc.core.channel.v1.QueryPacketCommitmentResponse

| Name         | Type                                                    | Description | Required |
| ------------ | ------------------------------------------------------- | ----------- | -------- |
| commitment   | byte                                                    |             | No       |
| proof        | byte                                                    |             | No       |
| proof_height | [ibc.core.client.v1.Height](#ibc.core.client.v1.Height) |             | No       |

#### ibc.core.channel.v1.QueryPacketCommitmentsResponse

| Name        | Type                                                                              | Description | Required |
| ----------- | --------------------------------------------------------------------------------- | ----------- | -------- |
| commitments | [ [ibc.core.channel.v1.PacketState](#ibc.core.channel.v1.PacketState) ]           |             | No       |
| pagination  | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) |             | No       |
| height      | [ibc.core.client.v1.Height](#ibc.core.client.v1.Height)                           |             | No       |

#### ibc.core.channel.v1.QueryPacketReceiptResponse

| Name         | Type                                                    | Description | Required |
| ------------ | ------------------------------------------------------- | ----------- | -------- |
| received     | boolean                                                 |             | No       |
| proof        | byte                                                    |             | No       |
| proof_height | [ibc.core.client.v1.Height](#ibc.core.client.v1.Height) |             | No       |

#### ibc.core.channel.v1.QueryUnreceivedAcksResponse

| Name      | Type                                                    | Description | Required |
| --------- | ------------------------------------------------------- | ----------- | -------- |
| sequences | [ string (uint64) ]                                     |             | No       |
| height    | [ibc.core.client.v1.Height](#ibc.core.client.v1.Height) |             | No       |

#### ibc.core.channel.v1.QueryUnreceivedPacketsResponse

| Name      | Type                                                    | Description | Required |
| --------- | ------------------------------------------------------- | ----------- | -------- |
| sequences | [ string (uint64) ]                                     |             | No       |
| height    | [ibc.core.client.v1.Height](#ibc.core.client.v1.Height) |             | No       |

#### ibc.core.channel.v1.State

State defines if a channel is in one of the following states:
CLOSED, INIT, TRYOPEN, OPEN or UNINITIALIZED.

- STATE_UNINITIALIZED_UNSPECIFIED: Default State
- STATE_INIT: A channel has just started the opening handshake.
- STATE_TRYOPEN: A channel has acknowledged the handshake step on the counterparty chain.
- STATE_OPEN: A channel has completed the handshake. Open channels are
ready to send and receive packets.
- STATE_CLOSED: A channel has been closed and can no longer be used to send or receive
packets.

| Name                      | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Required |
| ------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| ibc.core.channel.v1.State | string | State defines if a channel is in one of the following states: CLOSED, INIT, TRYOPEN, OPEN or UNINITIALIZED.   - STATE_UNINITIALIZED_UNSPECIFIED: Default State  - STATE_INIT: A channel has just started the opening handshake.  - STATE_TRYOPEN: A channel has acknowledged the handshake step on the counterparty chain.  - STATE_OPEN: A channel has completed the handshake. Open channels are ready to send and receive packets.  - STATE_CLOSED: A channel has been closed and can no longer be used to send or receive packets. |          |

#### ibc.core.client.v1.Height

Normally the RevisionHeight is incremented at each height while keeping
RevisionNumber the same. However some consensus algorithms may choose to
reset the height in certain conditions e.g. hard forks, state-machine
breaking changes In these cases, the RevisionNumber is incremented so that
height continues to be monitonically increasing even as the RevisionHeight
gets reset

| Name            | Type            | Description | Required |
| --------------- | --------------- | ----------- | -------- |
| revision_number | string (uint64) |             | No       |
| revision_height | string (uint64) |             | No       |

#### ibc.core.client.v1.IdentifiedClientState

IdentifiedClientState defines a client state with an additional client
identifier field.

| Name         | Type                                        | Description | Required |
| ------------ | ------------------------------------------- | ----------- | -------- |
| client_id    | string                                      |             | No       |
| client_state | [google.protobuf.Any](#google.protobuf.Any) |             | No       |

#### ibc.core.client.v1.ConsensusStateWithHeight

ConsensusStateWithHeight defines a consensus state with an additional height
field.

| Name            | Type                                                    | Description | Required |
| --------------- | ------------------------------------------------------- | ----------- | -------- |
| height          | [ibc.core.client.v1.Height](#ibc.core.client.v1.Height) |             | No       |
| consensus_state | [google.protobuf.Any](#google.protobuf.Any)             |             | No       |

#### ibc.core.client.v1.Params

Params defines the set of IBC light client parameters.

| Name            | Type       | Description                                                                                                                                                                                                                                    | Required |
| --------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| allowed_clients | [ string ] | allowed_clients defines the list of allowed client state types which can be created and interacted with. If a client type is removed from the allowed clients list, usage of this client will be disabled until it is added again to the list. | No       |

#### ibc.core.client.v1.QueryClientParamsResponse

QueryClientParamsResponse is the response type for the Query/ClientParams RPC
method.

| Name   | Type                                                    | Description                                  | Required |
| ------ | ------------------------------------------------------- | -------------------------------------------- | -------- |
| params | [ibc.core.client.v1.Params](#ibc.core.client.v1.Params) | params defines the parameters of the module. | No       |

#### ibc.core.client.v1.QueryClientStateResponse

QueryClientStateResponse is the response type for the Query/ClientState RPC
method. Besides the client state, it includes a proof and the height from
which the proof was retrieved.

| Name         | Type                                                    | Description | Required |
| ------------ | ------------------------------------------------------- | ----------- | -------- |
| client_state | [google.protobuf.Any](#google.protobuf.Any)             |             | No       |
| proof        | byte                                                    |             | No       |
| proof_height | [ibc.core.client.v1.Height](#ibc.core.client.v1.Height) |             | No       |

#### ibc.core.client.v1.QueryClientStatesResponse

QueryClientStatesResponse is the response type for the Query/ClientStates RPC
method.

| Name          | Type                                                                                      | Description                               | Required |
| ------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------- | -------- |
| client_states | [ [ibc.core.client.v1.IdentifiedClientState](#ibc.core.client.v1.IdentifiedClientState) ] | list of stored ClientStates of the chain. | No       |
| pagination    | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse)         |                                           | No       |

#### ibc.core.client.v1.QueryClientStatusResponse

QueryClientStatusResponse is the response type for the Query/ClientStatus RPC
method. It returns the current status of the IBC client.

| Name   | Type   | Description | Required |
| ------ | ------ | ----------- | -------- |
| status | string |             | No       |

#### ibc.core.client.v1.QueryConsensusStateHeightsResponse

| Name                    | Type                                                                              | Description | Required |
| ----------------------- | --------------------------------------------------------------------------------- | ----------- | -------- |
| consensus_state_heights | [ [ibc.core.client.v1.Height](#ibc.core.client.v1.Height) ]                       |             | No       |
| pagination              | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) |             | No       |

#### ibc.core.client.v1.QueryConsensusStateResponse

| Name            | Type                                                    | Description | Required |
| --------------- | ------------------------------------------------------- | ----------- | -------- |
| consensus_state | [google.protobuf.Any](#google.protobuf.Any)             |             | No       |
| proof           | byte                                                    |             | No       |
| proof_height    | [ibc.core.client.v1.Height](#ibc.core.client.v1.Height) |             | No       |

#### ibc.core.client.v1.QueryConsensusStatesResponse

| Name             | Type                                                                                            | Description | Required |
| ---------------- | ----------------------------------------------------------------------------------------------- | ----------- | -------- |
| consensus_states | [ [ibc.core.client.v1.ConsensusStateWithHeight](#ibc.core.client.v1.ConsensusStateWithHeight) ] |             | No       |
| pagination       | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse)               |             | No       |

#### ibc.core.client.v1.QueryUpgradedClientStateResponse

QueryUpgradedClientStateResponse is the response type for the
Query/UpgradedClientState RPC method.

| Name                  | Type                                        | Description | Required |
| --------------------- | ------------------------------------------- | ----------- | -------- |
| upgraded_client_state | [google.protobuf.Any](#google.protobuf.Any) |             | No       |

#### ibc.core.client.v1.QueryUpgradedConsensusStateResponse

QueryUpgradedConsensusStateResponse is the response type for the
Query/UpgradedConsensusState RPC method.

| Name                     | Type                                        | Description | Required |
| ------------------------ | ------------------------------------------- | ----------- | -------- |
| upgraded_consensus_state | [google.protobuf.Any](#google.protobuf.Any) |             | No       |

#### ibc.core.commitment.v1.MerklePrefix

| Name       | Type | Description | Required |
| ---------- | ---- | ----------- | -------- |
| key_prefix | byte |             | No       |

#### ibc.core.connection.v1.ConnectionEnd

ConnectionEnd defines a stateful object on a chain connected to another
separate one.
NOTE: there must only be 2 defined ConnectionEnds to establish
a connection between two chains.

| Name         | Type                                                                        | Description                                                                                                                                            | Required |
| ------------ | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| client_id    | string                                                                      | client associated with this connection.                                                                                                                | No       |
| versions     | [ [ibc.core.connection.v1.Version](#ibc.core.connection.v1.Version) ]       | IBC version which can be utilised to determine encodings or protocols for channels or packets utilising this connection.                               | No       |
| state        | [ibc.core.connection.v1.State](#ibc.core.connection.v1.State)               | current state of the connection end.                                                                                                                   | No       |
| counterparty | [ibc.core.connection.v1.Counterparty](#ibc.core.connection.v1.Counterparty) | counterparty chain associated with this connection.                                                                                                    | No       |
| delay_period | string (uint64)                                                             | delay period that must pass before a consensus state can be used for packet-verification NOTE: delay period logic is only implemented by some clients. | No       |

#### ibc.core.connection.v1.Counterparty

Counterparty defines the counterparty chain associated with a connection end.

| Name          | Type                                                                        | Description                                                                                 | Required |
| ------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | -------- |
| client_id     | string                                                                      | identifies the client on the counterparty chain associated with a given connection.         | No       |
| connection_id | string                                                                      | identifies the connection end on the counterparty chain associated with a given connection. | No       |
| prefix        | [ibc.core.commitment.v1.MerklePrefix](#ibc.core.commitment.v1.MerklePrefix) | commitment merkle prefix of the counterparty chain.                                         | No       |

#### ibc.core.connection.v1.IdentifiedConnection

IdentifiedConnection defines a connection with additional connection
identifier field.

| Name         | Type                                                                        | Description                                         | Required |
| ------------ | --------------------------------------------------------------------------- | --------------------------------------------------- | -------- |
| id           | string                                                                      | connection identifier.                              | No       |
| client_id    | string                                                                      | client associated with this connection.             | No       |
| versions     | [ [ibc.core.connection.v1.Version](#ibc.core.connection.v1.Version) ]       |                                                     | No       |
| state        | [ibc.core.connection.v1.State](#ibc.core.connection.v1.State)               | current state of the connection end.                | No       |
| counterparty | [ibc.core.connection.v1.Counterparty](#ibc.core.connection.v1.Counterparty) | counterparty chain associated with this connection. | No       |
| delay_period | string (uint64)                                                             | delay period associated with this connection.       | No       |

#### ibc.core.connection.v1.Params

Params defines the set of Connection parameters.

| Name                        | Type            | Description                                                                                                                                                                                                                                                                                  | Required |
| --------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| max_expected_time_per_block | string (uint64) | maximum expected time per block (in nanoseconds), used to enforce block delay. This parameter should reflect the largest amount of time that the chain might reasonably take to produce the next block under normal operating conditions. A safe choice is 3-5x the expected time per block. | No       |

#### ibc.core.connection.v1.QueryClientConnectionsResponse

| Name             | Type                                                    | Description                                                 | Required |
| ---------------- | ------------------------------------------------------- | ----------------------------------------------------------- | -------- |
| connection_paths | [ string ]                                              | slice of all the connection paths associated with a client. | No       |
| proof            | byte                                                    |                                                             | No       |
| proof_height     | [ibc.core.client.v1.Height](#ibc.core.client.v1.Height) |                                                             | No       |

#### ibc.core.connection.v1.QueryConnectionClientStateResponse

| Name                    | Type                                                                                  | Description | Required |
| ----------------------- | ------------------------------------------------------------------------------------- | ----------- | -------- |
| identified_client_state | [ibc.core.client.v1.IdentifiedClientState](#ibc.core.client.v1.IdentifiedClientState) |             | No       |
| proof                   | byte                                                                                  |             | No       |
| proof_height            | [ibc.core.client.v1.Height](#ibc.core.client.v1.Height)                               |             | No       |

#### ibc.core.connection.v1.QueryConnectionConsensusStateResponse

| Name            | Type                                                    | Description | Required |
| --------------- | ------------------------------------------------------- | ----------- | -------- |
| consensus_state | [google.protobuf.Any](#google.protobuf.Any)             |             | No       |
| client_id       | string                                                  |             | No       |
| proof           | byte                                                    |             | No       |
| proof_height    | [ibc.core.client.v1.Height](#ibc.core.client.v1.Height) |             | No       |

#### ibc.core.connection.v1.QueryConnectionParamsResponse

QueryConnectionParamsResponse is the response type for the Query/ConnectionParams RPC method.

| Name   | Type                                                            | Description                                  | Required |
| ------ | --------------------------------------------------------------- | -------------------------------------------- | -------- |
| params | [ibc.core.connection.v1.Params](#ibc.core.connection.v1.Params) | params defines the parameters of the module. | No       |

#### ibc.core.connection.v1.QueryConnectionResponse

QueryConnectionResponse is the response type for the Query/Connection RPC
method. Besides the connection end, it includes a proof and the height from
which the proof was retrieved.

| Name         | Type                                                                          | Description | Required |
| ------------ | ----------------------------------------------------------------------------- | ----------- | -------- |
| connection   | [ibc.core.connection.v1.ConnectionEnd](#ibc.core.connection.v1.ConnectionEnd) |             | No       |
| proof        | byte                                                                          |             | No       |
| proof_height | [ibc.core.client.v1.Height](#ibc.core.client.v1.Height)                       |             | No       |

#### ibc.core.connection.v1.QueryConnectionsResponse

QueryConnectionsResponse is the response type for the Query/Connections RPC
method.

| Name        | Type                                                                                            | Description                              | Required |
| ----------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------- | -------- |
| connections | [ [ibc.core.connection.v1.IdentifiedConnection](#ibc.core.connection.v1.IdentifiedConnection) ] | list of stored connections of the chain. | No       |
| pagination  | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse)               |                                          | No       |
| height      | [ibc.core.client.v1.Height](#ibc.core.client.v1.Height)                                         |                                          | No       |

#### ibc.core.connection.v1.State

State defines if a connection is in one of the following states:
INIT, TRYOPEN, OPEN or UNINITIALIZED.

- STATE_UNINITIALIZED_UNSPECIFIED: Default State
- STATE_INIT: A connection end has just started the opening handshake.
- STATE_TRYOPEN: A connection end has acknowledged the handshake step on the counterparty
chain.
- STATE_OPEN: A connection end has completed the handshake.

| Name                         | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                      | Required |
| ---------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| ibc.core.connection.v1.State | string | State defines if a connection is in one of the following states: INIT, TRYOPEN, OPEN or UNINITIALIZED.   - STATE_UNINITIALIZED_UNSPECIFIED: Default State  - STATE_INIT: A connection end has just started the opening handshake.  - STATE_TRYOPEN: A connection end has acknowledged the handshake step on the counterparty chain.  - STATE_OPEN: A connection end has completed the handshake. |          |

#### ibc.core.connection.v1.Version

Version defines the versioning scheme used to negotiate the IBC verison in
the connection handshake.

| Name       | Type       | Description | Required |
| ---------- | ---------- | ----------- | -------- |
| identifier | string     |             | No       |
| features   | [ string ] |             | No       |

## CometBFT RPC

CometBFT supports the following RPC protocols:

- URI over HTTP
- JSONRPC over HTTP
- JSONRPC over websockets

### Configuration

RPC can be configured by tuning parameters under `[rpc]` table in the
`$CMTHOME/config/config.toml` file or by using the `--rpc.X` command-line
flags.

The default RPC listen address is `tcp://127.0.0.1:26657`.
To set another address, set the `laddr` config parameter to desired value.
CORS (Cross-Origin Resource Sharing) can be enabled by setting
`cors_allowed_origins`, `cors_allowed_methods`, `cors_allowed_headers`
config parameters.

If testing using a local RPC node, under the `[rpc]`
section change the `cors_allowed_origins` property, please add the URL of
the site where this OpenAPI document is running, for example:

  `cors_allowed_origins = ["http://localhost:8088"]`

or if testing from the official documentation site:

  `cors_allowed_origins = ["https://docs.cometbft.com"]`

### Arguments

Arguments which expect strings or byte arrays may be passed as quoted
strings, like `"abc"` or as `0x`-prefixed strings, like `0x616263`.

### URI/HTTP

A REST like interface.

    curl localhost:26657/block?height=5

### JSONRPC/HTTP

JSONRPC requests can be POST'd to the root RPC endpoint via HTTP.

    curl --header "Content-Type: application/json" --request POST --data '{"method": "block", "params": ["5"], "id": 1}' localhost:26657

### JSONRPC/websockets

JSONRPC requests can be also made via websocket.
The websocket endpoint is at `/websocket`, e.g. `localhost:26657/websocket`.
Asynchronous RPC functions like event `subscribe` and `unsubscribe` are
only available via websockets.

For example using the [websocat](https://github.com/vi/websocat) tool, you can subscribe for 'NewBlock` events
with the following command:

    echo '{ "jsonrpc": "2.0","method": "subscribe","id": 0,"params": {"query": "tm.event='"'NewBlock'"'"} }' | websocat -n -t ws://127.0.0.1:26657/websocket

### Version: v0.37

**Contact information:**
CometBFT
<https://cometbft.com/>

**License:** [Apache 2.0](https://github.com/cometbft/cometbft/blob/v0.37.x/LICENSE)

### **broadcastTxSync**

#### GET

##### Summary

Returns with the response from CheckTx. Does not wait for DeliverTx result.

##### Description

If you want to be sure that the transaction is included in a block, you can
subscribe for the result using JSONRPC via a websocket. See
<https://docs.cometbft.com/v0.37/core/subscription.html>
If you haven't received anything after a couple of blocks, resend it. If the
same happens again, send it to some other node. A few reasons why it could
happen:

1. malicious node can drop or pretend it had committed your tx
2. malicious proposer (not necessary the one you're communicating with) can
drop transactions, which might become valid in the future
(<https://github.com/tendermint/tendermint/issues/3322>)

Please refer to
<https://docs.cometbft.com/v0.37/core/using-cometbft.html#formatting>
for formatting/encoding rules.

##### Parameters

| Name | Located in | Description     | Required | Schema |
| ---- | ---------- | --------------- | -------- | ------ |
| tx   | query      | The transaction | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  | Empty       |
| 500  | Error       |

### **broadcastTxAsync**

#### GET

##### Summary

Returns right away, with no response. Does not wait for CheckTx nor DeliverTx results.

##### Description

If you want to be sure that the transaction is included in a block, you can
subscribe for the result using JSONRPC via a websocket. See
<https://docs.cometbft.com/v0.37/core/subscription.html>
If you haven't received anything after a couple of blocks, resend it. If the
same happens again, send it to some other node. A few reasons why it could
happen:

1. malicious node can drop or pretend it had committed your tx
2. malicious proposer (not necessary the one you're communicating with) can
drop transactions, which might become valid in the future
(<https://github.com/tendermint/tendermint/issues/3322>)
3. node can be offline

Please refer to
<https://docs.cometbft.com/v0.37/core/using-cometbft.html#formatting>
for formatting/encoding rules.

##### Parameters

| Name | Located in | Description     | Required | Schema |
| ---- | ---------- | --------------- | -------- | ------ |
| tx   | query      | The transaction | Yes      | string |

##### Responses

| Code | Description  |
| ---- | ------------ |
| 200  | empty answer |
| 500  | empty error  |

### **broadcastTxCommit**

#### GET

##### Summary

Returns with the responses from CheckTx and DeliverTx.

##### Description

IMPORTANT: use only for testing and development. In production, use
BroadcastTxSync or BroadcastTxAsync. You can subscribe for the transaction
result using JSONRPC via a websocket. See
<https://docs.cometbft.com/v0.37/core/subscription.html>

CONTRACT: only returns error if mempool.CheckTx() errs or if we timeout
waiting for tx to commit.

If CheckTx or DeliverTx fail, no error will be returned, but the returned result
will contain a non-OK ABCI code.

Please refer to
<https://docs.cometbft.com/v0.37/core/using-cometbft.html#formatting>
for formatting/encoding rules.

##### Parameters

| Name | Located in | Description     | Required | Schema |
| ---- | ---------- | --------------- | -------- | ------ |
| tx   | query      | The transaction | Yes      | string |

##### Responses

| Code | Description  |
| ---- | ------------ |
| 200  | empty answer |
| 500  | empty error  |

### **checkTx**

#### GET

##### Summary

Checks the transaction without executing it.

##### Description

The transaction won't be added to the mempool.

Please refer to
<https://docs.cometbft.com/v0.37/core/using-cometbft.html#formatting>
for formatting/encoding rules.

Upon success, the `Cache-Control` header will be set with the default
maximum age.

##### Parameters

| Name | Located in | Description     | Required | Schema |
| ---- | ---------- | --------------- | -------- | ------ |
| tx   | query      | The transaction | Yes      | string |

##### Responses

| Code | Description                         |
| ---- | ----------------------------------- |
| 200  | ABCI application's CheckTx response |
| 500  | empty error                         |

### **health**

#### GET

##### Summary

Node heartbeat

##### Description

Get node health. Returns empty result (200 OK) on success, no response - in case of an error.

##### Responses

| Code | Description      |
| ---- | ---------------- |
| 200  | Gets Node Health |
| 500  | empty error      |

### **status**

#### GET

##### Summary

Node Status

##### Description

Get CometBFT status including node info, pubkey, latest block hash, app hash, block height and time.

##### Responses

| Code | Description        |
| ---- | ------------------ |
| 200  | Status of the node |
| 500  | empty error        |

### **netInfo**

#### GET

##### Summary

Network information

##### Description

Get network info.

##### Responses

| Code | Description  |
| ---- | ------------ |
| 200  | empty answer |
| 500  | empty error  |

### **dialSeeds**

#### GET

##### Summary

Dial Seeds (Unsafe)

##### Description

Dial a peer, this route in under unsafe, and has to manually enabled to use

  **Example:** curl 'localhost:26657/dial_seeds?seeds=\["f9baeaa15fedf5e1ef7448dd60f46c01f1a9e9c4@1.2.3.4:26656","0491d373a8e0fcf1023aaf18c51d6a1d0d4f31bd@5.6.7.8:26656"\]'

##### Parameters

| Name  | Located in | Description                | Required | Schema     |
| ----- | ---------- | -------------------------- | -------- | ---------- |
| peers | query      | list of seed nodes to dial | No       | [ string ] |

##### Responses

| Code | Description                                          |
| ---- | ---------------------------------------------------- |
| 200  | Dialing seeds in progress. See /net_info for details |
| 500  | empty error                                          |

### **dialPeers**

#### GET

##### Summary

Add Peers/Persistent Peers (unsafe)

##### Description

Set a persistent peer, this route in under unsafe, and has to manually enabled to use.

**Example:** curl 'localhost:26657/dial_peers?peers=\["f9baeaa15fedf5e1ef7448dd60f46c01f1a9e9c4@1.2.3.4:26656","0491d373a8e0fcf1023aaf18c51d6a1d0d4f31bd@5.6.7.8:26656"\]&persistent=false'

##### Parameters

| Name          | Located in | Description                                     | Required | Schema     |
| ------------- | ---------- | ----------------------------------------------- | -------- | ---------- |
| persistent    | query      | Have the peers you are dialing be persistent    | No       | boolean    |
| unconditional | query      | Have the peers you are dialing be unconditional | No       | boolean    |
| private       | query      | Have the peers you are dialing be private       | No       | boolean    |
| peers         | query      | array of peers to dial                          | No       | [ string ] |

##### Responses

| Code | Description                                          |
| ---- | ---------------------------------------------------- |
| 200  | Dialing seeds in progress. See /net_info for details |
| 500  | empty error                                          |

### **blockchain**

#### GET

##### Summary

Get block headers (max: 20) for minHeight <= height <= maxHeight.

##### Description

Get block headers for minHeight <= height <= maxHeight.

At most 20 items will be returned.

Upon success, the `Cache-Control` header will be set with the default
maximum age.

##### Parameters

| Name      | Located in | Description                    | Required | Schema  |
| --------- | ---------- | ------------------------------ | -------- | ------- |
| minHeight | query      | Minimum block height to return | No       | integer |
| maxHeight | query      | Maximum block height to return | No       | integer |

##### Responses

| Code | Description                                                  |
| ---- | ------------------------------------------------------------ |
| 200  | Block headers, returned in descending order (highest first). |
| 500  | Error                                                        |

### **header**

#### GET

##### Summary

Get header at a specified height

##### Description

Get Header.

If the `height` field is set to a non-default value, upon success, the
`Cache-Control` header will be set with the default maximum age.

##### Parameters

| Name   | Located in | Description                                                                  | Required | Schema  |
| ------ | ---------- | ---------------------------------------------------------------------------- | -------- | ------- |
| height | query      | height to return. If no height is provided, it will fetch the latest header. | No       | integer |

##### Responses

| Code | Description          |
| ---- | -------------------- |
| 200  | Header informations. |
| 500  | Error                |

### **headerByHash**

#### GET

##### Summary

Get header by hash

##### Description

Get Header By Hash.

Upon success, the `Cache-Control` header will be set with the default
maximum age.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| hash | query      | header hash | Yes      | string |

##### Responses

| Code | Description          |
| ---- | -------------------- |
| 200  | Header informations. |
| 500  | Error                |

### **block**

#### GET

##### Summary

Get block at a specified height

##### Description

Get Block.

If the `height` field is set to a non-default value, upon success, the
`Cache-Control` header will be set with the default maximum age.

##### Parameters

| Name   | Located in | Description                                                                 | Required | Schema  |
| ------ | ---------- | --------------------------------------------------------------------------- | -------- | ------- |
| height | query      | height to return. If no height is provided, it will fetch the latest block. | No       | integer |

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Block informations. |
| 500  | Error               |

### **blockByHash**

#### GET

##### Summary

Get block by hash

##### Description

Get Block By Hash.

Upon success, the `Cache-Control` header will be set with the default
maximum age.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| hash | query      | block hash  | Yes      | string |

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | Block informations. |
| 500  | Error               |

### **blockResults**

#### GET

##### Summary

Get block results at a specified height

##### Description

Get block_results.

If the `height` field is set to a non-default value, upon success, the
`Cache-Control` header will be set with the default maximum age.

##### Parameters

| Name   | Located in | Description                                                                                       | Required | Schema  |
| ------ | ---------- | ------------------------------------------------------------------------------------------------- | -------- | ------- |
| height | query      | height to return. If no height is provided, it will fetch information regarding the latest block. | No       | integer |

##### Responses

| Code | Description    |
| ---- | -------------- |
| 200  | Block results. |
| 500  | Error          |

### **commit**

#### GET

##### Summary

Get commit results at a specified height

##### Description

Get Commit.

If the `height` field is set to a non-default value, upon success, the
`Cache-Control` header will be set with the default maximum age.

##### Parameters

| Name   | Located in | Description                                                                                               | Required | Schema  |
| ------ | ---------- | --------------------------------------------------------------------------------------------------------- | -------- | ------- |
| height | query      | height to return. If no height is provided, it will fetch commit informations regarding the latest block. | No       | integer |

##### Responses

| Code | Description                                                                                                                                                                        |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200  | Commit results.  canonical switches from false to true for block H once block H+1 has been committed. Until then it's subjective and only reflects what this node has seen so far. |
| 500  | Error                                                                                                                                                                              |

### **validators**

#### GET

##### Summary

Get validator set at a specified height

##### Description

Get Validators. Validators are sorted first by voting power
(descending), then by address (ascending).

If the `height` field is set to a non-default value, upon success, the
`Cache-Control` header will be set with the default maximum age.

##### Parameters

| Name     | Located in | Description                                                                                                    | Required | Schema  |
| -------- | ---------- | -------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| height   | query      | height to return. If no height is provided, it will fetch validator set which corresponds to the latest block. | No       | integer |
| page     | query      | Page number (1-based)                                                                                          | No       | integer |
| per_page | query      | Number of entries per page (max: 100)                                                                          | No       | integer |

##### Responses

| Code | Description     |
| ---- | --------------- |
| 200  | Commit results. |
| 500  | Error           |

### **genesis**

#### GET

##### Summary

Get Genesis

##### Description

Get genesis.

Upon success, the `Cache-Control` header will be set with the default
maximum age.

##### Responses

| Code | Description      |
| ---- | ---------------- |
| 200  | Genesis results. |
| 500  | Error            |

### **genesisChunked**

#### GET

##### Summary

Get Genesis in multiple chunks

##### Description

Get genesis document in multiple chunks to make it easier to iterate
through larger genesis structures. Each chunk is produced by converting
the genesis document to JSON and then splitting the resulting payload
into 16MB blocks, and then Base64-encoding each block.

Upon success, the `Cache-Control` header will be set with the default
maximum age.

##### Parameters

| Name  | Located in | Description                               | Required | Schema  |
| ----- | ---------- | ----------------------------------------- | -------- | ------- |
| chunk | query      | Sequence number of the chunk to download. | No       | integer |

##### Responses

| Code | Description             |
| ---- | ----------------------- |
| 200  | Genesis chunk response. |
| 500  | Error                   |

### **dumpConsensusState**

#### GET

##### Summary

Get consensus state

##### Description

Get consensus state.

Not safe to call from inside the ABCI application during a block execution.

##### Responses

| Code | Description                                                                                                                           |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 200  | Complete consensus state.  See <https://pkg.go.dev/github.com/cometbft/cometbft/types?tab=doc#Vote.String> for Vote string description. |
| 500  | Error                                                                                                                                 |

### **consensusState**

#### GET

##### Summary

Get consensus state

##### Description

Get consensus state.

Not safe to call from inside the ABCI application during a block execution.

##### Responses

| Code | Description              |
| ---- | ------------------------ |
| 200  | consensus state results. |
| 500  | Error                    |

### **consensusParams**

#### GET

##### Summary

Get consensus parameters

##### Description

Get consensus parameters.

If the `height` field is set to a non-default value, upon success, the
`Cache-Control` header will be set with the default maximum age.

##### Parameters

| Name   | Located in | Description                                                                                               | Required | Schema  |
| ------ | ---------- | --------------------------------------------------------------------------------------------------------- | -------- | ------- |
| height | query      | height to return. If no height is provided, it will fetch commit informations regarding the latest block. | No       | integer |

##### Responses

| Code | Description                   |
| ---- | ----------------------------- |
| 200  | consensus parameters results. |
| 500  | Error                         |

### **unconfirmedTxs**

#### GET

##### Summary

Get the list of unconfirmed transactions

##### Description

Get list of unconfirmed transactions

##### Parameters

| Name  | Located in | Description                                                    | Required | Schema  |
| ----- | ---------- | -------------------------------------------------------------- | -------- | ------- |
| limit | query      | Maximum number of unconfirmed transactions to return (max 100) | No       | integer |

##### Responses

| Code | Description                      |
| ---- | -------------------------------- |
| 200  | List of unconfirmed transactions |
| 500  | Error                            |

### **numUnconfirmedTxs**

#### GET

##### Summary

Get data about unconfirmed transactions

##### Description

Get data about unconfirmed transactions

##### Responses

| Code | Description                           |
| ---- | ------------------------------------- |
| 200  | status about unconfirmed transactions |
| 500  | Error                                 |

### **txSearch**

#### GET

##### Summary

Search for transactions

##### Description

Search for transactions w/ their results.

See /subscribe for the query syntax.

##### Parameters

| Name     | Located in | Description                                                                                                                   | Required | Schema  |
| -------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| query    | query      | Query                                                                                                                         | Yes      | string  |
| prove    | query      | Include proofs of the transactions inclusion in the block                                                                     | No       | boolean |
| page     | query      | Page number (1-based)                                                                                                         | No       | integer |
| per_page | query      | Number of entries per page (max: 100)                                                                                         | No       | integer |
| order_by | query      | Order in which transactions are sorted ("asc" or "desc"), by height & index. If empty, default sorting will be still applied. | No       | string  |

##### Responses

| Code | Description                      |
| ---- | -------------------------------- |
| 200  | List of unconfirmed transactions |
| 500  | Error                            |

### **blockSearch**

#### GET

##### Summary

Search for blocks by BeginBlock and EndBlock events

##### Description

Search for blocks by BeginBlock and EndBlock events.

See /subscribe for the query syntax.

##### Parameters

| Name     | Located in | Description                                                                                                     | Required | Schema  |
| -------- | ---------- | --------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| query    | query      | Query                                                                                                           | Yes      | string  |
| page     | query      | Page number (1-based)                                                                                           | No       | integer |
| per_page | query      | Number of entries per page (max: 100)                                                                           | No       | integer |
| order_by | query      | Order in which blocks are sorted ("asc" or "desc"), by height. If empty, default sorting will be still applied. | No       | string  |

##### Responses

| Code | Description                                            |
| ---- | ------------------------------------------------------ |
| 200  | List of paginated blocks matching the search criteria. |
| 500  | Error                                                  |

### **tx**

#### GET

##### Summary

Get transactions by hash

##### Description

Get a transaction

Upon success, the `Cache-Control` header will be set with the default
maximum age.

##### Parameters

| Name  | Located in | Description                                                | Required | Schema  |
| ----- | ---------- | ---------------------------------------------------------- | -------- | ------- |
| hash  | query      | hash of transaction to retrieve                            | Yes      | string  |
| prove | query      | Include proofs of the transaction's inclusion in the block | No       | boolean |

##### Responses

| Code | Description        |
| ---- | ------------------ |
| 200  | Get a transaction` |
| 500  | Error              |

### **abciInfo**

#### GET

##### Summary

Get info about the application.

##### Description

Get info about the application.

Upon success, the `Cache-Control` header will be set with the default
maximum age.

##### Responses

| Code | Description                          |
| ---- | ------------------------------------ |
| 200  | Get some info about the application. |
| 500  | Error                                |

### **abciQuery**

#### GET

##### Summary

Query the application for some information.

##### Description

Query the application for some information.

##### Parameters

| Name   | Located in | Description                                               | Required | Schema  |
| ------ | ---------- | --------------------------------------------------------- | -------- | ------- |
| path   | query      | Path to the data ("/a/b/c")                               | Yes      | string  |
| data   | query      | Data                                                      | Yes      | string  |
| height | query      | Height (0 means latest)                                   | No       | integer |
| prove  | query      | Include proofs of the transactions inclusion in the block | No       | boolean |

##### Responses

| Code | Description                     |
| ---- | ------------------------------- |
| 200  | Response of the submitted query |
| 500  | Error                           |

### **broadcastEvidence**

#### GET

##### Summary

Broadcast evidence of the misbehavior.

##### Description

Broadcast evidence of the misbehavior.

##### Parameters

| Name     | Located in | Description   | Required | Schema |
| -------- | ---------- | ------------- | -------- | ------ |
| evidence | query      | JSON evidence | Yes      | string |

##### Responses

| Code | Description                            |
| ---- | -------------------------------------- |
| 200  | Broadcast evidence of the misbehavior. |
| 500  | Error                                  |
