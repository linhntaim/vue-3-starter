import {getCurrentInstance, onMounted, onUnmounted, ref} from 'vue'
import {Settings} from './settings'

export function createSettings(localeHandler) {
    return {
        install(vue) {
            localeHandler.install(vue)

            const settings = new Settings(vue.config.globalProperties, localeHandler)
            vue.config.globalProperties.$settings = settings

            vue.config.globalProperties.$setLocale = locale => {
                vue.config.globalProperties.$log.debug('app', 'setLocale', locale)
                return settings.setLocale(locale).apply()
            }
            vue.config.globalProperties.$getLocale = () => settings.getLocale()

            vue.config.globalProperties.$toggleDarkMode = () => {
                vue.config.globalProperties.$log.debug('app', 'toggleDarkMode')
                return settings.toggleDarkMode().apply()
            }
            vue.config.globalProperties.$getDarkMode = () => settings.getDarkMode()

            vue.config.globalProperties.$event.on('localeChange', event => {
                document.documentElement.setAttribute('lang', event.newLocale)
            })
            vue.config.globalProperties.$event.on('settingsChange', event => {
                vue.config.globalProperties.$cookie.put('settings', event.newSettings)
            })
        },
    }
}

export function useDarkMode() {
    const app = getCurrentInstance().proxy
    const darkMode = ref(app.$getDarkMode())

    const onDarkModeChange = event => darkMode.value = event.newDarkMode
    onMounted(() => app.$event.on('darkModeChange', onDarkModeChange))
    onUnmounted(() => app.$event.off('darkModeChange', onDarkModeChange))

    return {
        value: darkMode,
        toggle() {
            app.$toggleDarkMode()
        },
    }
}
