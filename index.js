const load = require('./lib/load')
const config = require('./lib/config')

module.exports = {
  load,
  get: config.get
}
