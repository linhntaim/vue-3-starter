import {I18LocaleHandler} from '@/starter/settings'
import {_env} from './_env'

const supportedLocales = ['en', 'vi']

export const settings = {
    darkMode: {
        default: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            ? true
            : _env.VITE_DARK_MODE,
    },
    locale: {
        default: _env('VITE_LOCALE', 'en'),
        fallback: _env('VITE_FALLBACK_LOCALE', 'en'),

        supported: supportedLocales,

        handler: function () {
            return new I18LocaleHandler(
                locale => import(`../lang/${locale}.js`).then(messages => messages.default),
                supportedLocales,
            )
        },
    },
}
