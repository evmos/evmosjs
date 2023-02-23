import { MessageGenerated } from '../common'
import { GenericAuthorization } from '../../proto/cosmos/authz/authz'

export const createGenericAuthorization = (
  typeUrl: string,
): MessageGenerated => ({
  message: new GenericAuthorization({
    msg: typeUrl,
  }),
  path: GenericAuthorization.typeName,
})
