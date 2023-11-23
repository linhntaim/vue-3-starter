import {Timer} from './timer'

export function createTimer() {
    return {
        install(vue) {
            vue.config.globalProperties.$timer = new Timer()
        },
    }
}
