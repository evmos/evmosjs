import { MSG_CLAWBACK_TYPES, createMsgClawback } from './clawback'
import TestUtils from '../../tests/utils'

describe('test MsgClawback types and messages', () => {
  it('creates types as expected', () => {
    const expTypes = {
      MsgValue: [
        { name: 'funder_address', type: 'string' },
        { name: 'account_address', type: 'string' },
        { name: 'dest_address', type: 'string' },
      ],
    }

    expect(MSG_CLAWBACK_TYPES).toStrictEqual(expTypes)
  })

  it('creates messages as expected', () => {
    const funderAddress = TestUtils.addr1
    const accountAddress = TestUtils.addr2
    const destinationAddress = TestUtils.addr3

    const msg = createMsgClawback(
      funderAddress,
      accountAddress,
      destinationAddress,
    )

    const expMsg = {
      type: 'evmos/MsgClawback',
      value: {
        funder_address: funderAddress,
        account_address: accountAddress,
        dest_address: destinationAddress,
      },
    }

    expect(msg).toStrictEqual(expMsg)
  })
})
