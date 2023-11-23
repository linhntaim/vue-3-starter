import {_env} from './_env'

export const log = {
    default: 'console',
    drivers: {
        console: {
            level: _env.VITE_LOG_LEVEL || 'debug',
        },
    },
}
