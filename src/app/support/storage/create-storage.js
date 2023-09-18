import {getApp, registerPropertyFactory} from '../helpers'
import {StorageManager} from './storage-manager'

export function createStorage(extend = {}) {
    return {
        install(vApp) {
            registerPropertyFactory(
                vApp.config.globalProperties,
                '$storageManager',
                () => new StorageManager(getApp(vApp)).extend(extend),
            )
            registerPropertyFactory(
                vApp.config.globalProperties,
                '$storage',
                globalProps => globalProps.$storageManager.driver(),
            )
            registerPropertyFactory(
                vApp.config.globalProperties,
                '$cookie',
                globalProps => globalProps.$storageManager.driver('cookie'),
            )
        },
    }
}
