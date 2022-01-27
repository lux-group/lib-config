# lib-config

Lets you define your config as ordinary code files
The name of the file, maps to the name of the APP_ENV

## Philosophy

The philosophy (summarised [in confluence](https://aussiecommerce.atlassian.net/wiki/spaces/TEC/pages/605159786/2020-02-13+Hard+Coded+Config+vs+Environment+Variables)) is that ENV vars should be used only for secret config.

For other non-secret settings that vary between environments *(eg. the API url, which might be `test-api.com` or `api.com`)*, it's easier to manage them in hard-coded config files. A single environment variable called `APP_ENV` determines what environment we're running in *(development, test, production, etc)* and the relevant config file is loaded based on that.

#### APP_ENV values

`APP_ENV` can be whatever you want. At Luxury Escapes, we typically use:

**development**<br />
**spec** (for running automated tests - both in CI and locally<br /> 
**test** (aka staging - but we've called it test in enough places that changing now is hard)<br />
**production**<br />

```ts
// config/production.ts (e.g. APP_ENV=production)

export const config = {
  port: parseInt(process.env.PORT || ''),
  apiEndpoint: 'https://myprodapi.com'
}

```

in your start up file you would have something like this

```js
import { load } from '@luxuryescapes/lib-config'

interface MyConfig {
  port: number
  apiEndpoint: string
}

export const config = load<MyConfig>({
  env: 'local', // optional, defaults to process.env.APP_ENV,
  schema: {
    // json schema of the config schema
    type: 'object',
    properties: {
      port: { type: 'integer' },
      apiEndpoint: { type: 'string' }
    },
    required: ['port', 'apiEndpoint'],
    additionalProperties: false
  },
  configDir: 'myconfig' // optional, default to `config`
})
```

then in other files you can do the following

```js
const config = require('@luxuryescapes/lib-config')

express.listen(config.get().port)
```

get your test runner to load config as the first step

```js
process.env.APP_ENV = 'spec'
import { load } from '@luxuryescapes/lib-config'

const config = load()
```

or

```js
import { load } from '@luxuryescapes/lib-config'

const config = load({ env: 'spec' })
```

## For javascript

```js
// config/production.js (e.g. APP_ENV=production)

module.exports = {
  port: parseInt(process.env.PORT || ''),
  apiEndpoint: 'https://myprodapi.com'
}
```
