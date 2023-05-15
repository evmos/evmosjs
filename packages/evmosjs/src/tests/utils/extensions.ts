import {
  createDynamicFeeExtension,
  createAnyMessage,
  MessageGenerated,
} from '@evmos/proto'

class TxExtensionsUtils {
  public createDynamicFee = () => {
    const extension = createDynamicFeeExtension('1000000000000')
    return this.wrapExtension(extension)
  }

  private wrapExtension = (extension: MessageGenerated) =>
    createAnyMessage(extension)
}

const client = new TxExtensionsUtils()

export default client
