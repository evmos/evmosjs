export interface JSON {
  [key: string]: any
}

export interface EIP712Type {
  type: string
  name: string
}

export interface MessageParams {
  payload: JSON
  numMessages: number
}
