import { compile } from 'json-schema-to-typescript'
import { JSONSchema4 } from 'json-schema'
import { readFile } from 'fs/promises'
import prettier from 'prettier'
import readline from 'readline'
import _ from 'lodash'

export const log = (message: string, indent = 0) =>
  console.log('   '.repeat(indent) + message)

export const skipLines = (lines = 1) => {
  for (let i = 0; i < lines; i += 1) {
    log('')
  }
}

export const generateSchemaType = async (schema: JSONSchema4, name: string) => {
  const compiled = await compile(_.omit(schema, '$id') as JSONSchema4, name, {
    additionalProperties: false,
    format: false,
    bannerComment: '',
  })
  return compiled
}

export const readJson = async (schemaPath: string) => {
  const schemaString = await readFile(schemaPath, {
    encoding: 'utf8',
  })
  const json = JSON.parse(schemaString)
  if (!_.isObject(json)) {
    throw new Error(`Invalid JSON: ${schemaPath}`)
  }
  return json
}

export const clearLastLine = () => {
  readline.moveCursor(process.stdout, 0, -1) // up one line
  readline.clearLine(process.stdout, 1) // from cursor to end
}

export const formatTs = (ts: string) =>
  prettier.format(
    `
    /*
     * WARNING: This is an auto-generated file. Do not edit it directly.
    */

    ${ts}
  `,
    {
      parser: 'typescript',
      singleQuote: true,
      semi: false,
    },
  )
