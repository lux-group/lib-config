import fs from 'fs'
import path from 'path'
import { ZodRawShape } from 'zod'
import { LibConfigOptions } from './types'

function isObject(x: any): x is object {
  return typeof x === 'object'
}

export function load<T extends ZodRawShape>({
  env,
  schema,
  configDir,
}: LibConfigOptions<T>) {
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
  const configFile = path.resolve(path.join(configDirectory, environment))

  if (fs.existsSync(`${configFile}.js`)) {
    const required = require(path.resolve(
      path.join(configDirectory, environment)
    ))

    const config = required.config || required

    if (!isObject(config)) {
      throw new Error(
        `Cannot load environment ${environment} as config file is empty at ${configFile}`
      )
    }

    return schema.parse(config)
  }

  if (fs.existsSync(`${configFile}.ts`)) {
    const { config } = require(path.resolve(
      path.join(configDirectory, environment)
    ))

    if (!isObject(config)) {
      throw new Error(
        `Cannot load environment ${environment} as config file is empty at ${configFile}`
      )
    }

    return schema.parse(config)
  }

  throw new Error(
    `Cannot load environment ${environment} as config file does not exist at ${configFile}`
  )
}
