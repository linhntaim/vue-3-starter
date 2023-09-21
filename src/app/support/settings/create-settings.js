import {getApp, registerPropertyFactory} from '../helpers'
import {Settings} from './settings'

export function createSettings(options = {}) {
    return {
        install(vApp) {
            registerPropertyFactory(
                vApp.config.globalProperties,
                '$settings',
                () => new Settings(getApp(vApp), options),
            )
            registerPropertyFactory(
                vApp.config.globalProperties,
                '$setLocale',
                globalProps => locale => {
                    globalProps.$log.debug('locale', 'applying', locale)
                    return globalProps.$settings.setLocale(locale).apply()
                },
            )
        },
    }
}
