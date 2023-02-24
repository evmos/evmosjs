import {
  MSG_REGISTER_REVENUE_TYPES,
  createMsgRegisterRevenue,
} from './registerRevenue'
import TestUtils from '../../tests/utils'

describe('test MsgRegisterRevenue types and messages', () => {
  it('creates types as expected', () => {
    const expTypes = {
      MsgValue: [
        { name: 'contract_address', type: 'string' },
        { name: 'deployer_address', type: 'string' },
        { name: 'withdrawer_address', type: 'string' },
        { name: 'nonces', type: 'uint64[]' },
      ],
    }

    expect(MSG_REGISTER_REVENUE_TYPES).toStrictEqual(expTypes)
  })

  it('creates messages as expected', () => {
    const contractAddress = TestUtils.addrHex1
    const deployerAddress = TestUtils.addr1
    const withdrawerAddress = TestUtils.addr2
    const nonces = [2, 3, 5, 7, 11]

    const msg = createMsgRegisterRevenue(
      contractAddress,
      deployerAddress,
      withdrawerAddress,
      nonces,
    )

    const expMsg = {
      type: 'evmos/MsgRegisterRevenue',
      value: {
        contract_address: contractAddress,
        deployer_address: deployerAddress,
        withdrawer_address: withdrawerAddress,
        nonces,
      },
    }

    expect(msg).toStrictEqual(expMsg)
  })
})
