export class Settings
{
    constructor(app, options = {}) {
        this.app = app
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

        this.localeHandler = 'localeHandler' in options ? options.localeHandler : null
        if ('onDarkModeChange' in options) {
            this.app.$bus.on('darkModeChange', options.onDarkModeChange)
        }
        if ('onLocaleChange' in options) {
            this.app.$bus.on('localeChange', options.onLocaleChange)
        }
        if ('onChange' in options) {
            this.app.$bus.on('settingsChange', options.onChange)
        }
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
            this.app.$bus.emit('darkModeChange', {
                newDarkMode: this.settings.darkMode,
                oldDarkMode: this.appliedSettings.darkMode,
                target: this,
            })
        }

        if (changes.locale) {
            await this.localeHandler?.setLocale(this.settings.locale)
            this.app.$bus.emit('localeChange', {
                newLocale: this.settings.locale,
                oldLocale: this.appliedSettings.locale,
                target: this,
            })
        }

        if (Object.keys(changes).some(key => changes[key])) {
            this.app.$bus.emit('settingsChange', {
                newSettings: this.settings,
                oldSettings: this.appliedSettings,
                target: this,
            })
        }

        return this.applied()
    }
}
