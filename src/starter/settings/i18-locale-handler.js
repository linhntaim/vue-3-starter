import {createI18n} from 'vue-i18n'
import {LazyLocaleHandler} from './lazy-locale-handler'

export class I18LocaleHandler extends LazyLocaleHandler
{
    install(vue) {
        const i18n = createI18n({
            globalInjection: true,
            legacy: false,
            locale: vue.config.globalProperties.$getConfig('settings.locale.default'),
            fallbackLocale: vue.config.globalProperties.$getConfig('settings.locale.fallback'),
        })
        vue.use(i18n)

        this._i18n = i18n
        this._loadedLocales = []
        this._locale = null
    }

    applyLocale(locale) {
        this._i18n.global.locale.value = locale
        return super.applyLocale(locale)
    }

    loadLocaleData(data, locale) {
        this._i18n.global.setLocaleMessage(locale, data)
        return super.loadLocaleData(data, locale)
    }
}
