/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** AccountQueryResponse is the response type for the Query/AccountQuery RPC method. */
export interface CosmosAccountsV1AccountQueryResponse {
  /**
   * response defines the query response of the account.
   * @format byte
   */
  response?: string
}

/**
 * `Any` contains an arbitrary serialized protocol buffer message along with a
 * URL that describes the type of the serialized message.
 *
 * Protobuf library provides support to pack/unpack Any values in the form
 * of utility functions or additional generated methods of the Any type.
 *
 * Example 1: Pack and unpack a message in C++.
 *
 *     Foo foo = ...;
 *     Any any;
 *     any.PackFrom(foo);
 *     ...
 *     if (any.UnpackTo(&foo)) {
 *       ...
 *     }
 *
 * Example 2: Pack and unpack a message in Java.
 *
 *     Foo foo = ...;
 *     Any any = Any.pack(foo);
 *     ...
 *     if (any.is(Foo.class)) {
 *       foo = any.unpack(Foo.class);
 *     }
 *
 * Example 3: Pack and unpack a message in Python.
 *
 *     foo = Foo(...)
 *     any = Any()
 *     any.Pack(foo)
 *     ...
 *     if any.Is(Foo.DESCRIPTOR):
 *       any.Unpack(foo)
 *       ...
 *
 * Example 4: Pack and unpack a message in Go
 *
 *      foo := &pb.Foo{...}
 *      any, err := anypb.New(foo)
 *      if err != nil {
 *        ...
 *      }
 *      ...
 *      foo := &pb.Foo{}
 *      if err := any.UnmarshalTo(foo); err != nil {
 *        ...
 *      }
 *
 * The pack methods provided by protobuf library will by default use
 * 'type.googleapis.com/full.type.name' as the type URL and the unpack
 * methods only use the fully qualified type name after the last '/'
 * in the type URL, for example "foo.bar.com/x/y.z" will yield type
 * name "y.z".
 *
 *
 * JSON
 *
 * The JSON representation of an `Any` value uses the regular
 * representation of the deserialized, embedded message, with an
 * additional field `@type` which contains the type URL. Example:
 *
 *     package google.profile;
 *     message Person {
 *       string first_name = 1;
 *       string last_name = 2;
 *     }
 *
 *     {
 *       "@type": "type.googleapis.com/google.profile.Person",
 *       "firstName": <string>,
 *       "lastName": <string>
 *     }
 *
 * If the embedded message type is well-known and has a custom JSON
 * representation, that representation will be embedded adding a field
 * `value` which holds the custom JSON in addition to the `@type`
 * field. Example (for message [google.protobuf.Duration][]):
 *
 *     {
 *       "@type": "type.googleapis.com/google.protobuf.Duration",
 *       "value": "1.212s"
 *     }
 */
export interface GoogleProtobufAny {
  /**
   * A URL/resource name that uniquely identifies the type of the serialized
   * protocol buffer message. This string must contain at least
   * one "/" character. The last segment of the URL's path must represent
   * the fully qualified name of the type (as in
   * `path/google.protobuf.Duration`). The name should be in a canonical form
   * (e.g., leading "." is not accepted).
   *
   * In practice, teams usually precompile into the binary all types that they
   * expect it to use in the context of Any. However, for URLs which use the
   * scheme `http`, `https`, or no scheme, one can optionally set up a type
   * server that maps type URLs to message definitions as follows:
   *
   * * If no scheme is provided, `https` is assumed.
   * * An HTTP GET on the URL must yield a [google.protobuf.Type][]
   *   value in binary format, or produce an error.
   * * Applications are allowed to cache lookup results based on the
   *   URL, or have them precompiled into a binary to avoid any
   *   lookup. Therefore, binary compatibility needs to be preserved
   *   on changes to types. (Use versioned type names to manage
   *   breaking changes.)
   *
   * Note: this functionality is not currently available in the official
   * protobuf release, and it is not used for type URLs beginning with
   * type.googleapis.com.
   *
   * Schemes other than `http`, `https` (or the empty scheme) might be
   * used with implementation specific semantics.
   */
  type_url?: string
  /**
   * Must be a valid serialized protocol buffer of the above specified type.
   * @format byte
   */
  value?: string
}

export interface GrpcGatewayRuntimeError {
  error?: string
  /** @format int32 */
  code?: number
  message?: string
  details?: GoogleProtobufAny[]
}

/**
 * Config represents the configuration for a Cosmos SDK ABCI app.
 * It is intended that all state machine logic including the version of
 * baseapp and tx handlers (and possibly even Tendermint) that an app needs
 * can be described in a config object. For compatibility, the framework should
 * allow a mixture of declarative and imperative app wiring, however, apps
 * that strive for the maximum ease of maintainability should be able to describe
 * their state machine with a config object alone.
 */
export interface CosmosAppV1Alpha1Config {
  /** modules are the module configurations for the app. */
  modules?: CosmosAppV1Alpha1ModuleConfig[]
  /**
   * golang_bindings specifies explicit interface to implementation type bindings which
   * depinject uses to resolve interface inputs to provider functions.  The scope of this
   * field's configuration is global (not module specific).
   */
  golang_bindings?: CosmosAppV1Alpha1GolangBinding[]
}

/** GolangBinding is an explicit interface type to implementing type binding for dependency injection. */
export interface CosmosAppV1Alpha1GolangBinding {
  /** interface_type is the interface type which will be bound to a specific implementation type */
  interface_type?: string
  /** implementation is the implementing type which will be supplied when an input of type interface is requested */
  implementation?: string
}

/** ModuleConfig is a module configuration for an app. */
export interface CosmosAppV1Alpha1ModuleConfig {
  /**
   * name is the unique name of the module within the app. It should be a name
   * that persists between different versions of a module so that modules
   * can be smoothly upgraded to new versions.
   *
   * For example, for the module cosmos.bank.module.v1.Module, we may chose
   * to simply name the module "bank" in the app. When we upgrade to
   * cosmos.bank.module.v2.Module, the app-specific name "bank" stays the same
   * and the framework knows that the v2 module should receive all the same state
   * that the v1 module had. Note: modules should provide info on which versions
   * they can migrate from in the ModuleDescriptor.can_migration_from field.
   */
  name?: string
  /**
   * config is the config object for the module. Module config messages should
   * define a ModuleDescriptor using the cosmos.app.v1alpha1.is_module extension.
   */
  config?: GoogleProtobufAny
  /**
   * golang_bindings specifies explicit interface to implementation type bindings which
   * depinject uses to resolve interface inputs to provider functions.  The scope of this
   * field's configuration is module specific.
   */
  golang_bindings?: CosmosAppV1Alpha1GolangBinding[]
}

/** QueryConfigRequest is the Query/Config response type. */
export interface CosmosAppV1Alpha1QueryConfigResponse {
  /** config is the current app config. */
  config?: CosmosAppV1Alpha1Config
}

/**
 * AddressBytesToStringResponse is the response type for AddressString rpc method.
 *
 * Since: cosmos-sdk 0.46
 */
export interface CosmosAuthV1Beta1AddressBytesToStringResponse {
  address_string?: string
}

/**
 * AddressStringToBytesResponse is the response type for AddressBytes rpc method.
 *
 * Since: cosmos-sdk 0.46
 */
export interface CosmosAuthV1Beta1AddressStringToBytesResponse {
  /** @format byte */
  address_bytes?: string
}

/**
 * BaseAccount defines a base account type. It contains all the necessary fields
 * for basic account functionality. Any custom account type should extend this
 * type for additional functionality (e.g. vesting).
 */
export interface CosmosAuthV1Beta1BaseAccount {
  address?: string
  /**
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   *
   * Example 1: Pack and unpack a message in C++.
   *
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   *
   * Example 2: Pack and unpack a message in Java.
   *
   *     Foo foo = ...;
   *     Any any = Any.pack(foo);
   *     ...
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *     }
   *
   * Example 3: Pack and unpack a message in Python.
   *
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     ...
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *       ...
   *
   * Example 4: Pack and unpack a message in Go
   *
   *      foo := &pb.Foo{...}
   *      any, err := anypb.New(foo)
   *      if err != nil {
   *        ...
   *      }
   *      ...
   *      foo := &pb.Foo{}
   *      if err := any.UnmarshalTo(foo); err != nil {
   *        ...
   *      }
   *
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   *
   *
   * JSON
   *
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     }
   *
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   *     }
   *
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *
   *     {
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   *     }
   */
  pub_key?: GoogleProtobufAny
  /** @format uint64 */
  account_number?: string
  /** @format uint64 */
  sequence?: string
}

/**
 * Bech32PrefixResponse is the response type for Bech32Prefix rpc method.
 *
 * Since: cosmos-sdk 0.46
 */
export interface CosmosAuthV1Beta1Bech32PrefixResponse {
  bech32_prefix?: string
}

/** Params defines the parameters for the auth module. */
export interface CosmosAuthV1Beta1Params {
  /** @format uint64 */
  max_memo_characters?: string
  /** @format uint64 */
  tx_sig_limit?: string
  /** @format uint64 */
  tx_size_cost_per_byte?: string
  /** @format uint64 */
  sig_verify_cost_ed25519?: string
  /** @format uint64 */
  sig_verify_cost_secp256k1?: string
}

/**
 * QueryAccountAddressByIDResponse is the response type for AccountAddressByID rpc method
 * Since: cosmos-sdk 0.46.2
 */
export interface CosmosAuthV1Beta1QueryAccountAddressByIDResponse {
  account_address?: string
}

/**
 * QueryAccountInfoResponse is the Query/AccountInfo response type.
 *
 * Since: cosmos-sdk 0.47
 */
export interface CosmosAuthV1Beta1QueryAccountInfoResponse {
  /** info is the account info which is represented by BaseAccount. */
  info?: CosmosAuthV1Beta1BaseAccount
}

/** QueryAccountResponse is the response type for the Query/Account RPC method. */
export interface CosmosAuthV1Beta1QueryAccountResponse {
  /** account defines the account of the corresponding address. */
  account?: GoogleProtobufAny
}

/**
 * QueryAccountsResponse is the response type for the Query/Accounts RPC method.
 *
 * Since: cosmos-sdk 0.43
 */
