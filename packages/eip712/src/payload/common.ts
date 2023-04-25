export interface JSONObject {
  [key: string]: any
}

export interface MessageParams {
  payload: JSONObject
  numMessages: number
}

export const payloadMsgField = (i: number) => `msg${i}`
