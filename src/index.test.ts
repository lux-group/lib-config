import * as config from './'

interface MyConfig {
  port: number
  apiEndpoint: string
}

const configDir = 'test/config'

const schema = {
  type: 'object',
  properties: {
    port: { type: 'integer' },
    apiEndpoint: { type: 'string' }
  },
  required: ['port', 'apiEndpoint'],
  additionalProperties: false
}

config.load({
  env: 'js',
  configDir,
  schema
})

if ((config.get() as MyConfig).port !== 8080) {
  throw "could not get port value"
}

config.load({
  env: 'ts',
  configDir,
  schema
})

if ((config.get() as MyConfig).port !== 9090) {
  throw "could not get port value"
}

