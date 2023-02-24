import {
  MSG_UPDATE_REVENUE_TYPES,
  createMsgUpdateRevenue,
} from './updateRevenue'
import TestUtils from '../../tests/utils'

describe('test MsgUpdateRevenue types and messages', () => {
  it('creates types as expected', () => {
    const expTypes = {
      MsgValue: [
        { name: 'contract_address', type: 'string' },
        { name: 'deployer_address', type: 'string' },
        { name: 'withdrawer_address', type: 'string' },
      ],
    }

    expect(MSG_UPDATE_REVENUE_TYPES).toStrictEqual(expTypes)
  })

  it('creates messages as expected', () => {
    const contractAddress = TestUtils.addrHex1
    const deployerAddress = TestUtils.addr1
    const withdrawerAddress = TestUtils.addr2

    const msg = createMsgUpdateRevenue(
      contractAddress,
      deployerAddress,
      withdrawerAddress,
    )

    const expMsg = {
      type: 'evmos/MsgUpdateRevenue',
      value: {
        contract_address: contractAddress,
        deployer_address: deployerAddress,
        withdrawer_address: withdrawerAddress,
      },
    }

    expect(msg).toStrictEqual(expMsg)
  })
})
