import {createI18n} from 'vue-i18n'
import {take} from '../helpers'
import {LazyLocaleHandler} from './lazy-locale-handler'

export class I18LocaleHandler extends LazyLocaleHandler
{
    createI18Provider(options = {}) {
        return take(
            createI18n(
                take(
                    Object.assign(
                        {
                            globalInjection: true,
                            legacy: false,
                            locale: 'en',
                            fallbackLocale: 'en',
                        },
                        options || {},
                    ),
                    options => {
                        this.loadedLocales = Object.keys(options.messages || {})
                        this.locale = this.loadedLocales.length ? options.locale : null
                    },
                ),
            ),
            i18n => this.i18n = i18n,
        )
    }

    applyLocale(locale) {
        this.i18n.global.locale.value = locale
        return super.applyLocale(locale)
    }

    loadLocaleData(data, locale) {
        this.i18n.global.setLocaleMessage(locale, data)
        return super.loadLocaleData(data, locale)
    }
}
