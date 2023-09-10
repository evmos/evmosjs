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

/** Empty Data Response */
export type EmptyDataResponse = {}

/** Error Response RPC */
export interface ErrorResponseRPC {
  code?: number
  message?: string
  data?: string
}

export interface ProtocolVersion {
  /** @example "7" */
  p2p?: string
  /** @example "10" */
  block?: string
  /** @example "0" */
  app?: string
}

export interface PubKey {
  /** @example "tendermint/PubKeyEd25519" */
  type?: string
  /** @example "A6DoBUypNtUAyEHWtQ9bFjfNg8Bo9CrnkUGl6k6OHN4=" */
  value?: string
}

export interface NodeInfo {
  protocol_version?: ProtocolVersion
  /** @example "5576458aef205977e18fd50b274e9b5d9014525a" */
  id?: string
  /** @example "tcp:0.0.0.0:26656" */
  listen_addr?: string
  /** @example "cosmoshub-2" */
  network?: string
  /** @example "0.32.1" */
  version?: string
  /** @example "4020212223303800" */
  channels?: string
  /** @example "moniker-node" */
  moniker?: string
  other?: {
    /** @example "on" */
    tx_index?: string
    /** @example "tcp:0.0.0.0:26657" */
    rpc_address?: string
  }
}

export interface SyncInfo {
  /** @example "790BA84C3545FCCC49A5C629CEE6EA58A6E875C3862175BDC11EE7AF54703501" */
  latest_block_hash?: string
  /** @example "C9AEBB441B787D9F1D846DE51F3826F4FD386108B59B08239653ABF59455C3F8" */
  latest_app_hash?: string
  /** @example "1262196" */
  latest_block_height?: string
  /** @example "2019-08-01T11:52:22.818762194Z" */
  latest_block_time?: string
  /** @example "790BA84C3545FCCC49A5C629CEE6EA58A6E875C3862175BDC11EE7AF54703501" */
  earliest_block_hash?: string
  /** @example "C9AEBB441B787D9F1D846DE51F3826F4FD386108B59B08239653ABF59455C3F8" */
  earliest_app_hash?: string
  /** @example "1262196" */
  earliest_block_height?: string
  /** @example "2019-08-01T11:52:22.818762194Z" */
  earliest_block_time?: string
  /** @example false */
  catching_up?: boolean
}

export interface ValidatorInfo {
  /** @example "5D6A51A8E9899C44079C6AF90618BA0369070E6E" */
  address?: string
  pub_key?: PubKey
  /** @example "0" */
  voting_power?: string
}

/** Status Response */
export interface Status {
  node_info?: NodeInfo
  sync_info?: SyncInfo
  validator_info?: ValidatorInfo
}

export interface Monitor {
  /** @example true */
  Active?: boolean
  /** @example "2019-07-31T14:31:28.66Z" */
  Start?: string
  /** @example "168901060000000" */
  Duration?: string
  /** @example "168901040000000" */
  Idle?: string
  /** @example "5" */
  Bytes?: string
  /** @example "1" */
  Samples?: string
  /** @example "0" */
  InstRate?: string
  /** @example "0" */
  CurRate?: string
  /** @example "0" */
  AvgRate?: string
  /** @example "0" */
  PeakRate?: string
  /** @example "0" */
  BytesRem?: string
  /** @example "0" */
  TimeRem?: string
  /** @example 0 */
  Progress?: number
}

export interface Channel {
  /** @example 48 */
  ID?: number
  /** @example "1" */
  SendQueueCapacity?: string
  /** @example "0" */
  SendQueueSize?: string
  /** @example "5" */
  Priority?: string
  /** @example "0" */
  RecentlySent?: string
}

export interface ConnectionStatus {
  /** @example "168901057956119" */
  Duration?: string
  SendMonitor?: Monitor
  RecvMonitor?: Monitor
  Channels?: Channel[]
}

export interface Peer {
  node_info?: NodeInfo
  /** @example true */
  is_outbound?: boolean
  connection_status?: ConnectionStatus
  /** @example "95.179.155.35" */
  remote_ip?: string
}

export interface NetInfo {
  /** @example true */
  listening?: boolean
  listeners?: string[]
  /** @example "1" */
  n_peers?: string
  peers?: Peer[]
}

export interface BlockMeta {
  block_id?: BlockID
  /** @example 1000000 */
  block_size?: number
  header?: BlockHeader
  /** @example "54" */
  num_txs?: string
}

export interface Blockchain {
  /** @example "1276718" */
  last_height: string
  block_metas: BlockMeta[]
}

export interface Commit {
  /** @example 2 */
  type: number
  /** @example "1262085" */
  height: string
  /** @example 0 */
  round: number
  block_id: BlockID
  /** @example "2019-08-01T11:39:38.867269833Z" */
  timestamp: string
  /** @example "000001E443FD237E4B616E2FA69DF4EE3D49A94F" */
  validator_address: string
  /** @example 0 */
  validator_index: number
  /** @example "DBchvucTzAUEJnGYpNvMdqLhBAHG4Px8BsOBB3J3mAFCLGeuG7uJqy+nVngKzZdPhPi8RhmE/xcw/M9DOJjEDg==" */
  signature: string
}

export interface Block {
  header?: BlockHeader
  data?: string[]
  evidence?: Evidence[]
  last_commit?: {
    height?: number
    round?: number
    block_id?: BlockID
    signatures?: Commit[]
  }
}

export interface Evidence {
  type?: string
  height?: number
  time?: number
  total_voting_power?: number
  validator?: Validator
}

export interface BlockComplete {
  block_id?: BlockID
  block?: Block
}

