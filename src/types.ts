export interface JSONSchema {
  type: string
  properties: {
    [name: string]: {
      type: string
    }
  },
  required?: string[];
  additionalProperties?: boolean
}

export interface LibConfigOptions {
  env?: string
  schema?: JSONSchema
  configDir?: string
}

