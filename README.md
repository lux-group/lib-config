# lib-config

Lets you define your config as ordinary code files
The name of the file, maps to the name of the NODE_ENV

## Philosophy

The philosophy (summarised [in confluence](https://aussiecommerce.atlassian.net/wiki/spaces/TEC/pages/605159786/2020-02-13+Hard+Coded+Config+vs+Environment+Variables)) is that ENV vars should be used only for secret config.

For other non-secret settings that vary between environments *(eg. the API url, which might be `test-api.com` or `api.com`)*, it's easier to manage them in hard-coded config files. A single environment variable called `NODE_ENV` determines what environment we're running in *(development, test, production, etc)* and the relevant config file is loaded based on that.

#### NODE_ENV values

`NODE_ENV` can be whatever you want. At Luxury Escapes, we typically use:

**development**<br />
**spec** (for running automated tests - both in CI and locally<br /> 
**test** (aka staging - but we've called it test in enough places that changing now is hard)<br />
**production**<br />

## For javascript

```js
// config/production.js (e.g. NODE_ENV=production)

module.exports = {
  port: parseInt(process.env.PORT || ''),
  apiEndpoint: 'https://myprodapi.com'
}

```

## For typescript

```ts
// config/production.ts (e.g. NODE_ENV=production)

export const config = {
  port: parseInt(process.env.PORT || ''),
  apiEndpoint: 'https://myprodapi.com'
}

```

in your start up file you would have something like this

```js
const config = require('@luxuryescapes/lib-config')
config.load({
  env: 'local', // optional, defaults to process.env.NODE_ENV,
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
process.env.NODE_ENV = 'spec'
const config = require('@luxuryescapes/lib-config')
config.load()
```

or

```js
const config = require('@luxuryescapes/lib-config')
config.load({ env: 'spec' })
```

if you want to mock config for unit testing you can do something like this

```js
const sinon = require('sinon')
const config = require('@luxuryescapes/lib-config')

beforeEach(() => {
  sinon.sandbox(config, 'get').returns({
    ...config.get(),
    myFeatureEnabled: false
  })
})

afterEach(() => {
  sinon.sandbox.restore()
})
```