export interface BlockResultsResponse {
  /** @example "12" */
  height: string
  txs_results?: {
    /** @example "0" */
    code?: string
    /** @example "" */
    data?: string
    /** @example "not enough gas" */
    log?: string
    /** @example "" */
    info?: string
    /** @example "100" */
    gas_wanted?: string
    /** @example "100" */
    gas_used?: string
    events?:
      | {
          /** @example "app" */
          type?: string
          attributes?: Event[]
        }[]
      | null
    /** @example "ibc" */
    codespace?: string
  }[]
  begin_block_events?:
    | {
        /** @example "app" */
        type?: string
        attributes?: Event[]
      }[]
    | null
  end_block_events?:
    | {
        /** @example "app" */
        type?: string
        attributes?: Event[]
      }[]
    | null
  validator_updates?:
    | {
        pub_key?: {
          /** @example "tendermint/PubKeyEd25519" */
          type: string
          /** @example "9tK9IT+FPdf2qm+5c2qaxi10sWP+3erWTKgftn2PaQM=" */
          value: string
        }
        /** @example "300" */
        power?: string
      }[]
    | null
  consensus_param_updates?: ConsensusParams
}

export interface CommitResponse {
  signed_header: {
    header: BlockHeader
    commit: {
      /** @example "1311801" */
      height: string
      /** @example 0 */
      round: number
      block_id: BlockID
      signatures: {
        /** @example 2 */
        block_id_flag?: number
        /** @example "000001E443FD237E4B616E2FA69DF4EE3D49A94F" */
        validator_address?: string
        /** @example "2019-04-22T17:01:58.376629719Z" */
        timestamp?: string
        /** @example "14jaTQXYRt8kbLKEhdHq7AXycrFImiLuZx50uOjs2+Zv+2i7RTG/jnObD07Jo2ubZ8xd7bNBJMqkgtkd0oQHAw==" */
        signature?: string
      }[]
    }
  }
  /** @example true */
  canonical: boolean
}

export interface ValidatorsResponse {
  /** @example "55" */
  block_height: string
  validators: ValidatorPriority[]
  /** @example "1" */
  count?: string
  /** @example "25" */
  total?: string
}

export interface GenesisResponse {
  genesis: {
    /** @example "2019-04-22T17:00:00Z" */
    genesis_time: string
    /** @example "cosmoshub-2" */
    chain_id: string
    /** @example "2" */
    initial_height: string
    consensus_params: ConsensusParams
    validators: {
      /** @example "B00A6323737F321EB0B8D59C6FD497A14B60938A" */
      address?: string
      pub_key?: {
        /** @example "tendermint/PubKeyEd25519" */
        type: string
        /** @example "cOQZvh/h9ZioSeUMZB/1Vy1Xo5x2sjrVjlE/qHnYifM=" */
        value: string
      }
      /** @example "9328525" */
      power?: string
      /** @example "Certus One" */
      name?: string
    }[]
    /** @example "" */
    app_hash: string
    app_state?: object
  }
}

export interface GenesisChunkedResponse {
  /** @example 0 */
  chunk: number
  /** @example 1 */
  total: number
  /** @example "Z2VuZXNpcwo=" */
  data: string
}

export interface DumpConsensusResponse {
  round_state: {
    /** @example "1311801" */
    height: string
    /** @example 0 */
    round: number
    /** @example 3 */
    step: number
    /** @example "2019-08-05T11:28:49.064658805Z" */
    start_time: string
    /** @example "2019-08-05T11:28:44.064658805Z" */
    commit_time: string
    validators: {
      validators: ValidatorPriority[]
      proposer: ValidatorPriority
    }
    /** @example -1 */
    locked_round: number
    /** @example "-1" */
    valid_round: string
    votes: {
      /** @example "0" */
      round?: string
      /** @example ["nil-Vote","Vote{19:46A3F8B8393B 1311801/00/1(Prevote) 000000000000 64CE682305CB @ 2019-08-05T11:28:47.374703444Z}"] */
      prevotes?: string[] | null
      /** @example "BA{100:___________________x________________________________________________________________________________} 209706/170220253 = 0.00" */
      prevotes_bit_array?: string
      /** @example ["nil-Vote"] */
      precommits?: string[] | null
      /** @example "BA{100:____________________________________________________________________________________________________} 0/170220253 = 0.00" */
      precommits_bit_array?: string
    }[]
    /** @example -1 */
    commit_round: number
    last_commit: {
      /** @example ["Vote{0:000001E443FD 1311800/00/2(Precommit) 3071ADB27D1A 77EE1B6B6847 @ 2019-08-05T11:28:43.810128139Z}"] */
      votes: string[]
      /** @example "BA{100:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx} 170220253/170220253 = 1.00" */
      votes_bit_array: string
      peer_maj_23s: object
    } | null
    last_validators: {
      validators: ValidatorPriority[]
      proposer: ValidatorPriority
    }
    /** @example false */
    triggered_timeout_precommit: boolean
  }
  peers: {
    /** @example "357f6a6c1d27414579a8185060aa8adf9815c43c@68.183.41.207:26656" */
    node_address?: string
    peer_state?: {
      round_state: {
        /** @example "1311801" */
        height: string
        /** @example "0" */
        round: string
        /** @example 3 */
        step: number
        /** @example "2019-08-05T11:28:49.21730864Z" */
        start_time: string
        /** @example false */
        proposal: boolean
        proposal_block_parts_header: {
          /** @example 0 */
          total: number
          /** @example "" */
          hash: string
        }
        /** @example -1 */
        proposal_pol_round: number | null
        /** @example "____________________________________________________________________________________________________" */
        proposal_pol: string | null
        /** @example "___________________x________________________________________________________________________________" */
        prevotes: string | null
        /** @example "____________________________________________________________________________________________________" */
        precommits: string | null
        /** @example 0 */
        last_commit_round: number | null
        /** @example "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" */
        last_commit: string | null
        /** @example -1 */
        catchup_commit_round: number | null
        /** @example "____________________________________________________________________________________________________" */
        catchup_commit: string | null
      }
      stats: {
        /** @example "1159558" */
        votes: string
        /** @example "4786" */
        block_parts: string
      }
    }
  }[]
}

