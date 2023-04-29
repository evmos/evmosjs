import {
  createDefaultAminoConverters as createDefaultCosmosAminoConverters,
  AminoTypes as AminoTypesClass,
} from '@cosmjs/stargate'
import {
  createRevenueAminoConverters,
  createERC20AminoConverters,
  createVestingAminoConverters,
} from '../messages/index.js'

// TODO: Add missing Amino types (see x/**/codec.go)

export function createDefaultAminoConverters() {
  return {
    ...createDefaultCosmosAminoConverters(),

    ...createRevenueAminoConverters(),
    ...createERC20AminoConverters(),
    ...createVestingAminoConverters(),
  }
}

export const AminoTypes = new AminoTypesClass(createDefaultAminoConverters())
