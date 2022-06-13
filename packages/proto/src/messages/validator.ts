import * as stakingTypes from '../proto/cosmos/staking/v1beta1/staking'
import * as staking from '../proto/cosmos/staking/v1beta1/tx'

const NOT_MODIFY = '[do-not-modify]'

export interface MsgEditValidatorProtoInterface {
  path: string
  message: staking.cosmos.staking.v1beta1.MsgEditValidator
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
  const message = new staking.cosmos.staking.v1beta1.MsgEditValidator({
    description: new stakingTypes.cosmos.staking.v1beta1.Description({
      moniker: moniker || NOT_MODIFY,
      identity: identity || NOT_MODIFY,
      website: website || NOT_MODIFY,
      security_contact: securityContact || NOT_MODIFY,
      details: details || NOT_MODIFY,
    }),
    validator_address: validatorAddress,
    commission_rate: commissionRate,
    min_self_delegation: minSelfDelegation,
  })

  return {
    message,
    path: 'cosmos.staking.v1beta1.MsgEditValidator',
  }
}
