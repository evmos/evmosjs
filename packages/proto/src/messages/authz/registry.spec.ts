import { authzRegistryTypes } from './registry'

import { MsgGrant, MsgRevoke, MsgExec } from '../../proto/cosmos/authz/tx'
import { Grant, GenericAuthorization } from '../../proto/cosmos/authz/authz'
import {
  StakeAuthorization,
  // eslint-disable-next-line camelcase
  StakeAuthorization_Validators,
} from '../../proto/cosmos/staking/authz'

describe('test authz registry types against expected', () => {
  it('exactly equals expected types', () => {
    expect(authzRegistryTypes).toStrictEqual([
      Grant,
      MsgGrant,
      MsgRevoke,
      MsgExec,
      GenericAuthorization,
      StakeAuthorization,
      // eslint-disable-next-line camelcase
      StakeAuthorization_Validators,
    ])
  })
})