export interface ConsensusStateResponse {
  round_state: {
    /** @example "1262197/0/8" */
    'height/round/step': string
    /** @example "2019-08-01T11:52:38.962730289Z" */
    start_time: string
    /** @example "634ADAF1F402663BEC2ABC340ECE8B4B45AA906FA603272ACC5F5EED3097E009" */
    proposal_block_hash: string
    /** @example "634ADAF1F402663BEC2ABC340ECE8B4B45AA906FA603272ACC5F5EED3097E009" */
    locked_block_hash: string
    /** @example "634ADAF1F402663BEC2ABC340ECE8B4B45AA906FA603272ACC5F5EED3097E009" */
    valid_block_hash: string
    height_vote_set: {
      /** @example 0 */
      round?: number
      /** @example ["Vote{0:000001E443FD 1262197/00/1(Prevote) 634ADAF1F402 7BB974E1BA40 @ 2019-08-01T11:52:35.513572509Z}","nil-Vote"] */
      prevotes?: string[]
      /** @example "BA{100:xxxxxxxxxxxxxxxxx_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx} 169753436/170151262 = 1.00" */
      prevotes_bit_array?: string
      /** @example ["Vote{5:18C78D135C9D 1262197/00/2(Precommit) 634ADAF1F402 8B5EFFFEABCD @ 2019-08-01T11:52:36.25600005Z}","nil-Vote"] */
      precommits?: string[]
      /** @example "BA{100:xxxxxx_xxxxx_xxxx_x_xxx_xx_xx_xx__x_x_x__xxxxxxxxxxxxxx_xxxx_xx_xxxxxx_xxxxxxxx_xxxx_xxx_x_xxxx__xxx} 118726247/170151262 = 0.70" */
      precommits_bit_array?: string
    }[]
    proposer: {
      /** @example "D540AB022088612AC74B287D076DBFBC4A377A2E" */
      address?: string
      /** @example 0 */
      index?: number
    }
  }
}

export interface ConsensusParamsResponse {
  /** @example "1" */
  block_height: string
  consensus_params: ConsensusParams
}

export interface NumUnconfirmedTransactionsResponse {
  /** @example "31" */
  n_txs: string
  /** @example "82" */
  total: string
  /** @example "19974" */
  total_bytes: string
}

export interface UnconfirmedTransactionsResponse {
  /** @example "82" */
  n_txs: string
  /** @example "82" */
  total: string
  /** @example "19974" */
  total_bytes: string
  /** @example ["gAPwYl3uCjCMTXENChSMnIkb5ZpYHBKIZqecFEV2tuZr7xIUA75/FmYq9WymsOBJ0XSJ8yV8zmQKMIxNcQ0KFIyciRvlmlgcEohmp5wURXa25mvvEhQbrvwbvlNiT+Yjr86G+YQNx7kRVgowjE1xDQoUjJyJG+WaWBwSiGannBRFdrbma+8SFK2m+1oxgILuQLO55n8mWfnbIzyPCjCMTXENChSMnIkb5ZpYHBKIZqecFEV2tuZr7xIUQNGfkmhTNMis4j+dyMDIWXdIPiYKMIxNcQ0KFIyciRvlmlgcEohmp5wURXa25mvvEhS8sL0D0wwgGCItQwVowak5YB38KRIUCg4KBXVhdG9tEgUxMDA1NBDoxRgaagom61rphyECn8x7emhhKdRCB2io7aS/6Cpuq5NbVqbODmqOT3jWw6kSQKUresk+d+Gw0BhjiggTsu8+1voW+VlDCQ1GRYnMaFOHXhyFv7BCLhFWxLxHSAYT8a5XqoMayosZf9mANKdXArA="] */
  txs: (string | null)[]
}

export interface TxSearchResponse {
  txs: {
    /** @example "D70952032620CC4E2737EB8AC379806359D8E0B17B0488F627997A0B043ABDED" */
    hash?: string
    /** @example "1000" */
    height?: string
    /** @example 0 */
    index?: number
    tx_result?: {
      /** @example "[{"msg_index":"0","success":true,"log":""}]" */
      log: string
      /** @example "200000" */
      gas_wanted: string
      /** @example "28596" */
      gas_used: string
      tags: Event
    }
    /** @example "5wHwYl3uCkaoo2GaChQmSIu8hxpJxLcCuIi8fiHN4TMwrRIU/Af1cEG7Rcs/6LjTl7YjRSymJfYaFAoFdWF0b20SCzE0OTk5OTk1MDAwEhMKDQoFdWF0b20SBDUwMDAQwJoMGmoKJuta6YchAwswBShaB1wkZBctLIhYqBC3JrAI28XGzxP+rVEticGEEkAc+khTkKL9CDE47aDvjEHvUNt+izJfT4KVF2v2JkC+bmlH9K08q3PqHeMI9Z5up+XMusnTqlP985KF+SI5J3ZOIhhNYWRlIGJ5IENpcmNsZSB3aXRoIGxvdmU=" */
    tx?: string
    proof?: {
      /** @example "72FE6BF6D4109105357AECE0A82E99D0F6288854D16D8767C5E72C57F876A14D" */
      RootHash: string
      /** @example "5wHwYl3uCkaoo2GaChQmSIu8hxpJxLcCuIi8fiHN4TMwrRIU/Af1cEG7Rcs/6LjTl7YjRSymJfYaFAoFdWF0b20SCzE0OTk5OTk1MDAwEhMKDQoFdWF0b20SBDUwMDAQwJoMGmoKJuta6YchAwswBShaB1wkZBctLIhYqBC3JrAI28XGzxP+rVEticGEEkAc+khTkKL9CDE47aDvjEHvUNt+izJfT4KVF2v2JkC+bmlH9K08q3PqHeMI9Z5up+XMusnTqlP985KF+SI5J3ZOIhhNYWRlIGJ5IENpcmNsZSB3aXRoIGxvdmU=" */
      Data: string
      Proof: {
        /** @example "2" */
        total: string
        /** @example "0" */
        index: string
        /** @example "eoJxKCzF3m72Xiwb/Q43vJ37/2Sx8sfNS9JKJohlsYI=" */
        leaf_hash: string
        /** @example ["eWb+HG/eMmukrQj4vNGyFYb3nKQncAWacq4HF5eFzDY="] */
        aunts: string[]
      }
    }
  }[]
  /** @example "2" */
  total_count: string
}

