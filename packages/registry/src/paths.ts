import { fileURLToPath } from 'url'
import path from 'path'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const rootdir = path.dirname(dirname)

export const distdir = path.join(rootdir, 'dist')
export const libdir = path.join(rootdir, 'lib')
export const libchainConfigDir = path.join(libdir, 'chainConfig')
export const libtokensDir = path.join(libdir, 'tokens')
const chainSchemaDir =
  (await import.meta.resolve?.('chain-token-registry/schema.chain.json')) ?? ''
export const registryDir = path.dirname(fileURLToPath(chainSchemaDir))

export const chainconfigdir = path.join(registryDir, 'chainConfig')
export const tokensdir = path.join(registryDir, 'tokens')
