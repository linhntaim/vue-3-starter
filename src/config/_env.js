import dotenvConversion from 'dotenv-conversion'

export const _env = dotenvConversion.convert({parsed: import.meta.env, ignoreProcessEnv: true}).parsed
