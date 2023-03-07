import { Proto } from '@evmos/proto'

export const REGISTER_COIN_TYPES = {
  ContentValue: [
    { name: 'title', type: 'string' },
    { name: 'description', type: 'string' },
    { name: 'metadata', type: 'TypeMetadata[]' },
  ],
  TypeMetadata: [
    { name: 'description', type: 'string' },
    { name: 'denomUnits', type: 'TypeDenomUnit[]' },
    { name: 'base', type: 'string' },
    { name: 'display', type: 'string' },
    { name: 'name', type: 'string' },
    { name: 'symbol', type: 'string' },
    { name: 'uri', type: 'string' },
    { name: 'uriHash', type: 'string' },
  ],
  TypeDenomUnit: [
    { name: 'denom', type: 'string' },
    { name: 'exponent', type: 'string' },
    { name: 'aliases', type: 'string[]' },
  ],
}

export function createRegisterCoin(
  title: string,
  description: string,
  metadata: Proto.Cosmos.Bank.Bank.Metadata[],
) {
  return {
    type: 'erc20/RegisterCoinProposal',
    value: {
      title,
      description,
      metadata,
    },
  }
}