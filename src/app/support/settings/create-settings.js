import {getCurrentInstance, onMounted, onUnmounted, ref} from 'vue'
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
                    globalProps.$log.debug('app', 'setLocale', locale)
                    return globalProps.$settings.setLocale(locale).apply()
                },
            )
            registerPropertyFactory(
                vApp.config.globalProperties,
                '$getLocale',
                globalProps => () => globalProps.$settings.getLocale(),
            )
            registerPropertyFactory(
                vApp.config.globalProperties,
                '$toggleDarkMode',
                globalProps => () => {
                    globalProps.$log.debug('app', 'toggleDarkMode')
                    return globalProps.$settings.toggleDarkMode().apply()
                },
            )
            registerPropertyFactory(
                vApp.config.globalProperties,
                '$getDarkMode',
                globalProps => () => globalProps.$settings.getDarkMode(),
            )
        },
    }
}

export function useDarkMode() {
    const app = getCurrentInstance().proxy
    const darkMode = ref(app.$getDarkMode())

    const onDarkModeChange = event => darkMode.value = event.newDarkMode
    onMounted(() => app.$bus.on('darkModeChange', onDarkModeChange))
    onUnmounted(() => app.$bus.off('darkModeChange', onDarkModeChange))

    return {
        value: darkMode,
        toggle() {
            app.$toggleDarkMode()
        },
    }
}
