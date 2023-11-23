export function createPageVisibility() {
    return {
        install(vue) {
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'visible') {
                    vue.config.globalProperties.$event.emit('pageVisible')
                }
            })
        },
    }
}
