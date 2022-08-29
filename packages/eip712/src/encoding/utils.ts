// Parse Chain ID string into number. Throws error on failure case.
export function parseChainId(chainId: string): number {
  const matches = chainId.match('_(.*)-')

  // Regex matches both _[chain id]- and [chain_id]
  if (!matches || matches.length !== 2 || Number.isNaN(Number(matches[1]))) {
    throw new Error(`Invalid chainId received: ${chainId}`)
  }

  return Number(matches[1])
}