export interface TxResponse {
  /** @example "D70952032620CC4E2737EB8AC379806359D8E0B17B0488F627997A0B043ABDED" */
  hash: string
  /** @example "1000" */
  height: string
  /** @example 0 */
  index: number
  tx_result: {
    /** @example "[{"msg_index":"0","success":true,"log":""}]" */
    log: string
    /** @example "200000" */
    gas_wanted: string
    /** @example "28596" */
    gas_used: string
    tags: Event[]
  }
  /** @example "5wHwYl3uCkaoo2GaChQmSIu8hxpJxLcCuIi8fiHN4TMwrRIU/Af1cEG7Rcs/6LjTl7YjRSymJfYaFAoFdWF0b20SCzE0OTk5OTk1MDAwEhMKDQoFdWF0b20SBDUwMDAQwJoMGmoKJuta6YchAwswBShaB1wkZBctLIhYqBC3JrAI28XGzxP+rVEticGEEkAc+khTkKL9CDE47aDvjEHvUNt+izJfT4KVF2v2JkC+bmlH9K08q3PqHeMI9Z5up+XMusnTqlP985KF+SI5J3ZOIhhNYWRlIGJ5IENpcmNsZSB3aXRoIGxvdmU=" */
  tx: string
}

export interface ABCIInfoResponse {
  response: {
    /** @example "{"size":0}" */
    data: string
    /** @example "0.16.1" */
    version: string
    /** @example "1314126" */
    app_version: string
  }
}

export interface ABCIQueryResponse {
  response: {
    /** @example "exists" */
    log: string
    /** @example "0" */
    height: string
    /** @example "010114FED0DAD959F36091AD761C922ABA3CBF1D8349990101020103011406AA2262E2F448242DF2C2607C3CDC705313EE3B0001149D16177BC71E445476174622EA559715C293740C" */
    proof: string
    /** @example "61626364" */
    value: string
    /** @example "61626364" */
    key: string
    /** @example "-1" */
    index: string
    /** @example "0" */
    code: string
  }
}

export interface BroadcastEvidenceResponse {
  /** @example "" */
  result?: string
}

export interface BroadcastTxCommitResponse {
  /** @example "26682" */
  height: string
  /** @example "75CA0F856A4DA078FC4911580360E70CEFB2EBEE" */
  hash: string
  deliver_tx: {
    /** @example "" */
    log: string
    /** @example "" */
    data: string
    /** @example "0" */
    code: string
  }
  check_tx: {
    /** @example "" */
    log: string
    /** @example "" */
    data: string
    /** @example "0" */
    code: string
  }
}

export interface CheckTxResponse {
  /** @example "0" */
  code: string
  /** @example "" */
  data: string
  /** @example "" */
  log: string
  /** @example "" */
  info?: string
  /** @example "1" */
  gas_wanted?: string
  /** @example "0" */
  gas_used?: string
  events?:
    | {
        /** @example "app" */
        type?: string
        attributes?: Event[]
      }[]
    | null
  /** @example "bank" */
  codespace?: string
}

export interface BroadcastTxResponse {
  /** @example "0" */
  code: string
  /** @example "" */
  data: string
  /** @example "" */
  log: string
  /** @example "ibc" */
  codespace?: string
  /** @example "0D33F2F03A5234F38706E43004489E061AC40A2E" */
  hash: string
}

export interface DialResp {
  /** @example "Dialing seeds in progress. See /net_info for details" */
  Log?: string
}

export interface BlockSearchResponse {
  blocks: BlockComplete[]
  /** @example 2 */
  total_count: number
}

export interface ValidatorPriority {
  /** @example "000001E443FD237E4B616E2FA69DF4EE3D49A94F" */
  address?: string
  pub_key?: {
    /** @example "tendermint/PubKeyEd25519" */
    type: string
    /** @example "9tK9IT+FPdf2qm+5c2qaxi10sWP+3erWTKgftn2PaQM=" */
    value: string
  }
  /** @example "239727" */
  voting_power?: string
  /** @example "-11896414" */
  proposer_priority?: string
}

export interface Validator {
  pub_key?: PubKey
  voting_power?: number
  address?: string
}

export type ConsensusParams = {
  block: {
    /** @example "22020096" */
    max_bytes: string
    /** @example "1000" */
    max_gas: string
    /** @example "1000" */
    time_iota_ms: string
  }
  evidence: {
    /** @example "100000" */
    max_age: string
  }
  validator: {
    /** @example ["ed25519"] */
    pub_key_types: string[]
  }
} | null

export interface Event {
  /** @example "YWN0aW9u" */
  key?: string
  /** @example "c2VuZA==" */
  value?: string
  /** @example false */
  index?: boolean
}

export interface BlockHeader {
  version: {
    /** @example "10" */
    block: string
    /** @example "0" */
    app: string
  }
  /** @example "cosmoshub-2" */
  chain_id: string
  /** @example "12" */
  height: string
  /** @example "2019-04-22T17:01:51.701356223Z" */
  time: string
  last_block_id: BlockID
  /** @example "21B9BC845AD2CB2C4193CDD17BFC506F1EBE5A7402E84AD96E64171287A34812" */
  last_commit_hash: string
  /** @example "970886F99E77ED0D60DA8FCE0447C2676E59F2F77302B0C4AA10E1D02F18EF73" */
  data_hash: string
  /** @example "D658BFD100CA8025CFD3BECFE86194322731D387286FBD26E059115FD5F2BCA0" */
  validators_hash: string
  /** @example "D658BFD100CA8025CFD3BECFE86194322731D387286FBD26E059115FD5F2BCA0" */
  next_validators_hash: string
  /** @example "0F2908883A105C793B74495EB7D6DF2EEA479ED7FC9349206A65CB0F9987A0B8" */
  consensus_hash: string
  /** @example "223BF64D4A01074DC523A80E76B9BBC786C791FB0A1893AC5B14866356FCFD6C" */
  app_hash: string
  /** @example "" */
  last_results_hash: string
  /** @example "" */
  evidence_hash: string
  /** @example "D540AB022088612AC74B287D076DBFBC4A377A2E" */
  proposer_address: string
}

