import {UrlGenerator} from './url-generator'

export function createUrl() {
    return {
        install(vue) {
            vue.config.globalProperties.$url = new UrlGenerator(vue.config.globalProperties)
        },
    }
}
