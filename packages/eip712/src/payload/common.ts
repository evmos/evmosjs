export interface JSONObject {
  [key: string]: any
}

export interface EIP712Type {
  type: string
  name: string
}

export interface MessageParams {
  payload: JSONObject
  numMessages: number
}

export const payloadMsgField = (i: number) => `msg${i}`
