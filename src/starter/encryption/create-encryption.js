import {Encryption} from './encryption'

export function createEncryption() {
    return {
        install(vue) {
            const encryption = new Encryption(vue.config.globalProperties)
            vue.config.globalProperties.$encryption = encryption
            vue.config.globalProperties.$encryptor = encryption.driver()
        },
    }
}
