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

import { HttpClient, RequestParams } from './http-client'

export class Ibc<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http
  }

  /**
   * No description
   *
   * @tags Query
   * @name DenomHash
   * @summary DenomHash queries a denomination hash information.
   * @request GET:/ibc/apps/transfer/v1/denom_hashes/{trace}
   */
  denomHash = (trace: string, params: RequestParams = {}) =>
    this.http.request<
      { hash?: string },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/apps/transfer/v1/denom_hashes/${trace}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name DenomTraces
   * @summary DenomTraces queries all denomination traces.
   * @request GET:/ibc/apps/transfer/v1/denom_traces
   */
  denomTraces = (
    query?: {
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        denom_traces?: { path?: string; base_denom?: string }[]
        pagination?: { next_key?: string; total?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/apps/transfer/v1/denom_traces`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name DenomTrace
   * @summary DenomTrace queries a denomination trace information.
   * @request GET:/ibc/apps/transfer/v1/denom_traces/{hash}
   */
  denomTrace = (hash: string, params: RequestParams = {}) =>
    this.http.request<
      { denom_trace?: { path?: string; base_denom?: string } },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/apps/transfer/v1/denom_traces/${hash}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name TransferParams
   * @summary Params queries all parameters of the ibc-transfer module.
   * @request GET:/ibc/apps/transfer/v1/params
   */
  transferParams = (params: RequestParams = {}) =>
    this.http.request<
      { params?: { send_enabled?: boolean; receive_enabled?: boolean } },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/apps/transfer/v1/params`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name ClientParams
   * @summary ClientParams queries all parameters of the ibc client.
   * @request GET:/ibc/client/v1/params
   */
  clientParams = (params: RequestParams = {}) =>
    this.http.request<
      { params?: { allowed_clients?: string[] } },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/client/v1/params`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name ClientStates
   * @summary ClientStates queries all the IBC light clients of a chain.
   * @request GET:/ibc/core/client/v1/client_states
   */
  clientStates = (
    query?: {
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        client_states?: {
          client_id?: string
          client_state?: { type_url?: string; value?: string }
        }[]
        pagination?: { next_key?: string; total?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/core/client/v1/client_states`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name ClientState
   * @summary ClientState queries an IBC light client.
   * @request GET:/ibc/core/client/v1/client_states/{client_id}
   */
  clientState = (clientId: string, params: RequestParams = {}) =>
    this.http.request<
      {
        client_state?: { type_url?: string; value?: string }
        proof?: string
        proof_height?: { revision_number?: string; revision_height?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/core/client/v1/client_states/${clientId}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name ClientStatus
   * @summary Status queries the status of an IBC client.
   * @request GET:/ibc/core/client/v1/client_status/{client_id}
   */
  clientStatus = (clientId: string, params: RequestParams = {}) =>
    this.http.request<
      { status?: string },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/core/client/v1/client_status/${clientId}`,
      method: 'GET',
      ...params,
    }) /**
 * No description
 * 
 * @tags Query
 * @name ConsensusStates
 * @summary ConsensusStates queries all the consensus state associated with a given
client.
 * @request GET:/ibc/core/client/v1/consensus_states/{client_id}
 */
  consensusStates = (
    clientId: string,
    query?: {
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        consensus_states?: {
          height?: { revision_number?: string; revision_height?: string }
          consensus_state?: { type_url?: string; value?: string }
        }[]
        pagination?: { next_key?: string; total?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/core/client/v1/consensus_states/${clientId}`,
      method: 'GET',
      query: query,
      ...params,
    }) /**
 * No description
 * 
 * @tags Query
 * @name ConsensusState
 * @summary ConsensusState queries a consensus state associated with a client state at
a given height.
 * @request GET:/ibc/core/client/v1/consensus_states/{client_id}/revision/{revision_number}/height/{revision_height}
 */
  consensusState = (
    clientId: string,
    revisionNumber: string,
    revisionHeight: string,
    query?: { latest_height?: boolean },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        consensus_state?: { type_url?: string; value?: string }
        proof?: string
        proof_height?: { revision_number?: string; revision_height?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/core/client/v1/consensus_states/${clientId}/revision/${revisionNumber}/height/${revisionHeight}`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name UpgradedClientState
   * @summary UpgradedClientState queries an Upgraded IBC light client.
   * @request GET:/ibc/core/client/v1/upgraded_client_states
   */
  upgradedClientState = (params: RequestParams = {}) =>
    this.http.request<
      { upgraded_client_state?: { type_url?: string; value?: string } },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/core/client/v1/upgraded_client_states`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name UpgradedConsensusState
   * @summary UpgradedConsensusState queries an Upgraded IBC consensus state.
   * @request GET:/ibc/core/client/v1/upgraded_consensus_states
   */
  upgradedConsensusState = (params: RequestParams = {}) =>
    this.http.request<
      { upgraded_consensus_state?: { type_url?: string; value?: string } },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/core/client/v1/upgraded_consensus_states`,
      method: 'GET',
      ...params,
    }) /**
 * No description
 * 
 * @tags Query
 * @name ClientConnections
 * @summary ClientConnections queries the connection paths associated with a client
state.
 * @request GET:/ibc/core/connection/v1/client_connections/{client_id}
 */
  clientConnections = (clientId: string, params: RequestParams = {}) =>
    this.http.request<
      {
        connection_paths?: string[]
        proof?: string
        proof_height?: { revision_number?: string; revision_height?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/core/connection/v1/client_connections/${clientId}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name Connections
   * @summary Connections queries all the IBC connections of a chain.
   * @request GET:/ibc/core/connection/v1/connections
   */
  connections = (
    query?: {
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        connections?: {
          id?: string
          client_id?: string
          versions?: { identifier?: string; features?: string[] }[]
          state?:
            | 'STATE_UNINITIALIZED_UNSPECIFIED'
            | 'STATE_INIT'
            | 'STATE_TRYOPEN'
            | 'STATE_OPEN'
          counterparty?: {
            client_id?: string
            connection_id?: string
            prefix?: { key_prefix?: string }
          }
          delay_period?: string
        }[]
        pagination?: { next_key?: string; total?: string }
        height?: { revision_number?: string; revision_height?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/core/connection/v1/connections`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name Connection
   * @summary Connection queries an IBC connection end.
   * @request GET:/ibc/core/connection/v1/connections/{connection_id}
   */
  connection = (connectionId: string, params: RequestParams = {}) =>
    this.http.request<
      {
        connection?: {
          client_id?: string
          versions?: { identifier?: string; features?: string[] }[]
          state?:
            | 'STATE_UNINITIALIZED_UNSPECIFIED'
            | 'STATE_INIT'
            | 'STATE_TRYOPEN'
            | 'STATE_OPEN'
          counterparty?: {
            client_id?: string
            connection_id?: string
            prefix?: { key_prefix?: string }
          }
          delay_period?: string
        }
        proof?: string
        proof_height?: { revision_number?: string; revision_height?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/core/connection/v1/connections/${connectionId}`,
      method: 'GET',
      ...params,
    }) /**
 * No description
 * 
 * @tags Query
 * @name ConnectionClientState
 * @summary ConnectionClientState queries the client state associated with the
connection.
 * @request GET:/ibc/core/connection/v1/connections/{connection_id}/client_state
 */
  connectionClientState = (connectionId: string, params: RequestParams = {}) =>
    this.http.request<
      {
        identified_client_state?: {
          client_id?: string
          client_state?: { type_url?: string; value?: string }
        }
        proof?: string
        proof_height?: { revision_number?: string; revision_height?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/core/connection/v1/connections/${connectionId}/client_state`,
      method: 'GET',
      ...params,
    }) /**
 * No description
 * 
 * @tags Query
 * @name ConnectionConsensusState
 * @summary ConnectionConsensusState queries the consensus state associated with the
connection.
 * @request GET:/ibc/core/connection/v1/connections/{connection_id}/consensus_state/revision/{revision_number}/height/{revision_height}
 */
  connectionConsensusState = (
    connectionId: string,
    revisionNumber: string,
    revisionHeight: string,
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        consensus_state?: { type_url?: string; value?: string }
        client_id?: string
        proof?: string
        proof_height?: { revision_number?: string; revision_height?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/core/connection/v1/connections/${connectionId}/consensus_state/revision/${revisionNumber}/height/${revisionHeight}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name Channels
   * @summary Channels queries all the IBC channels of a chain.
   * @request GET:/ibc/core/channel/v1/channels
   */
  channels = (
    query?: {
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        channels?: {
          state?:
            | 'STATE_UNINITIALIZED_UNSPECIFIED'
            | 'STATE_INIT'
            | 'STATE_TRYOPEN'
            | 'STATE_OPEN'
            | 'STATE_CLOSED'
          ordering?:
            | 'ORDER_NONE_UNSPECIFIED'
            | 'ORDER_UNORDERED'
            | 'ORDER_ORDERED'
          counterparty?: { port_id?: string; channel_id?: string }
          connection_hops?: string[]
          version?: string
          port_id?: string
          channel_id?: string
        }[]
        pagination?: { next_key?: string; total?: string }
        height?: { revision_number?: string; revision_height?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/core/channel/v1/channels`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name Channel
   * @summary Channel queries an IBC Channel.
   * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}
   */
  channel = (channelId: string, portId: string, params: RequestParams = {}) =>
    this.http.request<
      {
        channel?: {
          state?:
            | 'STATE_UNINITIALIZED_UNSPECIFIED'
            | 'STATE_INIT'
            | 'STATE_TRYOPEN'
            | 'STATE_OPEN'
            | 'STATE_CLOSED'
          ordering?:
            | 'ORDER_NONE_UNSPECIFIED'
            | 'ORDER_UNORDERED'
            | 'ORDER_ORDERED'
          counterparty?: { port_id?: string; channel_id?: string }
          connection_hops?: string[]
          version?: string
        }
        proof?: string
        proof_height?: { revision_number?: string; revision_height?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}`,
      method: 'GET',
      ...params,
    }) /**
 * No description
 * 
 * @tags Query
 * @name ChannelClientState
 * @summary ChannelClientState queries for the client state for the channel associated
with the provided channel identifiers.
 * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/client_state
 */
  channelClientState = (
    channelId: string,
    portId: string,
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        identified_client_state?: {
          client_id?: string
          client_state?: { type_url?: string; value?: string }
        }
        proof?: string
        proof_height?: { revision_number?: string; revision_height?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/client_state`,
      method: 'GET',
      ...params,
    }) /**
 * No description
 * 
 * @tags Query
 * @name ChannelConsensusState
 * @summary ChannelConsensusState queries for the consensus state for the channel
associated with the provided channel identifiers.
 * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/consensus_state/revision/{revision_number}/height/{revision_height}
 */
  channelConsensusState = (
    channelId: string,
    portId: string,
    revisionNumber: string,
    revisionHeight: string,
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        consensus_state?: { type_url?: string; value?: string }
        client_id?: string
        proof?: string
        proof_height?: { revision_number?: string; revision_height?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/consensus_state/revision/${revisionNumber}/height/${revisionHeight}`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name NextSequenceReceive
   * @summary NextSequenceReceive returns the next receive sequence for a given channel.
   * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/next_sequence
   */
  nextSequenceReceive = (
    channelId: string,
    portId: string,
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        next_sequence_receive?: string
        proof?: string
        proof_height?: { revision_number?: string; revision_height?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/next_sequence`,
      method: 'GET',
      ...params,
    }) /**
 * No description
 * 
 * @tags Query
 * @name PacketAcknowledgements
 * @summary PacketAcknowledgements returns all the packet acknowledgements associated
with a channel.
 * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_acknowledgements
 */
  packetAcknowledgements = (
    channelId: string,
    portId: string,
    query?: {
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
      packet_commitment_sequences?: string[]
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        acknowledgements?: {
          port_id?: string
          channel_id?: string
          sequence?: string
          data?: string
        }[]
        pagination?: { next_key?: string; total?: string }
        height?: { revision_number?: string; revision_height?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/packet_acknowledgements`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name PacketAcknowledgement
   * @summary PacketAcknowledgement queries a stored packet acknowledgement hash.
   * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_acks/{sequence}
   */
  packetAcknowledgement = (
    channelId: string,
    portId: string,
    sequence: string,
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        acknowledgement?: string
        proof?: string
        proof_height?: { revision_number?: string; revision_height?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/packet_acks/${sequence}`,
      method: 'GET',
      ...params,
    }) /**
 * No description
 * 
 * @tags Query
 * @name PacketCommitments
 * @summary PacketCommitments returns all the packet commitments hashes associated
with a channel.
 * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_commitments
 */
  packetCommitments = (
    channelId: string,
    portId: string,
    query?: {
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        commitments?: {
          port_id?: string
          channel_id?: string
          sequence?: string
          data?: string
        }[]
        pagination?: { next_key?: string; total?: string }
        height?: { revision_number?: string; revision_height?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/packet_commitments`,
      method: 'GET',
      query: query,
      ...params,
    }) /**
 * No description
 * 
 * @tags Query
 * @name UnreceivedAcks
 * @summary UnreceivedAcks returns all the unreceived IBC acknowledgements associated
with a channel and sequences.
 * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_commitments/{packet_ack_sequences}/unreceived_acks
 */
  unreceivedAcks = (
    channelId: string,
    portId: string,
    packetAckSequences: string[],
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        sequences?: string[]
        height?: { revision_number?: string; revision_height?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/packet_commitments/${packetAckSequences}/unreceived_acks`,
      method: 'GET',
      ...params,
    }) /**
 * No description
 * 
 * @tags Query
 * @name UnreceivedPackets
 * @summary UnreceivedPackets returns all the unreceived IBC packets associated with a
channel and sequences.
 * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_commitments/{packet_commitment_sequences}/unreceived_packets
 */
  unreceivedPackets = (
    channelId: string,
    portId: string,
    packetCommitmentSequences: string[],
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        sequences?: string[]
        height?: { revision_number?: string; revision_height?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/packet_commitments/${packetCommitmentSequences}/unreceived_packets`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags Query
   * @name PacketCommitment
   * @summary PacketCommitment queries a stored packet commitment hash.
   * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_commitments/{sequence}
   */
  packetCommitment = (
    channelId: string,
    portId: string,
    sequence: string,
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        commitment?: string
        proof?: string
        proof_height?: { revision_number?: string; revision_height?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/packet_commitments/${sequence}`,
      method: 'GET',
      ...params,
    }) /**
 * No description
 * 
 * @tags Query
 * @name PacketReceipt
 * @summary PacketReceipt queries if a given packet sequence has been received on the
queried chain
 * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_receipts/{sequence}
 */
  packetReceipt = (
    channelId: string,
    portId: string,
    sequence: string,
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        received?: boolean
        proof?: string
        proof_height?: { revision_number?: string; revision_height?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/packet_receipts/${sequence}`,
      method: 'GET',
      ...params,
    }) /**
 * No description
 * 
 * @tags Query
 * @name ConnectionChannels
 * @summary ConnectionChannels queries all the channels associated with a connection
end.
 * @request GET:/ibc/core/channel/v1/connections/{connection}/channels
 */
  connectionChannels = (
    connection: string,
    query?: {
      'pagination.key'?: string
      'pagination.offset'?: string
      'pagination.limit'?: string
      'pagination.count_total'?: boolean
      'pagination.reverse'?: boolean
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        channels?: {
          state?:
            | 'STATE_UNINITIALIZED_UNSPECIFIED'
            | 'STATE_INIT'
            | 'STATE_TRYOPEN'
            | 'STATE_OPEN'
            | 'STATE_CLOSED'
          ordering?:
            | 'ORDER_NONE_UNSPECIFIED'
            | 'ORDER_UNORDERED'
            | 'ORDER_ORDERED'
          counterparty?: { port_id?: string; channel_id?: string }
          connection_hops?: string[]
          version?: string
          port_id?: string
          channel_id?: string
        }[]
        pagination?: { next_key?: string; total?: string }
        height?: { revision_number?: string; revision_height?: string }
      },
      {
        error?: string
        code?: number
        message?: string
        details?: { type_url?: string; value?: string }[]
      }
    >({
      path: `/ibc/core/channel/v1/connections/${connection}/channels`,
      method: 'GET',
      query: query,
      ...params,
    })
}
