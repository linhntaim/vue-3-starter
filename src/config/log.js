import {env} from './env'

export const log = {
    default: 'console',
    drivers: {
        console: {
            level: env.VITE_LOG_LEVEL || 'debug',
        },
    },
}
