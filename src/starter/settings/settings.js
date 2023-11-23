import {Maker} from '../helpers'

export class Settings extends Maker
{
    constructor(app, localeHandler) {
        super(app)

        this.settings = {
            darkMode: null,
            locale: null,
            // country: null,
            // timezone: null,
            // currency: null,
            // numberFormat: null,
            // longDateFormat: null,
            // shortDateFormat: null,
            // longTimeFormat: null,
            // shortTimeFormat: null,
        }
        this.applied()

        this._localeHandler = localeHandler
    }

    applied() {
        return this.appliedSettings = Object.assign({}, this.settings)
    }

    set(settings) {
        Object.keys(settings).forEach(key => {
            if (key in this.settings) {
                this.settings[key] = settings[key]
            }
        })
        return this
    }

    setDarkMode(darkMode) {
        this.settings.darkMode = darkMode
        return this
    }

    toggleDarkMode() {
        return this.setDarkMode(!this.appliedSettings.darkMode)
    }

    getDarkMode() {
        return this.appliedSettings.darkMode
    }

    setLocale(locale) {
        this.settings.locale = locale
        return this
    }

    getLocale() {
        return this.appliedSettings.locale
    }

    changes() {
        const changes = {}
        Object.keys(this.settings).forEach(
            key => changes[key] = this.settings[key] !== this.appliedSettings[key],
        )
        return changes
    }

    async apply() {
        const changes = this.changes()

        if (changes.darkMode) {
            this._app.$event.emit('darkModeChange', {
                newDarkMode: this.settings.darkMode,
                oldDarkMode: this.appliedSettings.darkMode,
                target: this,
            })
        }

        if (changes.locale) {
            await this._localeHandler?.setLocale(this.settings.locale)
            this._app.$event.emit('localeChange', {
                newLocale: this.settings.locale,
                oldLocale: this.appliedSettings.locale,
                target: this,
            })
        }

        if (Object.keys(changes).some(key => changes[key])) {
            this._app.$event.emit('settingsChange', {
                newSettings: this.settings,
                oldSettings: this.appliedSettings,
                target: this,
            })
        }

        return this.applied()
    }
}
