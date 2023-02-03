import { Coin } from '../types/cosmos/base/coin'
import {
  MsgEditValidator,
  MsgCreateValidator,
} from '../types/cosmos/staking/tx'
import { Description, CommissionRates } from '../types/cosmos/staking/staking'
import { MsgSetWithdrawAddress } from '../types/cosmos/distribution/tx'

import { createAnyMessage } from './utils'
import { createED25519PubKey } from './keys'

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

export interface MsgCreateValidatorInterface {
  path: string
  message: MsgCreateValidator
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

  const commission = new CommissionRates({
    rate: validatorCommission.rate,
    maxRate: validatorCommission.maxRate,
    maxChangeRate: validatorCommission.maxChangeRate,
  })

  const description = new Description({
    moniker: validatorDescription.moniker,
    identity: validatorDescription.identity,
    website: validatorDescription.website,
    securityContact: validatorDescription.securityContact,
    details: validatorDescription.details,
  })

  const value = new Coin({
    denom,
    amount,
  })

  const message = new MsgCreateValidator({
    minSelfDelegation,
    delegatorAddress,
    validatorAddress,
    value,
    pubkey: createAnyMessage(createED25519PubKey(pubkeyEncoded)),
    description,
    commission,
  })

  return {
    message,
    path: 'cosmos.staking.v1beta1.MsgCreateValidator',
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
