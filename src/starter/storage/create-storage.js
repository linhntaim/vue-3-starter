import {StorageManager} from './storage-manager'

export function createStorage() {
    return {
        install(vue) {
            const storeManager = new StorageManager(vue.config.globalProperties)
            vue.config.globalProperties.$storageManager = storeManager
            vue.config.globalProperties.$storage = storeManager.driver()
            vue.config.globalProperties.$cookie = storeManager.driver('cookie')
        },
    }
}
