import { RegisterERC20Proposal } from '../../proto/evmos/erc20/erc20.js'

export function createMsgRegisterERC20(
  title: string,
  description: string,
  erc20addresses: string[],
) {
  const msg = new RegisterERC20Proposal({
    title,
    description,
    erc20addresses,
  })

  return {
    message: msg,
    path: RegisterERC20Proposal.typeName,
  }
}
