import {getApp, registerPropertyFactory} from '@/app/support/helpers'
import {Settings} from '@/app/support/settings/settings'

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
