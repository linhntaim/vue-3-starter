import {env} from './env'

export const localization = {
    locale: {
        default: env.VITE_LOCALE || 'en',
        fallback: env.VITE_FALLBACK_LOCALE || 'en',

        supported: ['en', 'vi'],
    },
}
