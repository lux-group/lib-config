import { JSONSchema4 } from "json-schema";

export interface LibConfigOptions {
  env?: string
  schema?: JSONSchema4
  configDir?: string
}
