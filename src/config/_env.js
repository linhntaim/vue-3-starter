import dotenvConversion from 'dotenv-conversion'

const parsed = dotenvConversion.convert({parsed: import.meta.env, ignoreProcessEnv: true}).parsed

export function _env(key, def = null) {
    return key in parsed ? parsed[key] : def
}
