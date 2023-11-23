export function createDarkModeListener() {
    return {
        install(vue) {
            vue.config.globalProperties.$event.on('darkModeChange', event => {
                vue.config.globalProperties.$log.debug('dark-mode', 'change to', event.newDarkMode)
                document.documentElement.setAttribute('data-bs-theme', event.newDarkMode ? 'dark' : 'light')
            })
        },
    }
}
