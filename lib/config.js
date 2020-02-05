let config = null

const get = () => {
  if (!config) {
    throw new Error('Config has not been loaded')
  }
  return config
}

const set = _config => {
  config = _config
}

module.exports = {
  get,
  set
}
