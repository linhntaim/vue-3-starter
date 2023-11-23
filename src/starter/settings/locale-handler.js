export class LocaleHandler
{
    constructor(supportedLocales = []) {
        this._locale = null
        this._loadedLocales = []
        this._supportedLocales = supportedLocales
    }

    // eslint-disable-next-line no-unused-vars
    install(vue) {
    }

    applyLocale(locale) {
        return this._locale = locale
    }

    setLocale(locale) {
        if (!this._supportedLocales.includes(locale)) {
            return Promise.resolve(this._locale)
        }
        if (this._locale === locale) {
            return Promise.resolve(locale)
        }
        if (this._loadedLocales.includes(locale)) {
            return Promise.resolve(this.applyLocale(locale))
        }
        return this.setUnloadedLocale(locale)
    }

    setUnloadedLocale(locale) {
        return Promise.resolve(this.applyLocale(locale))
    }
}
