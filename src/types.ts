import { ZodObject, ZodRawShape } from "zod";

export interface LibConfigOptions<T extends ZodRawShape> {
  env?: string
  schema: ZodObject<T>
  configDir?: string
}
