import {getApp, registerPropertyFactory} from '../helpers'
import {CacheManager} from './cache-manager'

export function createCache(extend = {}) {
    return {
        install(vApp) {
            registerPropertyFactory(
                vApp.config.globalProperties,
                '$cacheManager',
                () => new CacheManager(getApp(vApp)).extend(extend),
            )
            registerPropertyFactory(
                vApp.config.globalProperties,
                '$cache',
                globalProps => globalProps.$cacheManager.driver(),
            )
        },
    }
}
