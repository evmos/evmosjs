export interface JSONObject {
  [key: string]: any
}

export interface FlattenPayloadResponse {
  payload: JSONObject
  numMessages: number
}

export const payloadMsgFieldForIndex = (i: number) => `msg${i}`
