import {
  MSG_CANCEL_REVENUE_TYPES,
  createMsgCancelRevenue,
} from './cancelRevenue'
import TestUtils from '../../tests/utils'

describe('test MsgCancelRevenue types and messages', () => {
  it('creates types as expected', () => {
    const expTypes = {
      MsgValue: [
        { name: 'contract_address', type: 'string' },
        { name: 'deployer_address', type: 'string' },
      ],
    }

    expect(MSG_CANCEL_REVENUE_TYPES).toStrictEqual(expTypes)
  })

  it('creates messages as expected', () => {
    const contractAddress = TestUtils.addrHex1
    const deployerAddress = TestUtils.addr1

    const msg = createMsgCancelRevenue(contractAddress, deployerAddress)

    const expMsg = {
      type: 'evmos/MsgCancelRevenue',
      value: {
        contract_address: contractAddress,
        deployer_address: deployerAddress,
      },
    }

    expect(msg).toStrictEqual(expMsg)
  })
})
