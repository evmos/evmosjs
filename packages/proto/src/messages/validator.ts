import * as staking from '../proto/cosmos/staking/v1beta1/tx'
import * as stakingTypes from '../proto/cosmos/staking/v1beta1/staking'
import * as coin from '../proto/cosmos/base/v1beta1/coin'
import { createAnyMessage, createPubKey } from './utils'

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
  pubkey: Uint8Array,
) {
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
    pubkey: createAnyMessage(createPubKey(pubkey)),
    description,
    commission,
  })

  return {
    message,
    path: 'cosmos.staking.v1beta1.MsgCreateValidator',
  }
}
