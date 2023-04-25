export interface EIP712Type {
  type: string
  name: string
}

export const newType = (type: string, name: string): EIP712Type => ({
  type,
  name,
})

// contract - types must be in the same sorted order
export const typesAreEqual = (types1: EIP712Type[], types2: EIP712Type[]) => {
  if (types1.length !== types2.length) {
    return false
  }

  for (let i = 0; i < types1.length; i++) {
    if (
      types1[i].type !== types2[i].type &&
      types1[i].name !== types2[i].name
    ) {
      return false
    }
  }

  return true
}

export const typeArrayAdjusted = (
  typeDef: string,
  isArray: boolean | undefined,
) => {
  if (isArray) {
    return `${typeDef}[]`
  }
  return typeDef
}
