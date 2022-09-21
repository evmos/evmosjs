import * as stakingTypes from '../proto/cosmos/staking/v1beta1/staking'
import * as staking from '../proto/cosmos/staking/v1beta1/tx'
import * as coin from '../proto/cosmos/base/v1beta1/coin'
import { createAnyMessage, createPubKey } from './utils'

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

export function createMsgCreateValidator(
  validatorDescription: {
    moniker: string
    identity: string
    website: string
    securityContact: string
    details: string
  },
  validatorCommission: {
    rate: string
    maxRate: string
    maxChangeRate: string
  },
  minSelfDelegation: string,
  delegatorAddress: string,
  validatorAddress: string,
  amount: string,
  denom: string,
  pubkey: string,
) {
  const pubkeyEncoded = new Uint8Array(Buffer.from(pubkey, 'base64'))
  console.log(pubkeyEncoded)
  const commission = new stakingTypes.cosmos.staking.v1beta1.CommissionRates({
    rate: validatorCommission.rate,
    max_rate: validatorCommission.maxRate,
    max_change_rate: validatorCommission.maxChangeRate,
  })

  const description = new stakingTypes.cosmos.staking.v1beta1.Description({
    moniker: validatorDescription.moniker,
    identity: validatorDescription.identity,
    website: validatorDescription.website,
    security_contact: validatorDescription.securityContact,
    details: validatorDescription.details,
  })

  const value = new coin.cosmos.base.v1beta1.Coin({
    denom,
    amount,
  })

  const message = new staking.cosmos.staking.v1beta1.MsgCreateValidator({
    min_self_delegation: minSelfDelegation,
    delegator_address: delegatorAddress,
    validator_address: validatorAddress,
    value,
    pubkey: createAnyMessage(createPubKey(pubkeyEncoded)),
    description,
    commission,
  })

  return {
    message,
    path: 'cosmos.staking.v1beta1.MsgCreateValidator',
  }
}
