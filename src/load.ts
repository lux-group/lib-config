import fs from 'fs'
import path from 'path'

import { validate } from './validate'

import { LibConfigOptions } from './types'

export function load<Config>({ env, schema, configDir }: LibConfigOptions<Config>): Config {
  const environment = env || process.env.APP_ENV

  if (!environment) {
    throw new Error(
      'Error loading config, please specify an app environment using the env parameter or APP_ENV env var'
    )
  }

  if (!schema) {
    throw new Error('Error loading config, you must provide a config schema')
  }

  const configDirectory = path.resolve(configDir || 'config')

  const configFile = path.resolve(path.join(configDirectory, environment))

  if (!fs.existsSync(`${configFile}.js`) && !fs.existsSync(`${configFile}.ts`)) {
    throw new Error(
      `Cannot load environment ${environment} as config file does not exist at ${configFile}`
    )
  }

  // eslint-disable-next-line  @typescript-eslint/no-var-requires
  const required = require(configFile)

  const config = required.config || required

  validate<Config>({ config, schema })

  return ((config as unknown) as Config)
}
