import { Metadata } from '../../proto/cosmos/bank/bank'
import { RegisterCoinProposal } from '../../proto/evmos/erc20/erc20.js'

export function createMsgRegisterCoin(
  title: string,
  description: string,
  metadata: Metadata[],
) {
  const msg = new RegisterCoinProposal({
    title,
    description,
    metadata,
  })

  return {
    message: msg,
    path: RegisterCoinProposal.typeName,
  }
}
