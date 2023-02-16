import Ajv from 'ajv/dist/2020.js'
import chalk from 'chalk'
import { readdir, writeFile } from 'fs/promises'
import _ from 'lodash'
import path from 'path'

import { log, readJson, clearLastLine, formatTs, skipLines } from './utils.js'

const sanitizeName = (name: string) => _.camelCase(name)

export const transformJsonFiles = async (
  schema: object,
  srcDir: string,
  destDir: string,
  formatter: (name: string, content: string) => string,
) => {
  const dirFiles = await readdir(srcDir, {
    withFileTypes: true,
  })
  const fileNames = dirFiles
    .filter(({ name }) => name.endsWith('.json'))
    .map(({ name }) => name.replace('.json', ''))

  const ajv = new Ajv()

  for (const fileName of fileNames) {
    log(chalk.white(`${fileName}:`), 1)
    const content = await readJson(path.join(srcDir, `${fileName}.json`))

    log(chalk.white(`- Validating...`), 2)

    try {
      const valid = await ajv.validate(schema, content)

      if (!valid) {
        clearLastLine()
        log(chalk.red(`❌ Invalid`), 2)
        console.error(ajv.errors)
        process.exit(1)
      }
    } catch (e) {
      console.log(e)
    }
    const safeName = sanitizeName(fileName)
    clearLastLine()
    log(chalk.white(`✅ Validated`), 2)

    log(chalk.white(`- Processing...`), 2)
    await writeFile(
      path.join(destDir, `${safeName}.ts`),
      formatter(safeName, JSON.stringify(content)),
    )
    clearLastLine()
    log(chalk.white(`✅ Processed`), 2)

    skipLines()
  }
  await writeFile(
    path.join(destDir, `index.ts`),
    formatTs(
      fileNames
        .map((name) => `export * from './${sanitizeName(name)}.js'`)
        .join('\n'),
    ),
  )
}
