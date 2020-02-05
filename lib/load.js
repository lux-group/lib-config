const fs = require('fs')
const path = require('path')

const configInstance = require('./config')
const validate = require('./validate')

module.exports = ({ env, schema, configDir } = {}) => {
  const environment = env || process.env.APP_ENV
  if (!environment) {
    throw new Error(
      'Error loading config, please specify an app environment using the env parameter or APP_ENV env var'
    )
  }

  if (!schema) {
    throw new Error('Error loading config, you must provide a config schema')
  }

  console.log(`Loading config for env ${environment}`)
  const configDirectory = path.resolve(configDir || 'config')
  const configFile = path.resolve(
    path.join(configDirectory, `${environment}.js`)
  )

  if (!fs.existsSync(configFile)) {
    throw new Error(
      `Cannot load environment ${environment} as config file does not exist at ${configFile}`
    )
  }

  const config = require(path.resolve(path.join(configDirectory, environment)))

  validate({ config, schema })

  configInstance.set(config)
}
