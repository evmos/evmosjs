export interface EIP712Type {
  name: string
  type: string
}

export const newType = (name: string, type: string): EIP712Type => ({
  name,
  type,
})

// contract - types must be in the same sorted order
export const typesAreEqual = (types1: EIP712Type[], types2: EIP712Type[]) => {
  if (types1.length !== types2.length) {
    return false
  }

  for (let i = 0; i < types1.length; i++) {
    if (
      types1[i].type !== types2[i].type ||
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
