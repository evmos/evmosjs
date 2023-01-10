import * as erc20 from '../../proto/evmos/erc20/v1/erc20'

export function createMsgRegisterERC20Proposal(
  title: string,
  description: string,
  erc20addresses: string[],
) {
  const msg = new erc20.evmos.erc20.v1.RegisterERC20Proposal({
    title,
    description,
    erc20addresses,
  })
  return {
    message: msg,
    path: 'evmos.erc20.v1.RegisterERC20Proposal',
  }
}
