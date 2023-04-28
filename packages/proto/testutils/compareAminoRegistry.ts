import { AminoConverter, AminoConverters } from '@cosmjs/stargate'

// Compares AminoConverters for exact equivalence. Only to be
// used for default AminoConverter constructions.
export function expectEqualDefaultAminoConverters(
  converters: AminoConverters,
  expConverters: AminoConverters,
) {
  for (const typeUrl of Object.keys(expConverters)) {
    const converter = converters[typeUrl] as AminoConverter
    const expConverter = expConverters[typeUrl] as AminoConverter

    expect(converter.aminoType).toStrictEqual(expConverter.aminoType)
    // Compare exact function definitions.
    expect(converter.toAmino.toString()).toStrictEqual(
      expConverter.toAmino.toString(),
    )
    expect(converter.fromAmino.toString()).toStrictEqual(
      expConverter.fromAmino.toString(),
    )
  }
}
