// Parse Chain ID string into number. Throws error on failure case.
export function parseChainId(chainId: string): number {
  const matches = chainId.match(
    '^([a-z]{1,})_{1}([1-9][0-9]*)-{1}([1-9][0-9]*)$',
  )

  if (
    !matches ||
    matches.length !== 4 ||
    matches[1] === '' ||
    Number.isNaN(Number(matches[2]))
  ) {
    throw new Error(`Invalid chainId received: ${chainId}`)
  }

  return Number(matches[2])
}
