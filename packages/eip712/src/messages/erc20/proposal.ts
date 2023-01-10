export const REGISTER_ERC20_TYPES = {
  ContentType: [
    { name: 'type', type: 'string' },
    { name: 'value', type: 'string' },
  ],
  ContentValue: [
    { name: 'title', type: 'string' },
    { name: 'description', type: 'string' },
    { name: 'erc20addresses', type: 'string' },
  ],
}
export function createRegisterErc20(
  title: string,
  description: string,
  erc20addresses: string,
) {
  return {
    type: 'erc20/RegisterERC20Proposal',
    value: {
      title,
      description,
      erc20addresses,
    },
  }
}
