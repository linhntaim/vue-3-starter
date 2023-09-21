import {getApp, registerPropertyFactory} from '../helpers'
import {Encryption} from './encryption'

export function createEncryption(extend = {}) {
    return {
        install(vApp) {
            registerPropertyFactory(
                vApp.config.globalProperties,
                '$encryption',
                () => new Encryption(getApp(vApp)).extend(extend),
            )
            registerPropertyFactory(
                vApp.config.globalProperties,
                '$encryptor',
                globalProps => globalProps.$encryption.driver(),
            )
        },
    }
}
