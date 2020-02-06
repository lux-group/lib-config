import Ajv from 'ajv'

import { JSONSchema } from './types'

interface Validate {
  config: object
  schema: JSONSchema
}

export function validate ({ config, schema }: Validate) {
  const ajv = new Ajv()
  const validate = ajv.compile(schema)
  validate(config)

  if (validate.errors) {
    validate.errors.forEach(e => {
      console.error(`config error: '${e.dataPath}' ${e.message}`)
    })
    throw new Error('Invalid config')
  }

  return null
}
