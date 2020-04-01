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
      let errorMessage = 'config error: '
      if (e.dataPath) {
        errorMessage += `'${e.dataPath}' `
      }
      errorMessage += e.message
      if (e.keyword === 'additionalProperties') {
        errorMessage += ` (${(e.params as any).additionalProperty})`
      }
      console.error(errorMessage);
    })
    throw new Error('Invalid config')
  }

  return null
}
