import {getApp, registerPropertyFactory} from '../helpers'
import {Singleton} from './singleton'

export function createFactory() {
    return {
        install(vApp) {
            registerPropertyFactory(
                vApp.config.globalProperties,
                '$singleton',
                () => new Singleton(getApp(vApp)),
            )
        },
    }
}
