import {LocaleHandler} from './locale-handler'

export class LazyLocaleHandler extends LocaleHandler
{
    constructor(localeLoader, supportedLocales = []) {
        super(supportedLocales)

        this._localeLoader = localeLoader
    }

    loadLocaleData(data, locale) {
        this._loadedLocales.push(locale)
        return this.applyLocale(locale)
    }

    setUnloadedLocale(locale) {
        return this._localeLoader(locale, this)
            .then(data => this.loadLocaleData(data, locale))
    }
}
