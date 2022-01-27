import Ajv, {JSONSchemaType} from 'ajv'

interface Validate<Config> {
  config: Record<string, unknown> 
  schema: JSONSchemaType<Config>
}

export function validate<Config>({ config, schema }: Validate<Config>): void {
  const ajv = new Ajv({ allErrors: true })
  const validate = ajv.compile(schema)
  validate(config)

  if (!validate.errors) {
    return
  }

  const errorMessages = validate.errors.map(e => {
    let errorMessage = ''
    if (e.instancePath) {
      errorMessage += `'${e.instancePath}' `
    }
    errorMessage += e.message
    if (e.keyword === 'additionalProperties') {
      errorMessage += ` (${e.params.additionalProperty})`
    }
    return errorMessage
  })

  throw new Error(`config ${errorMessages.join(' and ')}`)
}
