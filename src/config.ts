import { LibConfigOptions } from './types'

let config: LibConfigOptions | null = null

export function get () {
  if (!config) {
    throw new Error('Config has not been loaded')
  }
  return config
}

export function set (_config: LibConfigOptions) {
  config = _config
}
