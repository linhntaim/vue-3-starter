import {LogManager} from './log-manager'

export function createLog() {
    return {
        install(vue) {
            const logManager = new LogManager(vue.config.globalProperties)
            vue.config.globalProperties.$logManager = logManager
            vue.config.globalProperties.$log = logManager.driver()
        },
    }
}
