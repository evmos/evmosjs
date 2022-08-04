import { MessageGenerated } from '@tharsis/proto'
import * as authzGeneric from '../../proto/cosmos/authz/v1beta1/authz'

export const createGenericAuthorization = (
  typeUrl: string,
): MessageGenerated => ({
  message: new authzGeneric.cosmos.authz.v1beta1.GenericAuthorization({
    msg: typeUrl,
  }),
  path: 'cosmos.authz.v1beta1.GenericAuthorization',
})
