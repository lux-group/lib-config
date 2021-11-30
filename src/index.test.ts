import { z } from 'zod'
import * as config from './'

const configDir = `${__dirname}/../test/config`

const schema = z.object({
  port: z.number().int(),
  apiEndpoint: z.string()
})

let theConfig = config.load({
  env: 'jsjs',
  configDir,
  schema
})

if (theConfig.port !== 7070) {
  throw "could not get port value"
}

theConfig = config.load({
  env: 'tsts',
  configDir,
  schema
})

if (theConfig.port !== 8080) {
  throw "could not get port value"
}

theConfig = config.load({
  env: 'tsjs',
  configDir,
  schema
})

if (theConfig.port !== 9090) {
  throw "could not get port value"
}