export interface BlockID {
  /** @example "112BC173FD838FB68EB43476816CD7B4C6661B6884A9E357B417EE957E1CF8F7" */
  hash: string
  parts: {
    /** @example 1 */
    total: number
    /** @example "38D4B26B5B725C4F13571EFE022C030390E4C33C8CF6F88EDD142EA769642DBD" */
    hash: string
  }
}

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  HeadersDefaults,
  ResponseType,
} from 'axios'

type QueryParamsType = Record<string | number, any>

interface FullRequestParams
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

type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>

interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void
  secure?: boolean
  format?: ResponseType
}

enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

class HttpClient<SecurityDataType = unknown> {
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
      baseURL: axiosConfig.baseURL || 'https://tendermint.bd.evmos.org:26657',
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
      .then((response) => Promise.resolve(response.data.result))
      .catch((data) => {
        // console.log('data ', JSON.stringify(data))
        let unknowError: ErrorResponseRPC = {
          code: -1,
          message: 'unknow message',
          data: '',
        }

        if (data?.response?.data?.error) {
          return Promise.reject(data?.response?.data?.error)
        } else if (data?.message) {
          unknowError.message = data.message
          if (data?.code) {
            unknowError.data = data.code
          }
        }
        return Promise.reject(unknowError)
      })
  }
}

/**
 * @title CometBFT RPC
 * @version v0.37
 * @license Apache 2.0 (https://github.com/cometbft/cometbft/blob/v0.37.x/LICENSE)
 * @baseUrl https://rpc.cosmos.directory/cosmoshub
 * @contact CometBFT (https://cometbft.com/)
 *
 * CometBFT supports the following RPC protocols:
 *
 * * URI over HTTP
 * * JSONRPC over HTTP
 * * JSONRPC over websockets
 *
 * ## Configuration
 *
 * RPC can be configured by tuning parameters under `[rpc]` table in the
 * `$CMTHOME/config/config.toml` file or by using the `--rpc.X` command-line
 * flags.
 *
 * The default RPC listen address is `tcp://127.0.0.1:26657`.
 * To set another address, set the `laddr` config parameter to desired value.
 * CORS (Cross-Origin Resource Sharing) can be enabled by setting
 * `cors_allowed_origins`, `cors_allowed_methods`, `cors_allowed_headers`
 * config parameters.
 *
 * If testing using a local RPC node, under the `[rpc]`
 * section change the `cors_allowed_origins` property, please add the URL of
 * the site where this OpenAPI document is running, for example:
 *
 *   `cors_allowed_origins = ["http://localhost:8088"]`
 *
 * or if testing from the official documentation site:
 *
 *   `cors_allowed_origins = ["https://docs.cometbft.com"]`
 *
 * ## Arguments
 *
 * Arguments which expect strings or byte arrays may be passed as quoted
 * strings, like `"abc"` or as `0x`-prefixed strings, like `0x616263`.
 *
 * ## URI/HTTP
 *
 * A REST like interface.
 *
 *     curl localhost:26657/block?height=5
 *
 * ## JSONRPC/HTTP
 *
 * JSONRPC requests can be POST'd to the root RPC endpoint via HTTP.
 *
 *     curl --header "Content-Type: application/json" --request POST --data '{"method": "block", "params": ["5"], "id": 1}' localhost:26657
 *
 * ## JSONRPC/websockets
 *
 * JSONRPC requests can be also made via websocket.
 * The websocket endpoint is at `/websocket`, e.g. `localhost:26657/websocket`.
 * Asynchronous RPC functions like event `subscribe` and `unsubscribe` are
 * only available via websockets.
 *
 * For example using the [websocat](https://github.com/vi/websocat) tool, you can subscribe for 'NewBlock` events
 * with the following command:
 *
 *     echo '{ "jsonrpc": "2.0","method": "subscribe","id": 0,"params": {"query": "tm.event='"'NewBlock'"'"} }' | websocat -n -t ws://127.0.0.1:26657/websocket
 */
