export const ibcChannelsEndpoint = '/ibc/core/channel/v1/channels'

/* eslint-disable camelcase */
interface CounterParty {
  port_id: string
  channel_id: string
}

/* eslint-disable camelcase */
export interface Channel {
  state: string
  ordering: string
  counterparty: CounterParty
  connection_hops: string[]
  version: string
  port_id: string
  channel_id: string
}

/* eslint-disable camelcase */
export interface ChannelsResponse {
  channels: Channel[]
  pagination: {
    next_key?: string
    total: string
  }
  height: {
    revision_number: string
    revision_height: string
  }
}
