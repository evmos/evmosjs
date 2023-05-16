import { MsgGrant, MsgRevoke, MsgExec } from '../../proto/cosmos/authz/tx.js'
import { Grant, GenericAuthorization } from '../../proto/cosmos/authz/authz.js'
import {
  StakeAuthorization,
  // eslint-disable-next-line camelcase
  StakeAuthorization_Validators,
} from '../../proto/cosmos/staking/authz.js'

export const authzRegistryTypes = [
  Grant,
  MsgGrant,
  MsgRevoke,
  MsgExec,
  GenericAuthorization,
  StakeAuthorization,
  // eslint-disable-next-line camelcase
  StakeAuthorization_Validators,
]
