import {getApp, registerPropertyFactory} from '../helpers'
import {RequestManager} from './request-manager'

export function createService(extend = {}) {
    return {
        install(vApp) {
            registerPropertyFactory(
                vApp.config.globalProperties,
                '$request',
                () => new RequestManager(getApp(vApp)).extend(extend),
            )
            registerPropertyFactory(
                vApp.config.globalProperties,
                '$service',
                globalProps => ServiceClass => globalProps.$singleton.make(ServiceClass),
            )
        },
    }
}
