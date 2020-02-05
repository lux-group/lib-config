const Ajv = require('ajv')

module.exports = ({ config, schema }) => {
  const ajv = new Ajv()
  const validate = ajv.compile(schema)
  const valid = validate(config)

  if (!valid) {
    validate.errors.forEach(e => {
      console.error(`config error: '${e.dataPath}' ${e.message}`)
    })
    throw new Error('Invalid config')
  }
  return null
}
