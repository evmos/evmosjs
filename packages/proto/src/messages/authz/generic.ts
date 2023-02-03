import { MessageGenerated } from '../utils'
import { GenericAuthorization } from '../../types/cosmos/authz/authz'

export const createGenericAuthorization = (
  typeUrl: string,
): MessageGenerated => ({
  message: new GenericAuthorization({
    msg: typeUrl,
  }),
  path: GenericAuthorization.typeName,
})
