import { MSG_CONVERT_ERC20_TYPES, createMsgConvertERC20 } from './convertERC20'
import TestUtils from '../../tests/utils'

describe('test MsgConvertERC20 types and messages', () => {
  it('creates types as expected', () => {
    const expTypes = {
      MsgValue: [
        { name: 'contract_address', type: 'string' },
        { name: 'amount', type: 'string' },
        { name: 'receiver', type: 'string' },
        { name: 'sender', type: 'string' },
      ],
    }

    expect(MSG_CONVERT_ERC20_TYPES).toStrictEqual(expTypes)
  })

  it('creates messages as expected', () => {
    const contractAddress = TestUtils.addrHex1
    const amount = TestUtils.amount1
    const senderHex = TestUtils.addrHex2
    const receiverBech32 = TestUtils.addr1

    const msg = createMsgConvertERC20(
      contractAddress,
      amount,
      receiverBech32,
      senderHex,
    )

    const expMsg = {
      type: 'evmos/MsgConvertERC20',
      value: {
        contract_address: contractAddress,
        amount,
        receiver: receiverBech32,
        sender: senderHex,
      },
    }

    expect(msg).toStrictEqual(expMsg)
  })
})
