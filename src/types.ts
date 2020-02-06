export interface JSONSchema {
  type: string
  properties: object
  required?: string[]
  additionalProperties?: boolean
}

export interface LibConfigOptions {
  env?: string
  schema?: JSONSchema
  configDir?: string
}
