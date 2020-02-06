import * as config from './'

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

config.load({
  env: 'ts',
  configDir,
  schema
})