export class Cometbft<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description If you want to be sure that the transaction is included in a block, you can subscribe for the result using JSONRPC via a websocket. See https://docs.cometbft.com/v0.37/core/subscription.html If you haven't received anything after a couple of blocks, resend it. If the same happens again, send it to some other node. A few reasons why it could happen: 1. malicious node can drop or pretend it had committed your tx 2. malicious proposer (not necessary the one you're communicating with) can drop transactions, which might become valid in the future (https://github.com/tendermint/tendermint/issues/3322) Please refer to https://docs.cometbft.com/v0.37/core/using-cometbft.html#formatting for formatting/encoding rules.
   *
   * @tags Tx
   * @name BroadcastTxSync
   * @summary Returns with the response from CheckTx. Does not wait for DeliverTx result.
   * @request GET:/tendermint/broadcast_tx_sync
   */
  broadcastTxSync = (
    query: {
      /**
       * The transaction
       * @example "456"
       */
      tx: string
    },
    params: RequestParams = {},
  ) =>
    this.request<BroadcastTxResponse, ErrorResponseRPC>({
      path: `/broadcast_tx_sync`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })

  /**
   * @description If you want to be sure that the transaction is included in a block, you can subscribe for the result using JSONRPC via a websocket. See https://docs.cometbft.com/v0.37/core/subscription.html If you haven't received anything after a couple of blocks, resend it. If the same happens again, send it to some other node. A few reasons why it could happen: 1. malicious node can drop or pretend it had committed your tx 2. malicious proposer (not necessary the one you're communicating with) can drop transactions, which might become valid in the future (https://github.com/tendermint/tendermint/issues/3322) 3. node can be offline Please refer to https://docs.cometbft.com/v0.37/core/using-cometbft.html#formatting for formatting/encoding rules.
   *
   * @tags Tx
   * @name BroadcastTxAsync
   * @summary Returns right away, with no response. Does not wait for CheckTx nor DeliverTx results.
   * @request GET:/tendermint/broadcast_tx_async
   */
  broadcastTxAsync = (
    query: {
      /**
       * The transaction
       * @example "123"
       */
      tx: string
    },
    params: RequestParams = {},
  ) =>
    this.request<BroadcastTxResponse, ErrorResponseRPC>({
      path: `/broadcast_tx_async`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })

  /**
   * @description IMPORTANT: use only for testing and development. In production, use BroadcastTxSync or BroadcastTxAsync. You can subscribe for the transaction result using JSONRPC via a websocket. See https://docs.cometbft.com/v0.37/core/subscription.html CONTRACT: only returns error if mempool.CheckTx() errs or if we timeout waiting for tx to commit. If CheckTx or DeliverTx fail, no error will be returned, but the returned result will contain a non-OK ABCI code. Please refer to https://docs.cometbft.com/v0.37/core/using-cometbft.html#formatting for formatting/encoding rules.
   *
   * @tags Tx
   * @name BroadcastTxCommit
   * @summary Returns with the responses from CheckTx and DeliverTx.
   * @request GET:/tendermint/broadcast_tx_commit
   */
  broadcastTxCommit = (
    query: {
      /**
       * The transaction
       * @example "785"
       */
      tx: string
    },
    params: RequestParams = {},
  ) =>
    this.request<BroadcastTxCommitResponse, ErrorResponseRPC>({
      path: `/broadcast_tx_commit`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })

  /**
   * @description The transaction won't be added to the mempool. Please refer to https://docs.cometbft.com/v0.37/core/using-cometbft.html#formatting for formatting/encoding rules. Upon success, the `Cache-Control` header will be set with the default maximum age.
   *
   * @tags Tx
   * @name CheckTx
   * @summary Checks the transaction without executing it.
   * @request GET:/tendermint/check_tx
   */
  checkTx = (
    query: {
      /**
       * The transaction
       * @example "785"
       */
      tx: string
    },
    params: RequestParams = {},
  ) =>
    this.request<CheckTxResponse, ErrorResponseRPC>({
      path: `/check_tx`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })

  /**
   * @description Get node health. Returns empty result (200 OK) on success, no response - in case of an error.
   *
   * @tags Info
   * @name Health
   * @summary Node heartbeat
   * @request GET:/tendermint/health
   */
  health = (params: RequestParams = {}) =>
    this.request<EmptyDataResponse, ErrorResponseRPC>({
      path: `/health`,
      method: 'GET',
      format: 'json',
      ...params,
    })

  /**
   * @description Get CometBFT status including node info, pubkey, latest block hash, app hash, block height and time.
   *
   * @tags Info
   * @name Status
   * @summary Node Status
   * @request GET:/tendermint/status
   */
  status = (params: RequestParams = {}) =>
    this.request<Status, ErrorResponseRPC>({
      path: `/status`,
      method: 'GET',
      format: 'json',
      ...params,
    })

  /**
   * @description Get network info.
   *
   * @tags Info
   * @name NetInfo
   * @summary Network information
   * @request GET:/tendermint/net_info
   */
  netInfo = (params: RequestParams = {}) =>
    this.request<NetInfo, ErrorResponseRPC>({
      path: `/net_info`,
      method: 'GET',
      format: 'json',
      ...params,
    })

  /**
   * @description Dial a peer, this route in under unsafe, and has to manually enabled to use **Example:** curl 'localhost:26657/dial_seeds?seeds=\["f9baeaa15fedf5e1ef7448dd60f46c01f1a9e9c4@1.2.3.4:26656","0491d373a8e0fcf1023aaf18c51d6a1d0d4f31bd@5.6.7.8:26656"\]'
   *
   * @tags Unsafe
   * @name DialSeeds
   * @summary Dial Seeds (Unsafe)
   * @request GET:/tendermint/dial_seeds
   */
  dialSeeds = (
    query?: {
      /** list of seed nodes to dial */
      peers?: string[]
    },
    params: RequestParams = {},
  ) =>
    this.request<DialResp, ErrorResponseRPC>({
      path: `/dial_seeds`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })

  /**
   * @description Set a persistent peer, this route in under unsafe, and has to manually enabled to use. **Example:** curl 'localhost:26657/dial_peers?peers=\["f9baeaa15fedf5e1ef7448dd60f46c01f1a9e9c4@1.2.3.4:26656","0491d373a8e0fcf1023aaf18c51d6a1d0d4f31bd@5.6.7.8:26656"\]&persistent=false'
   *
   * @tags Unsafe
   * @name DialPeers
   * @summary Add Peers/Persistent Peers (unsafe)
   * @request GET:/tendermint/dial_peers
   */
  dialPeers = (
    query?: {
      /**
       * Have the peers you are dialing be persistent
       * @example true
       */
      persistent?: boolean
      /**
       * Have the peers you are dialing be unconditional
       * @example true
       */
      unconditional?: boolean
      /**
       * Have the peers you are dialing be private
       * @example true
       */
      private?: boolean
      /** array of peers to dial */
      peers?: string[]
    },
    params: RequestParams = {},
  ) =>
    this.request<DialResp, ErrorResponseRPC>({
      path: `/dial_peers`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })

  /**
   * @description Get block headers for minHeight <= height <= maxHeight. At most 20 items will be returned. Upon success, the `Cache-Control` header will be set with the default maximum age.
   *
   * @tags Info
   * @name Blockchain
   * @summary Get block headers (max: 20) for minHeight <= height <= maxHeight.
   * @request GET:/tendermint/blockchain
   */
  blockchain = (
    query?: {
      /**
       * Minimum block height to return
       * @example 1
       */
      minHeight?: number
      /**
       * Maximum block height to return
       * @example 2
       */
      maxHeight?: number
    },
    params: RequestParams = {},
  ) =>
    this.request<Blockchain, ErrorResponseRPC>({
      path: `/blockchain`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })

  /**
   * @description Get Header. If the `height` field is set to a non-default value, upon success, the `Cache-Control` header will be set with the default maximum age.
   *
   * @tags Info
   * @name Header
   * @summary Get header at a specified height
   * @request GET:/tendermint/header
   */
  header = (
    query?: {
      /**
       * height to return. If no height is provided, it will fetch the latest header.
       * @default 0
       * @example 1
       */
      height?: number
    },
    params: RequestParams = {},
  ) =>
    this.request<BlockHeader, ErrorResponseRPC>({
      path: `/header`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })

  /**
   * @description Get Header By Hash. Upon success, the `Cache-Control` header will be set with the default maximum age.
   *
   * @tags Info
   * @name HeaderByHash
   * @summary Get header by hash
   * @request GET:/tendermint/header_by_hash
   */
  headerByHash = (
    query: {
      /**
       * header hash
       * @example "0xD70952032620CC4E2737EB8AC379806359D8E0B17B0488F627997A0B043ABDED"
       */
      hash: string
    },
    params: RequestParams = {},
  ) =>
    this.request<BlockHeader, ErrorResponseRPC>({
      path: `/header_by_hash`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })

  /**
   * @description Get Block. If the `height` field is set to a non-default value, upon success, the `Cache-Control` header will be set with the default maximum age.
   *
   * @tags Info
   * @name Block
   * @summary Get block at a specified height
   * @request GET:/tendermint/block
   */
  block = (
    query?: {
      /**
       * height to return. If no height is provided, it will fetch the latest block.
       * @default 0
       * @example 1
       */
      height?: number
    },
    params: RequestParams = {},
  ) =>
    this.request<BlockComplete, ErrorResponseRPC>({
      path: `/block`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })

  /**
   * @description Get Block By Hash. Upon success, the `Cache-Control` header will be set with the default maximum age.
   *
   * @tags Info
   * @name BlockByHash
   * @summary Get block by hash
   * @request GET:/tendermint/block_by_hash
   */
  blockByHash = (
    query: {
      /**
       * block hash
       * @example "0xD70952032620CC4E2737EB8AC379806359D8E0B17B0488F627997A0B043ABDED"
       */
      hash: string
    },
    params: RequestParams = {},
  ) =>
    this.request<BlockComplete, ErrorResponseRPC>({
      path: `/block_by_hash`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })

  /**
   * @description Get block_results. If the `height` field is set to a non-default value, upon success, the `Cache-Control` header will be set with the default maximum age.
   *
   * @tags Info
   * @name BlockResults
   * @summary Get block results at a specified height
   * @request GET:/tendermint/block_results
   */
  blockResults = (
    query?: {
      /**
       * height to return. If no height is provided, it will fetch information regarding the latest block.
       * @default 0
       * @example 1
       */
      height?: number
    },
    params: RequestParams = {},
  ) =>
    this.request<BlockResultsResponse, ErrorResponseRPC>({
      path: `/block_results`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })

  /**
   * @description Get Commit. If the `height` field is set to a non-default value, upon success, the `Cache-Control` header will be set with the default maximum age.
   *
   * @tags Info
   * @name Commit
   * @summary Get commit results at a specified height
   * @request GET:/tendermint/commit
   */
  commit = (
    query?: {
      /**
       * height to return. If no height is provided, it will fetch commit informations regarding the latest block.
       * @default 0
       * @example 1
       */
      height?: number
    },
    params: RequestParams = {},
  ) =>
    this.request<CommitResponse, ErrorResponseRPC>({
      path: `/commit`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })

  /**
   * @description Get Validators. Validators are sorted first by voting power (descending), then by address (ascending). If the `height` field is set to a non-default value, upon success, the `Cache-Control` header will be set with the default maximum age.
   *
   * @tags Info
   * @name Validators
   * @summary Get validator set at a specified height
   * @request GET:/tendermint/validators
   */
  validators = (
    query?: {
      /**
       * height to return. If no height is provided, it will fetch validator set which corresponds to the latest block.
       * @default 0
       * @example 1
       */
      height?: number
      /**
       * Page number (1-based)
       * @default 1
       * @example 1
       */
      page?: number
      /**
       * Number of entries per page (max: 100)
       * @default 30
       * @example 30
       */
      per_page?: number
    },
    params: RequestParams = {},
  ) =>
    this.request<ValidatorsResponse, ErrorResponseRPC>({
      path: `/validators`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })

  /**
   * @description Get genesis. Upon success, the `Cache-Control` header will be set with the default maximum age.
   *
   * @tags Info
   * @name Genesis
   * @summary Get Genesis
   * @request GET:/tendermint/genesis
   */
  genesis = (params: RequestParams = {}) =>
    this.request<GenesisResponse, ErrorResponseRPC>({
      path: `/genesis`,
      method: 'GET',
      format: 'json',
      ...params,
    })

  /**
   * @description Get genesis document in multiple chunks to make it easier to iterate through larger genesis structures. Each chunk is produced by converting the genesis document to JSON and then splitting the resulting payload into 16MB blocks, and then Base64-encoding each block. Upon success, the `Cache-Control` header will be set with the default maximum age.
   *
   * @tags Info
   * @name GenesisChunked
   * @summary Get Genesis in multiple chunks
   * @request GET:/tendermint/genesis_chunked
   */
  genesisChunked = (
    query?: {
      /**
       * Sequence number of the chunk to download.
       * @default 0
       * @example 1
       */
      chunk?: number
    },
    params: RequestParams = {},
  ) =>
    this.request<GenesisChunkedResponse, ErrorResponseRPC>({
      path: `/genesis_chunked`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })

  /**
   * @description Get consensus state. Not safe to call from inside the ABCI application during a block execution.
   *
   * @tags Info
   * @name DumpConsensusState
   * @summary Get consensus state
   * @request GET:/tendermint/dump_consensus_state
   */
  dumpConsensusState = (params: RequestParams = {}) =>
    this.request<DumpConsensusResponse, ErrorResponseRPC>({
      path: `/dump_consensus_state`,
      method: 'GET',
      format: 'json',
      ...params,
    })

  /**
   * @description Get consensus state. Not safe to call from inside the ABCI application during a block execution.
   *
   * @tags Info
   * @name ConsensusState
   * @summary Get consensus state
   * @request GET:/tendermint/consensus_state
   */
  consensusState = (params: RequestParams = {}) =>
    this.request<ConsensusStateResponse, ErrorResponseRPC>({
      path: `/consensus_state`,
      method: 'GET',
      format: 'json',
      ...params,
    })

  /**
   * @description Get consensus parameters. If the `height` field is set to a non-default value, upon success, the `Cache-Control` header will be set with the default maximum age.
   *
   * @tags Info
   * @name ConsensusParams
   * @summary Get consensus parameters
   * @request GET:/tendermint/consensus_params
   */
  consensusParams = (
    query?: {
      /**
       * height to return. If no height is provided, it will fetch commit informations regarding the latest block.
       * @default 0
       * @example 1
       */
      height?: number
    },
    params: RequestParams = {},
  ) =>
    this.request<ConsensusParamsResponse, ErrorResponseRPC>({
      path: `/consensus_params`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })

  /**
   * @description Get list of unconfirmed transactions
   *
   * @tags Info
   * @name UnconfirmedTxs
   * @summary Get the list of unconfirmed transactions
   * @request GET:/tendermint/unconfirmed_txs
   */
  unconfirmedTxs = (
    query?: {
      /**
       * Maximum number of unconfirmed transactions to return (max 100)
       * @default 30
       * @example 1
       */
      limit?: number
    },
    params: RequestParams = {},
  ) =>
    this.request<UnconfirmedTransactionsResponse, ErrorResponseRPC>({
      path: `/unconfirmed_txs`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })

  /**
   * @description Get data about unconfirmed transactions
   *
   * @tags Info
   * @name NumUnconfirmedTxs
   * @summary Get data about unconfirmed transactions
   * @request GET:/tendermint/num_unconfirmed_txs
   */
  numUnconfirmedTxs = (params: RequestParams = {}) =>
    this.request<NumUnconfirmedTransactionsResponse, ErrorResponseRPC>({
      path: `/num_unconfirmed_txs`,
      method: 'GET',
      format: 'json',
      ...params,
    })

  /**
   * @description Search for transactions w/ their results. See /subscribe for the query syntax.
   *
   * @tags Info
   * @name TxSearch
   * @summary Search for transactions
   * @request GET:/tendermint/tx_search
   */
  txSearch = (
    query: {
      /**
       * Query
       * @example ""tx.height=1000""
       */
      query: string
      /**
       * Include proofs of the transactions inclusion in the block
       * @default false
       * @example true
       */
      prove?: boolean
      /**
       * Page number (1-based)
       * @default 1
       * @example 1
       */
      page?: number
      /**
       * Number of entries per page (max: 100)
       * @default 30
       * @example 30
       */
      per_page?: number
      /**
       * Order in which transactions are sorted ("asc" or "desc"), by height & index. If empty, default sorting will be still applied.
       * @default "asc"
       * @example "asc"
       */
      order_by?: string
    },
    params: RequestParams = {},
  ) =>
    this.request<TxSearchResponse, ErrorResponseRPC>({
      path: `/tx_search`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })

  /**
   * @description Search for blocks by BeginBlock and EndBlock events. See /subscribe for the query syntax.
   *
   * @tags Info
   * @name BlockSearch
   * @summary Search for blocks by BeginBlock and EndBlock events
   * @request GET:/tendermint/block_search
   */
  blockSearch = (
    query: {
      /**
       * Query
       * @example ""block.height > 1000 AND valset.changed > 0""
       */
      query: string
      /**
       * Page number (1-based)
       * @default 1
       * @example 1
       */
      page?: number
      /**
       * Number of entries per page (max: 100)
       * @default 30
       * @example 30
       */
      per_page?: number
      /**
       * Order in which blocks are sorted ("asc" or "desc"), by height. If empty, default sorting will be still applied.
       * @default "desc"
       * @example "asc"
       */
      order_by?: string
    },
    params: RequestParams = {},
  ) =>
    this.request<BlockSearchResponse, ErrorResponseRPC>({
      path: `/block_search`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })

  /**
   * @description Get a transaction Upon success, the `Cache-Control` header will be set with the default maximum age.
   *
   * @tags Info
   * @name Tx
   * @summary Get transactions by hash
   * @request GET:/tendermint/tx
   */
  tx = (
    query: {
      /**
       * hash of transaction to retrieve
       * @example "0xD70952032620CC4E2737EB8AC379806359D8E0B17B0488F627997A0B043ABDED"
       */
      hash: string
      /**
       * Include proofs of the transaction's inclusion in the block
       * @default false
       * @example true
       */
      prove?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.request<TxResponse, ErrorResponseRPC>({
      path: `/tx`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })

  /**
   * @description Get info about the application. Upon success, the `Cache-Control` header will be set with the default maximum age.
   *
   * @tags ABCI
   * @name AbciInfo
   * @summary Get info about the application.
   * @request GET:/tendermint/abci_info
   */
  abciInfo = (params: RequestParams = {}) =>
    this.request<ABCIInfoResponse, ErrorResponseRPC>({
      path: `/abci_info`,
      method: 'GET',
      format: 'json',
      ...params,
    })

  /**
   * @description Query the application for some information.
   *
   * @tags ABCI
   * @name AbciQuery
   * @summary Query the application for some information.
   * @request GET:/tendermint/abci_query
   */
  abciQuery = (
    query: {
      /**
       * Path to the data ("/a/b/c")
       * @example ""/a/b/c""
       */
      path: string
      /**
       * Data
       * @example "IHAVENOIDEA"
       */
      data: string
      /**
       * Height (0 means latest)
       * @default 0
       * @example 1
       */
      height?: number
      /**
       * Include proofs of the transactions inclusion in the block
       * @default false
       * @example true
       */
      prove?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.request<ABCIQueryResponse, ErrorResponseRPC>({
      path: `/abci_query`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })

  /**
   * @description Broadcast evidence of the misbehavior.
   *
   * @tags Info
   * @name BroadcastEvidence
   * @summary Broadcast evidence of the misbehavior.
   * @request GET:/tendermint/broadcast_evidence
   */
  broadcastEvidence = (
    query: {
      /**
       * JSON evidence
       * @example "JSON_EVIDENCE_encoded"
       */
      evidence: string
    },
    params: RequestParams = {},
  ) =>
    this.request<BroadcastEvidenceResponse, ErrorResponseRPC>({
      path: `/broadcast_evidence`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    })
}
