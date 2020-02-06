let config: object | null = null

export function get () {
  if (!config) {
    throw new Error('Config has not been loaded')
  }
  return config
}

export function set (_config: object) {
  config = _config
}
