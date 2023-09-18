export function createPageVisibility() {
    return {
        install(vApp) {
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'visible') {
                    vApp.config.globalProperties.$bus.emit('pageVisible')
                }
            })
        },
    }
}
