import {JSONSchemaType} from 'ajv'
import { load } from './'

interface MyConfig {
  port: number
  apiEndpoint: string
}

const configDir = 'test/config'

const schema: JSONSchemaType<MyConfig> = {
  type: 'object',
  properties: {
    port: { type: 'integer' },
    apiEndpoint: { type: 'string' }
  },
  required: ['port', 'apiEndpoint'],
  additionalProperties: false
}

if(load<MyConfig>({
  env: 'jsjs',
  configDir,
  schema,
}).port !== 7070) {
  throw 'could not get port value'
}
console.log('passed jsjs test')

if(load<MyConfig>({
  env: 'tsts',
  configDir,
  schema,
}).port !== 8080) {
  throw 'could not get port value'
}
console.log('passed tsts test')

if(load<MyConfig>({
  env: 'tsjs',
  configDir,
  schema,
}).port !== 9090) {
  throw 'could not get port value'
}
console.log('passed tsjs test')

try {
  load<MyConfig>({
    env: 'error',
    configDir,
    schema,
  })
  throw 'did not throw error'
} catch(e) {
  console.log('passed error test')
}

try {
  load<MyConfig>({
    env: 'empty',
    configDir,
    schema,
  })
  throw 'did not throw error'
} catch(e) {
  console.log('passed empty test')
}
