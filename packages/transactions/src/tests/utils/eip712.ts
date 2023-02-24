import { TestingClient } from './utils'

class EIP712TestingClient extends TestingClient {
  private createBaseTypes = () => ({
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'string' },
      { name: 'salt', type: 'string' },
    ],
    Tx: [
      { name: 'account_number', type: 'string' },
      { name: 'chain_id', type: 'string' },
      { name: 'fee', type: 'Fee' },
      { name: 'memo', type: 'string' },
      { name: 'msgs', type: 'Msg[]' },
      { name: 'sequence', type: 'string' },
    ],
    Fee: [
      { name: 'feePayer', type: 'string' },
      { name: 'amount', type: 'Coin[]' },
      { name: 'gas', type: 'string' },
    ],
    Coin: [
      { name: 'denom', type: 'string' },
      { name: 'amount', type: 'string' },
    ],
    Msg: [
      { name: 'type', type: 'string' },
      { name: 'value', type: 'MsgValue' },
    ],
  })

  private readonly domain = {
    name: 'Cosmos Web3',
    version: '1.0.0',
    chainId: this.context.chain.chainId,
    verifyingContract: 'cosmos',
    salt: '0',
  }

  get eip712Fee() {
    const { amount, denom, gas } = this.context.fee
    const feePayer = this.context.sender.accountAddress

    return {
      amount: [
        {
          amount,
          denom,
        },
      ],
      gas,
      feePayer,
    }
  }

  generateTypes = (msgTypes: object) => {
    const types = this.createBaseTypes()
    Object.assign(types, msgTypes)

    return types
  }

  generateMessage = (payload: object | object[]) => {
    const { context } = this
    // eslint-disable-next-line camelcase
    const account_number = context.sender.accountNumber.toString()
    // eslint-disable-next-line camelcase
    const chain_id = context.chain.cosmosChainId
    const fee = this.eip712Fee
    const { memo } = context
    const msgs = Array.isArray(payload) ? payload : [payload]
    const sequence = context.sender.sequence.toString()

    return {
      account_number,
      chain_id,
      fee,
      memo,
      msgs,
      sequence,
    }
  }

  generateEIP712 = (types: object, message: object) => {
    const { domain } = this
    const primaryType = 'Tx'

    return {
      types,
      primaryType,
      domain,
      message,
    }
  }
}

const client = new EIP712TestingClient()

export default client
