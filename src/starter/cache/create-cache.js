import {CacheManager} from './cache-manager'

export function createCache() {
    return {
        install(vue) {
            const cacheManager = new CacheManager(vue.config.globalProperties)
            vue.config.globalProperties.$cacheManager = cacheManager
            vue.config.globalProperties.$cache = cacheManager.driver()
        },
    }
}
