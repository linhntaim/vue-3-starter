import {createI18n} from 'vue-i18n'
import {take} from '../helpers'
import {LazyLocaleHandler} from './lazy-locale-handler'

export class I18LocaleHandler extends LazyLocaleHandler
{
    createI18Provider(env, options = {}) {
        return take(
            createI18n(
                take(
                    Object.assign(
                        {
                            globalInjection: true,
                            legacy: false,
                            locale: env.VITE_I18N_LOCALE || 'en',
                            fallbackLocale: env.VITE_I18N_FALLBACK_LOCALE || 'en',
                        },
                        options || {},
                    ),
                    options => {
                        this.loadedLocales = Object.keys(options.messages || {})
                        this.locale = this.loadedLocales.length ? options.locale : null
                    },
                ),
            ),
            i18n => this.i18n = i18n.global,
        )
    }

    applyLocale(locale) {
        this.i18n.locale.value = locale
        return super.applyLocale(locale)
    }
    
    loadLocaleData(data, locale) {
        this.i18n.setLocaleMessage(locale, data)
        return super.loadLocaleData(data, locale)
    }
}
