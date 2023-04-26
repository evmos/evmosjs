export interface JSONObject {
  [key: string]: any
}

export interface FlattenPayloadResponse {
  payload: JSONObject
  numMessages: number
}