export interface CosmosAuthV1Beta1QueryAccountsResponse {
  /** accounts are the existing accounts */
  accounts?: GoogleProtobufAny[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** QueryModuleAccountByNameResponse is the response type for the Query/ModuleAccountByName RPC method. */
export interface CosmosAuthV1Beta1QueryModuleAccountByNameResponse {
  /**
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   *
   * Example 1: Pack and unpack a message in C++.
   *
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   *
   * Example 2: Pack and unpack a message in Java.
   *
   *     Foo foo = ...;
   *     Any any = Any.pack(foo);
   *     ...
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *     }
   *
   * Example 3: Pack and unpack a message in Python.
   *
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     ...
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *       ...
   *
   * Example 4: Pack and unpack a message in Go
   *
   *      foo := &pb.Foo{...}
   *      any, err := anypb.New(foo)
   *      if err != nil {
   *        ...
   *      }
   *      ...
   *      foo := &pb.Foo{}
   *      if err := any.UnmarshalTo(foo); err != nil {
   *        ...
   *      }
   *
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   *
   *
   * JSON
   *
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     }
   *
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   *     }
   *
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *
   *     {
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   *     }
   */
  account?: GoogleProtobufAny
}

/**
 * QueryModuleAccountsResponse is the response type for the Query/ModuleAccounts RPC method.
 *
 * Since: cosmos-sdk 0.46
 */
export interface CosmosAuthV1Beta1QueryModuleAccountsResponse {
  accounts?: GoogleProtobufAny[]
}

/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface CosmosAuthV1Beta1QueryParamsResponse {
  /** params defines the parameters of the module. */
  params?: CosmosAuthV1Beta1Params
}

/**
 * PageRequest is to be embedded in gRPC request messages for efficient
 * pagination. Ex:
 * message SomeRequest {
 *          Foo some_parameter = 1;
 *          PageRequest pagination = 2;
 *  }
 */
export interface CosmosBaseQueryV1Beta1PageRequest {
  /**
   * key is a value returned in PageResponse.next_key to begin
   * querying the next page most efficiently. Only one of offset or key
   * should be set.
   * @format byte
   */
  key?: string
  /**
   * offset is a numeric offset that can be used when key is unavailable.
   * It is less efficient than using key. Only one of offset or key should
   * be set.
   * @format uint64
   */
  offset?: string
  /**
   * limit is the total number of results to be returned in the result page.
   * If left empty it will default to a value to be set by each app.
   * @format uint64
   */
  limit?: string
  /**
   * count_total is set to true  to indicate that the result set should include
   * a count of the total number of items available for pagination in UIs.
   * count_total is only respected when offset is used. It is ignored when key
   * is set.
   */
  count_total?: boolean
  /**
   * reverse is set to true if results are to be returned in the descending order.
   *
   * Since: cosmos-sdk 0.43
   */
  reverse?: boolean
}

/**
 * PageResponse is to be embedded in gRPC response messages where the
 * corresponding request message has used PageRequest.
 *
 *  message SomeResponse {
 *          repeated Bar results = 1;
 *          PageResponse page = 2;
 *  }
 */
export interface CosmosBaseQueryV1Beta1PageResponse {
  /**
   * next_key is the key to be passed to PageRequest.key to
   * query the next page most efficiently. It will be empty if
   * there are no more results.
   * @format byte
   */
  next_key?: string
  /**
   * total is total number of results available if PageRequest.count_total
   * was set, its value is undefined otherwise
   * @format uint64
   */
  total?: string
}

/**
 * Grant gives permissions to execute
 * the provide method with expiration time.
 */
export interface CosmosAuthzV1Beta1Grant {
  /**
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   *
   * Example 1: Pack and unpack a message in C++.
   *
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   *
   * Example 2: Pack and unpack a message in Java.
   *
   *     Foo foo = ...;
   *     Any any = Any.pack(foo);
   *     ...
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *     }
   *
   * Example 3: Pack and unpack a message in Python.
   *
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     ...
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *       ...
   *
   * Example 4: Pack and unpack a message in Go
   *
   *      foo := &pb.Foo{...}
   *      any, err := anypb.New(foo)
   *      if err != nil {
   *        ...
   *      }
   *      ...
   *      foo := &pb.Foo{}
   *      if err := any.UnmarshalTo(foo); err != nil {
   *        ...
   *      }
   *
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   *
   *
   * JSON
   *
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     }
   *
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   *     }
   *
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *
   *     {
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   *     }
   */
  authorization?: GoogleProtobufAny
  /**
   * time when the grant will expire and will be pruned. If null, then the grant
   * doesn't have a time expiration (other conditions  in `authorization`
   * may apply to invalidate the grant)
   * @format date-time
   */
  expiration?: string
}

/**
 * GrantAuthorization extends a grant with both the addresses of the grantee and granter.
 * It is used in genesis.proto and query.proto
 */
export interface CosmosAuthzV1Beta1GrantAuthorization {
  granter?: string
  grantee?: string
  /**
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   *
   * Example 1: Pack and unpack a message in C++.
   *
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   *
   * Example 2: Pack and unpack a message in Java.
   *
   *     Foo foo = ...;
   *     Any any = Any.pack(foo);
   *     ...
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *     }
   *
   * Example 3: Pack and unpack a message in Python.
   *
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     ...
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *       ...
   *
   * Example 4: Pack and unpack a message in Go
   *
   *      foo := &pb.Foo{...}
   *      any, err := anypb.New(foo)
   *      if err != nil {
   *        ...
   *      }
   *      ...
   *      foo := &pb.Foo{}
   *      if err := any.UnmarshalTo(foo); err != nil {
   *        ...
   *      }
   *
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   *
   *
   * JSON
   *
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     }
   *
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   *     }
   *
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *
   *     {
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   *     }
   */
  authorization?: GoogleProtobufAny
  /** @format date-time */
  expiration?: string
}

/** QueryGranteeGrantsResponse is the response type for the Query/GranteeGrants RPC method. */
export interface CosmosAuthzV1Beta1QueryGranteeGrantsResponse {
  /** grants is a list of grants granted to the grantee. */
  grants?: CosmosAuthzV1Beta1GrantAuthorization[]
  /** pagination defines an pagination for the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** QueryGranterGrantsResponse is the response type for the Query/GranterGrants RPC method. */
export interface CosmosAuthzV1Beta1QueryGranterGrantsResponse {
  /** grants is a list of grants granted by the granter. */
  grants?: CosmosAuthzV1Beta1GrantAuthorization[]
  /** pagination defines an pagination for the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** QueryGrantsResponse is the response type for the Query/Authorizations RPC method. */
export interface CosmosAuthzV1Beta1QueryGrantsResponse {
  /** authorizations is a list of grants granted for grantee by granter. */
  grants?: CosmosAuthzV1Beta1Grant[]
  /** pagination defines an pagination for the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** AppOptionsResponse is the RemoteInfoService/AppOptions response type. */
export interface CosmosAutocliV1AppOptionsResponse {
  /** module_options is a map of module name to autocli module options. */
  module_options?: Record<string, CosmosAutocliV1ModuleOptions>
}

/**
 * FlagOptions are options for flags generated from rpc request fields.
 * By default, all request fields are configured as flags based on the
 * kebab-case name of the field. Fields can be turned into positional arguments
 * instead by using RpcCommandOptions.positional_args.
 */
export interface CosmosAutocliV1FlagOptions {
  /** name is an alternate name to use for the field flag. */
  name?: string
  /** shorthand is a one-letter abbreviated flag. */
  shorthand?: string
  /** usage is the help message. */
  usage?: string
  /** default_value is the default value as text. */
  default_value?: string
  /** deprecated is the usage text to show if this flag is deprecated. */
  deprecated?: string
  /** shorthand_deprecated is the usage text to show if the shorthand of this flag is deprecated. */
  shorthand_deprecated?: string
  /** hidden hides the flag from help/usage text */
  hidden?: boolean
}

/** ModuleOptions describes the CLI options for a Cosmos SDK module. */
export interface CosmosAutocliV1ModuleOptions {
  /** tx describes the tx commands for the module. */
  tx?: CosmosAutocliV1ServiceCommandDescriptor
  /** query describes the queries commands for the module. */
  query?: CosmosAutocliV1ServiceCommandDescriptor
}

/** PositionalArgDescriptor describes a positional argument. */
export interface CosmosAutocliV1PositionalArgDescriptor {
  /**
   * proto_field specifies the proto field to use as the positional arg. Any
   * fields used as positional args will not have a flag generated.
   */
  proto_field?: string
  /**
   * varargs makes a positional parameter a varargs parameter. This can only be
   * applied to last positional parameter and the proto_field must a repeated
   * field. Note: It is mutually exclusive with optional.
   */
  varargs?: boolean
  /**
   * optional makes the last positional parameter optional.
   * Note: It is mutually exclusive with varargs.
   */
  optional?: boolean
}

/**
 * RpcCommandOptions specifies options for commands generated from protobuf
 * rpc methods.
 */
export interface CosmosAutocliV1RpcCommandOptions {
  /**
   * rpc_method is short name of the protobuf rpc method that this command is
   * generated from.
   */
  rpc_method?: string
  /**
   * use is the one-line usage method. It also allows specifying an alternate
   * name for the command as the first word of the usage text.
   *
   * By default the name of an rpc command is the kebab-case short name of the
   * rpc method.
   */
  use?: string
  /** long is the long message shown in the 'help <this-command>' output. */
  long?: string
  /** short is the short description shown in the 'help' output. */
  short?: string
  /** example is examples of how to use the command. */
  example?: string
  /** alias is an array of aliases that can be used instead of the first word in Use. */
  alias?: string[]
  /**
   * suggest_for is an array of command names for which this command will be suggested -
   * similar to aliases but only suggests.
   */
  suggest_for?: string[]
  /** deprecated defines, if this command is deprecated and should print this string when used. */
  deprecated?: string
  /**
   * version defines the version for this command. If this value is non-empty and the command does not
   * define a "version" flag, a "version" boolean flag will be added to the command and, if specified,
   * will print content of the "Version" variable. A shorthand "v" flag will also be added if the
   * command does not define one.
   */
  version?: string
  /**
   * flag_options are options for flags generated from rpc request fields.
   * By default all request fields are configured as flags. They can
   * also be configured as positional args instead using positional_args.
   */
  flag_options?: Record<string, CosmosAutocliV1FlagOptions>
  /** positional_args specifies positional arguments for the command. */
  positional_args?: CosmosAutocliV1PositionalArgDescriptor[]
  /** skip specifies whether to skip this rpc method when generating commands. */
  skip?: boolean
}

/** ServiceCommandDescriptor describes a CLI command based on a protobuf service. */
export interface CosmosAutocliV1ServiceCommandDescriptor {
  /**
   * service is the fully qualified name of the protobuf service to build
   * the command from. It can be left empty if sub_commands are used instead
   * which may be the case if a module provides multiple tx and/or query services.
   */
  service?: string
  /**
   * rpc_command_options are options for commands generated from rpc methods.
   * If no options are specified for a given rpc method on the service, a
   * command will be generated for that method with the default options.
   */
  rpc_command_options?: CosmosAutocliV1RpcCommandOptions[]
  /**
   * sub_commands is a map of optional sub-commands for this command based on
   * different protobuf services. The map key is used as the name of the
   * sub-command.
   */
  sub_commands?: Record<string, CosmosAutocliV1ServiceCommandDescriptor>
  /**
   * enhance_custom_commands specifies whether to skip the service when generating commands, if a custom command already
   * exists, or enhance the existing command. If set to true, the custom command will be enhanced with the services from
   * gRPC. otherwise when a custom command exists, no commands will be generated for the service.
   */
  enhance_custom_command?: boolean
}

/**
 * DenomOwner defines structure representing an account that owns or holds a
 * particular denominated token. It contains the account address and account
 * balance of the denominated token.
 *
 * Since: cosmos-sdk 0.46
 */
export interface CosmosBankV1Beta1DenomOwner {
  /** address defines the address that owns a particular denomination. */
  address?: string
  /** balance is the balance of the denominated coin for an account. */
  balance?: CosmosBaseV1Beta1Coin
}

/**
 * DenomUnit represents a struct that describes a given
 * denomination unit of the basic token.
 */
export interface CosmosBankV1Beta1DenomUnit {
  /** denom represents the string name of the given denom unit (e.g uatom). */
  denom?: string
  /**
   * exponent represents power of 10 exponent that one must
   * raise the base_denom to in order to equal the given DenomUnit's denom
   * 1 denom = 10^exponent base_denom
   * (e.g. with a base_denom of uatom, one can create a DenomUnit of 'atom' with
   * exponent = 6, thus: 1 atom = 10^6 uatom).
   * @format int64
   */
  exponent?: number
  /** aliases is a list of string aliases for the given denom */
  aliases?: string[]
}

/**
 * Metadata represents a struct that describes
 * a basic token.
 */
export interface CosmosBankV1Beta1Metadata {
  description?: string
  /** denom_units represents the list of DenomUnit's for a given coin */
  denom_units?: CosmosBankV1Beta1DenomUnit[]
  /** base represents the base denom (should be the DenomUnit with exponent = 0). */
  base?: string
  /**
   * display indicates the suggested denom that should be
   * displayed in clients.
   */
  display?: string
  /**
   * name defines the name of the token (eg: Cosmos Atom)
   * Since: cosmos-sdk 0.43
   */
  name?: string
  /**
   * symbol is the token symbol usually shown on exchanges (eg: ATOM). This can
   * be the same as the display.
   *
   * Since: cosmos-sdk 0.43
   */
  symbol?: string
  /**
   * URI to a document (on or off-chain) that contains additional information. Optional.
   *
   * Since: cosmos-sdk 0.46
   */
  uri?: string
  /**
   * URIHash is a sha256 hash of a document pointed by URI. It's used to verify that
   * the document didn't change. Optional.
   *
   * Since: cosmos-sdk 0.46
   */
  uri_hash?: string
}

/** Params defines the parameters for the bank module. */
export interface CosmosBankV1Beta1Params {
  /**
   * Deprecated: Use of SendEnabled in params is deprecated.
   * For genesis, use the newly added send_enabled field in the genesis object.
   * Storage, lookup, and manipulation of this information is now in the keeper.
   *
   * As of cosmos-sdk 0.47, this only exists for backwards compatibility of genesis files.
   */
  send_enabled?: CosmosBankV1Beta1SendEnabled[]
  default_send_enabled?: boolean
}

/**
 * QueryAllBalancesResponse is the response type for the Query/AllBalances RPC
 * method.
 */
export interface CosmosBankV1Beta1QueryAllBalancesResponse {
  /** balances is the balances of all the coins. */
  balances?: CosmosBaseV1Beta1Coin[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** QueryBalanceResponse is the response type for the Query/Balance RPC method. */
export interface CosmosBankV1Beta1QueryBalanceResponse {
  /** balance is the balance of the coin. */
  balance?: CosmosBaseV1Beta1Coin
}

/**
 * QueryDenomMetadataByQueryStringResponse is the response type for the Query/DenomMetadata RPC
 * method. Identical with QueryDenomMetadataResponse but receives denom as query string in request.
 */
export interface CosmosBankV1Beta1QueryDenomMetadataByQueryStringResponse {
  /** metadata describes and provides all the client information for the requested token. */
  metadata?: CosmosBankV1Beta1Metadata
}

/**
 * QueryDenomMetadataResponse is the response type for the Query/DenomMetadata RPC
 * method.
 */
export interface CosmosBankV1Beta1QueryDenomMetadataResponse {
  /** metadata describes and provides all the client information for the requested token. */
  metadata?: CosmosBankV1Beta1Metadata
}

/**
 * QueryDenomOwnersResponse defines the RPC response of a DenomOwners RPC query.
 *
 * Since: cosmos-sdk 0.46
 */
export interface CosmosBankV1Beta1QueryDenomOwnersResponse {
  denom_owners?: CosmosBankV1Beta1DenomOwner[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/**
 * QueryDenomsMetadataResponse is the response type for the Query/DenomsMetadata RPC
 * method.
 */
export interface CosmosBankV1Beta1QueryDenomsMetadataResponse {
  /** metadata provides the client information for all the registered tokens. */
  metadatas?: CosmosBankV1Beta1Metadata[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** QueryParamsResponse defines the response type for querying x/bank parameters. */
export interface CosmosBankV1Beta1QueryParamsResponse {
  /** params provides the parameters of the bank module. */
  params?: CosmosBankV1Beta1Params
}

/**
 * QuerySendEnabledResponse defines the RPC response of a SendEnable query.
 *
 * Since: cosmos-sdk 0.47
 */
export interface CosmosBankV1Beta1QuerySendEnabledResponse {
  send_enabled?: CosmosBankV1Beta1SendEnabled[]
  /**
   * pagination defines the pagination in the response. This field is only
   * populated if the denoms field in the request is empty.
   */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/**
 * QuerySpendableBalanceByDenomResponse defines the gRPC response structure for
 * querying an account's spendable balance for a specific denom.
 *
 * Since: cosmos-sdk 0.47
 */
export interface CosmosBankV1Beta1QuerySpendableBalanceByDenomResponse {
  /** balance is the balance of the coin. */
  balance?: CosmosBaseV1Beta1Coin
}

/**
 * QuerySpendableBalancesResponse defines the gRPC response structure for querying
 * an account's spendable balances.
 *
 * Since: cosmos-sdk 0.46
 */
export interface CosmosBankV1Beta1QuerySpendableBalancesResponse {
  /** balances is the spendable balances of all the coins. */
  balances?: CosmosBaseV1Beta1Coin[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** QuerySupplyOfResponse is the response type for the Query/SupplyOf RPC method. */
export interface CosmosBankV1Beta1QuerySupplyOfResponse {
  /** amount is the supply of the coin. */
  amount?: CosmosBaseV1Beta1Coin
}

/**
 * QueryTotalSupplyResponse is the response type for the Query/TotalSupply RPC
 * method
 */
export interface CosmosBankV1Beta1QueryTotalSupplyResponse {
  /** supply is the supply of the coins */
  supply?: CosmosBaseV1Beta1Coin[]
  /**
   * pagination defines the pagination in the response.
   *
   * Since: cosmos-sdk 0.43
   */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/**
 * SendEnabled maps coin denom to a send_enabled status (whether a denom is
 * sendable).
 */
export interface CosmosBankV1Beta1SendEnabled {
  denom?: string
  enabled?: boolean
}

/**
 * Coin defines a token with a denomination and an amount.
 *
 * NOTE: The amount field is an Int which implements the custom method
 * signatures required by gogoproto.
 */
export interface CosmosBaseV1Beta1Coin {
  denom?: string
  amount?: string
}

/** ConfigResponse defines the response structure for the Config gRPC query. */
export interface CosmosBaseNodeV1Beta1ConfigResponse {
  minimum_gas_price?: string
  /** pruning settings */
  pruning_keep_recent?: string
  pruning_interval?: string
}

/** StateResponse defines the response structure for the status of a node. */
export interface CosmosBaseNodeV1Beta1StatusResponse {
  /** @format uint64 */
  earliest_store_height?: string
  /** @format uint64 */
  height?: string
  /** @format date-time */
  timestamp?: string
  /** @format byte */
  app_hash?: string
  /** @format byte */
  validator_hash?: string
}

/**
 * ABCIQueryResponse defines the response structure for the ABCIQuery gRPC query.
 *
 * Note: This type is a duplicate of the ResponseQuery proto type defined in
 * Tendermint.
 */
export interface CosmosBaseTendermintV1Beta1ABCIQueryResponse {
  /** @format int64 */
  code?: number
  log?: string
  info?: string
  /** @format int64 */
  index?: string
  /** @format byte */
  key?: string
  /** @format byte */
  value?: string
  /**
   * ProofOps is Merkle proof defined by the list of ProofOps.
   *
   * Note: This type is a duplicate of the ProofOps proto type defined in Tendermint.
   */
  proof_ops?: CosmosBaseTendermintV1Beta1ProofOps
  /** @format int64 */
  height?: string
  codespace?: string
}

/**
 * Block is tendermint type Block, with the Header proposer address
 * field converted to bech32 string.
 */
export interface CosmosBaseTendermintV1Beta1Block {
  /** Header defines the structure of a Tendermint block header. */
  header?: CosmosBaseTendermintV1Beta1Header
  data?: TendermintTypesData
  evidence?: TendermintTypesEvidenceList
  /** Commit contains the evidence that a block was committed by a set of validators. */
  last_commit?: TendermintTypesCommit
}

/** GetBlockByHeightResponse is the response type for the Query/GetBlockByHeight RPC method. */
export interface CosmosBaseTendermintV1Beta1GetBlockByHeightResponse {
  block_id?: TendermintTypesBlockID
  /** Deprecated: please use `sdk_block` instead */
  block?: TendermintTypesBlock
  /**
   * Since: cosmos-sdk 0.47
   * Block is tendermint type Block, with the Header proposer address
   * field converted to bech32 string.
   */
  sdk_block?: CosmosBaseTendermintV1Beta1Block
}

/** GetLatestBlockResponse is the response type for the Query/GetLatestBlock RPC method. */
export interface CosmosBaseTendermintV1Beta1GetLatestBlockResponse {
  block_id?: TendermintTypesBlockID
  /** Deprecated: please use `sdk_block` instead */
  block?: TendermintTypesBlock
  /**
   * Since: cosmos-sdk 0.47
   * Block is tendermint type Block, with the Header proposer address
   * field converted to bech32 string.
   */
  sdk_block?: CosmosBaseTendermintV1Beta1Block
}

/** GetLatestValidatorSetResponse is the response type for the Query/GetValidatorSetByHeight RPC method. */
export interface CosmosBaseTendermintV1Beta1GetLatestValidatorSetResponse {
  /** @format int64 */
  block_height?: string
  validators?: CosmosBaseTendermintV1Beta1Validator[]
  /** pagination defines an pagination for the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** GetNodeInfoResponse is the response type for the Query/GetNodeInfo RPC method. */
export interface CosmosBaseTendermintV1Beta1GetNodeInfoResponse {
  default_node_info?: TendermintP2PDefaultNodeInfo
  /** VersionInfo is the type for the GetNodeInfoResponse message. */
  application_version?: CosmosBaseTendermintV1Beta1VersionInfo
}

/** GetSyncingResponse is the response type for the Query/GetSyncing RPC method. */
export interface CosmosBaseTendermintV1Beta1GetSyncingResponse {
  syncing?: boolean
}

/** GetValidatorSetByHeightResponse is the response type for the Query/GetValidatorSetByHeight RPC method. */
export interface CosmosBaseTendermintV1Beta1GetValidatorSetByHeightResponse {
  /** @format int64 */
  block_height?: string
  validators?: CosmosBaseTendermintV1Beta1Validator[]
  /** pagination defines an pagination for the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** Header defines the structure of a Tendermint block header. */
export interface CosmosBaseTendermintV1Beta1Header {
  /**
   * basic block info
   * Consensus captures the consensus rules for processing a block in the blockchain,
   * including all blockchain data structures and the rules of the application's
   * state transition machine.
   */
  version?: TendermintVersionConsensus
  chain_id?: string
  /** @format int64 */
  height?: string
  /** @format date-time */
  time?: string
  /** prev block info */
  last_block_id?: TendermintTypesBlockID
  /**
   * hashes of block data
   * @format byte
   */
  last_commit_hash?: string
  /** @format byte */
  data_hash?: string
  /**
   * hashes from the app output from the prev block
   * @format byte
   */
  validators_hash?: string
  /** @format byte */
  next_validators_hash?: string
  /** @format byte */
  consensus_hash?: string
  /** @format byte */
  app_hash?: string
  /** @format byte */
  last_results_hash?: string
  /**
   * consensus info
   * @format byte
   */
  evidence_hash?: string
  /**
   * proposer_address is the original block proposer address, formatted as a Bech32 string.
   * In Tendermint, this type is `bytes`, but in the SDK, we convert it to a Bech32 string
   * for better UX.
   */
  proposer_address?: string
}

/** Module is the type for VersionInfo */
export interface CosmosBaseTendermintV1Beta1Module {
  /** module path */
  path?: string
  /** module version */
  version?: string
  /** checksum */
  sum?: string
}

/**
 * ProofOp defines an operation used for calculating Merkle root. The data could
 * be arbitrary format, providing necessary data for example neighbouring node
 * hash.
 *
 * Note: This type is a duplicate of the ProofOp proto type defined in Tendermint.
 */
export interface CosmosBaseTendermintV1Beta1ProofOp {
  type?: string
  /** @format byte */
  key?: string
  /** @format byte */
  data?: string
}

/**
 * ProofOps is Merkle proof defined by the list of ProofOps.
 *
 * Note: This type is a duplicate of the ProofOps proto type defined in Tendermint.
 */
export interface CosmosBaseTendermintV1Beta1ProofOps {
  ops?: CosmosBaseTendermintV1Beta1ProofOp[]
}

/** Validator is the type for the validator-set. */
export interface CosmosBaseTendermintV1Beta1Validator {
  address?: string
  /**
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   *
   * Example 1: Pack and unpack a message in C++.
   *
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   *
   * Example 2: Pack and unpack a message in Java.
   *
   *     Foo foo = ...;
   *     Any any = Any.pack(foo);
   *     ...
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *     }
   *
   * Example 3: Pack and unpack a message in Python.
   *
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     ...
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *       ...
   *
   * Example 4: Pack and unpack a message in Go
   *
   *      foo := &pb.Foo{...}
   *      any, err := anypb.New(foo)
   *      if err != nil {
   *        ...
   *      }
   *      ...
   *      foo := &pb.Foo{}
   *      if err := any.UnmarshalTo(foo); err != nil {
   *        ...
   *      }
   *
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   *
   *
   * JSON
   *
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     }
   *
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   *     }
   *
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *
   *     {
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   *     }
   */
  pub_key?: GoogleProtobufAny
  /** @format int64 */
  voting_power?: string
  /** @format int64 */
  proposer_priority?: string
}

/** VersionInfo is the type for the GetNodeInfoResponse message. */
export interface CosmosBaseTendermintV1Beta1VersionInfo {
  name?: string
  app_name?: string
  version?: string
  git_commit?: string
  build_tags?: string
  go_version?: string
  build_deps?: CosmosBaseTendermintV1Beta1Module[]
  /** Since: cosmos-sdk 0.43 */
  cosmos_sdk_version?: string
}

/** PublicKey defines the keys available for use with Validators */
export interface TendermintCryptoPublicKey {
  /** @format byte */
  ed25519?: string
  /** @format byte */
  secp256k1?: string
}

export interface TendermintP2PDefaultNodeInfo {
  protocol_version?: TendermintP2PProtocolVersion
  default_node_id?: string
  listen_addr?: string
  network?: string
  version?: string
  /** @format byte */
  channels?: string
  moniker?: string
  other?: TendermintP2PDefaultNodeInfoOther
}

export interface TendermintP2PDefaultNodeInfoOther {
  tx_index?: string
  rpc_address?: string
}

export interface TendermintP2PProtocolVersion {
  /** @format uint64 */
  p2p?: string
  /** @format uint64 */
  block?: string
  /** @format uint64 */
  app?: string
}

export interface TendermintTypesBlock {
  /** Header defines the structure of a block header. */
  header?: TendermintTypesHeader
  data?: TendermintTypesData
  evidence?: TendermintTypesEvidenceList
  /** Commit contains the evidence that a block was committed by a set of validators. */
  last_commit?: TendermintTypesCommit
}

/** BlockID */
export interface TendermintTypesBlockID {
  /** @format byte */
  hash?: string
  part_set_header?: TendermintTypesPartSetHeader
}

/**
 * BlockIdFlag indicates which BlockID the signature is for
 * @default "BLOCK_ID_FLAG_UNKNOWN"
 */
export enum TendermintTypesBlockIDFlag {
  BLOCK_ID_FLAG_UNKNOWN = 'BLOCK_ID_FLAG_UNKNOWN',
  BLOCK_ID_FLAG_ABSENT = 'BLOCK_ID_FLAG_ABSENT',
  BLOCK_ID_FLAG_COMMIT = 'BLOCK_ID_FLAG_COMMIT',
  BLOCK_ID_FLAG_NIL = 'BLOCK_ID_FLAG_NIL',
}

/** Commit contains the evidence that a block was committed by a set of validators. */
export interface TendermintTypesCommit {
  /** @format int64 */
  height?: string
  /** @format int32 */
  round?: number
  block_id?: TendermintTypesBlockID
  signatures?: TendermintTypesCommitSig[]
}

/** CommitSig is a part of the Vote included in a Commit. */
export interface TendermintTypesCommitSig {
  block_id_flag?: TendermintTypesBlockIDFlag
  /** @format byte */
  validator_address?: string
  /** @format date-time */
  timestamp?: string
  /** @format byte */
  signature?: string
}

/** Data contains the set of transactions included in the block */
export interface TendermintTypesData {
  /**
   * Txs that will be applied by state @ block.Height+1.
   * NOTE: not all txs here are valid.  We're just agreeing on the order first.
   * This means that block.AppHash does not include these txs.
   */
  txs?: string[]
}

/** DuplicateVoteEvidence contains evidence of a validator signed two conflicting votes. */
export interface TendermintTypesDuplicateVoteEvidence {
  /**
   * Vote represents a prevote or precommit vote from validators for
   * consensus.
   */
  vote_a?: TendermintTypesVote
  /**
   * Vote represents a prevote or precommit vote from validators for
   * consensus.
   */
  vote_b?: TendermintTypesVote
  /** @format int64 */
  total_voting_power?: string
  /** @format int64 */
  validator_power?: string
  /** @format date-time */
  timestamp?: string
}

export interface TendermintTypesEvidence {
  /** DuplicateVoteEvidence contains evidence of a validator signed two conflicting votes. */
  duplicate_vote_evidence?: TendermintTypesDuplicateVoteEvidence
  /** LightClientAttackEvidence contains evidence of a set of validators attempting to mislead a light client. */
  light_client_attack_evidence?: TendermintTypesLightClientAttackEvidence
}

export interface TendermintTypesEvidenceList {
  evidence?: TendermintTypesEvidence[]
}

/** Header defines the structure of a block header. */
export interface TendermintTypesHeader {
  /**
   * basic block info
   * Consensus captures the consensus rules for processing a block in the blockchain,
   * including all blockchain data structures and the rules of the application's
   * state transition machine.
   */
  version?: TendermintVersionConsensus
  chain_id?: string
  /** @format int64 */
  height?: string
  /** @format date-time */
  time?: string
  /** prev block info */
  last_block_id?: TendermintTypesBlockID
  /**
   * hashes of block data
   * @format byte
   */
  last_commit_hash?: string
  /** @format byte */
  data_hash?: string
  /**
   * hashes from the app output from the prev block
   * @format byte
   */
  validators_hash?: string
  /** @format byte */
  next_validators_hash?: string
  /** @format byte */
  consensus_hash?: string
  /** @format byte */
  app_hash?: string
  /** @format byte */
  last_results_hash?: string
  /**
   * consensus info
   * @format byte
   */
  evidence_hash?: string
  /** @format byte */
  proposer_address?: string
}

export interface TendermintTypesLightBlock {
  signed_header?: TendermintTypesSignedHeader
  validator_set?: TendermintTypesValidatorSet
}

/** LightClientAttackEvidence contains evidence of a set of validators attempting to mislead a light client. */
export interface TendermintTypesLightClientAttackEvidence {
  conflicting_block?: TendermintTypesLightBlock
  /** @format int64 */
  common_height?: string
  byzantine_validators?: TendermintTypesValidator[]
  /** @format int64 */
  total_voting_power?: string
  /** @format date-time */
  timestamp?: string
}

/** PartsetHeader */
export interface TendermintTypesPartSetHeader {
  /** @format int64 */
  total?: number
  /** @format byte */
  hash?: string
}

export interface TendermintTypesSignedHeader {
  /** Header defines the structure of a block header. */
  header?: TendermintTypesHeader
  /** Commit contains the evidence that a block was committed by a set of validators. */
  commit?: TendermintTypesCommit
}

/**
 * SignedMsgType is a type of signed message in the consensus.
 *
 *  - SIGNED_MSG_TYPE_PREVOTE: Votes
 *  - SIGNED_MSG_TYPE_PROPOSAL: Proposals
 * @default "SIGNED_MSG_TYPE_UNKNOWN"
 */
export enum TendermintTypesSignedMsgType {
  SIGNED_MSG_TYPE_UNKNOWN = 'SIGNED_MSG_TYPE_UNKNOWN',
  SIGNED_MSG_TYPE_PREVOTE = 'SIGNED_MSG_TYPE_PREVOTE',
  SIGNED_MSG_TYPE_PRECOMMIT = 'SIGNED_MSG_TYPE_PRECOMMIT',
  SIGNED_MSG_TYPE_PROPOSAL = 'SIGNED_MSG_TYPE_PROPOSAL',
}

export interface TendermintTypesValidator {
  /** @format byte */
  address?: string
  pub_key?: TendermintCryptoPublicKey
  /** @format int64 */
  voting_power?: string
  /** @format int64 */
  proposer_priority?: string
}

export interface TendermintTypesValidatorSet {
  validators?: TendermintTypesValidator[]
  proposer?: TendermintTypesValidator
  /** @format int64 */
  total_voting_power?: string
}

/**
 * Vote represents a prevote or precommit vote from validators for
 * consensus.
 */
export interface TendermintTypesVote {
  /**
   * SignedMsgType is a type of signed message in the consensus.
   *
   *  - SIGNED_MSG_TYPE_PREVOTE: Votes
   *  - SIGNED_MSG_TYPE_PROPOSAL: Proposals
   */
  type?: TendermintTypesSignedMsgType
  /** @format int64 */
  height?: string
  /** @format int32 */
  round?: number
  block_id?: TendermintTypesBlockID
  /** @format date-time */
  timestamp?: string
  /** @format byte */
  validator_address?: string
  /** @format int32 */
  validator_index?: number
  /**
   * Vote signature by the validator if they participated in consensus for the
   * associated block.
   * @format byte
   */
  signature?: string
  /**
   * Vote extension provided by the application. Only valid for precommit
   * messages.
   * @format byte
   */
  extension?: string
  /**
   * Vote extension signature by the validator if they participated in
   * consensus for the associated block.
   * Only valid for precommit messages.
   * @format byte
   */
  extension_signature?: string
}

/**
 * Consensus captures the consensus rules for processing a block in the blockchain,
 * including all blockchain data structures and the rules of the application's
 * state transition machine.
 */
export interface TendermintVersionConsensus {
  /** @format uint64 */
  block?: string
  /** @format uint64 */
  app?: string
}

/** AccountResponse is the response type for the Query/Account RPC method. */
export interface CosmosCircuitV1AccountResponse {
  /**
   * Permissions are the permissions that an account has to trip
   * or reset the circuit breaker.
   */
  permission?: CosmosCircuitV1Permissions
}

/** AccountsResponse is the response type for the Query/Accounts RPC method. */
export interface CosmosCircuitV1AccountsResponse {
  accounts?: CosmosCircuitV1GenesisAccountPermissions[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** DisabledListResponse is the response type for the Query/DisabledList RPC method. */
export interface CosmosCircuitV1DisabledListResponse {
  disabled_list?: string[]
}

/** GenesisAccountPermissions is the account permissions for the circuit breaker in genesis */
export interface CosmosCircuitV1GenesisAccountPermissions {
  address?: string
  /**
   * Permissions are the permissions that an account has to trip
   * or reset the circuit breaker.
   */
  permissions?: CosmosCircuitV1Permissions
}

/**
 * Permissions are the permissions that an account has to trip
 * or reset the circuit breaker.
 */
export interface CosmosCircuitV1Permissions {
  /** level is the level of permissions granted to this account. */
  level?: CosmosCircuitV1PermissionsLevel
  /**
   * limit_type_urls is used with LEVEL_SOME_MSGS to limit the lists of Msg type
   * URLs that the account can trip. It is an error to use limit_type_urls with
   * a level other than LEVEL_SOME_MSGS.
   */
  limit_type_urls?: string[]
}

/**
 * Level is the permission level.
 *
 *  - LEVEL_NONE_UNSPECIFIED: LEVEL_NONE_UNSPECIFIED indicates that the account will have no circuit
 * breaker permissions.
 *  - LEVEL_SOME_MSGS: LEVEL_SOME_MSGS indicates that the account will have permission to
 * trip or reset the circuit breaker for some Msg type URLs. If this level
 * is chosen, a non-empty list of Msg type URLs must be provided in
 * limit_type_urls.
 *  - LEVEL_ALL_MSGS: LEVEL_ALL_MSGS indicates that the account can trip or reset the circuit
 * breaker for Msg's of all type URLs.
 *  - LEVEL_SUPER_ADMIN: LEVEL_SUPER_ADMIN indicates that the account can take all circuit breaker
 * actions and can grant permissions to other accounts.
 * @default "LEVEL_NONE_UNSPECIFIED"
 */
export enum CosmosCircuitV1PermissionsLevel {
  LEVEL_NONE_UNSPECIFIED = 'LEVEL_NONE_UNSPECIFIED',
  LEVEL_SOME_MSGS = 'LEVEL_SOME_MSGS',
  LEVEL_ALL_MSGS = 'LEVEL_ALL_MSGS',
  LEVEL_SUPER_ADMIN = 'LEVEL_SUPER_ADMIN',
}

/** QueryParamsResponse defines the response type for querying x/consensus parameters. */
export interface CosmosConsensusV1QueryParamsResponse {
  /**
   * params are the tendermint consensus params stored in the consensus module.
   * Please note that `params.version` is not populated in this response, it is
   * tracked separately in the x/upgrade module.
   */
  params?: TendermintTypesConsensusParams
}

/** ABCIParams configure functionality specific to the Application Blockchain Interface. */
export interface TendermintTypesABCIParams {
  /**
   * vote_extensions_enable_height configures the first height during which
   * vote extensions will be enabled. During this specified height, and for all
   * subsequent heights, precommit messages that do not contain valid extension data
   * will be considered invalid. Prior to this height, vote extensions will not
   * be used or accepted by validators on the network.
   *
   * Once enabled, vote extensions will be created by the application in ExtendVote,
   * passed to the application for validation in VerifyVoteExtension and given
   * to the application to use when proposing a block during PrepareProposal.
   * @format int64
   */
  vote_extensions_enable_height?: string
}

/** BlockParams contains limits on the block size. */
export interface TendermintTypesBlockParams {
  /**
   * Max block size, in bytes.
   * Note: must be greater than 0
   * @format int64
   */
  max_bytes?: string
  /**
   * Max gas per block.
   * Note: must be greater or equal to -1
   * @format int64
   */
  max_gas?: string
}

/**
 * ConsensusParams contains consensus critical parameters that determine the
 * validity of blocks.
 */
export interface TendermintTypesConsensusParams {
  /** BlockParams contains limits on the block size. */
  block?: TendermintTypesBlockParams
  /** EvidenceParams determine how we handle evidence of malfeasance. */
  evidence?: TendermintTypesEvidenceParams
  /**
   * ValidatorParams restrict the public key types validators can use.
   * NOTE: uses ABCI pubkey naming, not Amino names.
   */
  validator?: TendermintTypesValidatorParams
  /** VersionParams contains the ABCI application version. */
  version?: TendermintTypesVersionParams
  /** ABCIParams configure functionality specific to the Application Blockchain Interface. */
  abci?: TendermintTypesABCIParams
}

/** EvidenceParams determine how we handle evidence of malfeasance. */
export interface TendermintTypesEvidenceParams {
  /**
   * Max age of evidence, in blocks.
   *
   * The basic formula for calculating this is: MaxAgeDuration / {average block
   * time}.
   * @format int64
   */
  max_age_num_blocks?: string
  /**
   * Max age of evidence, in time.
   *
   * It should correspond with an app's "unbonding period" or other similar
   * mechanism for handling [Nothing-At-Stake
   * attacks](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed).
   */
  max_age_duration?: string
  /**
   * This sets the maximum size of total evidence in bytes that can be committed in a single block.
   * and should fall comfortably under the max block bytes.
   * Default is 1048576 or 1MB
   * @format int64
   */
  max_bytes?: string
}

/**
 * ValidatorParams restrict the public key types validators can use.
 * NOTE: uses ABCI pubkey naming, not Amino names.
 */
export interface TendermintTypesValidatorParams {
  pub_key_types?: string[]
}

/** VersionParams contains the ABCI application version. */
export interface TendermintTypesVersionParams {
  /** @format uint64 */
  app?: string
}

/**
 * DecCoin defines a token with a denomination and a decimal amount.
 *
 * NOTE: The amount field is an Dec which implements the custom method
 * signatures required by gogoproto.
 */
export interface CosmosBaseV1Beta1DecCoin {
  denom?: string
  amount?: string
}

/**
 * DelegationDelegatorReward represents the properties
 * of a delegator's delegation reward.
 */
export interface CosmosDistributionV1Beta1DelegationDelegatorReward {
  validator_address?: string
  reward?: CosmosBaseV1Beta1DecCoin[]
}

/** Params defines the set of params for the distribution module. */
export interface CosmosDistributionV1Beta1Params {
  community_tax?: string
  /**
   * Deprecated: The base_proposer_reward field is deprecated and is no longer used
   * in the x/distribution module's reward mechanism.
   */
  base_proposer_reward?: string
  /**
   * Deprecated: The bonus_proposer_reward field is deprecated and is no longer used
   * in the x/distribution module's reward mechanism.
   */
  bonus_proposer_reward?: string
  withdraw_addr_enabled?: boolean
}

/**
 * QueryCommunityPoolResponse is the response type for the Query/CommunityPool
 * RPC method.
 */
export interface CosmosDistributionV1Beta1QueryCommunityPoolResponse {
  /** pool defines community pool's coins. */
  pool?: CosmosBaseV1Beta1DecCoin[]
}

/**
 * QueryDelegationRewardsResponse is the response type for the
 * Query/DelegationRewards RPC method.
 */
export interface CosmosDistributionV1Beta1QueryDelegationRewardsResponse {
  /** rewards defines the rewards accrued by a delegation. */
  rewards?: CosmosBaseV1Beta1DecCoin[]
}

/**
 * QueryDelegationTotalRewardsResponse is the response type for the
 * Query/DelegationTotalRewards RPC method.
 */
export interface CosmosDistributionV1Beta1QueryDelegationTotalRewardsResponse {
  /** rewards defines all the rewards accrued by a delegator. */
  rewards?: CosmosDistributionV1Beta1DelegationDelegatorReward[]
  /** total defines the sum of all the rewards. */
  total?: CosmosBaseV1Beta1DecCoin[]
}

/**
 * QueryDelegatorValidatorsResponse is the response type for the
 * Query/DelegatorValidators RPC method.
 */
export interface CosmosDistributionV1Beta1QueryDelegatorValidatorsResponse {
  /** validators defines the validators a delegator is delegating for. */
  validators?: string[]
}

/**
 * QueryDelegatorWithdrawAddressResponse is the response type for the
 * Query/DelegatorWithdrawAddress RPC method.
 */
export interface CosmosDistributionV1Beta1QueryDelegatorWithdrawAddressResponse {
  /** withdraw_address defines the delegator address to query for. */
  withdraw_address?: string
}

/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface CosmosDistributionV1Beta1QueryParamsResponse {
  /** params defines the parameters of the module. */
  params?: CosmosDistributionV1Beta1Params
}

/**
 * QueryValidatorCommissionResponse is the response type for the
 * Query/ValidatorCommission RPC method
 */
export interface CosmosDistributionV1Beta1QueryValidatorCommissionResponse {
  /** commission defines the commission the validator received. */
  commission?: CosmosDistributionV1Beta1ValidatorAccumulatedCommission
}

/** QueryValidatorDistributionInfoResponse is the response type for the Query/ValidatorDistributionInfo RPC method. */
export interface CosmosDistributionV1Beta1QueryValidatorDistributionInfoResponse {
  /** operator_address defines the validator operator address. */
  operator_address?: string
  /** self_bond_rewards defines the self delegations rewards. */
  self_bond_rewards?: CosmosBaseV1Beta1DecCoin[]
  /** commission defines the commission the validator received. */
  commission?: CosmosBaseV1Beta1DecCoin[]
}

/**
 * QueryValidatorOutstandingRewardsResponse is the response type for the
 * Query/ValidatorOutstandingRewards RPC method.
 */
export interface CosmosDistributionV1Beta1QueryValidatorOutstandingRewardsResponse {
  /**
   * ValidatorOutstandingRewards represents outstanding (un-withdrawn) rewards
   * for a validator inexpensive to track, allows simple sanity checks.
   */
  rewards?: CosmosDistributionV1Beta1ValidatorOutstandingRewards
}

/**
 * QueryValidatorSlashesResponse is the response type for the
 * Query/ValidatorSlashes RPC method.
 */
export interface CosmosDistributionV1Beta1QueryValidatorSlashesResponse {
  /** slashes defines the slashes the validator received. */
  slashes?: CosmosDistributionV1Beta1ValidatorSlashEvent[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/**
 * ValidatorAccumulatedCommission represents accumulated commission
 * for a validator kept as a running counter, can be withdrawn at any time.
 */
export interface CosmosDistributionV1Beta1ValidatorAccumulatedCommission {
  commission?: CosmosBaseV1Beta1DecCoin[]
}

/**
 * ValidatorOutstandingRewards represents outstanding (un-withdrawn) rewards
 * for a validator inexpensive to track, allows simple sanity checks.
 */
export interface CosmosDistributionV1Beta1ValidatorOutstandingRewards {
  rewards?: CosmosBaseV1Beta1DecCoin[]
}

/**
 * ValidatorSlashEvent represents a validator slash event.
 * Height is implicit within the store key.
 * This is needed to calculate appropriate amount of staking tokens
 * for delegations which are withdrawn after a slash has occurred.
 */
export interface CosmosDistributionV1Beta1ValidatorSlashEvent {
  /** @format uint64 */
  validator_period?: string
  fraction?: string
}

/**
 * QueryAllEvidenceResponse is the response type for the Query/AllEvidence RPC
 * method.
 */
export interface CosmosEvidenceV1Beta1QueryAllEvidenceResponse {
  /** evidence returns all evidences. */
  evidence?: GoogleProtobufAny[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** QueryEvidenceResponse is the response type for the Query/Evidence RPC method. */
export interface CosmosEvidenceV1Beta1QueryEvidenceResponse {
  /** evidence returns the requested evidence. */
  evidence?: GoogleProtobufAny
}

/** Grant is stored in the KVStore to record a grant with full context */
export interface CosmosFeegrantV1Beta1Grant {
  /** granter is the address of the user granting an allowance of their funds. */
  granter?: string
  /** grantee is the address of the user being granted an allowance of another user's funds. */
  grantee?: string
  /** allowance can be any of basic, periodic, allowed fee allowance. */
  allowance?: GoogleProtobufAny
}

/** QueryAllowanceResponse is the response type for the Query/Allowance RPC method. */
export interface CosmosFeegrantV1Beta1QueryAllowanceResponse {
  /** allowance is a allowance granted for grantee by granter. */
  allowance?: CosmosFeegrantV1Beta1Grant
}

/**
 * QueryAllowancesByGranterResponse is the response type for the Query/AllowancesByGranter RPC method.
 *
 * Since: cosmos-sdk 0.46
 */
export interface CosmosFeegrantV1Beta1QueryAllowancesByGranterResponse {
  /** allowances that have been issued by the granter. */
  allowances?: CosmosFeegrantV1Beta1Grant[]
  /** pagination defines an pagination for the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** QueryAllowancesResponse is the response type for the Query/Allowances RPC method. */
export interface CosmosFeegrantV1Beta1QueryAllowancesResponse {
  /** allowances are allowance's granted for grantee by granter. */
  allowances?: CosmosFeegrantV1Beta1Grant[]
  /** pagination defines an pagination for the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/**
 * Deposit defines an amount deposited by an account address to an active
 * proposal.
 */
export interface CosmosGovV1Deposit {
  /**
   * proposal_id defines the unique id of the proposal.
   * @format uint64
   */
  proposal_id?: string
  /** depositor defines the deposit addresses from the proposals. */
  depositor?: string
  /** amount to be deposited by depositor. */
  amount?: CosmosBaseV1Beta1Coin[]
}

/** DepositParams defines the params for deposits on governance proposals. */
export interface CosmosGovV1DepositParams {
  /** Minimum deposit for a proposal to enter voting period. */
  min_deposit?: CosmosBaseV1Beta1Coin[]
  /**
   * Maximum period for Atom holders to deposit on a proposal. Initial value: 2
   * months.
   */
  max_deposit_period?: string
}

/**
 * Params defines the parameters for the x/gov module.
 *
 * Since: cosmos-sdk 0.47
 */
export interface CosmosGovV1Params {
  /** Minimum deposit for a proposal to enter voting period. */
  min_deposit?: CosmosBaseV1Beta1Coin[]
  /**
   * Maximum period for Atom holders to deposit on a proposal. Initial value: 2
   * months.
   */
  max_deposit_period?: string
  /** Duration of the voting period. */
  voting_period?: string
  /**
   * Minimum percentage of total stake needed to vote for a result to be
   *  considered valid.
   */
  quorum?: string
  /** Minimum proportion of Yes votes for proposal to pass. Default value: 0.5. */
  threshold?: string
  /**
   * Minimum value of Veto votes to Total votes ratio for proposal to be
   *  vetoed. Default value: 1/3.
   */
  veto_threshold?: string
  /** The ratio representing the proportion of the deposit value that must be paid at proposal submission. */
  min_initial_deposit_ratio?: string
  /**
   * The cancel ratio which will not be returned back to the depositors when a proposal is cancelled.
   *
   * Since: cosmos-sdk 0.50
   */
  proposal_cancel_ratio?: string
  /**
   * The address which will receive (proposal_cancel_ratio * deposit) proposal deposits.
   * If empty, the (proposal_cancel_ratio * deposit) proposal deposits will be burned.
   *
   * Since: cosmos-sdk 0.50
   */
  proposal_cancel_dest?: string
  /**
   * Duration of the voting period of an expedited proposal.
   *
   * Since: cosmos-sdk 0.50
   */
  expedited_voting_period?: string
  /**
   * Minimum proportion of Yes votes for proposal to pass. Default value: 0.67.
   *
   * Since: cosmos-sdk 0.50
   */
  expedited_threshold?: string
  /** Minimum expedited deposit for a proposal to enter voting period. */
  expedited_min_deposit?: CosmosBaseV1Beta1Coin[]
  /** burn deposits if a proposal does not meet quorum */
  burn_vote_quorum?: boolean
  /** burn deposits if the proposal does not enter voting period */
  burn_proposal_deposit_prevote?: boolean
  /** burn deposits if quorum with vote type no_veto is met */
  burn_vote_veto?: boolean
}

/** Proposal defines the core field members of a governance proposal. */
export interface CosmosGovV1Proposal {
  /**
   * id defines the unique id of the proposal.
   * @format uint64
   */
  id?: string
  /** messages are the arbitrary messages to be executed if the proposal passes. */
  messages?: GoogleProtobufAny[]
  /** status defines the proposal status. */
  status?: CosmosGovV1ProposalStatus
  /**
   * final_tally_result is the final tally result of the proposal. When
   * querying a proposal via gRPC, this field is not populated until the
   * proposal's voting period has ended.
   */
  final_tally_result?: CosmosGovV1TallyResult
  /**
   * submit_time is the time of proposal submission.
   * @format date-time
   */
  submit_time?: string
  /**
   * deposit_end_time is the end time for deposition.
   * @format date-time
   */
  deposit_end_time?: string
  /** total_deposit is the total deposit on the proposal. */
  total_deposit?: CosmosBaseV1Beta1Coin[]
  /**
   * voting_start_time is the starting time to vote on a proposal.
   * @format date-time
   */
  voting_start_time?: string
  /**
   * voting_end_time is the end time of voting on a proposal.
   * @format date-time
   */
  voting_end_time?: string
  /**
   * metadata is any arbitrary metadata attached to the proposal.
   * the recommended format of the metadata is to be found here:
   * https://docs.cosmos.network/v0.47/modules/gov#proposal-3
   */
  metadata?: string
  /**
   * title is the title of the proposal
   * Since: cosmos-sdk 0.47
   */
  title?: string
  /**
   * summary is a short summary of the proposal
   * Since: cosmos-sdk 0.47
   */
  summary?: string
  /**
   * proposer is the address of the proposal sumbitter
   * Since: cosmos-sdk 0.47
   */
  proposer?: string
  /**
   * expedited defines if the proposal is expedited
   * Since: cosmos-sdk 0.50
   */
  expedited?: boolean
  /**
   * failed_reason defines the reason why the proposal failed
   * Since: cosmos-sdk 0.50
   */
  failed_reason?: string
}

/**
 * ProposalStatus enumerates the valid statuses of a proposal.
 *
 *  - PROPOSAL_STATUS_UNSPECIFIED: PROPOSAL_STATUS_UNSPECIFIED defines the default proposal status.
 *  - PROPOSAL_STATUS_DEPOSIT_PERIOD: PROPOSAL_STATUS_DEPOSIT_PERIOD defines a proposal status during the deposit
 * period.
 *  - PROPOSAL_STATUS_VOTING_PERIOD: PROPOSAL_STATUS_VOTING_PERIOD defines a proposal status during the voting
 * period.
 *  - PROPOSAL_STATUS_PASSED: PROPOSAL_STATUS_PASSED defines a proposal status of a proposal that has
 * passed.
 *  - PROPOSAL_STATUS_REJECTED: PROPOSAL_STATUS_REJECTED defines a proposal status of a proposal that has
 * been rejected.
 *  - PROPOSAL_STATUS_FAILED: PROPOSAL_STATUS_FAILED defines a proposal status of a proposal that has
 * failed.
 * @default "PROPOSAL_STATUS_UNSPECIFIED"
 */
export enum CosmosGovV1ProposalStatus {
  PROPOSAL_STATUS_UNSPECIFIED = 'PROPOSAL_STATUS_UNSPECIFIED',
  PROPOSAL_STATUS_DEPOSIT_PERIOD = 'PROPOSAL_STATUS_DEPOSIT_PERIOD',
  PROPOSAL_STATUS_VOTING_PERIOD = 'PROPOSAL_STATUS_VOTING_PERIOD',
  PROPOSAL_STATUS_PASSED = 'PROPOSAL_STATUS_PASSED',
  PROPOSAL_STATUS_REJECTED = 'PROPOSAL_STATUS_REJECTED',
  PROPOSAL_STATUS_FAILED = 'PROPOSAL_STATUS_FAILED',
}

/** QueryConstitutionResponse is the response type for the Query/Constitution RPC method */
export interface CosmosGovV1QueryConstitutionResponse {
  constitution?: string
}

/** QueryDepositResponse is the response type for the Query/Deposit RPC method. */
export interface CosmosGovV1QueryDepositResponse {
  /** deposit defines the requested deposit. */
  deposit?: CosmosGovV1Deposit
}

/** QueryDepositsResponse is the response type for the Query/Deposits RPC method. */
export interface CosmosGovV1QueryDepositsResponse {
  /** deposits defines the requested deposits. */
  deposits?: CosmosGovV1Deposit[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface CosmosGovV1QueryParamsResponse {
  /**
   * Deprecated: Prefer to use `params` instead.
   * voting_params defines the parameters related to voting.
   */
  voting_params?: CosmosGovV1VotingParams
  /**
   * Deprecated: Prefer to use `params` instead.
   * deposit_params defines the parameters related to deposit.
   */
  deposit_params?: CosmosGovV1DepositParams
  /**
   * Deprecated: Prefer to use `params` instead.
   * tally_params defines the parameters related to tally.
   */
  tally_params?: CosmosGovV1TallyParams
  /**
   * params defines all the paramaters of x/gov module.
   *
   * Since: cosmos-sdk 0.47
   */
  params?: CosmosGovV1Params
}

/** QueryProposalResponse is the response type for the Query/Proposal RPC method. */
export interface CosmosGovV1QueryProposalResponse {
  /** proposal is the requested governance proposal. */
  proposal?: CosmosGovV1Proposal
}

/**
 * QueryProposalsResponse is the response type for the Query/Proposals RPC
 * method.
 */
export interface CosmosGovV1QueryProposalsResponse {
  /** proposals defines all the requested governance proposals. */
  proposals?: CosmosGovV1Proposal[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** QueryTallyResultResponse is the response type for the Query/Tally RPC method. */
export interface CosmosGovV1QueryTallyResultResponse {
  /** tally defines the requested tally. */
  tally?: CosmosGovV1TallyResult
}

/** QueryVoteResponse is the response type for the Query/Vote RPC method. */
export interface CosmosGovV1QueryVoteResponse {
  /** vote defines the queried vote. */
  vote?: CosmosGovV1Vote
}

/** QueryVotesResponse is the response type for the Query/Votes RPC method. */
export interface CosmosGovV1QueryVotesResponse {
  /** votes defines the queried votes. */
  votes?: CosmosGovV1Vote[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** TallyParams defines the params for tallying votes on governance proposals. */
export interface CosmosGovV1TallyParams {
  /**
   * Minimum percentage of total stake needed to vote for a result to be
   * considered valid.
   */
  quorum?: string
  /** Minimum proportion of Yes votes for proposal to pass. Default value: 0.5. */
  threshold?: string
  /**
   * Minimum value of Veto votes to Total votes ratio for proposal to be
   * vetoed. Default value: 1/3.
   */
  veto_threshold?: string
}

/** TallyResult defines a standard tally for a governance proposal. */
export interface CosmosGovV1TallyResult {
  /** yes_count is the number of yes votes on a proposal. */
  yes_count?: string
  /** abstain_count is the number of abstain votes on a proposal. */
  abstain_count?: string
  /** no_count is the number of no votes on a proposal. */
  no_count?: string
  /** no_with_veto_count is the number of no with veto votes on a proposal. */
  no_with_veto_count?: string
}

/**
 * Vote defines a vote on a governance proposal.
 * A Vote consists of a proposal ID, the voter, and the vote option.
 */
export interface CosmosGovV1Vote {
  /**
   * proposal_id defines the unique id of the proposal.
   * @format uint64
   */
  proposal_id?: string
  /** voter is the voter address of the proposal. */
  voter?: string
  /** options is the weighted vote options. */
  options?: CosmosGovV1WeightedVoteOption[]
  /**
   * metadata is any arbitrary metadata attached to the vote.
   * the recommended format of the metadata is to be found here: https://docs.cosmos.network/v0.47/modules/gov#vote-5
   */
  metadata?: string
}

/**
 * VoteOption enumerates the valid vote options for a given governance proposal.
 *
 *  - VOTE_OPTION_UNSPECIFIED: VOTE_OPTION_UNSPECIFIED defines a no-op vote option.
 *  - VOTE_OPTION_YES: VOTE_OPTION_YES defines a yes vote option.
 *  - VOTE_OPTION_ABSTAIN: VOTE_OPTION_ABSTAIN defines an abstain vote option.
 *  - VOTE_OPTION_NO: VOTE_OPTION_NO defines a no vote option.
 *  - VOTE_OPTION_NO_WITH_VETO: VOTE_OPTION_NO_WITH_VETO defines a no with veto vote option.
 * @default "VOTE_OPTION_UNSPECIFIED"
 */
export enum CosmosGovV1VoteOption {
  VOTE_OPTION_UNSPECIFIED = 'VOTE_OPTION_UNSPECIFIED',
  VOTE_OPTION_YES = 'VOTE_OPTION_YES',
  VOTE_OPTION_ABSTAIN = 'VOTE_OPTION_ABSTAIN',
  VOTE_OPTION_NO = 'VOTE_OPTION_NO',
  VOTE_OPTION_NO_WITH_VETO = 'VOTE_OPTION_NO_WITH_VETO',
}

/** VotingParams defines the params for voting on governance proposals. */
export interface CosmosGovV1VotingParams {
  /** Duration of the voting period. */
  voting_period?: string
}

/** WeightedVoteOption defines a unit of vote for vote split. */
export interface CosmosGovV1WeightedVoteOption {
  /** option defines the valid vote options, it must not contain duplicate vote options. */
  option?: CosmosGovV1VoteOption
  /** weight is the vote weight associated with the vote option. */
  weight?: string
}

/** GroupInfo represents the high-level on-chain information for a group. */
export interface CosmosGroupV1GroupInfo {
  /**
   * id is the unique ID of the group.
   * @format uint64
   */
  id?: string
  /** admin is the account address of the group's admin. */
  admin?: string
  /**
   * metadata is any arbitrary metadata to attached to the group.
   * the recommended format of the metadata is to be found here: https://docs.cosmos.network/v0.47/modules/group#group-1
   */
  metadata?: string
  /**
   * version is used to track changes to a group's membership structure that
   * would break existing proposals. Whenever any members weight is changed,
   * or any member is added or removed this version is incremented and will
   * cause proposals based on older versions of this group to fail
   * @format uint64
   */
  version?: string
  /** total_weight is the sum of the group members' weights. */
  total_weight?: string
  /**
   * created_at is a timestamp specifying when a group was created.
   * @format date-time
   */
  created_at?: string
}

/** GroupMember represents the relationship between a group and a member. */
export interface CosmosGroupV1GroupMember {
  /**
   * group_id is the unique ID of the group.
   * @format uint64
   */
  group_id?: string
  /** member is the member data. */
  member?: CosmosGroupV1Member
}

/** GroupPolicyInfo represents the high-level on-chain information for a group policy. */
export interface CosmosGroupV1GroupPolicyInfo {
  /** address is the account address of group policy. */
  address?: string
  /**
   * group_id is the unique ID of the group.
   * @format uint64
   */
  group_id?: string
  /** admin is the account address of the group admin. */
  admin?: string
  /**
   * metadata is any arbitrary metadata attached to the group policy.
   * the recommended format of the metadata is to be found here:
   * https://docs.cosmos.network/v0.47/modules/group#decision-policy-1
   */
  metadata?: string
  /**
   * version is used to track changes to a group's GroupPolicyInfo structure that
   * would create a different result on a running proposal.
   * @format uint64
   */
  version?: string
  /** decision_policy specifies the group policy's decision policy. */
  decision_policy?: GoogleProtobufAny
  /**
   * created_at is a timestamp specifying when a group policy was created.
   * @format date-time
   */
  created_at?: string
}

/**
 * Member represents a group member with an account address,
 * non-zero weight, metadata and added_at timestamp.
 */
export interface CosmosGroupV1Member {
  /** address is the member's account address. */
  address?: string
  /** weight is the member's voting weight that should be greater than 0. */
  weight?: string
  /** metadata is any arbitrary metadata attached to the member. */
  metadata?: string
  /**
   * added_at is a timestamp specifying when a member was added.
   * @format date-time
   */
  added_at?: string
}

/**
 * Proposal defines a group proposal. Any member of a group can submit a proposal
 * for a group policy to decide upon.
 * A proposal consists of a set of `sdk.Msg`s that will be executed if the proposal
 * passes as well as some optional metadata associated with the proposal.
 */
export interface CosmosGroupV1Proposal {
  /**
   * id is the unique id of the proposal.
   * @format uint64
   */
  id?: string
  /** group_policy_address is the account address of group policy. */
  group_policy_address?: string
  /**
   * metadata is any arbitrary metadata attached to the proposal.
   * the recommended format of the metadata is to be found here:
   * https://docs.cosmos.network/v0.47/modules/group#proposal-4
   */
  metadata?: string
  /** proposers are the account addresses of the proposers. */
  proposers?: string[]
  /**
   * submit_time is a timestamp specifying when a proposal was submitted.
   * @format date-time
   */
  submit_time?: string
  /**
   * group_version tracks the version of the group at proposal submission.
   * This field is here for informational purposes only.
   * @format uint64
   */
  group_version?: string
  /**
   * group_policy_version tracks the version of the group policy at proposal submission.
   * When a decision policy is changed, existing proposals from previous policy
   * versions will become invalid with the `ABORTED` status.
   * This field is here for informational purposes only.
   * @format uint64
   */
  group_policy_version?: string
  /** status represents the high level position in the life cycle of the proposal. Initial value is Submitted. */
  status?: CosmosGroupV1ProposalStatus
  /**
   * final_tally_result contains the sums of all weighted votes for this
   * proposal for each vote option. It is empty at submission, and only
   * populated after tallying, at voting period end or at proposal execution,
   * whichever happens first.
   */
  final_tally_result?: CosmosGroupV1TallyResult
  /**
   * voting_period_end is the timestamp before which voting must be done.
   * Unless a successful MsgExec is called before (to execute a proposal whose
   * tally is successful before the voting period ends), tallying will be done
   * at this point, and the `final_tally_result`and `status` fields will be
   * accordingly updated.
   * @format date-time
   */
  voting_period_end?: string
  /** executor_result is the final result of the proposal execution. Initial value is NotRun. */
  executor_result?: CosmosGroupV1ProposalExecutorResult
  /** messages is a list of `sdk.Msg`s that will be executed if the proposal passes. */
  messages?: GoogleProtobufAny[]
  /**
   * title is the title of the proposal
   * Since: cosmos-sdk 0.47
   */
  title?: string
  /**
   * summary is a short summary of the proposal
   * Since: cosmos-sdk 0.47
   */
  summary?: string
}

/**
 * ProposalExecutorResult defines types of proposal executor results.
 *
 *  - PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED: An empty value is not allowed.
 *  - PROPOSAL_EXECUTOR_RESULT_NOT_RUN: We have not yet run the executor.
 *  - PROPOSAL_EXECUTOR_RESULT_SUCCESS: The executor was successful and proposed action updated state.
 *  - PROPOSAL_EXECUTOR_RESULT_FAILURE: The executor returned an error and proposed action didn't update state.
 * @default "PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED"
 */
export enum CosmosGroupV1ProposalExecutorResult {
  PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED = 'PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED',
  PROPOSAL_EXECUTOR_RESULT_NOT_RUN = 'PROPOSAL_EXECUTOR_RESULT_NOT_RUN',
  PROPOSAL_EXECUTOR_RESULT_SUCCESS = 'PROPOSAL_EXECUTOR_RESULT_SUCCESS',
  PROPOSAL_EXECUTOR_RESULT_FAILURE = 'PROPOSAL_EXECUTOR_RESULT_FAILURE',
}

/**
 * ProposalStatus defines proposal statuses.
 *
 *  - PROPOSAL_STATUS_UNSPECIFIED: An empty value is invalid and not allowed.
 *  - PROPOSAL_STATUS_SUBMITTED: Initial status of a proposal when submitted.
 *  - PROPOSAL_STATUS_ACCEPTED: Final status of a proposal when the final tally is done and the outcome
 * passes the group policy's decision policy.
 *  - PROPOSAL_STATUS_REJECTED: Final status of a proposal when the final tally is done and the outcome
 * is rejected by the group policy's decision policy.
 *  - PROPOSAL_STATUS_ABORTED: Final status of a proposal when the group policy is modified before the
 * final tally.
 *  - PROPOSAL_STATUS_WITHDRAWN: A proposal can be withdrawn before the voting start time by the owner.
 * When this happens the final status is Withdrawn.
 * @default "PROPOSAL_STATUS_UNSPECIFIED"
 */
export enum CosmosGroupV1ProposalStatus {
  PROPOSAL_STATUS_UNSPECIFIED = 'PROPOSAL_STATUS_UNSPECIFIED',
  PROPOSAL_STATUS_SUBMITTED = 'PROPOSAL_STATUS_SUBMITTED',
  PROPOSAL_STATUS_ACCEPTED = 'PROPOSAL_STATUS_ACCEPTED',
  PROPOSAL_STATUS_REJECTED = 'PROPOSAL_STATUS_REJECTED',
  PROPOSAL_STATUS_ABORTED = 'PROPOSAL_STATUS_ABORTED',
  PROPOSAL_STATUS_WITHDRAWN = 'PROPOSAL_STATUS_WITHDRAWN',
}

/** QueryGroupInfoResponse is the Query/GroupInfo response type. */
export interface CosmosGroupV1QueryGroupInfoResponse {
  /** info is the GroupInfo of the group. */
  info?: CosmosGroupV1GroupInfo
}

/** QueryGroupMembersResponse is the Query/GroupMembersResponse response type. */
export interface CosmosGroupV1QueryGroupMembersResponse {
  /** members are the members of the group with given group_id. */
  members?: CosmosGroupV1GroupMember[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** QueryGroupPoliciesByAdminResponse is the Query/GroupPoliciesByAdmin response type. */
export interface CosmosGroupV1QueryGroupPoliciesByAdminResponse {
  /** group_policies are the group policies info with provided admin. */
  group_policies?: CosmosGroupV1GroupPolicyInfo[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** QueryGroupPoliciesByGroupResponse is the Query/GroupPoliciesByGroup response type. */
export interface CosmosGroupV1QueryGroupPoliciesByGroupResponse {
  /** group_policies are the group policies info associated with the provided group. */
  group_policies?: CosmosGroupV1GroupPolicyInfo[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** QueryGroupPolicyInfoResponse is the Query/GroupPolicyInfo response type. */
export interface CosmosGroupV1QueryGroupPolicyInfoResponse {
  /** info is the GroupPolicyInfo of the group policy. */
  info?: CosmosGroupV1GroupPolicyInfo
}

/** QueryGroupsByAdminResponse is the Query/GroupsByAdminResponse response type. */
export interface CosmosGroupV1QueryGroupsByAdminResponse {
  /** groups are the groups info with the provided admin. */
  groups?: CosmosGroupV1GroupInfo[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** QueryGroupsByMemberResponse is the Query/GroupsByMember response type. */
export interface CosmosGroupV1QueryGroupsByMemberResponse {
  /** groups are the groups info with the provided group member. */
  groups?: CosmosGroupV1GroupInfo[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/**
 * QueryGroupsResponse is the Query/Groups response type.
 *
 * Since: cosmos-sdk 0.47.1
 */
export interface CosmosGroupV1QueryGroupsResponse {
  /** `groups` is all the groups present in state. */
  groups?: CosmosGroupV1GroupInfo[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** QueryProposalResponse is the Query/Proposal response type. */
export interface CosmosGroupV1QueryProposalResponse {
  /** proposal is the proposal info. */
  proposal?: CosmosGroupV1Proposal
}

/** QueryProposalsByGroupPolicyResponse is the Query/ProposalByGroupPolicy response type. */
export interface CosmosGroupV1QueryProposalsByGroupPolicyResponse {
  /** proposals are the proposals with given group policy. */
  proposals?: CosmosGroupV1Proposal[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** QueryTallyResultResponse is the Query/TallyResult response type. */
export interface CosmosGroupV1QueryTallyResultResponse {
  /** tally defines the requested tally. */
  tally?: CosmosGroupV1TallyResult
}

/** QueryVoteByProposalVoterResponse is the Query/VoteByProposalVoter response type. */
export interface CosmosGroupV1QueryVoteByProposalVoterResponse {
  /** vote is the vote with given proposal_id and voter. */
  vote?: CosmosGroupV1Vote
}

/** QueryVotesByProposalResponse is the Query/VotesByProposal response type. */
export interface CosmosGroupV1QueryVotesByProposalResponse {
  /** votes are the list of votes for given proposal_id. */
  votes?: CosmosGroupV1Vote[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** QueryVotesByVoterResponse is the Query/VotesByVoter response type. */
export interface CosmosGroupV1QueryVotesByVoterResponse {
  /** votes are the list of votes by given voter. */
  votes?: CosmosGroupV1Vote[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** TallyResult represents the sum of weighted votes for each vote option. */
export interface CosmosGroupV1TallyResult {
  /** yes_count is the weighted sum of yes votes. */
  yes_count?: string
  /** abstain_count is the weighted sum of abstainers. */
  abstain_count?: string
  /** no_count is the weighted sum of no votes. */
  no_count?: string
  /** no_with_veto_count is the weighted sum of veto. */
  no_with_veto_count?: string
}

/** Vote represents a vote for a proposal.string metadata */
export interface CosmosGroupV1Vote {
  /**
   * proposal is the unique ID of the proposal.
   * @format uint64
   */
  proposal_id?: string
  /** voter is the account address of the voter. */
  voter?: string
  /** option is the voter's choice on the proposal. */
  option?: CosmosGroupV1VoteOption
  /**
   * metadata is any arbitrary metadata attached to the vote.
   * the recommended format of the metadata is to be found here: https://docs.cosmos.network/v0.47/modules/group#vote-2
   */
  metadata?: string
  /**
   * submit_time is the timestamp when the vote was submitted.
   * @format date-time
   */
  submit_time?: string
}

/**
 * VoteOption enumerates the valid vote options for a given proposal.
 *
 *  - VOTE_OPTION_UNSPECIFIED: VOTE_OPTION_UNSPECIFIED defines an unspecified vote option which will
 * return an error.
 *  - VOTE_OPTION_YES: VOTE_OPTION_YES defines a yes vote option.
 *  - VOTE_OPTION_ABSTAIN: VOTE_OPTION_ABSTAIN defines an abstain vote option.
 *  - VOTE_OPTION_NO: VOTE_OPTION_NO defines a no vote option.
 *  - VOTE_OPTION_NO_WITH_VETO: VOTE_OPTION_NO_WITH_VETO defines a no with veto vote option.
 * @default "VOTE_OPTION_UNSPECIFIED"
 */
export enum CosmosGroupV1VoteOption {
  VOTE_OPTION_UNSPECIFIED = 'VOTE_OPTION_UNSPECIFIED',
  VOTE_OPTION_YES = 'VOTE_OPTION_YES',
  VOTE_OPTION_ABSTAIN = 'VOTE_OPTION_ABSTAIN',
  VOTE_OPTION_NO = 'VOTE_OPTION_NO',
  VOTE_OPTION_NO_WITH_VETO = 'VOTE_OPTION_NO_WITH_VETO',
}

/** Params defines the parameters for the x/mint module. */
export interface CosmosMintV1Beta1Params {
  /** type of coin to mint */
  mint_denom?: string
  /** maximum annual change in inflation rate */
  inflation_rate_change?: string
  /** maximum inflation rate */
  inflation_max?: string
  /** minimum inflation rate */
  inflation_min?: string
  /** goal of percent bonded atoms */
  goal_bonded?: string
  /**
   * expected blocks per year
   * @format uint64
   */
  blocks_per_year?: string
}

/**
 * QueryAnnualProvisionsResponse is the response type for the
 * Query/AnnualProvisions RPC method.
 */
export interface CosmosMintV1Beta1QueryAnnualProvisionsResponse {
  /**
   * annual_provisions is the current minting annual provisions value.
   * @format byte
   */
  annual_provisions?: string
}

/**
 * QueryInflationResponse is the response type for the Query/Inflation RPC
 * method.
 */
export interface CosmosMintV1Beta1QueryInflationResponse {
  /**
   * inflation is the current minting inflation value.
   * @format byte
   */
  inflation?: string
}

/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface CosmosMintV1Beta1QueryParamsResponse {
  /** params defines the parameters of the module. */
  params?: CosmosMintV1Beta1Params
}

/** Class defines the class of the nft type. */
export interface CosmosNftV1Beta1Class {
  /** id defines the unique identifier of the NFT classification, similar to the contract address of ERC721 */
  id?: string
  /** name defines the human-readable name of the NFT classification. Optional */
  name?: string
  /** symbol is an abbreviated name for nft classification. Optional */
  symbol?: string
  /** description is a brief description of nft classification. Optional */
  description?: string
  /** uri for the class metadata stored off chain. It can define schema for Class and NFT `Data` attributes. Optional */
  uri?: string
  /** uri_hash is a hash of the document pointed by uri. Optional */
  uri_hash?: string
  /**
   * data is the app specific metadata of the NFT class. Optional
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   *
   * Example 1: Pack and unpack a message in C++.
   *
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   *
   * Example 2: Pack and unpack a message in Java.
   *
   *     Foo foo = ...;
   *     Any any = Any.pack(foo);
   *     ...
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *     }
   *
   * Example 3: Pack and unpack a message in Python.
   *
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     ...
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *       ...
   *
   * Example 4: Pack and unpack a message in Go
   *
   *      foo := &pb.Foo{...}
   *      any, err := anypb.New(foo)
   *      if err != nil {
   *        ...
   *      }
   *      ...
   *      foo := &pb.Foo{}
   *      if err := any.UnmarshalTo(foo); err != nil {
   *        ...
   *      }
   *
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   *
   *
   * JSON
   *
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     }
   *
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   *     }
   *
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *
   *     {
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   *     }
   */
  data?: GoogleProtobufAny
}

/** NFT defines the NFT. */
export interface CosmosNftV1Beta1NFT {
  /** class_id associated with the NFT, similar to the contract address of ERC721 */
  class_id?: string
  /** id is a unique identifier of the NFT */
  id?: string
  /** uri for the NFT metadata stored off chain */
  uri?: string
  /** uri_hash is a hash of the document pointed by uri */
  uri_hash?: string
  /**
   * data is an app specific data of the NFT. Optional
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   *
   * Example 1: Pack and unpack a message in C++.
   *
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   *
   * Example 2: Pack and unpack a message in Java.
   *
   *     Foo foo = ...;
   *     Any any = Any.pack(foo);
   *     ...
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *     }
   *
   * Example 3: Pack and unpack a message in Python.
   *
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     ...
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *       ...
   *
   * Example 4: Pack and unpack a message in Go
   *
   *      foo := &pb.Foo{...}
   *      any, err := anypb.New(foo)
   *      if err != nil {
   *        ...
   *      }
   *      ...
   *      foo := &pb.Foo{}
   *      if err := any.UnmarshalTo(foo); err != nil {
   *        ...
   *      }
   *
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   *
   *
   * JSON
   *
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     }
   *
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   *     }
   *
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *
   *     {
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   *     }
   */
  data?: GoogleProtobufAny
}

/** QueryBalanceResponse is the response type for the Query/Balance RPC method */
export interface CosmosNftV1Beta1QueryBalanceResponse {
  /**
   * amount is the number of all NFTs of a given class owned by the owner
   * @format uint64
   */
  amount?: string
}

/** QueryClassResponse is the response type for the Query/Class RPC method */
export interface CosmosNftV1Beta1QueryClassResponse {
  /** class defines the class of the nft type. */
  class?: CosmosNftV1Beta1Class
}

/** QueryClassesResponse is the response type for the Query/Classes RPC method */
export interface CosmosNftV1Beta1QueryClassesResponse {
  /** class defines the class of the nft type. */
  classes?: CosmosNftV1Beta1Class[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** QueryNFTResponse is the response type for the Query/NFT RPC method */
export interface CosmosNftV1Beta1QueryNFTResponse {
  /**
   * owner is the owner address of the nft
   * NFT defines the NFT.
   */
  nft?: CosmosNftV1Beta1NFT
}

/** QueryNFTsResponse is the response type for the Query/NFTs RPC methods */
export interface CosmosNftV1Beta1QueryNFTsResponse {
  /** NFT defines the NFT */
  nfts?: CosmosNftV1Beta1NFT[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** QueryOwnerResponse is the response type for the Query/Owner RPC method */
export interface CosmosNftV1Beta1QueryOwnerResponse {
  /** owner is the owner address of the nft */
  owner?: string
}

/** QuerySupplyResponse is the response type for the Query/Supply RPC method */
export interface CosmosNftV1Beta1QuerySupplyResponse {
  /**
   * amount is the number of all NFTs from the given class
   * @format uint64
   */
  amount?: string
}

/** GetResponse is the Query/Get response type. */
export interface CosmosOrmQueryV1Alpha1GetResponse {
  /**
   * result is the result of the get query. If no value is found, the gRPC
   * status code NOT_FOUND will be returned.
   */
  result?: GoogleProtobufAny
}

/** IndexValue represents the value of a field in an ORM index expression. */
export interface CosmosOrmQueryV1Alpha1IndexValue {
  /**
   * uint specifies a value for an uint32, fixed32, uint64, or fixed64
   * index field.
   * @format uint64
   */
  uint?: string
  /**
   * int64 specifies a value for an int32, sfixed32, int64, or sfixed64
   * index field.
   * @format int64
   */
  int?: string
  /** str specifies a value for a string index field. */
  str?: string
  /**
   * bytes specifies a value for a bytes index field.
   * @format byte
   */
  bytes?: string
  /** enum specifies a value for an enum index field. */
  enum?: string
  /** bool specifies a value for a bool index field. */
  bool?: boolean
  /**
   * timestamp specifies a value for a timestamp index field.
   * @format date-time
   */
  timestamp?: string
  /** duration specifies a value for a duration index field. */
  duration?: string
}

/** Prefix specifies the arguments to a prefix query. */
export interface CosmosOrmQueryV1Alpha1ListRequestPrefix {
  /**
   * values specifies the index values for the prefix query.
   * It is valid to special a partial prefix with fewer values than
   * the number of fields in the index.
   */
  values?: CosmosOrmQueryV1Alpha1IndexValue[]
}

/** Range specifies the arguments to a range query. */
export interface CosmosOrmQueryV1Alpha1ListRequestRange {
  /**
   * start specifies the starting index values for the range query.
   * It is valid to provide fewer values than the number of fields in the
   * index.
   */
  start?: CosmosOrmQueryV1Alpha1IndexValue[]
  /**
   * end specifies the inclusive ending index values for the range query.
   * It is valid to provide fewer values than the number of fields in the
   * index.
   */
  end?: CosmosOrmQueryV1Alpha1IndexValue[]
}

/** ListResponse is the Query/List response type. */
export interface CosmosOrmQueryV1Alpha1ListResponse {
  /** results are the results of the query. */
  results?: GoogleProtobufAny[]
  /** pagination is the pagination response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/**
 * ParamChange defines an individual parameter change, for use in
 * ParameterChangeProposal.
 */
export interface CosmosParamsV1Beta1ParamChange {
  subspace?: string
  key?: string
  value?: string
}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface CosmosParamsV1Beta1QueryParamsResponse {
  /** param defines the queried parameter. */
  param?: CosmosParamsV1Beta1ParamChange
}

/**
 * QuerySubspacesResponse defines the response types for querying for all
 * registered subspaces and all keys for a subspace.
 *
 * Since: cosmos-sdk 0.46
 */
export interface CosmosParamsV1Beta1QuerySubspacesResponse {
  subspaces?: CosmosParamsV1Beta1Subspace[]
}

/**
 * Subspace defines a parameter subspace name and all the keys that exist for
 * the subspace.
 *
 * Since: cosmos-sdk 0.46
 */
export interface CosmosParamsV1Beta1Subspace {
  subspace?: string
  keys?: string[]
}

/** Params represents the parameters used for by the slashing module. */
export interface CosmosSlashingV1Beta1Params {
  /** @format int64 */
  signed_blocks_window?: string
  /** @format byte */
  min_signed_per_window?: string
  downtime_jail_duration?: string
  /** @format byte */
  slash_fraction_double_sign?: string
  /** @format byte */
  slash_fraction_downtime?: string
}

/** QueryParamsResponse is the response type for the Query/Params RPC method */
export interface CosmosSlashingV1Beta1QueryParamsResponse {
  /** Params represents the parameters used for by the slashing module. */
  params?: CosmosSlashingV1Beta1Params
}

/**
 * QuerySigningInfoResponse is the response type for the Query/SigningInfo RPC
 * method
 */
export interface CosmosSlashingV1Beta1QuerySigningInfoResponse {
  /**
   * val_signing_info is the signing info of requested val cons address
   * ValidatorSigningInfo defines a validator's signing info for monitoring their
   * liveness activity.
   */
  val_signing_info?: CosmosSlashingV1Beta1ValidatorSigningInfo
}

/**
 * QuerySigningInfosResponse is the response type for the Query/SigningInfos RPC
 * method
 */
export interface CosmosSlashingV1Beta1QuerySigningInfosResponse {
  /** info is the signing info of all validators */
  info?: CosmosSlashingV1Beta1ValidatorSigningInfo[]
  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/**
 * ValidatorSigningInfo defines a validator's signing info for monitoring their
 * liveness activity.
 */
export interface CosmosSlashingV1Beta1ValidatorSigningInfo {
  address?: string
  /**
   * Height at which validator was first a candidate OR was un-jailed
   * @format int64
   */
  start_height?: string
  /**
   * Index which is incremented every time a validator is bonded in a block and
   * _may_ have signed a pre-commit or not. This in conjunction with the
   * signed_blocks_window param determines the index in the missed block bitmap.
   * @format int64
   */
  index_offset?: string
  /**
   * Timestamp until which the validator is jailed due to liveness downtime.
   * @format date-time
   */
  jailed_until?: string
  /**
   * Whether or not a validator has been tombstoned (killed out of validator
   * set). It is set once the validator commits an equivocation or for any other
   * configured misbehavior.
   */
  tombstoned?: boolean
  /**
   * A counter of missed (unsigned) blocks. It is used to avoid unnecessary
   * reads in the missed block bitmap.
   * @format int64
   */
  missed_blocks_counter?: string
}

/**
 * BondStatus is the status of a validator.
 *
 *  - BOND_STATUS_UNSPECIFIED: UNSPECIFIED defines an invalid validator status.
 *  - BOND_STATUS_UNBONDED: UNBONDED defines a validator that is not bonded.
 *  - BOND_STATUS_UNBONDING: UNBONDING defines a validator that is unbonding.
 *  - BOND_STATUS_BONDED: BONDED defines a validator that is bonded.
 * @default "BOND_STATUS_UNSPECIFIED"
 */
export enum CosmosStakingV1Beta1BondStatus {
  BOND_STATUS_UNSPECIFIED = 'BOND_STATUS_UNSPECIFIED',
  BOND_STATUS_UNBONDED = 'BOND_STATUS_UNBONDED',
  BOND_STATUS_UNBONDING = 'BOND_STATUS_UNBONDING',
  BOND_STATUS_BONDED = 'BOND_STATUS_BONDED',
}

/** Commission defines commission parameters for a given validator. */
export interface CosmosStakingV1Beta1Commission {
  /** commission_rates defines the initial commission rates to be used for creating a validator. */
  commission_rates?: CosmosStakingV1Beta1CommissionRates
  /**
   * update_time is the last time the commission rate was changed.
   * @format date-time
   */
  update_time?: string
}

/**
 * CommissionRates defines the initial commission rates to be used for creating
 * a validator.
 */
export interface CosmosStakingV1Beta1CommissionRates {
  /** rate is the commission rate charged to delegators, as a fraction. */
  rate?: string
  /** max_rate defines the maximum commission rate which validator can ever charge, as a fraction. */
  max_rate?: string
  /** max_change_rate defines the maximum daily increase of the validator commission, as a fraction. */
  max_change_rate?: string
}

/**
 * Delegation represents the bond with tokens held by an account. It is
 * owned by one delegator, and is associated with the voting power of one
 * validator.
 */
export interface CosmosStakingV1Beta1Delegation {
  /** delegator_address is the encoded address of the delegator. */
  delegator_address?: string
  /** validator_address is the encoded address of the validator. */
  validator_address?: string
  /** shares define the delegation shares received. */
  shares?: string
}

/**
 * DelegationResponse is equivalent to Delegation except that it contains a
 * balance in addition to shares which is more suitable for client responses.
 */
export interface CosmosStakingV1Beta1DelegationResponse {
  /**
   * Delegation represents the bond with tokens held by an account. It is
   * owned by one delegator, and is associated with the voting power of one
   * validator.
   */
  delegation?: CosmosStakingV1Beta1Delegation
  /**
   * Coin defines a token with a denomination and an amount.
   *
   * NOTE: The amount field is an Int which implements the custom method
   * signatures required by gogoproto.
   */
  balance?: CosmosBaseV1Beta1Coin
}

/** Description defines a validator description. */
export interface CosmosStakingV1Beta1Description {
  /** moniker defines a human-readable name for the validator. */
  moniker?: string
  /** identity defines an optional identity signature (ex. UPort or Keybase). */
  identity?: string
  /** website defines an optional website link. */
  website?: string
  /** security_contact defines an optional email for security contact. */
  security_contact?: string
  /** details define other optional details. */
  details?: string
}

/**
 * HistoricalInfo contains header and validator information for a given block.
 * It is stored as part of staking module's state, which persists the `n` most
 * recent HistoricalInfo
 * (`n` is set by the staking module's `historical_entries` parameter).
 */
export interface CosmosStakingV1Beta1HistoricalInfo {
  /** Header defines the structure of a block header. */
  header?: TendermintTypesHeader
  valset?: CosmosStakingV1Beta1Validator[]
}

/** Params defines the parameters for the x/staking module. */
export interface CosmosStakingV1Beta1Params {
  /** unbonding_time is the time duration of unbonding. */
  unbonding_time?: string
  /**
   * max_validators is the maximum number of validators.
   * @format int64
   */
  max_validators?: number
  /**
   * max_entries is the max entries for either unbonding delegation or redelegation (per pair/trio).
   * @format int64
   */
  max_entries?: number
  /**
   * historical_entries is the number of historical entries to persist.
   * @format int64
   */
  historical_entries?: number
  /** bond_denom defines the bondable coin denomination. */
  bond_denom?: string
  /** min_commission_rate is the chain-wide minimum commission rate that a validator can charge their delegators */
  min_commission_rate?: string
}

/**
 * Pool is used for tracking bonded and not-bonded token supply of the bond
 * denomination.
 */
export interface CosmosStakingV1Beta1Pool {
  not_bonded_tokens?: string
  bonded_tokens?: string
}

/** QueryDelegationResponse is response type for the Query/Delegation RPC method. */
export interface CosmosStakingV1Beta1QueryDelegationResponse {
  /** delegation_responses defines the delegation info of a delegation. */
  delegation_response?: CosmosStakingV1Beta1DelegationResponse
}

/**
 * QueryDelegatorDelegationsResponse is response type for the
 * Query/DelegatorDelegations RPC method.
 */
export interface CosmosStakingV1Beta1QueryDelegatorDelegationsResponse {
  /** delegation_responses defines all the delegations' info of a delegator. */
  delegation_responses?: CosmosStakingV1Beta1DelegationResponse[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/**
 * QueryUnbondingDelegatorDelegationsResponse is response type for the
 * Query/UnbondingDelegatorDelegations RPC method.
 */
export interface CosmosStakingV1Beta1QueryDelegatorUnbondingDelegationsResponse {
  unbonding_responses?: CosmosStakingV1Beta1UnbondingDelegation[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/**
 * QueryDelegatorValidatorResponse response type for the
 * Query/DelegatorValidator RPC method.
 */
export interface CosmosStakingV1Beta1QueryDelegatorValidatorResponse {
  /** validator defines the validator info. */
  validator?: CosmosStakingV1Beta1Validator
}

/**
 * QueryDelegatorValidatorsResponse is response type for the
 * Query/DelegatorValidators RPC method.
 */
export interface CosmosStakingV1Beta1QueryDelegatorValidatorsResponse {
  /** validators defines the validators' info of a delegator. */
  validators?: CosmosStakingV1Beta1Validator[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/**
 * QueryHistoricalInfoResponse is response type for the Query/HistoricalInfo RPC
 * method.
 */
export interface CosmosStakingV1Beta1QueryHistoricalInfoResponse {
  /** hist defines the historical info at the given height. */
  hist?: CosmosStakingV1Beta1HistoricalInfo
}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface CosmosStakingV1Beta1QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params?: CosmosStakingV1Beta1Params
}

/** QueryPoolResponse is response type for the Query/Pool RPC method. */
export interface CosmosStakingV1Beta1QueryPoolResponse {
  /** pool defines the pool info. */
  pool?: CosmosStakingV1Beta1Pool
}

/**
 * QueryRedelegationsResponse is response type for the Query/Redelegations RPC
 * method.
 */
export interface CosmosStakingV1Beta1QueryRedelegationsResponse {
  redelegation_responses?: CosmosStakingV1Beta1RedelegationResponse[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/**
 * QueryDelegationResponse is response type for the Query/UnbondingDelegation
 * RPC method.
 */
export interface CosmosStakingV1Beta1QueryUnbondingDelegationResponse {
  /** unbond defines the unbonding information of a delegation. */
  unbond?: CosmosStakingV1Beta1UnbondingDelegation
}

/**
 * QueryValidatorDelegationsResponse is response type for the
 * Query/ValidatorDelegations RPC method
 */
export interface CosmosStakingV1Beta1QueryValidatorDelegationsResponse {
  delegation_responses?: CosmosStakingV1Beta1DelegationResponse[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** QueryValidatorResponse is response type for the Query/Validator RPC method */
export interface CosmosStakingV1Beta1QueryValidatorResponse {
  /** validator defines the validator info. */
  validator?: CosmosStakingV1Beta1Validator
}

/**
 * QueryValidatorUnbondingDelegationsResponse is response type for the
 * Query/ValidatorUnbondingDelegations RPC method.
 */
export interface CosmosStakingV1Beta1QueryValidatorUnbondingDelegationsResponse {
  unbonding_responses?: CosmosStakingV1Beta1UnbondingDelegation[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** QueryValidatorsResponse is response type for the Query/Validators RPC method */
export interface CosmosStakingV1Beta1QueryValidatorsResponse {
  /** validators contains all the queried validators. */
  validators?: CosmosStakingV1Beta1Validator[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/**
 * Redelegation contains the list of a particular delegator's redelegating bonds
 * from a particular source validator to a particular destination validator.
 */
export interface CosmosStakingV1Beta1Redelegation {
  /** delegator_address is the bech32-encoded address of the delegator. */
  delegator_address?: string
  /** validator_src_address is the validator redelegation source operator address. */
  validator_src_address?: string
  /** validator_dst_address is the validator redelegation destination operator address. */
  validator_dst_address?: string
  /** entries are the redelegation entries. */
  entries?: CosmosStakingV1Beta1RedelegationEntry[]
}

/** RedelegationEntry defines a redelegation object with relevant metadata. */
export interface CosmosStakingV1Beta1RedelegationEntry {
  /**
   * creation_height  defines the height which the redelegation took place.
   * @format int64
   */
  creation_height?: string
  /**
   * completion_time defines the unix time for redelegation completion.
   * @format date-time
   */
  completion_time?: string
  /** initial_balance defines the initial balance when redelegation started. */
  initial_balance?: string
  /** shares_dst is the amount of destination-validator shares created by redelegation. */
  shares_dst?: string
  /**
   * Incrementing id that uniquely identifies this entry
   * @format uint64
   */
  unbonding_id?: string
  /**
   * Strictly positive if this entry's unbonding has been stopped by external modules
   * @format int64
   */
  unbonding_on_hold_ref_count?: string
}

/**
 * RedelegationEntryResponse is equivalent to a RedelegationEntry except that it
 * contains a balance in addition to shares which is more suitable for client
 * responses.
 */
export interface CosmosStakingV1Beta1RedelegationEntryResponse {
  /** RedelegationEntry defines a redelegation object with relevant metadata. */
  redelegation_entry?: CosmosStakingV1Beta1RedelegationEntry
  balance?: string
}

/**
 * RedelegationResponse is equivalent to a Redelegation except that its entries
 * contain a balance in addition to shares which is more suitable for client
 * responses.
 */
export interface CosmosStakingV1Beta1RedelegationResponse {
  /**
   * Redelegation contains the list of a particular delegator's redelegating bonds
   * from a particular source validator to a particular destination validator.
   */
  redelegation?: CosmosStakingV1Beta1Redelegation
  entries?: CosmosStakingV1Beta1RedelegationEntryResponse[]
}

/**
 * UnbondingDelegation stores all of a single delegator's unbonding bonds
 * for a single validator in an time-ordered list.
 */
export interface CosmosStakingV1Beta1UnbondingDelegation {
  /** delegator_address is the encoded address of the delegator. */
  delegator_address?: string
  /** validator_address is the encoded address of the validator. */
  validator_address?: string
  /** entries are the unbonding delegation entries. */
  entries?: CosmosStakingV1Beta1UnbondingDelegationEntry[]
}

/** UnbondingDelegationEntry defines an unbonding object with relevant metadata. */
export interface CosmosStakingV1Beta1UnbondingDelegationEntry {
  /**
   * creation_height is the height which the unbonding took place.
   * @format int64
   */
  creation_height?: string
  /**
   * completion_time is the unix time for unbonding completion.
   * @format date-time
   */
  completion_time?: string
  /** initial_balance defines the tokens initially scheduled to receive at completion. */
  initial_balance?: string
  /** balance defines the tokens to receive at completion. */
  balance?: string
  /**
   * Incrementing id that uniquely identifies this entry
   * @format uint64
   */
  unbonding_id?: string
  /**
   * Strictly positive if this entry's unbonding has been stopped by external modules
   * @format int64
   */
  unbonding_on_hold_ref_count?: string
}

/**
 * Validator defines a validator, together with the total amount of the
 * Validator's bond shares and their exchange rate to coins. Slashing results in
 * a decrease in the exchange rate, allowing correct calculation of future
 * undelegations without iterating over delegators. When coins are delegated to
 * this validator, the validator is credited with a delegation whose number of
 * bond shares is based on the amount of coins delegated divided by the current
 * exchange rate. Voting power can be calculated as total bonded shares
 * multiplied by exchange rate.
 */
export interface CosmosStakingV1Beta1Validator {
  /** operator_address defines the address of the validator's operator; bech encoded in JSON. */
  operator_address?: string
  /** consensus_pubkey is the consensus public key of the validator, as a Protobuf Any. */
  consensus_pubkey?: GoogleProtobufAny
  /** jailed defined whether the validator has been jailed from bonded status or not. */
  jailed?: boolean
  /** status is the validator status (bonded/unbonding/unbonded). */
  status?: CosmosStakingV1Beta1BondStatus
  /** tokens define the delegated tokens (incl. self-delegation). */
  tokens?: string
  /** delegator_shares defines total shares issued to a validator's delegators. */
  delegator_shares?: string
  /** description defines the description terms for the validator. */
  description?: CosmosStakingV1Beta1Description
  /**
   * unbonding_height defines, if unbonding, the height at which this validator has begun unbonding.
   * @format int64
   */
  unbonding_height?: string
  /**
   * unbonding_time defines, if unbonding, the min time for the validator to complete unbonding.
   * @format date-time
   */
  unbonding_time?: string
  /** commission defines the commission parameters. */
  commission?: CosmosStakingV1Beta1Commission
  /**
   * min_self_delegation is the validator's self declared minimum self delegation.
   *
   * Since: cosmos-sdk 0.46
   */
  min_self_delegation?: string
  /**
   * strictly positive if this validator's unbonding has been stopped by external modules
   * @format int64
   */
  unbonding_on_hold_ref_count?: string
  /** list of unbonding ids, each uniquely identifing an unbonding of this validator */
  unbonding_ids?: string[]
}

/** ABCIMessageLog defines a structure containing an indexed tx ABCI message log. */
export interface CosmosBaseAbciV1Beta1ABCIMessageLog {
  /** @format int64 */
  msg_index?: number
  log?: string
  /**
   * Events contains a slice of Event objects that were emitted during some
   * execution.
   */
  events?: CosmosBaseAbciV1Beta1StringEvent[]
}

/**
 * Attribute defines an attribute wrapper where the key and value are
 * strings instead of raw bytes.
 */
export interface CosmosBaseAbciV1Beta1Attribute {
  key?: string
  value?: string
}

/** GasInfo defines tx execution gas context. */
export interface CosmosBaseAbciV1Beta1GasInfo {
  /**
   * GasWanted is the maximum units of work we allow this tx to perform.
   * @format uint64
   */
  gas_wanted?: string
  /**
   * GasUsed is the amount of gas actually consumed.
   * @format uint64
   */
  gas_used?: string
}

/** Result is the union of ResponseFormat and ResponseCheckTx. */
export interface CosmosBaseAbciV1Beta1Result {
  /**
   * Data is any data returned from message or handler execution. It MUST be
   * length prefixed in order to separate data from multiple message executions.
   * Deprecated. This field is still populated, but prefer msg_response instead
   * because it also contains the Msg response typeURL.
   * @format byte
   */
  data?: string
  /** Log contains the log information from message or handler execution. */
  log?: string
  /**
   * Events contains a slice of Event objects that were emitted during message
   * or handler execution.
   */
  events?: TendermintAbciEvent[]
  /**
   * msg_responses contains the Msg handler responses type packed in Anys.
   *
   * Since: cosmos-sdk 0.46
   */
  msg_responses?: GoogleProtobufAny[]
}

/**
 * StringEvent defines en Event object wrapper where all the attributes
 * contain key/value pairs that are strings instead of raw bytes.
 */
export interface CosmosBaseAbciV1Beta1StringEvent {
  type?: string
  attributes?: CosmosBaseAbciV1Beta1Attribute[]
}

/**
 * TxResponse defines a structure containing relevant tx data and metadata. The
 * tags are stringified and the log is JSON decoded.
 */
export interface CosmosBaseAbciV1Beta1TxResponse {
  /**
   * The block height
   * @format int64
   */
  height?: string
  /** The transaction hash. */
  txhash?: string
  /** Namespace for the Code */
  codespace?: string
  /**
   * Response code.
   * @format int64
   */
  code?: number
  /** Result bytes, if any. */
  data?: string
  /**
   * The output of the application's logger (raw string). May be
   * non-deterministic.
   */
  raw_log?: string
  /** The output of the application's logger (typed). May be non-deterministic. */
  logs?: CosmosBaseAbciV1Beta1ABCIMessageLog[]
  /** Additional information. May be non-deterministic. */
  info?: string
  /**
   * Amount of gas requested for transaction.
   * @format int64
   */
  gas_wanted?: string
  /**
   * Amount of gas consumed by transaction.
   * @format int64
   */
  gas_used?: string
  /** The request transaction bytes. */
  tx?: GoogleProtobufAny
  /**
   * Time of the previous block. For heights > 1, it's the weighted median of
   * the timestamps of the valid votes in the block.LastCommit. For height == 1,
   * it's genesis time.
   */
  timestamp?: string
  /**
   * Events defines all the events emitted by processing a transaction. Note,
   * these events include those emitted by processing all the messages and those
   * emitted from the ante. Whereas Logs contains the events, with
   * additional metadata, emitted only by processing the messages.
   *
   * Since: cosmos-sdk 0.42.11, 0.44.5, 0.45
   */
  events?: TendermintAbciEvent[]
}

/**
 * CompactBitArray is an implementation of a space efficient bit array.
 * This is used to ensure that the encoded data takes up a minimal amount of
 * space after proto encoding.
 * This is not thread safe, and is not intended for concurrent usage.
 */
export interface CosmosCryptoMultisigV1Beta1CompactBitArray {
  /** @format int64 */
  extra_bits_stored?: number
  /** @format byte */
  elems?: string
}

/**
 * SignMode represents a signing mode with its own security guarantees.
 *
 * This enum should be considered a registry of all known sign modes
 * in the Cosmos ecosystem. Apps are not expected to support all known
 * sign modes. Apps that would like to support custom  sign modes are
 * encouraged to open a small PR against this file to add a new case
 * to this SignMode enum describing their sign mode so that different
 * apps have a consistent version of this enum.
 *
 *  - SIGN_MODE_UNSPECIFIED: SIGN_MODE_UNSPECIFIED specifies an unknown signing mode and will be
 * rejected.
 *  - SIGN_MODE_DIRECT: SIGN_MODE_DIRECT specifies a signing mode which uses SignDoc and is
 * verified with raw bytes from Tx.
 *  - SIGN_MODE_TEXTUAL: SIGN_MODE_TEXTUAL is a future signing mode that will verify some
 * human-readable textual representation on top of the binary representation
 * from SIGN_MODE_DIRECT. It is currently experimental, and should be used
 * for testing purposes only, until Textual is fully released. Please follow
 * the tracking issue https://github.com/cosmos/cosmos-sdk/issues/11970.
 *  - SIGN_MODE_DIRECT_AUX: SIGN_MODE_DIRECT_AUX specifies a signing mode which uses
 * SignDocDirectAux. As opposed to SIGN_MODE_DIRECT, this sign mode does not
 * require signers signing over other signers' `signer_info`. It also allows
 * for adding Tips in transactions.
 *
 * Since: cosmos-sdk 0.46
 *  - SIGN_MODE_LEGACY_AMINO_JSON: SIGN_MODE_LEGACY_AMINO_JSON is a backwards compatibility mode which uses
 * Amino JSON and will be removed in the future.
 *  - SIGN_MODE_EIP_191: SIGN_MODE_EIP_191 specifies the sign mode for EIP 191 signing on the Cosmos
 * SDK. Ref: https://eips.ethereum.org/EIPS/eip-191
 *
 * Currently, SIGN_MODE_EIP_191 is registered as a SignMode enum variant,
 * but is not implemented on the SDK by default. To enable EIP-191, you need
 * to pass a custom `TxConfig` that has an implementation of
 * `SignModeHandler` for EIP-191. The SDK may decide to fully support
 * EIP-191 in the future.
 *
 * Since: cosmos-sdk 0.45.2
 * @default "SIGN_MODE_UNSPECIFIED"
 */
export enum CosmosTxSigningV1Beta1SignMode {
  SIGN_MODE_UNSPECIFIED = 'SIGN_MODE_UNSPECIFIED',
  SIGN_MODE_DIRECT = 'SIGN_MODE_DIRECT',
  SIGN_MODE_TEXTUAL = 'SIGN_MODE_TEXTUAL',
  SIGN_MODE_DIRECT_AUX = 'SIGN_MODE_DIRECT_AUX',
  SIGN_MODE_LEGACY_AMINO_JSON = 'SIGN_MODE_LEGACY_AMINO_JSON',
  SIGNMODEEIP191 = 'SIGN_MODE_EIP_191',
}

/**
 * AuthInfo describes the fee and signer modes that are used to sign a
 * transaction.
 */
export interface CosmosTxV1Beta1AuthInfo {
  /**
   * signer_infos defines the signing modes for the required signers. The number
   * and order of elements must match the required signers from TxBody's
   * messages. The first element is the primary signer and the one which pays
   * the fee.
   */
  signer_infos?: CosmosTxV1Beta1SignerInfo[]
  /**
   * Fee is the fee and gas limit for the transaction. The first signer is the
   * primary signer and the one which pays the fee. The fee can be calculated
   * based on the cost of evaluating the body and doing signature verification
   * of the signers. This can be estimated via simulation.
   */
  fee?: CosmosTxV1Beta1Fee
  /**
   * Tip is the optional tip used for transactions fees paid in another denom.
   *
   * This field is ignored if the chain didn't enable tips, i.e. didn't add the
   * `TipDecorator` in its posthandler.
   *
   * Since: cosmos-sdk 0.46
   */
  tip?: CosmosTxV1Beta1Tip
}

/**
 * BroadcastMode specifies the broadcast mode for the TxService.Broadcast RPC
 * method.
 *
 *  - BROADCAST_MODE_UNSPECIFIED: zero-value for mode ordering
 *  - BROADCAST_MODE_BLOCK: DEPRECATED: use BROADCAST_MODE_SYNC instead,
 * BROADCAST_MODE_BLOCK is not supported by the SDK from v0.47.x onwards.
 *  - BROADCAST_MODE_SYNC: BROADCAST_MODE_SYNC defines a tx broadcasting mode where the client waits
 * for a CheckTx execution response only.
 *  - BROADCAST_MODE_ASYNC: BROADCAST_MODE_ASYNC defines a tx broadcasting mode where the client
 * returns immediately.
 * @default "BROADCAST_MODE_UNSPECIFIED"
 */
export enum CosmosTxV1Beta1BroadcastMode {
  BROADCAST_MODE_UNSPECIFIED = 'BROADCAST_MODE_UNSPECIFIED',
  BROADCAST_MODE_BLOCK = 'BROADCAST_MODE_BLOCK',
  BROADCAST_MODE_SYNC = 'BROADCAST_MODE_SYNC',
  BROADCAST_MODE_ASYNC = 'BROADCAST_MODE_ASYNC',
}

/**
 * BroadcastTxRequest is the request type for the Service.BroadcastTxRequest
 * RPC method.
 */
export interface CosmosTxV1Beta1BroadcastTxRequest {
  /**
   * tx_bytes is the raw transaction.
   * @format byte
   */
  tx_bytes?: string
  /**
   * BroadcastMode specifies the broadcast mode for the TxService.Broadcast RPC
   * method.
   *
   *  - BROADCAST_MODE_UNSPECIFIED: zero-value for mode ordering
   *  - BROADCAST_MODE_BLOCK: DEPRECATED: use BROADCAST_MODE_SYNC instead,
   * BROADCAST_MODE_BLOCK is not supported by the SDK from v0.47.x onwards.
   *  - BROADCAST_MODE_SYNC: BROADCAST_MODE_SYNC defines a tx broadcasting mode where the client waits
   * for a CheckTx execution response only.
   *  - BROADCAST_MODE_ASYNC: BROADCAST_MODE_ASYNC defines a tx broadcasting mode where the client
   * returns immediately.
   */
  mode?: CosmosTxV1Beta1BroadcastMode
}

/**
 * BroadcastTxResponse is the response type for the
 * Service.BroadcastTx method.
 */
export interface CosmosTxV1Beta1BroadcastTxResponse {
  /** tx_response is the queried TxResponses. */
  tx_response?: CosmosBaseAbciV1Beta1TxResponse
}

/**
 * Fee includes the amount of coins paid in fees and the maximum
 * gas to be used by the transaction. The ratio yields an effective "gasprice",
 * which must be above some miminum to be accepted into the mempool.
 */
export interface CosmosTxV1Beta1Fee {
  /** amount is the amount of coins to be paid as a fee */
  amount?: CosmosBaseV1Beta1Coin[]
  /**
   * gas_limit is the maximum gas that can be used in transaction processing
   * before an out of gas error occurs
   * @format uint64
   */
  gas_limit?: string
  /**
   * if unset, the first signer is responsible for paying the fees. If set, the specified account must pay the fees.
   * the payer must be a tx signer (and thus have signed this field in AuthInfo).
   * setting this field does *not* change the ordering of required signers for the transaction.
   */
  payer?: string
  /**
   * if set, the fee payer (either the first signer or the value of the payer field) requests that a fee grant be used
   * to pay fees instead of the fee payer's own balance. If an appropriate fee grant does not exist or the chain does
   * not support fee grants, this will fail
   */
  granter?: string
}

/**
 * GetBlockWithTxsResponse is the response type for the Service.GetBlockWithTxs
 * method.
 *
 * Since: cosmos-sdk 0.45.2
 */
export interface CosmosTxV1Beta1GetBlockWithTxsResponse {
  /** txs are the transactions in the block. */
  txs?: CosmosTxV1Beta1Tx[]
  block_id?: TendermintTypesBlockID
  block?: TendermintTypesBlock
  /** pagination defines a pagination for the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** GetTxResponse is the response type for the Service.GetTx method. */
export interface CosmosTxV1Beta1GetTxResponse {
  /** tx is the queried transaction. */
  tx?: CosmosTxV1Beta1Tx
  /** tx_response is the queried TxResponses. */
  tx_response?: CosmosBaseAbciV1Beta1TxResponse
}

/**
 * GetTxsEventResponse is the response type for the Service.TxsByEvents
 * RPC method.
 */
export interface CosmosTxV1Beta1GetTxsEventResponse {
  /** txs is the list of queried transactions. */
  txs?: CosmosTxV1Beta1Tx[]
  /** tx_responses is the list of queried TxResponses. */
  tx_responses?: CosmosBaseAbciV1Beta1TxResponse[]
  /**
   * pagination defines a pagination for the response.
   * Deprecated post v0.46.x: use total instead.
   */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
  /**
   * total is total number of results available
   * @format uint64
   */
  total?: string
}

/** ModeInfo describes the signing mode of a single or nested multisig signer. */
export interface CosmosTxV1Beta1ModeInfo {
  /** single represents a single signer */
  single?: CosmosTxV1Beta1ModeInfoSingle
  /** multi represents a nested multisig signer */
  multi?: CosmosTxV1Beta1ModeInfoMulti
}

/** Multi is the mode info for a multisig public key */
export interface CosmosTxV1Beta1ModeInfoMulti {
  /**
   * bitarray specifies which keys within the multisig are signing
   * CompactBitArray is an implementation of a space efficient bit array.
   * This is used to ensure that the encoded data takes up a minimal amount of
   * space after proto encoding.
   * This is not thread safe, and is not intended for concurrent usage.
   */
  bitarray?: CosmosCryptoMultisigV1Beta1CompactBitArray
  /**
   * mode_infos is the corresponding modes of the signers of the multisig
   * which could include nested multisig public keys
   */
  mode_infos?: CosmosTxV1Beta1ModeInfo[]
}

/**
 * Single is the mode info for a single signer. It is structured as a message
 * to allow for additional fields such as locale for SIGN_MODE_TEXTUAL in the
 * future
 */
export interface CosmosTxV1Beta1ModeInfoSingle {
  /**
   * mode is the signing mode of the single signer
   * SignMode represents a signing mode with its own security guarantees.
   *
   * This enum should be considered a registry of all known sign modes
   * in the Cosmos ecosystem. Apps are not expected to support all known
   * sign modes. Apps that would like to support custom  sign modes are
   * encouraged to open a small PR against this file to add a new case
   * to this SignMode enum describing their sign mode so that different
   * apps have a consistent version of this enum.
   *
   *  - SIGN_MODE_UNSPECIFIED: SIGN_MODE_UNSPECIFIED specifies an unknown signing mode and will be
   * rejected.
   *  - SIGN_MODE_DIRECT: SIGN_MODE_DIRECT specifies a signing mode which uses SignDoc and is
   * verified with raw bytes from Tx.
   *  - SIGN_MODE_TEXTUAL: SIGN_MODE_TEXTUAL is a future signing mode that will verify some
   * human-readable textual representation on top of the binary representation
   * from SIGN_MODE_DIRECT. It is currently experimental, and should be used
   * for testing purposes only, until Textual is fully released. Please follow
   * the tracking issue https://github.com/cosmos/cosmos-sdk/issues/11970.
   *  - SIGN_MODE_DIRECT_AUX: SIGN_MODE_DIRECT_AUX specifies a signing mode which uses
   * SignDocDirectAux. As opposed to SIGN_MODE_DIRECT, this sign mode does not
   * require signers signing over other signers' `signer_info`. It also allows
   * for adding Tips in transactions.
   *
   * Since: cosmos-sdk 0.46
   *  - SIGN_MODE_LEGACY_AMINO_JSON: SIGN_MODE_LEGACY_AMINO_JSON is a backwards compatibility mode which uses
   * Amino JSON and will be removed in the future.
   *  - SIGN_MODE_EIP_191: SIGN_MODE_EIP_191 specifies the sign mode for EIP 191 signing on the Cosmos
   * SDK. Ref: https://eips.ethereum.org/EIPS/eip-191
   *
   * Currently, SIGN_MODE_EIP_191 is registered as a SignMode enum variant,
   * but is not implemented on the SDK by default. To enable EIP-191, you need
   * to pass a custom `TxConfig` that has an implementation of
   * `SignModeHandler` for EIP-191. The SDK may decide to fully support
   * EIP-191 in the future.
   *
   * Since: cosmos-sdk 0.45.2
   */
  mode?: CosmosTxSigningV1Beta1SignMode
}

/**
 * OrderBy defines the sorting order
 * - ORDER_BY_UNSPECIFIED: ORDER_BY_UNSPECIFIED specifies an unknown sorting order. OrderBy defaults
 * to ASC in this case.
 *  - ORDER_BY_ASC: ORDER_BY_ASC defines ascending order
 *  - ORDER_BY_DESC: ORDER_BY_DESC defines descending order
 * @default "ORDER_BY_UNSPECIFIED"
 */
export enum CosmosTxV1Beta1OrderBy {
  ORDER_BY_UNSPECIFIED = 'ORDER_BY_UNSPECIFIED',
  ORDER_BY_ASC = 'ORDER_BY_ASC',
  ORDER_BY_DESC = 'ORDER_BY_DESC',
}

/**
 * SignerInfo describes the public key and signing mode of a single top-level
 * signer.
 */
export interface CosmosTxV1Beta1SignerInfo {
  /**
   * public_key is the public key of the signer. It is optional for accounts
   * that already exist in state. If unset, the verifier can use the required \
   * signer address for this position and lookup the public key.
   */
  public_key?: GoogleProtobufAny
  /**
   * mode_info describes the signing mode of the signer and is a nested
   * structure to support nested multisig pubkey's
   * ModeInfo describes the signing mode of a single or nested multisig signer.
   */
  mode_info?: CosmosTxV1Beta1ModeInfo
  /**
   * sequence is the sequence of the account, which describes the
   * number of committed transactions signed by a given address. It is used to
   * prevent replay attacks.
   * @format uint64
   */
  sequence?: string
}

/**
 * SimulateRequest is the request type for the Service.Simulate
 * RPC method.
 */
export interface CosmosTxV1Beta1SimulateRequest {
  /**
   * tx is the transaction to simulate.
   * Deprecated. Send raw tx bytes instead.
   */
  tx?: CosmosTxV1Beta1Tx
  /**
   * tx_bytes is the raw transaction.
   *
   * Since: cosmos-sdk 0.43
   * @format byte
   */
  tx_bytes?: string
}

/**
 * SimulateResponse is the response type for the
 * Service.SimulateRPC method.
 */
export interface CosmosTxV1Beta1SimulateResponse {
  /** gas_info is the information about gas used in the simulation. */
  gas_info?: CosmosBaseAbciV1Beta1GasInfo
  /** result is the result of the simulation. */
  result?: CosmosBaseAbciV1Beta1Result
}

/**
 * Tip is the tip used for meta-transactions.
 *
 * Since: cosmos-sdk 0.46
 */
export interface CosmosTxV1Beta1Tip {
  /** amount is the amount of the tip */
  amount?: CosmosBaseV1Beta1Coin[]
  /** tipper is the address of the account paying for the tip */
  tipper?: string
}

/** Tx is the standard type used for broadcasting transactions. */
export interface CosmosTxV1Beta1Tx {
  /**
   * body is the processable content of the transaction
   * TxBody is the body of a transaction that all signers sign over.
   */
  body?: CosmosTxV1Beta1TxBody
  /**
   * auth_info is the authorization related content of the transaction,
   * specifically signers, signer modes and fee
   * AuthInfo describes the fee and signer modes that are used to sign a
   * transaction.
   */
  auth_info?: CosmosTxV1Beta1AuthInfo
  /**
   * signatures is a list of signatures that matches the length and order of
   * AuthInfo's signer_infos to allow connecting signature meta information like
   * public key and signing mode by position.
   */
  signatures?: string[]
}

/** TxBody is the body of a transaction that all signers sign over. */
export interface CosmosTxV1Beta1TxBody {
  /**
   * messages is a list of messages to be executed. The required signers of
   * those messages define the number and order of elements in AuthInfo's
   * signer_infos and Tx's signatures. Each required signer address is added to
   * the list only the first time it occurs.
   * By convention, the first required signer (usually from the first message)
   * is referred to as the primary signer and pays the fee for the whole
   * transaction.
   */
  messages?: GoogleProtobufAny[]
  /**
   * memo is any arbitrary note/comment to be added to the transaction.
   * WARNING: in clients, any publicly exposed text should not be called memo,
   * but should be called `note` instead (see https://github.com/cosmos/cosmos-sdk/issues/9122).
   */
  memo?: string
  /**
   * timeout is the block height after which this transaction will not
   * be processed by the chain
   * @format uint64
   */
  timeout_height?: string
  /**
   * extension_options are arbitrary options that can be added by chains
   * when the default options are not sufficient. If any of these are present
   * and can't be handled, the transaction will be rejected
   */
  extension_options?: GoogleProtobufAny[]
  /**
   * extension_options are arbitrary options that can be added by chains
   * when the default options are not sufficient. If any of these are present
   * and can't be handled, they will be ignored
   */
  non_critical_extension_options?: GoogleProtobufAny[]
}

/**
 * TxDecodeAminoRequest is the request type for the Service.TxDecodeAmino
 * RPC method.
 *
 * Since: cosmos-sdk 0.47
 */
export interface CosmosTxV1Beta1TxDecodeAminoRequest {
  /** @format byte */
  amino_binary?: string
}

/**
 * TxDecodeAminoResponse is the response type for the Service.TxDecodeAmino
 * RPC method.
 *
 * Since: cosmos-sdk 0.47
 */
export interface CosmosTxV1Beta1TxDecodeAminoResponse {
  amino_json?: string
}

/**
 * TxDecodeRequest is the request type for the Service.TxDecode
 * RPC method.
 *
 * Since: cosmos-sdk 0.47
 */
export interface CosmosTxV1Beta1TxDecodeRequest {
  /**
   * tx_bytes is the raw transaction.
   * @format byte
   */
  tx_bytes?: string
}

/**
 * TxDecodeResponse is the response type for the
 * Service.TxDecode method.
 *
 * Since: cosmos-sdk 0.47
 */
export interface CosmosTxV1Beta1TxDecodeResponse {
  /** tx is the decoded transaction. */
  tx?: CosmosTxV1Beta1Tx
}

/**
 * TxEncodeAminoRequest is the request type for the Service.TxEncodeAmino
 * RPC method.
 *
 * Since: cosmos-sdk 0.47
 */
export interface CosmosTxV1Beta1TxEncodeAminoRequest {
  amino_json?: string
}

/**
 * TxEncodeAminoResponse is the response type for the Service.TxEncodeAmino
 * RPC method.
 *
 * Since: cosmos-sdk 0.47
 */
export interface CosmosTxV1Beta1TxEncodeAminoResponse {
  /** @format byte */
  amino_binary?: string
}

/**
 * TxEncodeRequest is the request type for the Service.TxEncode
 * RPC method.
 *
 * Since: cosmos-sdk 0.47
 */
export interface CosmosTxV1Beta1TxEncodeRequest {
  /** tx is the transaction to encode. */
  tx?: CosmosTxV1Beta1Tx
}

/**
 * TxEncodeResponse is the response type for the
 * Service.TxEncode method.
 *
 * Since: cosmos-sdk 0.47
 */
export interface CosmosTxV1Beta1TxEncodeResponse {
  /**
   * tx_bytes is the encoded transaction bytes.
   * @format byte
   */
  tx_bytes?: string
}

/**
 * Event allows application developers to attach additional information to
 * ResponseFinalizeBlock and ResponseCheckTx.
 * Later, transactions may be queried using these events.
 */
export interface TendermintAbciEvent {
  type?: string
  attributes?: TendermintAbciEventAttribute[]
}

/** EventAttribute is a single key-value pair, associated with an event. */
export interface TendermintAbciEventAttribute {
  key?: string
  value?: string
  index?: boolean
}

/**
 * ModuleVersion specifies a module and its consensus version.
 *
 * Since: cosmos-sdk 0.43
 */
export interface CosmosUpgradeV1Beta1ModuleVersion {
  /** name of the app module */
  name?: string
  /**
   * consensus version of the app module
   * @format uint64
   */
  version?: string
}

/** Plan specifies information about a planned upgrade and when it should occur. */
export interface CosmosUpgradeV1Beta1Plan {
  /**
   * Sets the name for the upgrade. This name will be used by the upgraded
   * version of the software to apply any special "on-upgrade" commands during
   * the first BeginBlock method after the upgrade is applied. It is also used
   * to detect whether a software version can handle a given upgrade. If no
   * upgrade handler with this name has been set in the software, it will be
   * assumed that the software is out-of-date when the upgrade Time or Height is
   * reached and the software will exit.
   */
  name?: string
  /**
   * Deprecated: Time based upgrades have been deprecated. Time based upgrade logic
   * has been removed from the SDK.
   * If this field is not empty, an error will be thrown.
   * @format date-time
   */
  time?: string
  /**
   * The height at which the upgrade must be performed.
   * @format int64
   */
  height?: string
  /**
   * Any application specific upgrade info to be included on-chain
   * such as a git commit that validators could automatically upgrade to
   */
  info?: string
  /**
   * Deprecated: UpgradedClientState field has been deprecated. IBC upgrade logic has been
   * moved to the IBC module in the sub module 02-client.
   * If this field is not empty, an error will be thrown.
   */
  upgraded_client_state?: GoogleProtobufAny
}

/**
 * QueryAppliedPlanResponse is the response type for the Query/AppliedPlan RPC
 * method.
 */
export interface CosmosUpgradeV1Beta1QueryAppliedPlanResponse {
  /**
   * height is the block height at which the plan was applied.
   * @format int64
   */
  height?: string
}

/**
 * QueryAuthorityResponse is the response type for Query/Authority
 * Since: cosmos-sdk 0.46
 */
export interface CosmosUpgradeV1Beta1QueryAuthorityResponse {
  address?: string
}

/**
 * QueryCurrentPlanResponse is the response type for the Query/CurrentPlan RPC
 * method.
 */
export interface CosmosUpgradeV1Beta1QueryCurrentPlanResponse {
  /** plan is the current upgrade plan. */
  plan?: CosmosUpgradeV1Beta1Plan
}

/**
 * QueryModuleVersionsResponse is the response type for the Query/ModuleVersions
 * RPC method.
 *
 * Since: cosmos-sdk 0.43
 */
export interface CosmosUpgradeV1Beta1QueryModuleVersionsResponse {
  /** module_versions is a list of module names with their consensus versions. */
  module_versions?: CosmosUpgradeV1Beta1ModuleVersion[]
}

/**
 * QueryUpgradedConsensusStateResponse is the response type for the Query/UpgradedConsensusState
 * RPC method.
 */
export interface CosmosUpgradeV1Beta1QueryUpgradedConsensusStateResponse {
  /**
   * Since: cosmos-sdk 0.43
   * @format byte
   */
  upgraded_consensus_state?: string
}

/**
 * ChainConfig defines the Ethereum ChainConfig parameters using *sdk.Int values
 * instead of *big.Int.
 */
export interface EthermintEvmV1ChainConfig {
  /** homestead_block switch (nil no fork, 0 = already homestead) */
  homestead_block?: string
  /** dao_fork_block corresponds to TheDAO hard-fork switch block (nil no fork) */
  dao_fork_block?: string
  /** dao_fork_support defines whether the nodes supports or opposes the DAO hard-fork */
  dao_fork_support?: boolean
  /**
   * eip150_block: EIP150 implements the Gas price changes
   * (https://github.com/ethereum/EIPs/issues/150) EIP150 HF block (nil no fork)
   */
  eip150_block?: string
  /** eip150_hash: EIP150 HF hash (needed for header only clients as only gas pricing changed) */
  eip150_hash?: string
  /** eip155_block: EIP155Block HF block */
  eip155_block?: string
  /** eip158_block: EIP158 HF block */
  eip158_block?: string
  /** byzantium_block: Byzantium switch block (nil no fork, 0 = already on byzantium) */
  byzantium_block?: string
  /** constantinople_block: Constantinople switch block (nil no fork, 0 = already activated) */
  constantinople_block?: string
  /** petersburg_block: Petersburg switch block (nil same as Constantinople) */
  petersburg_block?: string
  /** istanbul_block: Istanbul switch block (nil no fork, 0 = already on istanbul) */
  istanbul_block?: string
  /** muir_glacier_block: Eip-2384 (bomb delay) switch block (nil no fork, 0 = already activated) */
  muir_glacier_block?: string
  /** berlin_block: Berlin switch block (nil = no fork, 0 = already on berlin) */
  berlin_block?: string
  /** london_block: London switch block (nil = no fork, 0 = already on london) */
  london_block?: string
  /** arrow_glacier_block: Eip-4345 (bomb delay) switch block (nil = no fork, 0 = already activated) */
  arrow_glacier_block?: string
  /** gray_glacier_block: EIP-5133 (bomb delay) switch block (nil = no fork, 0 = already activated) */
  gray_glacier_block?: string
  /** merge_netsplit_block: Virtual fork after The Merge to use as a network splitter */
  merge_netsplit_block?: string
  /** shanghai_block switch block (nil = no fork, 0 = already on shanghai) */
  shanghai_block?: string
  /** cancun_block switch block (nil = no fork, 0 = already on cancun) */
  cancun_block?: string
}

/** EstimateGasResponse defines EstimateGas response */
export interface EthermintEvmV1EstimateGasResponse {
  /**
   * gas returns the estimated gas
   * @format uint64
   */
  gas?: string
}

/**
 * Log represents an protobuf compatible Ethereum Log that defines a contract
 * log event. These events are generated by the LOG opcode and stored/indexed by
 * the node.
 *
 * NOTE: address, topics and data are consensus fields. The rest of the fields
 * are derived, i.e. filled in by the nodes, but not secured by consensus.
 */
export interface EthermintEvmV1Log {
  /** address of the contract that generated the event */
  address?: string
  /** topics is a list of topics provided by the contract. */
  topics?: string[]
  /**
   * data which is supplied by the contract, usually ABI-encoded
   * @format byte
   */
  data?: string
  /**
   * block_number of the block in which the transaction was included
   * @format uint64
   */
  block_number?: string
  /** tx_hash is the transaction hash */
  tx_hash?: string
  /**
   * tx_index of the transaction in the block
   * @format uint64
   */
  tx_index?: string
  /** block_hash of the block in which the transaction was included */
  block_hash?: string
  /**
   * index of the log in the block
   * @format uint64
   */
  index?: string
  /**
   * removed is true if this log was reverted due to a chain
   * reorganisation. You must pay attention to this field if you receive logs
   * through a filter query.
   */
  removed?: boolean
}

/** MsgEthereumTx encapsulates an Ethereum transaction as an SDK message. */
export interface EthermintEvmV1MsgEthereumTx {
  /**
   * data is inner transaction data of the Ethereum transaction
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   *
   * Example 1: Pack and unpack a message in C++.
   *
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   *
   * Example 2: Pack and unpack a message in Java.
   *
   *     Foo foo = ...;
   *     Any any = Any.pack(foo);
   *     ...
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *     }
   *
   * Example 3: Pack and unpack a message in Python.
   *
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     ...
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *       ...
   *
   * Example 4: Pack and unpack a message in Go
   *
   *      foo := &pb.Foo{...}
   *      any, err := anypb.New(foo)
   *      if err != nil {
   *        ...
   *      }
   *      ...
   *      foo := &pb.Foo{}
   *      if err := any.UnmarshalTo(foo); err != nil {
   *        ...
   *      }
   *
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   *
   *
   * JSON
   *
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     }
   *
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   *     }
   *
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *
   *     {
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   *     }
   */
  data?: GoogleProtobufAny
  /**
   * size is the encoded storage size of the transaction (DEPRECATED)
   * @format double
   */
  size?: number
  /** hash of the transaction in hex format */
  hash?: string
  /**
   * from is the ethereum signer address in hex format. This address value is checked
   * against the address derived from the signature (V, R, S) using the
   * secp256k1 elliptic curve
   */
  from?: string
}

/** MsgEthereumTxResponse defines the Msg/EthereumTx response type. */
export interface EthermintEvmV1MsgEthereumTxResponse {
  /**
   * hash of the ethereum transaction in hex format. This hash differs from the
   * Tendermint sha256 hash of the transaction bytes. See
   * https://github.com/tendermint/tendermint/issues/6539 for reference
   */
  hash?: string
  /**
   * logs contains the transaction hash and the proto-compatible ethereum
   * logs.
   */
  logs?: EthermintEvmV1Log[]
  /**
   * ret is the returned data from evm function (result or data supplied with revert
   * opcode)
   * @format byte
   */
  ret?: string
  /** vm_error is the error returned by vm execution */
  vm_error?: string
  /**
   * gas_used specifies how much gas was consumed by the transaction
   * @format uint64
   */
  gas_used?: string
}

/** Params defines the EVM module parameters */
export interface EthermintEvmV1Params {
  /**
   * evm_denom represents the token denomination used to run the EVM state
   * transitions.
   */
  evm_denom?: string
  /** enable_create toggles state transitions that use the vm.Create function */
  enable_create?: boolean
  /** enable_call toggles state transitions that use the vm.Call function */
  enable_call?: boolean
  /** extra_eips defines the additional EIPs for the vm.Config */
  extra_eips?: string[]
  /**
   * chain_config defines the EVM chain configuration parameters
   * ChainConfig defines the Ethereum ChainConfig parameters using *sdk.Int values
   * instead of *big.Int.
   */
  chain_config?: EthermintEvmV1ChainConfig
  /**
   * allow_unprotected_txs defines if replay-protected (i.e non EIP155
   * signed) transactions can be executed on the state machine.
   */
  allow_unprotected_txs?: boolean
  /**
   * active_precompiles defines the slice of hex addresses of the precompiled
   * contracts that are active
   */
  active_precompiles?: string[]
}

/** QueryAccountResponse is the response type for the Query/Account RPC method. */
export interface EthermintEvmV1QueryAccountResponse {
  /** balance is the balance of the EVM denomination. */
  balance?: string
  /** code_hash is the hex-formatted code bytes from the EOA. */
  code_hash?: string
  /**
   * nonce is the account's sequence number.
   * @format uint64
   */
  nonce?: string
}

/** QueryBalanceResponse is the response type for the Query/Balance RPC method. */
export interface EthermintEvmV1QueryBalanceResponse {
  /** balance is the balance of the EVM denomination. */
  balance?: string
}

/** QueryBaseFeeResponse returns the EIP1559 base fee. */
export interface EthermintEvmV1QueryBaseFeeResponse {
  /** base_fee is the EIP1559 base fee */
  base_fee?: string
}

/**
 * QueryCodeResponse is the response type for the Query/Code RPC
 * method.
 */
export interface EthermintEvmV1QueryCodeResponse {
  /**
   * code represents the code bytes from an ethereum address.
   * @format byte
   */
  code?: string
}

/**
 * QueryCosmosAccountResponse is the response type for the Query/CosmosAccount
 * RPC method.
 */
export interface EthermintEvmV1QueryCosmosAccountResponse {
  /** cosmos_address is the cosmos address of the account. */
  cosmos_address?: string
  /**
   * sequence is the account's sequence number.
   * @format uint64
   */
  sequence?: string
  /**
   * account_number is the account number
   * @format uint64
   */
  account_number?: string
}

/** QueryParamsResponse defines the response type for querying x/evm parameters. */
export interface EthermintEvmV1QueryParamsResponse {
  /** params define the evm module parameters. */
  params?: EthermintEvmV1Params
}

/**
 * QueryStorageResponse is the response type for the Query/Storage RPC
 * method.
 */
export interface EthermintEvmV1QueryStorageResponse {
  /** value defines the storage state value hash associated with the given key. */
  value?: string
}

/** QueryTraceBlockResponse defines TraceBlock response */
export interface EthermintEvmV1QueryTraceBlockResponse {
  /**
   * data is the response serialized in bytes
   * @format byte
   */
  data?: string
}

/** QueryTraceTxResponse defines TraceTx response */
export interface EthermintEvmV1QueryTraceTxResponse {
  /**
   * data is the response serialized in bytes
   * @format byte
   */
  data?: string
}

/**
 * QueryValidatorAccountResponse is the response type for the
 * Query/ValidatorAccount RPC method.
 */
export interface EthermintEvmV1QueryValidatorAccountResponse {
  /** account_address is the cosmos address of the account in bech32 format. */
  account_address?: string
  /**
   * sequence is the account's sequence number.
   * @format uint64
   */
  sequence?: string
  /**
   * account_number is the account number
   * @format uint64
   */
  account_number?: string
}

/** TraceConfig holds extra parameters to trace functions. */
export interface EthermintEvmV1TraceConfig {
  /** tracer is a custom javascript tracer */
  tracer?: string
  /**
   * timeout overrides the default timeout of 5 seconds for JavaScript-based tracing
   * calls
   */
  timeout?: string
  /**
   * reexec defines the number of blocks the tracer is willing to go back
   * @format uint64
   */
  reexec?: string
  /** disable_stack switches stack capture */
  disable_stack?: boolean
  /** disable_storage switches storage capture */
  disable_storage?: boolean
  /** debug can be used to print output during capture end */
  debug?: boolean
  /**
   * limit defines the maximum length of output, but zero means unlimited
   * @format int32
   */
  limit?: number
  /**
   * overrides can be used to execute a trace using future fork rules
   * ChainConfig defines the Ethereum ChainConfig parameters using *sdk.Int values
   * instead of *big.Int.
   */
  overrides?: EthermintEvmV1ChainConfig
  /** enable_memory switches memory capture */
  enable_memory?: boolean
  /** enable_return_data switches the capture of return data */
  enable_return_data?: boolean
  /** tracer_json_config configures the tracer using a JSON string */
  tracer_json_config?: string
}

/** Params defines the EVM module parameters */
export interface EthermintFeemarketV1Params {
  /** no_base_fee forces the EIP-1559 base fee to 0 (needed for 0 price calls) */
  no_base_fee?: boolean
  /**
   * base_fee_change_denominator bounds the amount the base fee can change
   * between blocks.
   * @format int64
   */
  base_fee_change_denominator?: number
  /**
   * elasticity_multiplier bounds the maximum gas limit an EIP-1559 block may
   * have.
   * @format int64
   */
  elasticity_multiplier?: number
  /**
   * enable_height defines at which block height the base fee calculation is enabled.
   * @format int64
   */
  enable_height?: string
  /** base_fee for EIP-1559 blocks. */
  base_fee?: string
  /** min_gas_price defines the minimum gas price value for cosmos and eth transactions */
  min_gas_price?: string
  /**
   * min_gas_multiplier bounds the minimum gas used to be charged
   * to senders based on gas limit
   */
  min_gas_multiplier?: string
}

/** QueryBaseFeeResponse returns the EIP1559 base fee. */
export interface EthermintFeemarketV1QueryBaseFeeResponse {
  /** base_fee is the EIP1559 base fee */
  base_fee?: string
}

/** QueryBlockGasResponse returns block gas used for a given height. */
export interface EthermintFeemarketV1QueryBlockGasResponse {
  /**
   * gas is the returned block gas
   * @format int64
   */
  gas?: string
}

/** QueryParamsResponse defines the response type for querying x/evm parameters. */
export interface EthermintFeemarketV1QueryParamsResponse {
  /** params define the evm module parameters. */
  params?: EthermintFeemarketV1Params
}

/**
 * Action defines the list of available actions to claim the airdrop tokens.
 *
 *  - ACTION_UNSPECIFIED: ACTION_UNSPECIFIED defines an invalid action.
 *  - ACTION_VOTE: ACTION_VOTE defines a proposal vote.
 *  - ACTION_DELEGATE: ACTION_DELEGATE defines an staking delegation.
 *  - ACTION_EVM: ACTION_EVM defines an EVM transaction.
 *  - ACTION_IBC_TRANSFER: ACTION_IBC_TRANSFER defines a fungible token transfer transaction via IBC.
 * @default "ACTION_UNSPECIFIED"
 */
export enum EvmosClaimsV1Action {
  ACTION_UNSPECIFIED = 'ACTION_UNSPECIFIED',
  ACTION_VOTE = 'ACTION_VOTE',
  ACTION_DELEGATE = 'ACTION_DELEGATE',
  ACTION_EVM = 'ACTION_EVM',
  ACTION_IBC_TRANSFER = 'ACTION_IBC_TRANSFER',
}

/**
 * Claim defines the action, completed flag and the remaining claimable amount
 * for a given user. This is only used during client queries.
 */
export interface EvmosClaimsV1Claim {
  /**
   * action enum
   * Action defines the list of available actions to claim the airdrop tokens.
   *
   *  - ACTION_UNSPECIFIED: ACTION_UNSPECIFIED defines an invalid action.
   *  - ACTION_VOTE: ACTION_VOTE defines a proposal vote.
   *  - ACTION_DELEGATE: ACTION_DELEGATE defines an staking delegation.
   *  - ACTION_EVM: ACTION_EVM defines an EVM transaction.
   *  - ACTION_IBC_TRANSFER: ACTION_IBC_TRANSFER defines a fungible token transfer transaction via IBC.
   */
  action?: EvmosClaimsV1Action
  /** completed is true if the action has been completed */
  completed?: boolean
  /** claimable_amount of tokens for the action. Zero if completed */
  claimable_amount?: string
}

/**
 * ClaimsRecordAddress is the claims metadata per address that is used at
 * Genesis.
 */
export interface EvmosClaimsV1ClaimsRecordAddress {
  /** address of claiming user in either bech32 or hex format */
  address?: string
  /** initial_claimable_amount for the user */
  initial_claimable_amount?: string
  /** actions_completed is a slice that describes which actions were completed */
  actions_completed?: boolean[]
}

/** Params defines the claims module's parameters. */
export interface EvmosClaimsV1Params {
  /** enable_claims is the parameter to enable the claiming process */
  enable_claims?: boolean
  /**
   * airdrop_start_time defines the timestamp of the airdrop start
   * @format date-time
   */
  airdrop_start_time?: string
  /** duration_until_decay of claimable tokens begin */
  duration_until_decay?: string
  /** duration_of_decay for token claim decay period */
  duration_of_decay?: string
  /** claims_denom is the denomination of the claimable coin */
  claims_denom?: string
  /**
   * authorized_channels is the list of authorized channel identifiers that can perform address
   * attestations via IBC.
   */
  authorized_channels?: string[]
  /** evm_channels is the list of channel identifiers from EVM compatible chains */
  evm_channels?: string[]
}

/**
 * QueryClaimsRecordResponse is the response type for the Query/ClaimsRecord RPC
 * method.
 */
export interface EvmosClaimsV1QueryClaimsRecordResponse {
  /** initial_claimable_amount of the user */
  initial_claimable_amount?: string
  /** claims of the user */
  claims?: EvmosClaimsV1Claim[]
}

/**
 * QueryClaimsRecordsResponse is the response type for the Query/ClaimsRecords
 * RPC method.
 */
export interface EvmosClaimsV1QueryClaimsRecordsResponse {
  /** claims defines all claims records */
  claims?: EvmosClaimsV1ClaimsRecordAddress[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface EvmosClaimsV1QueryParamsResponse {
  /** params defines the parameters of the module. */
  params?: EvmosClaimsV1Params
}

/**
 * QueryTotalUnclaimedResponse is the response type for the Query/TotalUnclaimed
 * RPC method.
 */
export interface EvmosClaimsV1QueryTotalUnclaimedResponse {
  /** coins defines the unclaimed coins */
  coins?: CosmosBaseV1Beta1Coin[]
}

/**
 * EpochInfo defines the message interface containing the relevant informations about
 * an epoch.
 */
export interface EvmosEpochsV1EpochInfo {
  /** identifier of the epoch */
  identifier?: string
  /**
   * start_time of the epoch
   * @format date-time
   */
  start_time?: string
  /** duration of the epoch */
  duration?: string
  /**
   * current_epoch is the integer identifier of the epoch
   * @format int64
   */
  current_epoch?: string
  /**
   * current_epoch_start_time defines the timestamp of the start of the epoch
   * @format date-time
   */
  current_epoch_start_time?: string
  /** epoch_counting_started reflects if the counting for the epoch has started */
  epoch_counting_started?: boolean
  /**
   * current_epoch_start_height of the epoch
   * @format int64
   */
  current_epoch_start_height?: string
}

/**
 * QueryCurrentEpochResponse is the response type for the Query/EpochInfos RPC
 * method.
 */
export interface EvmosEpochsV1QueryCurrentEpochResponse {
  /**
   * current_epoch is the number of the current epoch
   * @format int64
   */
  current_epoch?: string
}

/**
 * QueryEpochsInfoResponse is the response type for the Query/EpochInfos RPC
 * method.
 */
export interface EvmosEpochsV1QueryEpochsInfoResponse {
  /** epochs is a slice of all EpochInfos */
  epochs?: EvmosEpochsV1EpochInfo[]
  /** pagination defines an optional pagination for the request. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/**
 * Owner enumerates the ownership of a ERC20 contract.
 *
 *  - OWNER_UNSPECIFIED: OWNER_UNSPECIFIED defines an invalid/undefined owner.
 *  - OWNER_MODULE: OWNER_MODULE - erc20 is owned by the erc20 module account.
 *  - OWNER_EXTERNAL: OWNER_EXTERNAL - erc20 is owned by an external account.
 * @default "OWNER_UNSPECIFIED"
 */
export enum EvmosErc20V1Owner {
  OWNER_UNSPECIFIED = 'OWNER_UNSPECIFIED',
  OWNER_MODULE = 'OWNER_MODULE',
  OWNER_EXTERNAL = 'OWNER_EXTERNAL',
}

/** Params defines the erc20 module params */
export interface EvmosErc20V1Params {
  /** enable_erc20 is the parameter to enable the conversion of Cosmos coins <--> ERC20 tokens. */
  enable_erc20?: boolean
  /**
   * enable_evm_hook is the parameter to enable the EVM hook that converts an ERC20 token to a Cosmos
   * Coin by transferring the Tokens through a MsgEthereumTx to the ModuleAddress Ethereum address.
   */
  enable_evm_hook?: boolean
}

/**
 * QueryParamsResponse is the response type for the Query/Params RPC
 * method.
 */
export interface EvmosErc20V1QueryParamsResponse {
  /** params are the erc20 module parameters */
  params?: EvmosErc20V1Params
}

/**
 * QueryTokenPairResponse is the response type for the Query/TokenPair RPC
 * method.
 */
export interface EvmosErc20V1QueryTokenPairResponse {
  /**
   * token_pairs returns the info about a registered token pair for the erc20 module
   * TokenPair defines an instance that records a pairing consisting of a native
   *  Cosmos Coin and an ERC20 token address.
   */
  token_pair?: EvmosErc20V1TokenPair
}

/**
 * QueryTokenPairsResponse is the response type for the Query/TokenPairs RPC
 * method.
 */
export interface EvmosErc20V1QueryTokenPairsResponse {
  /** token_pairs is a slice of registered token pairs for the erc20 module */
  token_pairs?: EvmosErc20V1TokenPair[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/**
 * TokenPair defines an instance that records a pairing consisting of a native
 *  Cosmos Coin and an ERC20 token address.
 */
export interface EvmosErc20V1TokenPair {
  /** erc20_address is the hex address of ERC20 contract token */
  erc20_address?: string
  /** denom defines the cosmos base denomination to be mapped to */
  denom?: string
  /** enabled defines the token mapping enable status */
  enabled?: boolean
  /**
   * contract_owner is the an ENUM specifying the type of ERC20 owner (0 invalid, 1 ModuleAccount, 2 external address)
   * Owner enumerates the ownership of a ERC20 contract.
   *
   *  - OWNER_UNSPECIFIED: OWNER_UNSPECIFIED defines an invalid/undefined owner.
   *  - OWNER_MODULE: OWNER_MODULE - erc20 is owned by the erc20 module account.
   *  - OWNER_EXTERNAL: OWNER_EXTERNAL - erc20 is owned by an external account.
   */
  contract_owner?: EvmosErc20V1Owner
}

/** GasMeter tracks the cumulative gas spent per participant in one epoch */
export interface EvmosIncentivesV1GasMeter {
  /** contract is the hex address of the incentivized smart contract */
  contract?: string
  /** participant address that interacts with the incentive */
  participant?: string
  /**
   * cumulative_gas spent during the epoch
   * @format uint64
   */
  cumulative_gas?: string
}

/**
 * Incentive defines an instance that organizes distribution conditions for a
 * given smart contract
 */
export interface EvmosIncentivesV1Incentive {
  /** contract address of the smart contract to be incentivized */
  contract?: string
  /** allocations is a slice of denoms and percentages of rewards to be allocated */
  allocations?: CosmosBaseV1Beta1DecCoin[]
  /**
   * epochs defines the number of remaining epochs for the incentive
   * @format int64
   */
  epochs?: number
  /**
   * start_time of the incentive distribution
   * @format date-time
   */
  start_time?: string
  /**
   * total_gas is the cumulative gas spent by all gas meters of the incentive during the epoch
   * @format uint64
   */
  total_gas?: string
}

/** Params defines the incentives module params */
export interface EvmosIncentivesV1Params {
  /** enable_incentives is the parameter to enable incentives */
  enable_incentives?: boolean
  /** allocation_limit is the maximum percentage an incentive can allocate per denomination */
  allocation_limit?: string
  /** incentives_epoch_identifier for the epochs module hooks */
  incentives_epoch_identifier?: string
  /** reward_scaler is the scaling factor for capping rewards */
  reward_scaler?: string
}

/**
 * QueryAllocationMeterResponse is the response type for the
 * Query/AllocationMeter RPC method.
 */
export interface EvmosIncentivesV1QueryAllocationMeterResponse {
  /**
   * allocation_meter defines the allocation of the queried denom
   * DecCoin defines a token with a denomination and a decimal amount.
   *
   * NOTE: The amount field is an Dec which implements the custom method
   * signatures required by gogoproto.
   */
  allocation_meter?: CosmosBaseV1Beta1DecCoin
}

/**
 * QueryAllocationMetersResponse is the response type for the
 * Query/AllocationMeters RPC method.
 */
export interface EvmosIncentivesV1QueryAllocationMetersResponse {
  /** allocation_meters is a slice of all allocations */
  allocation_meters?: CosmosBaseV1Beta1DecCoin[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/**
 * QueryGasMeterResponse is the response type for the Query/Incentive RPC
 * method.
 */
export interface EvmosIncentivesV1QueryGasMeterResponse {
  /**
   * gas_meter is a gas meter for one participant on an incentivized smart contract
   * @format uint64
   */
  gas_meter?: string
}

/**
 * QueryGasMetersResponse is the response type for the Query/Incentives RPC
 * method.
 */
export interface EvmosIncentivesV1QueryGasMetersResponse {
  /** gas_meters is a slice of the gas meters for an incentivized smart contract */
  gas_meters?: EvmosIncentivesV1GasMeter[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/**
 * QueryIncentiveResponse is the response type for the Query/Incentive RPC
 * method.
 */
export interface EvmosIncentivesV1QueryIncentiveResponse {
  /** incentive is the returned incentive for the queried contract */
  incentive?: EvmosIncentivesV1Incentive
}

/**
 * QueryIncentivesResponse is the response type for the Query/Incentives RPC
 * method.
 */
export interface EvmosIncentivesV1QueryIncentivesResponse {
  /** incentives is a slice of all incentives */
  incentives?: EvmosIncentivesV1Incentive[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/**
 * QueryParamsResponse is the response type for the Query/Params RPC
 * method.
 */
export interface EvmosIncentivesV1QueryParamsResponse {
  /** params are the incentives module parameters */
  params?: EvmosIncentivesV1Params
}

/**
 * ExponentialCalculation holds factors to calculate exponential inflation on
 * each period. Calculation reference:
 * periodProvision = exponentialDecay       *  bondingIncentive
 * f(x)            = (a * (1 - r) ^ x + c)  *  (1 + max_variance - bondedRatio *
 * (max_variance / bonding_target))
 */
export interface EvmosInflationV1ExponentialCalculation {
  /** a defines the initial value */
  a?: string
  /** r defines the reduction factor */
  r?: string
  /** c defines the parameter for long term inflation */
  c?: string
  /** bonding_target */
  bonding_target?: string
  /** max_variance */
  max_variance?: string
}

/**
 * InflationDistribution defines the distribution in which inflation is
 * allocated through minting on each epoch (staking, incentives, community). It
 * excludes the team vesting distribution, as this is minted once at genesis.
 * The initial InflationDistribution can be calculated from the Evmos Token
 * Model like this:
 * mintDistribution1 = distribution1 / (1 - teamVestingDistribution)
 * 0.5333333         = 40%           / (1 - 25%)
 */
export interface EvmosInflationV1InflationDistribution {
  /**
   * staking_rewards defines the proportion of the minted minted_denom that is
   * to be allocated as staking rewards
   */
  staking_rewards?: string
  /**
   * usage_incentives defines the proportion of the minted minted_denom that is
   * to be allocated to the incentives module address
   */
  usage_incentives?: string
  /**
   * community_pool defines the proportion of the minted minted_denom that is to
   * be allocated to the community pool
   */
  community_pool?: string
}

/** Params holds parameters for the inflation module. */
export interface EvmosInflationV1Params {
  /** mint_denom specifies the type of coin to mint */
  mint_denom?: string
  /** exponential_calculation takes in the variables to calculate exponential inflation */
  exponential_calculation?: EvmosInflationV1ExponentialCalculation
  /** inflation_distribution of the minted denom */
  inflation_distribution?: EvmosInflationV1InflationDistribution
  /** enable_inflation is the parameter that enables inflation and halts increasing the skipped_epochs */
  enable_inflation?: boolean
}

/**
 * QueryCirculatingSupplyResponse is the response type for the
 * Query/CirculatingSupply RPC method.
 */
export interface EvmosInflationV1QueryCirculatingSupplyResponse {
  /**
   * circulating_supply is the total amount of coins in circulation
   * DecCoin defines a token with a denomination and a decimal amount.
   *
   * NOTE: The amount field is an Dec which implements the custom method
   * signatures required by gogoproto.
   */
  circulating_supply?: CosmosBaseV1Beta1DecCoin
}

/**
 * QueryEpochMintProvisionResponse is the response type for the
 * Query/EpochMintProvision RPC method.
 */
export interface EvmosInflationV1QueryEpochMintProvisionResponse {
  /** epoch_mint_provision is the current minting per epoch provision value. */
  epoch_mint_provision?: CosmosBaseV1Beta1DecCoin
}

/**
 * QueryInflationRateResponse is the response type for the Query/InflationRate
 * RPC method.
 */
export interface EvmosInflationV1QueryInflationRateResponse {
  /** inflation_rate by which the total supply increases within one period */
  inflation_rate?: string
}

/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface EvmosInflationV1QueryParamsResponse {
  /** params defines the parameters of the module. */
  params?: EvmosInflationV1Params
}

/** QueryPeriodResponse is the response type for the Query/Period RPC method. */
export interface EvmosInflationV1QueryPeriodResponse {
  /**
   * period is the current minting per epoch provision value.
   * @format uint64
   */
  period?: string
}

/**
 * QuerySkippedEpochsResponse is the response type for the Query/SkippedEpochs
 * RPC method.
 */
export interface EvmosInflationV1QuerySkippedEpochsResponse {
  /**
   * skipped_epochs is the number of epochs that the inflation module has been disabled.
   * @format uint64
   */
  skipped_epochs?: string
}

/** Params holds parameters for the recovery module */
export interface EvmosRecoveryV1Params {
  /** enable_recovery IBC middleware */
  enable_recovery?: boolean
  /** packet_timeout_duration is the duration added to timeout timestamp for balances recovered via IBC packets */
  packet_timeout_duration?: string
}

/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface EvmosRecoveryV1QueryParamsResponse {
  /** params defines the parameters of the module. */
  params?: EvmosRecoveryV1Params
}

/** Params defines the revenue module params */
export interface EvmosRevenueV1Params {
  /** enable_revenue defines a parameter to enable the revenue module */
  enable_revenue?: boolean
  /**
   * developer_shares defines the proportion of the transaction fees to be
   * distributed to the registered contract owner
   */
  developer_shares?: string
  /**
   * addr_derivation_cost_create defines the cost of address derivation for
   * verifying the contract deployer at fee registration
   * @format uint64
   */
  addr_derivation_cost_create?: string
}

/**
 * QueryDeployerRevenuesResponse is the response type for the
 * Query/DeployerRevenues RPC method.
 */
export interface EvmosRevenueV1QueryDeployerRevenuesResponse {
  /** contract_addresses is the slice of registered contract addresses for a deployer */
  contract_addresses?: string[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface EvmosRevenueV1QueryParamsResponse {
  /** params is the returned revenue parameter */
  params?: EvmosRevenueV1Params
}

/** QueryRevenueResponse is the response type for the Query/Revenue RPC method. */
export interface EvmosRevenueV1QueryRevenueResponse {
  /** revenue is a stored Reveneue for the queried contract */
  revenue?: EvmosRevenueV1Revenue
}

/** QueryRevenuesResponse is the response type for the Query/Revenues RPC method. */
export interface EvmosRevenueV1QueryRevenuesResponse {
  /** revenues is a slice of all stored Reveneue */
  revenues?: EvmosRevenueV1Revenue[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/**
 * QueryWithdrawerRevenuesResponse is the response type for the
 * Query/WithdrawerRevenues RPC method.
 */
export interface EvmosRevenueV1QueryWithdrawerRevenuesResponse {
  /** contract_addresses is the slice of registered contract addresses for a withdrawer */
  contract_addresses?: string[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/**
 * Revenue defines an instance that organizes fee distribution conditions for
 * the owner of a given smart contract
 */
export interface EvmosRevenueV1Revenue {
  /** contract_address is the hex address of a registered contract */
  contract_address?: string
  /**
   * deployer_address is the bech32 address of message sender. It must be the same as the origin EOA
   * sending the transaction which deploys the contract
   */
  deployer_address?: string
  /**
   * withdrawer_address is the bech32 address of account receiving the transaction fees it defaults to
   * deployer_address
   */
  withdrawer_address?: string
}

/**
 * QueryBalancesResponse is the response type for the Query/Balances RPC
 * method.
 */
export interface EvmosVestingV1QueryBalancesResponse {
  /** locked defines the current amount of locked tokens */
  locked?: CosmosBaseV1Beta1Coin[]
  /** unvested defines the current amount of unvested tokens */
  unvested?: CosmosBaseV1Beta1Coin[]
  /** vested defines the current amount of vested tokens */
  vested?: CosmosBaseV1Beta1Coin[]
}

/** Fee defines the ICS29 receive, acknowledgement and timeout fees */
export interface IbcApplicationsFeeV1Fee {
  /** the packet receive fee */
  recv_fee?: CosmosBaseV1Beta1Coin[]
  /** the packet acknowledgement fee */
  ack_fee?: CosmosBaseV1Beta1Coin[]
  /** the packet timeout fee */
  timeout_fee?: CosmosBaseV1Beta1Coin[]
}

/** FeeEnabledChannel contains the PortID & ChannelID for a fee enabled channel */
export interface IbcApplicationsFeeV1FeeEnabledChannel {
  /** unique port identifier */
  port_id?: string
  /** unique channel identifier */
  channel_id?: string
}

/** IdentifiedPacketFees contains a list of type PacketFee and associated PacketId */
export interface IbcApplicationsFeeV1IdentifiedPacketFees {
  /** unique packet identifier comprised of the channel ID, port ID and sequence */
  packet_id?: IbcCoreChannelV1PacketId
  /** list of packet fees */
  packet_fees?: IbcApplicationsFeeV1PacketFee[]
}

/** PacketFee contains ICS29 relayer fees, refund address and optional list of permitted relayers */
export interface IbcApplicationsFeeV1PacketFee {
  /** fee encapsulates the recv, ack and timeout fees associated with an IBC packet */
  fee?: IbcApplicationsFeeV1Fee
  /** the refund address for unspent fees */
  refund_address?: string
  /** optional list of relayers permitted to receive fees */
  relayers?: string[]
}

/** QueryCounterpartyPayeeResponse defines the response type for the CounterpartyPayee rpc */
export interface IbcApplicationsFeeV1QueryCounterpartyPayeeResponse {
  /** the counterparty payee address used to compensate forward relaying */
  counterparty_payee?: string
}

/** QueryFeeEnabledChannelResponse defines the response type for the FeeEnabledChannel rpc */
export interface IbcApplicationsFeeV1QueryFeeEnabledChannelResponse {
  /** boolean flag representing the fee enabled channel status */
  fee_enabled?: boolean
}

/** QueryFeeEnabledChannelsResponse defines the response type for the FeeEnabledChannels rpc */
export interface IbcApplicationsFeeV1QueryFeeEnabledChannelsResponse {
  /** list of fee enabled channels */
  fee_enabled_channels?: IbcApplicationsFeeV1FeeEnabledChannel[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** QueryIncentivizedPacketsResponse defines the response type for the IncentivizedPacket rpc */
export interface IbcApplicationsFeeV1QueryIncentivizedPacketResponse {
  /** the identified fees for the incentivized packet */
  incentivized_packet?: IbcApplicationsFeeV1IdentifiedPacketFees
}

/** QueryIncentivizedPacketsResponse defines the response type for the incentivized packets RPC */
export interface IbcApplicationsFeeV1QueryIncentivizedPacketsForChannelResponse {
  /** Map of all incentivized_packets */
  incentivized_packets?: IbcApplicationsFeeV1IdentifiedPacketFees[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** QueryIncentivizedPacketsResponse defines the response type for the IncentivizedPackets rpc */
export interface IbcApplicationsFeeV1QueryIncentivizedPacketsResponse {
  /** list of identified fees for incentivized packets */
  incentivized_packets?: IbcApplicationsFeeV1IdentifiedPacketFees[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** QueryPayeeResponse defines the response type for the Payee rpc */
export interface IbcApplicationsFeeV1QueryPayeeResponse {
  /** the payee address to which packet fees are paid out */
  payee_address?: string
}

/** QueryTotalAckFeesResponse defines the response type for the TotalAckFees rpc */
export interface IbcApplicationsFeeV1QueryTotalAckFeesResponse {
  /** the total packet acknowledgement fees */
  ack_fees?: CosmosBaseV1Beta1Coin[]
}

/** QueryTotalRecvFeesResponse defines the response type for the TotalRecvFees rpc */
export interface IbcApplicationsFeeV1QueryTotalRecvFeesResponse {
  /** the total packet receive fees */
  recv_fees?: CosmosBaseV1Beta1Coin[]
}

/** QueryTotalTimeoutFeesResponse defines the response type for the TotalTimeoutFees rpc */
export interface IbcApplicationsFeeV1QueryTotalTimeoutFeesResponse {
  /** the total packet timeout fees */
  timeout_fees?: CosmosBaseV1Beta1Coin[]
}

/**
 * PacketId is an identifer for a unique Packet
 * Source chains refer to packets by source port/channel
 * Destination chains refer to packets by destination port/channel
 */
export interface IbcCoreChannelV1PacketId {
  /** channel port identifier */
  port_id?: string
  /** channel unique identifier */
  channel_id?: string
  /**
   * packet sequence
   * @format uint64
   */
  sequence?: string
}

/**
 * Params defines the set of on-chain interchain accounts parameters.
 * The following parameters may be used to disable the controller submodule.
 */
export interface IbcApplicationsInterchainAccountsControllerV1Params {
  /** controller_enabled enables or disables the controller submodule. */
  controller_enabled?: boolean
}

/** QueryInterchainAccountResponse the response type for the Query/InterchainAccount RPC method. */
export interface IbcApplicationsInterchainAccountsControllerV1QueryInterchainAccountResponse {
  address?: string
}

/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface IbcApplicationsInterchainAccountsControllerV1QueryParamsResponse {
  /** params defines the parameters of the module. */
  params?: IbcApplicationsInterchainAccountsControllerV1Params
}

/**
 * Params defines the set of on-chain interchain accounts parameters.
 * The following parameters may be used to disable the host submodule.
 */
export interface IbcApplicationsInterchainAccountsHostV1Params {
  /** host_enabled enables or disables the host submodule. */
  host_enabled?: boolean
  /** allow_messages defines a list of sdk message typeURLs allowed to be executed on a host chain. */
  allow_messages?: string[]
}

/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface IbcApplicationsInterchainAccountsHostV1QueryParamsResponse {
  /** params defines the parameters of the module. */
  params?: IbcApplicationsInterchainAccountsHostV1Params
}

/**
 * DenomTrace contains the base denomination for ICS20 fungible tokens and the
 * source tracing information path.
 */
export interface IbcApplicationsTransferV1DenomTrace {
  /**
   * path defines the chain of port/channel identifiers used for tracing the
   * source of the fungible token.
   */
  path?: string
  /** base denomination of the relayed fungible token. */
  base_denom?: string
}

/**
 * Params defines the set of IBC transfer parameters.
 * NOTE: To prevent a single token from being transferred, set the
 * TransfersEnabled parameter to true and then set the bank module's SendEnabled
 * parameter for the denomination to false.
 */
export interface IbcApplicationsTransferV1Params {
  /**
   * send_enabled enables or disables all cross-chain token transfers from this
   * chain.
   */
  send_enabled?: boolean
  /**
   * receive_enabled enables or disables all cross-chain token transfers to this
   * chain.
   */
  receive_enabled?: boolean
}

/**
 * QueryDenomHashResponse is the response type for the Query/DenomHash RPC
 * method.
 */
export interface IbcApplicationsTransferV1QueryDenomHashResponse {
  /** hash (in hex format) of the denomination trace information. */
  hash?: string
}

/**
 * QueryDenomTraceResponse is the response type for the Query/DenomTrace RPC
 * method.
 */
export interface IbcApplicationsTransferV1QueryDenomTraceResponse {
  /** denom_trace returns the requested denomination trace information. */
  denom_trace?: IbcApplicationsTransferV1DenomTrace
}

/**
 * QueryConnectionsResponse is the response type for the Query/DenomTraces RPC
 * method.
 */
export interface IbcApplicationsTransferV1QueryDenomTracesResponse {
  /** denom_traces returns all denominations trace information. */
  denom_traces?: IbcApplicationsTransferV1DenomTrace[]
  /** pagination defines the pagination in the response. */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/** QueryEscrowAddressResponse is the response type of the EscrowAddress RPC method. */
export interface IbcApplicationsTransferV1QueryEscrowAddressResponse {
  /** the escrow account address */
  escrow_address?: string
}

/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface IbcApplicationsTransferV1QueryParamsResponse {
  /** params defines the parameters of the module. */
  params?: IbcApplicationsTransferV1Params
}

/** QueryTotalEscrowForDenomResponse is the response type for TotalEscrowForDenom RPC method. */
export interface IbcApplicationsTransferV1QueryTotalEscrowForDenomResponse {
  /**
   * Coin defines a token with a denomination and an amount.
   *
   * NOTE: The amount field is an Int which implements the custom method
   * signatures required by gogoproto.
   */
  amount?: CosmosBaseV1Beta1Coin
}

/**
 * Channel defines pipeline for exactly-once packet delivery between specific
 * modules on separate blockchains, which has at least one end capable of
 * sending packets and one end capable of receiving packets.
 */
export interface IbcCoreChannelV1Channel {
  /**
   * current state of the channel end
   * State defines if a channel is in one of the following states:
   * CLOSED, INIT, TRYOPEN, OPEN or UNINITIALIZED.
   *
   *  - STATE_UNINITIALIZED_UNSPECIFIED: Default State
   *  - STATE_INIT: A channel has just started the opening handshake.
   *  - STATE_TRYOPEN: A channel has acknowledged the handshake step on the counterparty chain.
   *  - STATE_OPEN: A channel has completed the handshake. Open channels are
   * ready to send and receive packets.
   *  - STATE_CLOSED: A channel has been closed and can no longer be used to send or receive
   * packets.
   */
  state?: IbcCoreChannelV1State
  /**
   * whether the channel is ordered or unordered
   * - ORDER_NONE_UNSPECIFIED: zero-value for channel ordering
   *  - ORDER_UNORDERED: packets can be delivered in any order, which may differ from the order in
   * which they were sent.
   *  - ORDER_ORDERED: packets are delivered exactly in the order which they were sent
   */
  ordering?: IbcCoreChannelV1Order
  /** counterparty channel end */
  counterparty?: IbcCoreChannelV1Counterparty
  /**
   * list of connection identifiers, in order, along which packets sent on
   * this channel will travel
   */
  connection_hops?: string[]
  /** opaque channel version, which is agreed upon during the handshake */
  version?: string
}

/** Counterparty defines a channel end counterparty */
export interface IbcCoreChannelV1Counterparty {
  /** port on the counterparty chain which owns the other end of the channel. */
  port_id?: string
  /** channel end on the counterparty chain */
  channel_id?: string
}

/**
 * IdentifiedChannel defines a channel with additional port and channel
 * identifier fields.
 */
export interface IbcCoreChannelV1IdentifiedChannel {
  /**
   * current state of the channel end
   * State defines if a channel is in one of the following states:
   * CLOSED, INIT, TRYOPEN, OPEN or UNINITIALIZED.
   *
   *  - STATE_UNINITIALIZED_UNSPECIFIED: Default State
   *  - STATE_INIT: A channel has just started the opening handshake.
   *  - STATE_TRYOPEN: A channel has acknowledged the handshake step on the counterparty chain.
   *  - STATE_OPEN: A channel has completed the handshake. Open channels are
   * ready to send and receive packets.
   *  - STATE_CLOSED: A channel has been closed and can no longer be used to send or receive
   * packets.
   */
  state?: IbcCoreChannelV1State
  /**
   * whether the channel is ordered or unordered
   * - ORDER_NONE_UNSPECIFIED: zero-value for channel ordering
   *  - ORDER_UNORDERED: packets can be delivered in any order, which may differ from the order in
   * which they were sent.
   *  - ORDER_ORDERED: packets are delivered exactly in the order which they were sent
   */
  ordering?: IbcCoreChannelV1Order
  /** counterparty channel end */
  counterparty?: IbcCoreChannelV1Counterparty
  /**
   * list of connection identifiers, in order, along which packets sent on
   * this channel will travel
   */
  connection_hops?: string[]
  /** opaque channel version, which is agreed upon during the handshake */
  version?: string
  /** port identifier */
  port_id?: string
  /** channel identifier */
  channel_id?: string
}

/**
 * Order defines if a channel is ORDERED or UNORDERED
 * - ORDER_NONE_UNSPECIFIED: zero-value for channel ordering
 *  - ORDER_UNORDERED: packets can be delivered in any order, which may differ from the order in
 * which they were sent.
 *  - ORDER_ORDERED: packets are delivered exactly in the order which they were sent
 * @default "ORDER_NONE_UNSPECIFIED"
 */
export enum IbcCoreChannelV1Order {
  ORDER_NONE_UNSPECIFIED = 'ORDER_NONE_UNSPECIFIED',
  ORDER_UNORDERED = 'ORDER_UNORDERED',
  ORDER_ORDERED = 'ORDER_ORDERED',
}

/**
 * PacketState defines the generic type necessary to retrieve and store
 * packet commitments, acknowledgements, and receipts.
 * Caller is responsible for knowing the context necessary to interpret this
 * state as a commitment, acknowledgement, or a receipt.
 */
export interface IbcCoreChannelV1PacketState {
  /** channel port identifier. */
  port_id?: string
  /** channel unique identifier. */
  channel_id?: string
  /**
   * packet sequence.
   * @format uint64
   */
  sequence?: string
  /**
   * embedded data that represents packet state.
   * @format byte
   */
  data?: string
}

/**
 * QueryChannelClientStateResponse is the Response type for the
 * Query/QueryChannelClientState RPC method
 */
export interface IbcCoreChannelV1QueryChannelClientStateResponse {
  /**
   * client state associated with the channel
   * IdentifiedClientState defines a client state with an additional client
   * identifier field.
   */
  identified_client_state?: IbcCoreClientV1IdentifiedClientState
  /**
   * merkle proof of existence
   * @format byte
   */
  proof?: string
  /**
   * height at which the proof was retrieved
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  proof_height?: IbcCoreClientV1Height
}

/**
 * QueryChannelClientStateResponse is the Response type for the
 * Query/QueryChannelClientState RPC method
 */
export interface IbcCoreChannelV1QueryChannelConsensusStateResponse {
  /**
   * consensus state associated with the channel
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   *
   * Example 1: Pack and unpack a message in C++.
   *
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   *
   * Example 2: Pack and unpack a message in Java.
   *
   *     Foo foo = ...;
   *     Any any = Any.pack(foo);
   *     ...
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *     }
   *
   * Example 3: Pack and unpack a message in Python.
   *
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     ...
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *       ...
   *
   * Example 4: Pack and unpack a message in Go
   *
   *      foo := &pb.Foo{...}
   *      any, err := anypb.New(foo)
   *      if err != nil {
   *        ...
   *      }
   *      ...
   *      foo := &pb.Foo{}
   *      if err := any.UnmarshalTo(foo); err != nil {
   *        ...
   *      }
   *
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   *
   *
   * JSON
   *
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     }
   *
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   *     }
   *
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *
   *     {
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   *     }
   */
  consensus_state?: GoogleProtobufAny
  /** client ID associated with the consensus state */
  client_id?: string
  /**
   * merkle proof of existence
   * @format byte
   */
  proof?: string
  /**
   * height at which the proof was retrieved
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  proof_height?: IbcCoreClientV1Height
}

/**
 * QueryChannelResponse is the response type for the Query/Channel RPC method.
 * Besides the Channel end, it includes a proof and the height from which the
 * proof was retrieved.
 */
export interface IbcCoreChannelV1QueryChannelResponse {
  /**
   * channel associated with the request identifiers
   * Channel defines pipeline for exactly-once packet delivery between specific
   * modules on separate blockchains, which has at least one end capable of
   * sending packets and one end capable of receiving packets.
   */
  channel?: IbcCoreChannelV1Channel
  /**
   * merkle proof of existence
   * @format byte
   */
  proof?: string
  /**
   * height at which the proof was retrieved
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  proof_height?: IbcCoreClientV1Height
}

/** QueryChannelsResponse is the response type for the Query/Channels RPC method. */
export interface IbcCoreChannelV1QueryChannelsResponse {
  /** list of stored channels of the chain. */
  channels?: IbcCoreChannelV1IdentifiedChannel[]
  /**
   * pagination response
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
  /**
   * query block height
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  height?: IbcCoreClientV1Height
}

/**
 * QueryConnectionChannelsResponse is the Response type for the
 * Query/QueryConnectionChannels RPC method
 */
export interface IbcCoreChannelV1QueryConnectionChannelsResponse {
  /** list of channels associated with a connection. */
  channels?: IbcCoreChannelV1IdentifiedChannel[]
  /**
   * pagination response
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
  /**
   * query block height
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  height?: IbcCoreClientV1Height
}

/**
 * QuerySequenceResponse is the request type for the
 * Query/QueryNextSequenceReceiveResponse RPC method
 */
export interface IbcCoreChannelV1QueryNextSequenceReceiveResponse {
  /**
   * next sequence receive number
   * @format uint64
   */
  next_sequence_receive?: string
  /**
   * merkle proof of existence
   * @format byte
   */
  proof?: string
  /**
   * height at which the proof was retrieved
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  proof_height?: IbcCoreClientV1Height
}

/**
 * QueryNextSequenceSendResponse is the request type for the
 * Query/QueryNextSequenceSend RPC method
 */
export interface IbcCoreChannelV1QueryNextSequenceSendResponse {
  /**
   * next sequence send number
   * @format uint64
   */
  next_sequence_send?: string
  /**
   * merkle proof of existence
   * @format byte
   */
  proof?: string
  /**
   * height at which the proof was retrieved
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  proof_height?: IbcCoreClientV1Height
}

/**
 * QueryPacketAcknowledgementResponse defines the client query response for a
 * packet which also includes a proof and the height from which the
 * proof was retrieved
 */
export interface IbcCoreChannelV1QueryPacketAcknowledgementResponse {
  /**
   * packet associated with the request fields
   * @format byte
   */
  acknowledgement?: string
  /**
   * merkle proof of existence
   * @format byte
   */
  proof?: string
  /**
   * height at which the proof was retrieved
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  proof_height?: IbcCoreClientV1Height
}

/**
 * QueryPacketAcknowledgemetsResponse is the request type for the
 * Query/QueryPacketAcknowledgements RPC method
 */
export interface IbcCoreChannelV1QueryPacketAcknowledgementsResponse {
  acknowledgements?: IbcCoreChannelV1PacketState[]
  /**
   * pagination response
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
  /**
   * query block height
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  height?: IbcCoreClientV1Height
}

/**
 * QueryPacketCommitmentResponse defines the client query response for a packet
 * which also includes a proof and the height from which the proof was
 * retrieved
 */
export interface IbcCoreChannelV1QueryPacketCommitmentResponse {
  /**
   * packet associated with the request fields
   * @format byte
   */
  commitment?: string
  /**
   * merkle proof of existence
   * @format byte
   */
  proof?: string
  /**
   * height at which the proof was retrieved
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  proof_height?: IbcCoreClientV1Height
}

/**
 * QueryPacketCommitmentsResponse is the request type for the
 * Query/QueryPacketCommitments RPC method
 */
export interface IbcCoreChannelV1QueryPacketCommitmentsResponse {
  commitments?: IbcCoreChannelV1PacketState[]
  /**
   * pagination response
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
  /**
   * query block height
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  height?: IbcCoreClientV1Height
}

/**
 * QueryPacketReceiptResponse defines the client query response for a packet
 * receipt which also includes a proof, and the height from which the proof was
 * retrieved
 */
export interface IbcCoreChannelV1QueryPacketReceiptResponse {
  /** success flag for if receipt exists */
  received?: boolean
  /**
   * merkle proof of existence
   * @format byte
   */
  proof?: string
  /**
   * height at which the proof was retrieved
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  proof_height?: IbcCoreClientV1Height
}

/**
 * QueryUnreceivedAcksResponse is the response type for the
 * Query/UnreceivedAcks RPC method
 */
export interface IbcCoreChannelV1QueryUnreceivedAcksResponse {
  /** list of unreceived acknowledgement sequences */
  sequences?: string[]
  /**
   * query block height
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  height?: IbcCoreClientV1Height
}

/**
 * QueryUnreceivedPacketsResponse is the response type for the
 * Query/UnreceivedPacketCommitments RPC method
 */
export interface IbcCoreChannelV1QueryUnreceivedPacketsResponse {
  /** list of unreceived packet sequences */
  sequences?: string[]
  /**
   * query block height
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  height?: IbcCoreClientV1Height
}

/**
 * State defines if a channel is in one of the following states:
 * CLOSED, INIT, TRYOPEN, OPEN or UNINITIALIZED.
 *
 *  - STATE_UNINITIALIZED_UNSPECIFIED: Default State
 *  - STATE_INIT: A channel has just started the opening handshake.
 *  - STATE_TRYOPEN: A channel has acknowledged the handshake step on the counterparty chain.
 *  - STATE_OPEN: A channel has completed the handshake. Open channels are
 * ready to send and receive packets.
 *  - STATE_CLOSED: A channel has been closed and can no longer be used to send or receive
 * packets.
 * @default "STATE_UNINITIALIZED_UNSPECIFIED"
 */
export enum IbcCoreChannelV1State {
  STATE_UNINITIALIZED_UNSPECIFIED = 'STATE_UNINITIALIZED_UNSPECIFIED',
  STATE_INIT = 'STATE_INIT',
  STATE_TRYOPEN = 'STATE_TRYOPEN',
  STATE_OPEN = 'STATE_OPEN',
  STATE_CLOSED = 'STATE_CLOSED',
}

/**
 * Height is a monotonically increasing data type
 * that can be compared against another Height for the purposes of updating and
 * freezing clients
 * Normally the RevisionHeight is incremented at each height while keeping
 * RevisionNumber the same. However some consensus algorithms may choose to
 * reset the height in certain conditions e.g. hard forks, state-machine
 * breaking changes In these cases, the RevisionNumber is incremented so that
 * height continues to be monitonically increasing even as the RevisionHeight
 * gets reset
 */
export interface IbcCoreClientV1Height {
  /**
   * the revision that the client is currently on
   * @format uint64
   */
  revision_number?: string
  /**
   * the height within the given revision
   * @format uint64
   */
  revision_height?: string
}

/**
 * IdentifiedClientState defines a client state with an additional client
 * identifier field.
 */
export interface IbcCoreClientV1IdentifiedClientState {
  /** client identifier */
  client_id?: string
  /**
   * client state
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   *
   * Example 1: Pack and unpack a message in C++.
   *
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   *
   * Example 2: Pack and unpack a message in Java.
   *
   *     Foo foo = ...;
   *     Any any = Any.pack(foo);
   *     ...
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *     }
   *
   * Example 3: Pack and unpack a message in Python.
   *
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     ...
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *       ...
   *
   * Example 4: Pack and unpack a message in Go
   *
   *      foo := &pb.Foo{...}
   *      any, err := anypb.New(foo)
   *      if err != nil {
   *        ...
   *      }
   *      ...
   *      foo := &pb.Foo{}
   *      if err := any.UnmarshalTo(foo); err != nil {
   *        ...
   *      }
   *
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   *
   *
   * JSON
   *
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     }
   *
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   *     }
   *
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *
   *     {
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   *     }
   */
  client_state?: GoogleProtobufAny
}

/**
 * ConsensusStateWithHeight defines a consensus state with an additional height
 * field.
 */
export interface IbcCoreClientV1ConsensusStateWithHeight {
  /**
   * consensus state height
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  height?: IbcCoreClientV1Height
  /**
   * consensus state
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   *
   * Example 1: Pack and unpack a message in C++.
   *
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   *
   * Example 2: Pack and unpack a message in Java.
   *
   *     Foo foo = ...;
   *     Any any = Any.pack(foo);
   *     ...
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *     }
   *
   * Example 3: Pack and unpack a message in Python.
   *
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     ...
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *       ...
   *
   * Example 4: Pack and unpack a message in Go
   *
   *      foo := &pb.Foo{...}
   *      any, err := anypb.New(foo)
   *      if err != nil {
   *        ...
   *      }
   *      ...
   *      foo := &pb.Foo{}
   *      if err := any.UnmarshalTo(foo); err != nil {
   *        ...
   *      }
   *
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   *
   *
   * JSON
   *
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     }
   *
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   *     }
   *
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *
   *     {
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   *     }
   */
  consensus_state?: GoogleProtobufAny
}

/** Params defines the set of IBC light client parameters. */
export interface IbcCoreClientV1Params {
  /**
   * allowed_clients defines the list of allowed client state types which can be created
   * and interacted with. If a client type is removed from the allowed clients list, usage
   * of this client will be disabled until it is added again to the list.
   */
  allowed_clients?: string[]
}

/**
 * QueryClientParamsResponse is the response type for the Query/ClientParams RPC
 * method.
 */
export interface IbcCoreClientV1QueryClientParamsResponse {
  /** params defines the parameters of the module. */
  params?: IbcCoreClientV1Params
}

/**
 * QueryClientStateResponse is the response type for the Query/ClientState RPC
 * method. Besides the client state, it includes a proof and the height from
 * which the proof was retrieved.
 */
export interface IbcCoreClientV1QueryClientStateResponse {
  /**
   * client state associated with the request identifier
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   *
   * Example 1: Pack and unpack a message in C++.
   *
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   *
   * Example 2: Pack and unpack a message in Java.
   *
   *     Foo foo = ...;
   *     Any any = Any.pack(foo);
   *     ...
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *     }
   *
   * Example 3: Pack and unpack a message in Python.
   *
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     ...
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *       ...
   *
   * Example 4: Pack and unpack a message in Go
   *
   *      foo := &pb.Foo{...}
   *      any, err := anypb.New(foo)
   *      if err != nil {
   *        ...
   *      }
   *      ...
   *      foo := &pb.Foo{}
   *      if err := any.UnmarshalTo(foo); err != nil {
   *        ...
   *      }
   *
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   *
   *
   * JSON
   *
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     }
   *
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   *     }
   *
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *
   *     {
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   *     }
   */
  client_state?: GoogleProtobufAny
  /**
   * merkle proof of existence
   * @format byte
   */
  proof?: string
  /**
   * height at which the proof was retrieved
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  proof_height?: IbcCoreClientV1Height
}

/**
 * QueryClientStatesResponse is the response type for the Query/ClientStates RPC
 * method.
 */
export interface IbcCoreClientV1QueryClientStatesResponse {
  /** list of stored ClientStates of the chain. */
  client_states?: IbcCoreClientV1IdentifiedClientState[]
  /**
   * pagination response
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/**
 * QueryClientStatusResponse is the response type for the Query/ClientStatus RPC
 * method. It returns the current status of the IBC client.
 */
export interface IbcCoreClientV1QueryClientStatusResponse {
  status?: string
}

/**
 * QueryConsensusStateHeightsResponse is the response type for the
 * Query/ConsensusStateHeights RPC method
 */
export interface IbcCoreClientV1QueryConsensusStateHeightsResponse {
  /** consensus state heights */
  consensus_state_heights?: IbcCoreClientV1Height[]
  /**
   * pagination response
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/**
 * QueryConsensusStateResponse is the response type for the Query/ConsensusState
 * RPC method
 */
export interface IbcCoreClientV1QueryConsensusStateResponse {
  /**
   * consensus state associated with the client identifier at the given height
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   *
   * Example 1: Pack and unpack a message in C++.
   *
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   *
   * Example 2: Pack and unpack a message in Java.
   *
   *     Foo foo = ...;
   *     Any any = Any.pack(foo);
   *     ...
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *     }
   *
   * Example 3: Pack and unpack a message in Python.
   *
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     ...
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *       ...
   *
   * Example 4: Pack and unpack a message in Go
   *
   *      foo := &pb.Foo{...}
   *      any, err := anypb.New(foo)
   *      if err != nil {
   *        ...
   *      }
   *      ...
   *      foo := &pb.Foo{}
   *      if err := any.UnmarshalTo(foo); err != nil {
   *        ...
   *      }
   *
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   *
   *
   * JSON
   *
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     }
   *
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   *     }
   *
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *
   *     {
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   *     }
   */
  consensus_state?: GoogleProtobufAny
  /**
   * merkle proof of existence
   * @format byte
   */
  proof?: string
  /**
   * height at which the proof was retrieved
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  proof_height?: IbcCoreClientV1Height
}

/**
 * QueryConsensusStatesResponse is the response type for the
 * Query/ConsensusStates RPC method
 */
export interface IbcCoreClientV1QueryConsensusStatesResponse {
  /** consensus states associated with the identifier */
  consensus_states?: IbcCoreClientV1ConsensusStateWithHeight[]
  /**
   * pagination response
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
}

/**
 * QueryUpgradedClientStateResponse is the response type for the
 * Query/UpgradedClientState RPC method.
 */
export interface IbcCoreClientV1QueryUpgradedClientStateResponse {
  /**
   * client state associated with the request identifier
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   *
   * Example 1: Pack and unpack a message in C++.
   *
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   *
   * Example 2: Pack and unpack a message in Java.
   *
   *     Foo foo = ...;
   *     Any any = Any.pack(foo);
   *     ...
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *     }
   *
   * Example 3: Pack and unpack a message in Python.
   *
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     ...
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *       ...
   *
   * Example 4: Pack and unpack a message in Go
   *
   *      foo := &pb.Foo{...}
   *      any, err := anypb.New(foo)
   *      if err != nil {
   *        ...
   *      }
   *      ...
   *      foo := &pb.Foo{}
   *      if err := any.UnmarshalTo(foo); err != nil {
   *        ...
   *      }
   *
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   *
   *
   * JSON
   *
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     }
   *
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   *     }
   *
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *
   *     {
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   *     }
   */
  upgraded_client_state?: GoogleProtobufAny
}

/**
 * QueryUpgradedConsensusStateResponse is the response type for the
 * Query/UpgradedConsensusState RPC method.
 */
export interface IbcCoreClientV1QueryUpgradedConsensusStateResponse {
  /**
   * Consensus state associated with the request identifier
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   *
   * Example 1: Pack and unpack a message in C++.
   *
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   *
   * Example 2: Pack and unpack a message in Java.
   *
   *     Foo foo = ...;
   *     Any any = Any.pack(foo);
   *     ...
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *     }
   *
   * Example 3: Pack and unpack a message in Python.
   *
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     ...
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *       ...
   *
   * Example 4: Pack and unpack a message in Go
   *
   *      foo := &pb.Foo{...}
   *      any, err := anypb.New(foo)
   *      if err != nil {
   *        ...
   *      }
   *      ...
   *      foo := &pb.Foo{}
   *      if err := any.UnmarshalTo(foo); err != nil {
   *        ...
   *      }
   *
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   *
   *
   * JSON
   *
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     }
   *
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   *     }
   *
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *
   *     {
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   *     }
   */
  upgraded_consensus_state?: GoogleProtobufAny
}

/**
 * MerklePrefix is merkle path prefixed to the key.
 * The constructed key from the Path and the key will be append(Path.KeyPath,
 * append(Path.KeyPrefix, key...))
 */
export interface IbcCoreCommitmentV1MerklePrefix {
  /** @format byte */
  key_prefix?: string
}

/**
 * ConnectionEnd defines a stateful object on a chain connected to another
 * separate one.
 * NOTE: there must only be 2 defined ConnectionEnds to establish
 * a connection between two chains.
 */
export interface IbcCoreConnectionV1ConnectionEnd {
  /** client associated with this connection. */
  client_id?: string
  /**
   * IBC version which can be utilised to determine encodings or protocols for
   * channels or packets utilising this connection.
   */
  versions?: IbcCoreConnectionV1Version[]
  /** current state of the connection end. */
  state?: IbcCoreConnectionV1State
  /** counterparty chain associated with this connection. */
  counterparty?: IbcCoreConnectionV1Counterparty
  /**
   * delay period that must pass before a consensus state can be used for
   * packet-verification NOTE: delay period logic is only implemented by some
   * clients.
   * @format uint64
   */
  delay_period?: string
}

/** Counterparty defines the counterparty chain associated with a connection end. */
export interface IbcCoreConnectionV1Counterparty {
  /**
   * identifies the client on the counterparty chain associated with a given
   * connection.
   */
  client_id?: string
  /**
   * identifies the connection end on the counterparty chain associated with a
   * given connection.
   */
  connection_id?: string
  /** commitment merkle prefix of the counterparty chain. */
  prefix?: IbcCoreCommitmentV1MerklePrefix
}

/**
 * IdentifiedConnection defines a connection with additional connection
 * identifier field.
 */
export interface IbcCoreConnectionV1IdentifiedConnection {
  /** connection identifier. */
  id?: string
  /** client associated with this connection. */
  client_id?: string
  /**
   * IBC version which can be utilised to determine encodings or protocols for
   * channels or packets utilising this connection
   */
  versions?: IbcCoreConnectionV1Version[]
  /** current state of the connection end. */
  state?: IbcCoreConnectionV1State
  /** counterparty chain associated with this connection. */
  counterparty?: IbcCoreConnectionV1Counterparty
  /**
   * delay period associated with this connection.
   * @format uint64
   */
  delay_period?: string
}

/** Params defines the set of Connection parameters. */
export interface IbcCoreConnectionV1Params {
  /**
   * maximum expected time per block (in nanoseconds), used to enforce block delay. This parameter should reflect the
   * largest amount of time that the chain might reasonably take to produce the next block under normal operating
   * conditions. A safe choice is 3-5x the expected time per block.
   * @format uint64
   */
  max_expected_time_per_block?: string
}

/**
 * QueryClientConnectionsResponse is the response type for the
 * Query/ClientConnections RPC method
 */
export interface IbcCoreConnectionV1QueryClientConnectionsResponse {
  /** slice of all the connection paths associated with a client. */
  connection_paths?: string[]
  /**
   * merkle proof of existence
   * @format byte
   */
  proof?: string
  /**
   * height at which the proof was generated
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  proof_height?: IbcCoreClientV1Height
}

/**
 * QueryConnectionClientStateResponse is the response type for the
 * Query/ConnectionClientState RPC method
 */
export interface IbcCoreConnectionV1QueryConnectionClientStateResponse {
  /**
   * client state associated with the channel
   * IdentifiedClientState defines a client state with an additional client
   * identifier field.
   */
  identified_client_state?: IbcCoreClientV1IdentifiedClientState
  /**
   * merkle proof of existence
   * @format byte
   */
  proof?: string
  /**
   * height at which the proof was retrieved
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  proof_height?: IbcCoreClientV1Height
}

/**
 * QueryConnectionConsensusStateResponse is the response type for the
 * Query/ConnectionConsensusState RPC method
 */
export interface IbcCoreConnectionV1QueryConnectionConsensusStateResponse {
  /**
   * consensus state associated with the channel
   * `Any` contains an arbitrary serialized protocol buffer message along with a
   * URL that describes the type of the serialized message.
   *
   * Protobuf library provides support to pack/unpack Any values in the form
   * of utility functions or additional generated methods of the Any type.
   *
   * Example 1: Pack and unpack a message in C++.
   *
   *     Foo foo = ...;
   *     Any any;
   *     any.PackFrom(foo);
   *     ...
   *     if (any.UnpackTo(&foo)) {
   *       ...
   *     }
   *
   * Example 2: Pack and unpack a message in Java.
   *
   *     Foo foo = ...;
   *     Any any = Any.pack(foo);
   *     ...
   *     if (any.is(Foo.class)) {
   *       foo = any.unpack(Foo.class);
   *     }
   *
   * Example 3: Pack and unpack a message in Python.
   *
   *     foo = Foo(...)
   *     any = Any()
   *     any.Pack(foo)
   *     ...
   *     if any.Is(Foo.DESCRIPTOR):
   *       any.Unpack(foo)
   *       ...
   *
   * Example 4: Pack and unpack a message in Go
   *
   *      foo := &pb.Foo{...}
   *      any, err := anypb.New(foo)
   *      if err != nil {
   *        ...
   *      }
   *      ...
   *      foo := &pb.Foo{}
   *      if err := any.UnmarshalTo(foo); err != nil {
   *        ...
   *      }
   *
   * The pack methods provided by protobuf library will by default use
   * 'type.googleapis.com/full.type.name' as the type URL and the unpack
   * methods only use the fully qualified type name after the last '/'
   * in the type URL, for example "foo.bar.com/x/y.z" will yield type
   * name "y.z".
   *
   *
   * JSON
   *
   * The JSON representation of an `Any` value uses the regular
   * representation of the deserialized, embedded message, with an
   * additional field `@type` which contains the type URL. Example:
   *
   *     package google.profile;
   *     message Person {
   *       string first_name = 1;
   *       string last_name = 2;
   *     }
   *
   *     {
   *       "@type": "type.googleapis.com/google.profile.Person",
   *       "firstName": <string>,
   *       "lastName": <string>
   *     }
   *
   * If the embedded message type is well-known and has a custom JSON
   * representation, that representation will be embedded adding a field
   * `value` which holds the custom JSON in addition to the `@type`
   * field. Example (for message [google.protobuf.Duration][]):
   *
   *     {
   *       "@type": "type.googleapis.com/google.protobuf.Duration",
   *       "value": "1.212s"
   *     }
   */
  consensus_state?: GoogleProtobufAny
  /** client ID associated with the consensus state */
  client_id?: string
  /**
   * merkle proof of existence
   * @format byte
   */
  proof?: string
  /**
   * height at which the proof was retrieved
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  proof_height?: IbcCoreClientV1Height
}

/** QueryConnectionParamsResponse is the response type for the Query/ConnectionParams RPC method. */
export interface IbcCoreConnectionV1QueryConnectionParamsResponse {
  /** params defines the parameters of the module. */
  params?: IbcCoreConnectionV1Params
}

/**
 * QueryConnectionResponse is the response type for the Query/Connection RPC
 * method. Besides the connection end, it includes a proof and the height from
 * which the proof was retrieved.
 */
export interface IbcCoreConnectionV1QueryConnectionResponse {
  /**
   * connection associated with the request identifier
   * ConnectionEnd defines a stateful object on a chain connected to another
   * separate one.
   * NOTE: there must only be 2 defined ConnectionEnds to establish
   * a connection between two chains.
   */
  connection?: IbcCoreConnectionV1ConnectionEnd
  /**
   * merkle proof of existence
   * @format byte
   */
  proof?: string
  /**
   * height at which the proof was retrieved
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  proof_height?: IbcCoreClientV1Height
}

/**
 * QueryConnectionsResponse is the response type for the Query/Connections RPC
 * method.
 */
export interface IbcCoreConnectionV1QueryConnectionsResponse {
  /** list of stored connections of the chain. */
  connections?: IbcCoreConnectionV1IdentifiedConnection[]
  /**
   * pagination response
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: CosmosBaseQueryV1Beta1PageResponse
  /**
   * query block height
   * Normally the RevisionHeight is incremented at each height while keeping
   * RevisionNumber the same. However some consensus algorithms may choose to
   * reset the height in certain conditions e.g. hard forks, state-machine
   * breaking changes In these cases, the RevisionNumber is incremented so that
   * height continues to be monitonically increasing even as the RevisionHeight
   * gets reset
   */
  height?: IbcCoreClientV1Height
}

/**
 * State defines if a connection is in one of the following states:
 * INIT, TRYOPEN, OPEN or UNINITIALIZED.
 *
 *  - STATE_UNINITIALIZED_UNSPECIFIED: Default State
 *  - STATE_INIT: A connection end has just started the opening handshake.
 *  - STATE_TRYOPEN: A connection end has acknowledged the handshake step on the counterparty
 * chain.
 *  - STATE_OPEN: A connection end has completed the handshake.
 * @default "STATE_UNINITIALIZED_UNSPECIFIED"
 */
export enum IbcCoreConnectionV1State {
  STATE_UNINITIALIZED_UNSPECIFIED = 'STATE_UNINITIALIZED_UNSPECIFIED',
  STATE_INIT = 'STATE_INIT',
  STATE_TRYOPEN = 'STATE_TRYOPEN',
  STATE_OPEN = 'STATE_OPEN',
}

/**
 * Version defines the versioning scheme used to negotiate the IBC verison in
 * the connection handshake.
 */
export interface IbcCoreConnectionV1Version {
  /** unique version identifier */
  identifier?: string
  /** list of features compatible with the specified identifier */
  features?: string[]
}

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  HeadersDefaults,
  ResponseType,
} from 'axios'

export type QueryParamsType = Record<string | number, any>

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType
  /** request body */
  body?: unknown
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void
  secure?: boolean
  format?: ResponseType
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private secure?: boolean
  private format?: ResponseType

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || 'https://rest.bd.evmos.org:1317',
    })
    this.secure = secure
    this.format = format
    this.securityWorker = securityWorker
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method)

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    }
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem)
    } else {
      return `${formItem}`
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key]
      const propertyContent: any[] =
        property instanceof Array ? property : [property]

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        )
      }

      return formData
    }, new FormData())
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const responseFormat = format || this.format || undefined

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === 'object'
    ) {
      body = this.createFormData(body as Record<string, unknown>)
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== 'string'
    ) {
      body = JSON.stringify(body)
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { 'Content-Type': type }
            : {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
        paramsSerializer: (params) => {
          const keys = Object.keys(params)
          const arr: Array<any> = []
          keys.forEach((item) => {
            if (Array.isArray(params[item])) {
              const url = params[item].map((_: any) => `${item}=${_}`).join('&')
              arr.push(url)
            } else {
              arr.push(`${item}=${params[item]}`)
            }
          })
          const result = arr.join('&')
          return `${result}`
        },
      })
      .then((response) => Promise.resolve(response.data))
      .catch((data) => {
        let err = `${this.instance.getUri()}${path} request error.`
        if (data?.response) {
          err = `${err} status: ${data?.response?.status}, statusText: ${data?.response?.statusText}.`
          if (data?.response?.data?.message) {
            err = `${err} message: ${data?.response?.data?.message}`
          }
        } else if (data?.code) {
          err = `${err} ${data?.code}`
        }
        return Promise.reject(err)
      })
  }
}

/**
 * @title app.proto
 * @version version not set
 */
export class App<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * @description Since: cosmos-sdk 0.47
     *
     * @tags Query
     * @name AccountInfo
     * @summary AccountInfo queries account info which is common to all account types.
     * @request GET:/cosmos/auth/v1beta1/account_info/{address}
     */
    accountInfo: (address: string, params: RequestParams = {}) =>
      this.request<
        CosmosAuthV1Beta1QueryAccountInfoResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/auth/v1beta1/account_info/${address}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description When called from another module, this query might consume a high amount of gas if the pagination field is incorrectly set. Since: cosmos-sdk 0.43
     *
     * @tags Query
     * @name Accounts
     * @summary Accounts returns all the existing accounts.
     * @request GET:/cosmos/auth/v1beta1/accounts
     */
    accounts: (
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosAuthV1Beta1QueryAccountsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/auth/v1beta1/accounts`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Account
     * @summary Account returns account details based on address.
     * @request GET:/cosmos/auth/v1beta1/accounts/{address}
     */
    account: (address: string, params: RequestParams = {}) =>
      this.request<
        CosmosAuthV1Beta1QueryAccountResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/auth/v1beta1/accounts/${address}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Since: cosmos-sdk 0.46.2
     *
     * @tags Query
     * @name AccountAddressById
     * @summary AccountAddressByID returns account address based on account number.
     * @request GET:/cosmos/auth/v1beta1/address_by_id/{id}
     */
    accountAddressById: (
      id: string,
      query?: {
        /**
         * account_id is the account number of the address to be queried.
         *
         * Since: cosmos-sdk 0.47
         * @format uint64
         */
        account_id?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosAuthV1Beta1QueryAccountAddressByIDResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/auth/v1beta1/address_by_id/${id}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Since: cosmos-sdk 0.46
     *
     * @tags Query
     * @name Bech32Prefix
     * @summary Bech32Prefix queries bech32Prefix
     * @request GET:/cosmos/auth/v1beta1/bech32
     */
    bech32Prefix: (params: RequestParams = {}) =>
      this.request<
        CosmosAuthV1Beta1Bech32PrefixResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/auth/v1beta1/bech32`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Since: cosmos-sdk 0.46
     *
     * @tags Query
     * @name AddressBytesToString
     * @summary AddressBytesToString converts Account Address bytes to string
     * @request GET:/cosmos/auth/v1beta1/bech32/{address_bytes}
     */
    addressBytesToString: (addressBytes: string, params: RequestParams = {}) =>
      this.request<
        CosmosAuthV1Beta1AddressBytesToStringResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/auth/v1beta1/bech32/${addressBytes}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Since: cosmos-sdk 0.46
     *
     * @tags Query
     * @name AddressStringToBytes
     * @summary AddressStringToBytes converts Address string to bytes
     * @request GET:/cosmos/auth/v1beta1/bech32/{address_string}
     */
    addressStringToBytes: (addressString: string, params: RequestParams = {}) =>
      this.request<
        CosmosAuthV1Beta1AddressStringToBytesResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/auth/v1beta1/bech32/${addressString}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Since: cosmos-sdk 0.46
     *
     * @tags Query
     * @name ModuleAccounts
     * @summary ModuleAccounts returns all the existing module accounts.
     * @request GET:/cosmos/auth/v1beta1/module_accounts
     */
    moduleAccounts: (params: RequestParams = {}) =>
      this.request<
        CosmosAuthV1Beta1QueryModuleAccountsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/auth/v1beta1/module_accounts`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name ModuleAccountByName
     * @summary ModuleAccountByName returns the module account info by module name
     * @request GET:/cosmos/auth/v1beta1/module_accounts/{name}
     */
    moduleAccountByName: (name: string, params: RequestParams = {}) =>
      this.request<
        CosmosAuthV1Beta1QueryModuleAccountByNameResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/auth/v1beta1/module_accounts/${name}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Params
     * @summary Params queries all parameters.
     * @request GET:/cosmos/auth/v1beta1/params
     */
    params: (params: RequestParams = {}) =>
      this.request<
        CosmosAuthV1Beta1QueryParamsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/auth/v1beta1/params`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  }
  authz = {
    /**
     * No description
     *
     * @tags Query
     * @name Grants
     * @summary Returns list of `Authorization`, granted to the grantee by the granter.
     * @request GET:/cosmos/authz/v1beta1/grants
     */
    grants: (
      query?: {
        granter?: string
        grantee?: string
        /** Optional, msg_type_url, when set, will query only grants matching given msg type. */
        msg_type_url?: string
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosAuthzV1Beta1QueryGrantsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/authz/v1beta1/grants`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Since: cosmos-sdk 0.46
     *
     * @tags Query
     * @name GranteeGrants
     * @summary GranteeGrants returns a list of `GrantAuthorization` by grantee.
     * @request GET:/cosmos/authz/v1beta1/grants/grantee/{grantee}
     */
    granteeGrants: (
      grantee: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosAuthzV1Beta1QueryGranteeGrantsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/authz/v1beta1/grants/grantee/${grantee}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Since: cosmos-sdk 0.46
     *
     * @tags Query
     * @name GranterGrants
     * @summary GranterGrants returns list of `GrantAuthorization`, granted by granter.
     * @request GET:/cosmos/authz/v1beta1/grants/granter/{granter}
     */
    granterGrants: (
      granter: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosAuthzV1Beta1QueryGranterGrantsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/authz/v1beta1/grants/granter/${granter}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  }
  bank = {
    /**
     * @description When called from another module, this query might consume a high amount of gas if the pagination field is incorrectly set.
     *
     * @tags Query
     * @name AllBalances
     * @summary AllBalances queries the balance of all coins for a single account.
     * @request GET:/cosmos/bank/v1beta1/balances/{address}
     */
    allBalances: (
      address: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
        /**
         * resolve_denom is the flag to resolve the denom into a human-readable form from the metadata.
         *
         * Since: cosmos-sdk 0.50
         */
        resolve_denom?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosBankV1Beta1QueryAllBalancesResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/bank/v1beta1/balances/${address}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Balance
     * @summary Balance queries the balance of a single coin for a single account.
     * @request GET:/cosmos/bank/v1beta1/balances/{address}/by_denom
     */
    balance: (
      address: string,
      query?: {
        /** denom is the coin denom to query balances for. */
        denom?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosBankV1Beta1QueryBalanceResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/bank/v1beta1/balances/${address}/by_denom`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
 * @description When called from another module, this query might consume a high amount of gas if the pagination field is incorrectly set. Since: cosmos-sdk 0.46
 *
 * @tags Query
 * @name DenomOwners
 * @summary DenomOwners queries for all account addresses that own a particular token
denomination.
 * @request GET:/cosmos/bank/v1beta1/denom_owners/{denom}
 */
    denomOwners: (
      denom: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosBankV1Beta1QueryDenomOwnersResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/bank/v1beta1/denom_owners/${denom}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags Query
 * @name DenomsMetadata
 * @summary DenomsMetadata queries the client metadata for all registered coin
denominations.
 * @request GET:/cosmos/bank/v1beta1/denoms_metadata
 */
    denomsMetadata: (
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosBankV1Beta1QueryDenomsMetadataResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/bank/v1beta1/denoms_metadata`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name DenomMetadata
     * @summary DenomsMetadata queries the client metadata of a given coin denomination.
     * @request GET:/cosmos/bank/v1beta1/denoms_metadata/{denom}
     */
    denomMetadata: (denom: string, params: RequestParams = {}) =>
      this.request<
        CosmosBankV1Beta1QueryDenomMetadataResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/bank/v1beta1/denoms_metadata/${denom}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name DenomMetadataByQueryString
     * @summary DenomsMetadata queries the client metadata of a given coin denomination.
     * @request GET:/cosmos/bank/v1beta1/denoms_metadata_by_query_string
     */
    denomMetadataByQueryString: (
      query?: {
        /** denom is the coin denom to query the metadata for. */
        denom?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosBankV1Beta1QueryDenomMetadataByQueryStringResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/bank/v1beta1/denoms_metadata_by_query_string`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Params
     * @summary Params queries the parameters of x/bank module.
     * @request GET:/cosmos/bank/v1beta1/params
     */
    params: (params: RequestParams = {}) =>
      this.request<
        CosmosBankV1Beta1QueryParamsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/bank/v1beta1/params`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description This query only returns denominations that have specific SendEnabled settings. Any denomination that does not have a specific setting will use the default params.default_send_enabled, and will not be returned by this query. Since: cosmos-sdk 0.47
     *
     * @tags Query
     * @name SendEnabled
     * @summary SendEnabled queries for SendEnabled entries.
     * @request GET:/cosmos/bank/v1beta1/send_enabled
     */
    sendEnabled: (
      query?: {
        /** denoms is the specific denoms you want look up. Leave empty to get all entries. */
        denoms?: string[]
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosBankV1Beta1QuerySendEnabledResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/bank/v1beta1/send_enabled`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
 * @description When called from another module, this query might consume a high amount of gas if the pagination field is incorrectly set. Since: cosmos-sdk 0.46
 *
 * @tags Query
 * @name SpendableBalances
 * @summary SpendableBalances queries the spendable balance of all coins for a single
account.
 * @request GET:/cosmos/bank/v1beta1/spendable_balances/{address}
 */
    spendableBalances: (
      address: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosBankV1Beta1QuerySpendableBalancesResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/bank/v1beta1/spendable_balances/${address}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
 * @description When called from another module, this query might consume a high amount of gas if the pagination field is incorrectly set. Since: cosmos-sdk 0.47
 *
 * @tags Query
 * @name SpendableBalanceByDenom
 * @summary SpendableBalanceByDenom queries the spendable balance of a single denom for
a single account.
 * @request GET:/cosmos/bank/v1beta1/spendable_balances/{address}/by_denom
 */
    spendableBalanceByDenom: (
      address: string,
      query?: {
        /** denom is the coin denom to query balances for. */
        denom?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosBankV1Beta1QuerySpendableBalanceByDenomResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/bank/v1beta1/spendable_balances/${address}/by_denom`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description When called from another module, this query might consume a high amount of gas if the pagination field is incorrectly set.
     *
     * @tags Query
     * @name TotalSupply
     * @summary TotalSupply queries the total supply of all coins.
     * @request GET:/cosmos/bank/v1beta1/supply
     */
    totalSupply: (
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosBankV1Beta1QueryTotalSupplyResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/bank/v1beta1/supply`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description When called from another module, this query might consume a high amount of gas if the pagination field is incorrectly set.
     *
     * @tags Query
     * @name SupplyOf
     * @summary SupplyOf queries the supply of a single coin.
     * @request GET:/cosmos/bank/v1beta1/supply/by_denom
     */
    supplyOf: (
      query?: {
        /** denom is the coin denom to query balances for. */
        denom?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosBankV1Beta1QuerySupplyOfResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/bank/v1beta1/supply/by_denom`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  }
  base = {
    /**
     * No description
     *
     * @tags Service
     * @name Config
     * @summary Config queries for the operator configuration.
     * @request GET:/cosmos/base/node/v1beta1/config
     */
    config: (params: RequestParams = {}) =>
      this.request<
        CosmosBaseNodeV1Beta1ConfigResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/base/node/v1beta1/config`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Service
     * @name Status
     * @summary Status queries for the node status.
     * @request GET:/cosmos/base/node/v1beta1/status
     */
    status: (params: RequestParams = {}) =>
      this.request<
        CosmosBaseNodeV1Beta1StatusResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/base/node/v1beta1/status`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
 * @description Since: cosmos-sdk 0.46
 *
 * @tags Service
 * @name AbciQuery
 * @summary ABCIQuery defines a query handler that supports ABCI queries directly to the
application, bypassing Tendermint completely. The ABCI query must contain
a valid and supported path, including app, custom, p2p, and store.
 * @request GET:/cosmos/base/tendermint/v1beta1/abci_query
 */
    abciQuery: (
      query?: {
        /** @format byte */
        data?: string
        path?: string
        /** @format int64 */
        height?: string
        prove?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosBaseTendermintV1Beta1ABCIQueryResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/base/tendermint/v1beta1/abci_query`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Service
     * @name GetLatestBlock
     * @summary GetLatestBlock returns the latest block.
     * @request GET:/cosmos/base/tendermint/v1beta1/blocks/latest
     */
    getLatestBlock: (params: RequestParams = {}) =>
      this.request<
        CosmosBaseTendermintV1Beta1GetLatestBlockResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/base/tendermint/v1beta1/blocks/latest`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Service
     * @name GetBlockByHeight
     * @summary GetBlockByHeight queries block for given height.
     * @request GET:/cosmos/base/tendermint/v1beta1/blocks/{height}
     */
    getBlockByHeight: (height: string, params: RequestParams = {}) =>
      this.request<
        CosmosBaseTendermintV1Beta1GetBlockByHeightResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/base/tendermint/v1beta1/blocks/${height}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Service
     * @name GetNodeInfo
     * @summary GetNodeInfo queries the current node info.
     * @request GET:/cosmos/base/tendermint/v1beta1/node_info
     */
    getNodeInfo: (params: RequestParams = {}) =>
      this.request<
        CosmosBaseTendermintV1Beta1GetNodeInfoResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/base/tendermint/v1beta1/node_info`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Service
     * @name GetSyncing
     * @summary GetSyncing queries node syncing.
     * @request GET:/cosmos/base/tendermint/v1beta1/syncing
     */
    getSyncing: (params: RequestParams = {}) =>
      this.request<
        CosmosBaseTendermintV1Beta1GetSyncingResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/base/tendermint/v1beta1/syncing`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Service
     * @name GetLatestValidatorSet
     * @summary GetLatestValidatorSet queries latest validator-set.
     * @request GET:/cosmos/base/tendermint/v1beta1/validatorsets/latest
     */
    getLatestValidatorSet: (
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosBaseTendermintV1Beta1GetLatestValidatorSetResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/base/tendermint/v1beta1/validatorsets/latest`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Service
     * @name GetValidatorSetByHeight
     * @summary GetValidatorSetByHeight queries validator-set at a given height.
     * @request GET:/cosmos/base/tendermint/v1beta1/validatorsets/{height}
     */
    getValidatorSetByHeight: (
      height: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosBaseTendermintV1Beta1GetValidatorSetByHeightResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/base/tendermint/v1beta1/validatorsets/${height}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  }
  circuit = {
    /**
     * No description
     *
     * @tags Query
     * @name Accounts
     * @summary Account returns account permissions.
     * @request GET:/cosmos/circuit/v1/accounts
     */
    accounts: (
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<CosmosCircuitV1AccountsResponse, GrpcGatewayRuntimeError>({
        path: `/cosmos/circuit/v1/accounts`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Account
     * @summary Account returns account permissions.
     * @request GET:/cosmos/circuit/v1/accounts/{address}
     */
    account: (address: string, params: RequestParams = {}) =>
      this.request<CosmosCircuitV1AccountResponse, GrpcGatewayRuntimeError>({
        path: `/cosmos/circuit/v1/accounts/${address}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name DisabledList
     * @summary DisabledList returns a list of disabled message urls
     * @request GET:/cosmos/circuit/v1/disable_list
     */
    disabledList: (params: RequestParams = {}) =>
      this.request<
        CosmosCircuitV1DisabledListResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/circuit/v1/disable_list`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  }
  consensus = {
    /**
     * No description
     *
     * @tags Query
     * @name Params
     * @summary Params queries the parameters of x/consensus module.
     * @request GET:/cosmos/consensus/v1/params
     */
    params: (params: RequestParams = {}) =>
      this.request<
        CosmosConsensusV1QueryParamsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/consensus/v1/params`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  }
  distribution = {
    /**
     * No description
     *
     * @tags Query
     * @name CommunityPool
     * @summary CommunityPool queries the community pool coins.
     * @request GET:/cosmos/distribution/v1beta1/community_pool
     */
    communityPool: (params: RequestParams = {}) =>
      this.request<
        CosmosDistributionV1Beta1QueryCommunityPoolResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/distribution/v1beta1/community_pool`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags Query
 * @name DelegationTotalRewards
 * @summary DelegationTotalRewards queries the total rewards accrued by each
validator.
 * @request GET:/cosmos/distribution/v1beta1/delegators/{delegator_address}/rewards
 */
    delegationTotalRewards: (
      delegatorAddress: string,
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosDistributionV1Beta1QueryDelegationTotalRewardsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/distribution/v1beta1/delegators/${delegatorAddress}/rewards`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name DelegationRewards
     * @summary DelegationRewards queries the total rewards accrued by a delegation.
     * @request GET:/cosmos/distribution/v1beta1/delegators/{delegator_address}/rewards/{validator_address}
     */
    delegationRewards: (
      delegatorAddress: string,
      validatorAddress: string,
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosDistributionV1Beta1QueryDelegationRewardsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/distribution/v1beta1/delegators/${delegatorAddress}/rewards/${validatorAddress}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name DelegatorValidators
     * @summary DelegatorValidators queries the validators of a delegator.
     * @request GET:/cosmos/distribution/v1beta1/delegators/{delegator_address}/validators
     */
    delegatorValidators: (
      delegatorAddress: string,
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosDistributionV1Beta1QueryDelegatorValidatorsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/distribution/v1beta1/delegators/${delegatorAddress}/validators`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name DelegatorWithdrawAddress
     * @summary DelegatorWithdrawAddress queries withdraw address of a delegator.
     * @request GET:/cosmos/distribution/v1beta1/delegators/{delegator_address}/withdraw_address
     */
    delegatorWithdrawAddress: (
      delegatorAddress: string,
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosDistributionV1Beta1QueryDelegatorWithdrawAddressResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/distribution/v1beta1/delegators/${delegatorAddress}/withdraw_address`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Params
     * @summary Params queries params of the distribution module.
     * @request GET:/cosmos/distribution/v1beta1/params
     */
    params: (params: RequestParams = {}) =>
      this.request<
        CosmosDistributionV1Beta1QueryParamsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/distribution/v1beta1/params`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name ValidatorDistributionInfo
     * @summary ValidatorDistributionInfo queries validator commission and self-delegation rewards for validator
     * @request GET:/cosmos/distribution/v1beta1/validators/{validator_address}
     */
    validatorDistributionInfo: (
      validatorAddress: string,
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosDistributionV1Beta1QueryValidatorDistributionInfoResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/distribution/v1beta1/validators/${validatorAddress}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name ValidatorCommission
     * @summary ValidatorCommission queries accumulated commission for a validator.
     * @request GET:/cosmos/distribution/v1beta1/validators/{validator_address}/commission
     */
    validatorCommission: (
      validatorAddress: string,
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosDistributionV1Beta1QueryValidatorCommissionResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/distribution/v1beta1/validators/${validatorAddress}/commission`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name ValidatorOutstandingRewards
     * @summary ValidatorOutstandingRewards queries rewards of a validator address.
     * @request GET:/cosmos/distribution/v1beta1/validators/{validator_address}/outstanding_rewards
     */
    validatorOutstandingRewards: (
      validatorAddress: string,
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosDistributionV1Beta1QueryValidatorOutstandingRewardsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/distribution/v1beta1/validators/${validatorAddress}/outstanding_rewards`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name ValidatorSlashes
     * @summary ValidatorSlashes queries slash events of a validator.
     * @request GET:/cosmos/distribution/v1beta1/validators/{validator_address}/slashes
     */
    validatorSlashes: (
      validatorAddress: string,
      query?: {
        /**
         * starting_height defines the optional starting height to query the slashes.
         * @format uint64
         */
        starting_height?: string
        /**
         * starting_height defines the optional ending height to query the slashes.
         * @format uint64
         */
        ending_height?: string
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosDistributionV1Beta1QueryValidatorSlashesResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/distribution/v1beta1/validators/${validatorAddress}/slashes`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  }
  evidence = {
    /**
     * No description
     *
     * @tags Query
     * @name AllEvidence
     * @summary AllEvidence queries all evidence.
     * @request GET:/cosmos/evidence/v1beta1/evidence
     */
    allEvidence: (
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosEvidenceV1Beta1QueryAllEvidenceResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/evidence/v1beta1/evidence`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Evidence
     * @summary Evidence queries evidence based on evidence hash.
     * @request GET:/cosmos/evidence/v1beta1/evidence/{hash}
     */
    evidence: (
      hash: string,
      query?: {
        /**
         * evidence_hash defines the hash of the requested evidence.
         * Deprecated: Use hash, a HEX encoded string, instead.
         * @format byte
         */
        evidence_hash?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosEvidenceV1Beta1QueryEvidenceResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/evidence/v1beta1/evidence/${hash}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  }
  feegrant = {
    /**
     * No description
     *
     * @tags Query
     * @name Allowance
     * @summary Allowance returns granted allwance to the grantee by the granter.
     * @request GET:/cosmos/feegrant/v1beta1/allowance/{granter}/{grantee}
     */
    allowance: (granter: string, grantee: string, params: RequestParams = {}) =>
      this.request<
        CosmosFeegrantV1Beta1QueryAllowanceResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/feegrant/v1beta1/allowance/${granter}/${grantee}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Allowances
     * @summary Allowances returns all the grants for the given grantee address.
     * @request GET:/cosmos/feegrant/v1beta1/allowances/{grantee}
     */
    allowances: (
      grantee: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosFeegrantV1Beta1QueryAllowancesResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/feegrant/v1beta1/allowances/${grantee}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Since: cosmos-sdk 0.46
     *
     * @tags Query
     * @name AllowancesByGranter
     * @summary AllowancesByGranter returns all the grants given by an address
     * @request GET:/cosmos/feegrant/v1beta1/issued/{granter}
     */
    allowancesByGranter: (
      granter: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosFeegrantV1Beta1QueryAllowancesByGranterResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/feegrant/v1beta1/issued/${granter}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  }
  gov = {
    /**
     * No description
     *
     * @tags Query
     * @name Constitution
     * @summary Constitution queries the chain's constitution.
     * @request GET:/cosmos/gov/v1/constitution
     */
    constitution: (params: RequestParams = {}) =>
      this.request<
        CosmosGovV1QueryConstitutionResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/gov/v1/constitution`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Params
     * @summary Params queries all parameters of the gov module.
     * @request GET:/cosmos/gov/v1/params/{params_type}
     */
    params: (paramsType: string, params: RequestParams = {}) =>
      this.request<CosmosGovV1QueryParamsResponse, GrpcGatewayRuntimeError>({
        path: `/cosmos/gov/v1/params/${paramsType}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Proposals
     * @summary Proposals queries all proposals based on given status.
     * @request GET:/cosmos/gov/v1/proposals
     */
    proposals: (
      query?: {
        /**
         * proposal_status defines the status of the proposals.
         *
         *  - PROPOSAL_STATUS_UNSPECIFIED: PROPOSAL_STATUS_UNSPECIFIED defines the default proposal status.
         *  - PROPOSAL_STATUS_DEPOSIT_PERIOD: PROPOSAL_STATUS_DEPOSIT_PERIOD defines a proposal status during the deposit
         * period.
         *  - PROPOSAL_STATUS_VOTING_PERIOD: PROPOSAL_STATUS_VOTING_PERIOD defines a proposal status during the voting
         * period.
         *  - PROPOSAL_STATUS_PASSED: PROPOSAL_STATUS_PASSED defines a proposal status of a proposal that has
         * passed.
         *  - PROPOSAL_STATUS_REJECTED: PROPOSAL_STATUS_REJECTED defines a proposal status of a proposal that has
         * been rejected.
         *  - PROPOSAL_STATUS_FAILED: PROPOSAL_STATUS_FAILED defines a proposal status of a proposal that has
         * failed.
         * @default "PROPOSAL_STATUS_UNSPECIFIED"
         */
        proposal_status?:
          | 'PROPOSAL_STATUS_UNSPECIFIED'
          | 'PROPOSAL_STATUS_DEPOSIT_PERIOD'
          | 'PROPOSAL_STATUS_VOTING_PERIOD'
          | 'PROPOSAL_STATUS_PASSED'
          | 'PROPOSAL_STATUS_REJECTED'
          | 'PROPOSAL_STATUS_FAILED'
        /** voter defines the voter address for the proposals. */
        voter?: string
        /** depositor defines the deposit addresses from the proposals. */
        depositor?: string
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<CosmosGovV1QueryProposalsResponse, GrpcGatewayRuntimeError>({
        path: `/cosmos/gov/v1/proposals`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Proposal
     * @summary Proposal queries proposal details based on ProposalID.
     * @request GET:/cosmos/gov/v1/proposals/{proposal_id}
     */
    proposal: (proposalId: string, params: RequestParams = {}) =>
      this.request<CosmosGovV1QueryProposalResponse, GrpcGatewayRuntimeError>({
        path: `/cosmos/gov/v1/proposals/${proposalId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Deposits
     * @summary Deposits queries all deposits of a single proposal.
     * @request GET:/cosmos/gov/v1/proposals/{proposal_id}/deposits
     */
    deposits: (
      proposalId: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<CosmosGovV1QueryDepositsResponse, GrpcGatewayRuntimeError>({
        path: `/cosmos/gov/v1/proposals/${proposalId}/deposits`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Deposit
     * @summary Deposit queries single deposit information based on proposalID, depositAddr.
     * @request GET:/cosmos/gov/v1/proposals/{proposal_id}/deposits/{depositor}
     */
    deposit: (
      proposalId: string,
      depositor: string,
      params: RequestParams = {},
    ) =>
      this.request<CosmosGovV1QueryDepositResponse, GrpcGatewayRuntimeError>({
        path: `/cosmos/gov/v1/proposals/${proposalId}/deposits/${depositor}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name TallyResult
     * @summary TallyResult queries the tally of a proposal vote.
     * @request GET:/cosmos/gov/v1/proposals/{proposal_id}/tally
     */
    tallyResult: (proposalId: string, params: RequestParams = {}) =>
      this.request<
        CosmosGovV1QueryTallyResultResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/gov/v1/proposals/${proposalId}/tally`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Votes
     * @summary Votes queries votes of a given proposal.
     * @request GET:/cosmos/gov/v1/proposals/{proposal_id}/votes
     */
    votes: (
      proposalId: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<CosmosGovV1QueryVotesResponse, GrpcGatewayRuntimeError>({
        path: `/cosmos/gov/v1/proposals/${proposalId}/votes`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Vote
     * @summary Vote queries voted information based on proposalID, voterAddr.
     * @request GET:/cosmos/gov/v1/proposals/{proposal_id}/votes/{voter}
     */
    vote: (proposalId: string, voter: string, params: RequestParams = {}) =>
      this.request<CosmosGovV1QueryVoteResponse, GrpcGatewayRuntimeError>({
        path: `/cosmos/gov/v1/proposals/${proposalId}/votes/${voter}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  }
  group = {
    /**
     * No description
     *
     * @tags Query
     * @name GroupInfo
     * @summary GroupInfo queries group info based on group id.
     * @request GET:/cosmos/group/v1/group_info/{group_id}
     */
    groupInfo: (groupId: string, params: RequestParams = {}) =>
      this.request<
        CosmosGroupV1QueryGroupInfoResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/group/v1/group_info/${groupId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name GroupMembers
     * @summary GroupMembers queries members of a group by group id.
     * @request GET:/cosmos/group/v1/group_members/{group_id}
     */
    groupMembers: (
      groupId: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosGroupV1QueryGroupMembersResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/group/v1/group_members/${groupId}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name GroupPoliciesByAdmin
     * @summary GroupPoliciesByAdmin queries group policies by admin address.
     * @request GET:/cosmos/group/v1/group_policies_by_admin/{admin}
     */
    groupPoliciesByAdmin: (
      admin: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosGroupV1QueryGroupPoliciesByAdminResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/group/v1/group_policies_by_admin/${admin}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name GroupPoliciesByGroup
     * @summary GroupPoliciesByGroup queries group policies by group id.
     * @request GET:/cosmos/group/v1/group_policies_by_group/{group_id}
     */
    groupPoliciesByGroup: (
      groupId: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosGroupV1QueryGroupPoliciesByGroupResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/group/v1/group_policies_by_group/${groupId}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name GroupPolicyInfo
     * @summary GroupPolicyInfo queries group policy info based on account address of group policy.
     * @request GET:/cosmos/group/v1/group_policy_info/{address}
     */
    groupPolicyInfo: (address: string, params: RequestParams = {}) =>
      this.request<
        CosmosGroupV1QueryGroupPolicyInfoResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/group/v1/group_policy_info/${address}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Since: cosmos-sdk 0.47.1
     *
     * @tags Query
     * @name Groups
     * @summary Groups queries all groups in state.
     * @request GET:/cosmos/group/v1/groups
     */
    groups: (
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<CosmosGroupV1QueryGroupsResponse, GrpcGatewayRuntimeError>({
        path: `/cosmos/group/v1/groups`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name GroupsByAdmin
     * @summary GroupsByAdmin queries groups by admin address.
     * @request GET:/cosmos/group/v1/groups_by_admin/{admin}
     */
    groupsByAdmin: (
      admin: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosGroupV1QueryGroupsByAdminResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/group/v1/groups_by_admin/${admin}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name GroupsByMember
     * @summary GroupsByMember queries groups by member address.
     * @request GET:/cosmos/group/v1/groups_by_member/{address}
     */
    groupsByMember: (
      address: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosGroupV1QueryGroupsByMemberResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/group/v1/groups_by_member/${address}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Proposal
     * @summary Proposal queries a proposal based on proposal id.
     * @request GET:/cosmos/group/v1/proposal/{proposal_id}
     */
    proposal: (proposalId: string, params: RequestParams = {}) =>
      this.request<CosmosGroupV1QueryProposalResponse, GrpcGatewayRuntimeError>(
        {
          path: `/cosmos/group/v1/proposal/${proposalId}`,
          method: 'GET',
          format: 'json',
          ...params,
        },
      ),

    /**
 * No description
 *
 * @tags Query
 * @name TallyResult
 * @summary TallyResult returns the tally result of a proposal. If the proposal is
still in voting period, then this query computes the current tally state,
which might not be final. On the other hand, if the proposal is final,
then it simply returns the `final_tally_result` state stored in the
proposal itself.
 * @request GET:/cosmos/group/v1/proposals/{proposal_id}/tally
 */
    tallyResult: (proposalId: string, params: RequestParams = {}) =>
      this.request<
        CosmosGroupV1QueryTallyResultResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/group/v1/proposals/${proposalId}/tally`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name ProposalsByGroupPolicy
     * @summary ProposalsByGroupPolicy queries proposals based on account address of group policy.
     * @request GET:/cosmos/group/v1/proposals_by_group_policy/{address}
     */
    proposalsByGroupPolicy: (
      address: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosGroupV1QueryProposalsByGroupPolicyResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/group/v1/proposals_by_group_policy/${address}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name VoteByProposalVoter
     * @summary VoteByProposalVoter queries a vote by proposal id and voter.
     * @request GET:/cosmos/group/v1/vote_by_proposal_voter/{proposal_id}/{voter}
     */
    voteByProposalVoter: (
      proposalId: string,
      voter: string,
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosGroupV1QueryVoteByProposalVoterResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/group/v1/vote_by_proposal_voter/${proposalId}/${voter}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name VotesByProposal
     * @summary VotesByProposal queries a vote by proposal id.
     * @request GET:/cosmos/group/v1/votes_by_proposal/{proposal_id}
     */
    votesByProposal: (
      proposalId: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosGroupV1QueryVotesByProposalResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/group/v1/votes_by_proposal/${proposalId}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name VotesByVoter
     * @summary VotesByVoter queries a vote by voter.
     * @request GET:/cosmos/group/v1/votes_by_voter/{voter}
     */
    votesByVoter: (
      voter: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosGroupV1QueryVotesByVoterResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/group/v1/votes_by_voter/${voter}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  }
  mint = {
    /**
     * No description
     *
     * @tags Query
     * @name AnnualProvisions
     * @summary AnnualProvisions current minting annual provisions value.
     * @request GET:/cosmos/mint/v1beta1/annual_provisions
     */
    annualProvisions: (params: RequestParams = {}) =>
      this.request<
        CosmosMintV1Beta1QueryAnnualProvisionsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/mint/v1beta1/annual_provisions`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Inflation
     * @summary Inflation returns the current minting inflation value.
     * @request GET:/cosmos/mint/v1beta1/inflation
     */
    inflation: (params: RequestParams = {}) =>
      this.request<
        CosmosMintV1Beta1QueryInflationResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/mint/v1beta1/inflation`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Params
     * @summary Params returns the total set of minting parameters.
     * @request GET:/cosmos/mint/v1beta1/params
     */
    params: (params: RequestParams = {}) =>
      this.request<
        CosmosMintV1Beta1QueryParamsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/mint/v1beta1/params`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  }
  nft = {
    /**
     * No description
     *
     * @tags Query
     * @name Balance
     * @summary Balance queries the number of NFTs of a given class owned by the owner, same as balanceOf in ERC721
     * @request GET:/cosmos/nft/v1beta1/balance/{owner}/{class_id}
     */
    balance: (owner: string, classId: string, params: RequestParams = {}) =>
      this.request<
        CosmosNftV1Beta1QueryBalanceResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/nft/v1beta1/balance/${owner}/${classId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Classes
     * @summary Classes queries all NFT classes
     * @request GET:/cosmos/nft/v1beta1/classes
     */
    classes: (
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosNftV1Beta1QueryClassesResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/nft/v1beta1/classes`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Class
     * @summary Class queries an NFT class based on its id
     * @request GET:/cosmos/nft/v1beta1/classes/{class_id}
     */
    class: (classId: string, params: RequestParams = {}) =>
      this.request<CosmosNftV1Beta1QueryClassResponse, GrpcGatewayRuntimeError>(
        {
          path: `/cosmos/nft/v1beta1/classes/${classId}`,
          method: 'GET',
          format: 'json',
          ...params,
        },
      ),

    /**
 * No description
 *
 * @tags Query
 * @name NfTs
 * @summary NFTs queries all NFTs of a given class or owner,choose at least one of the two, similar to tokenByIndex in
ERC721Enumerable
 * @request GET:/cosmos/nft/v1beta1/nfts
 */
    nfTs: (
      query?: {
        /** class_id associated with the nft. */
        class_id?: string
        /** owner is the owner address of the nft. */
        owner?: string
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<CosmosNftV1Beta1QueryNFTsResponse, GrpcGatewayRuntimeError>({
        path: `/cosmos/nft/v1beta1/nfts`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Nft
     * @summary NFT queries an NFT based on its class and id.
     * @request GET:/cosmos/nft/v1beta1/nfts/{class_id}/{id}
     */
    nft: (classId: string, id: string, params: RequestParams = {}) =>
      this.request<CosmosNftV1Beta1QueryNFTResponse, GrpcGatewayRuntimeError>({
        path: `/cosmos/nft/v1beta1/nfts/${classId}/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Owner
     * @summary Owner queries the owner of the NFT based on its class and id, same as ownerOf in ERC721
     * @request GET:/cosmos/nft/v1beta1/owner/{class_id}/{id}
     */
    owner: (classId: string, id: string, params: RequestParams = {}) =>
      this.request<CosmosNftV1Beta1QueryOwnerResponse, GrpcGatewayRuntimeError>(
        {
          path: `/cosmos/nft/v1beta1/owner/${classId}/${id}`,
          method: 'GET',
          format: 'json',
          ...params,
        },
      ),

    /**
     * No description
     *
     * @tags Query
     * @name Supply
     * @summary Supply queries the number of NFTs from the given class, same as totalSupply of ERC721.
     * @request GET:/cosmos/nft/v1beta1/supply/{class_id}
     */
    supply: (classId: string, params: RequestParams = {}) =>
      this.request<
        CosmosNftV1Beta1QuerySupplyResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/nft/v1beta1/supply/${classId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  }
  params = {
    /**
 * No description
 *
 * @tags Query
 * @name Params
 * @summary Params queries a specific parameter of a module, given its subspace and
key.
 * @request GET:/cosmos/params/v1beta1/params
 */
    params: (
      query?: {
        /** subspace defines the module to query the parameter for. */
        subspace?: string
        /** key defines the key of the parameter in the subspace. */
        key?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosParamsV1Beta1QueryParamsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/params/v1beta1/params`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Since: cosmos-sdk 0.46
     *
     * @tags Query
     * @name Subspaces
     * @summary Subspaces queries for all registered subspaces and all keys for a subspace.
     * @request GET:/cosmos/params/v1beta1/subspaces
     */
    subspaces: (params: RequestParams = {}) =>
      this.request<
        CosmosParamsV1Beta1QuerySubspacesResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/params/v1beta1/subspaces`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  }
  slashing = {
    /**
     * No description
     *
     * @tags Query
     * @name Params
     * @summary Params queries the parameters of slashing module
     * @request GET:/cosmos/slashing/v1beta1/params
     */
    params: (params: RequestParams = {}) =>
      this.request<
        CosmosSlashingV1Beta1QueryParamsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/slashing/v1beta1/params`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name SigningInfos
     * @summary SigningInfos queries signing info of all validators
     * @request GET:/cosmos/slashing/v1beta1/signing_infos
     */
    signingInfos: (
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosSlashingV1Beta1QuerySigningInfosResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/slashing/v1beta1/signing_infos`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name SigningInfo
     * @summary SigningInfo queries the signing info of given cons address
     * @request GET:/cosmos/slashing/v1beta1/signing_infos/{cons_address}
     */
    signingInfo: (consAddress: string, params: RequestParams = {}) =>
      this.request<
        CosmosSlashingV1Beta1QuerySigningInfoResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/slashing/v1beta1/signing_infos/${consAddress}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  }
  staking = {
    /**
     * @description When called from another module, this query might consume a high amount of gas if the pagination field is incorrectly set.
     *
     * @tags Query
     * @name DelegatorDelegations
     * @summary DelegatorDelegations queries all delegations of a given delegator address.
     * @request GET:/cosmos/staking/v1beta1/delegations/{delegator_addr}
     */
    delegatorDelegations: (
      delegatorAddr: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosStakingV1Beta1QueryDelegatorDelegationsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/staking/v1beta1/delegations/${delegatorAddr}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description When called from another module, this query might consume a high amount of gas if the pagination field is incorrectly set.
     *
     * @tags Query
     * @name Redelegations
     * @summary Redelegations queries redelegations of given address.
     * @request GET:/cosmos/staking/v1beta1/delegators/{delegator_addr}/redelegations
     */
    redelegations: (
      delegatorAddr: string,
      query?: {
        /** src_validator_addr defines the validator address to redelegate from. */
        src_validator_addr?: string
        /** dst_validator_addr defines the validator address to redelegate to. */
        dst_validator_addr?: string
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosStakingV1Beta1QueryRedelegationsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/staking/v1beta1/delegators/${delegatorAddr}/redelegations`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
 * @description When called from another module, this query might consume a high amount of gas if the pagination field is incorrectly set.
 *
 * @tags Query
 * @name DelegatorUnbondingDelegations
 * @summary DelegatorUnbondingDelegations queries all unbonding delegations of a given
delegator address.
 * @request GET:/cosmos/staking/v1beta1/delegators/{delegator_addr}/unbonding_delegations
 */
    delegatorUnbondingDelegations: (
      delegatorAddr: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosStakingV1Beta1QueryDelegatorUnbondingDelegationsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/staking/v1beta1/delegators/${delegatorAddr}/unbonding_delegations`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
 * @description When called from another module, this query might consume a high amount of gas if the pagination field is incorrectly set.
 *
 * @tags Query
 * @name DelegatorValidators
 * @summary DelegatorValidators queries all validators info for given delegator
address.
 * @request GET:/cosmos/staking/v1beta1/delegators/{delegator_addr}/validators
 */
    delegatorValidators: (
      delegatorAddr: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosStakingV1Beta1QueryDelegatorValidatorsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/staking/v1beta1/delegators/${delegatorAddr}/validators`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags Query
 * @name DelegatorValidator
 * @summary DelegatorValidator queries validator info for given delegator validator
pair.
 * @request GET:/cosmos/staking/v1beta1/delegators/{delegator_addr}/validators/{validator_addr}
 */
    delegatorValidator: (
      delegatorAddr: string,
      validatorAddr: string,
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosStakingV1Beta1QueryDelegatorValidatorResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/staking/v1beta1/delegators/${delegatorAddr}/validators/${validatorAddr}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name HistoricalInfo
     * @summary HistoricalInfo queries the historical info for given height.
     * @request GET:/cosmos/staking/v1beta1/historical_info/{height}
     */
    historicalInfo: (height: string, params: RequestParams = {}) =>
      this.request<
        CosmosStakingV1Beta1QueryHistoricalInfoResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/staking/v1beta1/historical_info/${height}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Params
     * @summary Parameters queries the staking parameters.
     * @request GET:/cosmos/staking/v1beta1/params
     */
    params: (params: RequestParams = {}) =>
      this.request<
        CosmosStakingV1Beta1QueryParamsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/staking/v1beta1/params`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Pool
     * @summary Pool queries the pool info.
     * @request GET:/cosmos/staking/v1beta1/pool
     */
    pool: (params: RequestParams = {}) =>
      this.request<
        CosmosStakingV1Beta1QueryPoolResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/staking/v1beta1/pool`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description When called from another module, this query might consume a high amount of gas if the pagination field is incorrectly set.
     *
     * @tags Query
     * @name Validators
     * @summary Validators queries all validators that match the given status.
     * @request GET:/cosmos/staking/v1beta1/validators
     */
    validators: (
      query?: {
        /** status enables to query for validators matching a given status. */
        status?: string
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosStakingV1Beta1QueryValidatorsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/staking/v1beta1/validators`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Validator
     * @summary Validator queries validator info for given validator address.
     * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}
     */
    validator: (validatorAddr: string, params: RequestParams = {}) =>
      this.request<
        CosmosStakingV1Beta1QueryValidatorResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/staking/v1beta1/validators/${validatorAddr}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description When called from another module, this query might consume a high amount of gas if the pagination field is incorrectly set.
     *
     * @tags Query
     * @name ValidatorDelegations
     * @summary ValidatorDelegations queries delegate info for given validator.
     * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}/delegations
     */
    validatorDelegations: (
      validatorAddr: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosStakingV1Beta1QueryValidatorDelegationsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/staking/v1beta1/validators/${validatorAddr}/delegations`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Delegation
     * @summary Delegation queries delegate info for given validator delegator pair.
     * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}/delegations/{delegator_addr}
     */
    delegation: (
      validatorAddr: string,
      delegatorAddr: string,
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosStakingV1Beta1QueryDelegationResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/staking/v1beta1/validators/${validatorAddr}/delegations/${delegatorAddr}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags Query
 * @name UnbondingDelegation
 * @summary UnbondingDelegation queries unbonding info for given validator delegator
pair.
 * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}/delegations/{delegator_addr}/unbonding_delegation
 */
    unbondingDelegation: (
      validatorAddr: string,
      delegatorAddr: string,
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosStakingV1Beta1QueryUnbondingDelegationResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/staking/v1beta1/validators/${validatorAddr}/delegations/${delegatorAddr}/unbonding_delegation`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description When called from another module, this query might consume a high amount of gas if the pagination field is incorrectly set.
     *
     * @tags Query
     * @name ValidatorUnbondingDelegations
     * @summary ValidatorUnbondingDelegations queries unbonding delegations of a validator.
     * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}/unbonding_delegations
     */
    validatorUnbondingDelegations: (
      validatorAddr: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosStakingV1Beta1QueryValidatorUnbondingDelegationsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/staking/v1beta1/validators/${validatorAddr}/unbonding_delegations`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  }
  tx = {
    /**
     * @description Since: cosmos-sdk 0.47
     *
     * @tags Service
     * @name TxDecode
     * @summary TxDecode decodes the transaction.
     * @request POST:/cosmos/tx/v1beta1/decode
     */
    txDecode: (
      body: CosmosTxV1Beta1TxDecodeRequest,
      params: RequestParams = {},
    ) =>
      this.request<CosmosTxV1Beta1TxDecodeResponse, GrpcGatewayRuntimeError>({
        path: `/cosmos/tx/v1beta1/decode`,
        method: 'POST',
        body: body,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Since: cosmos-sdk 0.47
     *
     * @tags Service
     * @name TxDecodeAmino
     * @summary TxDecodeAmino decodes an Amino transaction from encoded bytes to JSON.
     * @request POST:/cosmos/tx/v1beta1/decode/amino
     */
    txDecodeAmino: (
      body: CosmosTxV1Beta1TxDecodeAminoRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosTxV1Beta1TxDecodeAminoResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/tx/v1beta1/decode/amino`,
        method: 'POST',
        body: body,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Since: cosmos-sdk 0.47
     *
     * @tags Service
     * @name TxEncode
     * @summary TxEncode encodes the transaction.
     * @request POST:/cosmos/tx/v1beta1/encode
     */
    txEncode: (
      body: CosmosTxV1Beta1TxEncodeRequest,
      params: RequestParams = {},
    ) =>
      this.request<CosmosTxV1Beta1TxEncodeResponse, GrpcGatewayRuntimeError>({
        path: `/cosmos/tx/v1beta1/encode`,
        method: 'POST',
        body: body,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Since: cosmos-sdk 0.47
     *
     * @tags Service
     * @name TxEncodeAmino
     * @summary TxEncodeAmino encodes an Amino transaction from JSON to encoded bytes.
     * @request POST:/cosmos/tx/v1beta1/encode/amino
     */
    txEncodeAmino: (
      body: CosmosTxV1Beta1TxEncodeAminoRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosTxV1Beta1TxEncodeAminoResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/tx/v1beta1/encode/amino`,
        method: 'POST',
        body: body,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Service
     * @name Simulate
     * @summary Simulate simulates executing a transaction for estimating gas usage.
     * @request POST:/cosmos/tx/v1beta1/simulate
     */
    simulate: (
      body: CosmosTxV1Beta1SimulateRequest,
      params: RequestParams = {},
    ) =>
      this.request<CosmosTxV1Beta1SimulateResponse, GrpcGatewayRuntimeError>({
        path: `/cosmos/tx/v1beta1/simulate`,
        method: 'POST',
        body: body,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Service
     * @name GetTxsEvent
     * @summary GetTxsEvent fetches txs by event.
     * @request GET:/cosmos/tx/v1beta1/txs
     */
    getTxsEvent: (
      query?: {
        /**
         * events is the list of transaction event type.
         * Deprecated post v0.47.x: use query instead, which should contain a valid
         * events query.
         */
        events?: string[]
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
        /**
         *  - ORDER_BY_UNSPECIFIED: ORDER_BY_UNSPECIFIED specifies an unknown sorting order. OrderBy defaults
         * to ASC in this case.
         *  - ORDER_BY_ASC: ORDER_BY_ASC defines ascending order
         *  - ORDER_BY_DESC: ORDER_BY_DESC defines descending order
         * @default "ORDER_BY_UNSPECIFIED"
         */
        order_by?: 'ORDER_BY_UNSPECIFIED' | 'ORDER_BY_ASC' | 'ORDER_BY_DESC'
        /**
         * page is the page number to query, starts at 1. If not provided, will
         * default to first page.
         * @format uint64
         */
        page?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        limit?: string
        /**
         * query defines the transaction event query that is proxied to Tendermint's
         * TxSearch RPC method. The query must be valid.
         *
         * Since cosmos-sdk 0.50
         */
        query?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<CosmosTxV1Beta1GetTxsEventResponse, GrpcGatewayRuntimeError>(
        {
          path: `/cosmos/tx/v1beta1/txs`,
          method: 'GET',
          query: query,
          format: 'json',
          ...params,
        },
      ),

    /**
     * No description
     *
     * @tags Service
     * @name BroadcastTx
     * @summary BroadcastTx broadcast transaction.
     * @request POST:/cosmos/tx/v1beta1/txs
     */
    broadcastTx: (
      body: CosmosTxV1Beta1BroadcastTxRequest,
      params: RequestParams = {},
    ) =>
      this.request<CosmosTxV1Beta1BroadcastTxResponse, GrpcGatewayRuntimeError>(
        {
          path: `/cosmos/tx/v1beta1/txs`,
          method: 'POST',
          body: body,
          type: ContentType.Json,
          format: 'json',
          ...params,
        },
      ),

    /**
     * @description Since: cosmos-sdk 0.45.2
     *
     * @tags Service
     * @name GetBlockWithTxs
     * @summary GetBlockWithTxs fetches a block with decoded txs.
     * @request GET:/cosmos/tx/v1beta1/txs/block/{height}
     */
    getBlockWithTxs: (
      height: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosTxV1Beta1GetBlockWithTxsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/tx/v1beta1/txs/block/${height}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Service
     * @name GetTx
     * @summary GetTx fetches a tx by hash.
     * @request GET:/cosmos/tx/v1beta1/txs/{hash}
     */
    getTx: (hash: string, params: RequestParams = {}) =>
      this.request<CosmosTxV1Beta1GetTxResponse, GrpcGatewayRuntimeError>({
        path: `/cosmos/tx/v1beta1/txs/${hash}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  }
  upgrade = {
    /**
     * No description
     *
     * @tags Query
     * @name AppliedPlan
     * @summary AppliedPlan queries a previously applied upgrade plan by its name.
     * @request GET:/cosmos/upgrade/v1beta1/applied_plan/{name}
     */
    appliedPlan: (name: string, params: RequestParams = {}) =>
      this.request<
        CosmosUpgradeV1Beta1QueryAppliedPlanResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/upgrade/v1beta1/applied_plan/${name}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Since: cosmos-sdk 0.46
     *
     * @tags Query
     * @name Authority
     * @summary Returns the account with authority to conduct upgrades
     * @request GET:/cosmos/upgrade/v1beta1/authority
     */
    authority: (params: RequestParams = {}) =>
      this.request<
        CosmosUpgradeV1Beta1QueryAuthorityResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/upgrade/v1beta1/authority`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name CurrentPlan
     * @summary CurrentPlan queries the current upgrade plan.
     * @request GET:/cosmos/upgrade/v1beta1/current_plan
     */
    currentPlan: (params: RequestParams = {}) =>
      this.request<
        CosmosUpgradeV1Beta1QueryCurrentPlanResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/upgrade/v1beta1/current_plan`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Since: cosmos-sdk 0.43
     *
     * @tags Query
     * @name ModuleVersions
     * @summary ModuleVersions queries the list of module versions from state.
     * @request GET:/cosmos/upgrade/v1beta1/module_versions
     */
    moduleVersions: (
      query?: {
        /**
         * module_name is a field to query a specific module
         * consensus version from state. Leaving this empty will
         * fetch the full list of module versions from state.
         */
        module_name?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CosmosUpgradeV1Beta1QueryModuleVersionsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/upgrade/v1beta1/module_versions`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags Query
 * @name UpgradedConsensusState
 * @summary UpgradedConsensusState queries the consensus state that will serve
as a trusted kernel for the next version of this chain. It will only be
stored at the last height of this chain.
UpgradedConsensusState RPC not supported with legacy querier
This rpc is deprecated now that IBC has its own replacement
(https://github.com/cosmos/ibc-go/blob/2c880a22e9f9cc75f62b527ca94aa75ce1106001/proto/ibc/core/client/v1/query.proto#L54)
 * @request GET:/cosmos/upgrade/v1beta1/upgraded_consensus_state/{last_height}
 */
    upgradedConsensusState: (lastHeight: string, params: RequestParams = {}) =>
      this.request<
        CosmosUpgradeV1Beta1QueryUpgradedConsensusStateResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/cosmos/upgrade/v1beta1/upgraded_consensus_state/${lastHeight}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  }
  evm = {
    /**
     * No description
     *
     * @tags Query
     * @name Account
     * @summary Account queries an Ethereum account.
     * @request GET:/evmos/evm/v1/account/{address}
     */
    account: (address: string, params: RequestParams = {}) =>
      this.request<EthermintEvmV1QueryAccountResponse, GrpcGatewayRuntimeError>(
        {
          path: `/evmos/evm/v1/account/${address}`,
          method: 'GET',
          format: 'json',
          ...params,
        },
      ),

    /**
 * No description
 *
 * @tags Query
 * @name Balance
 * @summary Balance queries the balance of a the EVM denomination for a single
EthAccount.
 * @request GET:/evmos/evm/v1/balances/{address}
 */
    balance: (address: string, params: RequestParams = {}) =>
      this.request<EthermintEvmV1QueryBalanceResponse, GrpcGatewayRuntimeError>(
        {
          path: `/evmos/evm/v1/balances/${address}`,
          method: 'GET',
          format: 'json',
          ...params,
        },
      ),

    /**
 * No description
 *
 * @tags Query
 * @name BaseFee
 * @summary BaseFee queries the base fee of the parent block of the current block,
it's similar to feemarket module's method, but also checks london hardfork status.
 * @request GET:/evmos/evm/v1/base_fee
 */
    baseFee: (params: RequestParams = {}) =>
      this.request<EthermintEvmV1QueryBaseFeeResponse, GrpcGatewayRuntimeError>(
        {
          path: `/evmos/evm/v1/base_fee`,
          method: 'GET',
          format: 'json',
          ...params,
        },
      ),

    /**
     * No description
     *
     * @tags Query
     * @name Code
     * @summary Code queries the balance of all coins for a single account.
     * @request GET:/evmos/evm/v1/codes/{address}
     */
    code: (address: string, params: RequestParams = {}) =>
      this.request<EthermintEvmV1QueryCodeResponse, GrpcGatewayRuntimeError>({
        path: `/evmos/evm/v1/codes/${address}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name CosmosAccount
     * @summary CosmosAccount queries an Ethereum account's Cosmos Address.
     * @request GET:/evmos/evm/v1/cosmos_account/{address}
     */
    cosmosAccount: (address: string, params: RequestParams = {}) =>
      this.request<
        EthermintEvmV1QueryCosmosAccountResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/evm/v1/cosmos_account/${address}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name EstimateGas
     * @summary EstimateGas implements the `eth_estimateGas` rpc api
     * @request GET:/evmos/evm/v1/estimate_gas
     */
    estimateGas: (
      query?: {
        /**
         * args uses the same json format as the json rpc api.
         * @format byte
         */
        args?: string
        /**
         * gas_cap defines the default gas cap to be used.
         * @format uint64
         */
        gas_cap?: string
        /**
         * proposer_address of the requested block in hex format.
         * @format byte
         */
        proposer_address?: string
        /**
         * chain_id is the eip155 chain id parsed from the requested block header.
         * @format int64
         */
        chain_id?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<EthermintEvmV1EstimateGasResponse, GrpcGatewayRuntimeError>({
        path: `/evmos/evm/v1/estimate_gas`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name EthCall
     * @summary EthCall implements the `eth_call` rpc api
     * @request GET:/evmos/evm/v1/eth_call
     */
    ethCall: (
      query?: {
        /**
         * args uses the same json format as the json rpc api.
         * @format byte
         */
        args?: string
        /**
         * gas_cap defines the default gas cap to be used.
         * @format uint64
         */
        gas_cap?: string
        /**
         * proposer_address of the requested block in hex format.
         * @format byte
         */
        proposer_address?: string
        /**
         * chain_id is the eip155 chain id parsed from the requested block header.
         * @format int64
         */
        chain_id?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<
        EthermintEvmV1MsgEthereumTxResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/evm/v1/eth_call`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Params
     * @summary Params queries the parameters of x/evm module.
     * @request GET:/evmos/evm/v1/params
     */
    params: (params: RequestParams = {}) =>
      this.request<EthermintEvmV1QueryParamsResponse, GrpcGatewayRuntimeError>({
        path: `/evmos/evm/v1/params`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Storage
     * @summary Storage queries the balance of all coins for a single account.
     * @request GET:/evmos/evm/v1/storage/{address}/{key}
     */
    storage: (address: string, key: string, params: RequestParams = {}) =>
      this.request<EthermintEvmV1QueryStorageResponse, GrpcGatewayRuntimeError>(
        {
          path: `/evmos/evm/v1/storage/${address}/${key}`,
          method: 'GET',
          format: 'json',
          ...params,
        },
      ),

    /**
     * No description
     *
     * @tags Query
     * @name TraceBlock
     * @summary TraceBlock implements the `debug_traceBlockByNumber` and `debug_traceBlockByHash` rpc api
     * @request GET:/evmos/evm/v1/trace_block
     */
    traceBlock: (
      query?: {
        /** tracer is a custom javascript tracer. */
        'trace_config.tracer'?: string
        /**
         * timeout overrides the default timeout of 5 seconds for JavaScript-based tracing
         * calls.
         */
        'trace_config.timeout'?: string
        /**
         * reexec defines the number of blocks the tracer is willing to go back.
         * @format uint64
         */
        'trace_config.reexec'?: string
        /** disable_stack switches stack capture. */
        'trace_config.disable_stack'?: boolean
        /** disable_storage switches storage capture. */
        'trace_config.disable_storage'?: boolean
        /** debug can be used to print output during capture end. */
        'trace_config.debug'?: boolean
        /**
         * limit defines the maximum length of output, but zero means unlimited.
         * @format int32
         */
        'trace_config.limit'?: number
        /** homestead_block switch (nil no fork, 0 = already homestead). */
        'trace_config.overrides.homestead_block'?: string
        /** dao_fork_block corresponds to TheDAO hard-fork switch block (nil no fork). */
        'trace_config.overrides.dao_fork_block'?: string
        /** dao_fork_support defines whether the nodes supports or opposes the DAO hard-fork. */
        'trace_config.overrides.dao_fork_support'?: boolean
        /**
         * eip150_block: EIP150 implements the Gas price changes
         * (https://github.com/ethereum/EIPs/issues/150) EIP150 HF block (nil no fork).
         */
        'trace_config.overrides.eip150_block'?: string
        /** eip150_hash: EIP150 HF hash (needed for header only clients as only gas pricing changed). */
        'trace_config.overrides.eip150_hash'?: string
        /** eip155_block: EIP155Block HF block. */
        'trace_config.overrides.eip155_block'?: string
        /** eip158_block: EIP158 HF block. */
        'trace_config.overrides.eip158_block'?: string
        /** byzantium_block: Byzantium switch block (nil no fork, 0 = already on byzantium). */
        'trace_config.overrides.byzantium_block'?: string
        /** constantinople_block: Constantinople switch block (nil no fork, 0 = already activated). */
        'trace_config.overrides.constantinople_block'?: string
        /** petersburg_block: Petersburg switch block (nil same as Constantinople). */
        'trace_config.overrides.petersburg_block'?: string
        /** istanbul_block: Istanbul switch block (nil no fork, 0 = already on istanbul). */
        'trace_config.overrides.istanbul_block'?: string
        /** muir_glacier_block: Eip-2384 (bomb delay) switch block (nil no fork, 0 = already activated). */
        'trace_config.overrides.muir_glacier_block'?: string
        /** berlin_block: Berlin switch block (nil = no fork, 0 = already on berlin). */
        'trace_config.overrides.berlin_block'?: string
        /** london_block: London switch block (nil = no fork, 0 = already on london). */
        'trace_config.overrides.london_block'?: string
        /** arrow_glacier_block: Eip-4345 (bomb delay) switch block (nil = no fork, 0 = already activated). */
        'trace_config.overrides.arrow_glacier_block'?: string
        /** gray_glacier_block: EIP-5133 (bomb delay) switch block (nil = no fork, 0 = already activated). */
        'trace_config.overrides.gray_glacier_block'?: string
        /** merge_netsplit_block: Virtual fork after The Merge to use as a network splitter. */
        'trace_config.overrides.merge_netsplit_block'?: string
        /** shanghai_block switch block (nil = no fork, 0 = already on shanghai). */
        'trace_config.overrides.shanghai_block'?: string
        /** cancun_block switch block (nil = no fork, 0 = already on cancun). */
        'trace_config.overrides.cancun_block'?: string
        /** enable_memory switches memory capture. */
        'trace_config.enable_memory'?: boolean
        /** enable_return_data switches the capture of return data. */
        'trace_config.enable_return_data'?: boolean
        /** tracer_json_config configures the tracer using a JSON string. */
        'trace_config.tracer_json_config'?: string
        /**
         * block_number of the traced block.
         * @format int64
         */
        block_number?: string
        /** block_hash (hex) of the traced block. */
        block_hash?: string
        /**
         * block_time of the traced block.
         * @format date-time
         */
        block_time?: string
        /**
         * proposer_address is the address of the requested block.
         * @format byte
         */
        proposer_address?: string
        /**
         * chain_id is the eip155 chain id parsed from the requested block header.
         * @format int64
         */
        chain_id?: string
        /**
         * block_max_gas of the traced block.
         * @format int64
         */
        block_max_gas?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<
        EthermintEvmV1QueryTraceBlockResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/evm/v1/trace_block`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name TraceTx
     * @summary TraceTx implements the `debug_traceTransaction` rpc api
     * @request GET:/evmos/evm/v1/trace_tx
     */
    traceTx: (
      query?: {
        /**
         * A URL/resource name that uniquely identifies the type of the serialized
         * protocol buffer message. This string must contain at least
         * one "/" character. The last segment of the URL's path must represent
         * the fully qualified name of the type (as in
         * `path/google.protobuf.Duration`). The name should be in a canonical form
         * (e.g., leading "." is not accepted).
         *
         * In practice, teams usually precompile into the binary all types that they
         * expect it to use in the context of Any. However, for URLs which use the
         * scheme `http`, `https`, or no scheme, one can optionally set up a type
         * server that maps type URLs to message definitions as follows:
         *
         * * If no scheme is provided, `https` is assumed.
         * * An HTTP GET on the URL must yield a [google.protobuf.Type][]
         *   value in binary format, or produce an error.
         * * Applications are allowed to cache lookup results based on the
         *   URL, or have them precompiled into a binary to avoid any
         *   lookup. Therefore, binary compatibility needs to be preserved
         *   on changes to types. (Use versioned type names to manage
         *   breaking changes.)
         *
         * Note: this functionality is not currently available in the official
         * protobuf release, and it is not used for type URLs beginning with
         * type.googleapis.com.
         *
         * Schemes other than `http`, `https` (or the empty scheme) might be
         * used with implementation specific semantics.
         */
        'msg.data.type_url'?: string
        /**
         * Must be a valid serialized protocol buffer of the above specified type.
         * @format byte
         */
        'msg.data.value'?: string
        /**
         * size is the encoded storage size of the transaction (DEPRECATED).
         * @format double
         */
        'msg.size'?: number
        /** hash of the transaction in hex format. */
        'msg.hash'?: string
        /**
         * from is the ethereum signer address in hex format. This address value is checked
         * against the address derived from the signature (V, R, S) using the
         * secp256k1 elliptic curve.
         */
        'msg.from'?: string
        /** tracer is a custom javascript tracer. */
        'trace_config.tracer'?: string
        /**
         * timeout overrides the default timeout of 5 seconds for JavaScript-based tracing
         * calls.
         */
        'trace_config.timeout'?: string
        /**
         * reexec defines the number of blocks the tracer is willing to go back.
         * @format uint64
         */
        'trace_config.reexec'?: string
        /** disable_stack switches stack capture. */
        'trace_config.disable_stack'?: boolean
        /** disable_storage switches storage capture. */
        'trace_config.disable_storage'?: boolean
        /** debug can be used to print output during capture end. */
        'trace_config.debug'?: boolean
        /**
         * limit defines the maximum length of output, but zero means unlimited.
         * @format int32
         */
        'trace_config.limit'?: number
        /** homestead_block switch (nil no fork, 0 = already homestead). */
        'trace_config.overrides.homestead_block'?: string
        /** dao_fork_block corresponds to TheDAO hard-fork switch block (nil no fork). */
        'trace_config.overrides.dao_fork_block'?: string
        /** dao_fork_support defines whether the nodes supports or opposes the DAO hard-fork. */
        'trace_config.overrides.dao_fork_support'?: boolean
        /**
         * eip150_block: EIP150 implements the Gas price changes
         * (https://github.com/ethereum/EIPs/issues/150) EIP150 HF block (nil no fork).
         */
        'trace_config.overrides.eip150_block'?: string
        /** eip150_hash: EIP150 HF hash (needed for header only clients as only gas pricing changed). */
        'trace_config.overrides.eip150_hash'?: string
        /** eip155_block: EIP155Block HF block. */
        'trace_config.overrides.eip155_block'?: string
        /** eip158_block: EIP158 HF block. */
        'trace_config.overrides.eip158_block'?: string
        /** byzantium_block: Byzantium switch block (nil no fork, 0 = already on byzantium). */
        'trace_config.overrides.byzantium_block'?: string
        /** constantinople_block: Constantinople switch block (nil no fork, 0 = already activated). */
        'trace_config.overrides.constantinople_block'?: string
        /** petersburg_block: Petersburg switch block (nil same as Constantinople). */
        'trace_config.overrides.petersburg_block'?: string
        /** istanbul_block: Istanbul switch block (nil no fork, 0 = already on istanbul). */
        'trace_config.overrides.istanbul_block'?: string
        /** muir_glacier_block: Eip-2384 (bomb delay) switch block (nil no fork, 0 = already activated). */
        'trace_config.overrides.muir_glacier_block'?: string
        /** berlin_block: Berlin switch block (nil = no fork, 0 = already on berlin). */
        'trace_config.overrides.berlin_block'?: string
        /** london_block: London switch block (nil = no fork, 0 = already on london). */
        'trace_config.overrides.london_block'?: string
        /** arrow_glacier_block: Eip-4345 (bomb delay) switch block (nil = no fork, 0 = already activated). */
        'trace_config.overrides.arrow_glacier_block'?: string
        /** gray_glacier_block: EIP-5133 (bomb delay) switch block (nil = no fork, 0 = already activated). */
        'trace_config.overrides.gray_glacier_block'?: string
        /** merge_netsplit_block: Virtual fork after The Merge to use as a network splitter. */
        'trace_config.overrides.merge_netsplit_block'?: string
        /** shanghai_block switch block (nil = no fork, 0 = already on shanghai). */
        'trace_config.overrides.shanghai_block'?: string
        /** cancun_block switch block (nil = no fork, 0 = already on cancun). */
        'trace_config.overrides.cancun_block'?: string
        /** enable_memory switches memory capture. */
        'trace_config.enable_memory'?: boolean
        /** enable_return_data switches the capture of return data. */
        'trace_config.enable_return_data'?: boolean
        /** tracer_json_config configures the tracer using a JSON string. */
        'trace_config.tracer_json_config'?: string
        /**
         * block_number of requested transaction.
         * @format int64
         */
        block_number?: string
        /** block_hash of requested transaction. */
        block_hash?: string
        /**
         * block_time of requested transaction.
         * @format date-time
         */
        block_time?: string
        /**
         * proposer_address is the proposer of the requested block.
         * @format byte
         */
        proposer_address?: string
        /**
         * chain_id is the the eip155 chain id parsed from the requested block header.
         * @format int64
         */
        chain_id?: string
        /**
         * block_max_gas of the block of the requested transaction.
         * @format int64
         */
        block_max_gas?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<EthermintEvmV1QueryTraceTxResponse, GrpcGatewayRuntimeError>(
        {
          path: `/evmos/evm/v1/trace_tx`,
          method: 'GET',
          query: query,
          format: 'json',
          ...params,
        },
      ),

    /**
 * No description
 *
 * @tags Query
 * @name ValidatorAccount
 * @summary ValidatorAccount queries an Ethereum account's from a validator consensus
Address.
 * @request GET:/evmos/evm/v1/validator_account/{cons_address}
 */
    validatorAccount: (consAddress: string, params: RequestParams = {}) =>
      this.request<
        EthermintEvmV1QueryValidatorAccountResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/evm/v1/validator_account/${consAddress}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  }
  feemarket = {
    /**
     * No description
     *
     * @tags Query
     * @name BaseFee
     * @summary BaseFee queries the base fee of the parent block of the current block.
     * @request GET:/evmos/feemarket/v1/base_fee
     */
    baseFee: (params: RequestParams = {}) =>
      this.request<
        EthermintFeemarketV1QueryBaseFeeResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/feemarket/v1/base_fee`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name BlockGas
     * @summary BlockGas queries the gas used at a given block height
     * @request GET:/evmos/feemarket/v1/block_gas
     */
    blockGas: (params: RequestParams = {}) =>
      this.request<
        EthermintFeemarketV1QueryBlockGasResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/feemarket/v1/block_gas`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Params
     * @summary Params queries the parameters of x/feemarket module.
     * @request GET:/evmos/feemarket/v1/params
     */
    params: (params: RequestParams = {}) =>
      this.request<
        EthermintFeemarketV1QueryParamsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/feemarket/v1/params`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  }
  claims = {
    /**
     * No description
     *
     * @tags Query
     * @name ClaimsRecords
     * @summary ClaimsRecords returns all claims records
     * @request GET:/evmos/claims/v1/claims_records
     */
    claimsRecords: (
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        EvmosClaimsV1QueryClaimsRecordsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/claims/v1/claims_records`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name ClaimsRecord
     * @summary ClaimsRecord returns the claims record for a given address
     * @request GET:/evmos/claims/v1/claims_records/{address}
     */
    claimsRecord: (address: string, params: RequestParams = {}) =>
      this.request<
        EvmosClaimsV1QueryClaimsRecordResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/claims/v1/claims_records/${address}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Params
     * @summary Params returns the claims module parameters
     * @request GET:/evmos/claims/v1/params
     */
    params: (params: RequestParams = {}) =>
      this.request<EvmosClaimsV1QueryParamsResponse, GrpcGatewayRuntimeError>({
        path: `/evmos/claims/v1/params`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name TotalUnclaimed
     * @summary TotalUnclaimed queries the total unclaimed tokens from the airdrop
     * @request GET:/evmos/claims/v1/total_unclaimed
     */
    totalUnclaimed: (params: RequestParams = {}) =>
      this.request<
        EvmosClaimsV1QueryTotalUnclaimedResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/claims/v1/total_unclaimed`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  }
  epochs = {
    /**
     * No description
     *
     * @tags Query
     * @name CurrentEpoch
     * @summary CurrentEpoch provide current epoch of specified identifier
     * @request GET:/evmos/epochs/v1/current_epoch
     */
    currentEpoch: (
      query?: {
        /** identifier of the current epoch. */
        identifier?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<
        EvmosEpochsV1QueryCurrentEpochResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/epochs/v1/current_epoch`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name EpochInfos
     * @summary EpochInfos provide running epochInfos
     * @request GET:/evmos/epochs/v1/epochs
     */
    epochInfos: (
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        EvmosEpochsV1QueryEpochsInfoResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/epochs/v1/epochs`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  }
  erc20 = {
    /**
     * No description
     *
     * @tags Query
     * @name Params
     * @summary Params retrieves the erc20 module params
     * @request GET:/evmos/erc20/v1/params
     */
    params: (params: RequestParams = {}) =>
      this.request<EvmosErc20V1QueryParamsResponse, GrpcGatewayRuntimeError>({
        path: `/evmos/erc20/v1/params`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name TokenPairs
     * @summary TokenPairs retrieves registered token pairs
     * @request GET:/evmos/erc20/v1/token_pairs
     */
    tokenPairs: (
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        EvmosErc20V1QueryTokenPairsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/erc20/v1/token_pairs`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name TokenPair
     * @summary TokenPair retrieves a registered token pair
     * @request GET:/evmos/erc20/v1/token_pairs/{token}
     */
    tokenPair: (token: string, params: RequestParams = {}) =>
      this.request<EvmosErc20V1QueryTokenPairResponse, GrpcGatewayRuntimeError>(
        {
          path: `/evmos/erc20/v1/token_pairs/${token}`,
          method: 'GET',
          format: 'json',
          ...params,
        },
      ),
  }
  incentives = {
    /**
 * No description
 *
 * @tags Query
 * @name AllocationMeters
 * @summary AllocationMeters retrieves active allocation meters for a given
denomination
 * @request GET:/evmos/incentives/v1/allocation_meters
 */
    allocationMeters: (
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        EvmosIncentivesV1QueryAllocationMetersResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/incentives/v1/allocation_meters`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name AllocationMeter
     * @summary AllocationMeter retrieves a active gas meter
     * @request GET:/evmos/incentives/v1/allocation_meters/{denom}
     */
    allocationMeter: (denom: string, params: RequestParams = {}) =>
      this.request<
        EvmosIncentivesV1QueryAllocationMeterResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/incentives/v1/allocation_meters/${denom}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name GasMeters
     * @summary GasMeters retrieves active gas meters for a given contract
     * @request GET:/evmos/incentives/v1/gas_meters/{contract}
     */
    gasMeters: (
      contract: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        EvmosIncentivesV1QueryGasMetersResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/incentives/v1/gas_meters/${contract}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name GasMeter
     * @summary GasMeter retrieves a active gas meter
     * @request GET:/evmos/incentives/v1/gas_meters/{contract}/{participant}
     */
    gasMeter: (
      contract: string,
      participant: string,
      params: RequestParams = {},
    ) =>
      this.request<
        EvmosIncentivesV1QueryGasMeterResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/incentives/v1/gas_meters/${contract}/${participant}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Incentives
     * @summary Incentives retrieves registered incentives
     * @request GET:/evmos/incentives/v1/incentives
     */
    incentives: (
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        EvmosIncentivesV1QueryIncentivesResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/incentives/v1/incentives`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Incentive
     * @summary Incentive retrieves a registered incentive
     * @request GET:/evmos/incentives/v1/incentives/{contract}
     */
    incentive: (contract: string, params: RequestParams = {}) =>
      this.request<
        EvmosIncentivesV1QueryIncentiveResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/incentives/v1/incentives/${contract}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Params
     * @summary Params retrieves the incentives module params
     * @request GET:/evmos/incentives/v1/params
     */
    params: (params: RequestParams = {}) =>
      this.request<
        EvmosIncentivesV1QueryParamsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/incentives/v1/params`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  }
  inflation = {
    /**
 * No description
 *
 * @tags Query
 * @name CirculatingSupply
 * @summary CirculatingSupply retrieves the total number of tokens that are in
circulation (i.e. excluding unvested tokens).
 * @request GET:/evmos/inflation/v1/circulating_supply
 */
    circulatingSupply: (params: RequestParams = {}) =>
      this.request<
        EvmosInflationV1QueryCirculatingSupplyResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/inflation/v1/circulating_supply`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name EpochMintProvision
     * @summary EpochMintProvision retrieves current minting epoch provision value.
     * @request GET:/evmos/inflation/v1/epoch_mint_provision
     */
    epochMintProvision: (params: RequestParams = {}) =>
      this.request<
        EvmosInflationV1QueryEpochMintProvisionResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/inflation/v1/epoch_mint_provision`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name InflationRate
     * @summary InflationRate retrieves the inflation rate of the current period.
     * @request GET:/evmos/inflation/v1/inflation_rate
     */
    inflationRate: (params: RequestParams = {}) =>
      this.request<
        EvmosInflationV1QueryInflationRateResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/inflation/v1/inflation_rate`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Params
     * @summary Params retrieves the total set of minting parameters.
     * @request GET:/evmos/inflation/v1/params
     */
    params: (params: RequestParams = {}) =>
      this.request<
        EvmosInflationV1QueryParamsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/inflation/v1/params`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Period
     * @summary Period retrieves current period.
     * @request GET:/evmos/inflation/v1/period
     */
    period: (params: RequestParams = {}) =>
      this.request<
        EvmosInflationV1QueryPeriodResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/inflation/v1/period`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name SkippedEpochs
     * @summary SkippedEpochs retrieves the total number of skipped epochs.
     * @request GET:/evmos/inflation/v1/skipped_epochs
     */
    skippedEpochs: (params: RequestParams = {}) =>
      this.request<
        EvmosInflationV1QuerySkippedEpochsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/inflation/v1/skipped_epochs`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  }
  recovery = {
    /**
     * No description
     *
     * @tags Query
     * @name Params
     * @summary Params retrieves the total set of recovery parameters.
     * @request GET:/evmos/recovery/v1/params
     */
    params: (params: RequestParams = {}) =>
      this.request<EvmosRecoveryV1QueryParamsResponse, GrpcGatewayRuntimeError>(
        {
          path: `/evmos/recovery/v1/params`,
          method: 'GET',
          format: 'json',
          ...params,
        },
      ),
  }
  revenue = {
    /**
     * No description
     *
     * @tags Query
     * @name Params
     * @summary Params retrieves the revenue module params
     * @request GET:/evmos/revenue/v1/params
     */
    params: (params: RequestParams = {}) =>
      this.request<EvmosRevenueV1QueryParamsResponse, GrpcGatewayRuntimeError>({
        path: `/evmos/revenue/v1/params`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Revenues
     * @summary Revenues retrieves all registered revenues
     * @request GET:/evmos/revenue/v1/revenues
     */
    revenues: (
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        EvmosRevenueV1QueryRevenuesResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/revenue/v1/revenues`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Revenue
     * @summary Revenue retrieves a registered revenue for a given contract address
     * @request GET:/evmos/revenue/v1/revenues/{contract_address}
     */
    revenue: (contractAddress: string, params: RequestParams = {}) =>
      this.request<EvmosRevenueV1QueryRevenueResponse, GrpcGatewayRuntimeError>(
        {
          path: `/evmos/revenue/v1/revenues/${contractAddress}`,
          method: 'GET',
          format: 'json',
          ...params,
        },
      ),

    /**
 * No description
 *
 * @tags Query
 * @name DeployerRevenues
 * @summary DeployerRevenues retrieves all revenues that a given deployer has
registered
 * @request GET:/evmos/revenue/v1/revenues/{deployer_address}
 */
    deployerRevenues: (
      deployerAddress: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        EvmosRevenueV1QueryDeployerRevenuesResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/revenue/v1/revenues/${deployerAddress}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags Query
 * @name WithdrawerRevenues
 * @summary WithdrawerRevenues retrieves all revenues with a given withdrawer
address
 * @request GET:/evmos/revenue/v1/revenues/{withdrawer_address}
 */
    withdrawerRevenues: (
      withdrawerAddress: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        EvmosRevenueV1QueryWithdrawerRevenuesResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/revenue/v1/revenues/${withdrawerAddress}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  }
  vesting = {
    /**
     * No description
     *
     * @tags Query
     * @name Balances
     * @summary Balances retrieves the unvested, vested and locked tokens for a vesting account
     * @request GET:/evmos/vesting/v1/balances/{address}
     */
    balances: (address: string, params: RequestParams = {}) =>
      this.request<
        EvmosVestingV1QueryBalancesResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/evmos/vesting/v1/balances/${address}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  }
  apps = {
    /**
     * No description
     *
     * @tags Query
     * @name FeeEnabledChannel
     * @summary FeeEnabledChannel returns true if the provided port and channel identifiers belong to a fee enabled channel
     * @request GET:/ibc/apps/fee/v1/channels/{channel_id}/ports/{port_id}/fee_enabled
     */
    feeEnabledChannel: (
      channelId: string,
      portId: string,
      params: RequestParams = {},
    ) =>
      this.request<
        IbcApplicationsFeeV1QueryFeeEnabledChannelResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/apps/fee/v1/channels/${channelId}/ports/${portId}/fee_enabled`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name IncentivizedPacketsForChannel
     * @summary Gets all incentivized packets for a specific channel
     * @request GET:/ibc/apps/fee/v1/channels/{channel_id}/ports/{port_id}/incentivized_packets
     */
    incentivizedPacketsForChannel: (
      channelId: string,
      portId: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
        /**
         * Height to query at.
         * @format uint64
         */
        query_height?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<
        IbcApplicationsFeeV1QueryIncentivizedPacketsForChannelResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/apps/fee/v1/channels/${channelId}/ports/${portId}/incentivized_packets`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name CounterpartyPayee
     * @summary CounterpartyPayee returns the registered counterparty payee for forward relaying
     * @request GET:/ibc/apps/fee/v1/channels/{channel_id}/relayers/{relayer}/counterparty_payee
     */
    counterpartyPayee: (
      channelId: string,
      relayer: string,
      params: RequestParams = {},
    ) =>
      this.request<
        IbcApplicationsFeeV1QueryCounterpartyPayeeResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/apps/fee/v1/channels/${channelId}/relayers/${relayer}/counterparty_payee`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Payee
     * @summary Payee returns the registered payee address for a specific channel given the relayer address
     * @request GET:/ibc/apps/fee/v1/channels/{channel_id}/relayers/{relayer}/payee
     */
    payee: (channelId: string, relayer: string, params: RequestParams = {}) =>
      this.request<
        IbcApplicationsFeeV1QueryPayeeResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/apps/fee/v1/channels/${channelId}/relayers/${relayer}/payee`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name IncentivizedPacket
     * @summary IncentivizedPacket returns all packet fees for a packet given its identifier
     * @request GET:/ibc/apps/fee/v1/channels/{packet_id.channel_id}/ports/{packet_id.port_id}/sequences/{packet_id.sequence}/incentivized_packet
     */
    incentivizedPacket: (
      packetIdChannelId: string,
      packetIdPortId: string,
      packetIdSequence: string,
      query?: {
        /**
         * block height at which to query.
         * @format uint64
         */
        query_height?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<
        IbcApplicationsFeeV1QueryIncentivizedPacketResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/apps/fee/v1/channels/${packetIdChannelId}/ports/${packetIdPortId}/sequences/${packetIdSequence}/incentivized_packet`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name TotalAckFees
     * @summary TotalAckFees returns the total acknowledgement fees for a packet given its identifier
     * @request GET:/ibc/apps/fee/v1/channels/{packet_id.channel_id}/ports/{packet_id.port_id}/sequences/{packet_id.sequence}/total_ack_fees
     */
    totalAckFees: (
      packetIdChannelId: string,
      packetIdPortId: string,
      packetIdSequence: string,
      params: RequestParams = {},
    ) =>
      this.request<
        IbcApplicationsFeeV1QueryTotalAckFeesResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/apps/fee/v1/channels/${packetIdChannelId}/ports/${packetIdPortId}/sequences/${packetIdSequence}/total_ack_fees`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name TotalRecvFees
     * @summary TotalRecvFees returns the total receive fees for a packet given its identifier
     * @request GET:/ibc/apps/fee/v1/channels/{packet_id.channel_id}/ports/{packet_id.port_id}/sequences/{packet_id.sequence}/total_recv_fees
     */
    totalRecvFees: (
      packetIdChannelId: string,
      packetIdPortId: string,
      packetIdSequence: string,
      params: RequestParams = {},
    ) =>
      this.request<
        IbcApplicationsFeeV1QueryTotalRecvFeesResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/apps/fee/v1/channels/${packetIdChannelId}/ports/${packetIdPortId}/sequences/${packetIdSequence}/total_recv_fees`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name TotalTimeoutFees
     * @summary TotalTimeoutFees returns the total timeout fees for a packet given its identifier
     * @request GET:/ibc/apps/fee/v1/channels/{packet_id.channel_id}/ports/{packet_id.port_id}/sequences/{packet_id.sequence}/total_timeout_fees
     */
    totalTimeoutFees: (
      packetIdChannelId: string,
      packetIdPortId: string,
      packetIdSequence: string,
      params: RequestParams = {},
    ) =>
      this.request<
        IbcApplicationsFeeV1QueryTotalTimeoutFeesResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/apps/fee/v1/channels/${packetIdChannelId}/ports/${packetIdPortId}/sequences/${packetIdSequence}/total_timeout_fees`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name FeeEnabledChannels
     * @summary FeeEnabledChannels returns a list of all fee enabled channels
     * @request GET:/ibc/apps/fee/v1/fee_enabled
     */
    feeEnabledChannels: (
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
        /**
         * block height at which to query.
         * @format uint64
         */
        query_height?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<
        IbcApplicationsFeeV1QueryFeeEnabledChannelsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/apps/fee/v1/fee_enabled`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name IncentivizedPackets
     * @summary IncentivizedPackets returns all incentivized packets and their associated fees
     * @request GET:/ibc/apps/fee/v1/incentivized_packets
     */
    incentivizedPackets: (
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
        /**
         * block height at which to query.
         * @format uint64
         */
        query_height?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<
        IbcApplicationsFeeV1QueryIncentivizedPacketsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/apps/fee/v1/incentivized_packets`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name InterchainAccount
     * @summary InterchainAccount returns the interchain account address for a given owner address on a given connection
     * @request GET:/ibc/apps/interchain_accounts/controller/v1/owners/{owner}/connections/{connection_id}
     */
    interchainAccount: (
      owner: string,
      connectionId: string,
      params: RequestParams = {},
    ) =>
      this.request<
        IbcApplicationsInterchainAccountsControllerV1QueryInterchainAccountResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/apps/interchain_accounts/controller/v1/owners/${owner}/connections/${connectionId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Params
     * @summary Params queries all parameters of the ICA controller submodule.
     * @request GET:/ibc/apps/interchain_accounts/controller/v1/params
     */
    params: (params: RequestParams = {}) =>
      this.request<
        IbcApplicationsInterchainAccountsControllerV1QueryParamsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/apps/interchain_accounts/controller/v1/params`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Params2
     * @summary Params queries all parameters of the ICA host submodule.
     * @request GET:/ibc/apps/interchain_accounts/host/v1/params
     * @originalName params
     * @duplicate
     */
    params2: (params: RequestParams = {}) =>
      this.request<
        IbcApplicationsInterchainAccountsHostV1QueryParamsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/apps/interchain_accounts/host/v1/params`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name EscrowAddress
     * @summary EscrowAddress returns the escrow address for a particular port and channel id.
     * @request GET:/ibc/apps/transfer/v1/channels/{channel_id}/ports/{port_id}/escrow_address
     */
    escrowAddress: (
      channelId: string,
      portId: string,
      params: RequestParams = {},
    ) =>
      this.request<
        IbcApplicationsTransferV1QueryEscrowAddressResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/apps/transfer/v1/channels/${channelId}/ports/${portId}/escrow_address`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name DenomHash
     * @summary DenomHash queries a denomination hash information.
     * @request GET:/ibc/apps/transfer/v1/denom_hashes/{trace}
     */
    denomHash: (trace: string, params: RequestParams = {}) =>
      this.request<
        IbcApplicationsTransferV1QueryDenomHashResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/apps/transfer/v1/denom_hashes/${trace}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name DenomTraces
     * @summary DenomTraces queries all denomination traces.
     * @request GET:/ibc/apps/transfer/v1/denom_traces
     */
    denomTraces: (
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        IbcApplicationsTransferV1QueryDenomTracesResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/apps/transfer/v1/denom_traces`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name DenomTrace
     * @summary DenomTrace queries a denomination trace information.
     * @request GET:/ibc/apps/transfer/v1/denom_traces/{hash}
     */
    denomTrace: (hash: string, params: RequestParams = {}) =>
      this.request<
        IbcApplicationsTransferV1QueryDenomTraceResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/apps/transfer/v1/denom_traces/${hash}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name TotalEscrowForDenom
     * @summary TotalEscrowForDenom returns the total amount of tokens in escrow based on the denom.
     * @request GET:/ibc/apps/transfer/v1/denoms/{denom}/total_escrow
     */
    totalEscrowForDenom: (denom: string, params: RequestParams = {}) =>
      this.request<
        IbcApplicationsTransferV1QueryTotalEscrowForDenomResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/apps/transfer/v1/denoms/${denom}/total_escrow`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Params3
     * @summary Params queries all parameters of the ibc-transfer module.
     * @request GET:/ibc/apps/transfer/v1/params
     * @originalName params
     * @duplicate
     */
    params3: (params: RequestParams = {}) =>
      this.request<
        IbcApplicationsTransferV1QueryParamsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/apps/transfer/v1/params`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  }
  core = {
    /**
     * No description
     *
     * @tags Query
     * @name Channels
     * @summary Channels queries all the IBC channels of a chain.
     * @request GET:/ibc/core/channel/v1/channels
     */
    channels: (
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        IbcCoreChannelV1QueryChannelsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/channel/v1/channels`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Channel
     * @summary Channel queries an IBC Channel.
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}
     */
    channel: (channelId: string, portId: string, params: RequestParams = {}) =>
      this.request<
        IbcCoreChannelV1QueryChannelResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags Query
 * @name ChannelClientState
 * @summary ChannelClientState queries for the client state for the channel associated
with the provided channel identifiers.
 * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/client_state
 */
    channelClientState: (
      channelId: string,
      portId: string,
      params: RequestParams = {},
    ) =>
      this.request<
        IbcCoreChannelV1QueryChannelClientStateResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/client_state`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags Query
 * @name ChannelConsensusState
 * @summary ChannelConsensusState queries for the consensus state for the channel
associated with the provided channel identifiers.
 * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/consensus_state/revision/{revision_number}/height/{revision_height}
 */
    channelConsensusState: (
      channelId: string,
      portId: string,
      revisionNumber: string,
      revisionHeight: string,
      params: RequestParams = {},
    ) =>
      this.request<
        IbcCoreChannelV1QueryChannelConsensusStateResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/consensus_state/revision/${revisionNumber}/height/${revisionHeight}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name NextSequenceReceive
     * @summary NextSequenceReceive returns the next receive sequence for a given channel.
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/next_sequence
     */
    nextSequenceReceive: (
      channelId: string,
      portId: string,
      params: RequestParams = {},
    ) =>
      this.request<
        IbcCoreChannelV1QueryNextSequenceReceiveResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/next_sequence`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name NextSequenceSend
     * @summary NextSequenceSend returns the next send sequence for a given channel.
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/next_sequence_send
     */
    nextSequenceSend: (
      channelId: string,
      portId: string,
      params: RequestParams = {},
    ) =>
      this.request<
        IbcCoreChannelV1QueryNextSequenceSendResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/next_sequence_send`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags Query
 * @name PacketAcknowledgements
 * @summary PacketAcknowledgements returns all the packet acknowledgements associated
with a channel.
 * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_acknowledgements
 */
    packetAcknowledgements: (
      channelId: string,
      portId: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
        /** list of packet sequences. */
        packet_commitment_sequences?: string[]
      },
      params: RequestParams = {},
    ) =>
      this.request<
        IbcCoreChannelV1QueryPacketAcknowledgementsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/packet_acknowledgements`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name PacketAcknowledgement
     * @summary PacketAcknowledgement queries a stored packet acknowledgement hash.
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_acks/{sequence}
     */
    packetAcknowledgement: (
      channelId: string,
      portId: string,
      sequence: string,
      params: RequestParams = {},
    ) =>
      this.request<
        IbcCoreChannelV1QueryPacketAcknowledgementResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/packet_acks/${sequence}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags Query
 * @name PacketCommitments
 * @summary PacketCommitments returns all the packet commitments hashes associated
with a channel.
 * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_commitments
 */
    packetCommitments: (
      channelId: string,
      portId: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        IbcCoreChannelV1QueryPacketCommitmentsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/packet_commitments`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags Query
 * @name UnreceivedAcks
 * @summary UnreceivedAcks returns all the unreceived IBC acknowledgements associated
with a channel and sequences.
 * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_commitments/{packet_ack_sequences}/unreceived_acks
 */
    unreceivedAcks: (
      channelId: string,
      portId: string,
      packetAckSequences: string[],
      params: RequestParams = {},
    ) =>
      this.request<
        IbcCoreChannelV1QueryUnreceivedAcksResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/packet_commitments/${packetAckSequences}/unreceived_acks`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags Query
 * @name UnreceivedPackets
 * @summary UnreceivedPackets returns all the unreceived IBC packets associated with a
channel and sequences.
 * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_commitments/{packet_commitment_sequences}/unreceived_packets
 */
    unreceivedPackets: (
      channelId: string,
      portId: string,
      packetCommitmentSequences: string[],
      params: RequestParams = {},
    ) =>
      this.request<
        IbcCoreChannelV1QueryUnreceivedPacketsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/packet_commitments/${packetCommitmentSequences}/unreceived_packets`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name PacketCommitment
     * @summary PacketCommitment queries a stored packet commitment hash.
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_commitments/{sequence}
     */
    packetCommitment: (
      channelId: string,
      portId: string,
      sequence: string,
      params: RequestParams = {},
    ) =>
      this.request<
        IbcCoreChannelV1QueryPacketCommitmentResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/packet_commitments/${sequence}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags Query
 * @name PacketReceipt
 * @summary PacketReceipt queries if a given packet sequence has been received on the
queried chain
 * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_receipts/{sequence}
 */
    packetReceipt: (
      channelId: string,
      portId: string,
      sequence: string,
      params: RequestParams = {},
    ) =>
      this.request<
        IbcCoreChannelV1QueryPacketReceiptResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/packet_receipts/${sequence}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags Query
 * @name ConnectionChannels
 * @summary ConnectionChannels queries all the channels associated with a connection
end.
 * @request GET:/ibc/core/channel/v1/connections/{connection}/channels
 */
    connectionChannels: (
      connection: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        IbcCoreChannelV1QueryConnectionChannelsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/channel/v1/connections/${connection}/channels`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name ClientStates
     * @summary ClientStates queries all the IBC light clients of a chain.
     * @request GET:/ibc/core/client/v1/client_states
     */
    clientStates: (
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        IbcCoreClientV1QueryClientStatesResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/client/v1/client_states`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name ClientState
     * @summary ClientState queries an IBC light client.
     * @request GET:/ibc/core/client/v1/client_states/{client_id}
     */
    clientState: (clientId: string, params: RequestParams = {}) =>
      this.request<
        IbcCoreClientV1QueryClientStateResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/client/v1/client_states/${clientId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name ClientStatus
     * @summary Status queries the status of an IBC client.
     * @request GET:/ibc/core/client/v1/client_status/{client_id}
     */
    clientStatus: (clientId: string, params: RequestParams = {}) =>
      this.request<
        IbcCoreClientV1QueryClientStatusResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/client/v1/client_status/${clientId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags Query
 * @name ConsensusStates
 * @summary ConsensusStates queries all the consensus state associated with a given
client.
 * @request GET:/ibc/core/client/v1/consensus_states/{client_id}
 */
    consensusStates: (
      clientId: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        IbcCoreClientV1QueryConsensusStatesResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/client/v1/consensus_states/${clientId}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name ConsensusStateHeights
     * @summary ConsensusStateHeights queries the height of every consensus states associated with a given client.
     * @request GET:/ibc/core/client/v1/consensus_states/{client_id}/heights
     */
    consensusStateHeights: (
      clientId: string,
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        IbcCoreClientV1QueryConsensusStateHeightsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/client/v1/consensus_states/${clientId}/heights`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags Query
 * @name ConsensusState
 * @summary ConsensusState queries a consensus state associated with a client state at
a given height.
 * @request GET:/ibc/core/client/v1/consensus_states/{client_id}/revision/{revision_number}/height/{revision_height}
 */
    consensusState: (
      clientId: string,
      revisionNumber: string,
      revisionHeight: string,
      query?: {
        /**
         * latest_height overrrides the height field and queries the latest stored
         * ConsensusState.
         */
        latest_height?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        IbcCoreClientV1QueryConsensusStateResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/client/v1/consensus_states/${clientId}/revision/${revisionNumber}/height/${revisionHeight}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name ClientParams
     * @summary ClientParams queries all parameters of the ibc client submodule.
     * @request GET:/ibc/core/client/v1/params
     */
    clientParams: (params: RequestParams = {}) =>
      this.request<
        IbcCoreClientV1QueryClientParamsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/client/v1/params`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name UpgradedClientState
     * @summary UpgradedClientState queries an Upgraded IBC light client.
     * @request GET:/ibc/core/client/v1/upgraded_client_states
     */
    upgradedClientState: (params: RequestParams = {}) =>
      this.request<
        IbcCoreClientV1QueryUpgradedClientStateResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/client/v1/upgraded_client_states`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name UpgradedConsensusState
     * @summary UpgradedConsensusState queries an Upgraded IBC consensus state.
     * @request GET:/ibc/core/client/v1/upgraded_consensus_states
     */
    upgradedConsensusState: (params: RequestParams = {}) =>
      this.request<
        IbcCoreClientV1QueryUpgradedConsensusStateResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/client/v1/upgraded_consensus_states`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags Query
 * @name ClientConnections
 * @summary ClientConnections queries the connection paths associated with a client
state.
 * @request GET:/ibc/core/connection/v1/client_connections/{client_id}
 */
    clientConnections: (clientId: string, params: RequestParams = {}) =>
      this.request<
        IbcCoreConnectionV1QueryClientConnectionsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/connection/v1/client_connections/${clientId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Connections
     * @summary Connections queries all the IBC connections of a chain.
     * @request GET:/ibc/core/connection/v1/connections
     */
    connections: (
      query?: {
        /**
         * key is a value returned in PageResponse.next_key to begin
         * querying the next page most efficiently. Only one of offset or key
         * should be set.
         * @format byte
         */
        'pagination.key'?: string
        /**
         * offset is a numeric offset that can be used when key is unavailable.
         * It is less efficient than using key. Only one of offset or key should
         * be set.
         * @format uint64
         */
        'pagination.offset'?: string
        /**
         * limit is the total number of results to be returned in the result page.
         * If left empty it will default to a value to be set by each app.
         * @format uint64
         */
        'pagination.limit'?: string
        /**
         * count_total is set to true  to indicate that the result set should include
         * a count of the total number of items available for pagination in UIs.
         * count_total is only respected when offset is used. It is ignored when key
         * is set.
         */
        'pagination.count_total'?: boolean
        /**
         * reverse is set to true if results are to be returned in the descending order.
         *
         * Since: cosmos-sdk 0.43
         */
        'pagination.reverse'?: boolean
      },
      params: RequestParams = {},
    ) =>
      this.request<
        IbcCoreConnectionV1QueryConnectionsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/connection/v1/connections`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name Connection
     * @summary Connection queries an IBC connection end.
     * @request GET:/ibc/core/connection/v1/connections/{connection_id}
     */
    connection: (connectionId: string, params: RequestParams = {}) =>
      this.request<
        IbcCoreConnectionV1QueryConnectionResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/connection/v1/connections/${connectionId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags Query
 * @name ConnectionClientState
 * @summary ConnectionClientState queries the client state associated with the
connection.
 * @request GET:/ibc/core/connection/v1/connections/{connection_id}/client_state
 */
    connectionClientState: (connectionId: string, params: RequestParams = {}) =>
      this.request<
        IbcCoreConnectionV1QueryConnectionClientStateResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/connection/v1/connections/${connectionId}/client_state`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags Query
 * @name ConnectionConsensusState
 * @summary ConnectionConsensusState queries the consensus state associated with the
connection.
 * @request GET:/ibc/core/connection/v1/connections/{connection_id}/consensus_state/revision/{revision_number}/height/{revision_height}
 */
    connectionConsensusState: (
      connectionId: string,
      revisionNumber: string,
      revisionHeight: string,
      params: RequestParams = {},
    ) =>
      this.request<
        IbcCoreConnectionV1QueryConnectionConsensusStateResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/connection/v1/connections/${connectionId}/consensus_state/revision/${revisionNumber}/height/${revisionHeight}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Query
     * @name ConnectionParams
     * @summary ConnectionParams queries all parameters of the ibc connection submodule.
     * @request GET:/ibc/core/connection/v1/params
     */
    connectionParams: (params: RequestParams = {}) =>
      this.request<
        IbcCoreConnectionV1QueryConnectionParamsResponse,
        GrpcGatewayRuntimeError
      >({
        path: `/ibc/core/connection/v1/params`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  }
}
