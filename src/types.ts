import {JSONSchemaType} from 'ajv'

export interface LibConfigOptions<Config> {
  env?: string
  schema?: JSONSchemaType<Config>
  configDir?: string
}
