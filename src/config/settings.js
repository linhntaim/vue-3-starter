import {_env} from './_env'

export const settings = {
    darkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? true
        : _env.VITE_DARK_MODE,
    locale: {
        default: _env.VITE_LOCALE || 'en',
        fallback: _env.VITE_FALLBACK_LOCALE || 'en',

        supported: ['en', 'vi'],
    },
}
