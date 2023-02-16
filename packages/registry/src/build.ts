/* eslint-disable jest/require-hook */
import chalk from 'chalk'
import path from 'path'
import { mkdir, rm, writeFile } from 'fs/promises'
import _ from 'lodash'
import typescript from 'typescript'
import { log, readJson, generateSchemaType, formatTs } from './utils.js'
import {
  libdir,
  libchainConfigDir,
  libtokensDir,
  registryDir,
  chainconfigdir,
  tokensdir,
  distdir,
} from './paths.js'
import { transformJsonFiles } from './transformJsonFiles.js'

async function main() {
  log(chalk.green('Cleaning up...'))

  await rm(libdir, { recursive: true, force: true })
  await mkdir(libchainConfigDir, { recursive: true })
  await mkdir(libtokensDir, { recursive: true })

  log(chalk.green('Reading schema types...'))

  const chainSchema = await readJson(
    path.join(registryDir, 'schema.chain.json'),
  )
  const tokenSchema = await readJson(
    path.join(registryDir, 'schema.token.json'),
  )

  log(chalk.green('Generating schema types...'))
  const schemaTypes = await Promise.all([
    generateSchemaType(chainSchema, 'Chain'),
    generateSchemaType(tokenSchema, 'Token'),
  ])
  writeFile(path.join(libdir, 'types.ts'), formatTs(schemaTypes.join('\n')))

  log(chalk.green('Processing Chain registry...'))

  await transformJsonFiles(
    chainSchema,
    chainconfigdir,
    libchainConfigDir,
    (name, content) =>
      formatTs(`
      import { Chain } from '../types'

      export const ${name}:Chain = ${content}
    `),
  )
  log(chalk.green('Processing Tokens registry...'))

  await transformJsonFiles(
    tokenSchema,
    tokensdir,
    libtokensDir,
    (name, content) =>
      formatTs(`
      import { Token } from '../types.js'

      export const ${name}:Token = ${content}
    `),
  )

  await writeFile(
    path.join(libdir, 'index.ts'),
    formatTs(`
    export * from './types.js'
    export * as chain  from './chainConfig/index.js'
    export * as token  from './tokens/index.js'
  `),
  )

  log(chalk.green('Building dist...'))

  const program = typescript.createProgram([path.join(libdir, 'index.ts')], {
    outDir: distdir,
    declaration: true,
  })

  program.emit()
}

main()
