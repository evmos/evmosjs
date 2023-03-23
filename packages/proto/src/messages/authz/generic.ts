import { MessageGenerated } from '../common.js'
import { GenericAuthorization } from '../../proto/cosmos/authz/authz.js'

export const createGenericAuthorization = (
  typeUrl: string,
): MessageGenerated => ({
  message: new GenericAuthorization({
    msg: typeUrl,
  }),
  path: GenericAuthorization.typeName,
})
