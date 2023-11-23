import {createSettings, I18LocaleHandler} from '@/app/support/settings'
import {settings as config} from '@/config'

const localeHandler = new I18LocaleHandler(
    locale => import(`../../../lang/${locale}.js`).then(messages => messages.default),
    config.locale.supported,
)

export const i18n = localeHandler.createI18Provider({
    locale: config.locale.default,
    fallbackLocale: config.locale.fallback,
})
export const settings = createSettings({
    localeHandler,
    onDarkModeChange(event) {
        document.documentElement.setAttribute('data-bs-theme', event.newDarkMode ? 'dark' : 'light')
    },
    onLocaleChange(event) {
        document.documentElement.setAttribute('lang', event.newLocale)
    },
    onChange(event) {
        event.target.app.$cookie.put('settings', event.newSettings)
    },
})
