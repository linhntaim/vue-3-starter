import mitt from 'mitt'

export function createEvent() {
    return {
        install(vue) {
            vue.config.globalProperties.$event = mitt()
        },
    }
}
