import { MsgEditValidator } from '../types/cosmos/staking/tx'
import { Description } from '../types/cosmos/staking/staking'
import { MsgSetWithdrawAddress } from '../types/cosmos/distribution/tx'

const NOT_MODIFY = '[do-not-modify]'

export interface MsgEditValidatorProtoInterface {
  path: string
  message: MsgEditValidator
}

export function createMsgEditValidator(
  moniker: string | undefined,
  identity: string | undefined,
  website: string | undefined,
  securityContact: string | undefined,
  details: string | undefined,
  validatorAddress: string | undefined,
  commissionRate: string | undefined,
  minSelfDelegation: string | undefined,
) {
  const message = new MsgEditValidator({
    description: new Description({
      moniker: moniker || NOT_MODIFY,
      identity: identity || NOT_MODIFY,
      website: website || NOT_MODIFY,
      securityContact: securityContact || NOT_MODIFY,
      details: details || NOT_MODIFY,
    }),
    validatorAddress,
    commissionRate,
    minSelfDelegation,
  })

  return {
    message,
    path: 'cosmos.staking.v1beta1.MsgEditValidator',
  }
}

export interface MsgSetWithdrawAddressProtoInterface {
  path: string
  message: MsgSetWithdrawAddress
}

export function createMsgSetWithdrawAddress(
  delegatorAddress: string,
  withdrawAddress: string,
) {
  const message = new MsgSetWithdrawAddress({
    delegatorAddress,
    withdrawAddress,
  })

  return {
    message,
    path: 'cosmos.distribution.v1beta1.MsgSetWithdrawAddress',
  }
}
